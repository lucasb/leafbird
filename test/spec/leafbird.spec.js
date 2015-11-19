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

describe('configure', function() {
  
  it('verify if a leafbird global object has defined', function() {
    expect(leafbird).toBeDefined();
  });

  it('verify if leafbird global variable has a Leafbird object instance',
    function() {
      if(!(leafbird instanceof Leafbird)) {
        fail('leafbird global variable is not a Leafbird instance.');
      }
    }
  );

  it('verify if Leafbird has a configure method', function() {
    if(typeof leafbird.configure !== 'function') {
      fail('The Leafbird object has not a configure method');
    }
  });

  it('verify if configs() returns the configuration of Leafbird', function() {
    var defaultConfig = {
      json: null,
      replace_element: false,
      validation_callback: undefined,
      required_label: null,
      show_group_label: false,
      show_placeholder: false,
      show_input_label: false,
      multiselect_input: false,
      multifile_input: false
    }
    expect(leafbird.configs()).toEqual(defaultConfig);
  });

  it('verify if configure method make configuration on the leafbird object',    
    function() {
      var configObject = {
        json: null,
        replace_element: true,
        validation_callback: undefined,
        required_label: true,
        show_group_label: false,
        show_placeholder: false,
        show_input_label: false,
        multiselect_input: false,
        multifile_input: false
      };

      leafbird.configure(configObject);
      expect(leafbird.configs()).toEqual(configObject);
    }
  );

});
