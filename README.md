# csgomuffin.com

`Steam banned gabmling with their skins and the website is not online since then.`

Frontend of an online gambling with csgo skins. The frontend communication is only with one api and steam login.

# App Features
- Steam Login
- Profile
- Gamble page
- My items (inventory)
- Shop
- Polycies/QA/Contact form
   
# Used Technologies
  * React
  * flux
  * D3.js
  * Web sockets
  * Sass
  * Svgs
  * Gulp
  * Browserify
  * Babel
    
#Build info
* Client
    - After release build, in dest folder should be created folder with the name of the subproject which contains:
        * assets folder
        * .htaccess
        * css file
        * js files: vendor/polyfill/main
        * index.html - includes created css and js files
        * component html files will be included in the js files
    
    - After dev build, in dest folder should be created folder with the name of the subproject which contains:
        * assets folder
        * .htaccess
        * js files: vendor/polyfill/main
        * index.html - includes created js files
        * css and component html files will be included in the js files

Getting Started
---------------

#### Prerequisites
- `node >=5.12`

#### Quick Start
```shell
$ npm install
$ npm run gulp deploy
```


Usage
-----

|Script|Description|
|---|---|
|`npm install`|install npm dependencies|
|`npm run gulp deploy`|Prepare for deploy|
|`npm run gulp` |Used for development - watches for scss/js changes|
