/*
 * grunt-init-gruntplugin-sample
 * https://github.com/gruntjs/grunt-init-gruntplugin-sample
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "ef-coding-style": {
      options: {
        preset: "efset"
      },
      javascript: {
        files: [
          '**/*.js'
        ],
      },
      css: {
        files: [
          '**/*.css'
        ],
      },
      html: {
        files: [
          '**/*.css'
        ],
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'ef-coding-style']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
