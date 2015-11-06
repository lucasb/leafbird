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
 * @param      {<type>}  configs  { description }
 */
function Leafbird(configs) {

  var lb = this;

  /**
   * Revealing Pattern
   * 
   */
  lb.configure = configure;
  lb.find = find;
  lb.print = print;
  lb.getElements = getElements;


  if(!configs) {
    /**
     * @typedef LeafbirdConfig
     * @type {object}
     * @property {object} json Form specification.
     * @property {boolean} replace_element Transclude parent element.
     * 
     */
     /**
      * @type {LeafbirdConfig}
      */
    configs = {
      json: null, //JSON
      replace_element: false, //like angular transclude
      validation_callback: undefined,
      required_label: null,
      show_group_label: false,
      show_placeholder: false,
      show_input_label: false,
      multiselect_input: false,
      multifile_input: false
    };
  }

  /**
   * @todo Write JSDoc here
   * 
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function configure(args) {
    for(var key in args) {
      if(configs.hasOwnProperty(key) && args[key] !== undefined){
        configs[key] = args[key];
      }
    }
  };

  /**
   * @todo Write JSDoc here
   * 
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function find(property, _value, _contains, _json) {
    var arr_found = [];
    var obj = (_json == undefined) ? config.json : _json;

    for(var key in obj) {
      if(key == property && (_value == undefined
          || (_contains && obj[property].indexOf(_value) > -1)
          || (!_contains && obj[property] == _value))) {
        arr_found.push(obj);
      }

      if(obj[key] instanceof Object) {
        var found = this.find(property, _value, _contains, obj[key]);
        if(found.length > 0)
          arr_found = arr_found.concat(found);
      }
    }

    return arr_found;
  };

  /**
   * @todo Write JSDoc here
   * 
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function print(element, _attr, _config) {
    var save_config = {};
    for (var key in config)
      save_config[key] = config[key];

    if(!(element instanceof HTMLElement)) {
      throw new SyntaxError('Invalid HTMLElement.', element);
    }

    this.configure(_config);
    var elements = this.getElements(_attr);

    if(config.replace_element)
      element.innerHTML = '';

    for(var i in elements) {
      buildHTMLElement(elements[i], element);
    }

    this.configure(save_config);
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
    if(!config.json)
      throw new Error('JSON is not valid.', config.json);

    var reduced_json = [];
    var index = (_attr && _attr.indexOf('*') == 0) ? 1 : 0;

    if(_attr == undefined) {
      reduced_json.push(config.json);
    }
    else if(_attr.indexOf('#') == index) {
      reduced_json = this.find('id', _attr.substring(index + 1), index);
    }
    else if(_attr.indexOf('.') == index) {
      reduced_json = this.find('class', _attr.substring(index + 1), index);
    }
    else if(_attr.indexOf(':') == index) {
      reduced_json = this.find('name', _attr.substring(index + 1), index);
    }
    else {
      throw new SyntaxError('JSONAttribute '+ _attr + ' is not valid.', _attr);
    }

    return reduced_json;
  };
}


})();