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

  // start lib to use
  lb = Leafbird({json: data});

  // configure general paramters after lib was intanced
  lb.configure({
    required_label: ' *',
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

  var requiredFunctionTest = function(json, obj) {
    console.log(json);
    console.log(obj);
  }

};

/*var forms = document.getElementsByTagName('form');
for(var i = 0; i < forms.length; i++) {
    forms[i].noValidate = true;

    forms[i].addEventListener('submit', function(event) {
        //Prevent submission if checkValidity on the form returns false.
        if(!event.target.checkValidity()) {
            event.preventDefault();
            fields = event.target.getElementsByTagName('input');
            for(i=0; i<fields.length; i++)
              if(fields[i].type !== 'submit' && !fields[i].validity.valid)
                console.log(fields[i].validity.valueMissing);

            alert('validation check.');
            //Implement you own means of displaying error messages to the user here.
        }
    }, false);
}

function getRequired(obj, msg) {
  alert(msg + ' ' + obj.title);
}


var form = document.getElementById("form3");
form.noValidate = true;

// set handler to validate the form
// onsubmit used for easier cross-browser compatibility
form.onsubmit = validateForm;

function validateForm(event) {

	// fetch cross-browser event object and form node
	event = (event ? event : window.event);
	var
		form = (event.target ? event.target : event.srcElement),
		f, field, formvalid = true;

	// loop all fields
	for (f = 0; f < form.elements.length; f++) {

		// get field
		field = form.elements[f];

		// ignore buttons, fieldsets, etc.
		if ((field.nodeName !== "INPUT" || field.type == 'submit') && field.nodeName !== "TEXTAREA" && field.nodeName !== "SELECT") continue;

		// is native browser validation available?
		if (typeof field.willValidate !== "undefined") {

			// native validation available
			if (field.nodeName === "INPUT" && field.type !== field.getAttribute("type")) {

				// input type not supported! Use legacy JavaScript validation
				field.setCustomValidity(LegacyValidation(field) ? "" : "error");

			}

			// native browser check
			field.checkValidity();

		}
		else {

			// native validation not available
			field.validity = field.validity || {};

			// set to result of validation function
			field.validity.valid = LegacyValidation(field);

			// if "invalid" events are required, trigger it here

		}

		if (field.validity.valid) {

			// remove error styles and messages
      console.log('sem erro!');
      console.log(field);
      alert(field.id + ' sem erro!');
		}
		else {

			// style field, show error, etc.
      console.log('com erro!');
      console.log(field);
      alert(field.id + ' com erro!');
			// form is invalid
			formvalid = false;
		}

	}

	// cancel form submit if validation fails
	if (!formvalid) {
		if (event.preventDefault) event.preventDefault();
	}
  return false;
	//return formvalid;
}


// basic legacy validation checking
function LegacyValidation(field) {

	var
		valid = true,
		val = field.value,
		type = field.getAttribute("type"),
		chkbox = (type === "checkbox" || type === "radio"),
		required = field.getAttribute("required"),
		minlength = field.getAttribute("minlength"),
		maxlength = field.getAttribute("maxlength"),
		pattern = field.getAttribute("pattern");

	// disabled fields should not be validated
	if (field.disabled) return valid;

    // value required?
	valid = valid && (!required ||
		(chkbox && field.checked) ||
		(!chkbox && val !== "")
	);

	// minlength or maxlength set?
	valid = valid && (chkbox || (
		(!minlength || val.length >= minlength) &&
		(!maxlength || val.length <= maxlength)
	));

	// test pattern
	if (valid && pattern) {
		pattern = new RegExp(pattern);
		valid = pattern.test(val);
	}

	return valid;
}*/
