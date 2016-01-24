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
 * @module leafbird/validation
 */
leafbird.validation = new Validation();

/**
 * Validation provides form checks based on json specification.
 * Validate special fields and compatibility with all HTML5
 * resources for all modern browsers is another requirement.
 *
 * @class
 */
function Validation() {

  var validation = this;

  validation.validateForm = validateForm;

  var configs;

  /**
   * This method should be called to validate a form. It check same validation
   * that HTML5 and retur if is a form valid. When form is invalid callback sending
   * fields with problems and form of origen. It use the setting in config named
   * validationCallback to know how function call.
   * Configs:
   *   -> validationCallback: function to callback validation errors;
   *
   * @param   {HTMLElement}   form  HTML element that contains inputs to validate.
   *
   * @return  {boolean}       Validation status, true if all values is valid.
   */
  function validateForm(form) {

    if (!(form instanceof HTMLElement)) {
      throw new SyntaxError('Invalid HTMLElement.', form);
    }

    configs = leafbird.configure();
    var isValid = true;

    var invalidFields = [].filter.call(
      form.getElementsByTagName('*'), function(elmt) {
        return (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(elmt.nodeName) > -1 &&
                !elmt.checkValidity()) || !validateCheckboxOne(elmt);
      }
    );

    if (invalidFields.length > 0) {
      configs.validationCallback(invalidFields, form);
      isValid = false;
    }

    return isValid;
  }

  /**
   * Special case to validate if at least one in a group of checkbox is checked.
   * It use attribute required to know if that field should be check.
   *
   * @param   {HTMLElement}   element  HTML element with group checkbox to verify.
   *
   * @return  {boolean}       True if at least one checkbox is checked or it is not required.
   */
  function validateCheckboxOne(element) {

    if (element.id && element.id.indexOf('checkboxone_') > -1 &&
                                element.getAttribute('required')) {

      var checkBoxes = document.getElementsByName(
                                element.id.substring('checkboxone_'.length));

      for (var i = 0; i < checkBoxes.length; i++)
        if (checkBoxes[i].checked)
          return true;

      return false;
    }

    return true;
  }
}

})();
