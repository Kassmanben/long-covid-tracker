# Setting up Heroku apps

Following these instructions to get the heroku apps set up with the correct Config Vars and buildpacks: https://medium.com/@neilshweky/deploying-react-express-mongodb-in-the-same-directory-to-heroku-3a97127f8ce9

- Server: `git remote add client <YOUR_HEROKU_SERVER_APP>`

- Client App: `git remote add client <YOUR_HEROKU_CLIENT_APP>`

Example:

```
git remote add client https://git.heroku.com/long-covid-tracker-server.git
git remote add client https://git.heroku.com/long-covid-tracker.git
```

# Deploying to Heroku:

Whenever you make changes to the repo, you'll need to commit those changes and push them to the client and server apps

```
// If coding on another branch
git checkout main
git merge <branch name>

// Add all changed files to git
git add -u

// Commit those changes and add a message
git commit -m "commit message"

// Push to server and client apps
git push server main && git push client main
```

# Running locally

```
// Only need to do first time, or on package changes to client/server
cd ./client && npm install
cd ../server && npm install
cd ../

// After installs above, run both client and server from root with this command
npm install
npm run dev

//Also run mongodb locally to connect to local mongo database
mongod --dbpath=<PATH_TO_MONGO_DIR>
// for example mongod --dbpath=/Users/ben/data/db
```

# Editing local db for testing

- Start mongodb locally.

- In a separate tab, use the shell command `mongo`

- Show all the data in a particular collection. `show databases` -> `use <collection_name>` -> `db.getCollectionNames()` -> `db.<collection_name>.find()`

- Use regular mongo commands to read and write from the db.

- To completely delete all the data in a collection, use `db.<collection_name>.remove({})`

**NOTE:** If you are getting a "port is already in use" error, use

```
sudo lsof -iTCP -sTCP:LISTEN -n -P
```

to find the process using that port and kill it with `sudo kill <PIID>`

# Boilerplate Info:

#### Things to Replace for Custom Site:

- Routes/Mongo collection name: `./server/models`; `./server/routes`; `./server/server.js`, `./client/src/components/Homepage.js`
- In index.html
  - Favicon, apple-touch-icon, meta description, title
- mainfest.json
  - Logo192 and logo512 (from same icon pack as favicon)
- Rename Homepage
- Update App.test.js
- Update fonts in index.css

# Notes:

    - Any files used by `./client/public/index.html` need to be in the `public` folder
    - Learn about reportWebVitals: https://bit.ly/CRA-vitals
