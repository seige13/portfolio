module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            cssImport: {
                options: {
                    process: function(src, filepath) {
                        return "@import url(http://fonts.googleapis.com/css?family=Montserrat:400,700);"
                            +src.replace('@import url(http://fonts.googleapis.com/css?family=Montserrat:400,700);', '');
                    }
                }
            },
            files: {
                'dist/css.main.min.css': ['dist/css.main.min.css']
            },
            js: {
                src: ['js/jquery.min.js','js/*.js'],
                dest: 'dist/js/main.js',
                separator: ';'
            },
            css: {
                src: 'css/*.css',
                dest: 'dist/css/main.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/js/main.js',
                dest: 'dist/main.min.js'
            }
        },
        less: {
            development: {
                options: {
                    paths: ["less/*.less"]
                },
                files: {
                    "css/style.css": "less/style.less"
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/',
                    ext: '.min.css'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['less']);
    grunt.registerTask('build', ['less', 'concat:js', 'uglify', 'concat:css', 'cssmin']);


};