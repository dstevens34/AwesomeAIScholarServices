## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh

$ npm install
$ node node_modules/gulp/bin/gulp && npm start
```

app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

Domain : https://awesome-ai-scholar-services.herokuapp.com/
Git URL : https://git.heroku.com/awesome-ai-scholar-services.git

```
$ heroku login
$ heroku git:remote -a awesome-ai-scholar-services
$ git add .
$ git commit -am "make it better"
$ git push heroku master
$ heroku open
```
