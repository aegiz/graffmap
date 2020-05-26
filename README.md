## Project purpose

Given a database of thousands of [geolocated graffitis](https://github.com/aegiz/graffiti-streetart-map-open-source), I made a simple UI to navigate and found the interesting streetart around me.

## Dev stack

- express - web application framework for node
- mongo - Database
- pug - template engine
- sass - pre-processor CSS
- bower - a package manager for the web
- gulp - automate workflow

## Project Structure

```sh
.
├── app/
│   └── controllers           # contains controller files
│   └── views                 # contains express view (pug) files
│   └── routes.js             # routes config file
├── config/
│   └── config.example.js     # environment config file
├── data/
│   └── json/                 # the json files from the last db save
│   └── import.json           # the json file with all the graffs
│   └── import_london.json    # a mock json file with a couple of graffs from London
│   └── user.json             # the json file with all the user data
├── other/                    # a folder containing some misc scripts to perform image processing
├── public/                   # contains static assets
│   ├── favicon               # favicon folder
│   ├── fonts                 # contains font files
│   ├── css                   # all files will generate from gulp
│   ├── js                    # contains js files
│   └── img                   # contains image files for the website
│   └── img/graffs            # contains the graffs
├── src/                      # contains static assets
│   ├── images                # assets
│   ├── sass                  # sass to compile
│   └── scripts               # js to compile
├── test/                     # unit & func tests
├── .gitignore                # specifies intentionally untracked files to ignore
├── app.js                    # app setup file
├── bower.json                # bower dependencies
├── gulpfile.js               # gulpfile containing all the tasks
├── package.json              # build scripts and dependencies
└── README.md                 # This file

```

## Getting Started

### Prerequisites

- Having Gulp installed on your machine (either globally or only in this folder)

```sh
$ npm install gulp-cli -g
$ npm install gulp -D
```

- Having Node.js installed `http://nodejs.org`
- Having MongoDB installed `brew install mongodb` (don't forget to create a folder for the db: `mkdir -p /data/db`)
- An internet connexion

### Install code dependancies

Then the easiest way to get started is to clone the repository:

```sh
$ git clone https://github.com/aegiz/graffmap
$ cd graffmap

# Install dependencies (don't forget to install first mongo!)
$ npm install
$ sudo bower install --allow-root

```

### Create a config file

In the config folder clone the config.example.js file. Name it config.js and fill it out with the required info (for example the Google Maps API key).

### Development (open two different tabs in your terminal)

```sh
# Launching Mongodb:
$ sudo mongod
# If problem when launching mongo
$ sudo killall -15 mongod
```

```sh
# Launching the server
$ sudo gulp
```

### Database

```sh
# (required) Importing some document to the graff collection in the database graffmap:
$ mongoimport --jsonArray --db graffmap --collection graff --file ./data/import.json
$ mongoimport --jsonArray --db graffmap --collection graff_london --file ./data/import_london.json

# (required) Importing some documents to the user collection in the database graffmap:
$ mongoimport --jsonArray --db graffmap --collection user --file ./data/user.json
```

```sh
# Making some actions with the db:
$ mongo
> show dbs
> use graffmap
> db.graff.find() // print all the graff
> db.graff_london.drop() // remove all the document from the graff_london collection
```

### Images

To import all the images you will have to:
1- download the zips on the google drive
2- Extract and place all the images in the sub folders of /public/img/graffs

### Test

```sh
$ npm test
```

### Lint

```sh
$ npm run lint
```
