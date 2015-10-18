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

  it('verify if configure method make configuration on the leafbird object',
    function() {
      leafbird.configure({});
      expect(leafbird.config).toEqual(undefined);
    }
  );
});
