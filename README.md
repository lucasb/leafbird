Leafbird
========

[![Build Status](https://travis-ci.org/lucasb/leafbird.svg?branch=master)](https://travis-ci.org/lucasb/leafbird)
[![Coverage Status](https://coveralls.io/repos/github/lucasb/leafbird/badge.svg?branch=master)](https://coveralls.io/github/lucasb/leafbird?branch=master)

Leafbird is an UI form builder based on JSON templates using HTML5 features with all modern browsers compatibility.

How to Install
-----
- Bower

Simple install bower command and it is already to use.
```
bower install leafbird
```

- No bower

Get `leafbird.min.js` file in 'dest' folder from Github repository and save in your project.

Easy to Start
-----
Leafbird is fun, see how to use it is easy:

```html
<html>
  <body></body>
  <script src="./dest/leafbird.min.js" type="text/javascript"></script>
  <script type="text/javascript">
    var data = {
      "name": "text",
      "type": "text",
      "default": "Default Value"
    }

    leafbird.configure({json: data});
    leafbird.rendering.print(document.body);
  </script>
</html>
```
For more example see demo folder.

Features
-----
Beyond build form from JSON, look what Leafbird also can do:

- Automatically validate forms;
- Change fields object in runtime;
- Find for a specific field or group;
- Get or print a form part;
- Push model from backend to form in frontend.

To see more, look on documentation.

License
-----
The project Leafbird is licensed under the Apache license version 2.0.

Copyright 2015 Leafbird

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
