/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely.
 * @version 0.1.456
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://armagan.rest/
 */
var p=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var R=p((To,se)=>{se.exports=o=>{let e=i=>typeof i=="object"||typeof i=="function";function t(i){return c=>i.every(s=>Object.keys(c).some(n=>n.toLowerCase().includes(s.toLowerCase())))}function r(i){return c=>e(c)&&Object.values(c).some(s=>e(s)&&i.some(n=>s?.[n]!==void 0))}function l(i){return c=>c.prototype&&i.every(s=>c.prototype[s]!==void 0)}function a(i){return c=>i.every(s=>c?.toString?.()?.includes?.(s))}return{findByProps:(...i)=>o.WebpackModules.findByUniqueProperties(i,!0),findByProperties:(...i)=>o.WebpackModules.findByUniqueProperties(i,!0),findByPropsAll:(...i)=>o.WebpackModules.findByUniqueProperties(i,!1),findByPropertiesAll:(...i)=>o.WebpackModules.findByUniqueProperties(i,!1),findByKeywordAll:(...i)=>o.WebpackModules.findAll(t(i)),findByKeyword:(...i)=>o.WebpackModules.findAll(t(i))[0],findByNestedProps:(...i)=>o.WebpackModules.findAll(r(i))[0],findByNestedPropsAll:(...i)=>o.WebpackModules.findAll(r(i)),findByPrototypes:(...i)=>o.WebpackModules.findAll(l(i))[0],findByPrototypesAll:(...i)=>o.WebpackModules.findAll(l(i)),findByStrings:(...i)=>o.WebpackModules.findAll(a(i))[0],findByStringsAll:(...i)=>o.WebpackModules.findAll(a(i)),findAll:(i,c=!1)=>o.WebpackModules.findAll(i,{searchExports:c}),find:(i,c=!1)=>o.WebpackModules.find(i,{searchExports:c})}}});var $=p((vo,ie)=>{var rt=R();ie.exports=o=>{let e=rt(o);return{webpack:e,require:window.require,common:{constants:{Permissions:o.DiscordModules.DiscordPermissions},i18n:e.findByProps("_requestedLocale","getDefaultLocale"),uuid:e.findByProps("v1","v4"),modals:{actions:{show:(...t)=>o.DiscordModules.ModalActions.openModal(...t),close:(...t)=>o.DiscordModules.ModalActions.closeModal(...t)},ModalRoot:e.find(t=>t?.toString?.()?.includes?.("ENTERING"),!0),ModalComponents:e.findByProps("Header","Footer")},ActivityStore:e.findByProps("getAllApplicationActivities","getActivities"),Button:o.DiscordModules.ButtonData,ChannelStore:e.findByProps("getDMFromUserId","getDMUserIds","getChannel"),DiscordAPI:e.findByProps("get","post"),Flux:e.findByProps("connectStores","destroy"),FluxDispatcher:e.findByProps("_currentDispatchActionType","dispatch"),GuildMemberStore:e.findByProps("getMembers","getMember"),GuildStore:e.findByProps("getGuild","getGuildCount"),InviteStore:e.findByProps("acceptInvite","acceptInviteAndTransitionToInviteChannel"),Markdown:e.find(t=>t?.prototype?.render&&t.rules),MessageStore:e.findByProps("getMessages","getMessage"),NoteStore:e.findByProps("getNote","getName"),PermissionStore:e.findByProps("getChannelPermissions"),React:o.DiscordModules.React,ReactDOM:o.DiscordModules.ReactDOM,RelationshipStore:e.findByProps("getRelationships","getFriendIDs"),Router:o.DiscordModules.NavigationUtils,SelectedChannelStore:e.findByProps("getVoiceChannelId","getChannelId"),SelectedGuildStore:e.findByProps("getLastSelectedGuildId","getGuildId"),SimpleMarkdown:o.DiscordModules.SimpleMarkdown,UserStore:e.findByProps("getUser","getCurrentUser"),VoiceStateStore:e.findByProps("getVoiceState","getUserVoiceChannelId"),TypingStore:e.findByProps("isTyping","getTypingUsers"),MediaEngineStore:e.findByProperties("getAecDump","getOutputVolume")}}}});var L=p((So,ae)=>{ae.exports=o=>({createElement:(e,t,...r)=>{if(typeof e=="function")return e({...t,children:[].concat(...r)});let l=document.createElement(e);for(let a of Object.keys(t))a.indexOf("on")===0?l.addEventListener(a.slice(2).toLowerCase(),t[a]):a==="children"?l.append(...Array.isArray(t[a])?t[a]:[].concat(t[a])):l.setAttribute(a==="className"?"class":a,t[a]);return r.length&&l.append(...r),l},parseHTML:e=>o.DOMTools.parseHTML(e,!0).firstElementChild,parents:o.DOMTools.parents,escapeHTML:o.DOMTools.escapeHTML,toCSSProp(e){let t=document.createElement("div");return Object.entries(e).forEach(r=>{t.style.hasOwnProperty(r[0])?t.style[r[0]]=r[1]:t.style.setProperty(r[0],r[1])}),t.getAttribute("style")},toHTMLProps(e){return Object.entries(e).map(t=>`${t[0].replace(/ +/,"-")}="${t[0]=="style"&&typeof t[1]!="string"?this.toCSSProp(t[1]):this.escapeHTML(t[1])}"`).join(" ")}})});var X=p(F=>{"use strict";Object.defineProperty(F,"__esModule",{value:!0});F.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var le=p(M=>{"use strict";var nt=M&&M.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(M,"__esModule",{value:!0});var ce=nt(X()),W=class{constructor(){this.listeners=Object.values(ce.default).reduce((e,t)=>(e[t]=new Set,e),{}),this.on=function(e,t){if(this.listeners[e].has(t))throw Error(`This listener on ${e} already exists.`);this.listeners[e].add(t)},this.once=function(e,t){let r=(l,a)=>{this.off(l,r),t(l,a)};this.on(e,r)},this.off=function(e,t){this.listeners[e].delete(t)},this.emit=function(e,t){for(let r of this.listeners[e])r(e,t)};for(let e of Object.values(ce.default))this[e.toLowerCase()]=t=>{this.emit(e,t)}}};M.default=W});var de=p(k=>{"use strict";var st=k&&k.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(k,"__esModule",{value:!0});var it=st(le());function at(o={},{nestArrays:e=!0}={}){let t=new it.default;function r(l,a,i){return new Proxy(l,{get(c,s){let n=[...i,s],d=c[s];return d!=null?(t.get({path:n,value:d}),!e&&Array.isArray(d)?d:typeof d=="object"?r(d,a,n):d):r(c[s]={},a,n)},set(c,s,n){return c[s]=n,t.set({path:[...i,s],value:n}),!0},deleteProperty(c,s){return delete c[s]?(t.delete({path:[...i,s]}),!0):!1},has(c,s){return typeof c[s]=="object"&&Object.keys(c[s]).length===0?!1:s in c}})}return Object.assign({store:r(o,o,[]),ghost:o},t)}k.default=at});var D=p(T=>{"use strict";var ue=T&&T.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(T,"__esModule",{value:!0});T.make=T.Events=void 0;var ct=X();Object.defineProperty(T,"Events",{enumerable:!0,get:function(){return ue(ct).default}});var lt=de();Object.defineProperty(T,"make",{enumerable:!0,get:function(){return ue(lt).default}})});var K=p(m=>{"use strict";Object.defineProperty(m,"__esModule",{value:!0});function b(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function fe(o,e){let t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);let r=b(t);return(l,a)=>r.then(i=>a(i.transaction(e,l).objectStore(e)))}var H;function E(){return H||(H=fe("keyval-store","keyval")),H}function dt(o,e=E()){return e("readonly",t=>b(t.get(o)))}function ut(o,e,t=E()){return t("readwrite",r=>(r.put(e,o),b(r.transaction)))}function ft(o,e=E()){return e("readwrite",t=>(o.forEach(r=>t.put(r[1],r[0])),b(t.transaction)))}function pt(o,e=E()){return e("readonly",t=>Promise.all(o.map(r=>b(t.get(r)))))}function ht(o,e,t=E()){return t("readwrite",r=>new Promise((l,a)=>{r.get(o).onsuccess=function(){try{r.put(e(this.result),o),l(b(r.transaction))}catch(i){a(i)}}}))}function yt(o,e=E()){return e("readwrite",t=>(t.delete(o),b(t.transaction)))}function gt(o,e=E()){return e("readwrite",t=>(o.forEach(r=>t.delete(r)),b(t.transaction)))}function wt(o=E()){return o("readwrite",e=>(e.clear(),b(e.transaction)))}function G(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},b(o.transaction)}function bt(o=E()){return o("readonly",e=>{if(e.getAllKeys)return b(e.getAllKeys());let t=[];return G(e,r=>t.push(r.key)).then(()=>t)})}function mt(o=E()){return o("readonly",e=>{if(e.getAll)return b(e.getAll());let t=[];return G(e,r=>t.push(r.value)).then(()=>t)})}function At(o=E()){return o("readonly",e=>{if(e.getAll&&e.getAllKeys)return Promise.all([b(e.getAllKeys()),b(e.getAll())]).then(([r,l])=>r.map((a,i)=>[a,l[i]]));let t=[];return o("readonly",r=>G(r,l=>t.push([l.key,l.value])).then(()=>t))})}m.clear=wt;m.createStore=fe;m.del=yt;m.delMany=gt;m.entries=At;m.get=dt;m.getMany=pt;m.keys=bt;m.promisifyRequest=b;m.set=ut;m.setMany=ft;m.update=ht;m.values=mt});var V=p((xo,he)=>{var C=D(),pe=K();async function Et(o){let e=await pe.get(`AcordStore;${o}`),t=C.make(e??{}),r=()=>pe.set(`AcordStore;${o}`,{...t.ghost});return t.on(C.Events.SET,r),t.on(C.Events.UPDATE,r),t.on(C.Events.DELETE,r),t}he.exports=Et});var ge=p((Co,ye)=>{ye.exports=function(e,t,{walkable:r=null,ignore:l=[],limit:a=100}={}){let i=0;function c(s,n,{walkable:d=null,ignore:u=[]}={}){if(i+=1,!(i>a)){if(typeof n=="string"){if(s.hasOwnProperty(n))return s[n]}else if(n(s))return s;if(!!s){if(Array.isArray(s))for(let f of s){let h=c(f,n,{walkable:d,ignore:u});if(h)return h}else if(typeof s=="object"){for(let f of Object.keys(s))if(!(d!=null&&!d.includes(f))&&!u.includes(f))try{let h=c(s[f],n,{walkable:d,ignore:u});if(h)return h}catch{}}}}}return c(e,t,{walkable:r,ignore:l})}});var be=p((No,we)=>{var _t=["Clickable","Tooltip"];we.exports=function(o,{parent:e=!1,displayName:t=!0,blockList:r=_t}={}){let l=s=>!s?.type?.displayName||r.includes(s?.type?.displayName),a=s=>typeof s?.type!="string"&&(t?!l(s):!0),i=s=>a(s)?s?.type:i(s.return),c=i(acord.utils.getReactInstance(o));return e?find(s=>s?.default===c):c}});var Ae=p((jo,me)=>{me.exports=function(e){if(window.DiscordNative){DiscordNative.clipboard.copy(e);return}navigator.clipboard.writeText(e).catch(()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(r){console.error(r)}document.body.removeChild(t)})}});var S=p((Bo,_e)=>{var Ee=ge(),Tt=be(),vt=Ae(),z=(o,e)=>(...t)=>console[o]("%cAcord%c",`background-color: ${e}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...t);_e.exports={sleep:o=>new Promise(e=>setTimeout(e,o)),logger:{log:z("log","#00fbb0"),warn:z("warn","#debf18"),error:z("error","red")},react:{getInstance:o=>o.__reactFiber$,getOwnerInstance:o=>{for(let e=o.__reactFiber$;e;e=e.return)if(e.stateNode?.forceUpdate)return e.stateNode},findInTree:(o,e)=>Ee(o,e,{walkable:["props","children","child","sibling"]}),findByDomNode:Tt,getComponents(o){let e=o.__reactFiber$,t=[],r=e;for(;r&&r.return&&typeof r.return.type!="string";)r.return.type&&t.push(r.return.type),r=r.return;return t},getStateNodes(o){let e=o.__reactFiber$,t=[],r=e;for(;r&&r.return&&!(r.return.stateNode instanceof HTMLElement);)r.return.stateNode&&t.push(r.return.stateNode),r=r.return;return t},getProps:(o,e=r=>r,t=1e4)=>{let r=o.__reactFiber$;for(let l=r.return,a=0;a>t||l!==null;l=l?.return,a++)if(l?.pendingProps&&e(l.pendingProps))return l.pendingProps;return null}},findInTree:Ee,copyText:vt,interval(o,e){let t=setInterval(o,e);return()=>{clearInterval(t)}},timeout(o,e){let t=setTimeout(o,e);return()=>{clearInterval(t)}},ifExists(o,e){o&&e(o)},format(o,...e){return`${o}`.replaceAll(/{(\d+)}/g,(t,r)=>e[Number(r)])}}});var ve=p((qo,Te)=>{var St=S();Te.exports=async o=>{let e={},t=[],r=null;if(typeof o=="string"){r=o,r.endsWith("/")&&(r=r.slice(0,-1));try{t=await(await fetch(`${r}/locales.json`,noStore)).json(),e.default=await(await fetch(`${r}/default.json`,noStore)).json()}catch(c){console.error(c)}for(let c=0;c<t.length;c++){let s=t[c];try{e[s]=await(await fetch(`${r}/${s}.json`,noStore)).json()}catch(n){console.error(n)}}}else e=o,t=Object.keys(o),t.includes("default")&&t.splice(t.indexOf("default"),1);async function l(){if(!r)return;let c=acord.i18n.locale;if(!(e[c]||!t.includes(c)))try{e[c]=await(await fetch(`${r}/${c}.json`,noStore)).json()}catch(s){console.error(s)}}let a=new Proxy({},{get(c,s){return window.acord?(l(),e[acord.i18n.locale]?.[s]||e.default?.[s]||acord.i18n.messages[s]||s):s}});function i(c,...s){return St.format(a[c],...s)}return{messages:a,format:i}}});var I=p((Io,De)=>{var Se=V(),Ot=D(),{logger:N}=S(),Pt=ve(),J={cache:"no-store"},O=Ot.make({}),g=null,Mt=window.eval;async function Oe(o){return Object.assign({extension:Object.assign(o,{i18n:await Pt(o.manifest.i18n||{})})},window.acord)}async function Pe(o,e){let t=await Oe(e),r=`(acord)=>{return ${o}}${atob("Ci8v")}#sourceURL=${e.url}`,l=Mt(r)(t),a=typeof l=="function"?l(e):l;return a.api=t,a}async function kt(){g=await Se("LoadedExtensionsStore")}async function j(o){let e=g.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(O.ghost[o])throw new Error(`EXTENSION_ALREADY_ENABLED ${o}`);if(e.manifest.eula&&!e.eulaAccepted){if(!await acord.ui.modals.show.confirmation(acord.i18n.format("ACCEPT_EXTENSION_EULA"),typeof e.manifest.eula=="string"?e.manifest.eula:acord.i18n.format("ACCEPT_EXTENSION_EULA_DESCRIPTION")))return;O.store[o].eulaAccepted=!0}let t,r=!1,l=await Se(o);try{t=await Pe(e.source,{persist:l,url:o,manifest:e.manifest}),Array.isArray(t?.settings?.data)&&t.settings.data.forEach(a=>{a.property&&typeof l.ghost.settings?.[a.property]>"u"&&(l.store.settings[a.property]=a.value)})}catch(a){N.error("EXTENSION_EVAL_ERR",e.manifest.about.name,`${a} ${a?.stack?.join?.(`
`)}`),r=!0}try{t.load?.(),e.manifest.locked||acord.ui.toasts.show(acord.i18n.format(`IMPORTING_${e.manifest.type.toUpperCase()}`,e.manifest.about.name))}catch(a){N.error("EXTENSION_LOAD_ERR",e.manifest.about.name,a),acord.ui.toasts.show(acord.i18n.format("EXTENSION_LOAD_ERROR",e.manifest.about.name))}O.store[o]=t,r&&setTimeout(()=>{try{e.unload()}catch(a){N.error("EXTENSION_UNLOAD_ERR",e.manifest.about.name,a),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",e.manifest.about.name))}e.enabled=!1})}function q(o){let e=O.ghost[o],t=g.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(!O.ghost[o])throw new Error(`EXTENSION_NOT_LOADED ${o}`);try{e.unload(),acord.ui.toasts.show(acord.i18n.format(`STOPPING_${t.manifest.type.toUpperCase()}`,t.manifest.about.name))}catch(r){N.error("EXTENSION_UNLOAD_ERR",t.manifest.about.name,r),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",t.manifest.about.name))}delete O.store[o]}async function Dt(o){let e=g.store[o];if(!g.ghost?.[o])throw new Error(`EXTENSION_NOT_FOUND ${o}`);e.enabled?(await q(o),e.enabled=!1):(await j(o),e.enabled=!0)}async function B(o,e=!0){let t=o.replace(/\/?$/,"/"),r=new URL("extension.json",t).href,l=new URL("extension.js",t).href,a=g.ghost?.[t],i=a?g.store[t]:void 0,c=a?.enabled??e,s=/^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin/.test(t),n;try{let f=await fetch(r,J);if(n=await f.json(),f.status!==200&&!a)throw a&&delete g.store[t],"NO_MAN_200"}catch(f){throw new Error(`NO_PARSE ${f}`)}if(n.locked&&!s)throw new Error("INVALID_LOCKED");if(!["plugin","theme"].includes(n?.type))throw new Error("INVALID_TYPE");if(a){if(n){if(i.manifest.hash!==n.hash){let f=await fetch(l,J);if(f.status!==200)throw delete g.store[t],new Error("NO_200");i.source=await f.text()}_.isEqual(i.manifest,n)||(i.manifest=n)}c&&await j(t);return}let d=await fetch(l,J);if(d.status!==200)throw new Error("NO_200");let u=await d.text();g.store[t]={manifest:n,verified:s,source:u,enabled:c,url:t},c&&await j(t)}function Me(o){let e=g.ghost?.[o];if(!!e){try{q(o)}catch{}e.manifest.locked||delete g.store[o]}}var xt=["https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/","https://raw.githubusercontent.com/AcordPlugin/releases/main/fixture/"];async function Ct(){await Promise.allSettled(Object.keys(g.ghost).map(B)),xt.forEach(o=>{g.ghost?.[o]||B(o)})}function Nt(){Object.keys(g.ghost).forEach(o=>{try{q(o)}catch{}})}async function ke(o){let e=!!g.ghost[o]?.enabled;try{Me(o)}catch{}try{await B(o,e)}catch{}}async function jt(){let o=Object.entries(g.store);for(let e=0;e<o.length;e++)await ke(o[e][0],o[e][1].enabled)}De.exports={evaluate:Pe,load:B,init:kt,startAll:Ct,reloadAll:jt,reload:ke,buildAPI:Oe,nests:{get enabled(){return O},get loaded(){return g}},remove:Me,start:j,stop:q,toggle:Dt,stopAll:Nt}});var Be=p((Uo,je)=>{var Z=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,qt=Object.getOwnPropertyNames,It=Object.prototype.hasOwnProperty,Ut=(o,e)=>{for(var t in e)Z(o,t,{get:e[t],enumerable:!0})},Rt=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of qt(e))!It.call(o,l)&&l!==t&&Z(o,l,{get:()=>e[l],enumerable:!(r=Bt(e,l))||r.enumerable});return o},$t=o=>Rt(Z({},"__esModule",{value:!0}),o),xe={};Ut(xe,{after:()=>Ht,before:()=>Xt,instead:()=>Wt,unpatchAll:()=>Ft});je.exports=$t(xe);var Ce=["a","b","i"],P=new Map;function Lt(o,e,t,r,l){let a=P.get(e)?.[o];if(!a)return l?Reflect.construct(e[o],t,r):e[o].apply(r,t);for(let s of a.b.values()){let n=s.call(r,t);Array.isArray(n)&&(t=n)}let i=(...s)=>l?Reflect.construct(a.o,s,r):a.o.apply(r,s);for(let s of a.i.values()){let n=i;i=(...d)=>s.call(r,d,n)}let c=i(...t);for(let s of a.a.values())c=s.call(r,t,c)??c;return c}function Ne(o,e,t,r){let l=P.get(o),a=l?.[e];return a?.[r].has(t)?(a[r].delete(t),Ce.every(i=>a[i].size===0)&&(Reflect.defineProperty(o,e,{value:a.o,writable:!0,configurable:!0})||(o[e]=a.o),delete l[e]),Object.keys(l).length==0&&P.delete(o),!0):!1}function Ft(){for(let[o,e]of P.entries())for(let t in e)for(let r of Ce)for(let l of e[t]?.[r].keys()??[])Ne(o,t,l,r)}var Y=o=>(e,t,r,l=!1)=>{if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);P.has(t)||P.set(t,{});let a=P.get(t);if(!a[e]){let s=t[e];a[e]={o:s,b:new Map,i:new Map,a:new Map};let n=(f,h,y)=>{let A=Lt(e,t,h,f,y);return l&&c(),A},d=new Proxy(s,{apply:(f,h,y)=>n(h,y,!1),construct:(f,h)=>n(s,h,!0),get:(f,h,y)=>h=="toString"?s.toString.bind(s):Reflect.get(f,h,y)});Reflect.defineProperty(t,e,{value:d,configurable:!0,writable:!0})||(t[e]=d)}let i=Symbol(),c=()=>Ne(t,e,i,o);return a[e][o].set(i,r),c},Xt=Y("b"),Wt=Y("i"),Ht=Y("a")});var x=p((Ro,qe)=>{var Gt=Be();qe.exports={...Gt,injectCSS(o){let e=document.createElement("style");return e.className="AcordInjectedCSS",e.textContent=o,document.head.appendChild(e),()=>{e?.remove()}},unpatchAllCSS(){document.querySelectorAll(".AcordInjectedCSS").forEach(o=>{o.remove()})}}});var Ue=p(($o,Ie)=>{var Kt=I(),Vt=x();Ie.exports=o=>{let e=o.WebpackModules.find(n=>n?.__proto__?.handleConnection),t=new Set,r=new Map;async function l(n,d){let u;try{if(u=JSON.parse(d),!Array.isArray(u)||u.length<1||u.length>3)throw"Array expected as message.";if(typeof u[0]!="string")throw"Array[0] needs to be string.";if(typeof u[1]!="string")throw"Array[1] needs to be string."}catch(w){n.send(JSON.stringify([null,{ok:!1,error:`${w}`}]))}let[f,h,y]=u,A=r.get(h);if(!A)return n.send(JSON.stringify([f,{ok:!1,error:"Unable to find handler."}]));try{let w=await A(y);n.send(JSON.stringify([f,{ok:!0,data:w}]))}catch(w){n.send(JSON.stringify([f,{ok:!1,error:`${w}`}]))}}function a(n,d){if(typeof n!="string")throw new Error("EventName needs to be a string.");if(typeof d!="function")throw new Error("Callback needs to be a function.");if(r.has(n))throw new Error("EventName already in use.");return r.set(n,d),()=>{r.delete(n)}}let i=Vt.instead("handleConnection",e,(n,d)=>{let u=n[0];if(u.upgradeReq().url!=="/acord")return d(...n);t.add(u),u.on("message",f=>{l(u,f)}),u.on("close",()=>t.delete(u))});function c(){i(),r.clear(),t.forEach(n=>n.close())}function s(n,...d){if(!r.has(n))throw new Error("Unable to find handler!");return r.get(n)(...d)}return a("InstallExtension",async({url:n}={})=>{if(!(!n||!await acord.ui.modals.show.confirmation(acord.i18n.format("IMPORT_EXTENSION"),acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION",n))))try{await Kt.load(n)}catch(u){acord.ui.toasts.show.error(`${u}`)}}),{unpatchSocket:c,connectedSockets:t,socketEvents:r,set:a,trigger:s}}});var $e=p((Lo,Re)=>{var zt=L(),Jt=R(),{injectCSS:Zt}=x();Re.exports=o=>{let e=zt(o),t=Jt(o),r=t.findByProps("root","small"),l=t.findByProps("notDevTools","app");Zt(".acord--layer-container{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1001;pointer-events:none;transition:100ms ease all}.acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none}.acord--layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all}.acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all}");function a(i,{size:c="large",classes:s=""}={}){let n=document.querySelector(`.${l.notDevTools}`),d=n.querySelector(".acord--layer-container");if(d||(d=e.parseHTML('<div class="acord--layer-container"></div>'),n.appendChild(d)),!d.querySelector(".acord--backdrop")){let w=e.parseHTML('<div class="acord--backdrop"></div>');d.prepend(w)}let u=e.parseHTML('<div class="acord--layer"></div>'),f=e.parseHTML(`<div class="${r.root} ${r[c]} ${e.escapeHTML(s)} acord--modal-root"></div>`),h=!1,y=[];async function A(){h||(h=!0,u?.remove(),document.querySelector(".acord--modal-root")||document.querySelector(".acord--backdrop")?.remove?.(),y.forEach(w=>w()))}return u.addEventListener("click",w=>{!w.target.classList.contains("acord--layer")||A()}),f.replaceChildren(typeof i=="function"?i({close:A,onClose(w){y.push(w)},root:f}):i),u.replaceChildren(f),d.appendChild(u),{close:A,onClose(w){y.push(w)},root:f}}return{show:Object.assign((...i)=>o.Modals.showModal(...i),{confirmation:(i,c,s={})=>new Promise(n=>{o.Modals.showConfirmationModal(i,c,{onConfirm:()=>n(!0),onCancel:()=>n(!1),confirmText:s?.confirm,cancelText:s?.cancel,danger:s?.danger})}),alert:(i,c)=>o.Modals.showAlertModal(i,c),legacy:(...i)=>a(...i)})}}});var Fe=p((Fo,Le)=>{var Yt=$(),Qt=S(),Q="https://raw.githubusercontent.com/AcordPlugin/i18n/main",ee={cache:"no-store"};Le.exports=o=>{let e=Yt(o),t=[],r={};async function l(){t=await(await fetch(`${Q}/locales.json`,ee)).json(),r.default=await(await fetch(`${Q}/default.json`,ee)).json()}async function a(){let s=e.common.i18n._requestedLocale;r[s]||!t.includes(s)||(r[s]=await(await fetch(`${Q}/${s}.json`,ee)).json())}let i=new Proxy({},{get(s,n){a();let d=e.common.i18n._requestedLocale;return r[d]?.[n]||r.default?.[n]||e.common.i18n.Messages[n]||n}});function c(s,...n){return Qt.format(i[s],...n)}return{init:l,format:c,messages:i,get locale(){return e.common.i18n._requestedLocale}}}});var We=p((Xo,Xe)=>{var eo=D(),to=K(),oo=V();Xe.exports={nests:eo,idbKeyval:to,createPersistentNest:oo}});var He=p((Wo,ro)=>{ro.exports={info:{name:"Acord",authors:[{name:"K\u0131ra\xE7 Arma\u011Fan \xD6nal",discord_id:"707309693449535599",github_username:"TheArmagan"}],version:"0.1.456",description:"Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely."},main:"index.js"}});var Ke=p((Go,Ge)=>{Ge.exports=class{constructor(){this.listeners=new Map}_prepareListenersMap(e){this.listeners.has(e)||this.listeners.set(e,new Map)}on(e,t){return this._prepareListenersMap(e),this.listeners.get(e).set(t,{once:!1}),()=>{this.listeners.get(e).delete(t)}}once(e,t){return this._prepareListenersMap(e),this.listeners.get(e)?.set(t,{once:!0}),()=>{this.listeners.get(e).delete(t)}}off(e,t){if(!e)return this.listeners=new Map;if(!t)return this.listeners?.delete(e);this.listeners.get(e)?.delete(t)}emit(e,...t){if(!this.listeners.has(e))return;let r=this.listeners.get(e);r.forEach(({once:l},a)=>{l&&r?.delete(a),a(...t)})}}});var ze=p((Ko,Ve)=>{var no=Ke(),so=new no;Ve.exports=so});var oe=p((Vo,Je)=>{var te=class{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(r=>r==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}};Je.exports=new te});var Ye=p((zo,Ze)=>{var{logger:v}=S(),io=D(),ao=I();Ze.exports=o=>{let e=null,t=null,r=null,l=io.make({}),a=!1;o.set("UpdateDevelopmentExtension",async({source:c,manifest:s})=>{if(!a){if(a=!0,e){v.log(`Unloading development extension.. (${s.about.name})`);try{e?.unload?.(),e=null,t=null,r=null,v.log(`Development extension unloaded! (${s.about.name})`)}catch(n){v.error(`Unable to unload development extension! (${s.about.name})`,n)}}await new Promise(n=>setTimeout(n,1));try{e=await ao.evaluate(c,{persist:l,id:"https://FakeExtensionId",manifest:s}),Array.isArray(e?.settings?.data)&&e.settings.data.forEach(n=>{n.property&&typeof l.ghost.settings?.[n.property]>"u"&&(l.store.settings[n.property]=n.value)}),t=c,r=s,e?.load?.(),v.log(`Development extension is loaded! (${s.about.name})`)}catch(n){v.error(`Failed to load development extension! (${s.about.name})`,n)}finally{}a=!1}});function i(){if(e){v.log("Unloading development extension..");try{e?.unload?.(),e=null,t=null,r=null,v.log("Development extension unloaded!")}catch(c){v.error("Unable to unload development extension!",c)}return!0}return!1}return{get extension(){return{loaded:t?{source:t,manifest:r}:null,enabled:e}},unload:i}}});var et=p((Jo,Qe)=>{var co=oe(),lo=S();Qe.exports=function(e){co.add(lo.interval(()=>{document.querySelectorAll("[acord--tooltip-content]").forEach(t=>{if(!t.acordTooltip)try{let r=t.setAttribute,l=t.removeAttribute;t.setAttribute=function(s,n){if(t.acordTooltip)switch(s){case"acord--tooltip-content":{t.acordTooltip.label=n,t.acordTooltip.disabled=!n?.trim?.();break}case"acord--tooltip-style":{t.acordTooltip.style=n??"primary";break}case"acord--tooltip-side":{t.acordTooltip.side=n??"top";break}}return r.bind(this,s,n)},t.removeAttribute=function(s){if(t.acordTooltip)switch(s){case"acord--tooltip-content":{t.acordTooltip.disabled=!0,t.acordTooltip.label="";break}case"acord--tooltip-style":{t.acordTooltip.style="primary";break}case"acord--tooltip-side":{t.acordTooltip.side="top";break}}return l.call(this,s)};let a=t.getAttribute("acord--tooltip-content"),i=t.getAttribute("acord--tooltip-style")||"primary",c=t.getAttribute("acord--tooltip-side")||"top";if(t.acordTooltip){t.acordTooltip.disabled=!!a?.trim(),t.acordTooltip.label=a,t.acordTooltip.style=i,t.acordTooltip.side=c;return}t.acordTooltip=new e.Tooltip(t,a,{style:i,side:c}),t.acordTooltip.tooltipElement.style.zIndex=9999999}catch{}})},100))}});var uo=$(),fo=L(),po=Ue(),ho=$e(),yo=Fe(),re=S(),go=We(),U=I(),ne=x(),ot=He(),tt=ze(),wo=oe(),bo=Ye(),{injectCSS:mo}=x(),Ao=et(),Eo=(o,e)=>{let t=uo(e),r=po(e),l=bo(r),a=fo(e),i=ho(e),c=yo(e);return class extends o{async onStart(){await e.PluginUpdater.checkForUpdate("Acord",ot.info.version,"https://raw.githubusercontent.com/AcordPlugin/releases/main/acord.plugin.js"),mo('[class*="acord--"] * {box-sizing: border-box;}');let s={internal:go,modules:t,utils:re,patcher:ne,extensions:(()=>{let n={...U};return delete n.init,n})(),events:tt,ui:{modals:i,toasts:{show:Object.assign((...n)=>BdApi.UI.showToast(...n),{success:n=>BdApi.UI.showToast(n,{type:"success"}),error:n=>BdApi.UI.showToast(n,{type:"error"}),info:n=>BdApi.UI.showToast(n,{type:"info"}),warning:n=>BdApi.UI.showToast(n,{type:"warning"})})},notices:{show:Object.assign((...n)=>BdApi.UI.showNotice(...n),{success:(n,d={})=>BdApi.UI.showNotice(n,{type:"success",...d}),error:(n,d={})=>BdApi.UI.showNotice(n,{type:"error",...d}),info:(n,d={})=>BdApi.UI.showNotice(n,{type:"info",...d}),warning:(n,d={})=>BdApi.UI.showNotice(n,{type:"warning",...d})})},tooltips:{create:Object.assign((n,d,u={})=>new e.Tooltip(n,d,{style:"primary",...u}),{success:(n,d,u={})=>new e.Tooltip(n,d,{style:"green",...u}),error:(n,d,u={})=>new e.Tooltip(n,d,{style:"red",...u}),warning:(n,d,u={})=>new e.Tooltip(n,d,{style:"yellow",...u})})},contextMenus:{patch:(n,d)=>BdApi.ContextMenu.patch(n,d),build:{item:n=>BdApi.ContextMenu.buildItem(n),menu:Object.assign(n=>BdApi.ContextMenu.buildMenu(n),{children:n=>BdApi.ContextMenu.buildMenuChildren(n)})},open:(n,d,u)=>BdApi.ContextMenu.open(n,d,u)}},dom:Object.assign(a,{patch:(n,d,u=!1)=>(()=>{function f(h){h.nodeType!==Node.TEXT_NODE&&h.querySelectorAll(n).forEach(async y=>{if(y.acord||(y.acord={unmountCallbacks:[],patchedSelectors:new Set},y.classList.add("acord--patched")),y.acord.patchedSelectors.has(n))return;y.acord.patchedSelectors.add(n);let A=await d(y);typeof A=="function"&&y.acord.unmountCallbacks.push(A)})}return u&&document.querySelectorAll(n).forEach(f),tt.on("domMutation",h=>{h.addedNodes.forEach(f),h.removedNodes.forEach(y=>{y.nodeType!==Node.TEXT_NODE&&y.querySelectorAll(n).forEach(async A=>{!A.acord||A.acord.unmountCallbacks.forEach(w=>w())})})})})()}),i18n:{format:c.format,messages:c.messages,get locale(){return c.locale}},websocket:{set:r.set,trigger:r.trigger},dev:l,unload(){ne.unpatchAll(),ne.unpatchAllCSS(),U.stopAll(),r.unpatchSocket(),wo.removeAll(),socket.disconnect(),l.unload()},_:e,other:{}};window.acord=s,globalThis.acord=s,Ao(e),await c.init(),await U.init(),await U.startAll(),re.logger.log(c.messages.ACORD_LOADED),BdApi.UI.showToast(c.messages.ACORD_LOADED,{type:"success"})}observer(s){window.acord&&window.acord.events.emit("domMutation",s)}onStop(){BdApi.UI.showToast(c.messages.ACORD_UNLOADED,{type:"success"}),re.logger.log(c.messages.ACORD_UNLOADED);try{window.acord.events.emit("unload"),window.acord.unload()}catch{}delete window.acord,delete globalThis.acord}}};if(global.ZLibrary){let o=global.ZLibrary.buildPlugin(ot);module.exports=Eo(...o),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3)}else{let o=!1;setTimeout(async()=>{let e=require("request"),{shell:t}=require("electron"),r=require("fs"),l=require("path");BdApi.showToast("Downloading Acord dependencies.."),e.get("https://betterdiscord.app/gh-redirect?id=9",async(a,i,c)=>{if(a)return t.openExternal("https://betterdiscord.app/Download?id=9");i.statusCode===302?e.get(i.headers.location,async(s,n,d)=>{if(s)return t.openExternal("https://betterdiscord.app/Download?id=9");r.writeFile(l.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),d,()=>{})}):r.writeFile(l.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),c,()=>{})}),(async()=>{for(;!(global.ZLibrary||o);)await new Promise(a=>setTimeout(a,500));global.ZLibrary&&(BdApi.showToast("Reloading the Acord.."),BdApi.Plugins.reload("Acord"),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3))})()},1),module.exports=class{constructor(t){}async start(){}stop(){o=!0}}}
