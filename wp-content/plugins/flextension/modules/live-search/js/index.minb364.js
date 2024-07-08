(()=>{"use strict";const{flextension:e}=window;class t{constructor(e,t){!0!==e.dataset.flextLiveSearch&&(e.dataset.flextLiveSearch=!0,this.settings=t||{},this.DOM={el:e},this.init())}init(){this.initSearchForm(),this.createSearchResults()}initSearchForm(){this.DOM.searchForm=this.DOM.el.querySelector(this.settings.form),null!==this.DOM.searchForm&&(this.DOM.keywordField=this.DOM.searchForm.querySelector("#flext-search-keyword"),null!==this.DOM.keywordField&&(this.DOM.keywordField.setAttribute("autocomplete","off"),this.DOM.keywordField.addEventListener("focus",e.debounce((()=>{this.DOM.el.classList.contains("is-active")||this.doSearch()}),this.settings.delay)),this.DOM.keywordField.addEventListener("input",e.debounce((()=>{this.doSearch()}),this.settings.delay))),this.DOM.clearSearchButton=this.DOM.searchForm.querySelector(".clear-search-button"),null!==this.DOM.clearSearchButton&&this.DOM.clearSearchButton.addEventListener("click",(()=>{this.DOM.el.classList.remove("is-active"),this.clearSearchList(),this.DOM.clearSearchButton.hidden=!0,this.DOM.keywordField.value="",this.DOM.keywordField.focus()})),this.DOM.searchForm.addEventListener("submit",(e=>(e.preventDefault(),!1))))}createSearchResults(){this.DOM.searchResultsWrapper=this.DOM.el.querySelector(".live-search-results-wrapper"),this.DOM.searchResults=this.DOM.el.querySelector(".live-search-results"),this.DOM.resultsList=this.DOM.el.querySelector(".search-results-list"),this.DOM.moreButton=this.DOM.el.querySelector(".search-more"),null===this.DOM.searchResultsWrapper&&(this.DOM.searchResultsWrapper=document.createElement("div"),this.DOM.searchResultsWrapper.classList.add("live-search-results-wrapper"),this.DOM.el.append(this.DOM.searchResultsWrapper)),null===this.DOM.searchResults&&(this.DOM.searchResults=document.createElement("div"),this.DOM.searchResults.classList.add("live-search-results"),this.DOM.searchResultsWrapper.append(this.DOM.searchResults)),null===this.DOM.resultsList&&(this.DOM.resultsList=document.createElement("div"),this.DOM.resultsList.classList.add("search-results-list","flext-list-group"),this.DOM.searchResults.append(this.DOM.resultsList)),null===this.DOM.moreButton&&(this.DOM.moreButton=document.createElement("div"),this.DOM.moreButton.classList.add("search-more"),this.DOM.searchResultsWrapper.append(this.DOM.moreButton)),e.emit("liveSearch.createResults"),this.updateSearchList(),window.addEventListener("resize",e.debounce((()=>{this.updateSearchList()}),300))}updateSearchList(){e.emit("liveSearch.updateResults")}getListItems(e,t){const s=document.createElement("ul");s.classList.add("flext-list"),s.setAttribute("id",e.toLowerCase()+"-search-list");let i=!1,r=!1,a=!1;return t.forEach((e=>{let t="";e.thumbnail?(i=!0,t='<img src="'+e.thumbnail+'" alt="'+e.title+'" height="150" width="150" />'):t='<i class="flext-ico-article"></i>',t='<span class="item-thumbnail">'+t+"</span>";let l="";e.author&&(r=!0,l="<span>"+e.author+"</span> ");let h="";e.date&&(a=!0,h="<span>"+e.date+"</span> ");let c="";(l||h)&&(c='<span class="item-meta">'+l+h+"</span>");let n=e.title;n&&(n='<strong class="item-title">'+n+"</strong>");const u=document.createElement("li");u.innerHTML='<a href="'+e.post_link+'">'+t+'<span class="item-header">'+n+c+"</span></a>",s.append(u)})),i&&s.classList.add("flext-avatar-list"),(r||a)&&s.classList.add("flext-list-two-line"),s}clearSearchList(){null!==this.DOM.resultsList&&(this.DOM.resultsList.innerHTML="",this.DOM.moreButton.innerHTML="",this.updateSearchList())}showResults(){this.DOM.el.classList.add("is-active"),e.emit("liveSearch.showResults",this.DOM.el)}hideResults(){this.DOM.el.classList.remove("is-active"),e.emit("liveSearch.hideResults",this.DOM.el)}serializeFormData(e){const t={};for(const[s,i]of e)void 0!==t[s]?(Array.isArray(t[s])||(t[s]=[t[s]]),t[s].push(i)):t[s]=i;return t}loadResults(){null===this.DOM.searchResults&&this.createSearchResults(),this.showResults(),this.DOM.el.classList.add("searching");const t=new FormData(this.DOM.searchForm),s=Object.assign({},{action:"flextension_live_search"},this.serializeFormData(t));e.ajax({data:s,callback:t=>{if(this.DOM.resultsList.innerHTML="",t&&Array.isArray(t.results)&&t.results.length>0){const s=t.results;s.sort(((e,t)=>{const s=e.title,i=t.title;return s<i?-1:s>i?1:0})),s.forEach((e=>{const t=document.createElement("h4");t.innerHTML=e.title,this.DOM.resultsList.append(t),this.DOM.resultsList.append(this.getListItems(e.name,e.items))})),this.DOM.moreButton.innerHTML=t.moreLink,e.emit("liveSearch.afterSearchResultsLoad",this.DOM.el)}else t&&t.message&&(this.DOM.resultsList.innerHTML='<p class="search-status">'+t.message+"</p>",this.DOM.moreButton.innerHTML="");this.DOM.el.classList.remove("searching"),this.DOM.clearSearchButton.hidden=!1,this.updateSearchList()}})}doSearch(){if(this.DOM.keywordField.value.length<this.settings.minlength)return this.hideResults(),void this.clearSearchList();this.loadResults()}}e.on("ready",((s,i)=>{if(i)return;const r=Object.assign({delay:500,element:"#flext-live-search",form:"#flext-live-search-form",minlength:2},e.settings.liveSearch||{});r.element&&document.querySelectorAll(r.element).forEach((e=>{new t(e,r)}))}))})();