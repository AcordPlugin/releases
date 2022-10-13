/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely.
 * @version 0.1.397
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://armagan.rest/
 */
var p=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var $=p((vo,se)=>{se.exports=o=>{let e=a=>typeof a=="object"||typeof a=="function";function t(a){return c=>a.every(r=>Object.keys(c).some(s=>s.toLowerCase().includes(r.toLowerCase())))}function n(a){return c=>e(c)&&Object.values(c).some(r=>e(r)&&a.some(s=>r?.[s]!==void 0))}function l(a){return c=>c.prototype&&a.every(r=>c.prototype[r]!==void 0)}function i(a){return c=>a.every(r=>c?.toString?.()?.includes?.(r))}return{findByProps:(...a)=>o.WebpackModules.findByUniqueProperties(a,!0),findByProperties:(...a)=>o.WebpackModules.findByUniqueProperties(a,!0),findByPropsAll:(...a)=>o.WebpackModules.findByUniqueProperties(a,!1),findByPropertiesAll:(...a)=>o.WebpackModules.findByUniqueProperties(a,!1),findByKeywordAll:(...a)=>o.WebpackModules.findAll(t(a)),findByKeyword:(...a)=>o.WebpackModules.findAll(t(a))[0],findByNestedProps:(...a)=>o.WebpackModules.findAll(n(a))[0],findByNestedPropsAll:(...a)=>o.WebpackModules.findAll(n(a)),findByPrototypes:(...a)=>o.WebpackModules.findAll(l(a))[0],findByPrototypesAll:(...a)=>o.WebpackModules.findAll(l(a)),findByStrings:(...a)=>o.WebpackModules.findAll(i(a))[0],findByStringsAll:(...a)=>o.WebpackModules.findAll(i(a)),findAll:(a,c=!1)=>o.WebpackModules.findAll(a,{searchExports:c}),find:(a,c=!1)=>o.WebpackModules.find(a,{searchExports:c})}}});var U=p((To,ie)=>{var ot=$();ie.exports=o=>{let e=ot(o);return{webpack:e,common:{constants:{Permissions:o.DiscordModules.DiscordPermissions},channels:e.findByProps("getVoiceChannelId","getChannelId"),guilds:e.findByProps("getLastSelectedGuildId","getGuildId"),Flux:e.findByProps("connectStores","destroy"),FluxDispatcher:e.findByProps("_currentDispatchActionType","dispatch"),i18n:e.findByProps("_requestedLocale","getDefaultLocale"),React:o.DiscordModules.React,ReactDOM:o.DiscordModules.ReactDOM,UserStore:e.findByProps("getUser","getCurrentUser"),ChannelStore:e.findByProps("getDMFromUserId","getDMUserIds","getChannel"),GuildStore:e.findByProps("getGuild","getGuildCount"),InviteStore:e.findByProps("acceptInvite","acceptInviteAndTransitionToInviteChannel"),VoiceStateStore:e.findByProps("getVoiceState","getUserVoiceChannelId"),PermissionStore:e.findByProps("getChannelPermissions"),ActivityStore:e.findByProps("getAllApplicationActivities","getActivities"),DiscordAPI:e.findByProps("get","post"),uuid:e.findByProps("v1","v4"),Markdown:e.find(t=>t?.prototype?.render&&t.rules),SimpleMarkdown:o.DiscordModules.SimpleMarkdown,Button:o.DiscordModules.ButtonData,Router:o.DiscordModules.NavigationUtils,modals:{actions:{show:(...t)=>o.DiscordModules.ModalActions.openModal(...t),close:(...t)=>o.DiscordModules.ModalActions.closeModal(...t)},ModalRoot:e.find(t=>t?.toString?.()?.includes?.("ENTERING"),!0),ModalComponents:e.findByProps("Header","Footer")}}}}});var L=p((Oo,ae)=>{ae.exports=o=>({createElement:(e,t,...n)=>{if(typeof e=="function")return e({...t,children:[].concat(...n)});let l=document.createElement(e);for(let i of Object.keys(t))i.indexOf("on")===0?l.addEventListener(i.slice(2).toLowerCase(),t[i]):i==="children"?l.append(...Array.isArray(t[i])?t[i]:[].concat(t[i])):l.setAttribute(i==="className"?"class":i,t[i]);return n.length&&l.append(...n),l},parseHTML:e=>o.DOMTools.parseHTML(e,!0).firstElementChild,parents:o.DOMTools.parents,escapeHTML:o.DOMTools.escapeHTML,toCSSProp(e){let t=document.createElement("div");return Object.entries(e).forEach(n=>{t.style.hasOwnProperty(n[0])?t.style[n[0]]=n[1]:t.style.setProperty(n[0],n[1])}),t.getAttribute("style")},toHTMLProps(e){return Object.entries(e).map(t=>`${t[0].replace(/ +/,"-")}="${t[0]=="style"&&typeof t[1]!="string"?this.toCSSProp(t[1]):this.escapeHTML(t[1])}"`).join(" ")}})});var W=p(F=>{"use strict";Object.defineProperty(F,"__esModule",{value:!0});F.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var ce=p(k=>{"use strict";var nt=k&&k.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(k,"__esModule",{value:!0});var le=nt(W()),H=class{constructor(){this.listeners=Object.values(le.default).reduce((e,t)=>(e[t]=new Set,e),{}),this.on=function(e,t){if(this.listeners[e].has(t))throw Error(`This listener on ${e} already exists.`);this.listeners[e].add(t)},this.once=function(e,t){let n=(l,i)=>{this.off(l,n),t(l,i)};this.on(e,n)},this.off=function(e,t){this.listeners[e].delete(t)},this.emit=function(e,t){for(let n of this.listeners[e])n(e,t)};for(let e of Object.values(le.default))this[e.toLowerCase()]=t=>{this.emit(e,t)}}};k.default=H});var ue=p(M=>{"use strict";var rt=M&&M.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(M,"__esModule",{value:!0});var st=rt(ce());function it(o={},{nestArrays:e=!0}={}){let t=new st.default;function n(l,i,a){return new Proxy(l,{get(c,r){let s=[...a,r],u=c[r];return u!=null?(t.get({path:s,value:u}),!e&&Array.isArray(u)?u:typeof u=="object"?n(u,i,s):u):n(c[r]={},i,s)},set(c,r,s){return c[r]=s,t.set({path:[...a,r],value:s}),!0},deleteProperty(c,r){return delete c[r]?(t.delete({path:[...a,r]}),!0):!1},has(c,r){return typeof c[r]=="object"&&Object.keys(c[r]).length===0?!1:r in c}})}return Object.assign({store:n(o,o,[]),ghost:o},t)}M.default=it});var D=p(v=>{"use strict";var de=v&&v.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(v,"__esModule",{value:!0});v.make=v.Events=void 0;var at=W();Object.defineProperty(v,"Events",{enumerable:!0,get:function(){return de(at).default}});var lt=ue();Object.defineProperty(v,"make",{enumerable:!0,get:function(){return de(lt).default}})});var G=p(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0});function w(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function fe(o,e){let t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);let n=w(t);return(l,i)=>n.then(a=>i(a.transaction(e,l).objectStore(e)))}var X;function E(){return X||(X=fe("keyval-store","keyval")),X}function ct(o,e=E()){return e("readonly",t=>w(t.get(o)))}function ut(o,e,t=E()){return t("readwrite",n=>(n.put(e,o),w(n.transaction)))}function dt(o,e=E()){return e("readwrite",t=>(o.forEach(n=>t.put(n[1],n[0])),w(t.transaction)))}function ft(o,e=E()){return e("readonly",t=>Promise.all(o.map(n=>w(t.get(n)))))}function pt(o,e,t=E()){return t("readwrite",n=>new Promise((l,i)=>{n.get(o).onsuccess=function(){try{n.put(e(this.result),o),l(w(n.transaction))}catch(a){i(a)}}}))}function ht(o,e=E()){return e("readwrite",t=>(t.delete(o),w(t.transaction)))}function gt(o,e=E()){return e("readwrite",t=>(o.forEach(n=>t.delete(n)),w(t.transaction)))}function yt(o=E()){return o("readwrite",e=>(e.clear(),w(e.transaction)))}function K(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},w(o.transaction)}function wt(o=E()){return o("readonly",e=>{if(e.getAllKeys)return w(e.getAllKeys());let t=[];return K(e,n=>t.push(n.key)).then(()=>t)})}function mt(o=E()){return o("readonly",e=>{if(e.getAll)return w(e.getAll());let t=[];return K(e,n=>t.push(n.value)).then(()=>t)})}function bt(o=E()){return o("readonly",e=>{if(e.getAll&&e.getAllKeys)return Promise.all([w(e.getAllKeys()),w(e.getAll())]).then(([n,l])=>n.map((i,a)=>[i,l[a]]));let t=[];return o("readonly",n=>K(n,l=>t.push([l.key,l.value])).then(()=>t))})}m.clear=yt;m.createStore=fe;m.del=ht;m.delMany=gt;m.entries=bt;m.get=ct;m.getMany=ft;m.keys=wt;m.promisifyRequest=w;m.set=ut;m.setMany=dt;m.update=pt;m.values=mt});var z=p((xo,he)=>{var j=D(),pe=G();async function Et(o){let e=await pe.get(`AcordStore;${o}`),t=j.make(e??{}),n=()=>pe.set(`AcordStore;${o}`,{...t.ghost});return t.on(j.Events.SET,n),t.on(j.Events.UPDATE,n),t.on(j.Events.DELETE,n),t}he.exports=Et});var ye=p((jo,ge)=>{ge.exports=function(e,t,{walkable:n=null,ignore:l=[],limit:i=100}={}){let a=0;function c(r,s,{walkable:u=null,ignore:f=[]}={}){if(a+=1,!(a>i)){if(typeof s=="string"){if(r.hasOwnProperty(s))return r[s]}else if(s(r))return r;if(!!r){if(Array.isArray(r))for(let d of r){let h=c(d,s,{walkable:u,ignore:f});if(h)return h}else if(typeof r=="object"){for(let d of Object.keys(r))if(!(u!=null&&!u.includes(d))&&!f.includes(d))try{let h=c(r[d],s,{walkable:u,ignore:f});if(h)return h}catch{}}}}}return c(e,t,{walkable:n,ignore:l})}});var me=p((Co,we)=>{var At=["Clickable","Tooltip"];we.exports=function(o,{parent:e=!1,displayName:t=!0,blockList:n=At}={}){let l=r=>!r?.type?.displayName||n.includes(r?.type?.displayName),i=r=>typeof r?.type!="string"&&(t?!l(r):!0),a=r=>i(r)?r?.type:a(r.return),c=a(acord.utils.getReactInstance(o));return e?find(r=>r?.default===c):c}});var Ee=p((qo,be)=>{be.exports=function(e){if(window.DiscordNative){DiscordNative.clipboard.copy(e);return}navigator.clipboard.writeText(e).catch(()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(n){console.error(n)}document.body.removeChild(t)})}});var O=p((No,_e)=>{var Ae=ye(),_t=me(),vt=Ee(),V=(o,e)=>(...t)=>console[o]("%cAcord%c",`background-color: ${e}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...t);_e.exports={sleep:o=>new Promise(e=>setTimeout(e,o)),logger:{log:V("log","#00fbb0"),warn:V("warn","#debf18"),error:V("error","red")},react:{getInstance:o=>o.__reactFiber$,getOwnerInstance:o=>{for(let e=o.__reactFiber$;e;e=e.return)if(e.stateNode?.forceUpdate)return e.stateNode},findInTree:(o,e)=>Ae(o,e,{walkable:["props","children","child","sibling"]}),findByDomNode:_t,getComponents(o){let e=o.__reactFiber$,t=[],n=e;for(;n&&n.return&&typeof n.return.type!="string";)n.return.type&&t.push(n.return.type),n=n.return;return t},getStateNodes(o){let e=o.__reactFiber$,t=[],n=e;for(;n&&n.return&&!(n.return.stateNode instanceof HTMLElement);)n.return.stateNode&&t.push(n.return.stateNode),n=n.return;return t},getProps:(o,e=n=>n,t=1e4)=>{let n=o.__reactFiber$;for(let l=n.return,i=0;i>t||l!==null;l=l?.return,i++)if(l?.pendingProps&&e(l.pendingProps))return l.pendingProps;return null}},findInTree:Ae,copyText:vt,interval(o,e){let t=setInterval(o,e);return()=>{clearInterval(t)}},timeout(o,e){let t=setTimeout(o,e);return()=>{clearInterval(t)}},ifExists(o,e){o&&e(o)},format(o,...e){return`${o}`.replaceAll(/{(\d+)}/g,(t,n)=>e[Number(n)])}}});var Te=p((Io,ve)=>{var Tt=O();ve.exports=async o=>{let e={},t=[],n=null;typeof o=="string"?(n=o,n.endsWith("/")&&(n=n.slice(0,-1)),t=await(await fetch(`${n}/locales.json`,noStore)).json(),e.default=await(await fetch(`${n}/default.json`,noStore)).json()):(e=o,t=Object.keys(o),t.includes("default")&&t.splice(t.indexOf("default"),1));async function l(){if(!n)return;let c=acord.i18n.locale;e[c]||!t.includes(c)||(e[c]=await(await fetch(`${n}/${c}.json`,noStore)).json())}let i=new Proxy({},{get(c,r){return l(),e[acord.i18n.locale]?.[r]||e.default?.[r]||acord.i18n.messages[r]||r}});function a(c,...r){return Tt.format(i[c],...r)}return{messages:i,format:a}}});var B=p((Bo,De)=>{var Oe=z(),Ot=D(),{logger:C}=O(),Pt=Te(),J={cache:"no-store"},S=Ot.make({}),g=null,St=window.eval;async function Pe(o){return Object.assign({extension:Object.assign(o,{i18n:await Pt(o.manifest.i18n||{})})},window.acord)}async function Se(o,e){let t=await Pe(e),n=`(acord)=>{return ${o}}${atob("Ci8v")}#sourceURL=${e.url}`,l=St(n)(t),i=typeof l=="function"?l(e):l;return i.api=t,i}async function kt(){g=await Oe("LoadedExtensionsStore")}async function q(o){let e=g.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(S.ghost[o])throw new Error(`EXTENSION_ALREADY_ENABLED ${o}`);if(e.manifest.eula&&!e.eula&&!await acord.ui.modals.show.confirmation(acord.i18n.format("ACCEPT_EXTENSION_EULA"),typeof e.manifest.eula=="string"?e.manifest.eula:acord.i18n.format("ACCEPT_EXTENSION_EULA_DESCRIPTION")))return;let t,n=!1,l=await Oe(o);try{t=await Se(e.source,{persist:l,url:o,manifest:e.manifest}),Array.isArray(t?.settings?.data)&&t.settings.data.forEach(i=>{i.property&&typeof l.ghost.settings?.[i.property]>"u"&&(l.store.settings[i.property]=i.value)})}catch(i){C.error("EXTENSION_EVAL_ERR",e.manifest.about.name,`${i} ${i.stack.join(`
`)}`),n=!0}try{t.load?.(),acord.ui.toasts.show(acord.i18n.format(`IMPORTING_${e.manifest.type.toUpperCase()}`,e.manifest.about.name))}catch(i){C.error("EXTENSION_LOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.format("EXTENSION_LOAD_ERROR",e.manifest.about.name))}S.store[o]=t,n&&setTimeout(()=>{try{e.unload()}catch(i){C.error("EXTENSION_UNLOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",e.manifest.about.name))}e.enabled=!1})}function I(o){let e=S.ghost[o],t=g.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(!S.ghost[o])throw new Error(`EXTENSION_NOT_LOADED ${o}`);try{e.unload(),acord.ui.toasts.show(acord.i18n.format(`STOPPING_${t.manifest.type.toUpperCase()}`,t.manifest.about.name))}catch(n){C.error("EXTENSION_UNLOAD_ERR",t.manifest.about.name,n),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",t.manifest.about.name))}delete S.store[o]}async function Mt(o){let e=g.store[o];if(!g.ghost?.[o])throw new Error(`EXTENSION_NOT_FOUND ${o}`);e.enabled?(await I(o),e.enabled=!1):(await q(o),e.enabled=!0)}async function N(o,e=!0){let t=o.replace(/\/?$/,"/"),n=new URL("extension.json",t).href,l=new URL("extension.js",t).href,i=g.ghost?.[t],a=i?g.store[t]:void 0,c=i?.enabled??e,r=/^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(plugins|themes)/.test(t),s;try{let d=await fetch(n,J);if(s=await d.json(),d.status!==200&&!i)throw delete g.store[t],"NO_MAN_200"}catch(d){throw new Error(`NO_PARSE ${d}`)}if(s.locked&&!r)throw"INVALID_LOCKED";if(!["plugin","theme"].includes(s?.type))throw"INVALID_TYPE";if(i){if(s){if(a.manifest.hash!==s.hash){let d=await fetch(l,J);if(d.status!==200)throw delete g.store[t],new Error("NO_200");a.source=await d.text()}_.isEqual(a.manifest,s)||(a.manifest=s)}c&&await q(t);return}let u=await fetch(l,J);if(u.status!==200)throw new Error("NO_200");let f=await u.text();g.store[t]={manifest:s,verified:r,source:f,enabled:c},c&&await q(t)}function ke(o){let e=g.ghost?.[o];if(!!e){try{I(o)}catch{}e.locked||delete g.store[o]}}var Dt=["https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/"];async function xt(){await Promise.allSettled(Object.keys(g.ghost).map(N)),Dt.forEach(o=>{g.ghost?.[o]||N(o)})}function jt(){Object.keys(g.ghost).forEach(o=>{try{I(o)}catch{}})}async function Me(o,e=!0){try{ke(o)}catch{}try{await N(o,e)}catch{}}async function Ct(){let o=Object.entries(g.store);for(let e=0;e<o.length;e++)await Me(o[e][0],o[e][1].enabled)}De.exports={evaluate:Se,load:N,init:kt,startAll:xt,reloadAll:Ct,reload:Me,buildAPI:Pe,nests:{get enabled(){return S},get loaded(){return g}},remove:ke,start:q,stop:I,toggle:Mt,stopAll:jt}});var Ne=p((Ro,qe)=>{var Z=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,Nt=Object.getOwnPropertyNames,It=Object.prototype.hasOwnProperty,Bt=(o,e)=>{for(var t in e)Z(o,t,{get:e[t],enumerable:!0})},Rt=(o,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of Nt(e))!It.call(o,l)&&l!==t&&Z(o,l,{get:()=>e[l],enumerable:!(n=qt(e,l))||n.enumerable});return o},$t=o=>Rt(Z({},"__esModule",{value:!0}),o),xe={};Bt(xe,{after:()=>Ht,before:()=>Ft,instead:()=>Wt,unpatchAll:()=>Lt});qe.exports=$t(xe);var je=["a","b","i"],P=new Map;function Ut(o,e,t,n,l){let i=P.get(e)?.[o];if(!i)return l?Reflect.construct(e[o],t,n):e[o].apply(n,t);for(let r of i.b.values()){let s=r.call(n,t);Array.isArray(s)&&(t=s)}let a=(...r)=>l?Reflect.construct(i.o,r,n):i.o.apply(n,r);for(let r of i.i.values()){let s=a;a=(...u)=>r.call(n,u,s)}let c=a(...t);for(let r of i.a.values())c=r.call(n,t,c)??c;return c}function Ce(o,e,t,n){let l=P.get(o),i=l?.[e];return i?.[n].has(t)?(i[n].delete(t),je.every(a=>i[a].size===0)&&(Reflect.defineProperty(o,e,{value:i.o,writable:!0,configurable:!0})||(o[e]=i.o),delete l[e]),Object.keys(l).length==0&&P.delete(o),!0):!1}function Lt(){for(let[o,e]of P.entries())for(let t in e)for(let n of je)for(let l of e[t]?.[n].keys()??[])Ce(o,t,l,n)}var Y=o=>(e,t,n,l=!1)=>{if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);P.has(t)||P.set(t,{});let i=P.get(t);if(!i[e]){let r=t[e];i[e]={o:r,b:new Map,i:new Map,a:new Map};let s=(d,h,b)=>{let A=Ut(e,t,h,d,b);return l&&c(),A},u=new Proxy(r,{apply:(d,h,b)=>s(h,b,!1),construct:(d,h)=>s(r,h,!0),get:(d,h,b)=>h=="toString"?r.toString.bind(r):Reflect.get(d,h,b)});Reflect.defineProperty(t,e,{value:u,configurable:!0,writable:!0})||(t[e]=u)}let a=Symbol(),c=()=>Ce(t,e,a,o);return i[e][o].set(a,n),c},Ft=Y("b"),Wt=Y("i"),Ht=Y("a")});var x=p(($o,Ie)=>{var Xt=Ne();Ie.exports={...Xt,injectCSS(o){let e=document.createElement("style");return e.className="AcordInjectedCSS",e.textContent=o,document.head.appendChild(e),()=>{e?.remove()}},unpatchAllCSS(){document.querySelectorAll(".AcordInjectedCSS").forEach(o=>{o.remove()})}}});var Re=p((Uo,Be)=>{var Kt=B(),Gt=x();Be.exports=o=>{let e=o.WebpackModules.find(s=>s?.__proto__?.handleConnection),t=new Set,n=new Map;async function l(s,u){let f;try{if(f=JSON.parse(u),!Array.isArray(f)||f.length<1||f.length>3)throw"Array expected as message.";if(typeof f[0]!="string")throw"Array[0] needs to be string.";if(typeof f[1]!="string")throw"Array[1] needs to be string."}catch(y){s.send(JSON.stringify([null,{ok:!1,error:`${y}`}]))}let[d,h,b]=f,A=n.get(h);if(!A)return s.send(JSON.stringify([d,{ok:!1,error:"Unable to find handler."}]));try{let y=await A(b);s.send(JSON.stringify([d,{ok:!0,data:y}]))}catch(y){s.send(JSON.stringify([d,{ok:!1,error:`${y}`}]))}}function i(s,u){if(typeof s!="string")throw new Error("EventName needs to be a string.");if(typeof u!="function")throw new Error("Callback needs to be a function.");if(n.has(s))throw new Error("EventName already in use.");return n.set(s,u),()=>{n.delete(s)}}let a=Gt.instead("handleConnection",e,(s,u)=>{let f=s[0];if(f.upgradeReq().url!=="/acord")return u(...s);t.add(f),f.on("message",d=>{l(f,d)}),f.on("close",()=>t.delete(f))});function c(){a(),n.clear(),t.forEach(s=>s.close())}function r(s,...u){if(!n.has(s))throw new Error("Unable to find handler!");return n.get(s)(...u)}return i("InstallExtension",async({url:s}={})=>{if(!(!s||!await acord.ui.modals.show.confirmation(acord.i18n.format("IMPORT_EXTENSION"),acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION",s))))try{await Kt.load(s)}catch(f){acord.ui.toasts.show.error(`${f}`)}}),{unpatchSocket:c,connectedSockets:t,socketEvents:n,set:i,trigger:r}}});var Ue=p((Lo,$e)=>{var zt=L(),Vt=$(),{injectCSS:Jt}=x();$e.exports=o=>{let e=zt(o),t=Vt(o),n=t.findByProps("root","small"),l=t.findByProps("notDevTools","app");Jt(".acord--layer-container{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1001;pointer-events:none;transition:100ms ease all}.acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none}.acord--layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all}.acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all}");function i(a,{size:c="large",classes:r=""}={}){let s=document.querySelector(`.${l.notDevTools}`),u=s.querySelector(".acord--layer-container");if(u||(u=e.parseHTML('<div class="acord--layer-container"></div>'),s.appendChild(u)),!u.querySelector(".acord--backdrop")){let y=e.parseHTML('<div class="acord--backdrop"></div>');u.prepend(y)}let f=e.parseHTML('<div class="acord--layer"></div>'),d=e.parseHTML(`<div class="${n.root} ${n[c]} ${e.escapeHTML(r)} acord--modal-root"></div>`),h=!1,b=[];async function A(){h||(h=!0,f?.remove(),document.querySelector(".acord--modal-root")||document.querySelector(".acord--backdrop")?.remove?.(),b.forEach(y=>y()))}return f.addEventListener("click",y=>{!y.target.classList.contains("acord--layer")||A()}),d.replaceChildren(typeof a=="function"?a({close:A,onClose(y){b.push(y)},root:d}):a),f.replaceChildren(d),u.appendChild(f),{close:A,onClose(y){b.push(y)},root:d}}return{show:Object.assign(i,{confirmation:(a,c,r={})=>new Promise(s=>{o.Modals.showConfirmationModal(a,c,{onConfirm:()=>s(!0),onCancel:()=>s(!1),confirmText:r?.okay,cancelText:r?.cancel,danger:r?.danger})}),alert:(a,c)=>o.Modals.showAlertModal(a,c)})}}});var Fe=p((Fo,Le)=>{var Zt=U(),Yt=O(),Q="https://raw.githubusercontent.com/AcordPlugin/i18n/main",ee={cache:"no-store"};Le.exports=o=>{let e=Zt(o),t=[],n={};async function l(){t=await(await fetch(`${Q}/locales.json`,ee)).json(),n.default=await(await fetch(`${Q}/default.json`,ee)).json()}async function i(){let r=e.common.i18n._requestedLocale;n[r]||!t.includes(r)||(n[r]=await(await fetch(`${Q}/${r}.json`,ee)).json())}let a=new Proxy({},{get(r,s){i();let u=e.common.i18n._requestedLocale;return n[u]?.[s]||n.default?.[s]||e.common.i18n.Messages[s]||s}});function c(r,...s){return Yt.format(a[r],...s)}return{init:l,format:c,messages:a,get locale(){return e.common.i18n._requestedLocale}}}});var He=p((Wo,We)=>{var Qt=D(),eo=G(),to=z();We.exports={nests:Qt,idbKeyval:eo,createPersistentNest:to}});var Xe=p((Ho,oo)=>{oo.exports={info:{name:"Acord",authors:[{name:"K\u0131ra\xE7 Arma\u011Fan \xD6nal",discord_id:"707309693449535599",github_username:"TheArmagan"}],version:"0.1.397",description:"Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely."},main:"index.js"}});var Ge=p((Ko,Ke)=>{Ke.exports=class{constructor(){this.listeners=new Map}_prepareListenersMap(e){this.listeners.has(e)||this.listeners.set(e,new Map)}on(e,t){return this._prepareListenersMap(e),this.listeners.get(e).set(t,{once:!1}),()=>{this.listeners.get(e).delete(t)}}once(e,t){return this._prepareListenersMap(e),this.listeners.get(e)?.set(t,{once:!0}),()=>{this.listeners.get(e).delete(t)}}off(e,t){if(!e)return this.listeners=new Map;if(!t)return this.listeners?.delete(e);this.listeners.get(e)?.delete(t)}emit(e,...t){if(!this.listeners.has(e))return;let n=this.listeners.get(e);n.forEach(({once:l},i)=>{l&&n?.delete(i),i(...t)})}}});var Ve=p((Go,ze)=>{var no=Ge(),ro=new no;ze.exports=ro});var oe=p((zo,Je)=>{var te=class{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(n=>n==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}};Je.exports=new te});var Ye=p((Vo,Ze)=>{var{logger:T}=O(),so=D(),io=B();Ze.exports=o=>{let e=null,t=null,n=null,l=so.make({}),i=!1;o.set("UpdateDevelopmentExtension",async({source:c,manifest:r})=>{if(!i){if(i=!0,e){T.log(`Unloading development extension.. (${r.about.name})`);try{e?.unload?.(),e=null,t=null,n=null,T.log(`Development extension unloaded! (${r.about.name})`)}catch(s){T.error(`Unable to unload development extension! (${r.about.name})`,s)}}await new Promise(s=>setTimeout(s,1));try{e=await io.evaluate(c,{persist:l,id:"https://FakeExtensionId",manifest:r}),Array.isArray(e?.settings?.data)&&e.settings.data.forEach(s=>{s.property&&typeof l.ghost.settings?.[s.property]>"u"&&(l.store.settings[s.property]=s.value)}),t=c,n=r,e?.load?.(),T.log(`Development extension is loaded! (${r.about.name})`)}catch(s){T.error(`Failed to load development extension! (${r.about.name})`,s)}finally{}i=!1}});function a(){if(e){T.log("Unloading development extension..");try{e?.unload?.(),e=null,t=null,n=null,T.log("Development extension unloaded!")}catch(c){T.error("Unable to unload development extension!",c)}return!0}return!1}return{get extension(){return{loaded:t?{source:t,manifest:n}:null,enabled:e}},unload:a}}});var et=p((Jo,Qe)=>{var ao=oe(),lo=O();Qe.exports=function(e){ao.add(lo.interval(()=>{document.querySelectorAll("[acord--tooltip-content]").forEach(t=>{if(t.acordTooltip)return;let n=t.setAttribute,l=t.removeAttribute;t.setAttribute=function(r,s){if(t.acordTooltip)switch(r){case"acord--tooltip-content":{t.acordTooltip.label=s,t.acordTooltip.disabled=!s?.trim?.();break}case"acord--tooltip-style":{t.acordTooltip.style=s??"primary";break}case"acord--tooltip-side":{t.acordTooltip.side=s??"top";break}}return n.bind(this,r,s)},t.removeAttribute=function(r){if(t.acordTooltip)switch(r){case"acord--tooltip-content":{t.acordTooltip.disabled=!0,t.acordTooltip.label="";break}case"acord--tooltip-style":{t.acordTooltip.style="primary";break}case"acord--tooltip-side":{t.acordTooltip.side="top";break}}return l.call(this,r)};let i=t.getAttribute("acord--tooltip-content"),a=t.getAttribute("acord--tooltip-style")||"primary",c=t.getAttribute("acord--tooltip-side")||"top";if(t.acordTooltip){t.acordTooltip.disabled=!!i?.trim(),t.acordTooltip.label=i,t.acordTooltip.style=a,t.acordTooltip.side=c;return}t.acordTooltip=new e.Tooltip(t,i,{style:a,side:c}),t.acordTooltip.tooltipElement.style.zIndex=9999999})},100))}});var co=U(),uo=L(),fo=Re(),po=Ue(),ho=Fe(),ne=O(),go=He(),R=B(),re=x(),tt=Xe(),yo=Ve(),wo=oe(),mo=Ye(),{injectCSS:bo}=x(),Eo=et(),Ao=(o,e)=>{let t=co(e),n=fo(e),l=mo(n),i=uo(e),a=po(e),c=ho(e);return class extends o{async onStart(){await e.PluginUpdater.checkForUpdate("Acord",tt.info.version,"https://raw.githubusercontent.com/AcordPlugin/releases/main/acord.plugin.js"),bo('[class*="acord--"] * {box-sizing: border-box;}'),window.acord={internal:go,modules:t,utils:ne,patcher:re,extensions:(()=>{let r={...R};return delete r.init,r})(),events:yo,ui:{modals:a,toasts:{show:Object.assign((...r)=>e.Toasts.show(...r),{success:(...r)=>e.Toasts.success(...r),error:(...r)=>e.Toasts.error(...r),info:(...r)=>e.Toasts.info(...r),warning:(...r)=>e.Toasts.warning(...r)})},tooltips:{create:Object.assign((r,s,u={})=>new e.Tooltip(r,s,{style:"primary",...u}),{success:(r,s,u={})=>new e.Tooltip(r,s,{style:"green",...u}),error:(r,s,u={})=>new e.Tooltip(r,s,{style:"red",...u}),warning:(r,s,u={})=>new e.Tooltip(r,s,{style:"yellow",...u})})}},dom:i,i18n:{format:c.format,messages:c.messages,get locale(){return c.locale}},websocket:{set:n.set,trigger:n.trigger},dev:l,unload(){re.unpatchAll(),re.unpatchAllCSS(),R.stopAll(),n.unpatchSocket(),wo.removeAll(),l.unload()},_:e},globalThis.acord=window.acord,Eo(e),await c.init(),await R.init(),await R.startAll(),ne.logger.log(c.messages.ACORD_LOADED),e.Toasts.success(c.messages.ACORD_LOADED)}observer(r){window.acord&&window.acord.events.emit("domMutation",r)}onStop(){e.Toasts.success(c.messages.ACORD_UNLOADED),ne.logger.log(c.messages.ACORD_UNLOADED);try{window.acord.events.emit("unload"),window.acord.unload()}catch{}delete window.acord,delete globalThis.acord}}};if(global.ZLibrary){let o=global.ZLibrary.buildPlugin(tt);module.exports=Ao(...o),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3)}else{let o=!1;setTimeout(async()=>{let e=require("request"),{shell:t}=require("electron"),n=require("fs"),l=require("path");BdApi.showToast("Downloading Acord dependencies.."),e.get("https://betterdiscord.app/gh-redirect?id=9",async(i,a,c)=>{if(i)return t.openExternal("https://betterdiscord.app/Download?id=9");a.statusCode===302?e.get(a.headers.location,async(r,s,u)=>{if(r)return t.openExternal("https://betterdiscord.app/Download?id=9");n.writeFile(l.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),u,()=>{})}):n.writeFile(l.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),c,()=>{})}),(async()=>{for(;!(global.ZLibrary||o);)await new Promise(i=>setTimeout(i,500));global.ZLibrary&&(BdApi.showToast("Reloading the Acord.."),BdApi.Plugins.reload("Acord"),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3))})()},1),module.exports=class{constructor(t){}async start(){}stop(){o=!0}}}
