module.exports = function(grunt) {

  grunt.initConfig({
    
    uglify: {
        my_target: {
            files: {
                'shapes/scripts/main.min.js': ['shapes/scripts/*.js']
            }
        }
    },
    
    cssmin: {
        target: {
            files: [{
                expand: true,
                cwd: 'release/css',
                src: 'shapes/*.css',
                dest: 'shapes/main.css',
                ext: '.min.css'
            }]
        }
    }
    
  });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('default', ['uglify', 'cssmin']);
};