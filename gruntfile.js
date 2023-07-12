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
             src: ['**/*.js'],
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
     },
     'string-replace': {
      updateImports: {
        files: [{
          expand: true,
          src: ['**/*.min.js', '**/*.min.css']
        }],
        options: {
          replacements: [{
            pattern: /(require\(["'])(.+?)(["']\))/g,
            replacement: '$1$2.min$3'
          }, {
            pattern: /(from\s+["'])(.+?)(["'])/g,
            replacement: '$1$2.min$3'
          }]
        }
      }
    }
   });
 
   grunt.loadNpmTasks('grunt-terser');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-string-replace');

   grunt.registerTask('minify', ['terser', 'cssmin']);
 };