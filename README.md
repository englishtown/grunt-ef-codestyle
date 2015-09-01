# grunt-ef-codestyle

This grunt task is to help a repo adapting EF frontend coding styles easily on JavaScript, CSS, and HTML sources, it formats  
files using [esformatter](https://github.com/millermedeiros/esformatter/) 
and [jsbeautify](http://jsbeautifier.org/) in a batch. It is intended to be used as an automation tool 
whenever basic coding style should be reinforced. 
 

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ef-codestyle --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ef-codestyle');
```

## Task
_Run this task with the `grunt ef-coding-style` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Files are formatted with [esformatter](https://github.com/millermedeiros/esformatter/).

### Targets

Each target is to format one type of source files,  the task expects name of target 
matches one of `javascript`, `css` or `html` values, options and filesets from this target 
will be used for creating the formatting rules of this file type: 

```js
"ef-coding-style": {
    // reformat CSS files
    "css": {
        "src": [ "assets/**/*.css", ]
    },
    // reformat HTML files
    "html": {
        "src": [ "*.html"]
    },
    // reformat JS files
    "javascript": {
        "src": [ "src/**/*.js" ]
    }
}
```

### Options

#### preset

Type: `String`
Default: `undefined`

Pick from one of the presets directory that presents an existing EF coding styles, or
the specified directory that contains custom formatting rules, if you don't specify the option, 
default formatting rules will be used.

Your custom preset directory would be of the following structure:
```
mypreset
├── javascript.json
├── css.json
├── html.json
```
#### rules

Type: `Object`
Default: `null`

Object literal that hold inline formatting rules that override the ones comes from preset if any.


### Example configuration 

```js
grunt.initConfig({
    "ef-coding-style": {
        "options": {"preset": "efset"},
        "css": {
            "src": [
                "assets/**/*.css",
            ]
        },
        "html": {
            "src": [
                "*.html",
                "!dist"
            ]
        },
        "javascript": {
            "src": [
                "src/**/*.js",
                "Gruntfile.js",
                "!dist"
            ]
        }
    }
});
```