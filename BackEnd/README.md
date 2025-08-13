You must have a running MySQL instance

### Example .env file:
```
PORT=5000 
NODE_ENV=development
JWT_SECRET=secret
DATABASE_URL=mysql://root:123456@localhost:3306/mock_pj
```
- PORT: The port of app server
- JWT_SECRET: Secret key for JWT
- DATABASE_URL: MySQL database url
### How to run:

````
npm install
npx prisma init
npx prisma generate
npm run dev
````



