# Blog

A Blog project with Angular and NestJS

## Starting with

Clone the repo and install the dependences

```bash
git clone https://github.com/dantnog/blog.git
cd blog/client
npm i
cd ../server
npm i
```

Make sure you have [Angular CLI](https://angular.io/guide/setup-local#install-the-angular-cli) and [NestJS CLI](https://docs.nestjs.com/#installation) installed

```bash
npm i -g @angular/cli @nestjs/cli
```

To the database use MySql or MariaDB. Set the .env variable `DATABASE_URL`. And don't forget the migrations.

```bash
# server side
npx prisma migrate dev
```

```bash
# .env example
DATABASE_URL="mysql://<name>:<password>@localhost:3306/theblog"
JWT_SECRET="secret"
```

Run it

```bash
# client side
ng serve

# server side
npm run start:dev
```

## License

[MIT licensed](LICENSE)
