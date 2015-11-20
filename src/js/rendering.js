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

leafbird.rendering = new Rendering();

/**
 * @todo Write JSDoc here
 * { function_description }
 *
 * @class
 * @return     {<type>}  { description_of_the_return_value }
 */
function Rendering() {

  var rendering = this;

  rendering.print = print;

  /**
   * @typedef RenderingConfig
   * @type {object}
   * @property {boolean} replace_element Transclude parent element.
   * @property {string} required_label String indicate required field.
   * @property {boolean} show_group_label Display a group label.
   * @property {boolean} show_placeholder Display a field placeholder.
   * @property {boolean} multiselect_input Set this field as a multiselect.
   * @property {boolean} multifile_input Set this field as a multifile input.
   */

   /**
    * @type {RenderingConfig}
    */
  configs = {
    replace_element: false,
    required_label: null,
    show_group_label: false,
    show_placeholder: false,
    show_input_label: false,
    multiselect_input: false,
    multifile_input: false
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
   * { function_description }
   *
   * @method     buildHTMLElement
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildHTMLElement(json, element) {

    if(json.hasOwnProperty('type')) {
      buildFieldElement(json, element);
    }
    else {
      var groupElement = buildDivGroup(json);
      for(var i in json) {
        if(json[i] instanceof Array) {
          for(var j in json[i]) {
            buildHTMLElement(json[i][j], groupElement);
          }
        }
      }
      element.appendChild(groupElement);
    }
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildDivGroup
   * @param      {<type>}  json    { description }
   * @return     {<type>}  { description_of_the_return_value }
   */
  function buildDivGroup(json) {

    var div = document.createElement('div');
    if(json.id != undefined)
      div.setAttribute('id', json.id);
    if(json.class != undefined)
      div.setAttribute('class', json.class);
    if(config.show_group_label && json.label != undefined) {
      var span = document.createElement('span');
      if(json.label.title != undefined)
        span.setAttribute('title', json.label.title);
      span.appendChild(document.createTextNode(json.label.value));
      div.appendChild(span);
    }

    return div;
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldElement
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldElement (json, element) {

    if(json.name == undefined)
      throw new SyntaxError('FieldName is required.', json.name);

    if(config.show_input_label && json.label && json.label.value)
      buildFieldLabel(json, element);

    switch(json.type) {
      case 'checkboxone':
        buildCheckboxOne(json, element);
      case 'checkbox':
      case 'radio':
        buildFieldCheckboxRadio(json, element);
        break;
      case 'textarea':
        buildFieldTextarea(json, element);
        break;
      case 'select':
        buildFieldSelect(json, element);
        break;
      case 'datalist':
        break;
      case 'key':
        break;
      case 'file':
        buildFieldFile(json, element);
        break;
      case 'currency':
        buildFieldCurrency(json, element);
      default:
        buildFieldInput(json, element);
    }
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldLabel
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldLabel(json, element) {

    var label = document.createElement('label');

    if(json.id != undefined)
      label.setAttribute('for', json.id);
    if(json.label.class != undefined)
      label.setAttribute('class', json.label.class);
    if(json.label.title != undefined)
      label.setAttribute('title', json.label.title);
    label.appendChild(document.createTextNode(json.label.value));
    if(config.required_label && json.required) {
      var span = document.createElement('span');
      span.appendChild(document.createTextNode(config.required_label));
      label.appendChild(span);
    }

    element.appendChild(label);
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldText
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldText(json, element) {

    var input = document.createElement('input');
    input.setAttribute('type', json.type);
    input.setAttribute('name', json.name);
    if(json.id != undefined)
      input.setAttribute('id', json.id);
    if(json.class != undefined)
      input.setAttribute('class', json.class);
    if(json.default != undefined)
      input.setAttribute('value', json.default);
    if(json.title != undefined)
      input.setAttribute('title', json.title);
    if(json.list != undefined)
      input.setAttribute('list', json.list);
    if(json.pattern != undefined)
      input.setAttribute('pattern', json.pattern);
    if(json.step != undefined)
      input.setAttribute('step', json.step);
    if(json.size != undefined)
      input.setAttribute('size', json.size);
    if(json.max != undefined)
      input.setAttribute('max', json.max);
    if(json.min != undefined)
      input.setAttribute('min', json.min);
    if(json.maxlength != undefined)
      input.setAttribute('maxlength', json.maxlength);
    if(json.autocomplete != undefined)
      input.setAttribute('autocomplete', json.autocomplete);
    if(json.required)
      input.setAttribute('required', 'required');
    if(json.readonly)
      input.setAttribute('readonly', 'readonly');
    if(json.autofocus)
      input.setAttribute('autofocus', 'autofocus');
    if(json.disabled)
      input.setAttribute('disabled', 'disabled');
    if(config.show_placeholder &&
        (json.placeholder != undefined || json.label != undefined)) {
      input.setAttribute('placeholder',
        json.placeholder == undefined ? json.label.value : json.placeholder);
    }

    element.appendChild(input);
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldCurrency
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldCurrency(json, element) {
      json.type = 'number';
      json.step = '0.01';
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldTextarea
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldTextarea(json, element) {

    var textarea = document.createElement('textarea');
    textarea.setAttribute('name', json.name);
    if(json.id != undefined)
      textarea.setAttribute('id', json.id);
    if(json.class != undefined)
      textarea.setAttribute('class', json.class);
    if(json.title != undefined)
      textarea.setAttribute('title', json.title);
    if(json.maxlength != undefined)
      input.setAttribute('maxlength', json.maxlength);
    if(json.wrap != undefined)
      input.setAttribute('wrap', json.wrap);
    if(json.readonly)
      input.setAttribute('readonly', 'readonly');
    if(json.autofocus)
      input.setAttribute('autofocus', 'autofocus');
    if(json.required)
      textarea.setAttribute('required', 'required');
    if(json.disabled)
      input.setAttribute('disabled', 'disabled');
    if(json.default != undefined)
      textarea.appendChild(document.createTextNode(json.default));
    if(config.show_placeholder &&
        (json.placeholder != undefined || json.label != undefined)) {
      input.setAttribute('placeholder',
        json.placeholder == undefined ? json.label.value : json.placeholder);
    }

    element.appendChild(textarea);
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldCheckboxRadio
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldCheckboxRadio(json, element) {

    for(var i in json.values) {
      var input = document.createElement('input');
      input.setAttribute('type', json.type);
      input.setAttribute('name', json.name);
      input.setAttribute('value', json.values[i].value);
      if(json.id != undefined)
        input.setAttribute('id', json.id + '_' + i);
      if(json.class != undefined)
        input.setAttribute('class', json.class);
      if(json.default == json.values[i].value)
        input.setAttribute('checked', 'checked');
      if(json.required)
        input.setAttribute('required', 'required');

      if(json.values[i].label != undefined) {
        var label = document.createElement('label');
        if(json.id != undefined)
          label.setAttribute('for', json.id + '_' + i);
        if(json.values[i].label.class != undefined)
          label.setAttribute('class', json.values[i].label.class);
        if(json.values[i].label.title != undefined)
          label.setAttribute('title', json.values[i].label.title);
        label.appendChild(input);
        label.appendChild(document.createTextNode(json.values[i].label.value));
        element.appendChild(label);
      }
      else
        element.appendChild(input);
    }
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildCheckboxOne
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildCheckboxOne(json, element) {

    var div = document.createElement('div');
    div.setAttribute('id', 'checkboxone_' + json.name);
    div.setAttribute('title', json.name);

    if(json.required) {
      div.setAttribute('required', 'required');
      json.required = false;
    }

    json.type = 'checkbox';
    element.appendChild(div);
    element = div;
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldSelect
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldSelect(json, element) {

    var select = document.createElement('select');
    select.setAttribute('name', json.name);
    if(json.id != undefined)
      select.setAttribute('id', json.id);
    if(json.class != undefined)
      select.setAttribute('class', json.class);
    if(json.title != undefined)
      select.setAttribute('title', json.title);
    if(json.required)
      select.setAttribute('required', 'required');
    if(config.multiselect_input)
      select.setAttribute('multiple', 'multiple');

    for(var i in json.values) {
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(json.values[i].label.value));
      option.setAttribute('value', json.values[i].value);
      if(json.values[i].label.class != undefined)
        option.setAttribute('class', json.values[i].label.class);
      if(json.default == json.values[i].value)
        option.setAttribute('selected', 'selected');
      select.appendChild(option);
    }

    element.appendChild(select);
  };

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     buildFieldFile
   * @param      {<type>}  json     { description }
   * @param      {<type>}  element  { description }
   */
  function buildFieldFile(json, element) {

    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', json.name);
    if(json.id != undefined)
      input.setAttribute('id', json.id);
    if(json.class != undefined)
      input.setAttribute('class', json.class);
    if(json.accept != undefined)
      input.setAttribute('accept', json.accept);
    if(json.title != undefined)
      input.setAttribute('title', json.title);
    if(json.required)
      input.setAttribute('required', 'required');
    if(config.multifile_input)
      input.setAttribute('multiple', 'multiple');
    element.appendChild(input);
  };
}
})();
