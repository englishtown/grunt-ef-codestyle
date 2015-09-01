'use strict';

var path = require('path');
var _ = require('lodash');
var util = require('util');

module.exports = function(grunt) {

  var plugin_dir = path.resolve(__dirname, '../');
  grunt.loadTasks(path.dirname(require.resolve('grunt-esformatter/tasks/esformatter')));
  grunt.loadTasks(path.dirname(require.resolve('grunt-jsbeautifier/tasks/jsbeautifier')));

  grunt.registerMultiTask('ef-coding-style', 'Reformat files with EF coding style conventions', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    // each file type lives as a separate target - js, css, html
    var type = this.target;
    var preset = {};

    // read preset
    if(options.preset) {
      // If this is not a directory in working dir
      if (!grunt.file.isDir(options.preset)) {
        options.preset = path.join(plugin_dir, 'preset', options.preset);
      }

      // read formatting rules from JSON file in preset directory
      preset = grunt.file.readJSON(path.join(options.preset, type) + '.json');
    }

    // allows for override formatting rules from task options
    var formatOptions = _.extend(preset, options.rules);

    // Iterate over all file formatting types, and
    // generate formatting task configuration dynamically
    this.files.forEach(function(fileObj) {
      var target;
      switch (type) {
        case 'javascript':
          grunt.config.set('esformatter', {
            options: formatOptions,
            src: fileObj.src
          });
          break;
        case 'css':
        case 'html':
          target = {
            options: {},
            src: fileObj.src
          };
          target.options[type] = formatOptions;
          grunt.config.set('jsbeautifier.' + type, target);
      }
    });

    var formatterName = type === 'javascript' ? 'esformatter' : 'jsbeautifier';

    // Log formatter task configs
    grunt.verbose.subhead('Formatter task: '+ formatterName+' config is now:');
    grunt.verbose.writeln(util.inspect(grunt.config(formatterName), {depth:4, colors: true}));
    grunt.task.run(formatterName);
  });
};
