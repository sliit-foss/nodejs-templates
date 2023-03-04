# Microservice template

## Project init commands:

* Run `pnpm install` to install all dependencies
* Run `pnpm dev` to start the development server

---

## Build commands:

* Run `pnpm build` to build the project
* Run `pnpm start` to start the production server

---

## Database Migrations:

* This service uses following tool to manage database migrations: [migrate-mongo](https://www.npmjs.com/package/migrate-mongo). Do visit it to learn more on how to use it

* Basic commands
  * Run `pnpm migrate-mongo up` to sync database migrations if any
  * Run `pnpm migrate-mongo down` to revert database migrations if any
  * Run `pnpm migrate-mongo create <migration-name>` to create a new migration file
