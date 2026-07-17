<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Pokédex API</h1>

<p align="center">
  API REST desarrollada con <strong>NestJS</strong> y <strong>MongoDB</strong> para la gestión de Pokémon.
</p>

---

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v20 o superior)
- Yarn
- Docker y Docker Compose
- Nest CLI

Instalar Nest CLI:

```bash
npm install -g @nestjs/cli
```

---

## Instalación

1. Clona el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Accede al directorio del proyecto.

```bash
cd nombre-del-proyecto
```

3. Instala las dependencias.

```bash
yarn install
```

4. Crea el archivo `.env` a partir del ejemplo.

```bash
cp .env.template .env
```

5. Levanta la base de datos con Docker.

```bash
docker compose up -d
```

6. Clonar el archivo __.env.template__ y renombrar la copia a __.env__

7. Llenar las variables de entorno definidas en el ```.env```

8. Inicia la aplicación.

```bash
yarn start:dev
```

---

## Poblar la base de datos

Una vez que la aplicación esté ejecutándose, realiza una petición GET al endpoint:

```http
GET http://localhost:3000/api/v2/seed
```

Esto descargará la información inicial de Pokémon y la almacenará en MongoDB.

---

## Stack tecnológico

- NestJS
- TypeScript
- MongoDB
- Mongoose
- Docker
- Docker Compose

# Production build

1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Construir la imagen

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod build --no-cache
```



---

## Scripts disponibles

```bash
# Desarrollo
yarn start:dev

# Producción
yarn start:prod

# Compilar
yarn build

# Ejecutar pruebas
yarn test

# Linter
yarn lint
```

---

## Variables de entorno

El proyecto utiliza un archivo `.env`.

Ejemplo:

```env
PORT=3000
MONGODB=mongodb://localhost:27017/nest-pokemon
DEFAULT_LIMIT=7
```

---

## API Base URL

```
http://localhost:3000/api/v2
```

---

## Autor

Abel-Padilla