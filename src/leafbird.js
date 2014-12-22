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

(function(arg) {

  var show_group_label = false;
  var show_input_label = false;
  var show_placeholder = false;

  this.Leafbird = function(arg) {

    if(!(this instanceof Leafbird)) {
      return new Leafbird(arg);
    }

    this.json = arg;
  };

  Leafbird.prototype.configure = function(args) { // TODO: Test this function
                                  // TODO: Config to print labels and placeholder (put if in functions)
    if(args["json"] != undefined) // TODO: Add option mark input required, functiion validation and mask by type
      this.json = args["json"];
    if(args["show_group_label"] != undefined)
      show_group_label = args["show_group_label"];
    if(args["show_input_label"] != undefined)
      show_input_label = args["show_input_label"];
    if(args["show_placeholder"] != undefined)
      show_placeholder = args["show_placeholder"];
  }

  Leafbird.prototype.find = function(property, _value, _json) { // TODO: Add contains to find values

    var arr_found = [];
    var obj = (_json == undefined) ? this.json : _json;

    for(var key in obj) {
      if(key == property && (_value == undefined || obj[property] == _value))
        arr_found.push(obj);

      if(obj[key] instanceof Object) {
        var found = this.find(property, _value, obj[key]);
        if(found.length > 0)
          arr_found = arr_found.concat(found);
      }
    }

    return arr_found;
  };

  // TODO: Remove json from constructor and add in print and config functions
  Leafbird.prototype.print = function(element, _attr) { // TODO: Split 2 functions getElements and print

    if(!(element instanceof HTMLElement)) { // TODO: add temp config shows to print
      throw new SyntaxError("Invalid HTMLElement.", element);
    }

    var reduced_json = [];

    if(_attr == undefined) {
      reduced_json.push(this.json);
    }
    else if(_attr.indexOf("#") == 0) {
      reduced_json = this.find("id", _attr.substring(1));
    }
    else if(_attr.indexOf(".") == 0) {
      reduced_json = this.find("class", _attr.substring(1));
    }
    else if(_attr.indexOf(":") == 0) {
      reduced_json = this.find("name", _attr.substring(1));
    }
    else {
      throw new SyntaxError("JSONAttribute '" + _attr + "' is not valid.",
                                                                   _attr);
    }

    for(i in reduced_json) {
      buildHTMLElement(reduced_json[i], element);
    }
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

  var buildDivGroup = function(json) {  // TODO: Add class for all inputs verify if defined
                                        // TODO: Check show label if config is true
    var div = document.createElement("div");
    if(json.id != undefined)
      div.setAttribute("id", json.id);
    if(json.label != undefined) {
      var span = document.createElement("span");
      span.appendChild(document.createTextNode(json.label.value));
      div.appendChild(span);
    }

    return div;
  };

  var buildInputElement = function(json, element) { // TODO: Add mask/validation by types
                                                    // TODO: Add class for all inputs verify if defined
    if(json.label != undefined) {
      var label = document.createElement("label");
      if(json.id != undefined)
        label.setAttribute("for", json.id);
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
      if(json.default != undefined)
        input.setAttribute("value", json.default);
      if(json.placeholder != undefined || json.label != undefined) {
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
    if(json.default != undefined)
      textarea.appendChild(document.createTextNode(json.default));
    if(json.placeholder != undefined || json.label != undefined) {
      textarea.setAttribute("placeholder",
        json.placeholder == undefined ? json.label.value : json.placeholder);
    }

    element.appendChild(textarea);
  };

  var buildInputCheckboxRadio = function(json, element) {

    for(i in json.values) {
      var input = document.createElement("input");
      input.setAttribute("type", json.type);
      input.setAttribute("name", json.name);
      input.setAttribute("value", json.values[i].value);
      if(json.id != undefined)
        input.setAttribute("id", json.id + "_" + i);
      if(json.default == json.values[i].value)
        input.setAttribute("checked", "checked");

      if(json.label != undefined) {
        var label = document.createElement("label");
        if(json.id != undefined)
          label.setAttribute("for", json.id + "_" + i);
        label.appendChild(input);
        label.appendChild(document.createTextNode(json.values[i].label.value));
        element.appendChild(label);
      }
      else
        element.appendChild(input);
    }
  };

  var buildInputSelect = function(json, element) { // TODO: Change this function to acept multiselect

    var select = document.createElement("select");
    select.setAttribute("name", json.name);
    if(json.id != undefined)
      select.setAttribute("id", json.id);

    for(i in json.values) { // TODO: Add function/config to get option dynamic
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(json.values[i].label.value));
      option.setAttribute("value", json.values[0].value);
      if(json.default == json.values[i].value)
        option.setAttribute("selected", "selected");

      select.appendChild(option);
    }

    element.appendChild(select);
  };

  var buildInputFile = function(json, element) { // TODO: Change this to add multifildes file

      var input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("name", json.name);
      if(json.id != undefined)
        input.setAttribute("id", json.id);
      if(json.acept != undefined)
        input.setAttribute("acept", json.acept);

      element.appendChild(input);
  };

  window.Leafbird = Leafbird, window.lb = Leafbird;

})();
