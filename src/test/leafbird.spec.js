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

describe('leafbird', function() {

  it('verify if a global object to leafbird.element was defined', function() {
    expect(leafbird).toBeDefined();
  });

  it('verify if leafbird global variable has a Leafbird object instance',
    function() {
      if (typeof leafbird !== 'Leafbird') {
        fail('leafbird global variable is not a Leafbird instance.');
      }
    }
  );

  it('verify if Leafbird has a configure method', function() {
    if (typeof leafbird.configure !== 'function') {
      fail('The Leafbird object has not a configure method');
    }
  });

  it('verify if configs() returns the configuration of Leafbird', function() {
    var defaultConfig = {
      json: null,
      validationCallback: undefined,
      replaceElement: false,
      requiredLabel: null,
      showGroupLabel: false,
      showPlaceholder: false,
      showInputLabel: false,
      multiselectInput: false,
      multifileInput: false
    };

    expect(leafbird.configure()).toEqual(defaultConfig);
  });

  it('verify if configure method make configuration on the leafbird object',
    function() {
      var configObject = {
        json: null,
        validationCallback: undefined,
        replaceElement: true,
        requiredLabel: null,
        showGroupLabel: false,
        showPlaceholder: false,
        showInputLabel: false,
        multiselectInput: false,
        multifileInput: false
      };

      leafbird.configure(configObject);
      expect(leafbird.configure()).toEqual(configObject);
    }
  );

});
