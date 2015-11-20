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

if(!window.leafbird)
  window.leafbird = new Leafbird();

/*
leafbird.module('leafbird.Leafbird', Leafbird)
        .dependecies({'element.Element': element,
                      'rendering.Rendering': rendering,
                      'validation.Validation': validation});
*/
/**
 * { function_description }
 *
 * @todo Write docs to this
 * @todo Verify docs on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function#Function_instances
 * @todo Make a module enhancement using singleton pattern: http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
 * @class
 * @return     {(Array|Function|Object|boolean|number)}  { description_of_the_return_value }
 */
function Leafbird() {

  var leafbird = this;

  leafbird.configure = configure;

var configs = {};
  /**
   * @todo Write JSDoc here
   *
   * { function_description }
   *
   * @method     configure
   * @param      {<type>}  args    { description }
   */
  function configure(args) {

    if(args === undefined) {
      return configs;
    }

    for(var key in args) {
      if(configs.hasOwnProperty(key) && args[key] !== undefined){
        configs[key] = args[key];
      }
    }
  };
}

})();
