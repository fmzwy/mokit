(function () {

  'use strict';

  var Component1 = new mokit.Component({
    template: '<span m:on:click="clickMe">{{name}}: {{$route.query.say||"..."}}</span>',
    properties: { name: 'Component1' },
    clickMe: function () {
      alert('My name is' + this.name);
    }
  });

  var Component2 = Component1.extend({
    properties: { name: 'Component2' },
  });

  var router = new mokit.Router();
  router.map({
    '/': '/test1',
    '/test1': Component1,
    '/test2': Component2
  });

  var App = mokit.Component({
    template: '<div>\
    <button m:link="/test1">test1</button>\
		<button m:link="/test2">test2</button>\
    <m:router-view></m:router-view>\
    </div>'
  });

  router.start(App, document.getElementById('app'));

})();