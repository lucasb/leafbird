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

var Leafbird;

(function(){
'use strict';

var instance;

/**
 * { function_description }
 *
 * @todo Write docs to this
 * @todo Verify docs on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Function_instances
 * @class
 * @return     {(Array|Function|Object|boolean|number)}  { description_of_the_return_value }
 */
Leafbird = function() {
  if(instance) {
    return instance;
  }

  /**
   * Revealing Pattern
   */
  instance = this;
  instance.module = module;

  /**
   * Private variables
   */
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
      throw new LeafbirdInvalidModuleName();
    }

    if(callback === undefined) {
      _module = getModule(name);
    } else {
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
    } else {
      //TODO: throw a module exception
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
  return {
    name: "LeafbirdException",
    message: message
  };
}

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
  return {
    name: "LeafbirdModuleNotFoundException",
    message: message
  };
}

/**
 * { function_description }
 *
 * @todo write the docs to this!
 * @class
 * @param      {<type>}  message  { description }
 * @return     {Object}  { description_of_the_return_value }
 */
function LeafbirdInvalidModuleName(message) {
  LeafbirdInvalidModuleName.prototype = LeafbirdException;
  return {
    name: "LeafbirdModuleNameInvalid",
    message: message
  };
}


})();

console.log(new Leafbird());