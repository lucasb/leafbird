/*
    Copyright 2015 Leafbird

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Include gulp
var gulp = require('gulp');

// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine-browser');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');

// Concatenate & Minify JS
gulp.task('build', function() {
    return gulp.src(['./src/js/leafbird.js','./src/js/element.js',
                     './src/js/validation.js','./src/js/rendering.js'])
      .pipe(concat('leafbird.js'))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest('./dest'));
});

// Unit Testing
gulp.task('test', function() {
  return gulp.src(['./dest/leafbird.min.js', './src/test/*.spec.js'])
    .pipe(jasmine.specRunner({console: true}))
    .pipe(jasmine.headless());
});

// Coverage tool
gulp.task('coverage', function () {
  return gulp.src(['./src/js/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    // Write the covered files to a temporary directory
    .pipe(gulp.dest('./coverage/'));
});

// Coverage report
gulp.task('coveralls', function() {
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

// run all tasks
gulp.task('default', ['build', 'test', 'coverage']);
