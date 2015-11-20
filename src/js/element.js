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

/**
 * @todo Write JSDoc here
 * { function_description }
 *
 * @class
 * @return     {boolean}  { description_of_the_return_value }
 */
function Element() {

  var element = this;

  element.configure = configure;
  element.find = find;
  element.print = print;
  element.getElements = getElements;

  /**
   * @typedef ElementConfig
   * @type {object}
   * @property {object} json Form specification.
   */

   /**
    * @type {ElementConfig}
    */
  configs = {
    json: null
  };

  /**
   * @todo Write JSDoc here
   *
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function configure(args) {

    if(args === undefined) {
      return configs;
    }

    for(var key in args) {
      if(configs.hasOwnProperty(key) && args[key] !== undefined){
        configs[key] = args[key];
      }
    }
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     find
   * @param      {<type>}  property   { description }
   * @param      {<type>}  _value     { description }
   * @param      {<type>}  _contains  { description }
   * @param      {<type>}  _json      { description }
   * @return     {Array}   { description_of_the_return_value }
   */
  function find(property, _value, _contains, _json) {

    var arrFound = [];
    var obj = (_json == undefined) ? configs.json : _json;

    for(var key in obj) {
      if(key == property && (_value == undefined
          || (_contains && obj[property].indexOf(_value) > -1)
          || (!_contains && obj[property] == _value))) {
        arrFound.push(obj);
      }

      if(obj[key] instanceof Object) {
        var found = this.find(property, _value, _contains, obj[key]);
        if(found.length > 0)
          arrFound = arrFound.concat(found);
      }
    }

    return arrFound;
  };

  /**
   * @todo Write JSDoc here
   *
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function print(element, _attr, _configs) {

    var defaultConfigs = {};
    for (var key in configs)
      defaultConfigs[key] = configs[key];

    if(!(element instanceof HTMLElement)) {
      throw new SyntaxError('Invalid HTMLElement.', element);
    }

    this.configure(_configs);
    var elements = this.getElements(_attr);

    if(configs.replace_element)
      element.innerHTML = '';

    for(var i in elements) {
      buildHTMLElement(elements[i], element);
    }

    this.configure(defaultConfigs);
  };

  /**
   * @todo Write JSDoc here
   *
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function getElements(_attr) {

    if(!configs.json)
      throw new Error('JSON is not valid.', configs.json);

    var reducedJson = [];
    var index = (_attr && _attr.indexOf('*') == 0) ? 1 : 0;

    if(_attr == undefined) {
      reducedJson.push(configs.json);
    }
    else if(_attr.indexOf('#') == index) {
      reducedJson = this.find('id', _attr.substring(index + 1), index);
    }
    else if(_attr.indexOf('.') == index) {
      reducedJson = this.find('class', _attr.substring(index + 1), index);
    }
    else if(_attr.indexOf(':') == index) {
      reducedJson = this.find('name', _attr.substring(index + 1), index);
    }
    else {
      throw new SyntaxError('JSONAttribute '+ _attr + ' is not valid.', _attr);
    }

    return reducedJson;
  };
}

})();
