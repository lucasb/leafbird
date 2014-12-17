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

    this.json;

    this.Leafbird = function(arg) {
        if(!(this instanceof Leafbird)) {
            return new Leafbird(arg);
        }

        this.json = arg;
    };

    Leafbird.prototype.print = function(element, _attr) {

        if(!(element instanceof HTMLElement)) {
            throw new SyntaxError("Invalid HTMLElement.", element);
        }

        var reducedJSON = this.json;

        if(_attr == undefined) {
            // undefined print all JSON
        }
        else if(_attr.indexOf("#") == 0) { // find id in JSON
            console.log("id");
        }
        else if(_attr.indexOf(".") == 0) { // find label in JSON
            console.log("label");
        }
        else {
            throw new SyntaxError("JSONAttribute '" + _attr + "' is not valid.",
                                                                    _attr);
        }

        element.innerHTML = buildHTML(reducedJSON);

    };

    Leafbird.prototype.find = function(property, _value) {

        json = this.json;
        json;

    };

    var buildHTML = function(json) {
        json = json.inputs[0];

        var html = "";

        // check if obj is input or group
        if(json.hasOwnProperty("type")) {
            html += buildInput(json);
        }
        else {
            // recursive groups
        }

        return html;
    };

    var buildInput = function(json, _placeholder) {

        // validar se tem placeholder para gera label ou nao.
        var html = '<label>'+json.label+'</label>';

        switch(json.type) {

            case "text":
            case "number":
                html += '<input id="'+json.id+'" name="'+json.id+'" type="'+json.type+'" />';
                break;
            case "boolean":
                break;
            case "select":
                break
            default:
                throw new SyntaxError("Invalid InputType.", json.type);
        }

        return html;
    };

    window.Leafbird = Leafbird, window.lb = Leafbird;

})();
