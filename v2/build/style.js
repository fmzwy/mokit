/*csd*/define(function(require,exports,module){"use strict";var a=require("./jquery");var f=require("./utils");var d=require("./store");var b=require("./event");var e=d.dataCache["$style"]={};exports.events=b.use(exports);exports.storeKey="style/current-name";var c=null;f.defineProperty(exports,"currentName",{get:function(){c=c||d.local.get(exports.storeKey);return c;},set:function(g){c=g;return c;}},true);f.defineProperty(exports,"defaultName",{get:function(){return Object.getOwnPropertyNames(e)[0];}},true);exports.addStyle=function(h,g){f.each(h,function(i){e[i]=(g&&g.resovleUri)?g.resovleUri(this):this;});};exports.setStyle=function(h,g){if(!f.isString(h)){return g();}if(e[h]){module.unload(e[exports.currentName()]);require(e[h],function(i){exports.currentName(h);exports.events.call("change",{name:h,style:i});f.async(function(){if(g){g(h,i);}},45);});}else{console.error('style "'+h+'" not found.');}};exports.save=function(){return d.local.set(exports.storeKey,c);};exports.clear=function(){return d.local.set(exports.storeKey,"");};});