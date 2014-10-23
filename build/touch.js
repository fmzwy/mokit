/*csd*//* jQuery Mobile v1.4.4 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */
(function(a,c,b){typeof define=="function"&&define.amd?define(["jquery"],function(d){return b(d,a,c),d.mobile;}):b(a.jQuery,a,c);})(this,document,function(a,d,b,c){(function(Z,aA,ao,aw){function aB(f){while(f&&typeof f.originalEvent!="undefined"){f=f.originalEvent;}return f;}function ap(x,q){var k=x.type,w,r,e,m,f,j,u,g,y;x=Z.Event(x),x.type=q,w=x.originalEvent,r=Z.event.props,k.search(/^(mouse|click)/)>-1&&(r=ab);if(w){for(u=r.length,m;u;){m=r[--u],x[m]=w[m];}}k.search(/mouse(down|up)|click/)>-1&&!x.which&&(x.which=1);if(k.search(/^touch/)!==-1){e=aB(w),k=e.touches,f=e.changedTouches,j=k&&k.length?k[0]:f&&f.length?f[0]:aw;if(j){for(g=0,y=aC.length;g<y;g++){m=aC[g],x[m]=j[m];}}}return x;}function W(h){var e={},f,g;while(h){f=Z.data(h,ag);for(g in f){f[g]&&(e[g]=e.hasVirtualBinding=!0);}h=h.parentNode;}return e;}function aj(g,e){var f;while(g){f=Z.data(g,ag);if(f&&(!e||f[e])){return g;}g=g.parentNode;}return null;}function al(){ad=!1;}function J(){ad=!0;}function ar(){aa=0,aE.length=0,am=!1,J();}function an(){al();}function z(){Y(),V=setTimeout(function(){V=0,ar();},Z.vmouse.resetTimerDuration);}function Y(){V&&(clearTimeout(V),V=0);}function au(h,f,g){var e;if(g&&g[h]||!g&&aj(f.target,h)){e=ap(f,h),Z(f.target).trigger(e);}return e;}function af(g){var e=Z.data(g.target,ay),f;!am&&(!aa||aa!==e)&&(f=au("v"+g.type,g),f&&(f.isDefaultPrevented()&&g.preventDefault(),f.isPropagationStopped()&&g.stopPropagation(),f.isImmediatePropagationStopped()&&g.stopImmediatePropagation()));}function Q(j){var f=aB(j).touches,h,e,g;f&&f.length===1&&(h=j.target,e=W(h),e.hasVirtualBinding&&(aa=aF++,Z.data(h,ay,aa),Y(),an(),X=!1,g=aB(j).touches[0],ae=g.pageX,at=g.pageY,au("vmouseover",j,e),au("vmousedown",j,e)));}function ai(f){if(ad){return;}X||au("vmousecancel",f,W(f.target)),X=!0,z();}function ac(j){if(ad){return;}var f=aB(j).touches[0],g=X,e=Z.vmouse.moveDistanceThreshold,h=W(j.target);X=X||Math.abs(f.pageX-ae)>e||Math.abs(f.pageY-at)>e,X&&!g&&au("vmousecancel",j,h),au("vmousemove",j,h),z();}function ah(f){if(ad){return;}J();var i=W(f.target),g,h;au("vmouseup",f,i),X||(g=au("vclick",f,i),g&&g.isDefaultPrevented()&&(h=aB(f).changedTouches[0],aE.push({touchID:aa,x:h.clientX,y:h.clientY}),am=!0)),au("vmouseout",f,i),X=!1,z();}function av(g){var e=Z.data(g,ag),f;if(e){for(f in e){if(e[f]){return !0;}}}return !1;}function ax(){}function aD(f){var e=f.substr(1);return{setup:function(){av(this)||Z.data(this,ag,{});var g=Z.data(this,ag);g[f]=!0,ak[f]=(ak[f]||0)+1,ak[f]===1&&K.bind(e,af),Z(this).bind(e,ax),aH&&(ak.touchstart=(ak.touchstart||0)+1,ak.touchstart===1&&K.bind("touchstart",Q).bind("touchend",ah).bind("touchmove",ac).bind("scroll",ai));},teardown:function(){--ak[f],ak[f]||K.unbind(e,af),aH&&(--ak.touchstart,ak.touchstart||K.unbind("touchstart",Q).unbind("touchmove",ac).unbind("touchend",ah).unbind("scroll",ai));var g=Z(this),h=Z.data(this,ag);h&&(h[f]=!1),g.unbind(e,ax),av(this)||g.removeData(ag);}};}var ag="virtualMouseBindings",ay="virtualTouchID",aq="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),aC="clientX clientY pageX pageY screenX screenY".split(" "),G=Z.event.mouseHooks?Z.event.mouseHooks.props:[],ab=Z.event.props.concat(G),ak={},V=0,ae=0,at=0,X=!1,aE=[],am=!1,ad=!1,aH="addEventListener" in ao,K=Z(ao),aF=1,aa=0,az,aG;Z.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(aG=0;aG<aq.length;aG++){Z.event.special[aq[aG]]=aD(aq[aG]);}aH&&ao.addEventListener("click",function(q){var k=aE.length,p=q.target,h,m,s,e,g,j;if(k){h=q.clientX,m=q.clientY,az=Z.vmouse.clickDistanceThreshold,s=p;while(s){for(e=0;e<k;e++){g=aE[e],j=0;if(s===p&&Math.abs(g.x-h)<az&&Math.abs(g.y-m)<az||Z.data(s,ay)===g.touchID){q.preventDefault(),q.stopPropagation();return;}}s=s.parentNode;}}},!0);})(a,d,b),function(f){f.mobile={};}(a),function(f,h){var g={touch:"ontouchend" in b};f.mobile.support=f.mobile.support||{},f.extend(f.support,g),f.extend(f.mobile.support,g);}(a),function(h,v,p){function m(u,f,e,r){var l=e.type;e.type=f,r?h.event.trigger(e,p,u):h.event.dispatch.call(u,e),e.type=l;}var k=h(b),q=h.mobile.support.touch,n="touchmove scroll",w=q?"touchstart":"mousedown",g=q?"touchend":"mouseup",j=q?"touchmove":"mousemove";h.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(f,e){h.fn[e]=function(i){return i?this.bind(e,i):this.trigger(e);},h.attrFn&&(h.attrFn[e]=!0);}),h.event.special.scrollstart={enabled:!0,setup:function(){function o(i,r){l=r,m(u,l?"scrollstart":"scrollstop",i);}var u=this,f=h(u),l,e;f.bind(n,function(i){if(!h.event.special.scrollstart.enabled){return;}l||o(i,!0),clearTimeout(e),e=setTimeout(function(){o(i,!1);},50);});},teardown:function(){h(this).unbind(n);}},h.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var i=this,e=h(i),f=!1;e.bind("vmousedown",function(y){function l(){clearTimeout(z);}function t(){l(),e.unbind("vclick",r).unbind("vmouseup",l),k.unbind("vmousecancel",t);}function r(o){t(),!f&&x===o.target?m(i,"tap",o):f&&o.preventDefault();}f=!1;if(y.which&&y.which!==1){return !1;}var x=y.target,z;e.bind("vmouseup",l).bind("vclick",r),k.bind("vmousecancel",t),z=setTimeout(function(){h.event.special.tap.emitTapOnTaphold||(f=!0),m(i,"taphold",h.Event("taphold",{target:x}));},h.event.special.tap.tapholdThreshold);});},teardown:function(){h(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),k.unbind("vmousecancel");}},h.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1000,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(f){var o=v.pageXOffset,t=v.pageYOffset,l=f.clientX,u=f.clientY;if(f.pageY===0&&Math.floor(u)>Math.floor(f.pageY)||f.pageX===0&&Math.floor(l)>Math.floor(f.pageX)){l-=o,u-=t;}else{if(u<f.pageY-t||l<f.pageX-o){l=f.pageX-o,u=f.pageY-t;}}return{x:l,y:u};},start:function(i){var e=i.originalEvent.touches?i.originalEvent.touches[0]:i,f=h.event.special.swipe.getLocation(e);return{time:(new Date).getTime(),coords:[f.x,f.y],origin:h(i.target)};},stop:function(i){var e=i.originalEvent.touches?i.originalEvent.touches[0]:i,f=h.event.special.swipe.getLocation(e);return{time:(new Date).getTime(),coords:[f.x,f.y]};},handleSwipe:function(u,f,l,e){if(f.time-u.time<h.event.special.swipe.durationThreshold&&Math.abs(u.coords[0]-f.coords[0])>h.event.special.swipe.horizontalDistanceThreshold&&Math.abs(u.coords[1]-f.coords[1])<h.event.special.swipe.verticalDistanceThreshold){var o=u.coords[0]>f.coords[0]?"swipeleft":"swiperight";return m(l,"swipe",h.Event("swipe",{target:e,swipestart:u,swipestop:f}),!0),m(l,o,h.Event(o,{target:e,swipestart:u,swipestop:f}),!0),!0;}return !1;},eventInProgress:!1,setup:function(){var l,e=this,f=h(e),i={};l=h.data(this,"mobile-events"),l||(l={length:0},h.data(this,"mobile-events",l)),l.length++,l.swipe=i,i.start=function(z){if(h.event.special.swipe.eventInProgress){return;}h.event.special.swipe.eventInProgress=!0;var y,x=h.event.special.swipe.start(z),A=z.target,s=!1;i.move=function(o){if(!x||o.isDefaultPrevented()){return;}y=h.event.special.swipe.stop(o),s||(s=h.event.special.swipe.handleSwipe(x,y,e,A),s&&(h.event.special.swipe.eventInProgress=!1)),Math.abs(x.coords[0]-y.coords[0])>h.event.special.swipe.scrollSupressionThreshold&&o.preventDefault();},i.stop=function(){s=!0,h.event.special.swipe.eventInProgress=!1,k.off(j,i.move),i.move=null;},k.on(j,i.move).one(g,i.stop);},f.on(w,i.start);},teardown:function(){var f,e;f=h.data(this,"mobile-events"),f&&(e=f.swipe,delete f.swipe,f.length--,f.length===0&&h.removeData(this,"mobile-events")),e&&(e.start&&h(this).off(w,e.start),e.move&&k.off(j,e.move),e.stop&&k.off(g,e.stop));}},h.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(f,e){h.event.special[f]={setup:function(){h(this).bind(e,h.noop);},teardown:function(){h(this).unbind(e);}};});}(a,this);});