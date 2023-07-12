module.exports = function(grunt) {
   grunt.initConfig({
      terser: {
         options: {
           compress: true,
           mangle: true
         },
         target: {
           files: [{
             expand: true,
             src: ['src/js/**/*.js'],
             dest: 'dist/js',
             ext: '.min.js',
             extDot: 'last'
           }]
         }
       },
     cssmin: { 
       target: {
         files: [{
           expand: true,
           flatten: false,
           src: ['**/*.css'],
           ext: '.min.css',
           extDot: 'last'
         }]
       }
     }
   });
 
   grunt.loadNpmTasks('grunt-terser');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
 
   grunt.registerTask('minify', ['terser', 'cssmin']);
 };