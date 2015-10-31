(function() {

'use strict';

function Leafbird() {

  var lf = this;
  var configs = null;

  lf.configure = configure;
  lf.find = find;
  lf.print = print;
  lf.getElements = getElements;
  lf.validateForm = validateForm;

  if(configs === null) {
    configs = {
      json: null,
      replace_element: false,
      validation_callback: undefined,
      required_label: null,
      show_group_label: false,
      show_placeholder: false,
      show_input_label: false,
      multiselect_input: false,
      multifile_input: false
    };
  }

  function configure(args) {

  }

  function find(property, _value, _contains, _json) {

  }

  function print(element, _attr, _config) {

  }

  function getElements(_attr) {

  }

  function validateForm(form) {

  }

}


})();