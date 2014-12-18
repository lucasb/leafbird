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

  this.json = null;
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

    if(args["json"] != undefined)
      this.json = args["json"];
    if(args["show_group_label"] != undefined)
      show_group_label = args["show_group_label"];
    if(args["show_input_label"] != undefined)
      show_input_label = args["show_input_label"];
    if(args["show_placeholder"] != undefined)
      show_placeholder = args["show_placeholder"];
  }

  Leafbird.prototype.find = function(property, _value, _json) { //TODO: Add contains to find values

    var arr_found = [];
    json = (_json == undefined) ? this.json : _json;

    if(json.hasOwnProperty(property) &&
        (_value == undefined || json[property] == _value)) {
      arr_found.push(json);
    }

    for(i in json) {
      if(json[i] instanceof Array) {
        for(j in json[i]) {
          found = this.find(property, _value, json[i][j]);
          if(found.length > 0)
            arr_found = arr_found.concat(found);
        }
      }
    }

    return arr_found;
  };

  Leafbird.prototype.print = function(element, _attr) { // TODO: Split 2 functions getElements and print

    if(!(element instanceof HTMLElement)) { // TODO: add temp config shows to print
      throw new SyntaxError("Invalid HTMLElement.", element);
    }

    var reducedJSON = [];

    if(_attr == undefined) {
      reducedJSON.push(this.json);
    }
    else if(_attr.indexOf("#") == 0) {
      reducedJSON = this.find("id", _attr.substring(1));
    }
    else if(_attr.indexOf(".") == 0) {
      reducedJSON = this.find("class", _attr.substring(1));
    }
    else if(_attr.indexOf(":") == 0) {
      reducedJSON = this.find("name", _attr.substring(1));
    }
    else if(_attr.indexOf("$") == 0) {
      reducedJSON = this.find("label", _attr.substring(1)); // TODO: Change label structure to object with {value and class}
    }
    else {
      throw new SyntaxError("JSONAttribute '" + _attr + "' is not valid.",
                                                                   _attr);
    }

    var html = "";
    for(i in reducedJSON) {
      html += buildHTML(reducedJSON[i]);
    }

    element.innerHTML = html;
  };

  var buildInputElement = function(json, element) { // TODO: Add mask/validation by types // criar function to build text area and file

    if(json.label != undefined) {
      var label = document.createElement("label");
      if(json.id != undefined)
        label.setAttribute("for", json.id);
      label.appendChild(document.createTextNode(json.label));
      element.appendChild(label);
    }
    
    switch(json.type) {
      case "text":
      case "number":
      case "date":
      case "currency":
        buildInputText(json, element);
        break;
      case "boolean":
        buildInputRadio(json, element);
        break;
      case "check":
        buildInputCheckbox(json, element);
      case "select":
        buildInputSelect(json, element);
        break;
      default:
        throw new SyntaxError("Invalid InputType.", json.type);
    }

    return element;
  };

  var buildInputText = function(json, element) { // TODO: Add class for all inputs verify if defined // check config to print labels and placeholder
      
      var input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", json.name);
      if(json.id != undefined)
        input.setAttribute("id", json.id);
      if(json.default != undefined)
        input.setAttribute("value", json.default);
      if(json.placeholder != undefined || json.label != undefined) {
        input.setAttribute("placeholder", 
          json.placeholder == undefined ? json.label : json.placeholder);
      }

      element.appendChild(input);
  };

  var buildInputRadio = function(json, element) {

    for(i in json.values) {
      var input = document.createElement("input");
      input.setAttribute("type", "radio");
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
        label.appendChild(document.createTextNode(json.values[i].label));
        input.appendChild(label);
      }

      element.appendChild(input);
    }
  };

  var buildInputCheckbox = function(json, element) {

    for(i in json.values) {
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
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
        label.appendChild(document.createTextNode(json.values[i].label));
        input.appendChild(label);
      }

      element.appendChild(input);
    }
  };

  var buildInputSelect = function(json, element) { // TODO: change this function to acept multiselect

    var select = document.createElement("select");
    select.setAttribute("name", json.name);
    if(json.id != undefined)
      select.setAttribute("id", json.id);

    var option = document.createElement("option");
    option.setAttribute("value", json.values[0].value);

    for(i in json.values) {
      var option = document.createElement("option");
      option.appendChild(document.createTextNode(json.values[i].label));
      if(json.default == json.values[i].value)
        input.setAttribute("selected", "selected");

      element.appendChild(input);
    }
  };

  // TODO: Remove after replaces
  var buildHTML = function(json) { // TODO: Replace by buildHTMLElement function and test with values array 
                                   // TODO: add html element div to groups check label is defined and if config is true

    var html = "";

    if(json.hasOwnProperty("type")) {
      html += buildInput(json);
    }
    else {
      for(i in json) {
        if(json[i] instanceof Array) {
          for(j in json[i]) {
            html += buildHTML(json[i][j]);
          }
        }
      }
    }

    return html;
  };

  var buildInput = function(json, _placeholder) { // TODO: Replace by buildInputElement function

    // check placeholder and label to genarate html.
    var html = '<label for="'+json.id+'">'+json.label+'</label>';

    switch(json.type) {

      case "text":
      case "number":
        html += '<input id="'+json.id+'" name="'+json.id+'" type="'+json.type+'" />';
        break;
      case "boolean":
        break;
      case "select": // select-check to checkbox
        break
      default:
        throw new SyntaxError("Invalid InputType.", json.type);
    }

    return html;
  };

  window.Leafbird = Leafbird, window.lb = Leafbird;

})();
