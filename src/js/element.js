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

leafbird.element = new Element();

/**
 * @todo Write JSDoc here
 * { function_description }
 *
 * @class
 * @return     {boolean}  { description_of_the_return_value }
 */
function Element() {

  var element = this;

  element.find = find;
  element.getElements = getElements;

  var configs;

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
        var found = find(property, _value, _contains, obj[key]);
        if (found.length > 0)
          arrFound = arrFound.concat(found);
      }
    }

    return arrFound;
  }

  /**
   * @todo Write JSDoc here
   *
   * { function_description }
   *
   * @method     getElements
   * @param      {<type>}  args    { description }
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
      reducedJson = find('id', _attr.substring(index + 1), index);
    else if (_attr.indexOf('.') == index)
      reducedJson = find('class', _attr.substring(index + 1), index);
    else if (_attr.indexOf(':') == index)
      reducedJson = find('name', _attr.substring(index + 1), index);
    else
      throw new SyntaxError('JSONAttribute ' + _attr + ' is not valid.');

    return reducedJson;
  }
}

})();
