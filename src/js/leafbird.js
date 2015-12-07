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

(function() {

'use strict';

if (!window.leafbird)
  window.leafbird = new Leafbird();

/**
 * @todo Write docs to this
 * { function_description }
 *
 * @class
 */
function Leafbird() {

  var leafbird = this;

  leafbird.configure = configure;

  /**
   * @typedef LeafbirdConfig
   * @type      {object}
   * @property  {object}   json                 Form specification.
   * @property  {boolean}  replace_element      Transclude parent element.
   * @property  {function} validation_callback  Validation callback function.
   * @property  {string}   required_label       String indicate required field.
   * @property  {boolean}  show_group_label     Display a group label.
   * @property  {boolean}  show_placeholder     Display a field placeholder.
   * @property  {boolean}  multiselect_input    Set this field as a multiselect.
   * @property  {boolean}  multifile_input      Set this field as a multifile input.
   */

  /**
   * @type {LeafbirdConfig}
   */
  var configs = {
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

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {LeafbirdConfig}  _args  Configs to change default values.
   *
   * @return  {object}  Current configs that are set.
   */
  function configure(_args) {

    if (_args !== undefined) {
      for (var key in _args) {
        if (configs.hasOwnProperty(key) && _args[key] !== undefined) {
          configs[key] = _args[key];
        }
      }
    }

    return configs;
  }
}

})();
