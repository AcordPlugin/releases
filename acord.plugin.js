/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely.
 * @version 0.1.384
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://armagan.rest/
 */
var p=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var U=p((bo,re)=>{re.exports=t=>{let e=a=>typeof a=="object"||typeof a=="function";function o(a){return c=>a.every(r=>Object.keys(c).some(s=>s.toLowerCase().includes(r.toLowerCase())))}function n(a){return c=>e(c)&&Object.values(c).some(r=>e(r)&&a.some(s=>r?.[s]!==void 0))}function l(a){return c=>c.prototype&&a.every(r=>c.prototype[r]!==void 0)}function i(a){return c=>a.every(r=>c?.toString?.()?.includes?.(r))}return{findByProps:(...a)=>t.WebpackModules.findByUniqueProperties(a,!0),findByProperties:(...a)=>t.WebpackModules.findByUniqueProperties(a,!0),findByPropsAll:(...a)=>t.WebpackModules.findByUniqueProperties(a,!1),findByPropertiesAll:(...a)=>t.WebpackModules.findByUniqueProperties(a,!1),findByKeywordAll:(...a)=>t.WebpackModules.findAll(o(a)),findByKeyword:(...a)=>t.WebpackModules.findAll(o(a))[0],findByNestedProps:(...a)=>t.WebpackModules.findAll(n(a))[0],findByNestedPropsAll:(...a)=>t.WebpackModules.findAll(n(a)),findByPrototypes:(...a)=>t.WebpackModules.findAll(l(a))[0],findByPrototypesAll:(...a)=>t.WebpackModules.findAll(l(a)),findByStrings:(...a)=>t.WebpackModules.findAll(i(a))[0],findByStringsAll:(...a)=>t.WebpackModules.findAll(i(a)),findAll:(a,c=!1)=>t.WebpackModules.findAll(a,{searchExports:c}),find:(a,c=!1)=>t.WebpackModules.find(a,{searchExports:c})}}});var L=p((mo,se)=>{var tt=U();se.exports=t=>{let e=tt(t);return{webpack:e,common:{constants:{Permissions:t.DiscordModules.DiscordPermissions},channels:e.findByProps("getVoiceChannelId","getChannelId"),guilds:e.findByProps("getLastSelectedGuildId","getGuildId"),Flux:e.findByProps("connectStores","destroy"),FluxDispatcher:e.findByProps("_currentDispatchActionType","dispatch"),i18n:e.findByProps("_requestedLocale","getDefaultLocale"),React:t.DiscordModules.React,ReactDOM:t.DiscordModules.ReactDOM,UserStore:e.findByProps("getUser","getCurrentUser"),ChannelStore:e.findByProps("getDMFromUserId","getDMUserIds","getChannel"),GuildStore:e.findByProps("getGuild","getGuildCount"),InviteStore:e.findByProps("acceptInvite","acceptInviteAndTransitionToInviteChannel"),VoiceStateStore:e.findByProps("getVoiceState","getUserVoiceChannelId"),PermissionStore:e.findByProps("getChannelPermissions"),ActivityStore:e.findByProps("getAllApplicationActivities","getActivities"),DiscordAPI:e.findByProps("get","post"),uuid:e.findByProps("v1","v4"),Markdown:e.find(o=>o?.prototype?.render&&o.rules),SimpleMarkdown:t.DiscordModules.SimpleMarkdown,Button:t.DiscordModules.ButtonData,modals:{actions:{show:(...o)=>t.DiscordModules.ModalActions.openModal(...o),close:(...o)=>t.DiscordModules.ModalActions.closeModal(...o)},ModalRoot:e.find(o=>o?.toString?.()?.includes?.("ENTERING"),!0),ModalComponents:e.findByProps("Header","Footer")}}}}});var F=p((Eo,ie)=>{ie.exports=t=>({createElement:(e,o,...n)=>{if(typeof e=="function")return e({...o,children:[].concat(...n)});let l=document.createElement(e);for(let i of Object.keys(o))i.indexOf("on")===0?l.addEventListener(i.slice(2).toLowerCase(),o[i]):i==="children"?l.append(...Array.isArray(o[i])?o[i]:[].concat(o[i])):l.setAttribute(i==="className"?"class":i,o[i]);return n.length&&l.append(...n),l},parseHTML:e=>t.DOMTools.parseHTML(e,!0).firstElementChild,parents:t.DOMTools.parents,escapeHTML:t.DOMTools.escapeHTML,toCSSProp(e){let o=document.createElement("div");return Object.entries(e).forEach(n=>{o.style.hasOwnProperty(n[0])?o.style[n[0]]=n[1]:o.style.setProperty(n[0],n[1])}),o.getAttribute("style")},toHTMLProps(e){return Object.entries(e).map(o=>`${o[0].replace(/ +/,"-")}="${o[0]=="style"&&typeof o[1]!="string"?this.toCSSProp(o[1]):this.escapeHTML(o[1])}"`).join(" ")}})});var H=p(W=>{"use strict";Object.defineProperty(W,"__esModule",{value:!0});W.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var le=p(k=>{"use strict";var ot=k&&k.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(k,"__esModule",{value:!0});var ae=ot(H()),X=class{constructor(){this.listeners=Object.values(ae.default).reduce((e,o)=>(e[o]=new Set,e),{}),this.on=function(e,o){if(this.listeners[e].has(o))throw Error(`This listener on ${e} already exists.`);this.listeners[e].add(o)},this.once=function(e,o){let n=(l,i)=>{this.off(l,n),o(l,i)};this.on(e,n)},this.off=function(e,o){this.listeners[e].delete(o)},this.emit=function(e,o){for(let n of this.listeners[e])n(e,o)};for(let e of Object.values(ae.default))this[e.toLowerCase()]=o=>{this.emit(e,o)}}};k.default=X});var ce=p(M=>{"use strict";var nt=M&&M.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(M,"__esModule",{value:!0});var rt=nt(le());function st(t={},{nestArrays:e=!0}={}){let o=new rt.default;function n(l,i,a){return new Proxy(l,{get(c,r){let s=[...a,r],u=c[r];return u!=null?(o.get({path:s,value:u}),!e&&Array.isArray(u)?u:typeof u=="object"?n(u,i,s):u):n(c[r]={},i,s)},set(c,r,s){return c[r]=s,o.set({path:[...a,r],value:s}),!0},deleteProperty(c,r){return delete c[r]?(o.delete({path:[...a,r]}),!0):!1},has(c,r){return typeof c[r]=="object"&&Object.keys(c[r]).length===0?!1:r in c}})}return Object.assign({store:n(t,t,[]),ghost:t},o)}M.default=st});var D=p(v=>{"use strict";var ue=v&&v.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(v,"__esModule",{value:!0});v.make=v.Events=void 0;var it=H();Object.defineProperty(v,"Events",{enumerable:!0,get:function(){return ue(it).default}});var at=ce();Object.defineProperty(v,"make",{enumerable:!0,get:function(){return ue(at).default}})});var z=p(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0});function b(t){return new Promise((e,o)=>{t.oncomplete=t.onsuccess=()=>e(t.result),t.onabort=t.onerror=()=>o(t.error)})}function de(t,e){let o=indexedDB.open(t);o.onupgradeneeded=()=>o.result.createObjectStore(e);let n=b(o);return(l,i)=>n.then(a=>i(a.transaction(e,l).objectStore(e)))}var K;function A(){return K||(K=de("keyval-store","keyval")),K}function lt(t,e=A()){return e("readonly",o=>b(o.get(t)))}function ct(t,e,o=A()){return o("readwrite",n=>(n.put(e,t),b(n.transaction)))}function ut(t,e=A()){return e("readwrite",o=>(t.forEach(n=>o.put(n[1],n[0])),b(o.transaction)))}function dt(t,e=A()){return e("readonly",o=>Promise.all(t.map(n=>b(o.get(n)))))}function ft(t,e,o=A()){return o("readwrite",n=>new Promise((l,i)=>{n.get(t).onsuccess=function(){try{n.put(e(this.result),t),l(b(n.transaction))}catch(a){i(a)}}}))}function pt(t,e=A()){return e("readwrite",o=>(o.delete(t),b(o.transaction)))}function ht(t,e=A()){return e("readwrite",o=>(t.forEach(n=>o.delete(n)),b(o.transaction)))}function gt(t=A()){return t("readwrite",e=>(e.clear(),b(e.transaction)))}function G(t,e){return t.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},b(t.transaction)}function yt(t=A()){return t("readonly",e=>{if(e.getAllKeys)return b(e.getAllKeys());let o=[];return G(e,n=>o.push(n.key)).then(()=>o)})}function wt(t=A()){return t("readonly",e=>{if(e.getAll)return b(e.getAll());let o=[];return G(e,n=>o.push(n.value)).then(()=>o)})}function bt(t=A()){return t("readonly",e=>{if(e.getAll&&e.getAllKeys)return Promise.all([b(e.getAllKeys()),b(e.getAll())]).then(([n,l])=>n.map((i,a)=>[i,l[a]]));let o=[];return t("readonly",n=>G(n,l=>o.push([l.key,l.value])).then(()=>o))})}m.clear=gt;m.createStore=de;m.del=pt;m.delMany=ht;m.entries=bt;m.get=lt;m.getMany=dt;m.keys=yt;m.promisifyRequest=b;m.set=ct;m.setMany=ut;m.update=ft;m.values=wt});var V=p((So,pe)=>{var j=D(),fe=z();async function mt(t){let e=await fe.get(`AcordStore;${t}`),o=j.make(e??{}),n=()=>fe.set(`AcordStore;${t}`,{...o.ghost});return o.on(j.Events.SET,n),o.on(j.Events.UPDATE,n),o.on(j.Events.DELETE,n),o}pe.exports=mt});var ge=p((Po,he)=>{he.exports=function(e,o,{walkable:n=null,ignore:l=[],limit:i=100}={}){let a=0;function c(r,s,{walkable:u=null,ignore:f=[]}={}){if(a+=1,!(a>i)){if(typeof s=="string"){if(r.hasOwnProperty(s))return r[s]}else if(s(r))return r;if(!!r){if(Array.isArray(r))for(let d of r){let h=c(d,s,{walkable:u,ignore:f});if(h)return h}else if(typeof r=="object"){for(let d of Object.keys(r))if(!(u!=null&&!u.includes(d))&&!f.includes(d))try{let h=c(r[d],s,{walkable:u,ignore:f});if(h)return h}catch{}}}}}return c(e,o,{walkable:n,ignore:l})}});var we=p((ko,ye)=>{var Et=["Clickable","Tooltip"];ye.exports=function(t,{parent:e=!1,displayName:o=!0,blockList:n=Et}={}){let l=r=>!r?.type?.displayName||n.includes(r?.type?.displayName),i=r=>typeof r?.type!="string"&&(o?!l(r):!0),a=r=>i(r)?r?.type:a(r.return),c=a(acord.utils.getReactInstance(t));return e?find(r=>r?.default===c):c}});var me=p((Mo,be)=>{be.exports=function(e){if(window.DiscordNative){DiscordNative.clipboard.copy(e);return}navigator.clipboard.writeText(e).catch(()=>{let o=document.createElement("textarea");o.style.visibility="hidden",o.style.position="fixed",o.style.top="0",o.style.left="0",document.body.appendChild(o),o.focus(),o.select();try{document.execCommand("copy")}catch(n){console.error(n)}document.body.removeChild(o)})}});var S=p((Do,Ae)=>{var Ee=ge(),At=we(),_t=me(),J=(t,e)=>(...o)=>console[t]("%cAcord%c",`background-color: ${e}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...o);Ae.exports={sleep:t=>new Promise(e=>setTimeout(e,t)),logger:{log:J("log","#00fbb0"),warn:J("warn","#debf18"),error:J("error","red")},react:{getInstance:t=>t.__reactFiber$,getOwnerInstance:t=>{for(let e=t.__reactFiber$;e;e=e.return)if(e.stateNode?.forceUpdate)return e.stateNode},findInTree:(t,e)=>Ee(t,e,{walkable:["props","children","child","sibling"]}),findByDomNode:At,getComponents(t){let e=t.__reactFiber$,o=[],n=e;for(;n&&n.return&&typeof n.return.type!="string";)n.return.type&&o.push(n.return.type),n=n.return;return o},getStateNodes(t){let e=t.__reactFiber$,o=[],n=e;for(;n&&n.return&&!(n.return.stateNode instanceof HTMLElement);)n.return.stateNode&&o.push(n.return.stateNode),n=n.return;return o},getProps:(t,e=n=>n,o=1e4)=>{let n=t.__reactFiber$;for(let l=n.return,i=0;i>o||l!==null;l=l?.return,i++)if(l?.pendingProps&&e(l.pendingProps))return l.pendingProps;return null}},findInTree:Ee,copyText:_t,interval(t,e){let o=setInterval(t,e);return()=>{clearInterval(o)}},ifExists(t,e){t&&e(t)},minifyCSS(t){return t.replace(/( |\n)+/g," ")},format(t,...e){return`${t}`.replaceAll(/{(\d+)}/g,(o,n)=>e[Number(n)])}}});var ve=p((xo,_e)=>{var vt=S();_e.exports=async t=>{let e={},o=[],n=null;typeof t=="string"?(n=t,n.endsWith("/")&&(n=n.slice(0,-1)),o=await(await fetch(`${n}/locales.json`,noStore)).json(),e.default=await(await fetch(`${n}/default.json`,noStore)).json()):e=t;async function l(){if(!n)return;let c=acord.i18n.locale;e[c]||!o.includes(c)||(e[c]=await(await fetch(`${n}/${c}.json`,noStore)).json())}let i=new Proxy({},{get(c,r){return l(),e[acord.i18n.locale]?.[r]||e.default?.[r]||acord.i18n.messages[r]||r}});function a(c,...r){return vt.format(i[c],...r)}return{messages:i,format:a}}});var B=p((jo,Me)=>{var Te=V(),Tt=D(),{logger:C}=S(),Ot=ve(),Z={cache:"no-store"},P=Tt.make({}),y=null,St=window.eval;function Oe(t){return Object.assign({extension:Object.assign(t,{i18n:Ot(t.manifest.i18n||{})})},window.acord)}function Se(t,e){let o=Oe(e),n=`(acord)=>{return ${t}}${atob("Ci8v")}#sourceURL=${e.url}`,l=St(n)(o),i=typeof l=="function"?l(e):l;return i.api=o,i}async function Pt(){y=await Te("LoadedExtensionsStore")}async function q(t){let e=y.ghost[t];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${t}`);if(P.ghost[t])throw new Error(`EXTENSION_ALREADY_ENABLED ${t}`);if(e.manifest.eula&&!e.eula&&!await acord.ui.modals.show.confirmation(acord.i18n.fmt("ACCEPT_EXTENSION_EULA"),typeof e.manifest.eula=="string"?e.manifest.eula:acord.i18n.fmt("ACCEPT_EXTENSION_EULA_DESCRIPTION")))return;let o,n=!1,l=await Te(t);try{o=Se(e.source,{persist:l,url:t,manifest:e.manifest}),Array.isArray(o?.settings?.data)&&o.settings.data.forEach(i=>{i.property&&typeof l.ghost.settings?.[i.property]>"u"&&(l.store.settings[i.property]=i.value)})}catch(i){C.error("EXTENSION_EVAL_ERR",e.manifest.about.name,`${i} ${i.stack.join(`
`)}`),n=!0}try{o.load?.(),acord.ui.toasts.show(acord.i18n.fmt(`IMPORTING_${e.manifest.type.toUpperCase()}`,e.manifest.about.name))}catch(i){C.error("EXTENSION_LOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.fmt("EXTENSION_LOAD_ERROR",e.manifest.about.name))}P.store[t]=o,n&&setTimeout(()=>{try{e.unload()}catch(i){C.error("EXTENSION_UNLOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.fmt("EXTENSION_UNLOAD_ERROR",e.manifest.about.name))}e.enabled=!1})}function I(t){let e=P.ghost[t],o=y.ghost[t];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${t}`);if(!P.ghost[t])throw new Error(`EXTENSION_NOT_LOADED ${t}`);try{e.unload(),acord.ui.toasts.show(acord.i18n.fmt(`STOPPING_${o.manifest.type.toUpperCase()}`,o.manifest.about.name))}catch(n){C.error("EXTENSION_UNLOAD_ERR",o.manifest.about.name,n),acord.ui.toasts.show(acord.i18n.fmt("EXTENSION_UNLOAD_ERROR",o.manifest.about.name))}delete P.store[t]}async function kt(t){let e=y.store[t];if(!y.ghost?.[t])throw new Error(`EXTENSION_NOT_FOUND ${t}`);e.enabled?(await I(t),e.enabled=!1):(await q(t),e.enabled=!0)}async function N(t,e=!0){let o=t.replace(/\/?$/,"/"),n=new URL("extension.json",o).href,l=new URL("extension.js",o).href,i=y.ghost?.[o],a=i?y.store[o]:void 0,c=i?.enabled??e,r=/^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(plugins|themes)/.test(o),s;try{let d=await fetch(n,Z);if(s=await d.json(),d.status!==200&&!i)throw delete y.store[o],"NO_MAN_200"}catch(d){throw new Error(`NO_PARSE ${d}`)}if(s.locked&&!r)throw"INVALID_LOCKED";if(!["plugin","theme"].includes(s?.type))throw"INVALID_TYPE";if(i){if(s){if(a.manifest.hash!==s.hash){let d=await fetch(l,Z);if(d.status!==200)throw delete y.store[o],new Error("NO_200");a.source=await d.text()}_.isEqual(a.manifest,s)||(a.manifest=s)}c&&await q(o);return}let u=await fetch(l,Z);if(u.status!==200)throw new Error("NO_200");let f=await u.text();y.store[o]={manifest:s,verified:r,source:f,enabled:c},c&&await q(o)}function Pe(t){let e=y.ghost?.[t];if(!!e){try{I(t)}catch{}e.locked||delete y.store[t]}}var Mt=["https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/"];async function Dt(){await Promise.allSettled(Object.keys(y.ghost).map(N)),Mt.forEach(t=>{y.ghost?.[t]||N(t)})}function xt(){Object.keys(y.ghost).forEach(t=>{try{I(t)}catch{}})}async function ke(t,e=!0){try{Pe(t)}catch{}try{await N(t,e)}catch{}}async function jt(){let t=Object.entries(y.store);for(let e=0;e<t.length;e++)await ke(t[e][0],t[e][1].enabled)}Me.exports={evaluate:Se,load:N,init:Pt,startAll:Dt,reloadAll:jt,reload:ke,buildAPI:Oe,nests:{get enabled(){return P},get loaded(){return y}},remove:Pe,start:q,stop:I,toggle:kt,stopAll:xt}});var qe=p((Co,Ce)=>{var Y=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,qt=Object.getOwnPropertyNames,Nt=Object.prototype.hasOwnProperty,It=(t,e)=>{for(var o in e)Y(t,o,{get:e[o],enumerable:!0})},Bt=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of qt(e))!Nt.call(t,l)&&l!==o&&Y(t,l,{get:()=>e[l],enumerable:!(n=Ct(e,l))||n.enumerable});return t},Rt=t=>Bt(Y({},"__esModule",{value:!0}),t),De={};It(De,{after:()=>Wt,before:()=>Lt,instead:()=>Ft,unpatchAll:()=>Ut});Ce.exports=Rt(De);var xe=["a","b","i"],O=new Map;function $t(t,e,o,n,l){let i=O.get(e)?.[t];if(!i)return l?Reflect.construct(e[t],o,n):e[t].apply(n,o);for(let r of i.b.values()){let s=r.call(n,o);Array.isArray(s)&&(o=s)}let a=(...r)=>l?Reflect.construct(i.o,r,n):i.o.apply(n,r);for(let r of i.i.values()){let s=a;a=(...u)=>r.call(n,u,s)}let c=a(...o);for(let r of i.a.values())c=r.call(n,o,c)??c;return c}function je(t,e,o,n){let l=O.get(t),i=l?.[e];return i?.[n].has(o)?(i[n].delete(o),xe.every(a=>i[a].size===0)&&(Reflect.defineProperty(t,e,{value:i.o,writable:!0,configurable:!0})||(t[e]=i.o),delete l[e]),Object.keys(l).length==0&&O.delete(t),!0):!1}function Ut(){for(let[t,e]of O.entries())for(let o in e)for(let n of xe)for(let l of e[o]?.[n].keys()??[])je(t,o,l,n)}var Q=t=>(e,o,n,l=!1)=>{if(typeof o[e]!="function")throw new Error(`${e} is not a function in ${o.constructor.name}`);O.has(o)||O.set(o,{});let i=O.get(o);if(!i[e]){let r=o[e];i[e]={o:r,b:new Map,i:new Map,a:new Map};let s=(d,h,g)=>{let E=$t(e,o,h,d,g);return l&&c(),E},u=new Proxy(r,{apply:(d,h,g)=>s(h,g,!1),construct:(d,h)=>s(r,h,!0),get:(d,h,g)=>h=="toString"?r.toString.bind(r):Reflect.get(d,h,g)});Reflect.defineProperty(o,e,{value:u,configurable:!0,writable:!0})||(o[e]=u)}let a=Symbol(),c=()=>je(o,e,a,t);return i[e][t].set(a,n),c},Lt=Q("b"),Ft=Q("i"),Wt=Q("a")});var x=p((qo,Ne)=>{var Ht=qe();Ne.exports={...Ht,injectCSS(t){let e=document.createElement("style");return e.className="AcordInjectedCSS",e.textContent=t,document.head.appendChild(e),()=>{e?.remove()}},unpatchAllCSS(){document.querySelectorAll(".AcordInjectedCSS").forEach(t=>{t.remove()})}}});var Be=p((No,Ie)=>{var Xt=B(),Kt=x();Ie.exports=t=>{let e=t.WebpackModules.find(s=>s?.__proto__?.handleConnection),o=new Set,n=new Map;async function l(s,u){let f;try{if(f=JSON.parse(u),!Array.isArray(f)||f.length<1||f.length>3)throw"Array expected as message.";if(typeof f[0]!="string")throw"Array[0] needs to be string.";if(typeof f[1]!="string")throw"Array[1] needs to be string."}catch(w){s.send(JSON.stringify([null,{ok:!1,error:`${w}`}]))}let[d,h,g]=f,E=n.get(h);if(!E)return s.send(JSON.stringify([d,{ok:!1,error:"Unable to find handler."}]));try{let w=await E(g);s.send(JSON.stringify([d,{ok:!0,data:w}]))}catch(w){s.send(JSON.stringify([d,{ok:!1,error:`${w}`}]))}}function i(s,u){if(typeof s!="string")throw new Error("EventName needs to be a string.");if(typeof u!="function")throw new Error("Callback needs to be a function.");if(n.has(s))throw new Error("EventName already in use.");return n.set(s,u),()=>{n.delete(s)}}let a=Kt.instead("handleConnection",e,(s,u)=>{let f=s[0];if(f.upgradeReq().url!=="/acord")return u(...s);o.add(f),f.on("message",d=>{l(f,d)}),f.on("close",()=>o.delete(f))});function c(){a(),n.clear(),o.forEach(s=>s.close())}function r(s,...u){if(!n.has(s))throw new Error("Unable to find handler!");return n.get(s)(...u)}return i("InstallExtension",async({url:s}={})=>{if(!(!s||!await acord.ui.modals.show.confirmation(acord.i18n.fmt("IMPORT_EXTENSION"),acord.i18n.fmt("IMPORT_EXTENSION_DESCRIPTION",s))))try{await Xt.load(s)}catch(f){acord.ui.toasts.show.error(`${f}`)}}),{unpatchSocket:c,connectedSockets:o,socketEvents:n,set:i,trigger:r}}});var $e=p((Io,Re)=>{var Gt=F(),zt=U(),{injectCSS:Vt}=x();Re.exports=t=>{let e=Gt(t),o=zt(t),n=o.findByProps("root","small"),l=o.findByProps("notDevTools","app");Vt(".acord--layer-container{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1001;pointer-events:none;transition:100ms ease all}.acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none}.acord--layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all}.acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all}");function i(a,{size:c="large",classes:r=""}={}){let s=document.querySelector(`.${l.notDevTools}`),u=s.querySelector(".acord--layer-container");if(u||(u=e.parseHTML('<div class="acord--layer-container"></div>'),s.appendChild(u)),!u.querySelector(".acord--backdrop")){let w=e.parseHTML('<div class="acord--backdrop"></div>');u.prepend(w)}let f=e.parseHTML('<div class="acord--layer"></div>'),d=e.parseHTML(`<div class="${n.root} ${n[c]} ${e.escapeHTML(r)} acord--modal-root"></div>`),h=!1,g=[];async function E(){h||(h=!0,f?.remove(),document.querySelector(".acord--modal-root")||document.querySelector(".acord--backdrop")?.remove?.(),g.forEach(w=>w()))}return f.addEventListener("click",w=>{!w.target.classList.contains("acord--layer")||E()}),d.replaceChildren(typeof a=="function"?a({close:E,onClose(w){g.push(w)},root:d}):a),f.replaceChildren(d),u.appendChild(f),{close:E,onClose(w){g.push(w)},root:d}}return{show:Object.assign(i,{confirmation:(a,c,r={})=>new Promise(s=>{t.Modals.showConfirmationModal(a,c,{onConfirm:()=>s(!0),onCancel:()=>s(!1),confirmText:r?.okay,cancelText:r?.cancel,danger:r?.danger})}),alert:(a,c)=>t.Modals.showAlertModal(a,c)})}}});var Le=p((Bo,Ue)=>{var Jt=L(),Zt=S(),ee="https://raw.githubusercontent.com/AcordPlugin/i18n/main",te={cache:"no-store"};Ue.exports=t=>{let e=Jt(t),o=[],n={};async function l(){o=await(await fetch(`${ee}/locales.json`,te)).json(),n.default=await(await fetch(`${ee}/default.json`,te)).json()}async function i(){let r=e.common.i18n._requestedLocale;n[r]||!o.includes(r)||(n[r]=await(await fetch(`${ee}/${r}.json`,te)).json())}let a=new Proxy({},{get(r,s){i();let u=e.common.i18n._requestedLocale;return n[u]?.[s]||n.default?.[s]||e.common.i18n.Messages[s]||s}});function c(r,...s){return Zt.format(a[r],...s)}return{init:l,format:c,messages:a,get locale(){return e.common.i18n._requestedLocale}}}});var We=p((Ro,Fe)=>{var Yt=D(),Qt=z(),eo=V();Fe.exports={nests:Yt,idbKeyval:Qt,createPersistentNest:eo}});var He=p(($o,to)=>{to.exports={info:{name:"Acord",authors:[{name:"K\u0131ra\xE7 Arma\u011Fan \xD6nal",discord_id:"707309693449535599",github_username:"TheArmagan"}],version:"0.1.384",description:"Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely."},main:"index.js"}});var Ke=p((Lo,Xe)=>{Xe.exports=class{constructor(){this.listeners=new Map}_prepareListenersMap(e){this.listeners.has(e)||this.listeners.set(e,new Map)}on(e,o){return this._prepareListenersMap(e),this.listeners.get(e).set(o,{once:!1}),()=>{this.listeners.get(e).delete(o)}}once(e,o){return this._prepareListenersMap(e),this.listeners.get(e)?.set(o,{once:!0}),()=>{this.listeners.get(e).delete(o)}}off(e,o){if(!e)return this.listeners=new Map;if(!o)return this.listeners?.delete(e);this.listeners.get(e)?.delete(o)}emit(e,...o){if(!this.listeners.has(e))return;let n=this.listeners.get(e);n.forEach(({once:l},i)=>{l&&n?.delete(i),i(...o)})}}});var ze=p((Fo,Ge)=>{var oo=Ke(),no=new oo;Ge.exports=no});var Je=p((Wo,Ve)=>{var oe=class{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[o]=this.patches.splice(this.patches.indexOf(n=>n==e),1);o()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let o=0;o<e.length;o++)e[o]()}};Ve.exports=new oe});var Ye=p((Ho,Ze)=>{var{logger:T}=S(),ro=D(),so=B();Ze.exports=t=>{let e=null,o=null,n=null,l=ro.make({}),i=!1;t.set("UpdateDevelopmentExtension",async({source:c,manifest:r})=>{if(!i){if(i=!0,e){T.log(`Unloading development extension.. (${r.about.name})`);try{e?.unload?.(),e=null,o=null,n=null,T.log(`Development extension unloaded! (${r.about.name})`)}catch(s){T.error(`Unable to unload development extension! (${r.about.name})`,s)}}await new Promise(s=>setTimeout(s,1));try{e=so.evaluate(c,{persist:l,id:"https://FakeExtensionId",manifest:r}),Array.isArray(e?.settings?.data)&&e.settings.data.forEach(s=>{s.property&&typeof l.ghost.settings?.[s.property]>"u"&&(l.store.settings[s.property]=s.value)}),o=c,n=r,e?.load?.(),T.log(`Development extension is loaded! (${r.about.name})`)}catch(s){T.error(`Failed to load development extension! (${r.about.name})`,s)}finally{}i=!1}});function a(){if(e){T.log("Unloading development extension..");try{e?.unload?.(),e=null,o=null,n=null,T.log("Development extension unloaded!")}catch(c){T.error("Unable to unload development extension!",c)}return!0}return!1}return{get extension(){return{loaded:o?{source:o,manifest:n}:null,enabled:e}},unload:a}}});var io=L(),ao=F(),lo=Be(),co=$e(),uo=Le(),R=S(),fo=We(),$=B(),ne=x(),et=He(),po=ze(),Qe=Je(),ho=Ye(),{injectCSS:go}=x(),yo=(t,e)=>{let o=io(e),n=lo(e),l=ho(n),i=ao(e),a=co(e),c=uo(e);return class extends t{async onStart(){await e.PluginUpdater.checkForUpdate("Acord",et.info.version,"https://raw.githubusercontent.com/AcordPlugin/acord-releases/main/acord.plugin.js"),go('[class*="acord--"] * {box-sizing: border-box;}'),Qe.add(R.interval(()=>{document.querySelectorAll("[acord-tooltip-content]").forEach(r=>{if(r.acordTooltip)return;let s=r.setAttribute,u=r.removeAttribute;r.setAttribute=function(g,E){if(r.acordTooltip)switch(g){case"acord-tooltip-content":{r.acordTooltip.label=E,r.acordTooltip.disabled=!E?.trim?.();break}case"acord-tooltip-style":{r.acordTooltip.style=E??"primary";break}case"acord-tooltip-side":{r.acordTooltip.side=E??"top";break}}return s.bind(this,g,E)},r.removeAttribute=function(g){if(r.acordTooltip)switch(g){case"acord-tooltip-content":{r.acordTooltip.disabled=!0,r.acordTooltip.label="";break}case"acord-tooltip-style":{r.acordTooltip.style="primary";break}case"acord-tooltip-side":{r.acordTooltip.side="top";break}}return u.call(this,g)};let f=r.getAttribute("acord-tooltip-content"),d=r.getAttribute("acord-tooltip-style")||"primary",h=r.getAttribute("acord-tooltip-side")||"top";if(r.acordTooltip){r.acordTooltip.disabled=!!f?.trim(),r.acordTooltip.label=f,r.acordTooltip.style=d,r.acordTooltip.side=h;return}r.acordTooltip=new e.Tooltip(r,f,{style:d,side:h}),r.acordTooltip.tooltipElement.style.zIndex=9999999})},100)),window.acord={internal:fo,modules:o,utils:R,patcher:ne,extensions:(()=>{let r={...$};return delete r.init,r})(),events:po,ui:{modals:a,toasts:{show:Object.assign((...r)=>e.Toasts.show(...r),{success:(...r)=>e.Toasts.success(...r),error:(...r)=>e.Toasts.error(...r),info:(...r)=>e.Toasts.info(...r),warning:(...r)=>e.Toasts.warning(...r)})},tooltips:{create:Object.assign((r,s,u={})=>new e.Tooltip(r,s,{style:"primary",...u}),{success:(r,s,u={})=>new e.Tooltip(r,s,{style:"green",...u}),error:(r,s,u={})=>new e.Tooltip(r,s,{style:"red",...u}),warning:(r,s,u={})=>new e.Tooltip(r,s,{style:"yellow",...u})})}},dom:i,i18n:(()=>{let r={...c};return delete r.init,r})(),websocket:{set:n.set,trigger:n.trigger},dev:l,unload(){ne.unpatchAll(),ne.unpatchAllCSS(),$.stopAll(),n.unpatchSocket(),Qe.removeAll(),l.unload()},_:e},globalThis.acord=window.acord,await c.init(),await $.init(),await $.startAll(),R.logger.log(c.messages.ACORD_LOADED),e.Toasts.success(c.messages.ACORD_LOADED)}observer(r){window.acord&&window.acord.events.emit("domMutation",r)}onStop(){try{window.acord.events.emit("unload"),window.acord.unload()}catch{}delete window.acord,delete globalThis.acord,R.logger.log(c.messages.ACORD_UNLOADED),e.Toasts.success(c.messages.ACORD_UNLOADED)}}};if(global.ZLibrary){let t=global.ZLibrary.buildPlugin(et);module.exports=yo(...t)}else{let t=!1;setTimeout(async()=>{let e=require("request"),{shell:o}=require("electron"),n=require("fs"),l=require("path");BdApi.showToast("Downloading Acord dependencies.."),e.get("https://betterdiscord.app/gh-redirect?id=9",async(i,a,c)=>{if(i)return o.openExternal("https://betterdiscord.app/Download?id=9");a.statusCode===302?e.get(a.headers.location,async(r,s,u)=>{if(r)return o.openExternal("https://betterdiscord.app/Download?id=9");n.writeFile(l.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),u,()=>{})}):n.writeFile(l.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),c,()=>{})}),(async()=>{for(;!(global.ZLibrary||t);)await new Promise(i=>setTimeout(i,500));global.ZLibrary&&(BdApi.showToast("Reloading the Acord.."),BdApi.Plugins.reload("Acord"),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3))})()},1),module.exports=class{constructor(o){}async start(){}stop(){t=!0}}}
