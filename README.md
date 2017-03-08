### Catrancher
This is a node based application. using react, react router and express. can be executed as stand alone single page application as well
NOTE: in the requirement doc the remote api links were provided but also mentioned the app to run as single page as well app as well so implement the app as server side app which uses remote api's as well as developed it as single page app. i belive for a good production level quality code i should take more time. also i tried to make the app responsive. using viewport metering(vh, vw, vmin, vmax etc).
i didnt include any external lib, to keep it more efficient and less dependency. the sorce code is hand written and not copy paste.

# Getting Started:
### Requirements: 
nodejs, npm have been installded

### Install dependencies:
- project dependencies: `cd <project-dir> && npm install`

### Run as server side app. using remote apis
1. change AJAX=true at line 10 in main.js
2. run command 'webpack'
3. run : `node_modules/.bin/babel-node --presets 'react,es2015' src/server.js`
4. browse to `localhost:8000` to view the project.

## run as single page app no internet version
1. change AJAX=false at line 10 in main.js
2. run command 'webpack'
3. start a web server inside src/static folder (python -m SimpleHTTPServer 8080)
4. browse to localhost:8080

## run tests: mocha, chai, jsdom, enzyme
- run command: npm run test
- to run a watcher: npm run test:watch

### TODO:
- complete test suite
- optimize code. remove duplicate code.
- code commenting.
- make it more presentable as well as make it pixcel perfect.
- minification and jslint implementation
- need to do performance improvement.
- may be wrap it in docker container
