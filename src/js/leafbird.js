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

(function() {

'use strict';

if(!window.leafbird)
  window.leafbird = new Leafbird();

/**
 * { function_description }
 *
 * @todo Write docs to this
 * @todo Verify docs on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Function_instances
 * @todo Make a module enhancement using singleton pattern: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
 * @class
 * @return     {(Array|Function|Object|boolean|number)}  { description_of_the_return_value }
 */
function Leafbird() {

  var leafbird = this;

  leafbird.module = module;

  var _modules = [];

  /**
   * { function_description }
   *
   * @todo write the docs to this!
   * @method     module
   * @param      {<type>}    name      { description }
   * @param      {Function}  callback  { description }
   * @return     {Function}  { description_of_the_return_value }
   */
  function module(name, callback) {

    var _module;

    if(name === undefined) {
      throw new LeafbirdInvalidModuleNameException('Name cannot be undefined.');
    }

    if(callback === undefined) {
      _module = getModule(name);
    }
    else {
      _module = setModule(name, callback);
    }

    return _module;
  }

  /**
   * { function_description }
   *
   * @todo write the docs to this!
   * @method     getModule
   * @param      {<type>}  name    { description }
   * @return     {<type>}  { description_of_the_return_value }
   */
  function getModule(name) {

    if(moduleExists(name)) {
      return _modules[name];
    }
    else {
      throw new LeafbirdModuleNotFoundException('Module ' + name + ' not exists.');
    }
  }

  /**
   * { function_description }
   *
   * @todo write the docs to this!
   * @method     setModule
   * @param      {<type>}    name      { description }
   * @param      {Function}  callback  { description }
   * @return     {<type>}    { description_of_the_return_value }
   */
  function setModule(name, callback) {

    _modules[name] = module;
    return _modules[name];
  }

  /**
   * { function_description }
   *
   * @todo write the docs to this!
   * @method     moduleExists
   * @param      {<type>}   name    { description }
   * @return     {boolean}  { description_of_the_return_value }
   */
  function moduleExists(name) {

    var exists = false;

    for(module in _modules) {
      if(module === name) {
        exists = true;
      }
    }

    return exists;
  }
};


/**
 * { function_description }
 *
 * @todo write the docs to this!
 * @class
 * @param      {<type>}  message  { description }
 * @return     {Object}  { description_of_the_return_value }
 */
function LeafbirdException(message) {
    this.name = "LeafbirdException";
    this.message = message;
};

/**
 * { function_description }
 *
 * @todo write the docs to this!
 * @class
 * @param      {<type>}  message  { description }
 * @return     {Object}  { description_of_the_return_value }
 */
function LeafbirdModuleNotFoundException(message) {
  LeafbirdModuleNotFoundException.prototype = LeafbirdException;
  this.name = "LeafbirdModuleNotFoundException";
  this.message = message;
};

/**
 * { function_description }
 *
 * @todo write the docs to this!
 * @class
 * @param      {<type>}  message  { description }
 * @return     {Object}  { description_of_the_return_value }
 */
function LeafbirdInvalidModuleNameException(message) {
  LeafbirdInvalidModuleNameException.prototype = LeafbirdException;
  this.name = "LeafbirdModuleNameInvalidException",
  this.message = message
};

})();
