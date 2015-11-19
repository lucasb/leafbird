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

/**
 * @todo Write JSDoc here
 * { function_description }
 *
 * @class
 * @return     {boolean}  { description_of_the_return_value }
 */
function Validate() {

  var validate = this;

  validate.validateForm = validateForm;

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @method     validateForm
   * @return     {boolean}  { description_of_the_return_value }
   */
  function validateForm() {
    var isValid = true;

    var invalidFields = [].filter.call(
      form.getElementsByTagName('*'), function(element) {
        return ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(element.nodeName) > -1
                && !element.checkValidity();
    });

    if(invalidFields.length>0) {
      config.validation_callback(invalidFields, form);
      isValid = false;
    }

    return isValid;

  };
}

})();