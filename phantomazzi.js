/*
  SYNOPSIS
    $ phantomjs phantomazzi.js argument

    Script takes only one argument, which is an json string, that contains following list of keys:
    url*: (type: string) full url to the page
    containers*: (type: array) array of class names appearing in DOM tree
    urlparam: (type: object) object that consits of a key, which is an url param, and array of values
    filename*: (type: string) output filename without exstension. Name of output file depends on given containers and urlparam

    * - key is required

  EXAMPLE
    $ phantomjs phantomazzi.js '{"url":"http://foo.com/bar","containers":["box_1","box_2"],"urlparam":{"lang":["pl","de","en"]},"filename":"/foo/image"}'

    List of called urls:
    - http://foo.com/bar?lang=pl
    - http://foo.com/bar?lang=de
    - http://foo.com/bar?lang=en

    List of generated files:
    - /foo/image_pl_box_1.jpeg
    - /foo/image_pl_box_2.jpeg
    - /foo/image_de_box_1.jpeg
    - /foo/image_de_box_2.jpeg
    - /foo/image_en_box_1.jpeg
    - /foo/image_en_box_2.jpeg
*/

console.log("Initialized");

var system = require('system');
var args = system.args;

var Phantomazzi = function() {
  var page = require('webpage').create();
  var processing = false;
  var params, key, values, index;

  this.parseString = function(data) {
    params = JSON.parse(data);
    index = 0;
    if(params.urlparam == undefined) {
      key = false;
      values = [0];
    } else {
      key = Object.keys(params.urlparam)[0];
      values = params.urlparam[key];
    }
  }

  this.runProcess = function() {
    setInterval(function() {
      if (!processing && index < values.length) {
        console.log(index + " " + pageUrl(index));
        page.viewportSize = { width: 1920, height: 1080 };
        page.open(pageUrl(index));
      }

      if (index >= values.length) {
        phantom.exit();
      }
    }, 300);
  }

  page.onLoadStarted = function() {
    processing = true;
  }

  page.onLoadFinished = function(status) {
    if(status == "success") {
      for (var i = 0; i < params.containers.length; i++) {
        pageRender(i);
      }
    } else {
      console.log("ERROR: Page not loaded");
    }
    processing = false;
    index++;
  }

  var pageUrl = function(data) {
    data = (typeof data !== 'undefined' ? data : 0);
    return (key == false ? params.url : params.url + "" + paramConnector(params.url) + "" + key + "=" + values[data]);
  }

  var paramConnector = function(data) {
    return ((data.indexOf('?') === -1) ? "?" : "&");
  }

  var pageRender = function(it) {
    console.log("Container["+it+"]: "+params.containers[it]);
    var pe = page.evaluate("function(){return (document.getElementsByClassName('" + params.containers[it] + "').length > 0 ? document.getElementsByClassName('" + params.containers[it] + "')[0].getBoundingClientRect() : false);}");
    if (pe != false) {
      page.clipRect = pe
      page.render(params.filename + "" + (key == false ? "" : "_" + values[index]) + "_" + params.containers[it] + ".jpeg", {format: 'jpeg', quality: '82'});
      console.log("Output: " + params.filename + "" + (key == false ? "" : "_" + values[index]) + "_" + params.containers[it] + '.jpeg');
    } else {
      console.log("ERROR: class " + params.containers[it] + " not founded in DOM")
    }
  }

}

if (system.args.length != 2) {
  phantom.exit();
}

var p = new Phantomazzi();
p.parseString(args[1]);
p.runProcess();
