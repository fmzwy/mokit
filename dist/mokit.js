(function e(t,i,n){function s(o,c){if(!i[o]){if(!t[o]){var h=typeof require=="function"&&require;if(!c&&h)return h(o,!0);if(r)return r(o,!0);var a=new Error("Cannot find module '"+o+"'");throw a.code="MODULE_NOT_FOUND",a}var u=i[o]={exports:{}};t[o][0].call(u.exports,function(e){var i=t[o][1][e];return s(i?i:e)},u,u.exports,e,t,i,n)}return i[o].exports}var r=typeof require=="function"&&require;for(var o=0;o<n.length;o++)s(n[o]);return s})({1:[function(e,t,i){t.exports={name:"mokit",version:"0.0.1"}},{}],2:[function(e,t,i){const n=e("cify");const s=e("../template");const r=s.utils;const o=s.Directive;const c=s.Expression;function h(e){var t=e.component;var i=e.parent;return new o({name:e.name,type:o.TYPE_ELEMENT,literal:true,final:true,level:o.LEVEL_ELEMENT,bind:function(){this.component=new t({parent:e.parent||this.scope});this.handleId();this.handleAttrs();this.handleContents();this.component.$mount(this.node);if(this.node.parentNode){this.node.parentNode.removeChild(this.node)}},handleId:function(){if(!i)return;var e=this.node.getAttribute(this.prefix+":id");if(e in i)throw new Error("Conflicting component id `"+e+"`");i[e]=this.component},handleAttrs:function(){this.propExprs={};this.attrs=[].slice.call(this.node.attributes);var e=new RegExp("^"+this.prefix+":","i");this.attrs.forEach(function(t){if(e.test(t.name))return;if(t.name in this.component.$properties){this.propExprs[t.name]=new c(t.value)}else{this.component.$element.setAttribute(t.name,t.value)}},this)},handleContents:function(){this.placeHandlers=[];var e=[].slice.call(this.component.$element.querySelectorAll("["+this.prefix+"\\:content]"));e.forEach(function(e){var t=null;var i=e.getAttribute(this.prefix+":content");if(!i){t=[].slice.call(this.node.childNodes)}else{t=[].slice.call(this.node.querySelectorAll(i))}if(!t||t.length<1)return;e.innerHTML="";t.forEach(function(t){e.appendChild(t.cloneNode(true))},this);var n=this.compiler.compile(e);this.placeHandlers.push(n)},this)},execute:function(e){r.each(this.propExprs,function(t){this.component[t]=this.propExprs[t].execute(e)},this);this.placeHandlers.forEach(function(t){t(e)},this)}})}t.exports=h},{"../template":28,cify:31}],3:[function(e,t,i){const n=e("cify");const s=e("../template");const r=e("./watcher");const o=s.utils;const c=e("events");const h=s.Observer;const a=e("./component-directive");const u=["$compile","$data","$dispose","$element","$mount","$properties","$remove","$watch","_callHook","_compiled","_createData","_createProperties","_createWatches","_extends","_mounted","_observer","_onTemplateUpdate","_removed","_template","_watchers","$children","$parent","_directives","_importComponents"];const l=function(t){t=t||Object.create(null);if(o.isFunction(t.extends)){t.extends=t.extends.prototype}var i=new n({_extends:t.extends,constructor:function(t){t=t||{};o.each(t,function(e,t){if(!(e in this))this[e]=t});this._onTemplateUpdate=this._onTemplateUpdate.bind(this);this._createData(this.data);this._createProperties(this.properties);this._createWatches(this.watches);this._importComponents(e("./components"));this._importComponents(this.components);this._callHook("onInit");this._observer=h.observe(this);o.defineFreezeProp(this,"$children",[]);o.defineFreezeProp(this,"$parent",t.parent);if(this.$parent)this.$parent.$children.push(this);this.$compile();this._mounted=!!this.element},_importComponents:function(e){o.each(e,this._importComponent,this)},_importComponent:function(e,t){this._directives=this._directives||[];this._directives.push(new a({name:e,component:t,parent:this}))},_callHook:function(e,t){if(!o.isFunction(this[e]))return;this[e].apply(this,t)},_createData:function(e){if(o.isFunction(e)){this.$data=e.call(this)}else{this.$data=e||{}}o.each(this.$data,function(e){Object.defineProperty(this,e,{configurable:true,enumerable:true,get:function(){if(!this.$data)return;return this.$data[e]},set:function(t){if(!this.$data)return;this.$data[e]=t}})},this)},_createProperties:function(e){this.$properties={};var t=o.isArray(e);o.each(e,function(e,t){if(o.isFunction(t)){t={get:t}}if(!o.isObject(t)){t={value:t}}var i=t.get||t.set;var n="value"in t;if(i&&n){throw new Error("Cannot specify both value and setter/getter"+"` for property `"+e+"`")}if(!i){if(!n)t.value=null;t.get=function(){return t.value};t.set=function(e){t.value=e}}Object.defineProperty(this,e,{configurable:true,enumerable:true,get:function(){if(!t.get){throw new Error("Property `"+e+"` cannot be read")}return t.get.call(this)},set:function(i){if(!t.set){throw new Error("Property `"+e+"` cannot be written")}if(t.test&&!t.test(i)){throw new Error("Invalid value `"+i+"` for property `"+e+"`")}t.set.call(this,i);if(this.__observer__){this.__observer__.emitChange({path:e,value:i})}}});this.$properties[e]=t},this)},_createWatches:function(e){this._watchers=this._watchers||[];o.each(e,function(e,t){this.$watch(e,t)},this)},_onTemplateUpdate:function(){this._watchers.forEach(function(e){e.calc()},this)},$watch:function(e,t){if(!o.isFunction(t))return;if(!o.isFunction(e)){var i=e;e=function(){return o.getByPath(this,i)}}this._watchers.push(new r(e.bind(this),t.bind(this)))},$compile:function(){if(this._compiled)return;this._compiled=true;this._callHook("onCreate");o.defineFreezeProp(this,"$element",this.element||o.parseDom(this.template)[0]);if(!this.$element||this.$element.nodeName==="#text"){throw new Error("Invalid component template")}this._callHook("onCreated");o.defineFreezeProp(this,"_template",new s(this.$element,{directives:this._directives}));this._template.bind(this);this._template.on("update",this._onTemplateUpdate);this._callHook("onReady")},$mount:function(e,t){if(!e||this._mounted)return;this._callHook("onMount");e._targetNode=this.$element;this.$element._mountNode=e;if(t){e.appendChild(this.$element)}else if(e.parentNode){e.parentNode.insertBefore(this.$element,e)}this._mounted=true;this._removed=false;this._callHook("onMounted")},$remove:function(){if(this._removed||!this._mounted)return;this._callHook("onRemove");if(this.$element.parentNode){this.$element.parentNode.removeChild(this.$element)}this._removed=true;this._mounted=false;this._callHook("onRemoved")},$dispose:function(){this.$remove();this.$children.forEach(function(e){e.$dispose()},this);if(this.$parent){var e=this.$parent.$children.indexOf(this);this.$parent.$children.splice(e,1)}this._callHook("onDispose");if(this._compiled){this._template.unbind()}this._callHook("onDisposed");for(name in this){delete this[name]}["__observer__","$element","$children","$parent","_template"].forEach(function(e){delete this[e]},this);this.__proto__=null}});o.each(t,function(e,t){if(u.indexOf(e)>-1){throw new Error("Name `"+e+"` is reserved")}i.prototype[e]=t},this);i.__proto__=l.prototype;i.extend=function(e){e=e||Object.create(null);e.extends=this;return new l(e)};i.create=function(e){return new i(e)};return i};l.extend=function(e){e=e||Object.create(null);return new l(e)};t.exports=l},{"../template":28,"./component-directive":2,"./components":4,"./watcher":7,cify:31,events:32}],4:[function(e,t,i){t.exports={View:e("./view")}},{"./view":5}],5:[function(e,t,i){const n=e("../component");const s=e("ntils");const r=new n({template:"<div></div>",properties:{is:{test:function(e){return s.isFunction(e)||s.isString(e)},set:function(e){if(s.isString(e)){this.is=this.$parent&&this.$parent.components?this.$parent.components[e]:null;return}if(this._component){this._component.$dispose()}this._Component=e;this._component=new this._Component({parent:this});this._component.$mount(this.$element,true)},get:function(){return this._Component}}}});t.exports=r},{"../component":3,ntils:33}],6:[function(e,t,i){const n=e("./component");const s=e("./watcher");const r=e("./components");n.Watcher=s;n.components=r;n.Component=n;t.exports=n},{"./component":3,"./components":4,"./watcher":7}],7:[function(e,t,i){const n=e("cify");const s=e("ntils");const r=new n({constructor:function(e,t,i){if(!s.isFunction(e)||!s.isFunction(t)){throw new Error("Invalid parameters")}this.calcor=e;this.handler=t;if(i)this.calc(true)},calc:function(e){var t=this.calcor();if(e||!s.deepEqual(t,this.value)){this.handler(t,this.value)}this.value=s.clone(t)}});t.exports=r},{cify:31,ntils:33}],8:[function(e,t,i){const n=e("../.tmp/info.json");const s=e("ntils");const r=e("./template");const o=e("./component");o.version=n.version;o.Template=r;s.copy(r,o);if(window)window[n.name]=o;if(typeof define!=="undefined"&&define.amd){define(n.name,[],function(){return o})}t.exports=o},{"../.tmp/info.json":1,"./component":6,"./template":28,ntils:33}],9:[function(e,t,i){const n=e("cify");const s=e("./directive");const r=e("ntils");const o=e("./expression");const c=e("./directives");const h="m";const a=new n({constructor:function(e){e=e||Object.create(null);e.directives=e.directives||[];this.prefix=e.prefix||h;this.directives=c.concat(e.directives)},_parseMatchInfo:function(e,t,i){var n=e.toLowerCase().split(":");var s={type:t,compiler:this,node:i};if(n.length>1){s.prefix=n[0];s.name=n[1];s.decorates=n.slice(2)}else{s.prefix=null;s.name=n[0];s.decorates=[]}return s},_findDirectives:function(e){return this.directives.filter(function(t){return t.definition.test(e)},this)},_createDirectiveInstance:function(e,t){t.compiler=this;t.prefix=this.prefix;return new e(t)},_bindHandler:function(e){e.directives=e.directives.sort(function(e,t){return t.level-e.level});var t=[];r.each(e.directives,function(i,n){n.index=i;n.bind();t.push(n);if(n.final)return e.final=true},this);e.directives=t},_compileElement:function(e,t){var i=this._parseMatchInfo(t.nodeName,s.TYPE_ELEMENT,t);var n=this._findDirectives(i);n.forEach(function(n){e.directives.push(this._createDirectiveInstance(n,{handler:e,node:t,decorates:i.decorates}))},this)},_compileAttributes:function(e,t){r.toArray(t.attributes).forEach(function(i){var n=this._parseMatchInfo(i.name,s.TYPE_ATTRIBUTE,t);var r=this._findDirectives(n);r.forEach(function(s){var r=s.definition;e.directives.push(this._createDirectiveInstance(s,{handler:e,node:t,attribute:i,expression:r.literal?i.value:new o(i.value),decorates:n.decorates}))},this)},this)},_compileChildren:function(e,t){if(e.final)return;r.toArray(t.childNodes).forEach(function(t){var i=this.compile(t);i.parent=this;e.children.push(i)},this)},compile:function(e){var t=function(e){if(r.isNull(e))e=Object.create(null);t.directives.forEach(function(t){t.scope=e;t.execute(e)},this);t.children.forEach(function(t){t(e)},this)};t.dispose=function(){t.directives.forEach(function(e){e.unbind()},this);t.children.forEach(function(e){e.dispose()},this)};t.directives=[];t.children=[];if(e){this._compileElement(t,e);this._compileAttributes(t,e);this._bindHandler(t);this._compileChildren(t,e)}return t.bind(null)}});t.exports=a},{"./directive":10,"./directives":15,"./expression":27,cify:31,ntils:33}],10:[function(e,t,i){const n=e("cify");const s=e("ntils");const r=e("./expression");const o=new n({_extends:c.prototype,constructor:function(e){if(!e||!s.isString(e.name)||e.name.length<1){throw new Error("Invalid directive options")}this.customTest=e.test;delete e.test;s.copy(this._faultHanlde(e),this)},_faultHanlde:function(e){e.type=e.type||c.TYPE_ATTRIBUTE;e.level=e.level||c.LEVEL_GENERAL;e.match=e.match||e.name;if(!(e.match instanceof RegExp)){e.match=new RegExp("^"+e.match+"$","i")}if(e.tag&&!(e.tag instanceof RegExp)){e.tag=new RegExp("^"+e.tag+"$","i")}return e},test:function(e){return this.type===e.type&&(!this.tag||e.node&&this.tag.test(e.node.nodeName))&&(this.prefix===false||e.prefix===e.compiler.prefix)&&this.match.test(e.name)&&(!this.customTest||this.customTest(e))}});function c(e){const t=new o(e);const i=new n({_extends:t,constructor:function(e){s.copy(e,this)},definition:t,bind:e.bind||s.noop,execute:e.execute||function(e){this.scope=e;if(this.definition.type===c.TYPE_ELEMENT){return this.update()}var t=this.definition.literal?this.attribute.value:this.expression.execute(e);if(!s.deepEqual(this.__value__,t)){this.update(t,this.__value__);this.__value__=t}},update:e.update||s.noop,unbind:e.unbind||s.noop,utils:s,Expression:r});i.definition=t;i.__proto__=t;return i}c.Definition=o;c.TYPE_ATTRIBUTE="attribute";c.TYPE_ELEMENT="element";c.LEVEL_PREVENT=3e3;c.LEVEL_STATEMENT=2e3;c.LEVEL_ELEMENT=1e3;c.LEVEL_GENERAL=0;c.LEVEL_ATTRIBUTE=-1e3;c.LEVEL_CLOAK=-2e3;t.exports=c},{"./expression":27,cify:31,ntils:33}],11:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"attr",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_ATTRIBUTE,prefix:false,literal:true,match:/[\s\S]/i,bind:function(){this.computedName=this.attribute.name;this.computedValue=this.attribute.value;this.nameExpr=new this.Expression(this.attribute.name,true);this.valueExpr=new this.Expression(this.attribute.value,true)},execute:function(e){var t=this.nameExpr.execute(e);if(this.computedName!==t){this.node.removeAttribute(this.computedName);this.computedName=t;if(!this.utils.isNull(this.computedName)&&this.computedName.length>0){this.node.setAttribute(this.computedName,"")}}var i=this.valueExpr.execute(e);i=this.utils.isNull(i)?"":i;if(this.computedValue!==i){this.computedValue=i;this.node.setAttribute(this.computedName,this.computedValue)}}})},{"../directive":10}],12:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"each",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_STATEMENT,final:true,literal:true,bind:function(){this.mountNode=document.createTextNode("");this.node.parentNode.insertBefore(this.mountNode,this.node);this.node.removeAttribute(this.attribute.name);this.node.parentNode.removeChild(this.node);this.parseExpr();this.eachItems=[]},parseExpr:function(){this.eachType=this.attribute.value.indexOf(" in ")>-1?"in":"of";var e=this.attribute.value.split(" "+this.eachType+" ");var t="with(scope){utils.each("+e[1]+",fn,this)}";this.each=new Function("utils","scope","fn",t).bind(null,this.utils);var i=e[0].split(",").map(function(e){return e.trim()});if(this.eachType=="in"){this.keyName=i[0];this.valueName=i[1]}else{this.keyName=i[1];this.valueName=i[0]}},execute:function(e){var t=0;var i=document.createDocumentFragment();this.each(e,function(n,s){var r={__proto__:e};if(this.keyName)r[this.keyName]=n;if(this.valueName)r[this.valueName]=s;var o=this.eachItems[n];if(o){if(!o.handler)console.log("a",this.eachItems,o);o.handler(r)}else{var c=Object.create(null);c.node=this.node.cloneNode(true);i.appendChild(c.node);c.handler=this.compiler.compile(c.node);c.handler(r);this.eachItems[n]=c}t++}.bind(this));this.eachItems.splice(t).forEach(function(e){e.node.parentNode.removeChild(e.node)});if(i.childNodes.length>0){this.mountNode.parentNode.insertBefore(i,this.mountNode)}}})},{"../directive":10}],13:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"id",type:n.TYPE_ATTRIBUTE,update:function(e){this.scope[e]=this.node}})},{"../directive":10}],14:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"if",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_STATEMENT,final:true,bind:function(){this.mountNode=document.createTextNode("");this.node.parentNode.insertBefore(this.mountNode,this.node);this.node.removeAttribute(this.attribute.name);this.node.parentNode.removeChild(this.node);this._oldValue=false;this._handler=this.compiler.compile(this.node)},execute:function(e){var t=this.expression.execute(e);var i=this.node._targetNode||this.node;if(t){this._handler(e);if(!this._oldValue){this.mountNode.parentNode.insertBefore(i,this.mountNode)}}else if(this._oldValue&&i.parentNode){i.parentNode.removeChild(i)}this._oldValue=t}})},{"../directive":10}],15:[function(e,t,i){t.exports=[e("./text"),e("./attr"),e("./each"),e("./if"),e("./prop"),e("./on"),e("./inner-html"),e("./inner-text"),e("./prevent"),e("./id"),e("./model-input"),e("./model-select"),e("./model-radio"),e("./model-checkbox"),e("./model-editable")]},{"./attr":11,"./each":12,"./id":13,"./if":14,"./inner-html":16,"./inner-text":17,"./model-checkbox":18,"./model-editable":19,"./model-input":20,"./model-radio":21,"./model-select":22,"./on":23,"./prevent":24,"./prop":25,"./text":26}],16:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"html",type:n.TYPE_ATTRIBUTE,update:function(e){this.node.innerHTML=e}})},{"../directive":10}],17:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"text",type:n.TYPE_ATTRIBUTE,update:function(e){this.node.innerText=e}})},{"../directive":10}],18:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"model",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_ATTRIBUTE,tag:"input",test:function(e){var t=e.node.getAttribute("type");return t==="checkbox"},bind:function(){this.bindPath=this.attribute.value;this.node.addEventListener("change",function(){if(this.utils.isNull(this.scope))return;var e=this.utils.getByPath(this.scope,this.bindPath);if(this.utils.isArray(e)&&this.node.checked){e.push(this.node.value)}else if(this.utils.isArray(e)&&!this.node.checked){var t=e.indexOf(this.node.value);e.splice(t,1)}else{this.utils.setByPath(this.scope,this.bindPath,this.node.checked)}}.bind(this),false)},execute:function(e){this.scope=e;var t=this.expression.execute(e);if(this.utils.isArray(t)){this.node.checked=t.indexOf(this.node.value)>-1}else{this.node.checked=t}}})},{"../directive":10}],19:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"model",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_ATTRIBUTE,test:function(e){return e.node.isContentEditable},bind:function(){this.bindPath=this.attribute.value;this.node.addEventListener("input",function(){if(this.utils.isNull(this.scope))return;this.utils.setByPath(this.scope,this.bindPath,this.node.innerHTML)}.bind(this),false)},execute:function(e){var t=this.expression.execute(e);if(this.node.innerHTML!==t){this.node.innerHTML=t}}})},{"../directive":10}],20:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"model",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_ATTRIBUTE,tag:/^(input|textarea)$/i,test:function(e){var t=e.node.getAttribute("type");return t!=="radio"&&t!=="checkbox"},bind:function(){this.bindPath=this.attribute.value;this.node.addEventListener("input",function(){if(this.utils.isNull(this.scope))return;this.utils.setByPath(this.scope,this.bindPath,this.node.value)}.bind(this),false)},execute:function(e){var t=this.expression.execute(e);if(this.node.value!==t){this.node.value=t}}})},{"../directive":10}],21:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"model",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_ATTRIBUTE,tag:"input",test:function(e){var t=e.node.getAttribute("type");return t==="radio"},bind:function(){this.bindPath=this.attribute.value;this.node.addEventListener("change",function(){if(this.utils.isNull(this.scope))return;this.utils.setByPath(this.scope,this.bindPath,this.node.value)}.bind(this),false)},execute:function(e){this.scope=e;var t=this.expression.execute(e);this.node.checked=t==this.node.value}})},{"../directive":10}],22:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"model",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_ATTRIBUTE,final:true,tag:"select",bind:function(){this.bindPath=this.attribute.value;this.node.removeAttribute(this.attribute.name);this._handler=this.compiler.compile(this.node);this.node.addEventListener("change",function(){if(this.utils.isNull(this.scope))return;var e=this.node.selectedOptions;var t=this.node.multiple?[].slice.call(e).map(function(e){return e.value},this):e[0].value;this.utils.setByPath(this.scope,this.bindPath,t)}.bind(this),false)},execute:function(e){this.scope=e;this._handler(e);var t=this.expression.execute(e);if(!this.utils.isArray(t))t=[t];[].slice.call(this.node.options).forEach(function(e){e.selected=t.indexOf(e.value)>-1},this)}})},{"../directive":10}],23:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"on",type:n.TYPE_ATTRIBUTE,bind:function(){this.node.addEventListener(this.decorates[0],function(e){if(this.utils.isNull(this.scope))return;var t={__proto__:this.scope};t.event=t.$event=e;this.expression.execute(t)}.bind(this),false)},execute:function(e){this.scope=e}})},{"../directive":10}],24:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"prevent",type:n.TYPE_ATTRIBUTE,level:n.LEVEL_PREVENT,final:true})},{"../directive":10}],25:[function(e,t,i){const n=e("../directive");t.exports=new n({name:"prop",type:n.TYPE_ATTRIBUTE,update:function(e){this.node[this.decorates[0]]=e}})},{"../directive":10}],26:[function(e,t,i){const n=e("../directive");const s=e("../expression");const r="cloak";t.exports=new n({name:"#text",type:n.TYPE_ELEMENT,prefix:false,test:function(e){return e.node.nodeValue.trim().length>4},bind:function(){this.expr=new s(this.node.nodeValue,true);this.node.nodeValue="";if(this.node.parentNode){this.node.parentNode.removeAttribute(r)}},execute:function(e){this.scope=e;var t=this.expr.execute(e);if(this.node.nodeValue!==t){this.node.nodeValue=t}}})},{"../directive":10,"../expression":27}],27:[function(e,t,i){const n=e("cify");const s=e("ntils");const r=new n({constructor:function(e,t){this.func=t?this._compileMixedCode(e):this._compileCode(e)},_compileCode:function(e){e=this._escapeEOL(this._wrapCode(e));return this._createFunction(e)},_compileMixedCode:function(e){var t=this._parseMixedCode(e);e=this._escapeEOL(t.join("+"));return this._createFunction(e)},_createFunction:function(e){var t=new Function("utils","scope","with(scope){return "+e+"}");return t.bind(null,s)},_parseMixedCode:function(e){var t=0,i=e.length;var n="",r=false,o=[];while(t<=i){var c=e[t++];var h=e[t];if(s.isNull(c)){if(n.length>0){o.push('"'+this._escapeCode(n)+'"')}n="";r=false}else if(!r&&c+h=="{{"){if(n.length>0){o.push('"'+this._escapeCode(n)+'"')}n="";r=true;t++}else if(r&&c+h=="}}"){if(n.length>0){o.push(this._wrapCode(n))}n="";r=false;t++}else{n+=c}}return o},_escapeCode:function(e){return e.replace(/"/,'\\"').replace("\r\n","\\r\\n").replace("\n","\\n")},_escapeEOL:function(e){return e.replace(/\n/gm,"\\\n")},_wrapCode:function(e){return"((function(){try{return ("+e+")}catch(err){console.error(err);return err;}})())"},execute:function(e){if(s.isNull(e)){e=Object.create(null)}return this.func.call(e,e)}});t.exports=r},{cify:31,ntils:33}],28:[function(e,t,i){const n=e("./compiler");const s=e("./directive");const r=e("./expression");const o=e("./observer");const c=e("./template");const h=e("./directives/");const a=e("ntils");c.Template=c;c.Compiler=n;c.Directive=s;c.directives=h;c.Expression=r;c.Observer=o;c.utils=a;t.exports=c},{"./compiler":9,"./directive":10,"./directives/":15,"./expression":27,"./observer":29,"./template":30,ntils:33}],29:[function(e,t,i){const n=e("cify");const s=e("ntils");const r=e("events");const o="__observer__";const c="change";const h=20;const a=new n({_extends:r,constructor:function(e){if(s.isNull(e)){throw new Error("Invalid target")}var t=e[o];if(t){t.apply();return t}s.defineFreezeProp(this,"shadow",Object.create(null));s.defineFreezeProp(this,"target",e);s.defineFreezeProp(this,"parents",[]);s.defineFreezeProp(e,o,this);this.apply()},set:function(e,t){if(s.isFunction(t))return;Object.defineProperty(this.target,e,{get:function(){return this[o].shadow[e]},set:function(t){var i=this[o];var n=i.shadow[e];if(n===t)return;if(s.isObject(t)){var r=new a(t,e);i.addChild(r,e)}if(n&&n[o]){i.removeChild(n[o],e)}i.shadow[e]=t;i.emitChange({path:e,value:t})},configurable:true,enumerable:true});this.target[e]=t},apply:function(){if(s.isArray(this.target)){this._wrapArray(this.target)}var e=this._getPropertyNames(this.target);e.forEach(function(e){var t=Object.getOwnPropertyDescriptor(this.target,e);if(!("value"in t))return;this.set(e,this.target[e])},this)},clearReference:function(){s.each(this.target,function(e,t){if(s.isNull(t))return;var i=t[o];if(i)this.removeChild(i)},this)},dispatch:function(e,t){t.__layer__=t.__layer__||0;t.__layer__++;if(t.__layer__>=h)return;this.emit(e,t);if(!this.parents||this.parents.length<1)return;this.parents.forEach(function(i){if(!(i.name in i.parent.target)){return i.parent.removeChild(this)}var n=s.copy(t);n.path=i.name+"."+t.path;i.parent.dispatch(e,n)},this)},addChild:function(e,t){if(s.isNull(e)||s.isNull(t)){throw new Error("Invalid paramaters")}e.parents.push({parent:this,name:t})},removeChild:function(e,t){if(s.isNull(e)){throw new Error("Invalid paramaters")}var i=-1;e.parents.forEach(function(e,n){if(e.parent===this&&e.name===t){i=n}},this);if(i>-1){e.parents.splice(i,1)}},emitChange:function(e){this.dispatch(c,e)},_getPropertyNames:function(){var e=s.isArray(this.target)?this.target.map(function(e,t){return t}):Object.keys(this.target);return e.filter(function(e){return e!==o})},_wrapArray:function(e){s.defineFreezeProp(e,"push",function(){var t=[].slice.call(arguments);t.forEach(function(t){this[o].set(e.length,t)},this);this[o].emitChange({path:"length",value:this.length})});s.defineFreezeProp(e,"pop",function(){var e=[].pop.apply(this,arguments);this[o].emitChange({path:this.length,value:e});this[o].emitChange({path:"length",value:this.length});return e});s.defineFreezeProp(e,"unshift",function(){var e=[].slice.call(arguments);e.forEach(function(e){this[o].set(0,e)},this);this[o].emitChange({path:"length",value:this.length})});s.defineFreezeProp(e,"shift",function(){var e=[].shift.apply(this,arguments);this[o].emitChange({path:0,value:e});this[o].emitChange({path:"length",value:this.length});return e});s.defineFreezeProp(e,"splice",function(){var e=arguments[0];var t=s.isNull(arguments[1])?e+arguments[1]:this.length-1;var i=[].splice.apply(this,arguments);for(var n=e;n<=t;n++){this[o].emitChange({path:n,value:i[n-e]})}this[o].emitChange({path:"length",value:this.length});return i});s.defineFreezeProp(e,"set",function(e,t){if(e>=this.length){this[o].emitChange({path:"length",value:this.length})}this[o].set(e,t)})}});a.observe=function(e){return new a(e)};t.exports=a},{cify:31,events:32,ntils:33}],30:[function(e,t,i){const n=e("cify");const s=e("./observer");const r=e("events");const o=e("./compiler");const c=new n({_extends:r,constructor:function(e,t){t=t||Object.create(null);this.element=e;this.compiler=t.compiler||new o(t);this.render=this.compiler.compile(this.element);this.update=this.update.bind(this);this._update=this._update.bind(this);this._updateTimer=0},update:function(){if(this._updateTimer){clearTimeout(this._updateTimer);this._updateTimer=null}this._updateTimer=setTimeout(this._update,0)},_update:function(){if(!this._updateTimer||!this.observer)return;this.emit("update",this);this.render(this.observer.target)},bind:function(e,t){this.unbind();this.observer=new s(e);this.observer.on("change",this.update);if(!t)this.update()},unbind:function(){if(!this.observer)return;this.observer.removeListener("change",this.update);this.observer.clearReference();this.observer=null},dispose:function(){this.unbind();this.render.dispose()}});t.exports=c},{"./compiler":9,"./observer":29,cify:31,events:32}],31:[function(e,t,i){(function(){var e=function(){var e=["switch(args.length){"];for(var t=20;t>0;t--){var i=[];for(var n=0;n<t;n++)i.push("args["+n+"]");e.push("case "+t+":return new Fn("+i.join(",")+");")}e.push("case 0:default:return new Fn();}");return new Function("Fn","args",e.join(""))}();function i(e){var t=Object.getOwnPropertyNames(e);if(e.__proto__){t.push.apply(t,i(e.__proto__))}return t}function n(e,t){if(e.__proto__==t.prototype){return true}else if(e.prototype){return n(e.prototype,t)}else{return false}}function s(e,t){var n=function(){if(t.constructor){t.constructor.apply(e,arguments)}};delete n.name;var s=i(t);s.forEach(function(i){if(i=="_super"||i=="_extends"||i=="_static"||i=="constructor"){return}if(typeof t[i]==="function"){n[i]=n[i]||t[i].bind(e)}else{n[i]=n[i]||t[i]}});n.__proto__={};return n}function r(t){var i=(typeof t==="function"?t():t)||{};var r=i._extends;var o=i._static||{};if(typeof r==="function"){i.__proto__=r.prototype;o.__proto__=r}else if(r){i.__proto__=r}else{i.__proto__={}}i.__defineGetter__("_super",function(){this.__super__=this.__super__||s(this,i.__proto__);return this.__super__});c.prototype=i;c.__proto__=o;function c(){var t=this;if(typeof r==="function"){t=e(r,arguments)}t.constructor=c;t._static=t.Class=c;t.__proto__=c.prototype;var n=t.__proto__.constructor;if(n!=null&&n!=Object){var s=n.apply(t,arguments);t=s&&i.hasOwnProperty("constructor")?s:t}t.__proto__=c.prototype;delete t._extends;return t}c.extendsOf=function(e){return n(this,e)};c.superOf=function(e){return n(e,this)};return c}r.prototype.__proto__=Function.prototype;r.Class=r;if(typeof t!="undefined"){t.exports=r}if(typeof define=="function"&&define.amd){define("cify",[],function(){return r})}if(typeof window!="undefined"){window.cify=window.Class=r}})()},{}],32:[function(e,t,i){function n(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}t.exports=n;n.EventEmitter=n;n.prototype._events=undefined;n.prototype._maxListeners=undefined;n.defaultMaxListeners=10;n.prototype.setMaxListeners=function(e){if(!r(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");this._maxListeners=e;return this};n.prototype.emit=function(e){var t,i,n,r,h,a;if(!this._events)this._events={};if(e==="error"){if(!this._events.error||o(this._events.error)&&!this._events.error.length){t=arguments[1];if(t instanceof Error){throw t}else{var u=new Error('Uncaught, unspecified "error" event. ('+t+")");u.context=t;throw u}}}i=this._events[e];if(c(i))return false;if(s(i)){switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:r=Array.prototype.slice.call(arguments,1);i.apply(this,r)}}else if(o(i)){r=Array.prototype.slice.call(arguments,1);a=i.slice();n=a.length;for(h=0;h<n;h++)a[h].apply(this,r)}return true};n.prototype.addListener=function(e,t){var i;if(!s(t))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",e,s(t.listener)?t.listener:t);if(!this._events[e])this._events[e]=t;else if(o(this._events[e]))this._events[e].push(t);else this._events[e]=[this._events[e],t];if(o(this._events[e])&&!this._events[e].warned){if(!c(this._maxListeners)){i=this._maxListeners}else{i=n.defaultMaxListeners}if(i&&i>0&&this._events[e].length>i){this._events[e].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[e].length);if(typeof console.trace==="function"){console.trace()}}}return this};n.prototype.on=n.prototype.addListener;n.prototype.once=function(e,t){if(!s(t))throw TypeError("listener must be a function");var i=false;function n(){this.removeListener(e,n);if(!i){i=true;t.apply(this,arguments)}}n.listener=t;this.on(e,n);return this};n.prototype.removeListener=function(e,t){var i,n,r,c;if(!s(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;i=this._events[e];r=i.length;n=-1;if(i===t||s(i.listener)&&i.listener===t){delete this._events[e];if(this._events.removeListener)this.emit("removeListener",e,t)}else if(o(i)){for(c=r;c-- >0;){if(i[c]===t||i[c].listener&&i[c].listener===t){n=c;break}}if(n<0)return this;if(i.length===1){i.length=0;delete this._events[e]}else{i.splice(n,1)}if(this._events.removeListener)this.emit("removeListener",e,t)}return this};n.prototype.removeAllListeners=function(e){var t,i;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[e])delete this._events[e];return this}if(arguments.length===0){for(t in this._events){if(t==="removeListener")continue;this.removeAllListeners(t)}this.removeAllListeners("removeListener");this._events={};return this}i=this._events[e];if(s(i)){this.removeListener(e,i)}else if(i){while(i.length)this.removeListener(e,i[i.length-1])}delete this._events[e];return this};n.prototype.listeners=function(e){var t;if(!this._events||!this._events[e])t=[];else if(s(this._events[e]))t=[this._events[e]];else t=this._events[e].slice();
return t};n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(s(t))return 1;else if(t)return t.length}return 0};n.listenerCount=function(e,t){return e.listenerCount(t)};function s(e){return typeof e==="function"}function r(e){return typeof e==="number"}function o(e){return typeof e==="object"&&e!==null}function c(e){return e===void 0}},{}],33:[function(e,t,i){(function(e){"use strict";e.noop=function(){};e.isNull=function(e){return e===null||typeof e==="undefined"};e.trim=function(e){if(this.isNull(e))return e;if(e.trim){return e.trim()}else{return e.replace(/(^[\\s]*)|([\\s]*$)/g,"")}};e.replace=function(e,t,i){if(this.isNull(e))return e;return e.replace(new RegExp(t,"g"),i)};e.startWith=function(e,t){if(this.isNull(e)||this.isNull(t))return false;return e.indexOf(t)===0};e.contains=function(e,t){var i=this;if(this.isNull(e)||this.isNull(t))return false;return e.indexOf(t)>-1};e.endWith=function(e,t){if(this.isNull(e)||this.isNull(t))return false;return e.indexOf(t)===e.length-t.length};e.has=e.hasProperty=function(e,t){if(this.isNull(e)||this.isNull(t))return false;return t in e||e.hasOwnProperty(t)};e.isFunction=function(e){if(this.isNull(e))return false;return typeof e==="function"};e.isString=function(e){if(this.isNull(e))return false;return typeof e==="string"||e instanceof String};e.isNumber=function(e){if(this.isNull(e))return false;return typeof e==="number"||e instanceof Number};e.isBoolean=function(e){if(this.isNull(e))return false;return typeof e==="boolean"||e instanceof Boolean};e.isElement=function(e){if(this.isNull(e))return false;if(window.Element)return e instanceof Element;else return e.tagName&&e.nodeType&&e.nodeName&&e.attributes&&e.ownerDocument};e.isText=function(e){if(this.isNull(e))return false;return e instanceof Text};e.isObject=function(e){if(this.isNull(e))return false;return typeof e==="object"};e.isArray=function(e){if(this.isNull(e))return false;var t=Object.prototype.toString.call(e)==="[object Array]";var i=e instanceof Array;var n=!this.isString(e)&&this.isNumber(e.length)&&this.isFunction(e.splice);var s=!this.isString(e)&&this.isNumber(e.length)&&e[0];return t||i||n||s};e.isDate=function(e){if(this.isNull(e))return false;return e instanceof Date};e.toArray=function(e){if(this.isNull(e))return[];return Array.prototype.slice.call(e)};e.toDate=function(e){var t=this;if(t.isNumber(e))return new Date(e);else if(t.isString(e))return new Date(t.replace(t.replace(e,"-","/"),"T"," "));else if(t.isDate(e))return e;else return null};e.each=function(e,t,i){if(this.isNull(e)||this.isNull(t))return;if(this.isArray(e)){var n=e.length;for(var s=0;s<n;s++){var r=t.call(i||e[s],s,e[s]);if(!this.isNull(r))return r}}else{for(var o in e){var r=t.call(i||e[o],o,e[o]);if(!this.isNull(r))return r}}};e.formatDate=function(e,t,i){if(this.isNull(t)||this.isNull(e))return e;e=this.toDate(e);i=i||{};var n={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"w+":e.getDay(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};if(/(y+)/.test(t)){t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))}for(var s in n){if(new RegExp("("+s+")").test(t)){var r=n[s];r=i[r]||r;t=t.replace(RegExp.$1,RegExp.$1.length==1?r:("00"+r).substr((""+r).length))}}return t};e.clone=function(e,t){if(this.isNull(e)||this.isString(e)||this.isNumber(e)||this.isBoolean(e)||this.isDate(e)){return e}var i=e;try{i=new e.constructor}catch(e){}for(var n in e){if(i[n]!=e[n]&&!this.contains(t,n)){if(typeof e[n]==="object"){i[n]=this.clone(e[n],t)}else{i[n]=e[n]}}}this.each(["toString","valueOf"],function(s,r){if(this.contains(t,n))return;i[r]=e[r]},this);return i};e.copy=function(e,t){t=t||{};this.each(e,function(i){try{t[i]=e[i]}catch(e){}});return t};e.defineFreezeProp=function(e,t,i){Object.defineProperty(e,t,{value:i,enumerable:false,configurable:true,writable:false})};e.keys=function(e){if(Object.keys)return Object.keys(e);var t=[];this.each(e,function(e){t.push(e)});return t};e.create=function(e){if(Object.create)return Object.create(e);return{__proto__:e}};e.deepEqual=function(e,t){if(e===t)return true;if(!this.isObject(e)||!this.isObject(t))return false;var i=this.keys(e);var n=this.keys(t);if(i.length!==n.length)return false;var s=i.concat(n);var r=this.create(null);var o=true;this.each(s,function(i,n){if(r[n])return;if(!this.deepEqual(e[n],t[n]))o=false;r[n]=true},this);return o};e.fromTo=function(e,t,i,n){if(!n)n=[i,i=n][0];i=Math.abs(i||1);if(e<t){for(var s=e;s<=t;s+=i)n(s)}else{for(var s=e;s>=t;s-=i)n(s)}};e.newGuid=function(){var e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)};return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()};e.map=function(e,t){var i=this.isArray(e)?[]:{};this.each(e,function(e,n){i[e]=t(e,n)});return i};e.setByPath=function(e,t,i){if(this.isNull(e)||this.isNull(t)||t===""){return}if(!this.isArray(t)){t=t.replace(/\[/,".").replace(/\]/,".").split(".")}this.each(t,function(n,s){if(this.isNull(s)||s.length<1)return;if(n===t.length-1){e[s]=i}else{e[s]=e[s]||{};e=e[s]}},this)};e.getByPath=function(e,t){if(this.isNull(e)||this.isNull(t)||t===""){return e}if(!this.isArray(t)){t=t.replace(/\[/,".").replace(/\]/,".").split(".")}this.each(t,function(t,i){if(this.isNull(i)||i.length<1)return;if(!this.isNull(e))e=e[i]},this);return e};e.unique=function(e){if(this.isNull(e))return e;var t=[];this.each(e,function(e,i){if(t.indexOf(i)>-1)return;t.push(i)});return t};e.getFunctionArgumentNames=function(e){if(!e)return[];var t=e.toString();var i=t.split(")")[0].split("=>")[0].split("(");return(i[1]||i[0]).split(",").map(function(e){return e.trim()}).filter(function(e){return e!="function"})};e.mix=function(t,i,n,s,r,o){if(!i||!t){return t||e}if(r){switch(r){case 1:return e.mix(t.prototype,i.prototype,n,s,0,o);case 2:e.mix(t.prototype,i.prototype,n,s,0,o);break;case 3:return e.mix(t,i.prototype,n,s,0,o);case 4:return e.mix(t.prototype,i,n,s,0,o);default:}}var c,h,a,u;if(s&&s.length){for(c=0,h=s.length;c<h;++c){a=s[c];isObject=e.isObject(t[a]);if(i.hasOwnProperty(a)){if(o&&isObject){e.mix(t[a],i[a])}else if(n||!(a in t)){t[a]=i[a]}}}}else{for(c in i){if(i.hasOwnProperty(c)){if(o&&e.isObject(t[c],true)){e.mix(t[c],i[c],n,s,0,true)}else if(n||!(c in t)){t[c]=i[c]}}}}return t};e.short=function(e,t){if(!e)return e;t=t||40;var i=e.length;var n=t/2;return i>t?e.substr(0,n)+"..."+e.substr(i-n):e};e.firstUpper=function(e){if(this.isNull(e))return;e[0]=e[0].toLowerCase();return e};e.parseDom=function(e){this._PARSER_DOM_DIV=this._PARSER_DOM_DIV||document.createElement("dev");this._PARSER_DOM_DIV.innerHTML=e;var t=this.toArray(this._PARSER_DOM_DIV.childNodes);this._PARSER_DOM_DIV.innerHTML="";return t};if(typeof define==="function"&&define.amd){define("ntils",[],function(){return e})}})(typeof i==="undefined"?window.ntils={}:i)},{}]},{},[8]);
