/*csd*/define(function(require,exports,module){"use strict";var a=require("./jquery"),e=require("./utils"),c=require("./store"),b=require("./event");var d=c.dataCache["$style"]={};exports.styleChange=b.create(exports,"styleChange");exports.storeKey="current-name";e.defineProperty(exports,"currentName",{get:function(){return c.local.get("style:"+exports.storeKey);},set:function(f){return c.local.set("style:"+exports.storeKey,f);}},true);exports.addStyle=function(g,f){e.each(g,function(h){d[h]=(f&&f.resovleUri)?f.resovleUri(this):this;});};exports.setStyle=function(g,f){if(!e.isString(g)){return f();}if(d[g]){module.unrequire(d[exports.currentName()]);require(d[g],function(h){exports.currentName(g);exports.styleChange.trigger(g,h);if(f){f(g,h);}});}else{console.error('style "'+g+'" not found.');}};});