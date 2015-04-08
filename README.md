# phantomazzi - DOM rasterizer
**phantomazzi** ia a simple [PhantomJS](http://phantomjs.org/) script to rasterize each DOM element of the given class to a separate PNG file

## Installation

1. Install [PhantomJS](http://phantomjs.org/)
2. Clone repo or download *phantomazzi.js*

## Usage

    $ phantomjs phantomazzi.js URL CLASS OUTPUT

    --
    URL : full url to the page
    CLASS : class name of the DOM elements (eg. 'box_wrapper')
    OUTPUT : output filename without extension (eg. for 'path/test' you'll get files 'path/test_0.png', 'path/test_1.png' ... )

## Example
    $ phantomjs phantomazzi.js http://foo.com/bar/ box_wrapper /foo/my_box