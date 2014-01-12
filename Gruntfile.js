module.exports = function(grunt) {
  grunt.initConfig({
    react: {
      files: {
        expand: true,
        cwd: 'src/documents/scripts/',
        src: ['**/*.jsx'],
        dest: 'out/scripts',
        ext: '.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask("default", ["react"]);
};
