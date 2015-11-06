(function() {

'use strict';

function Leafbird(configs) {

  var lb = this;
  var configs = null;

  /**
   * Revealing Pattern
   * 
   */
  lb.configure = configure;
  lb.find = find;
  lb.print = print;
  lb.getElements = getElements;

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
    for(var key in args) {
      if(configs.hasOwnProperty(key) && args[key] != undefined){
        configs[key] = args[key];
      }
    }
  }

  function find(property, _value, _contains, _json) {

  }

  function print(element, _attr, _config) {

  }

  function getElements(_attr) {

  }
}


})();