const Directive = require('../directive');

module.exports = new Directive({
  name: 'cloak',
  type: Directive.TYPE_ATTRIBUTE,
  level: Directive.LEVEL_CLOAK,
  literal: true,
  prefix: false,

  bind: function () {
    this.node.removeAttribute(this.attribute.name);
  }

});