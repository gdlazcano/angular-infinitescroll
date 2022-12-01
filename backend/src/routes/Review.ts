import { FastifyInstance, FastifyPluginAsync } from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";
import { RowDataPacket } from "mysql2";

import fp from "fastify-plugin";

interface ReviewsQuery {
  offset?: number;
}

interface ReviewBody {
  image: string;
  review: string;
  score: number;
  title: string;
}

interface ReviewUpdateBody {
  id: string;
  image: string;
  review: string;
  score: number;
  title: string;
}

interface ReviewDeleteBody {
  id: string;
  user?: string;
  password?: string;
}

// fastify instance with mysql plugin
const ReviewRoute: FastifyPluginAsync = async (server: FastifyInstance) => {
  // get reviews
  server.get(
    "/reviews",
    async (
      request: FastifyRequest<{ Querystring: ReviewsQuery }>,
      reply: FastifyReply
    ) => {
      if (request.query.offset && isNaN(request.query.offset)) {
        reply.code(400).send({ error: "offset must be a number" });
        return;
      }

      const offset = request.query.offset || 0;

      const connection = await server.mysql.getConnection();
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM reviews LIMIT ?, 4",
        [Number(offset)]
      );
      connection.release();

      return reply.send(rows);
    }
  );

  // create review
  server.post(
    "/review",
    async (
      request: FastifyRequest<{ Body: ReviewBody }>,
      reply: FastifyReply
    ) => {
      if (
        !request.body.image ||
        !request.body.review ||
        !request.body.score ||
        !request.body.title
      ) {
        return reply.status(400).send({ message: "missing fields" });
      }

      const { review, image, score, title } = request.body;

      if (score < 0 || score > 5) {
        return reply
          .status(400)
          .send({ message: "score must be between 0 and 5" });
      }

      console.log(review, image, score, title);

      // TODO: user auth
      const connection = await server.mysql.getConnection();

      // create uuid for review
      const [mysqlUuid] = await connection.query("SELECT UUID() as uuid");
      const uuid = (mysqlUuid as RowDataPacket[])[0].uuid;

      // create review
      await server.mysql.query(
        "INSERT INTO reviews (id, content, score, image, created_at, updated_at, title) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [uuid, review, score, image, new Date(), new Date(), title]
      );

      connection.release();
    }
  );
  // delete review
  server.delete(
    "/review",
    async (
      request: FastifyRequest<{ Querystring: ReviewDeleteBody }>,
      reply: FastifyReply
    ) => {
      if (!request.query.id) {
        return reply.status(400).send({ message: "missing id" });
      }

      const { id } = request.query;
      console.log(id);

      // TODO: user auth
      const connection = await server.mysql.getConnection();

      await server.mysql.query("DELETE FROM reviews WHERE id = ?", [id]);

      connection.release();
    }
  );

  // update review
  server.patch(
    "/review",
    async (
      request: FastifyRequest<{ Body: ReviewUpdateBody }>,
      reply: FastifyReply
    ) => {
      if (
        !request.body.id ||
        !request.body.review ||
        !request.body.score ||
        !request.body.title ||
        !request.body.image
      ) {
        return reply.status(400).send({ message: "missing fields" });
      }

      const { id, review, score, title, image } = request.body;

      const connection = await server.mysql.getConnection();

      // sql injection safe, checked in isInAvailableFields
      await server.mysql.query(
        "UPDATE reviews SET content = ?, score = ?, image = ?, title = ?, updated_at = ? WHERE id = ?",
        [review, score, image, title, new Date(), id]
      );

      connection.release();
    }
  );
};

export default fp(ReviewRoute);
