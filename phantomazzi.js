/*

DESCRIPTION
    phantomazzi ia a simple PhantomJS (http://phantomjs.org/) script to rasterize each DOM element of the given class to a separate PNG file

SYNOPSIS
    $ phantomjs phantomazzi.js URL CLASS OUTPUT

    URL : full url to the page
    CLASS : class name of the DOM elements (eg. 'box_wrapper')
    OUTPUT : output filename without extension (eg. for 'path/test' you'll get files 'path/test_0.png', 'path/test_1.png' ... )

EXAMPLE
    $ phantomjs phantomazzi.js http://foo.com/bar/ box_wrapper /foo/my_box

*/

var page = require('webpage').create(),
    system = require('system'),
    address, output, wrapper, box, count;

if (system.args.length < 4) {
    console.log("Invalid arguments");
    phantom.exit(1);
} else {
    address = system.args[1];
    wrapper = system.args[2];
    output = system.args[3];

    page.viewportSize = { width: 1920, height: 1080 };
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
            count = page.evaluate("function(){return document.getElementsByClassName('"+wrapper+"').length;}");
            if (count == 0) {
                console.log('Element not found!');
                phantom.exit(1);
            } else {
                renderBox(0);
            }
        }
    });
}

function renderBox(i) {
    page.clipRect = page.evaluate("function(){return document.getElementsByClassName('"+wrapper+"')["+i+"].getBoundingClientRect();}");
    window.setTimeout(function () {
        page.render(output+'_'+i+'.png');
        if(++i<count) { renderBox(i) } else { phantom.exit(); }
    }, 300);
}
