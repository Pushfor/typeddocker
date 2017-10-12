# Typeddocker

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

## Use cases

 * App is composed of:
   * `backend` which serves files and expose microservices
   * `frontend` which can be one or many applicaitons using one or many frameworks
     * applications are distributed across folders
     * applicaitons share cookies/localstorage because of the same domain/process

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
I                                    I
I |--------------------------------| I
I | Source: TypeScript, Scss, HTML | I
I |--------------------------------| I
I====================================I
```

 * Shipped as docker container
 * Source is tranformed on startup by gulp tasks
 * Dist files are served by express
 * Microservices are exposed by express

### Electron application
```
I====================================I
I Electron                           I
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
        |------|
        | Gulp |
        |------|
           ^
           |
  |--------------------------------| 
  | Source: TypeScript, Scss, HTML | 
  |--------------------------------| 

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
I         \ /       \  |----------|  I
I          ^         \-| Electron |  I
I          |           |----------|  I
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

or if possible

```
                          I-----------------I
                        /-I Electron Docker I
I===============I      /  I-----------------I
I Source Docker I<|---<
I===============I      \  I-----------------I
                        \-I Express Docker  I
                          I-----------------I
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