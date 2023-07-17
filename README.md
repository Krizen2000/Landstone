![Logo](website/images/logo.svg)

# Landstone

- This project helps real estate agents and clients to put their assets on sale.
- The site is built with react, nextjs, typescript, redux, tailwind
- The api is built with node, express, mongodb with JWT Auth

#### Minimum Requirements

1. CPU: 4core
2. RAM: 4GB
3. Storage: HDD

> **Advice**
> The minimum requirements are given in an assumption it will be run on a Linux machine

## Quick Run Instructions

1. Install Node 18 and clone or download the project.
2. Navigate to website and api folder and do the follwing command

```bash
npm install .
```

3. Then go to the MongoDB Atlas, create an account then a database and get the API token
4. Create a `.env` file in api folder with an entry:

```js
MONGO_URI = "<your-mongodb-token>"
JWT_KEY = "<your-jwt-token>"
```

ADDITIONALLY if running locally use to prevent CORS errors and port conflict

```js
PORT = 3120
CORS_URL = "http://localhost:3000"
```

5. Now in website we will do the same by creating `.env` file with values

```js
// API URL [if running locally use "http://localhost:3120"]
NEXT_BACKEND_SERVER_URL="<your-backend-url>"
```

6. For adding test data, we to disable checks in the env file of api like this

```js
DISABLE_CHECKS=true
```

7. Now in data folder run the following command (OPTIONAL: Remove DISABLE_CHECKS from env)

```bash
npm run start
```

8. Start the production server use the following command

```bash
(api) npm run server
(website) npm run build && npm run start
```

9. Can browse UI without filling details using the below account works for both client and agent

```js
EMAIL="john@gmail.com"
PASSWORD="john"
```

10. Additionally to run the development server use the following command

```bash
(api) npm run dev
(website) npm run dev
```
