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
 * @module leafbird/element
 */
leafbird.element = new Element();

/**
 * Element provides a set of functions to get, filter and find elements
 * in json structure. Use this class methods to manipulate form object
 * before it is rendered.
 *
 * @class
 */
function Element() {

  var element = this;

  element.find = find;
  element.getElements = getElements;

  var configs;

  /**
   * Funtion to find a element in json (group or field), it match a property(key)
   * and value then return a array with objects and its siblings.
   *
   * @param   {string}  property  Name of key in json object.
   * @param   {string}  _value    Value expected to key.
   *
   * @return  {array}   List of items that match with json object.
   */
  function find(property, _value) {
    return findElement(property, _value);
  }

  /**
   * Returns elements found by attribute, when _attr is undefined returns whole
   * json. It is a helper to build finds using this order: contains, property and
   * value. When start with contains(*) it find values that contains string value.
   *  -> # = id; #value;
   *  -> . = class; .value;
   *  -> : = name; :name;
   *  -> * = contains; *.partValue;
   *
   * @param   {string}  _attr Attribute to get specific element(s) from json object.
   *
   * @return  {array}   List of items that match with json object.
   */
  function getElements(_attr) {

    configs = leafbird.configure();

    if (!configs || !configs.json)
      throw new Error('JSON is not valid.');

    var reducedJson = [];
    var index = (_attr && _attr.indexOf('*') === 0) ? 1 : 0;

    if (_attr === undefined)
      reducedJson.push(configs.json);
    else if (_attr.indexOf('#') == index)
      reducedJson = findElement('id', _attr.substring(index + 1), index);
    else if (_attr.indexOf('.') == index)
      reducedJson = findElement('class', _attr.substring(index + 1), index);
    else if (_attr.indexOf(':') == index)
      reducedJson = findElement('name', _attr.substring(index + 1), index);
    else
      throw new SyntaxError('JSONAttribute ' + _attr + ' is not valid.');

    return reducedJson;
  }

  /**
   * Funtion recursive to find a element in json (group or field), it match a
   * property(key) and value then return a array with objects and its siblings.
   *
   * @param   {string}  property    Name of key in json object.
   * @param   {string}  _value      Value expected to key.
   * @param   {boolean} _contains   When true verify if only root of value is matching.
   * @param   {object}  _json       New context of json object in recursive calls.
   *
   * @return  {array}   List of items that match with json object.
   */
  function findElement(property, _value, _contains, _json) {

    configs = leafbird.configure();
    var arrFound = [];
    var obj = (_json === undefined) ? configs.json : _json;

    for (var key in obj) {
      if (key == property && (_value === undefined ||
          (_contains && obj[property].indexOf(_value) > -1) ||
          (!_contains && obj[property] == _value))) {
        arrFound.push(obj);
      }

      if (obj[key] instanceof Object) {
        var found = findElement(property, _value, _contains, obj[key]);
        if (found.length > 0)
          arrFound = arrFound.concat(found);
      }
    }

    return arrFound;
  }
}

})();
