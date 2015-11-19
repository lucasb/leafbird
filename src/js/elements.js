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

var leafbird = new Leafbird();

leafbird.module('Elements', Elements);

function Elements(elements) {

  var _elements;

  instance = this;
  instance.setElements = setElements;
  instance.getElements = getElements;
  instance.addElement = addElement;

  /**
   * { function_description }
   *
   * @todo Write docs to this
   * @todo Write a elements validation function, to validate schema after set
   * @method     setSchema
   * @param      {<type>}  schema  { description }
   * @return     {<type>}  { description_of_the_return_value }
   */
  function setElements(elements) {
    _elements = elements;
    return instance;
  }

  /**
   * { function_description }
   *
   * @method     getElements
   * @param      {<type>}  criteria  { description }
   */
  function getElements(criteria) {
    return _elements;
  }


  /**
   * { function_description }
   *
   * @method     getElementsById
   * @param      {<type>}  id      { description }
   * @return     {<type>}  { description_of_the_return_value }
   */
  function getElementsById(id) {
    var elements;
    return elements;
  }

  function getElementsByName(name) {
    var elements;
    return elements;
  }

  function getElementsByClass(elementClass) {
    var elements;
    return elements;
  }

  function addElement(element) {
    return instance;
  }

}

})();