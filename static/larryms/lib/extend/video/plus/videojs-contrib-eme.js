(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("video.js")):typeof define==="function"&&define.amd?define(["exports","video.js"],t):t(e.videojsContribEme={},e.videojs)})(this,function(e,d){"use strict";d=d&&d.hasOwnProperty("default")?d["default"]:d;var t=typeof window!=="undefined"?window:typeof global!=="undefined"?global:typeof self!=="undefined"?self:{};var n;if(typeof window!=="undefined"){n=window}else if(typeof t!=="undefined"){n=t}else if(typeof self!=="undefined"){n=self}else{n={}}var y=n;var o=function e(t){var n=(new DOMParser).parseFromString(String.fromCharCode.apply(null,new Uint16Array(t)),"application/xml");var r=n.getElementsByTagName("HttpHeaders")[0];var i={};if(r){var a=r.getElementsByTagName("name");var s=r.getElementsByTagName("value");for(var o=0;o<a.length;o++){i[a[o].childNodes[0].nodeValue]=s[o].childNodes[0].nodeValue}}var u=n.getElementsByTagName("Challenge")[0];var f=void 0;if(u){f=y.atob(u.childNodes[0].nodeValue)}return{headers:i,message:f}};var u=function e(t,n,r){var i=o(n),a=i.headers,s=i.message;d.xhr({uri:t,method:"post",headers:a,body:s,responseType:"arraybuffer"},r)};var v=function e(i){var a=void 0;Object.keys(i).forEach(function(t){var n={};var e=i[t].audioContentType;var r=i[t].videoContentType;if(e){n.audioCapabilities=[{contentType:e}]}if(r){n.videoCapabilities=[{contentType:r}]}if(!a){a=navigator.requestMediaKeySystemAccess(t,[n])}else{a=a.catch(function(e){return navigator.requestMediaKeySystemAccess(t,[n])})}});return a};var l=function e(t){var n=t.mediaKeys,r=t.initDataType,i=t.initData,a=t.options,s=t.getLicense,o=t.removeSession,u=t.eventBus;var f=n.createSession();f.addEventListener("message",function(e){s(a,e.message).then(function(e){return f.update(e)}).catch(d.log.error.bind(d.log.error,"failed to get and set license"))},false);f.addEventListener("keystatuseschange",function(n){var r=false;f.keyStatuses.forEach(function(e,t){u.trigger({keyId:t,status:e,target:f,type:"keystatuschange"});switch(e){case"expired":r=true;break;case"internal-error":d.log.warn('Key status reported as "internal-error." Leaving the session open since we '+"don't have enough details to know if this error is fatal.",n);break}});if(r){f.close().then(function(){o(i)})}},false);f.generateRequest(r,i).catch(d.log.error.bind(d.log.error,"Unable to create or initialize key session"))};var g=function e(t){var n=t.video,r=t.initDataType,i=t.initData,a=t.options,s=t.getLicense,o=t.removeSession,u=t.eventBus;if(n.mediaKeysObject){l({mediaKeys:n.mediaKeysObject,initDataType:r,initData:i,options:a,getLicense:s,removeSession:o,eventBus:u})}else{n.pendingSessionData.push({initDataType:r,initData:i})}};var m=function e(t){var n=t.video,r=t.certificate,i=t.createdMediaKeys,a=t.options,s=t.getLicense,o=t.removeSession,u=t.eventBus;n.mediaKeysObject=i;if(r){i.setServerCertificate(r)}for(var f=0;f<n.pendingSessionData.length;f++){var c=n.pendingSessionData[f];l({mediaKeys:n.mediaKeysObject,initDataType:c.initDataType,initData:c.initData,options:a,getLicense:s,removeSession:o,eventBus:u})}n.pendingSessionData=[];return n.setMediaKeys(i)};var r=function e(n){return function(e,t,r){u(n,t,function(e,t,n){if(e){r(e);return}r(null,n)})}};var i=function e(n){return function(e,t,r){d.xhr({uri:n,method:"POST",responseType:"arraybuffer",body:t,headers:{"Content-type":"application/octet-stream"}},function(e,t,n){if(e){r(e);return}r(null,n)})}};var p=function e(i,a){return function(e,t){return new Promise(function(n,r){i(e,t,function(e,t){if(a){a.trigger("licenserequestattempted")}if(e){r(e)}n(t)})})}};var h=function e(t,n){if(typeof n==="string"){n={url:n}}if(!n.url&&!n.getLicense){throw new Error("Neither URL nor getLicense function provided to get license")}if(n.url&&!n.getLicense){n.getLicense=t==="com.microsoft.playready"?r(n.url):i(n.url)}return n};var f=function e(t){var a=t.video,n=t.initDataType,r=t.initData,s=t.options,i=t.removeSession,o=t.eventBus;var u=Promise.resolve();if(typeof a.mediaKeysObject==="undefined"){a.mediaKeysObject=null;a.pendingSessionData=[];var f=void 0;var c=void 0;u=v(s.keySystems);if(!u){d.log.error("No supported key system found");return Promise.resolve()}u=u.then(function(i){return new Promise(function(n,r){a.keySystem=i.keySystem;c=h(i.keySystem,s.keySystems[i.keySystem]);if(!c.getCertificate){n(i);return}c.getCertificate(s,function(e,t){if(e){r(e);return}f=t;n(i)})})}).then(function(e){return e.createMediaKeys()}).then(function(e){return m({video:a,certificate:f,createdMediaKeys:e,options:s,getLicense:p(c.getLicense,o),removeSession:i,eventBus:o})}).catch(d.log.error.bind(d.log.error,"Failed to create and initialize a MediaKeys object"))}return u.then(function(){g({video:a,initDataType:n,initData:r,options:s,getLicense:a.keySystem?p(h(a.keySystem,s.keySystems[a.keySystem]).getLicense,o):null,removeSession:i,eventBus:o})})};var b=function e(t){var n=new ArrayBuffer(t.length*2);var r=new Uint16Array(n);for(var i=0;i<t.length;i++){r[i]=t.charCodeAt(i)}return r};var a=function e(t){return String.fromCharCode.apply(null,new Uint16Array(t.buffer))};var s=function e(t){var n=document.createElement("a");n.href=t;return n.hostname};var c=function e(t,n){if(t===n){return true}if(t.byteLength!==n.byteLength){return false}var r=new DataView(t);var i=new DataView(n);for(var a=0;a<r.byteLength;a++){if(r.getUint8(a)!==i.getUint8(a)){return false}}return true};var S=function e(t){if(t instanceof Uint8Array||t instanceof Uint16Array){return t.buffer}return t};var k="com.apple.fps.1_0";var w=function e(t){var n=t.initData,r=t.id,i=t.cert;if(typeof r==="string"){r=b(r)}var a=0;var s=new ArrayBuffer(n.byteLength+4+r.byteLength+4+i.byteLength);var o=new DataView(s);var u=new Uint8Array(s,a,n.byteLength);u.set(n);a+=n.byteLength;o.setUint32(a,r.byteLength,true);a+=4;var f=new Uint16Array(s,a,r.length);f.set(r);a+=f.byteLength;o.setUint32(a,i.byteLength,true);a+=4;var c=new Uint8Array(s,a,i.byteLength);c.set(i);return new Uint8Array(s,0,s.byteLength)};var D=function e(t){var i=t.video,a=t.contentId,s=t.initData,o=t.cert,u=t.options,f=t.getLicense,c=t.eventBus;return new Promise(function(t,n){if(!i.webkitKeys){i.webkitSetMediaKeys(new y.WebKitMediaKeys(k))}if(!i.webkitKeys){n("Could not create MediaKeys");return}var r=i.webkitKeys.createSession("video/mp4",w({id:a,initData:s,cert:o}));if(!r){n("Could not create key session");return}r.contentId=a;r.addEventListener("webkitkeymessage",function(e){f(u,a,e.message,function(e,t){if(c){c.trigger("licenserequestattempted")}if(e){n(e);return}r.update(new Uint8Array(t))})});r.addEventListener("webkitkeyadded",function(e){t(e)});r.addEventListener("webkitkeyerror",function(e){n(e)})})};var L=function e(t){return function(e,r){d.xhr({uri:t,responseType:"arraybuffer"},function(e,t,n){if(e){r(e);return}r(null,new Uint8Array(n))})}};var K=function e(t,n){return s(a(n))};var E=function e(i){return function(e,t,n,r){d.xhr({uri:i,method:"POST",responseType:"arraybuffer",body:n,headers:{"Content-type":"application/octet-stream"}},function(e,t,n){if(e){r(e);return}r(null,n)})}};var U=function e(t){var n=t.video,r=t.initData,i=t.options,a=t.eventBus;var s=i.keySystems[k];var o=s.getCertificate||L(s.certificateUri);var u=s.getContentId||K;var f=s.getLicense||E(s.licenseUri);return new Promise(function(n,r){o(i,function(e,t){if(e){r(e);return}n(t)})}).then(function(e){return D({video:n,cert:e,initData:r,getLicense:f,options:i,contentId:u(i,r),eventBus:a})}).catch(d.log.error.bind(d.log.error))};var C="com.microsoft.playready";var T=function e(t,n,r,i){var a=t.keySystems[C];if(typeof a.getKey==="function"){a.getKey(t,r.destinationURL,r.message.buffer,function(e,t){if(e){d.log.error("Unable to get key: "+e);return}n.update(t)});return}if(typeof a==="string"){a={url:a}}var s=a.url||r.destinationURL;u(s,r.message.buffer,function(e,t){if(i){i.trigger("licenserequestattempted")}if(e){d.log.error("Unable to request key from url: "+s);return}n.update(new Uint8Array(t.body))})};var B=function e(t,n,r,i){var a=t.msKeys.createSession("video/mp4",n);if(!a){d.log.error("Could not create key session.");return}a.addEventListener("mskeymessage",function(e){T(r,a,e,i)});a.addEventListener("mskeyerror",function(e){d.log.error("Unexpected key error from key session with "+("code: "+a.error.code+" and systemCode: "+a.error.systemCode))})};var A=function(e){var t=e.video,n=e.initData,r=e.options,i=e.eventBus;if(t.msKeys){delete t.msKeys}try{t.msSetMediaKeys(new y.MSMediaKeys(C))}catch(e){d.log.error("Unable to create media keys for PlayReady key system. Error: "+e.message);return}B(t,n,r,i)};var M=function e(t,n){for(var r=0;r<t.length;r++){if(!t[r].initData){continue}if(c(S(t[r].initData),S(n))){return true}}return false};var j=function e(t,n){for(var r=0;r<t.length;r++){if(t[r].initData===n){t.splice(r,1);return}}};var O=function e(n,r,i,a){if(!r||!r.keySystems){return Promise.resolve()}var s=n.initData;return v(r.keySystems).then(function(e){var t=e.keySystem;if(r.keySystems[t]&&r.keySystems[t].pssh){s=r.keySystems[t].pssh}if(M(i,s)){return}i.push({initData:s});return f({video:n.target,initDataType:n.initDataType,initData:s,options:r,removeSession:j.bind(null,i),eventBus:a})})};var P=function e(t,n,r){if(!n.keySystems||!n.keySystems[k]){return}return U({video:t.target,initData:t.initData,options:n,eventBus:r})};var _=function e(t,n,r,i){if(!n.keySystems||!n.keySystems[C]){return}if(r.reduce(function(e,t){return e||t.playready},false)){return}r.push({playready:true});A({video:t.target,initData:t.initData,options:n,eventBus:i})};var N=function e(t){return d.mergeOptions(t.currentSource(),t.eme.options)};var x=function e(t){var n=t.src();if(n!==t.eme.activeSrc){t.eme.activeSrc=n;t.eme.sessions=[]}};var q=function e(t){if(t.$(".vjs-tech").tagName.toLowerCase()!=="video"){return}x(t);t.tech_.el_.addEventListener("encrypted",function(e){x(t);O(e,N(t),t.eme.sessions,t.tech_)});t.tech_.el_.addEventListener("webkitneedkey",function(e){x(t);P(e,N(t),t.tech_)});if(d.browser.IS_EDGE){return}t.tech_.el_.addEventListener("msneedkey",function(e){x(t);_(e,N(t),t.eme.sessions,t.tech_)})};var I=function e(){var t=this;var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};this.eme.options=n;this.ready(function(){return q(t)})};var V=d.registerPlugin||d.plugin;V("eme",I);e.hasSession=M;e.removeSession=j;e.handleEncryptedEvent=O;e.handleWebKitNeedKeyEvent=P;e.handleMsNeedKeyEvent=_;e.getOptions=N;e.setupSessions=x;e.default=I;Object.defineProperty(e,"__esModule",{value:true})});