# grunt-fep-ejs

> Compile ejs templates.



## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fep-ejs --save-dev
```

```js
grunt.loadNpmTasks('grunt-fep-ejs');
```

## ejs task
_Run this task with the `grunt jade` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### data
Type: `Object`

Sets the data passed to Jade during template compilation. Any data can be passed to the template (including grunt templates).

This value also might be a function taking source and destination path as arguments and returning a data object. Within the function, `this` is bound to the file configuration object.

```js
options: {
  data: function(dest, src) {
    return {
      from: src,
      to: dest
    };
  }
}
```

or you can have options from a required JSON file:

```js
options: {
  data: function(dest, src) {
    // Return an object of data to pass to templates
    return require('./locals.json');
  }
}
```

#### filters
Type: `Object`

If you want to use filters you have two ways to do it. First you can write your filters inline within your Gruntfile.js or define filters in separate file and export it.

Filters are given a context with the `jade` instance and local variables: `{jade: jade, data: data}`, where `jade` is global jade instance and `data` is options passed to `options.data`. You can use `this.jade.render()` inside your filters to render the content of a block and locals as `#{variable}` from your data.

##### Inline filters

*Gruntfile.js:*
```js
options: {
  filters: {
    some: function(block) {},
    another: function(block) {}
  }
}
```

##### Exported filters

*Gruntfile.js:*
```js
options: {
  filters: require('./filters.js')
}
```

*filters.js:*
```js
var jadefilters = module.exports = {};
jadefilters.some = function(block) {};
jadefilters.another = function(block) {};
```

#### compileDebug
Type: `Boolean`
Default: **true**

Add Jade debug instructions to generated JS templates.

#### client
Type: `Boolean`
Default: **false**

Compile to JS template functions for client-side use rather than directly to HTML.

Make sure to also include the Jade runtime (only `runtime.js`) as described in the [Jade documentation](https://github.com/visionmedia/jade#browser-support).

#### namespace
Type: `String`, `Boolean`
Default: **JST**

The namespace in which the precompiled templates will be assigned. Use dot notation (*e.g.* `App.Templates`) for nested namespaces or `false` for no namespace wrapping.

When set to `false` with **amd** option set to `true`, the templates will be returned directly from the AMD wrapper.


#### amd
Type: `Boolean`
Default: **false**

Wraps the output file with an AMD define function and returns the compiled template namespace unless namespace has been explicitly set to false in which case the template function will be returned directly.

```js
define(function() {
    //...//
    returns this['[template namespace]'];
});
```

#### parseName
Type: `Function`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.

**Example**
Store all template on the default JST namespace in capital letters.

```js
options: {
  parseName: function(filename) {
    return filename.toUpperCase();
  }
}
```

#### processContent
Type: `Function`
Default: `function(content) { return content; };`

This option accepts a function that lets you perform additional content processing.

### Usage Examples

```js
ejs: {
  compile: {
    files: {
      'tmp/function.html': ['test/function.ejs'],
      'tmp/list.html': ['test/list.ejs']
    },
    options: {
      open : "<%",
      close: "%>",
      data: {
        test: true,
        year: '<%= grunt.template.today("yyyy") %>',
        names : ["Tobi","Loki","Sean","bei"],
        users : [{ name: 'Tobi', age: 2, species: 'ferret' },{ name: 'Loki', age: 2, species: 'ferret' },{ name: 'Jane', age: 6, species: 'ferret' }],
        navs : [{ name: 'index', href: 'index.html'},{ name: 'demo', href: 'demo.html'},{ name: 'about', href: 'about.html'},{ name: 'download', href: 'download.html'}]
      }
    }
  }
}
```

