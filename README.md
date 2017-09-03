# PinList

## About the Project

PinList queries the APIs of Amazon, Yelp, Google Books, and TMDB (a movie database) to build a smart to-do list of products, places to visit, books, and movies. It utilizes a search drop-down to prompt the user with three suggestions.

## View PinList Screenshots

!["PinList"](/docs/to-do-list.png)

### Search Drop-down
!["Drop-down Search"](/docs/search-drop-down.png)

## Setup

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
