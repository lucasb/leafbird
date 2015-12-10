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
 * Rendering has the unique responsibility to render all elements
 * (fields, labels and others) in DOM. It provide all input form
 * types and use json specification to define them and their
 * attributes to determine style and behavior.
 *
 * @class
 */
function Rendering() {

  var rendering = this;

  rendering.print = print;

  var configs;

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {HTMLElement}      element   Root element to insert form.
   * @param   {string}           _attr     Attribute to get specific element(s) from json to print.
   * @param   {LeafbirdConfig}   _configs  Configuration to change previous values for new and just to this print action.
   */
  function print(element, _attr, _configs) {

    if (!(element instanceof HTMLElement)) {
      throw new SyntaxError('Invalid HTMLElement.', element);
    }

    var defaultConfigs = leafbird.configure();
    configs = leafbird.configure(_configs);

    var elements = leafbird.element.getElements(_attr);

    if (configs.replaceElement)
      element.innerHTML = '';

    for (var i in elements) {
      buildHTMLElement(elements[i], element);
    }

    configs = defaultConfigs;
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildHTMLElement(json, element) {

    if (json.hasOwnProperty('type'))
      buildFieldElement(json, element);
    else {
      var groupElement = buildDivGroup(json);
      for (var i in json) {
        if (json[i] instanceof Array) {
          for (var j in json[i]) {
            buildHTMLElement(json[i][j], groupElement);
          }
        }
      }

      element.appendChild(groupElement);
    }
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @return  {HTMLElement}   Element div created following group specified in json object.
   */
  function buildDivGroup(json) {

    var div = document.createElement('div');
    if (json.id !== undefined)
      div.setAttribute('id', json.id);
    if (json.class !== undefined)
      div.setAttribute('class', json.class);
    if (configs.showGroupLabel && json.label !== undefined) {
      var span = document.createElement('span');
      if (json.label.title !== undefined)
        span.setAttribute('title', json.label.title);
      span.appendChild(document.createTextNode(json.label.value));
      div.appendChild(span);
    }

    return div;
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldElement(json, element) {

    if (json.name === undefined)
      throw new SyntaxError('FieldName is required.', json.name);

    if (configs.showInputLabel && json.label && json.label.value)
      buildFieldLabel(json, element);

    switch (json.type) {
      case 'checkboxone':
        element = buildCheckboxOne(json, element);
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
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldLabel(json, element) {

    var label = document.createElement('label');

    if (json.id !== undefined)
      label.setAttribute('for', json.id);
    if (json.label.class !== undefined)
      label.setAttribute('class', json.label.class);
    if (json.label.title !== undefined)
      label.setAttribute('title', json.label.title);
    label.appendChild(document.createTextNode(json.label.value));
    if (configs.requiredLabel && json.required) {
      var span = document.createElement('span');
      span.appendChild(document.createTextNode(configs.requiredLabel));
      label.appendChild(span);
    }

    element.appendChild(label);
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldInput(json, element) {

    var input = document.createElement('input');
    input.setAttribute('type', json.type);
    input.setAttribute('name', json.name);
    if (json.id !== undefined)
      input.setAttribute('id', json.id);
    if (json.class !== undefined)
      input.setAttribute('class', json.class);
    if (json.default !== undefined)
      input.setAttribute('value', json.default);
    if (json.title !== undefined)
      input.setAttribute('title', json.title);
    if (json.list !== undefined)
      input.setAttribute('list', json.list);
    if (json.pattern !== undefined)
      input.setAttribute('pattern', json.pattern);
    if (json.step !== undefined)
      input.setAttribute('step', json.step);
    if (json.size !== undefined)
      input.setAttribute('size', json.size);
    if (json.max !== undefined)
      input.setAttribute('max', json.max);
    if (json.min !== undefined)
      input.setAttribute('min', json.min);
    if (json.maxlength !== undefined)
      input.setAttribute('maxlength', json.maxlength);
    if (json.autocomplete !== undefined)
      input.setAttribute('autocomplete', json.autocomplete);
    if (json.required)
      input.setAttribute('required', 'required');
    if (json.readonly)
      input.setAttribute('readonly', 'readonly');
    if (json.autofocus)
      input.setAttribute('autofocus', 'autofocus');
    if (json.disabled)
      input.setAttribute('disabled', 'disabled');
    if (configs.showPlaceholder &&
        (json.placeholder !== undefined || json.label !== undefined)) {
      input.setAttribute('placeholder',
        json.placeholder === undefined ? json.label.value : json.placeholder);
    }

    element.appendChild(input);
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldCurrency(json, element) {
    json.type = 'number';
    json.step = '0.01';
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldTextarea(json, element) {

    var textarea = document.createElement('textarea');
    textarea.setAttribute('name', json.name);
    if (json.id !== undefined)
      textarea.setAttribute('id', json.id);
    if (json.class !== undefined)
      textarea.setAttribute('class', json.class);
    if (json.title !== undefined)
      textarea.setAttribute('title', json.title);
    if (json.maxlength !== undefined)
      input.setAttribute('maxlength', json.maxlength);
    if (json.wrap !== undefined)
      input.setAttribute('wrap', json.wrap);
    if (json.readonly)
      input.setAttribute('readonly', 'readonly');
    if (json.autofocus)
      input.setAttribute('autofocus', 'autofocus');
    if (json.required)
      textarea.setAttribute('required', 'required');
    if (json.disabled)
      input.setAttribute('disabled', 'disabled');
    if (json.default !== undefined)
      textarea.appendChild(document.createTextNode(json.default));
    if (configs.showPlaceholder &&
        (json.placeholder !== undefined || json.label !== undefined)) {
      input.setAttribute('placeholder',
        json.placeholder === undefined ? json.label.value : json.placeholder);
    }

    element.appendChild(textarea);
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldCheckboxRadio(json, element) {

    for (var i in json.values) {
      var input = document.createElement('input');
      input.setAttribute('type', json.type);
      input.setAttribute('name', json.name);
      input.setAttribute('value', json.values[i].value);
      if (json.id !== undefined)
        input.setAttribute('id', json.id + '_' + i);
      if (json.class !== undefined)
        input.setAttribute('class', json.class);
      if (json.default == json.values[i].value)
        input.setAttribute('checked', 'checked');
      if (json.required)
        input.setAttribute('required', 'required');

      if (json.values[i].label !== undefined) {
        var label = document.createElement('label');
        if (json.id !== undefined)
          label.setAttribute('for', json.id + '_' + i);
        if (json.values[i].label.class !== undefined)
          label.setAttribute('class', json.values[i].label.class);
        if (json.values[i].label.title !== undefined)
          label.setAttribute('title', json.values[i].label.title);
        label.appendChild(input);
        label.appendChild(document.createTextNode(json.values[i].label.value));
        element.appendChild(label);
      } else
        element.appendChild(input);
    }
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildCheckboxOne(json, element) {

    var div = document.createElement('div');
    div.setAttribute('id', 'checkboxone_' + json.name);
    div.setAttribute('title', json.name);

    if (json.required) {
      div.setAttribute('required', 'required');
      json.required = false;
    }

    json.type = 'checkbox';
    element.appendChild(div);
    return div;
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldSelect(json, element) {

    var select = document.createElement('select');
    select.setAttribute('name', json.name);
    if (json.id !== undefined)
      select.setAttribute('id', json.id);
    if (json.class !== undefined)
      select.setAttribute('class', json.class);
    if (json.title !== undefined)
      select.setAttribute('title', json.title);
    if (json.required)
      select.setAttribute('required', 'required');
    if (configs.multiselectInput)
      select.setAttribute('multiple', 'multiple');

    for (var i in json.values) {
      var option = document.createElement('option');
      option.appendChild(document.createTextNode(json.values[i].label.value));
      option.setAttribute('value', json.values[i].value);
      if (json.values[i].label.class !== undefined)
        option.setAttribute('class', json.values[i].label.class);
      if (json.default == json.values[i].value)
        option.setAttribute('selected', 'selected');
      select.appendChild(option);
    }

    element.appendChild(select);
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {object}        json     Object wih form specification.
   * @param   {HTMLElement}   element  HTML element to put fields or group.
   */
  function buildFieldFile(json, element) {

    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', json.name);
    if (json.id !== undefined)
      input.setAttribute('id', json.id);
    if (json.class !== undefined)
      input.setAttribute('class', json.class);
    if (json.accept !== undefined)
      input.setAttribute('accept', json.accept);
    if (json.title !== undefined)
      input.setAttribute('title', json.title);
    if (json.required)
      input.setAttribute('required', 'required');
    if (configs.multifileInput)
      input.setAttribute('multiple', 'multiple');
    element.appendChild(input);
  }
}
})();
