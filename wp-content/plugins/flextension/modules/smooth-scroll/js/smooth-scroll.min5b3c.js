(()=>{var e={22:(e,t,o)=>{var n;!function(){const r={frameRate:150,animationTime:600,stepSize:100,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,fixedBackground:!0,excluded:""},l=r,i=!1;let a=!1;const c={x:0,y:0};let s,u,d,f,m=!1,h=document.documentElement,w=[];const p=/^Mac/.test(navigator.platform),y={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},b={37:1,38:1,39:1,40:1};function g(){if(m||!document.body)return;m=!0;const e=document.body,t=document.documentElement,o=window.innerHeight,n=e.scrollHeight;if(h=document.compatMode.indexOf("CSS")>=0?t:e,s=e,l.keyboardSupport&&P("keydown",M),top!=self)a=!0;else if(te&&n>o&&(e.offsetHeight<=o||t.offsetHeight<=o)){const t=document.createElement("div");let n;t.style.cssText="position:absolute; z-index:-10000; top:0; left:0; right:0; height:"+h.scrollHeight+"px",document.body.appendChild(t),d=function(){n||(n=setTimeout((function(){i||(t.style.height="0",t.style.height=h.scrollHeight+"px",n=null)}),500))},setTimeout(d,10),P("resize",d);const r={attributes:!0,childList:!0,characterData:!1};if(u=new F(d),u.observe(e,r),h.offsetHeight<=o){const t=document.createElement("div");t.style.clear="both",e.appendChild(t)}}l.fixedBackground||i||(e.style.backgroundAttachment="scroll",t.style.backgroundAttachment="scroll")}let v=[],S=!1,x=Date.now();function k(e,t,o){var n,r;if(n=(n=t)>0?1:-1,r=(r=o)>0?1:-1,(c.x!==n||c.y!==r)&&(c.x=n,c.y=r,v=[],x=0),1!=l.accelerationMax){const e=Date.now()-x;if(e<l.accelerationDelta){let n=(1+50/e)/2;n>1&&(n=Math.min(n,l.accelerationMax),t*=n,o*=n)}x=Date.now()}if(v.push({x:t,y:o,lastX:t<0?.99:-.99,lastY:o<0?.99:-.99,start:Date.now()}),S)return;const i=I(),a=e===i||e===document.body;null==e.$scrollBehavior&&function(e){const t=T(e);if(null==z[t]){const o=getComputedStyle(e,"")["scroll-behavior"];z[t]="smooth"==o}return z[t]}(e)&&(e.$scrollBehavior=e.style.scrollBehavior,e.style.scrollBehavior="auto");const s=function(n){const r=Date.now();let i=0,c=0;for(let e=0;e<v.length;e++){const t=v[e],o=r-t.start,n=o>=l.animationTime;let a=n?1:o/l.animationTime;l.pulseAlgorithm&&(a=W(a));const s=t.x*a-t.lastX>>0,u=t.y*a-t.lastY>>0;i+=s,c+=u,t.lastX+=s,t.lastY+=u,n&&(v.splice(e,1),e--)}a?window.scrollBy(i,c):(i&&(e.scrollLeft+=i),c&&(e.scrollTop+=c)),t||o||(v=[]),v.length?V(s,e,1e3/l.frameRate+1):(S=!1,null!=e.$scrollBehavior&&(e.style.scrollBehavior=e.$scrollBehavior,e.$scrollBehavior=null))};V(s,e,0),S=!0}function D(e){m||g();const t=e.target;if(e.defaultPrevented||e.ctrlKey)return!0;if(R(s,"embed")||R(t,"embed")&&/\.pdf/i.test(t.src)||R(s,"object")||t.shadowRoot)return!0;let o=-e.wheelDeltaX||e.deltaX||0,n=-e.wheelDeltaY||e.deltaY||0;p&&(e.wheelDeltaX&&j(e.wheelDeltaX,120)&&(o=e.wheelDeltaX/Math.abs(e.wheelDeltaX)*-120),e.wheelDeltaY&&j(e.wheelDeltaY,120)&&(n=e.wheelDeltaY/Math.abs(e.wheelDeltaY)*-120)),o||n||(n=-e.wheelDelta||0),1===e.deltaMode&&(o*=40,n*=40);const r=Y(t);return r?!!function(e){if(!e)return;w.length||(w=[e,e,e]),e=Math.abs(e),w.push(e),w.shift(),clearTimeout(f),f=setTimeout((function(){try{localStorage.SS_deltaBuffer=w.join(",")}catch(e){}}),1e3);const t=e>120&&q(e),o=!q(120)&&!q(100)&&!t;return e<50||o}(n)||(Math.abs(o)>1.2&&(o*=l.stepSize/120),Math.abs(n)>1.2&&(n*=l.stepSize/120),k(r,o,n),e.preventDefault(),void L()):!a||!J||(Object.defineProperty(e,"target",{value:window.frameElement}),parent.wheel(e))}function M(e){const t=e.target,o=e.ctrlKey||e.altKey||e.metaKey||e.shiftKey&&e.keyCode!==y.spacebar;document.body.contains(s)||(s=document.activeElement);const n=/^(button|submit|radio|checkbox|file|color|image)$/i;if(e.defaultPrevented||/^(textarea|select|embed|object)$/i.test(t.nodeName)||R(t,"input")&&!n.test(t.type)||R(s,"video")||function(e){let t=e.target,o=!1;if(-1!=document.URL.indexOf("www.youtube.com/watch"))do{if(o=t.classList&&t.classList.contains("html5-video-controls"),o)break}while(t=t.parentNode);return o}(e)||t.isContentEditable||o)return!0;if((R(t,"button")||R(t,"input")&&n.test(t.type))&&e.keyCode===y.spacebar)return!0;if(R(t,"input")&&"radio"==t.type&&b[e.keyCode])return!0;let r,i=0,c=0,u=Y(s);if(!u)return!a||!J||parent.keydown(e);let d=u.clientHeight;switch(u==document.body&&(d=window.innerHeight),e.keyCode){case y.up:c=-l.arrowScroll;break;case y.down:c=l.arrowScroll;break;case y.spacebar:r=e.shiftKey?1:-1,c=-r*d*.9;break;case y.pageup:c=.9*-d;break;case y.pagedown:c=.9*d;break;case y.home:u==document.body&&document.scrollingElement&&(u=document.scrollingElement),c=-u.scrollTop;break;case y.end:var f=u.scrollHeight-u.scrollTop-d;c=f>0?f+10:0;break;case y.left:i=-l.arrowScroll;break;case y.right:i=l.arrowScroll;break;default:return!0}k(u,i,c),e.preventDefault(),L()}function E(e){s=e.target}const T=function(){let e=0;return function(t){return t.uniqueID||(t.uniqueID=e++)}}();let B,C={},H={},z={};function L(){clearTimeout(B),B=setInterval((function(){C=H=z={}}),1e3)}function O(e,t,o){const n=o?C:H;for(let o=e.length;o--;)n[T(e[o])]=t;return t}function X(e,t){return(t?C:H)[T(e)]}function Y(e){const t=[],o=document.body,n=h.scrollHeight;do{const r=X(e,!1);if(r)return O(t,r);if(t.push(e),n===e.scrollHeight){const e=N(h)&&N(o)||K(h);if(a&&A(h)||!a&&e)return O(t,I())}else if(A(e)&&K(e))return O(t,e)}while(e=e.parentElement)}function A(e){return e.clientHeight+10<e.scrollHeight}function N(e){return"hidden"!==getComputedStyle(e,"").getPropertyValue("overflow-y")}function K(e){const t=getComputedStyle(e,"").getPropertyValue("overflow-y");return"scroll"===t||"auto"===t}function P(e,t,o){window.addEventListener(e,t,o||!1)}function $(e,t,o){window.removeEventListener(e,t,o||!1)}function R(e,t){return e&&(e.nodeName||"").toLowerCase()===t.toLowerCase()}if(window.localStorage&&localStorage.SS_deltaBuffer)try{w=localStorage.SS_deltaBuffer.split(",")}catch(e){}function j(e,t){return Math.floor(e/t)==e/t}function q(e){return j(w[0],e)&&j(w[1],e)&&j(w[2],e)}var V=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e,t,o){window.setTimeout(e,o||1e3/60)},F=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,I=function(){let e=document.scrollingElement;return function(){if(!e){const t=document.createElement("div");t.style.cssText="height:10000px;width:1px;",document.body.appendChild(t);const o=document.body.scrollTop;document.documentElement.scrollTop,window.scrollBy(0,3),e=document.body.scrollTop!=o?document.body:document.documentElement,window.scrollBy(0,-3),document.body.removeChild(t)}return e}}();function _(e){let t,o,n;return(e*=l.pulseScale)<1?t=e-(1-Math.exp(-e)):(o=Math.exp(-1),e-=1,n=1-Math.exp(-e),t=o+n*(1-o)),t*l.pulseNormalize}function W(e){return e>=1?1:e<=0?0:(1==l.pulseNormalize&&(l.pulseNormalize/=_(1)),_(e))}const U=window.navigator.userAgent,G=/Edge/.test(U);var J=/chrome/i.test(U)&&!G;const Q=/safari/i.test(U)&&!G,Z=/mobile/i.test(U),ee=/Windows NT 6.1/i.test(U)&&/rv:11/i.test(U);var te=Q&&(/Version\/8/i.test(U)||/Version\/9/i.test(U));const oe=(J||Q||ee)&&!Z;let ne=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get(){ne=!0}}))}catch(e){}const re=!!ne&&{passive:!1};var le="onwheel"in document.createElement("div")?"wheel":"mousewheel";function ie(e){for(const t in e)r.hasOwnProperty(t)&&(l[t]=e[t])}le&&oe&&(P(le,D,re),P("mousedown",E),P("load",g)),ie.destroy=function(){u&&u.disconnect(),$(le,D),$("mousedown",E),$("keydown",M),$("resize",d),$("load",g)},window.SmoothScrollOptions&&ie(window.SmoothScrollOptions),void 0===(n=function(){return ie}.call(t,o,t,e))||(e.exports=n)}()}},t={};!function o(n){var r=t[n];if(void 0!==r)return r.exports;var l=t[n]={exports:{}};return e[n](l,l.exports,o),l.exports}(22)})();