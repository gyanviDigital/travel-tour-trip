(()=>{"use strict";const{flextension:e}=window;let t=null;e.openQuickView=async function(i,n,l,o){e.emit("beforeQuickViewShow");let a=null;const c=t=>{const{featuredMediaPlayers:i}=e;let n=null;if(i&&i.length>0){const e=t.querySelector(".quick-view-content > .entry-media .flext-featured-media.flext-post-video, .quick-view-content > .entry-media .flext-featured-media.flext-post-audio");null!==e&&i.forEach((t=>{t&&t.element&&t.element===e&&(n=t)}))}return n},d={callback:(t,i)=>{"object"==typeof t&&t.rendered&&(i.content.innerHTML=t.rendered),e.emit("afterQuickViewLoaded",i.content),e.emit("ready",i.content),a=c(i.content)}};if("ajax"===l||"legacy"===l?d.data={action:"flextension_quick_view",id:i,postType:n}:(d.endpoint="/flextension/v1/quick-view",d.data={id:i,postType:n}),t){if(t.id===i)return;await t.close()}t=new e.lightbox("#flext-quick-view-content-"+i,{className:`flext-quick-view-modal quick-view-post-type-${n}`,fullscreen:o,onOpen:t=>{a=c(t.content),e.emit("afterQuickViewOpen",t)},onClose:i=>{null!==a&&(a.dispose(),i.content.remove()),e.emit("afterQuickViewClose",i),t=null}}),t.id=i,t.load(d),e.emit("afterQuickViewShow")},e.on("ready",((t,i)=>{i||(i=document),i.querySelectorAll(".flext-quick-view-button:not(.flext-quick-view-initialized)").forEach((t=>{null!==t&&(t.classList.add("flext-quick-view-initialized"),t.addEventListener("click",(i=>(i.preventDefault(),e.openQuickView(t.dataset.id,t.dataset.postType||"",t.dataset.mode||"",!!t.dataset.fullscreen),!1))))}))}))})();