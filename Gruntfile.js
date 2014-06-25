module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
        files: [{
          cwd: 'source/jade',
          src: ['**/*.jade', '!**/includes/*.jade'],
          dest: 'dest',
          expand: true,
          ext: '.html'
        }]
      },
      options: {
        pretty: true,
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    autoprefixer: {
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'source/css/*.css',
        dest: 'dest/css/'
      },
    },
    copy: {
      css: {
        files: [{
          cwd: 'source/css',
          src: ['**/*.css'],
          dest: 'dest/css',
          expand: true,
        }]
      },
      js: {
        files: [{
          cwd: 'source/js',
          src: ['**/*.js'],
          dest: 'dest/js',
          expand: true,
        }]
      },
      img: {
        files: [{
          cwd: 'source/i',
          src: ['**/*'],
          dest: 'dest/i',
          expand: true,
        }]
      },
      fonts: {
        files: [{
          cwd: 'source/fonts',
          src: ['**/*'],
          dest: 'dest/fonts',
          expand: true,
        }]
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: ['dest/**/*'],
      },
      js: {
        files: ['source/js/**/*.js'],
        tasks: ['copy:js'],
      },
      css: {
        files: ['source/css/**/*.css'],
        tasks: ['copy:css'],
      },
      jade: {
        files: ['source/**/*.jade'],
        tasks: ['jade'],
      },
      compass: {
        files: 'source/**/*.scss',
        tasks: ['compass', 'autoprefixer']
      },
      img: {
        files: 'source/i/*',
        tasks: ['copy:img']
      },
      fonts: {
        files: 'source/fonts/*',
        tasks: ['copy:fonts']
      }
    },
    connect: {
      server: {
        options: {
          hostname: '127.0.0.1',
          port: 3000,
          dest: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'connect', 
    'copy',
    'jade', 
    'compass',
    'autoprefixer',
    'watch'
  ]);
}