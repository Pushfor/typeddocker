# Typeddocker

[![Build Status](https://travis-ci.org/Pushfor/typeddocker.svg?branch=master)](https://travis-ci.org/Pushfor/typeddocker)

This repository is still under development and not ready for reuse. 

> Docker + Yarn + Electron + Gulp + TypeScript

## Goal

 * Boilerplate to allow building complex TypeScript applications served as a vendor indepentant website or a desktop application

## It is not...

 * an actual application
 * thing that force you to some UI framework
 * uncommon problem
 * full web stack - you should use some varnish, nginx, elb in front

## Ingridients
 
 * Core technologies
   * Docker - to ship it vendor independent 
   * TypeScript - ES6/7/8 + types + decorators + interfaces
   * Sass - most popular CSS D.R.Y. language
   * HTML - because it's there
 * Framework / Engine 
   * Express (Node 8) - just serve, no magic
   * Electron - windows, osx, linux
   * Vanilla
     * because [React vs Angular vs Vue 2017](https://medium.com/unicorn-supplies/angular-vs-react-vs-vue-a-2017-comparison-c5c52d620176)
     * because you can choose one or few or all

## Usage

```bash
cd docker
./restart.deamon.sh
```

## Contribute

 * fork -> code -> test -> PR -> merge -> repeat
 * be constructive
 
## Structure

```
/docker
  /compose
    /app
      /src
        /apps
          /angular - TBD, example, deployed to public/angular
          /electron - TBD< electron node process
          /express - express server app
          /react - TBD, example, deployed to public/react
          /vanilla - example, deployed to public
          /vue - example, deployed to public/vue
        /node_modules - not checked in, shared for all projects
        gulpfile.js
        package.json
        tsconfig.json
        yarn.lock
      /Dockerfile
    /nginx - tbd
    .env - to be excluded from the repo
    .env.json - to be exluded from the repo
/volumes
```

## Use cases

 * App is composed of:
   * `backend` which serves files and expose microservices
   * `frontend` which can be one or many applicaitons using one or many frameworks
     * applications are distributed across folders
     * applicaitons share cookies/localstorage because of the same domain/process

## To Do

[x] Docker
[x] Gulp
[x] Sass
[ ] Vanilla
[x] Angular 4
[x] Angular 4 AOT
[ ] React
[ ] Vue
[ ] Jasmine
[ ] Travis
[ ] Protractor
[ ] Istanbul

### Web application
```
I====================================I
I Docker                             I
I               |-------------|---> serve
I               |   Express   |      I
I               |-------------|<--> microservices
I                      ^             I
I                      |             I
I |------|  1-n |-------------|      I
I | Gulp |----->| HTML/JS/CSS |      I
I |------|      |-------------|      I
I     ^                              I
I     |                              I
I |--------------------------------| I
I | Source: TypeScript, Scss, HTML | I
I |--------------------------------| I
I====================================I
```

 * Shipped as docker container
 * Source is tranformed on startup by gulp tasks
 * Dist files are served by express
 * Microservices are exposed by express
   * Thanks to express we can do serverside rendering

### Electron application
```
I====================================I
I Electron executab                  I
I               |-------------|      I
I          /--->|     Main    |<--> microservices
I          |    |-------------|      I
I          |                         I
I          |    |-------------|      I
I          |    |    Render   |---> serve
I          |/-->| HTML/JS/CSS |      I
I          |    |-------------|      I
I==========|=========================I
           |         
I==========|=========================I    
I Docker   |                         I       
I       |------|                     I
I       | Gulp |                     I
I       |------|                     I
I          ^                         I
I          |                         I
I |--------------------------------| I
I | Source: TypeScript, Scss, HTML | I
I |--------------------------------| I
I====================================I

```

 * Source is tranformed on build by gulp tasks
 * Dist files are served by electron main process
 * Microservices are exposed by main process (ipc)
 * Shipped as executable (.exe, .app) or update package (.zip, .nupkg)

## Solution

```
I====================================I
I Docker               |---------|   I
I                    /-| Express |   I
I         / \       /  |---------|   I
I     web/desktop -<                 I
I         \ /       \                I     |----------|  
I          ^         \---------------------| Electron |  
I          |                         I     |----------|  
I    |-------------|                 I
I    | HTML/JS/CSS |                 I
I    |-------------|                 I
I          ^                         I
I          |                         I
I       |------|                     I
I       | Gulp |                     I
I       |------|                     I
I          ^                         I
I          |                         I
I |--------------------------------| I
I | Source: TypeScript, Scss, HTML | I
I |--------------------------------| I
I====================================I
```

 * Docker
   * cares about enironment and requirements
 * TypeScript, Scss, HTML
   * shared source files  
 * Gulp
   * produce dist files from source files
   * can watch source file changes to update dist (dev mode)
   * can run karma/jasmine/protractor/cucumber
   * startup express or builds electron distibutable and packages it
 * Express
   * Serves static files from dist folder
     * HTML
     * JavaScript (es5)
     * CSS3
     * SVG, fonts, PNG
   * Expose microservices
     * via `websockets`
 * Electron
   * Serves static files from build folder
     * as above
   * Expose microservices
     * use electron `ipc` protocol   

## Licence

MIT License

Copyright (c) 2017-present, Pushfor Limited.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
