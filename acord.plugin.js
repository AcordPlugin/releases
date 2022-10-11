/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable plugin developers to make plugins more easily and wisely. Requires 0PluginLibrary!
 * @version 0.1.342
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://armagan.rest/
 */
var p=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var U=p((uo,ie)=>{ie.exports=o=>{let e=a=>typeof a=="object"||typeof a=="function";function t(a){return c=>a.every(r=>Object.keys(c).some(i=>i.toLowerCase().includes(r.toLowerCase())))}function n(a){return c=>e(c)&&Object.values(c).some(r=>e(r)&&a.some(i=>r?.[i]!==void 0))}function l(a){return c=>c.prototype&&a.every(r=>c.prototype[r]!==void 0)}function s(a){return c=>a.every(r=>c?.toString?.()?.includes?.(r))}return{findByProps:(...a)=>o.WebpackModules.findByUniqueProperties(a),findByProperties:(...a)=>o.WebpackModules.findByUniqueProperties(a),findByKeywordAll:(...a)=>o.WebpackModules.findAll(t(a)),findByKeyword:(...a)=>o.WebpackModules.findAll(t(a))[0],findByNestedProps:(...a)=>o.WebpackModules.findAll(n(a))[0],findByNestedPropsAll:(...a)=>o.WebpackModules.findAll(n(a)),findByPrototypes:(...a)=>o.WebpackModules.findAll(l(a))[0],findByPrototypesAll:(...a)=>o.WebpackModules.findAll(l(a)),findByStrings:(...a)=>o.WebpackModules.findAll(s(a))[0],findByStringsAll:(...a)=>o.WebpackModules.findAll(s(a)),findAll:a=>o.WebpackModules.findAll(a),find:a=>o.WebpackModules.find(a)}}});var I=p((fo,ae)=>{var Ze=U();ae.exports=o=>{let e=Ze(o);return{swc:e,common:{constants:{Permissions:e.find(t=>typeof t.VIEW_CHANNEL=="bigint")},channels:e.findByProps("getVoiceChannelId","getChannelId"),guilds:e.findByProps("getLastSelectedGuildId","getGuildId"),Flux:e.findByProps("connectStores","destroy"),FluxDispatcher:e.findByProps("_currentDispatchActionType","dispatch"),i18n:e.findByProps("_requestedLocale","getDefaultLocale"),React:o.DiscordModules.React,ReactDOM:o.DiscordModules.ReactDOM,UserStore:e.findByProps("getUser","getCurrentUser"),ChannelStore:e.findByProps("getDMFromUserId","getDMUserIds","getChannel"),GuildStore:e.findByProps("getGuild","getGuildCount"),InviteStore:e.findByProps("acceptInvite","acceptInviteAndTransitionToInviteChannel"),VoiceStateStore:e.findByProps("getVoiceState","getUserVoiceChannelId"),PermissionStore:e.findByProps("getChannelPermissions","can"),ActivityStore:e.findByProps("getAllApplicationActivities","getActivities"),DiscordAPI:e.findByProps("get","post"),uuid:e.findByProps("v1","v4"),Markdown:e.find(t=>t?.prototype?.render&&t.rules),Button:e.findByProps("Colors","BorderColors"),modals:{actions:{show:(...t)=>o.DiscordModules.ModalActions.openModal(...t),close:(...t)=>o.DiscordModules.ModalActions.closeModal(...t)},ModalRoot:e.find(t=>t?.toString().includes("ENTERING")),ModalComponents:e.findByProps("Header","Footer")}}}}});var H=p((po,le)=>{le.exports=o=>({createElement:(e,t,...n)=>{if(typeof e=="function")return e({...t,children:[].concat(...n)});let l=document.createElement(e);for(let s of Object.keys(t))s.indexOf("on")===0?l.addEventListener(s.slice(2).toLowerCase(),t[s]):s==="children"?l.append(...Array.isArray(t[s])?t[s]:[].concat(t[s])):l.setAttribute(s==="className"?"class":s,t[s]);return n.length&&l.append(...n),l},parseHTML:e=>o.DOMTools.parseHTML(e,!0).firstElementChild,parents:o.DOMTools.parents,escapeHTML:o.DOMTools.escapeHTML,toCSSProp(e){let t=document.createElement("div");return Object.entries(e).forEach(n=>{t.style.hasOwnProperty(n[0])?t.style[n[0]]=n[1]:t.style.setProperty(n[0],n[1])}),t.getAttribute("style")},toHTMLProps(e){return Object.entries(e).map(t=>`${t[0].replace(/ +/,"-")}="${t[0]=="style"&&typeof t[1]!="string"?this.toCSSProp(t[1]):this.escapeHTML(t[1])}"`).join(" ")}})});var F=p((go,ce)=>{ce.exports=class{constructor(){this.listeners=new Map}_prepareListenersMap(e){this.listeners.has(e)||this.listeners.set(e,new Map)}on(e,t){return this._prepareListenersMap(e),this.listeners.get(e).set(t,{once:!1}),()=>{this.listeners.get(e).delete(t)}}once(e,t){return this._prepareListenersMap(e),this.listeners.get(e)?.set(t,{once:!0}),()=>{this.listeners.get(e).delete(t)}}off(e,t){if(!e)return this.listeners=new Map;if(!t)return this.listeners?.delete(e);this.listeners.get(e)?.delete(t)}emit(e,...t){if(!this.listeners.has(e))return;let n=this.listeners.get(e);n.forEach(({once:l},s)=>{l&&n?.delete(s),s(...t)})}}});var he=p((yo,pe)=>{var W=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,et=Object.getOwnPropertyNames,tt=Object.prototype.hasOwnProperty,ot=(o,e)=>{for(var t in e)W(o,t,{get:e[t],enumerable:!0})},nt=(o,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of et(e))!tt.call(o,l)&&l!==t&&W(o,l,{get:()=>e[l],enumerable:!(n=Qe(e,l))||n.enumerable});return o},rt=o=>nt(W({},"__esModule",{value:!0}),o),de={};ot(de,{after:()=>ct,before:()=>at,instead:()=>lt,unpatchAll:()=>it});pe.exports=rt(de);var ue=["a","b","i"],O=new Map;function st(o,e,t,n,l){let s=O.get(e)?.[o];if(!s)return l?Reflect.construct(e[o],t,n):e[o].apply(n,t);for(let r of s.b.values()){let i=r.call(n,t);Array.isArray(i)&&(t=i)}let a=(...r)=>l?Reflect.construct(s.o,r,n):s.o.apply(n,r);for(let r of s.i.values()){let i=a;a=(...d)=>r.call(n,d,i)}let c=a(...t);for(let r of s.a.values())c=r.call(n,t,c)??c;return c}function fe(o,e,t,n){let l=O.get(o),s=l?.[e];return s?.[n].has(t)?(s[n].delete(t),ue.every(a=>s[a].size===0)&&(Reflect.defineProperty(o,e,{value:s.o,writable:!0,configurable:!0})||(o[e]=s.o),delete l[e]),Object.keys(l).length==0&&O.delete(o),!0):!1}function it(){for(let[o,e]of O.entries())for(let t in e)for(let n of ue)for(let l of e[t]?.[n].keys()??[])fe(o,t,l,n)}var K=o=>(e,t,n,l=!1)=>{if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);O.has(t)||O.set(t,{});let s=O.get(t);if(!s[e]){let r=t[e];s[e]={o:r,b:new Map,i:new Map,a:new Map};let i=(u,h,g)=>{let E=st(e,t,h,u,g);return l&&c(),E},d=new Proxy(r,{apply:(u,h,g)=>i(h,g,!1),construct:(u,h)=>i(r,h,!0),get:(u,h,g)=>h=="toString"?r.toString.bind(r):Reflect.get(u,h,g)});Reflect.defineProperty(t,e,{value:d,configurable:!0,writable:!0})||(t[e]=d)}let a=Symbol(),c=()=>fe(t,e,a,o);return s[e][o].set(a,n),c},at=K("b"),lt=K("i"),ct=K("a")});var P=p((wo,ge)=>{var dt=he();ge.exports={...dt,injectCSS(o){let e=document.createElement("style");return e.className="AcordInjectedCSS",e.textContent=o,document.head.appendChild(e),()=>{e?.remove()}},unpatchAllCSS(){document.querySelectorAll(".AcordInjectedCSS").forEach(o=>{o.remove()})}}});var we=p((mo,ye)=>{var bo=F(),ut=P();ye.exports=o=>{let e=o.WebpackModules.find(i=>i?.__proto__?.handleConnection),t=new Set,n=new Map;async function l(i,d){let f;try{if(f=JSON.parse(d),!Array.isArray(f)||f.length<1||f.length>3)throw"Array expected as message.";if(typeof f[0]!="string")throw"Array[0] needs to be string.";if(typeof f[1]!="string")throw"Array[1] needs to be string."}catch(w){i.send(JSON.stringify([null,{ok:!1,error:`${w}`}]))}let[u,h,g]=f,E=n.get(h);if(!E)return i.send(JSON.stringify([u,{ok:!1,error:"Unable to find handler."}]));try{let w=await E(g);i.send(JSON.stringify([u,{ok:!0,data:w}]))}catch(w){i.send(JSON.stringify([u,{ok:!1,error:`${w}`}]))}}function s(i,d){if(typeof i!="string")throw new Error("EventName needs to be a string.");if(typeof d!="function")throw new Error("Callback needs to be a function.");if(n.has(i))throw new Error("EventName already in use.");return n.set(i,d),()=>{n.delete(i)}}let a=ut.instead("handleConnection",e,(i,d)=>{let f=i[0];if(f.upgradeReq().url!=="/acord")return d(...i);t.add(f),f.on("message",u=>{l(f,u)}),f.on("close",()=>t.delete(f))});function c(){a(),n.clear(),t.forEach(i=>i.close())}function r(i,...d){if(!n.has(i))throw new Error("Unable to find handler!");return n.get(i)(...d)}return s("InstallExtension",({url:i})=>{}),{unpatchSocket:c,connectedSockets:t,socketEvents:n,set:s,trigger:r}}});var me=p((Eo,be)=>{var ft=H(),pt=U(),{injectCSS:ht}=P();be.exports=o=>{let e=ft(o),t=pt(o),n=t.findByProps("root","small"),l=t.findByProps("notDevTools","app");ht(".acord--layer-container{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1001;pointer-events:none;transition:100ms ease all}.acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none}.acord--layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all}.acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all}");function s(a,{size:c="large",classes:r=""}={}){let i=document.querySelector(`.${l.notDevTools}`),d=i.querySelector(".acord--layer-container");if(d||(d=e.parseHTML('<div class="acord--layer-container"></div>'),i.appendChild(d)),!d.querySelector(".acord--backdrop")){let w=e.parseHTML('<div class="acord--backdrop"></div>');d.prepend(w)}let f=e.parseHTML('<div class="acord--layer"></div>'),u=e.parseHTML(`<div class="${n.root} ${n[c]} ${e.escapeHTML(r)} acord--modal-root"></div>`),h=!1,g=[];async function E(){h||(h=!0,f?.remove(),document.querySelector(".acord--modal-root")||document.querySelector(".acord--backdrop")?.remove?.(),g.forEach(w=>w()))}return f.addEventListener("click",w=>{!w.target.classList.contains("acord--layer")||E()}),u.replaceChildren(typeof a=="function"?a({close:E,onClose(w){g.push(w)},root:u}):a),f.replaceChildren(u),d.appendChild(f),{close:E,onClose(w){g.push(w)},root:u}}return{show:Object.assign(s,{confirmation:(a,c)=>new Promise(r=>{o.Modals.showConfirmationModal(a,c,{onConfirm:()=>r(!0),onCancel:()=>r(!1)})}),alert:(a,c)=>o.Modals.showAlertModal(a,c)})}}});var ve=p((vo,Ee)=>{var gt=I(),G="https://raw.githubusercontent.com/AcordPlugin/i18n/main",X={cache:"no-store"};Ee.exports=o=>{let e=gt(o),t=[],n={};async function l(){t=await(await fetch(`${G}/languages.json`,X)).json(),n.default=await(await fetch(`${G}/default.json`,X)).json()}async function s(){let r=e.common.i18n._requestedLocale;n[r]||!t.includes(r)||(n[r]=await(await fetch(`${G}/${r}.json`,X)).json())}let a=new Proxy({},{get(r,i){s();let d=e.common.i18n._requestedLocale;return n[d]?.[i]||n.default[i]||e.common.i18n.Messages[i]||i}});function c(r,...i){return a[r].replaceAll(/{(\d+)}/g,(d,f)=>i[Number(f)])}return{init:l,fmt:c,messages:a,get locale(){return e.common.i18n._requestedLocale}}}});var Ae=p((_o,_e)=>{_e.exports=function(e,t,{walkable:n=null,ignore:l=[],limit:s=100}={}){let a=0;function c(r,i,{walkable:d=null,ignore:f=[]}={}){if(a+=1,!(a>s)){if(typeof i=="string"){if(r.hasOwnProperty(i))return r[i]}else if(i(r))return r;if(!!r){if(Array.isArray(r))for(let u of r){let h=c(u,i,{walkable:d,ignore:f});if(h)return h}else if(typeof r=="object"){for(let u of Object.keys(r))if(!(d!=null&&!d.includes(u))&&!f.includes(u))try{let h=c(r[u],i,{walkable:d,ignore:f});if(h)return h}catch{}}}}}return c(e,t,{walkable:n,ignore:l})}});var Oe=p((Ao,Te)=>{var yt=["Clickable","Tooltip"];Te.exports=function(o,{parent:e=!1,displayName:t=!0,blockList:n=yt}={}){let l=r=>!r?.type?.displayName||n.includes(r?.type?.displayName),s=r=>typeof r?.type!="string"&&(t?!l(r):!0),a=r=>s(r)?r?.type:a(r.return),c=a(acord.utils.getReactInstance(o));return e?find(r=>r?.default===c):c}});var Pe=p((To,Se)=>{Se.exports=function(e){if(window.DiscordNative){DiscordNative.clipboard.copy(e);return}navigator.clipboard.writeText(e).catch(()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(n){console.error(n)}document.body.removeChild(t)})}});var x=p((Oo,ke)=>{var Me=Ae(),wt=Oe(),bt=Pe(),V=(o,e)=>(...t)=>console[o]("%cAcord%c",`background-color: ${e}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...t);ke.exports={sleep:o=>new Promise(e=>setTimeout(e,o)),logger:{log:V("log","#00fbb0"),warn:V("warn","#debf18"),error:V("error","red")},react:{getInstance:o=>o.__reactFiber$,getOwnerInstance:o=>{for(let e=o.__reactFiber$;e;e=e.return)if(e.stateNode?.forceUpdate)return e.stateNode},findInTree:(o,e)=>Me(o,e,{walkable:["props","children","child","sibling"]}),findByDomNode:wt,getComponents(o){let e=o.__reactFiber$,t=[],n=e;for(;n&&n.return&&typeof n.return.type!="string";)n.return.type&&t.push(n.return.type),n=n.return;return t},getStateNodes(o){let e=o.__reactFiber$,t=[],n=e;for(;n&&n.return&&!(n.return.stateNode instanceof HTMLElement);)n.return.stateNode&&t.push(n.return.stateNode),n=n.return;return t},getProps:(o,e=n=>n,t=1e4)=>{let n=o.__reactFiber$;for(let l=n.return,s=0;s>t||l!==null;l=l?.return,s++)if(l?.pendingProps&&e(l.pendingProps))return l.pendingProps;return null}},findInTree:Me,copyText:bt,interval(o,e){let t=setInterval(o,e);return()=>{clearInterval(t)}},ifExists(o,e){o&&e(o)},minifyCSS(o){return o.replace(/( |\n)+/g," ")}}});var J=p(z=>{"use strict";Object.defineProperty(z,"__esModule",{value:!0});z.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var xe=p(M=>{"use strict";var mt=M&&M.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(M,"__esModule",{value:!0});var De=mt(J()),Y=class{constructor(){this.listeners=Object.values(De.default).reduce((e,t)=>(e[t]=new Set,e),{}),this.on=function(e,t){if(this.listeners[e].has(t))throw Error(`This listener on ${e} already exists.`);this.listeners[e].add(t)},this.once=function(e,t){let n=(l,s)=>{this.off(l,n),t(l,s)};this.on(e,n)},this.off=function(e,t){this.listeners[e].delete(t)},this.emit=function(e,t){for(let n of this.listeners[e])n(e,t)};for(let e of Object.values(De.default))this[e.toLowerCase()]=t=>{this.emit(e,t)}}};M.default=Y});var Ce=p(k=>{"use strict";var Et=k&&k.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(k,"__esModule",{value:!0});var vt=Et(xe());function _t(o={},{nestArrays:e=!0}={}){let t=new vt.default;function n(l,s,a){return new Proxy(l,{get(c,r){let i=[...a,r],d=c[r];return d!=null?(t.get({path:i,value:d}),!e&&Array.isArray(d)?d:typeof d=="object"?n(d,s,i):d):n(c[r]={},s,i)},set(c,r,i){return c[r]=i,t.set({path:[...a,r],value:i}),!0},deleteProperty(c,r){return delete c[r]?(t.delete({path:[...a,r]}),!0):!1},has(c,r){return typeof c[r]=="object"&&Object.keys(c[r]).length===0?!1:r in c}})}return Object.assign({store:n(o,o,[]),ghost:o},t)}k.default=_t});var D=p(A=>{"use strict";var je=A&&A.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(A,"__esModule",{value:!0});A.make=A.Events=void 0;var At=J();Object.defineProperty(A,"Events",{enumerable:!0,get:function(){return je(At).default}});var Tt=Ce();Object.defineProperty(A,"make",{enumerable:!0,get:function(){return je(Tt).default}})});var ee=p(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0});function b(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function qe(o,e){let t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);let n=b(t);return(l,s)=>n.then(a=>s(a.transaction(e,l).objectStore(e)))}var Z;function v(){return Z||(Z=qe("keyval-store","keyval")),Z}function Ot(o,e=v()){return e("readonly",t=>b(t.get(o)))}function St(o,e,t=v()){return t("readwrite",n=>(n.put(e,o),b(n.transaction)))}function Pt(o,e=v()){return e("readwrite",t=>(o.forEach(n=>t.put(n[1],n[0])),b(t.transaction)))}function Mt(o,e=v()){return e("readonly",t=>Promise.all(o.map(n=>b(t.get(n)))))}function kt(o,e,t=v()){return t("readwrite",n=>new Promise((l,s)=>{n.get(o).onsuccess=function(){try{n.put(e(this.result),o),l(b(n.transaction))}catch(a){s(a)}}}))}function Dt(o,e=v()){return e("readwrite",t=>(t.delete(o),b(t.transaction)))}function xt(o,e=v()){return e("readwrite",t=>(o.forEach(n=>t.delete(n)),b(t.transaction)))}function Ct(o=v()){return o("readwrite",e=>(e.clear(),b(e.transaction)))}function Q(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},b(o.transaction)}function jt(o=v()){return o("readonly",e=>{if(e.getAllKeys)return b(e.getAllKeys());let t=[];return Q(e,n=>t.push(n.key)).then(()=>t)})}function qt(o=v()){return o("readonly",e=>{if(e.getAll)return b(e.getAll());let t=[];return Q(e,n=>t.push(n.value)).then(()=>t)})}function Nt(o=v()){return o("readonly",e=>{if(e.getAll&&e.getAllKeys)return Promise.all([b(e.getAllKeys()),b(e.getAll())]).then(([n,l])=>n.map((s,a)=>[s,l[a]]));let t=[];return o("readonly",n=>Q(n,l=>t.push([l.key,l.value])).then(()=>t))})}m.clear=Ct;m.createStore=qe;m.del=Dt;m.delMany=xt;m.entries=Nt;m.get=Ot;m.getMany=Mt;m.keys=jt;m.promisifyRequest=b;m.set=St;m.setMany=Pt;m.update=kt;m.values=qt});var te=p((xo,Re)=>{var C=D(),Ne=ee();async function Rt(o){let e=await Ne.get(`AcordStore;${o}`),t=C.make(e??{}),n=()=>Ne.set(`AcordStore;${o}`,{...t.ghost});return t.on(C.Events.SET,n),t.on(C.Events.UPDATE,n),t.on(C.Events.DELETE,n),t}Re.exports=Rt});var Le=p((Co,Be)=>{var Bt=D(),Lt=ee(),$t=te();Be.exports={nests:Bt,idbKeyval:Lt,createPersistentNest:$t}});var ne=p((jo,Fe)=>{var $e=te(),Ut=D(),{logger:j}=x(),oe={cache:"no-store"},S=Ut.make({}),y=null,It=window.eval;function Ue(o,e){let t=Object.assign({data:e},window.acord),n=new URL(e.id),l=`(acord)=>{return ${o}}${atob("Ci8v")}#sourceURL=${n.hostname}${n.pathname}`,s=It(l)(t);return typeof s=="function"?s(e):s}async function Ht(){y=await $e("LoadedExtensionsStore")}async function q(o){let e=y.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(S.ghost[o])throw new Error(`EXTENSION_ALREADY_ENABLED ${o}`);let t,n=!1,l=await $e(o);try{t=Ue(e.source,{persist:l,id:o,manifest:e.manifest}),Array.isArray(t?.settings?.data)&&t.settings.data.forEach(s=>{s.property&&typeof l.ghost.settings?.[s.property]>"u"&&(l.store.settings[s.property]=s.value)})}catch(s){j.error("EXTENSION_EVAL_ERR",e.manifest.about.name,`${s} ${s.stack.join(`
`)}`),n=!0}try{t.load?.(),acord.ui.toasts.show(acord.i18n.fmt(`IMPORTING_${e.manifest.type.toUpperCase()}`,e.manifest.about.name))}catch(s){j.error("EXTENSION_LOAD_ERR",e.manifest.about.name,s),acord.ui.toasts.show(acord.i18n.fmt("EXTENSION_LOAD_ERROR",e.manifest.about.name))}t.persist=l,S.store[o]=t,n&&setTimeout(()=>{try{e.unload()}catch(s){j.error("EXTENSION_UNLOAD_ERR",e.manifest.about.name,s),acord.ui.toasts.show(acord.i18n.fmt("EXTENSION_UNLOAD_ERROR",e.manifest.about.name))}e.enabled=!1})}function R(o){let e=S.ghost[o],t=y.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(!S.ghost[o])throw new Error(`EXTENSION_NOT_LOADED ${o}`);try{e.unload(),acord.ui.toasts.show(acord.i18n.fmt(`STOPPING_${t.manifest.type.toUpperCase()}`,t.manifest.about.name))}catch(n){j.error("EXTENSION_UNLOAD_ERR",t.manifest.about.name,n),acord.ui.toasts.show(acord.i18n.fmt("EXTENSION_UNLOAD_ERROR",t.manifest.about.name))}delete S.store[o]}async function Ft(o){let e=y.store[o];if(!y.ghost?.[o])throw new Error(`EXTENSION_NOT_FOUND ${o}`);e.enabled?(await R(o),e.enabled=!1):(await q(o),e.enabled=!0)}async function N(o,e=!0){let t=o.replace(/\/?$/,"/"),n=new URL("extension.json",t).href,l=new URL("extension.js",t).href,s=y.ghost?.[t],a=s?y.store[t]:void 0,c=s?.enabled??e,r=/^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(plugins|themes)/.test(t),i;try{let u=await fetch(n,oe);if(i=await u.json(),u.status!==200&&!s)throw delete y.store[t],"NO_MAN_200"}catch(u){throw new Error(`NO_PARSE ${u}`)}if(i.locked&&!r)throw"INVALID_LOCKED";if(!["plugin","theme"].includes(i?.type))throw"INVALID_TYPE";if(s){if(i&&update){if(a.manifest.hash!==i.hash){let u=await fetch(l,oe);if(u.status!==200)throw delete y.store[t],new Error("NO_200");a.source=await u.text()}_.isEqual(a.manifest,i)||(a.manifest=i)}c&&await q(t);return}let d=await fetch(l,oe);if(d.status!==200)throw new Error("NO_200");let f=await d.text();y.store[t]={manifest:i,verified:r,source:f,enabled:c},c&&await q(t)}function Ie(o){let e=y.ghost?.[o];if(!!e){try{R(o)}catch{}e.locked||delete y.store[o]}}var Wt=["https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/"];async function Kt(){await Promise.allSettled(Object.keys(y.ghost).map(N)),Wt.forEach(o=>{y.ghost?.[o]||N(o)})}function Gt(){Object.keys(y.ghost).forEach(o=>{try{R(o)}catch{}})}async function He(o,e=!0){try{Ie(o)}catch{}try{await N(o,e)}catch{}}async function Xt(){let o=Object.entries(y.store);for(let e=0;e<o.length;e++)await He(o[e][0],o[e][1].enabled)}Fe.exports={evaluate:Ue,load:N,init:Ht,startAll:Kt,reloadAll:Xt,reload:He,nests:{get enabled(){return S},get loaded(){return y}},remove:Ie,start:q,stop:R,toggle:Ft,stopAll:Gt}});var We=p((qo,Vt)=>{Vt.exports={info:{name:"Acord",authors:[{name:"K\u0131ra\xE7 Arma\u011Fan \xD6nal",discord_id:"707309693449535599",github_username:"TheArmagan"}],version:"0.1.342",description:"Acord is a BetterDiscord plugin developed to enable plugin developers to make plugins more easily and wisely. Requires 0PluginLibrary!"},main:"index.js"}});var Ge=p((No,Ke)=>{var zt=F(),Jt=new zt;Ke.exports=Jt});var Ve=p((Ro,Xe)=>{var re=class{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(n=>n==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}};Xe.exports=new re});var Je=p((Bo,ze)=>{var{logger:T}=x(),Yt=D(),Zt=ne();ze.exports=o=>{let e=null,t=null,n=null,l=Yt.make({}),s=!1;o.set("UpdateDevelopmentExtension",async({source:c,manifest:r})=>{if(!s){if(s=!0,e){T.log(`Unloading development extension.. (${r.about.name})`);try{e?.unload?.(),e=null,t=null,n=null,T.log(`Development extension unloaded! (${r.about.name})`)}catch(i){T.error(`Unable to unload development extension! (${r.about.name})`,i)}}await new Promise(i=>setTimeout(i,1));try{e=Zt.evaluate(c,{persist:l,id:"https://FakeExtensionId",manifest:r}),Array.isArray(e?.settings?.data)&&e.settings.data.forEach(i=>{i.property&&typeof l.ghost.settings?.[i.property]>"u"&&(l.store.settings[i.property]=i.value)}),t=c,n=r,e.persist=l,e?.load?.(),T.log(`Development extension is loaded! (${r.about.name})`)}catch(i){T.error(`Failed to load development extension! (${r.about.name})`,i)}finally{}s=!1}});function a(){if(e){T.log("Unloading development extension..");try{e?.unload?.(),e=null,t=null,n=null,T.log("Development extension unloaded!")}catch(c){T.error("Unable to unload development extension!",c)}return!0}return!1}return{get extension(){return{loaded:t?{source:t,manifest:n}:null,enabled:e}},unload:a}}});var Qt=I(),eo=H(),to=we(),oo=me(),no=ve(),B=x(),ro=Le(),L=ne(),se=P(),$=We(),so=Ge(),Ye=Ve(),io=Je(),{injectCSS:ao}=P(),lo=(o,e)=>{let t=Qt(e),n=to(e),l=io(n),s=eo(e),a=oo(e),c=no(e);return class extends o{async onStart(){await e.PluginUpdater.checkForUpdate("Acord",$.info.version,"https://raw.githubusercontent.com/AcordPlugin/acord-releases/main/acord.plugin.js"),ao('[class*="acord--"] * {box-sizing: border-box;}'),Ye.add(B.interval(()=>{document.querySelectorAll("[acord-tooltip-content]").forEach(r=>{if(r.acordTooltip)return;let i=r.setAttribute,d=r.removeAttribute;r.setAttribute=function(g,E){if(r.acordTooltip)switch(g){case"acord-tooltip-content":{r.acordTooltip.label=E,r.acordTooltip.disabled=!E?.trim?.();break}case"acord-tooltip-style":{r.acordTooltip.style=E??"primary";break}case"acord-tooltip-side":{r.acordTooltip.side=E??"top";break}}return i.bind(this,g,E)},r.removeAttribute=function(g){if(r.acordTooltip)switch(g){case"acord-tooltip-content":{r.acordTooltip.disabled=!0,r.acordTooltip.label="";break}case"acord-tooltip-style":{r.acordTooltip.style="primary";break}case"acord-tooltip-side":{r.acordTooltip.side="top";break}}return d.call(this,g)};let f=r.getAttribute("acord-tooltip-content"),u=r.getAttribute("acord-tooltip-style")||"primary",h=r.getAttribute("acord-tooltip-side")||"top";if(r.acordTooltip){r.acordTooltip.disabled=!!f?.trim(),r.acordTooltip.label=f,r.acordTooltip.style=u,r.acordTooltip.side=h;return}r.acordTooltip=new e.Tooltip(r,f,{style:u,side:h}),r.acordTooltip.tooltipElement.style.zIndex=9999999})},100)),window.acord={internal:ro,modules:t,utils:B,patcher:se,extensions:(()=>{let r={...L};return delete r.init,r})(),events:so,ui:{modals:a,toasts:{show:Object.assign((...r)=>e.Toasts.show(...r),{success:(...r)=>e.Toasts.success(...r),error:(...r)=>e.Toasts.error(...r),info:(...r)=>e.Toasts.info(...r),warning:(...r)=>e.Toasts.warning(...r)})},tooltips:{create:Object.assign((r,i,d={})=>new e.Tooltip(r,i,{style:"primary",...d}),{success:(r,i,d={})=>new e.Tooltip(r,i,{style:"green",...d}),error:(r,i,d={})=>new e.Tooltip(r,i,{style:"red",...d}),warning:(r,i,d={})=>new e.Tooltip(r,i,{style:"yellow",...d})})}},dom:s,i18n:(()=>{let r={...c};return delete r.init,r})(),websocket:{addHandler:n.addHandler,triggerHandler:n.triggerHandler},dev:l,unload(){se.unpatchAll(),se.unpatchAllCSS(),L.stopAll(),n.unpatchSocket(),Ye.removeAll(),l.unload()},_:e},globalThis.acord=window.acord,await c.init(),await L.init(),await L.startAll(),B.logger.log(c.messages.ACORD_LOADED),e.Toasts.success(c.messages.ACORD_LOADED)}observer(r){window.acord&&window.acord.events.emit("domMutation",r)}onStop(){try{window.acord.events.emit("unload"),window.acord.unload()}catch{}delete window.acord,delete globalThis.acord,B.logger.log(c.messages.ACORD_UNLOADED),e.Toasts.success(c.messages.ACORD_UNLOADED)}}};if(!global.ZLibrary)BdApi.showConfirmationModal("Library Missing",`The library plugin needed for ${$.name??$.info.name} is missing. Please click Download Now to install it.`,{confirmText:"Download Now",cancelText:"Cancel",onConfirm:()=>{require("request").get("https://betterdiscord.app/gh-redirect?id=9",async(o,e,t)=>{if(o)return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");e.statusCode===302?require("request").get(e.headers.location,async(n,l,s)=>{if(n)return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");await new Promise(a=>require("fs").writeFile(require("path").join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),s,a))}):await new Promise(n=>require("fs").writeFile(require("path").join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),t,n))})}}),module.exports=class{constructor(e){}start(){setTimeout(()=>{BdApi.Plugins.reload("Acord")},1e3)}stop(){}};else{let o=global.ZLibrary.buildPlugin($);module.exports=lo(...o)}
