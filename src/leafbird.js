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
  var show_input_label = true;
  var show_placeholder = false;

  this.Leafbird = function(arg) {

    if(!(this instanceof Leafbird)) {
      return new Leafbird(arg);
    }

    this.json = arg;
  };

  Leafbird.prototype.configure = function(args) {

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

  Leafbird.prototype.print = function(element, _attr) {

    if(!(element instanceof HTMLElement)) {
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
    else if(_attr.indexOf("$") == 0) {
      reducedJSON = this.find("label", _attr.substring(1));
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

  var buildHTML = function(json) {

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

  var buildInputElement = function(json) {

    var label = document.createElement("label");
    label.setAttribute("for", json.id);
    label.appendChild(document.createTextNode(json.label));

    var input;

    switch(json.type) {
      case "text":
      case "number":
      case "date":
      case "currency":
        input = document.createElement("input");
        input.setAttribute("id", json.id);
        input.setAttribute("name", json.id);
        input.setAttribute("type", json.type);
        input.setAttribute("placeholder", json.label);
        break;
      case "boolean":

      case "check":
      case "select":
        input = document.createElement("select");
        var option = document.createElement("option");
        option.setAttribute("value", json.values[0].value);
      default:
        throw new SyntaxError("Invalid InputType.", json.type);

    }
  };

  var buildInput = function(json, _placeholder) {

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
