// dom compatibility
var jsdom = require("jsdom").jsdom;

document = jsdom(null, null, null);

window = document.createWindow();

//Test framework
var jasmine=require('jasmine-node');

for(var key in jasmine) {
  global[key] = jasmine[key];
}

// xhr compatibility
window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Project dependancies
require("./src/Player.js");
require("./src/Song.js");
require("./spec/SpecHelper.js");

jsdom.jQueryify(
    global.window, 
    
    // main framework framework
    'http://enyojs.com/enyo-2.1.1/enyo.js', 

    function () {
        global.enyo = window.enyo;
        jasmine.executeSpecsInFolder(
            {
                specFolder: __dirname + '/spec'
            }, 
            function(runner, log) {
                process.exit(runner.results().failedCount?1:0);
            }, 
            true, 
            true
        );
    }
);

