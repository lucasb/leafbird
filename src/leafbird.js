/*
  Copyright 2014 Leafbird

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

  var config = {//TODO: Add option mark input required, function validation and mask by type
    json: null,
    show_group_label: false,
    show_placeholder: false,
    show_input_label: false,
    multiselect_input: false,
    multifile_input: false
  }

  this.Leafbird = function(_config) {
    if(!(this instanceof Leafbird)) {
      return new Leafbird(_config);
    }
    this.configure(_config);
  };

  Leafbird.prototype.configure = function(args) {
    for(var key in args) {
      if(config.hasOwnProperty(key) && args[key] != undefined)
        config[key] = args[key];
    }
  }

  Leafbird.prototype.find = function(property, _value, _contains, _json) {

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

  Leafbird.prototype.print = function(element, _attr, _config) {

    var save_config = {};
    for (var key in config)
      save_config[key] = config[key];

    if(!(element instanceof HTMLElement)) {
      throw new SyntaxError("Invalid HTMLElement.", element);
    }

    this.configure(_config);
    var elements = this.getElements(_attr);

    for(var i in elements) {
      buildHTMLElement(elements[i], element);
    }

    this.configure(save_config);
  };

  Leafbird.prototype.getElements = function(_attr) {

    if(!config.json)
      throw new Error("JSON is not valid.", config.json);

    var reduced_json = [];
    var index = (_attr && _attr.indexOf("*") == 0) ? 1 : 0;

    if(_attr == undefined) {
      reduced_json.push(config.json);
    }
    else if(_attr.indexOf("#") == index) {
      reduced_json = this.find("id", _attr.substring(index + 1), index);
    }
    else if(_attr.indexOf(".") == index) {
      reduced_json = this.find("class", _attr.substring(index + 1), index);
    }
    else if(_attr.indexOf(":") == index) {
      reduced_json = this.find("name", _attr.substring(index + 1), index);
    }
    else {
      throw new SyntaxError("JSONAttribute '" + _attr + "' is not valid.",
                                                                   _attr);
    }

    return reduced_json;
  };

  var buildHTMLElement = function(json, element) {

    if(json.hasOwnProperty("type")) {
      buildInputElement(json, element);
    }
    else {
      var group_element = buildDivGroup(json);
      for(var i in json) {
        if(json[i] instanceof Array) {
          for(var j in json[i]) {
            buildHTMLElement(json[i][j], group_element);
          }
        }
      }
      element.appendChild(group_element);
    }
  };

  var buildDivGroup = function(json) {

    var div = document.createElement("div");
    if(json.id != undefined)
      div.setAttribute("id", json.id);
    if(json.class != undefined)
      div.setAttribute("class", json.class);
    if(config.show_group_label && json.label != undefined) {
      var span = document.createElement("span");
      if(json.label.title != undefined)
        span.setAttribute("title", json.label.title);
      span.appendChild(document.createTextNode(json.label.value));
      div.appendChild(span);
    }

    return div;
  };

  var buildInputElement = function(json, element) {//TODO: Add mask/validation by types

    if(config.show_input_label && json.label != undefined) {
      var label = document.createElement("label");
      if(json.id != undefined)
        label.setAttribute("for", json.id);
      if(json.label.class != undefined)
        label.setAttribute("class", json.label.class);
      if(json.label.title != undefined)
        label.setAttribute("title", json.label.title);
      label.appendChild(document.createTextNode(json.label.value));
      element.appendChild(label);
    }

    if(json.name == undefined)
      throw new SyntaxError("InputName is required.", json.name);

    switch(json.type) {
      case "text":
      case "number":
      case "date":
      case "currency":
        buildInputText(json, element);
        break;
      case "radio":
      case "checkbox":
        buildInputCheckboxRadio(json, element);
        break;
      case "textarea":
        buildInputTextarea(json, element);
        break;
      case "select":
        buildInputSelect(json, element);
        break;
      case "file":
        buildInputFile(json, element);
        break;
      default:
        throw new SyntaxError("Invalid InputType.", json.type);
    }
  };

  var buildInputText = function(json, element) {

      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", json.name);
      if(json.id != undefined)
        input.setAttribute("id", json.id);
      if(json.class != undefined)
        input.setAttribute("class", json.class);
      if(json.default != undefined)
        input.setAttribute("value", json.default);
      if(json.title != undefined)
        input.setAttribute("title", json.title);
      if(config.show_placeholder &&
          (json.placeholder != undefined || json.label != undefined)) {
        input.setAttribute("placeholder",
          json.placeholder == undefined ? json.label.value : json.placeholder);
      }

      element.appendChild(input);
  };

  var buildInputTextarea = function(json, element) {

    var textarea = document.createElement("textarea");
    textarea.setAttribute("name", json.name);
    if(json.id != undefined)
      textarea.setAttribute("id", json.id);
    if(json.class != undefined)
      textarea.setAttribute("class", json.class);
    if(json.title != undefined)
      textarea.setAttribute("title", json.title);
    if(json.default != undefined)
      textarea.appendChild(document.createTextNode(json.default));
    if(config.show_placeholder &&
        (json.placeholder != undefined || json.label != undefined)) {
      input.setAttribute("placeholder",
        json.placeholder == undefined ? json.label.value : json.placeholder);
    }

    element.appendChild(textarea);
  };

  var buildInputCheckboxRadio = function(json, element) {

    for(var i in json.values) {
      var input = document.createElement("input");
      input.setAttribute("type", json.type);
      input.setAttribute("name", json.name);
      input.setAttribute("value", json.values[i].value);
      if(json.id != undefined)
        input.setAttribute("id", json.id + "_" + i);
      if(json.class != undefined)
        input.setAttribute("class", json.class);
      if(json.default == json.values[i].value)
        input.setAttribute("checked", "checked");

      if(json.values[i].label != undefined) {
        var label = document.createElement("label");
        if(json.id != undefined)
          label.setAttribute("for", json.id + "_" + i);
        if(json.values[i].label.class != undefined)
          label.setAttribute("class", json.values[i].label.class);
        if(json.values[i].label.title != undefined)
          label.setAttribute("title", json.values[i].label.title);
        label.appendChild(input);
        label.appendChild(document.createTextNode(json.values[i].label.value));
        element.appendChild(label);
      }
      else
        element.appendChild(input);
    }
  };

  var buildInputSelect = function(json, element) {

    var select = document.createElement("select");
    select.setAttribute("name", json.name);
    if(json.id != undefined)
      select.setAttribute("id", json.id);
    if(json.class != undefined)
      select.setAttribute("class", json.class);
    if(json.title != undefined)
      select.setAttribute("title", json.title);
    if(config.multiselect_input)
      select.setAttribute("multiple", "multiple");

    for(var i in json.values) {//TODO: Add function/config to get option dynamic
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(json.values[i].label.value));
      option.setAttribute("value", json.values[i].value);
      if(json.values[i].label.class != undefined)
        option.setAttribute("class", json.values[i].label.class);
      if(json.default == json.values[i].value)
        option.setAttribute("selected", "selected");
      select.appendChild(option);
    }

    element.appendChild(select);
  };

  var buildInputFile = function(json, element) {

    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", json.name);
    if(json.id != undefined)
      input.setAttribute("id", json.id);
    if(json.class != undefined)
      input.setAttribute("class", json.class);
    if(json.accept != undefined)
      input.setAttribute("accept", json.accept);
    if(json.title != undefined)
      input.setAttribute("title", json.title);
    if(config.multifile_input)
      input.setAttribute("multiple", "multiple");
    element.appendChild(input);
  };

  window.Leafbird = Leafbird, window.lb = Leafbird;

})();
