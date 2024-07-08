(()=>{"use strict";function e(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}const{flextension:t}=window;if(t.mediaPlayer=null,!navigator.userActivation){navigator.userActivation={hasBeenActive:!1};const e=t=>{t.isTrusted&&(navigator.userActivation.hasBeenActive=!0,window.removeEventListener("click",e))};window.addEventListener("click",e)}function i(e){e&&(e.classList.contains("is-player-init")||(e.classList.add("is-player-init"),this.element=e,this.paused=!1,this.muted=!0,this.player=null,this.ready=!1,this.isTrusted=!1,this.mediaUrl=this.element.dataset.src,this.mediaLink=this.element.querySelector(".flext-media-link"),null!==this.mediaLink&&(this.mediaLink.setAttribute("href","#"),this.mediaLink.addEventListener("click",(e=>(e.preventDefault(),this.isTrusted=!0,null===this.player||!0===this.paused?(this.play(),"audio"===this.element.dataset.type&&!0===this.muted&&this.unMute()):this.pause(),!1))))))}i.prototype.onInit=function(){this.canPlay()&&this.element.classList.add("flext-media-loading"),this.hasBeenActive()&&"0"===this.getState("mute")||this.element.classList.add("flext-is-muted"),t.emit("mediaPlayer.init",this)},i.prototype.onReady=function(){this.element.classList.remove("flext-media-loading"),!0!==this.ready&&(this.ready=!0,t.emit("mediaPlayer.ready",this)),this.hasBeenActive()&&"0"===this.getState("mute")&&this.unMute()},i.prototype.onPlay=function(){!0===this.ready&&(this.paused=!1,this.element.classList.remove("flext-media-loading"),this.element.classList.add("flext-media-active"),this.element.classList.remove("flext-is-paused"),this.element.classList.add("flext-is-playing"),t.emit("mediaPlayer.play",this))},i.prototype.onPause=function(){!0===this.ready&&(this.paused=!0,this.element.classList.remove("flext-media-loading"),this.element.classList.remove("flext-is-playing"),this.element.classList.add("flext-is-paused"),this.element.classList.remove("flext-media-active"),t.emit("mediaPlayer.pause",this))},i.prototype.onMute=function(){this.muted=!0,this.setState("mute","1"),this.element.classList.add("flext-is-muted"),t.emit("mediaPlayer.mute",this)},i.prototype.onUnmute=function(){this.muted=!1,this.setState("mute","0"),this.element.classList.remove("flext-is-muted"),t.emit("mediaPlayer.unmute",this)},i.prototype.init=function(){this.onInit(),this.playButton=this.element.querySelector(".flext-play-button"),null!==this.playButton&&this.playButton.addEventListener("click",(()=>{this.isTrusted=!0,null===this.player||!0===this.paused?this.play():this.pause()})),this.volumeButton=this.element.querySelector(".flext-volume-button"),null!==this.volumeButton&&this.volumeButton.addEventListener("click",(()=>{null!==this.player&&!0===this.ready&&(!0===this.muted?this.unMute():this.mute())})),this.fullButton=this.element.querySelector(".flext-fullscreen-button")},i.prototype.play=function(){return t.mediaPlayer&&t.mediaPlayer!==this&&t.mediaPlayer.pause(),this.hasBeenActive()&&"0"===this.getState("mute")&&this.unMute(),t.mediaPlayer=this,!0},i.prototype.pause=function(){return!0},i.prototype.mute=function(){this.onMute()},i.prototype.unMute=function(){this.onUnmute()},i.prototype.hasBeenActive=function(){return this.isTrusted||navigator.userActivation.hasBeenActive},i.prototype.canPlay=function(){return this.hasBeenActive()||"0"!==this.getState("mute")},i.prototype.getState=function(e){let t=null;return e&&(t=window.sessionStorage.getItem(`flext${e}`)),t},i.prototype.setState=function(e,t){e&&window.sessionStorage.setItem(`flext${e}`,t)},i.prototype.getAspectRatio=function(){const e=this.element.dataset.ratio||"";if(e&&e.indexOf(":")>-1){const t=e.split(":");if(t.length>1){const e=parseFloat(t[0]),i=parseFloat(t[1]);return parseFloat(e/i)}}return 0},i.prototype.loadThumbnail=function(){return!0},i.prototype.resize=function(){return!0},i.prototype.dispose=function(){return this.ready=!1,this.player=null,this.element=null,e(this),null};const s=i,{flextension:a}=window;function l(e){s.call(this,e),this.loadThumbnail()}l.prototype=new s,l.prototype.init=function(){s.prototype.init.call(this);const e="video"===this.element.dataset.type;this.media=!0===e?document.createElement("video"):document.createElement("audio"),this.media.classList.add("media-embed"),this.media.setAttribute("id","media-embed-"+parseInt(this.element.getAttribute("id").replace(/^\D+/g,""),10)),this.media.defaultMuted=!0,this.media.muted=!0,this.media.setAttribute("loop","loop"),this.media.setAttribute("muted","muted"),this.media.setAttribute("playsinline",!0),this.media.setAttribute("preload","auto");const t=document.createElement("source");t.setAttribute("src",this.mediaUrl),t.setAttribute("type",this.element.dataset.mediaType),this.media.append(t),this.media.addEventListener("loadeddata",(()=>{s.prototype.onReady.call(this)})),this.media.addEventListener("play",(()=>{s.prototype.onPlay.call(this)})),this.media.addEventListener("pause",(()=>{s.prototype.onPause.call(this)})),this.element.prepend(this.media),this.media.muted=!0,this.media.load(),this.player=this.media,this.canPlay()?(s.prototype.play.call(this),this.media.play().then((()=>{this.paused=!1,this.element.classList.remove("flext-is-paused"),this.element.classList.add("flext-is-playing"),this.element.classList.add("flext-media-active")})).catch((()=>{this.paused=!0,this.element.classList.remove("flext-media-active"),this.element.classList.remove("flext-is-playing"),this.element.classList.add("flext-is-paused"),"audio"===this.element.dataset.type&&!0===this.muted&&(this.ready=!1)}))):(this.ready=!0,this.paused=!0),null!==this.fullButton&&this.fullButton.addEventListener("click",(()=>{if(null!==this.player&&!0===this.ready){this.pause();const t=document.createElement("div");t.classList.add("flext-is-loading"),document.body.append(t);const i=this.media.cloneNode(!0);i.removeAttribute("id"),i.setAttribute("controls","controls"),t.append(i),new a.lightbox(t,{className:"flext-lightbox-"+(e?"video":"audio"),onOpen:()=>{const e=this.getAspectRatio();if(e){const s=t.parentElement,a=window.getComputedStyle(s),l=s.clientHeight-(parseFloat(a.paddingTop)+parseFloat(a.paddingBottom)),n=s.clientWidth-(parseFloat(a.paddingLeft)+parseFloat(a.paddingRight));let o=l,r=n;l>n?(o=r/e,o>l&&(o=l,r=o*e)):(r=o*e,r>n&&(r=n,o=r/e)),i.width=r,i.height=o}i.muted=this.muted,i.controls=!0,i.currentTime=this.player.currentTime,i.play(),t.classList.remove("flext-is-loading"),a.emit("featuredMedia.fullscreen.open",i,this)},onBeforeClose:()=>(null!==i&&(i.muted?this.mute():this.unMute(),this.player.currentTime=i.currentTime,i.paused||this.play(),i.pause(),i.currentTime=0,i.remove()),a.emit("featuredMedia.fullscreen.close",this),!0),onClose:()=>{t.remove()}})}}))},l.prototype.play=function(){null===this.player?this.init():!0===this.ready&&!0===this.paused?this.canPlay()&&(s.prototype.play.call(this),this.player.play()):!0===this.muted&&(this.ready=!0,this.canPlay()&&setTimeout((()=>{s.prototype.play.call(this),this.player.play()}),300))},l.prototype.pause=function(){!0===this.ready&&!1===this.paused&&(s.prototype.pause.call(this),this.player.pause())},l.prototype.mute=function(){!0===this.ready&&null!==this.player&&(s.prototype.mute.call(this),this.player.muted=!0)},l.prototype.unMute=function(){!0===this.ready&&null!==this.player&&(s.prototype.unMute.call(this),this.player.muted=!1)},l.prototype.loadThumbnail=function(){if(null!==this.mediaLink&&null===this.element.querySelector("img")){s.prototype.loadThumbnail.call(this);const e=document.createElement("img");e.setAttribute("src",this.element.getAttribute("poster")),e.setAttribute("alt",""),this.mediaLink.append(e)}},l.prototype.dispose=function(){null!==this.media&&(null!==this.element&&this.element.contains(this.media)&&this.media.remove(),this.media=null),s.prototype.dispose.call(this)};const n=l,{flextension:o}=window;function r(e){if(window.YT){if(s.call(this,e),this.mediaUrl){const e=this.mediaUrl.match(/(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/);e&&e[3]&&(this.videoId=e[3])}this.loadThumbnail()}}r.prototype=new s,r.prototype.init=function(){if(!this.videoId)return;s.prototype.init.call(this);const{YT:e}=window;this.isShorts=this.mediaUrl.match(/\/shorts\//),null!==this.fullButton&&this.fullButton.addEventListener("click",(()=>{if(null!==this.player&&!0===this.ready){this.pause();const t=this.player.getCurrentTime();let i=null;const s=document.createElement("div");s.classList.add("flext-is-loading"),document.body.append(s);const a=document.createElement("div");s.append(a),new o.lightbox(s,{className:"flext-lightbox-iframe flext-media-youtube",onOpen:()=>{const l=s.parentElement,n=window.getComputedStyle(l),r=l.clientHeight-(parseFloat(n.paddingTop)+parseFloat(n.paddingBottom)),d=l.clientWidth-(parseFloat(n.paddingLeft)+parseFloat(n.paddingRight));let h=r,p=d;const u=this.getAspectRatio();r>d?(h=p/u,h>r&&(h=r,p=h*u)):(p=h*u,p>d&&(p=d,h=p/u)),i=new e.Player(a,{videoId:this.videoId,width:p,height:h,playerVars:{autoplay:1,enablejsapi:1,loop:1,modestbranding:1,playsinline:1,rel:0,showinfo:0},events:{onReady:e=>{e.target&&(s.classList.remove("flext-is-loading"),i=e.target,this.muted?i.mute():i.unMute(),i.seekTo(parseInt(t,10)))},onStateChange:t=>{if(t.data===e.PlayerState.ENDED){if(null===i)return;i.seekTo(0),i.playVideo()}}}}),o.emit("featuredMedia.fullscreen.open",i,this)},onBeforeClose:()=>(null!==i&&(i.isMuted()?this.mute():this.unMute(),this.player.seekTo(i.getCurrentTime()),1===i.getPlayerState()&&this.play(),i.destroy(),i=null),o.emit("featuredMedia.fullscreen.close",this),!0),onClose:()=>{s.remove()}})}}));const t=document.createElement("div");t.classList.add("media-embed"),t.setAttribute("id","media-embed-"+parseInt(this.element.getAttribute("id").replace(/^\D+/g,""),10)),this.element.prepend(t);const i={videoId:this.videoId,playerVars:{autoplay:0,controls:0,disablekb:1,enablejsapi:1,iv_load_policy:3,modestbranding:1,playsinline:1,rel:0,showinfo:0},events:{onReady:()=>{if(null!==this.player&&!0!==this.ready){if(this.player.mute(),this.media=this.player.getIframe(),null!==this.media){const e=parseInt(this.media.getAttribute("width"),10),t=parseInt(this.media.getAttribute("height"),10);this.mediaRatio=e/t,this.resize()}setTimeout((()=>{this.player.playVideo()}),300)}},onStateChange:t=>{if(t.data===e.PlayerState.PLAYING){if(null===this.player)return;!0!==this.ready&&(this.player.seekTo(0),s.prototype.onReady.call(this),this.canPlay()?s.prototype.play.call(this):this.pause()),this.canPlay()&&s.prototype.onPlay.call(this)}else if(t.data===e.PlayerState.PAUSED)s.prototype.onPause.call(this);else if(t.data===e.PlayerState.ENDED){if(null===this.player)return;this.player.seekTo(0),this.player.playVideo()}}}};this.isShorts&&(i.height=this.element.dataset.height||640,i.width=this.element.dataset.width||390),this.player=new e.Player(t,i)},r.prototype.play=function(){null===this.player?this.init():!0===this.ready&&!0===this.paused&&this.canPlay()&&(s.prototype.play.call(this),this.player.playVideo())},r.prototype.pause=function(){null!==this.player&&!0===this.ready&&!1===this.paused&&(s.prototype.pause.call(this),this.player.pauseVideo())},r.prototype.mute=function(){!0===this.ready&&null!==this.player&&(s.prototype.mute.call(this),this.player.mute())},r.prototype.unMute=function(){!0===this.ready&&null!==this.player&&(s.prototype.unMute.call(this),this.player.unMute())},r.prototype.loadThumbnail=function(){if(this.videoId&&null!==this.mediaLink&&null===this.element.querySelector("img")){s.prototype.loadThumbnail.call(this);const e=document.createElement("img");e.setAttribute("src","https://img.youtube.com/vi/"+this.videoId+"/maxresdefault.jpg"),e.setAttribute("alt",""),this.mediaLink.append(e)}},r.prototype.getAspectRatio=function(){let e=s.prototype.getAspectRatio.call(this);return e||(e=this.isShorts?.5625:1.777777777777778),e},r.prototype.resize=function(e,t){if(null===this.player)return;if(t||(t=this.mediaRatio),!t)return;e||(e=this.element),s.prototype.resize.call(this);const i=e.offsetWidth,a=e.offsetHeight;let l=i,n=a;i/a>t?n=i/t:l=a*t,this.player.setSize(l,n+200)},r.prototype.dispose=function(){null!==this.player&&this.player.destroy(),s.prototype.dispose.call(this)};const d=r,{flextension:h}=window;function p(e){if(window.Vimeo){if(s.call(this,e),this.mediaUrl){const e=this.mediaUrl.match(/vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);e&&e[3]&&(this.videoId=e[3])}this.loadThumbnail()}}p.prototype=new s,p.prototype.init=function(){if(!this.videoId)return;s.prototype.init.call(this);const{Vimeo:e}=window;this.fullButton=this.element.querySelector(".flext-fullscreen-button"),null!==this.fullButton&&this.fullButton.addEventListener("click",(()=>{null!==this.player&&!0===this.ready&&this.player.getCurrentTime().then((t=>{this.pause();let i=null;const s=document.createElement("div");s.classList.add("flext-is-loading"),document.body.append(s),new h.lightbox(s,{className:"flext-lightbox-iframe flext-media-vimeo",onOpen:()=>{const a=s.parentElement,l=window.getComputedStyle(a),n=a.clientHeight-(parseFloat(l.paddingTop)+parseFloat(l.paddingBottom)),o=a.clientWidth-(parseFloat(l.paddingLeft)+parseFloat(l.paddingRight));let r=n,d=o;const p=this.getAspectRatio();p&&(n>o?(r=d/p,r>n&&(r=n,d=r*p)):(d=r*p,d>o&&(d=o,r=d/p))),i=new e.Player(s,{autoplay:!0,id:this.videoId,loop:!0,maxwidth:d,maxheight:r}),this.muted?i.setVolume(0):i.setVolume(1),i.setCurrentTime(t),i.ready().then((()=>{s.classList.remove("flext-is-loading"),i.play()})),h.emit("featuredMedia.fullscreen.open",i,this)},onBeforeClose:()=>(null!==i&&Promise.all([i.getMuted(),i.getPaused(),i.getCurrentTime()]).then((e=>{const t=e[0],s=e[1],a=e[2];t?this.mute():this.unMute(),this.player.setCurrentTime(a),s||this.play(),i.destroy().then((()=>{i=null}))})),h.emit("featuredMedia.fullscreen.close",this),!0),onClose:()=>{s.remove()}})}))})),this.player=new e.Player(this.element,{byline:!1,id:this.videoId,controls:!1,loop:!0,muted:!0,playsinline:!0,transparent:!0}),this.player.on("play",(()=>{!0!==this.ready&&s.prototype.onReady.call(this),s.prototype.onPlay.call(this)})),this.player.on("pause",(()=>{s.prototype.onPause.call(this)})),this.player.ready().then((()=>{if(this.media=this.element.querySelector("iframe"),this.media.classList.add("media-embed"),null!==this.media){const e=parseInt(this.media.getAttribute("width"),10),t=parseInt(this.media.getAttribute("height"),10);this.mediaRatio=e/t,this.resize()}this.canPlay()?(s.prototype.play.call(this),this.player.play()):(this.ready=!0,this.paused=!0)}))},p.prototype.play=function(){null===this.player?this.init():!0===this.ready&&!0===this.paused&&this.canPlay()&&(s.prototype.play.call(this),this.player.play())},p.prototype.pause=function(){null!==this.player&&!0===this.ready&&!1===this.paused&&(this.player.pause(),s.prototype.pause.call(this))},p.prototype.mute=function(){!0===this.ready&&null!==this.player&&(s.prototype.mute.call(this),this.player.setVolume(0))},p.prototype.unMute=function(){!0===this.ready&&null!==this.player&&(s.prototype.unMute.call(this),this.player.setVolume(1))},p.prototype.loadThumbnail=function(){if(this.videoId&&null!==this.mediaLink&&null===this.element.querySelector("img")){s.prototype.loadThumbnail.call(this);const{fetch:e}=window;e("https://vimeo.com/api/v2/video/"+this.videoId+".json").then((e=>e.json())).then((e=>{if(Array.isArray(e)&&e.length>0&&e[0].thumbnail_large){const t=document.createElement("img");t.setAttribute("src",e[0].thumbnail_large),t.setAttribute("alt",""),this.mediaLink.append(t)}}))}},p.prototype.resize=function(){if(null===this.player||null===this.media||!this.mediaRatio)return;s.prototype.resize.call(this);const e=this.element.offsetWidth,t=this.element.offsetHeight;let i=e,a=t;e/t>this.mediaRatio?a=e/this.mediaRatio:i=t*this.mediaRatio,this.media.style.width=i+"px",this.media.style.height=a+"px"},p.prototype.dispose=function(){null!==this.player&&this.player.destroy(),s.prototype.dispose.call(this)};const u=p,{flextension:y}=window;function c(e){s.call(this,e),this.loadThumbnail()}c.prototype=new s,c.prototype.init=function(){s.prototype.init.call(this);const{SC:e}=window,t="https://w.soundcloud.com/player/";null!==this.fullButton&&this.fullButton.addEventListener("click",(()=>{null!==this.player&&!0===this.ready&&(this.pause(),this.player.getPosition((i=>{let s=null;const a=document.createElement("div");a.classList.add("flext-is-loading"),document.body.append(a),new y.lightbox(a,{className:"flext-lightbox-iframe flext-media-soundcloud",onOpen:()=>{const l=document.createElement("iframe");l.setAttribute("src",t+"?show_artwork=true&visual=true&url="+encodeURIComponent(this.mediaUrl)),l.setAttribute("allow","autoplay"),a.append(l),s=new e.Widget(l),s.bind(e.Widget.Events.READY,(()=>{a.classList.remove("flext-is-loading"),s.seekTo(i),s.play()})),y.emit("featuredMedia.fullscreen.open",s,this)},onBeforeClose:()=>(null!==s&&s.isPaused((e=>{s.getPosition((t=>{s.pause(),this.player.seekTo(t),e||this.play(),s=null}))})),y.emit("featuredMedia.fullscreen.close",this),!0),onClose:()=>{a.remove()}})})))})),this.media=document.createElement("iframe"),this.media.classList.add("media-embed"),this.media.setAttribute("src",t+"?sharing=false&buying=false&download=false&show_playcount=false&show_user=false&show_comments=false&show_artwork=false&url="+encodeURIComponent(this.mediaUrl)),this.media.setAttribute("allow","autoplay"),this.element.prepend(this.media),this.player=new e.Widget(this.media),this.player.bind(e.Widget.Events.READY,(()=>{this.player.bind(e.Widget.Events.PLAY,(()=>{!0===this.muted&&this.pause(),s.prototype.onPlay.call(this)})),this.player.bind(e.Widget.Events.PAUSE,(()=>{s.prototype.onPause.call(this)})),this.player.bind(e.Widget.Events.FINISH,(()=>{this.player.seekTo(0),this.player.play()})),s.prototype.onReady.call(this),this.canPlay()?(s.prototype.play.call(this),this.player.play()):!0===this.muted&&(this.mute(),this.paused=!0)}))},c.prototype.play=function(){null===this.player?this.init():!0===this.ready&&!0===this.paused&&this.canPlay()&&(s.prototype.play.call(this),!1===this.muted&&this.player.play())},c.prototype.pause=function(){null!==this.player&&!0===this.ready&&!1===this.paused&&(s.prototype.pause.call(this),this.player.pause())},c.prototype.mute=function(){!0===this.ready&&null!==this.player&&(s.prototype.mute.call(this),this.player.setVolume(0),this.player.pause())},c.prototype.unMute=function(){!0===this.ready&&null!==this.player&&(!0===this.paused&&this.player.play(),s.prototype.unMute.call(this),this.player.setVolume(100))},c.prototype.loadThumbnail=function(){if(null!==this.mediaLink&&null===this.element.querySelector("img")){s.prototype.loadThumbnail.call(this);const{fetch:e}=window;e("https://soundcloud.com/oembed?format=json&url="+encodeURIComponent(this.mediaUrl)).then((e=>e.json())).then((e=>{if(e&&e.thumbnail_url){const t=document.createElement("img");t.setAttribute("src",e.thumbnail_url),t.setAttribute("alt",e.title),this.mediaLink.append(t)}}))}},c.prototype.dispose=function(){s.prototype.dispose.call(this)};const m=c,f=function(e,t){if(null===e)return;if(e.dataset.featuredSlider)return;e.dataset.featuredSlider=!0;const i=Object.assign({effect:"creative",slidesPerView:1,breakpoints:{768:{slidesPerView:1,slidesPerGroup:1}},on:{activeIndexChange(e){const t=e.el.querySelector(".total-images");t&&(t.innerText=e.slides.length-e.realIndex)}}},t||{}),{flextension:s}=window;return new s.carousel(e,i)},{flextension:g,imagesLoaded:w,IntersectionObserver:v}=window;function b(e){e&&(e.dataset.featuredMedia||(e.dataset.featuredMedia=!0,this.element=e,this.type=!1,this.player=null,this.active=!1,this.init()))}g.featuredMediaObservers=[],b.prototype.init=function(){this.parseMedia(),this.initAutoplay(),this.onResize=g.debounce((()=>{this.resize()}),300),window.addEventListener("resize",this.onResize,!1)},b.prototype.initAutoplay=function(){const e=this.element.dataset.autoplay||!1;if(e){if("hover"===e){let e=this.element.closest(".entry");e||(e=this.element),e.addEventListener("mouseenter",(()=>{this.play()})),e.addEventListener("mouseleave",(()=>{this.pause()}))}else if("visible"===e){const e=new v((e=>{e.forEach((e=>{e.isIntersecting?this.play():this.pause()}))}),{threshold:.5});e.observe(this.element),g.featuredMediaObservers.push(e)}g.emit("featuredMedia.initAutoplay",e,this)}},b.prototype.parseMedia=function(){this.element.classList.add("flext-media-player"),this.element.classList.add("flext-media-initialized");const e=this.element.dataset.src;if(!e)return!1;const t=new URL(e);if(t.hostname.indexOf("youtu")>-1)this.type="youtube",window.YT&&(this.player=new d(this.element));else if(t.hostname.indexOf("vimeo")>-1)this.type="vimeo",window.Vimeo&&(this.player=new u(this.element));else if(t.hostname.indexOf("soundcloud")>-1)this.type="soundcloud",window.SC&&(this.player=new m(this.element));else{const t=this.element.dataset.type,i=e.match(/\.([^.]*?)(?=\?|#|$)/);if(i&&i.length>1&&["mp4","ogg","webm","mp3","wav"].includes(i[1])){this.type="html5";const e="mp3"===i[1]?"mpeg":i[1];this.element.dataset.mediaType=t+"/"+e,this.player=new n(this.element)}}},b.prototype.updatePlayer=function(){if(!1!==this.type)switch(this.type){case"youtube":window.YT&&(this.player=new d(this.element),!0===this.active&&this.player.play());break;case"vimeo":window.Vimeo&&(this.player=new u(this.element),!0===this.active&&this.player.play());break;case"soundcloud":window.SC&&(this.player=new m(this.element),!0===this.active&&this.player.play());break;case"html5":this.player=new n(this.element),!0===this.active&&this.player.play()}else this.parseMedia()},b.prototype.play=function(){this.player&&!1===this.active&&this.player.play(),this.active=!0},b.prototype.pause=function(){this.player&&!0===this.active&&this.player.pause(),this.active=!1},b.prototype.mute=function(){this.player&&!0===this.active&&this.player.mute()},b.prototype.unMute=function(){this.player&&!0===this.active&&this.player.unMute()},b.prototype.resize=function(){this.player&&this.player.resize()},b.prototype.dispose=function(){return window.removeEventListener("resize",this.onResize,!1),this.type=null,this.active=null,this.player&&this.player.dispose(),this.player=null,this.element.remove(),this.element=null,e(this),null},g.featuredMediaPlayers=[];let x=!1;function L(e){e.querySelectorAll(".flext-gallery-item").forEach((t=>{const i=t.querySelector("img");if(null!==i){const s=parseInt(window.getComputedStyle(e).getPropertyValue("grid-row-gap"),10),a=parseInt(window.getComputedStyle(e).getPropertyValue("grid-auto-rows"),10),l=Math.ceil((i.getBoundingClientRect().height+s)/(a+s));t.style.gridRowEnd="span "+l,i.style.height=t.getBoundingClientRect().height+"px"}}))}g.featuredSliders=[],g.on("ready",((e,t)=>{t||(t=document,window.addEventListener("resize",g.debounce((()=>{document.querySelectorAll(".flext-gallery-masonry.flext-gallery-initialized").forEach((e=>{L(e)}))}),300))),function(e){!function(e){e.querySelectorAll(".flext-gallery-masonry").forEach((e=>{e.classList.add("flext-gallery-initialized"),w(e,(()=>{L(e)}))}))}(e)}(t),function(e){let t=!1,i=!1,s=!1;if(g.emit("featuredMedia.beforeInitVideos",g.featuredMediaPlayers),e.querySelectorAll(".flext-post-video:not(.flext-media-initialized), .flext-post-audio:not(.flext-media-initialized)").forEach((e=>{const a=new b(e);if(g.featuredMediaPlayers.push(a),a)switch(a.type){case"youtube":t=!0;break;case"vimeo":i=!0;break;case"soundcloud":s=!0}})),t&&!1===x)if(window.onYouTubeIframeAPIReady=function(){x=!0,g.featuredMediaPlayers.forEach((e=>{"object"==typeof e&&"youtube"===e.type&&null===e.player&&e.updatePlayer()}))},window.YT)window.onYouTubeIframeAPIReady();else{const e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";const t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}i&&!window.Vimeo&&new Promise(((e,t)=>{const i=document.createElement("script");document.body.appendChild(i),i.onload=e,i.onerror=t,i.async=!0,i.src="//player.vimeo.com/api/player.js"})).then((()=>{window.Vimeo&&g.featuredMediaPlayers.forEach((e=>{"object"==typeof e&&"vimeo"===e.type&&null===e.player&&e.updatePlayer()}))})),s&&!window.SC&&new Promise(((e,t)=>{const i=document.createElement("script");document.body.appendChild(i),i.onload=e,i.onerror=t,i.async=!0,i.src="//w.soundcloud.com/player/api.js"})).then((()=>{window.SC&&g.featuredMediaPlayers.forEach((e=>{"object"==typeof e&&"soundcloud"===e.type&&null===e.player&&e.updatePlayer()}))})),g.emit("featuredMedia.afterInitVideos",g.featuredMediaPlayers)}(t),function(e){e.querySelectorAll(".flext-featured-media.flext-has-lightbox").forEach((e=>{g.lightboxGallery(e)}))}(t),setTimeout((()=>{!function(e){g.emit("featuredMedia.beforeInitSliders",g.featuredSliders),e.querySelectorAll(".flext-gallery-slider").forEach((e=>{g.featuredSliders.push(new f(e))})),g.emit("featuredMedia.afterInitSliders",g.featuredSliders)}(t)}),500)}))})();