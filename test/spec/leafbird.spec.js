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
  it('Confugure changes on original config.', function() {
    var leafbrd = Leafbird({});
    leafbrd.configure({});
    expect(leafbrd.config).toEqual(undefined);
  });

  it('verify if a leafbird global object has defined', function(){
    expect(leafbird).toBeDefined();
  });
});
