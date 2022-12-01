## Para correr el backend:

### Crear .env con las variables de entorno

backend/.env

```bash
DB_USER = root
DB_PASSWORD = pass
DB_HOST = localhost
DB_NAME = prueba
DB_PORT = 3306
```

### Instalar dependencias

```bash
cd backend
npm install
npm run dev
```

o

```bash
cd backend
npm run build
node dist/server.js
```

## Para correr el frontend:

### Instalar dependencias

```bash
cd frontend
npm install
ng serve
```

## MySQL

```sql
CREATE DATABASE prueba;

USE prueba;

CREATE TABLE IF NOT EXISTS `reviews` (
  -- uuid
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `score` float NOT NULL,
  `image` varchar(255) NOT NULL,

  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,

  PRIMARY KEY (`id`)

) ENGINE=InnoDB  DEFAULT CHARSET=latin1;
```
