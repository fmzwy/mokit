/*csd*/define(function(require,exports,module){"use strict";var b=require("./json");var a=require("./console");exports.dataCache={};exports.temp={set:function(c,d){exports.dataCache[c]=d;},get:function(c){return exports.dataCache[c];},remove:function(c){exports.dataCache[c]=null;},clear:function(){exports.dataCache={};}};exports.session={set:function(d,e){if(typeof sessionStorage!=="undefined"){try{sessionStorage.setItem(d,b.stringify(e));}catch(c){a.error(c.message);}}exports.temp.set("sessionData:"+d,e);},get:function(d){var e=exports.temp.get(d);if(e==null){try{e=b.parse(sessionStorage.getItem(d));}catch(c){a.error(c.message);}}return e;},remove:function(d){if(typeof sessionStorage!=="undefined"){try{sessionStorage.removeItem(d);}catch(c){a.error(c.message);}}exports.temp.remove("sessionData:"+d);},clear:function(){if(typeof sessionStorage!=="undefined"){sessionStorage.clear();}exports.temp.clear();}};exports.local={set:function(d,e){if(typeof localStorage!=="undefined"){try{localStorage.setItem(d,b.stringify(e));}catch(c){a.error(c.message);}}exports.temp.set("localData:"+d,e);},get:function(d){var e=exports.temp.get(d);if(e==null){try{e=b.parse(localStorage.getItem(d));}catch(c){a.error(c.message);}}return e;},remove:function(d){if(typeof localStorage!=="undefined"){try{localStorage.removeItem(d);}catch(c){a.error(c.message);}}exports.temp.remove("localData:"+d);},clear:function(){if(typeof localStorage!=="undefined"){localStorage.clear();}exports.temp.clear();}};});