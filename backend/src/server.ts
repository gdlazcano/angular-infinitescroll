import fastify from "fastify";
import mysql, { MySQLPromisePool } from "@fastify/mysql";
import ReviewRoute from "./routes/Review";

import cors from "@fastify/cors";

import { config } from "dotenv";
config();

const server = fastify();

declare module "fastify" {
  interface FastifyInstance {
    mysql: MySQLPromisePool;
  }
}

server.register(cors, {
  origin: "*",
});

server.register(mysql, {
  promise: true,
  connectionString: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});

server.register(ReviewRoute);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
