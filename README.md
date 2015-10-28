# phantomazzi - DOM rasterizer
**phantomazzi** ia a simple [PhantomJS](http://phantomjs.org/) script to rasterize each DOM element of the given class to a separate JPG file. On branch dev-one, it's a modified version for the purposes of Daftcode dev-one team.

## Installation

1. Install [PhantomJS](http://phantomjs.org/)
2. Clone repo or download *phantomazzi.js*

## Usage

    $ phantomjs phantomazzi.js argument

Script takes only one argument, which is a json string, that contains following keys:

* **url:** *(type: string)* full url to the page
* **containers:** *(type: array)* array of class names appearing in DOM tree
* **urlparam:** *(type: object)* object that consits of a key, which is a url param, and array of possible values
* **filename:** *(type: string)* output filename without exstension. Name of output file depends on given containers and urlparam

Keys *url*, *containers* and *filename* are **required!**

## Example

    $ phantomjs phantomazzi.js '{"url":"http://foo.com/bar","containers":["box_1","box_2"],"urlparam":{"lang":["pl","de","en"]},"filename":"/foo/image"}'

#### List of called urls
    http://foo.com/bar?lang=pl
    http://foo.com/bar?lang=de
    http://foo.com/bar?lang=en

#### List of generated files
    /foo/image_pl_box_1.jpeg
    /foo/image_pl_box_2.jpeg
    /foo/image_de_box_1.jpeg
    /foo/image_de_box_2.jpeg
    /foo/image_en_box_1.jpeg
    /foo/image_en_box_2.jpeg    
