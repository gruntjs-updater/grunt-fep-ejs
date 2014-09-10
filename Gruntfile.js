/*
 * grunt-fep-ejs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      test: ['tmp']
    },
    ejs: {
      options: {
        open : "<%",
        close: "%>"
      },
      compile: {
        files: {
          'tmp/function.html': ['test/function.ejs'],
          'tmp/list.html': ['test/list.ejs'],
          'tmp/list2.html': ['test/list.html']
        },
        options: {
          data: {
            test: true,
            year: '<%= grunt.template.today("yyyy") %>',
            names : ["Tobi","Loki","Sean","bei"],
            users : [{ name: 'Tobi', age: 2, species: 'ferret' },{ name: 'Loki', age: 2, species: 'ferret' },{ name: 'Jane', age: 6, species: 'ferret' }],
            navs : [{ name: 'index', href: 'index.html'},{ name: 'demo', href: 'demo.html'},{ name: 'about', href: 'about.html'},{ name: 'download', href: 'download.html'}]
          },
          ext : ".shtml"
        }
      },
      compile2: {
        files: [{
          expand: true,
          cwd: 'test/',
          src: [ '**/*','!in/**'],
          dest: 'tmp',
          ext: '.html'
        }],
        options: {
          client : 1,
          data: {
            test: true,
            year: '<%= grunt.template.today("yyyy") %>',
            names : ["Tobi","Loki","Sean","bei"],
            users : [{ name: 'Tobi', age: 2, species: 'ferret' },{ name: 'Loki', age: 2, species: 'ferret' },{ name: 'Jane', age: 6, species: 'ferret' }],
            navs : [{ name: 'index', href: 'index.html'},{ name: 'demo', href: 'demo.html'},{ name: 'about', href: 'about.html'},{ name: 'download', href: 'download.html'}]
          }
        }
      }
    },
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  grunt.registerTask('test', ['clean', 'ejs:compile']);
  grunt.registerTask('test2', ['clean', 'ejs:compile2']);
  grunt.registerTask('default', ['test']);

};
