/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely.
 * @version 0.1.407
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://armagan.rest/
 */
var p=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var R=p((vo,se)=>{se.exports=o=>{let e=a=>typeof a=="object"||typeof a=="function";function t(a){return l=>a.every(r=>Object.keys(l).some(s=>s.toLowerCase().includes(r.toLowerCase())))}function n(a){return l=>e(l)&&Object.values(l).some(r=>e(r)&&a.some(s=>r?.[s]!==void 0))}function c(a){return l=>l.prototype&&a.every(r=>l.prototype[r]!==void 0)}function i(a){return l=>a.every(r=>l?.toString?.()?.includes?.(r))}return{findByProps:(...a)=>o.WebpackModules.findByUniqueProperties(a,!0),findByProperties:(...a)=>o.WebpackModules.findByUniqueProperties(a,!0),findByPropsAll:(...a)=>o.WebpackModules.findByUniqueProperties(a,!1),findByPropertiesAll:(...a)=>o.WebpackModules.findByUniqueProperties(a,!1),findByKeywordAll:(...a)=>o.WebpackModules.findAll(t(a)),findByKeyword:(...a)=>o.WebpackModules.findAll(t(a))[0],findByNestedProps:(...a)=>o.WebpackModules.findAll(n(a))[0],findByNestedPropsAll:(...a)=>o.WebpackModules.findAll(n(a)),findByPrototypes:(...a)=>o.WebpackModules.findAll(c(a))[0],findByPrototypesAll:(...a)=>o.WebpackModules.findAll(c(a)),findByStrings:(...a)=>o.WebpackModules.findAll(i(a))[0],findByStringsAll:(...a)=>o.WebpackModules.findAll(i(a)),findAll:(a,l=!1)=>o.WebpackModules.findAll(a,{searchExports:l}),find:(a,l=!1)=>o.WebpackModules.find(a,{searchExports:l})}}});var U=p((To,ie)=>{var ot=R();ie.exports=o=>{let e=ot(o);return{webpack:e,require:window.require,common:{constants:{Permissions:o.DiscordModules.DiscordPermissions},SelectedChannelStore:e.findByProps("getVoiceChannelId","getChannelId"),SelectedGuildStore:e.findByProps("getLastSelectedGuildId","getGuildId"),Flux:e.findByProps("connectStores","destroy"),FluxDispatcher:e.findByProps("_currentDispatchActionType","dispatch"),i18n:e.findByProps("_requestedLocale","getDefaultLocale"),React:o.DiscordModules.React,ReactDOM:o.DiscordModules.ReactDOM,UserStore:e.findByProps("getUser","getCurrentUser"),ChannelStore:e.findByProps("getDMFromUserId","getDMUserIds","getChannel"),GuildStore:e.findByProps("getGuild","getGuildCount"),InviteStore:e.findByProps("acceptInvite","acceptInviteAndTransitionToInviteChannel"),VoiceStateStore:e.findByProps("getVoiceState","getUserVoiceChannelId"),PermissionStore:e.findByProps("getChannelPermissions"),ActivityStore:e.findByProps("getAllApplicationActivities","getActivities"),DiscordAPI:e.findByProps("get","post"),uuid:e.findByProps("v1","v4"),Markdown:e.find(t=>t?.prototype?.render&&t.rules),SimpleMarkdown:o.DiscordModules.SimpleMarkdown,Button:o.DiscordModules.ButtonData,Router:o.DiscordModules.NavigationUtils,modals:{actions:{show:(...t)=>o.DiscordModules.ModalActions.openModal(...t),close:(...t)=>o.DiscordModules.ModalActions.closeModal(...t)},ModalRoot:e.find(t=>t?.toString?.()?.includes?.("ENTERING"),!0),ModalComponents:e.findByProps("Header","Footer")}}}}});var L=p((Oo,ae)=>{ae.exports=o=>({createElement:(e,t,...n)=>{if(typeof e=="function")return e({...t,children:[].concat(...n)});let c=document.createElement(e);for(let i of Object.keys(t))i.indexOf("on")===0?c.addEventListener(i.slice(2).toLowerCase(),t[i]):i==="children"?c.append(...Array.isArray(t[i])?t[i]:[].concat(t[i])):c.setAttribute(i==="className"?"class":i,t[i]);return n.length&&c.append(...n),c},parseHTML:e=>o.DOMTools.parseHTML(e,!0).firstElementChild,parents:o.DOMTools.parents,escapeHTML:o.DOMTools.escapeHTML,toCSSProp(e){let t=document.createElement("div");return Object.entries(e).forEach(n=>{t.style.hasOwnProperty(n[0])?t.style[n[0]]=n[1]:t.style.setProperty(n[0],n[1])}),t.getAttribute("style")},toHTMLProps(e){return Object.entries(e).map(t=>`${t[0].replace(/ +/,"-")}="${t[0]=="style"&&typeof t[1]!="string"?this.toCSSProp(t[1]):this.escapeHTML(t[1])}"`).join(" ")}})});var W=p(F=>{"use strict";Object.defineProperty(F,"__esModule",{value:!0});F.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var ce=p(M=>{"use strict";var nt=M&&M.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(M,"__esModule",{value:!0});var le=nt(W()),H=class{constructor(){this.listeners=Object.values(le.default).reduce((e,t)=>(e[t]=new Set,e),{}),this.on=function(e,t){if(this.listeners[e].has(t))throw Error(`This listener on ${e} already exists.`);this.listeners[e].add(t)},this.once=function(e,t){let n=(c,i)=>{this.off(c,n),t(c,i)};this.on(e,n)},this.off=function(e,t){this.listeners[e].delete(t)},this.emit=function(e,t){for(let n of this.listeners[e])n(e,t)};for(let e of Object.values(le.default))this[e.toLowerCase()]=t=>{this.emit(e,t)}}};M.default=H});var ue=p(k=>{"use strict";var rt=k&&k.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(k,"__esModule",{value:!0});var st=rt(ce());function it(o={},{nestArrays:e=!0}={}){let t=new st.default;function n(c,i,a){return new Proxy(c,{get(l,r){let s=[...a,r],u=l[r];return u!=null?(t.get({path:s,value:u}),!e&&Array.isArray(u)?u:typeof u=="object"?n(u,i,s):u):n(l[r]={},i,s)},set(l,r,s){return l[r]=s,t.set({path:[...a,r],value:s}),!0},deleteProperty(l,r){return delete l[r]?(t.delete({path:[...a,r]}),!0):!1},has(l,r){return typeof l[r]=="object"&&Object.keys(l[r]).length===0?!1:r in l}})}return Object.assign({store:n(o,o,[]),ghost:o},t)}k.default=it});var x=p(v=>{"use strict";var de=v&&v.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(v,"__esModule",{value:!0});v.make=v.Events=void 0;var at=W();Object.defineProperty(v,"Events",{enumerable:!0,get:function(){return de(at).default}});var lt=ue();Object.defineProperty(v,"make",{enumerable:!0,get:function(){return de(lt).default}})});var K=p(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0});function w(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function fe(o,e){let t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);let n=w(t);return(c,i)=>n.then(a=>i(a.transaction(e,c).objectStore(e)))}var X;function E(){return X||(X=fe("keyval-store","keyval")),X}function ct(o,e=E()){return e("readonly",t=>w(t.get(o)))}function ut(o,e,t=E()){return t("readwrite",n=>(n.put(e,o),w(n.transaction)))}function dt(o,e=E()){return e("readwrite",t=>(o.forEach(n=>t.put(n[1],n[0])),w(t.transaction)))}function ft(o,e=E()){return e("readonly",t=>Promise.all(o.map(n=>w(t.get(n)))))}function pt(o,e,t=E()){return t("readwrite",n=>new Promise((c,i)=>{n.get(o).onsuccess=function(){try{n.put(e(this.result),o),c(w(n.transaction))}catch(a){i(a)}}}))}function ht(o,e=E()){return e("readwrite",t=>(t.delete(o),w(t.transaction)))}function gt(o,e=E()){return e("readwrite",t=>(o.forEach(n=>t.delete(n)),w(t.transaction)))}function yt(o=E()){return o("readwrite",e=>(e.clear(),w(e.transaction)))}function G(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},w(o.transaction)}function wt(o=E()){return o("readonly",e=>{if(e.getAllKeys)return w(e.getAllKeys());let t=[];return G(e,n=>t.push(n.key)).then(()=>t)})}function mt(o=E()){return o("readonly",e=>{if(e.getAll)return w(e.getAll());let t=[];return G(e,n=>t.push(n.value)).then(()=>t)})}function bt(o=E()){return o("readonly",e=>{if(e.getAll&&e.getAllKeys)return Promise.all([w(e.getAllKeys()),w(e.getAll())]).then(([n,c])=>n.map((i,a)=>[i,c[a]]));let t=[];return o("readonly",n=>G(n,c=>t.push([c.key,c.value])).then(()=>t))})}m.clear=yt;m.createStore=fe;m.del=ht;m.delMany=gt;m.entries=bt;m.get=ct;m.getMany=ft;m.keys=wt;m.promisifyRequest=w;m.set=ut;m.setMany=dt;m.update=pt;m.values=mt});var z=p((Do,he)=>{var C=x(),pe=K();async function Et(o){let e=await pe.get(`AcordStore;${o}`),t=C.make(e??{}),n=()=>pe.set(`AcordStore;${o}`,{...t.ghost});return t.on(C.Events.SET,n),t.on(C.Events.UPDATE,n),t.on(C.Events.DELETE,n),t}he.exports=Et});var ye=p((Co,ge)=>{ge.exports=function(e,t,{walkable:n=null,ignore:c=[],limit:i=100}={}){let a=0;function l(r,s,{walkable:u=null,ignore:f=[]}={}){if(a+=1,!(a>i)){if(typeof s=="string"){if(r.hasOwnProperty(s))return r[s]}else if(s(r))return r;if(!!r){if(Array.isArray(r))for(let d of r){let h=l(d,s,{walkable:u,ignore:f});if(h)return h}else if(typeof r=="object"){for(let d of Object.keys(r))if(!(u!=null&&!u.includes(d))&&!f.includes(d))try{let h=l(r[d],s,{walkable:u,ignore:f});if(h)return h}catch{}}}}}return l(e,t,{walkable:n,ignore:c})}});var me=p((jo,we)=>{var At=["Clickable","Tooltip"];we.exports=function(o,{parent:e=!1,displayName:t=!0,blockList:n=At}={}){let c=r=>!r?.type?.displayName||n.includes(r?.type?.displayName),i=r=>typeof r?.type!="string"&&(t?!c(r):!0),a=r=>i(r)?r?.type:a(r.return),l=a(acord.utils.getReactInstance(o));return e?find(r=>r?.default===l):l}});var Ee=p((qo,be)=>{be.exports=function(e){if(window.DiscordNative){DiscordNative.clipboard.copy(e);return}navigator.clipboard.writeText(e).catch(()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(n){console.error(n)}document.body.removeChild(t)})}});var O=p((No,_e)=>{var Ae=ye(),_t=me(),vt=Ee(),V=(o,e)=>(...t)=>console[o]("%cAcord%c",`background-color: ${e}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...t);_e.exports={sleep:o=>new Promise(e=>setTimeout(e,o)),logger:{log:V("log","#00fbb0"),warn:V("warn","#debf18"),error:V("error","red")},react:{getInstance:o=>o.__reactFiber$,getOwnerInstance:o=>{for(let e=o.__reactFiber$;e;e=e.return)if(e.stateNode?.forceUpdate)return e.stateNode},findInTree:(o,e)=>Ae(o,e,{walkable:["props","children","child","sibling"]}),findByDomNode:_t,getComponents(o){let e=o.__reactFiber$,t=[],n=e;for(;n&&n.return&&typeof n.return.type!="string";)n.return.type&&t.push(n.return.type),n=n.return;return t},getStateNodes(o){let e=o.__reactFiber$,t=[],n=e;for(;n&&n.return&&!(n.return.stateNode instanceof HTMLElement);)n.return.stateNode&&t.push(n.return.stateNode),n=n.return;return t},getProps:(o,e=n=>n,t=1e4)=>{let n=o.__reactFiber$;for(let c=n.return,i=0;i>t||c!==null;c=c?.return,i++)if(c?.pendingProps&&e(c.pendingProps))return c.pendingProps;return null}},findInTree:Ae,copyText:vt,interval(o,e){let t=setInterval(o,e);return()=>{clearInterval(t)}},timeout(o,e){let t=setTimeout(o,e);return()=>{clearInterval(t)}},ifExists(o,e){o&&e(o)},format(o,...e){return`${o}`.replaceAll(/{(\d+)}/g,(t,n)=>e[Number(n)])}}});var Te=p((Bo,ve)=>{var Tt=O();ve.exports=async o=>{let e={},t=[],n=null;if(typeof o=="string"){n=o,n.endsWith("/")&&(n=n.slice(0,-1)),t=await(await fetch(`${n}/locales.json`,noStore)).json(),e.default=await(await fetch(`${n}/default.json`,noStore)).json();for(let l=0;l<t.length;l++){let r=t[l];e[r]=await(await fetch(`${n}/${r}.json`,noStore)).json()}}else e=o,t=Object.keys(o),t.includes("default")&&t.splice(t.indexOf("default"),1);async function c(){if(!n)return;let l=acord.i18n.locale;e[l]||!t.includes(l)||(e[l]=await(await fetch(`${n}/${l}.json`,noStore)).json())}let i=new Proxy({},{get(l,r){return c(),e[acord.i18n.locale]?.[r]||e.default?.[r]||acord.i18n.messages[r]||r}});function a(l,...r){return Tt.format(i[l],...r)}return{messages:i,format:a}}});var I=p((Io,xe)=>{var Oe=z(),Ot=x(),{logger:j}=O(),St=Te(),J={cache:"no-store"},P=Ot.make({}),g=null,Pt=window.eval;async function Se(o){return Object.assign({extension:Object.assign(o,{i18n:await St(o.manifest.i18n||{})})},window.acord)}async function Pe(o,e){let t=await Se(e),n=`(acord)=>{return ${o}}${atob("Ci8v")}#sourceURL=${e.url}`,c=Pt(n)(t),i=typeof c=="function"?c(e):c;return i.api=t,i}async function Mt(){g=await Oe("LoadedExtensionsStore")}async function q(o){let e=g.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(P.ghost[o])throw new Error(`EXTENSION_ALREADY_ENABLED ${o}`);if(e.manifest.eula&&!e.eula&&!await acord.ui.modals.show.confirmation(acord.i18n.format("ACCEPT_EXTENSION_EULA"),typeof e.manifest.eula=="string"?e.manifest.eula:acord.i18n.format("ACCEPT_EXTENSION_EULA_DESCRIPTION")))return;let t,n=!1,c=await Oe(o);try{t=await Pe(e.source,{persist:c,url:o,manifest:e.manifest}),Array.isArray(t?.settings?.data)&&t.settings.data.forEach(i=>{i.property&&typeof c.ghost.settings?.[i.property]>"u"&&(c.store.settings[i.property]=i.value)})}catch(i){j.error("EXTENSION_EVAL_ERR",e.manifest.about.name,`${i} ${i.stack.join(`
`)}`),n=!0}try{t.load?.(),acord.ui.toasts.show(acord.i18n.format(`IMPORTING_${e.manifest.type.toUpperCase()}`,e.manifest.about.name))}catch(i){j.error("EXTENSION_LOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.format("EXTENSION_LOAD_ERROR",e.manifest.about.name))}P.store[o]=t,n&&setTimeout(()=>{try{e.unload()}catch(i){j.error("EXTENSION_UNLOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",e.manifest.about.name))}e.enabled=!1})}function B(o){let e=P.ghost[o],t=g.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(!P.ghost[o])throw new Error(`EXTENSION_NOT_LOADED ${o}`);try{e.unload(),acord.ui.toasts.show(acord.i18n.format(`STOPPING_${t.manifest.type.toUpperCase()}`,t.manifest.about.name))}catch(n){j.error("EXTENSION_UNLOAD_ERR",t.manifest.about.name,n),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",t.manifest.about.name))}delete P.store[o]}async function kt(o){let e=g.store[o];if(!g.ghost?.[o])throw new Error(`EXTENSION_NOT_FOUND ${o}`);e.enabled?(await B(o),e.enabled=!1):(await q(o),e.enabled=!0)}async function N(o,e=!0){let t=o.replace(/\/?$/,"/"),n=new URL("extension.json",t).href,c=new URL("extension.js",t).href,i=g.ghost?.[t],a=i?g.store[t]:void 0,l=i?.enabled??e,r=/^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(plugins|themes)/.test(t),s;try{let d=await fetch(n,J);if(s=await d.json(),d.status!==200&&!i)throw delete g.store[t],"NO_MAN_200"}catch(d){throw new Error(`NO_PARSE ${d}`)}if(s.locked&&!r)throw"INVALID_LOCKED";if(!["plugin","theme"].includes(s?.type))throw"INVALID_TYPE";if(i){if(s){if(a.manifest.hash!==s.hash){let d=await fetch(c,J);if(d.status!==200)throw delete g.store[t],new Error("NO_200");a.source=await d.text()}_.isEqual(a.manifest,s)||(a.manifest=s)}l&&await q(t);return}let u=await fetch(c,J);if(u.status!==200)throw new Error("NO_200");let f=await u.text();g.store[t]={manifest:s,verified:r,source:f,enabled:l},l&&await q(t)}function Me(o){let e=g.ghost?.[o];if(!!e){try{B(o)}catch{}e.locked||delete g.store[o]}}var xt=["https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/"];async function Dt(){await Promise.allSettled(Object.keys(g.ghost).map(N)),xt.forEach(o=>{g.ghost?.[o]||N(o)})}function Ct(){Object.keys(g.ghost).forEach(o=>{try{B(o)}catch{}})}async function ke(o,e=!0){try{Me(o)}catch{}try{await N(o,e)}catch{}}async function jt(){let o=Object.entries(g.store);for(let e=0;e<o.length;e++)await ke(o[e][0],o[e][1].enabled)}xe.exports={evaluate:Pe,load:N,init:Mt,startAll:Dt,reloadAll:jt,reload:ke,buildAPI:Se,nests:{get enabled(){return P},get loaded(){return g}},remove:Me,start:q,stop:B,toggle:kt,stopAll:Ct}});var Ne=p(($o,qe)=>{var Z=Object.defineProperty,qt=Object.getOwnPropertyDescriptor,Nt=Object.getOwnPropertyNames,Bt=Object.prototype.hasOwnProperty,It=(o,e)=>{for(var t in e)Z(o,t,{get:e[t],enumerable:!0})},$t=(o,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of Nt(e))!Bt.call(o,c)&&c!==t&&Z(o,c,{get:()=>e[c],enumerable:!(n=qt(e,c))||n.enumerable});return o},Rt=o=>$t(Z({},"__esModule",{value:!0}),o),De={};It(De,{after:()=>Ht,before:()=>Ft,instead:()=>Wt,unpatchAll:()=>Lt});qe.exports=Rt(De);var Ce=["a","b","i"],S=new Map;function Ut(o,e,t,n,c){let i=S.get(e)?.[o];if(!i)return c?Reflect.construct(e[o],t,n):e[o].apply(n,t);for(let r of i.b.values()){let s=r.call(n,t);Array.isArray(s)&&(t=s)}let a=(...r)=>c?Reflect.construct(i.o,r,n):i.o.apply(n,r);for(let r of i.i.values()){let s=a;a=(...u)=>r.call(n,u,s)}let l=a(...t);for(let r of i.a.values())l=r.call(n,t,l)??l;return l}function je(o,e,t,n){let c=S.get(o),i=c?.[e];return i?.[n].has(t)?(i[n].delete(t),Ce.every(a=>i[a].size===0)&&(Reflect.defineProperty(o,e,{value:i.o,writable:!0,configurable:!0})||(o[e]=i.o),delete c[e]),Object.keys(c).length==0&&S.delete(o),!0):!1}function Lt(){for(let[o,e]of S.entries())for(let t in e)for(let n of Ce)for(let c of e[t]?.[n].keys()??[])je(o,t,c,n)}var Y=o=>(e,t,n,c=!1)=>{if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);S.has(t)||S.set(t,{});let i=S.get(t);if(!i[e]){let r=t[e];i[e]={o:r,b:new Map,i:new Map,a:new Map};let s=(d,h,b)=>{let A=Ut(e,t,h,d,b);return c&&l(),A},u=new Proxy(r,{apply:(d,h,b)=>s(h,b,!1),construct:(d,h)=>s(r,h,!0),get:(d,h,b)=>h=="toString"?r.toString.bind(r):Reflect.get(d,h,b)});Reflect.defineProperty(t,e,{value:u,configurable:!0,writable:!0})||(t[e]=u)}let a=Symbol(),l=()=>je(t,e,a,o);return i[e][o].set(a,n),l},Ft=Y("b"),Wt=Y("i"),Ht=Y("a")});var D=p((Ro,Be)=>{var Xt=Ne();Be.exports={...Xt,injectCSS(o){let e=document.createElement("style");return e.className="AcordInjectedCSS",e.textContent=o,document.head.appendChild(e),()=>{e?.remove()}},unpatchAllCSS(){document.querySelectorAll(".AcordInjectedCSS").forEach(o=>{o.remove()})}}});var $e=p((Uo,Ie)=>{var Gt=I(),Kt=D();Ie.exports=o=>{let e=o.WebpackModules.find(s=>s?.__proto__?.handleConnection),t=new Set,n=new Map;async function c(s,u){let f;try{if(f=JSON.parse(u),!Array.isArray(f)||f.length<1||f.length>3)throw"Array expected as message.";if(typeof f[0]!="string")throw"Array[0] needs to be string.";if(typeof f[1]!="string")throw"Array[1] needs to be string."}catch(y){s.send(JSON.stringify([null,{ok:!1,error:`${y}`}]))}let[d,h,b]=f,A=n.get(h);if(!A)return s.send(JSON.stringify([d,{ok:!1,error:"Unable to find handler."}]));try{let y=await A(b);s.send(JSON.stringify([d,{ok:!0,data:y}]))}catch(y){s.send(JSON.stringify([d,{ok:!1,error:`${y}`}]))}}function i(s,u){if(typeof s!="string")throw new Error("EventName needs to be a string.");if(typeof u!="function")throw new Error("Callback needs to be a function.");if(n.has(s))throw new Error("EventName already in use.");return n.set(s,u),()=>{n.delete(s)}}let a=Kt.instead("handleConnection",e,(s,u)=>{let f=s[0];if(f.upgradeReq().url!=="/acord")return u(...s);t.add(f),f.on("message",d=>{c(f,d)}),f.on("close",()=>t.delete(f))});function l(){a(),n.clear(),t.forEach(s=>s.close())}function r(s,...u){if(!n.has(s))throw new Error("Unable to find handler!");return n.get(s)(...u)}return i("InstallExtension",async({url:s}={})=>{if(!(!s||!await acord.ui.modals.show.confirmation(acord.i18n.format("IMPORT_EXTENSION"),acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION",s))))try{await Gt.load(s)}catch(f){acord.ui.toasts.show.error(`${f}`)}}),{unpatchSocket:l,connectedSockets:t,socketEvents:n,set:i,trigger:r}}});var Ue=p((Lo,Re)=>{var zt=L(),Vt=R(),{injectCSS:Jt}=D();Re.exports=o=>{let e=zt(o),t=Vt(o),n=t.findByProps("root","small"),c=t.findByProps("notDevTools","app");Jt(".acord--layer-container{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1001;pointer-events:none;transition:100ms ease all}.acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none}.acord--layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all}.acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all}");function i(a,{size:l="large",classes:r=""}={}){let s=document.querySelector(`.${c.notDevTools}`),u=s.querySelector(".acord--layer-container");if(u||(u=e.parseHTML('<div class="acord--layer-container"></div>'),s.appendChild(u)),!u.querySelector(".acord--backdrop")){let y=e.parseHTML('<div class="acord--backdrop"></div>');u.prepend(y)}let f=e.parseHTML('<div class="acord--layer"></div>'),d=e.parseHTML(`<div class="${n.root} ${n[l]} ${e.escapeHTML(r)} acord--modal-root"></div>`),h=!1,b=[];async function A(){h||(h=!0,f?.remove(),document.querySelector(".acord--modal-root")||document.querySelector(".acord--backdrop")?.remove?.(),b.forEach(y=>y()))}return f.addEventListener("click",y=>{!y.target.classList.contains("acord--layer")||A()}),d.replaceChildren(typeof a=="function"?a({close:A,onClose(y){b.push(y)},root:d}):a),f.replaceChildren(d),u.appendChild(f),{close:A,onClose(y){b.push(y)},root:d}}return{show:Object.assign(i,{confirmation:(a,l,r={})=>new Promise(s=>{o.Modals.showConfirmationModal(a,l,{onConfirm:()=>s(!0),onCancel:()=>s(!1),confirmText:r?.confirm,cancelText:r?.cancel,danger:r?.danger})}),alert:(a,l)=>o.Modals.showAlertModal(a,l)})}}});var Fe=p((Fo,Le)=>{var Zt=U(),Yt=O(),Q="https://raw.githubusercontent.com/AcordPlugin/i18n/main",ee={cache:"no-store"};Le.exports=o=>{let e=Zt(o),t=[],n={};async function c(){t=await(await fetch(`${Q}/locales.json`,ee)).json(),n.default=await(await fetch(`${Q}/default.json`,ee)).json()}async function i(){let r=e.common.i18n._requestedLocale;n[r]||!t.includes(r)||(n[r]=await(await fetch(`${Q}/${r}.json`,ee)).json())}let a=new Proxy({},{get(r,s){i();let u=e.common.i18n._requestedLocale;return n[u]?.[s]||n.default?.[s]||e.common.i18n.Messages[s]||s}});function l(r,...s){return Yt.format(a[r],...s)}return{init:c,format:l,messages:a,get locale(){return e.common.i18n._requestedLocale}}}});var He=p((Wo,We)=>{var Qt=x(),eo=K(),to=z();We.exports={nests:Qt,idbKeyval:eo,createPersistentNest:to}});var Xe=p((Ho,oo)=>{oo.exports={info:{name:"Acord",authors:[{name:"K\u0131ra\xE7 Arma\u011Fan \xD6nal",discord_id:"707309693449535599",github_username:"TheArmagan"}],version:"0.1.407",description:"Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely."},main:"index.js"}});var Ke=p((Go,Ge)=>{Ge.exports=class{constructor(){this.listeners=new Map}_prepareListenersMap(e){this.listeners.has(e)||this.listeners.set(e,new Map)}on(e,t){return this._prepareListenersMap(e),this.listeners.get(e).set(t,{once:!1}),()=>{this.listeners.get(e).delete(t)}}once(e,t){return this._prepareListenersMap(e),this.listeners.get(e)?.set(t,{once:!0}),()=>{this.listeners.get(e).delete(t)}}off(e,t){if(!e)return this.listeners=new Map;if(!t)return this.listeners?.delete(e);this.listeners.get(e)?.delete(t)}emit(e,...t){if(!this.listeners.has(e))return;let n=this.listeners.get(e);n.forEach(({once:c},i)=>{c&&n?.delete(i),i(...t)})}}});var Ve=p((Ko,ze)=>{var no=Ke(),ro=new no;ze.exports=ro});var oe=p((zo,Je)=>{var te=class{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(n=>n==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}};Je.exports=new te});var Ye=p((Vo,Ze)=>{var{logger:T}=O(),so=x(),io=I();Ze.exports=o=>{let e=null,t=null,n=null,c=so.make({}),i=!1;o.set("UpdateDevelopmentExtension",async({source:l,manifest:r})=>{if(!i){if(i=!0,e){T.log(`Unloading development extension.. (${r.about.name})`);try{e?.unload?.(),e=null,t=null,n=null,T.log(`Development extension unloaded! (${r.about.name})`)}catch(s){T.error(`Unable to unload development extension! (${r.about.name})`,s)}}await new Promise(s=>setTimeout(s,1));try{e=await io.evaluate(l,{persist:c,id:"https://FakeExtensionId",manifest:r}),Array.isArray(e?.settings?.data)&&e.settings.data.forEach(s=>{s.property&&typeof c.ghost.settings?.[s.property]>"u"&&(c.store.settings[s.property]=s.value)}),t=l,n=r,e?.load?.(),T.log(`Development extension is loaded! (${r.about.name})`)}catch(s){T.error(`Failed to load development extension! (${r.about.name})`,s)}finally{}i=!1}});function a(){if(e){T.log("Unloading development extension..");try{e?.unload?.(),e=null,t=null,n=null,T.log("Development extension unloaded!")}catch(l){T.error("Unable to unload development extension!",l)}return!0}return!1}return{get extension(){return{loaded:t?{source:t,manifest:n}:null,enabled:e}},unload:a}}});var et=p((Jo,Qe)=>{var ao=oe(),lo=O();Qe.exports=function(e){ao.add(lo.interval(()=>{document.querySelectorAll("[acord--tooltip-content]").forEach(t=>{if(t.acordTooltip)return;let n=t.setAttribute,c=t.removeAttribute;t.setAttribute=function(r,s){if(t.acordTooltip)switch(r){case"acord--tooltip-content":{t.acordTooltip.label=s,t.acordTooltip.disabled=!s?.trim?.();break}case"acord--tooltip-style":{t.acordTooltip.style=s??"primary";break}case"acord--tooltip-side":{t.acordTooltip.side=s??"top";break}}return n.bind(this,r,s)},t.removeAttribute=function(r){if(t.acordTooltip)switch(r){case"acord--tooltip-content":{t.acordTooltip.disabled=!0,t.acordTooltip.label="";break}case"acord--tooltip-style":{t.acordTooltip.style="primary";break}case"acord--tooltip-side":{t.acordTooltip.side="top";break}}return c.call(this,r)};let i=t.getAttribute("acord--tooltip-content"),a=t.getAttribute("acord--tooltip-style")||"primary",l=t.getAttribute("acord--tooltip-side")||"top";if(t.acordTooltip){t.acordTooltip.disabled=!!i?.trim(),t.acordTooltip.label=i,t.acordTooltip.style=a,t.acordTooltip.side=l;return}t.acordTooltip=new e.Tooltip(t,i,{style:a,side:l}),t.acordTooltip.tooltipElement.style.zIndex=9999999})},100))}});var co=U(),uo=L(),fo=$e(),po=Ue(),ho=Fe(),ne=O(),go=He(),$=I(),re=D(),tt=Xe(),yo=Ve(),wo=oe(),mo=Ye(),{injectCSS:bo}=D(),Eo=et(),Ao=(o,e)=>{let t=co(e),n=fo(e),c=mo(n),i=uo(e),a=po(e),l=ho(e);return class extends o{async onStart(){await e.PluginUpdater.checkForUpdate("Acord",tt.info.version,"https://raw.githubusercontent.com/AcordPlugin/releases/main/acord.plugin.js"),bo('[class*="acord--"] * {box-sizing: border-box;}'),window.acord={internal:go,modules:t,utils:ne,patcher:re,extensions:(()=>{let r={...$};return delete r.init,r})(),events:yo,ui:{modals:a,toasts:{show:Object.assign((...r)=>e.Toasts.show(...r),{success:(...r)=>e.Toasts.success(...r),error:(...r)=>e.Toasts.error(...r),info:(...r)=>e.Toasts.info(...r),warning:(...r)=>e.Toasts.warning(...r)})},tooltips:{create:Object.assign((r,s,u={})=>new e.Tooltip(r,s,{style:"primary",...u}),{success:(r,s,u={})=>new e.Tooltip(r,s,{style:"green",...u}),error:(r,s,u={})=>new e.Tooltip(r,s,{style:"red",...u}),warning:(r,s,u={})=>new e.Tooltip(r,s,{style:"yellow",...u})})},contextMenus:{patch:(r,s)=>BdApi.ContextMenu.patch(r,s),build:{item:r=>BdApi.ContextMenu.buildItem(r),menu:Object.assign(r=>BdApi.ContextMenu.buildMenu(r),{children:r=>BdApi.ContextMenu.buildMenuChildren(r)})},open:(r,s,u)=>BdApi.ContextMenu.open(r,s,u)}},dom:i,i18n:{format:l.format,messages:l.messages,get locale(){return l.locale}},websocket:{set:n.set,trigger:n.trigger},dev:c,unload(){re.unpatchAll(),re.unpatchAllCSS(),$.stopAll(),n.unpatchSocket(),wo.removeAll(),c.unload()},_:e},globalThis.acord=window.acord,Eo(e),await l.init(),await $.init(),await $.startAll(),ne.logger.log(l.messages.ACORD_LOADED),e.Toasts.success(l.messages.ACORD_LOADED)}observer(r){window.acord&&window.acord.events.emit("domMutation",r)}onStop(){e.Toasts.success(l.messages.ACORD_UNLOADED),ne.logger.log(l.messages.ACORD_UNLOADED);try{window.acord.events.emit("unload"),window.acord.unload()}catch{}delete window.acord,delete globalThis.acord}}};if(global.ZLibrary){let o=global.ZLibrary.buildPlugin(tt);module.exports=Ao(...o),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3)}else{let o=!1;setTimeout(async()=>{let e=require("request"),{shell:t}=require("electron"),n=require("fs"),c=require("path");BdApi.showToast("Downloading Acord dependencies.."),e.get("https://betterdiscord.app/gh-redirect?id=9",async(i,a,l)=>{if(i)return t.openExternal("https://betterdiscord.app/Download?id=9");a.statusCode===302?e.get(a.headers.location,async(r,s,u)=>{if(r)return t.openExternal("https://betterdiscord.app/Download?id=9");n.writeFile(c.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),u,()=>{})}):n.writeFile(c.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),l,()=>{})}),(async()=>{for(;!(global.ZLibrary||o);)await new Promise(i=>setTimeout(i,500));global.ZLibrary&&(BdApi.showToast("Reloading the Acord.."),BdApi.Plugins.reload("Acord"),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3))})()},1),module.exports=class{constructor(t){}async start(){}stop(){o=!0}}}
