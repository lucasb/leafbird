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

// load json object from file via jsonp
var parseResponse = function(data) {

  // configure general paramters after lib was intanced
  lb.configure({
    json: data,
    required_label: ' *',
    validation_callback: validateFormCallback,
    show_group_label: true,
    show_input_label: true,
    multifile_input: true
  });

  // get a elements object before to set on DOM, to add/change anything
  console.log(lb.getElements());
  console.log(lb.find("id", "text"));

  // print into from html elements
  var element = document.getElementById("form");
  lb.print(element);

  var element2 = document.getElementById("form2");
  lb.print(element2, ":text", {replace_element: true, show_placeholder: true,
                                                      show_input_label: false});

};

// start lib to use
var lb = Leafbird();

// define function of callback validation to Leafbird call
var validateFormCallback = function(invalidFields, form) {

  var divErrors = document.createElement('div');
  divErrors.setAttribute('class', 'errors');
  divErrors.appendChild(document.createTextNode('Invalid fields:'));

  for(var i = 0; i < invalidFields.length; i++) {
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(invalidFields[i].name));
    divErrors.appendChild(span);
  }

  form.insertBefore(divErrors, form.firstChild);
}

// Add function validation from Leafbird to onsubmit forms events
var forms = document.getElementsByTagName('form');
for(var i = 0; i < forms.length; i++) {
  forms[i].onsubmit = function (event) {
    if(this.firstChild.className == 'errors')
      this.removeChild(this.firstChild);
    window.scrollTo(0, 0);
    return lb.validateForm(this);
  }
}
