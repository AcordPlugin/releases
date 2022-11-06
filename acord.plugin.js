/**
 * @name Acord
 * @description Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely.
 * @version 0.1.467
 * @author Kıraç Armağan Önal
 * @authorId 707309693449535599
 * @authorLink https://armagan.rest/
 * @website https://armagan.rest/
 */
var h=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var W=h((Bo,ce)=>{ce.exports=o=>{let e=s=>typeof s=="object"||typeof s=="function";function t(s){return l=>s.every(n=>Object.keys(l).some(a=>a.toLowerCase().includes(n.toLowerCase())))}function r(s){return l=>e(l)&&Object.values(l).some(n=>e(n)&&s.some(a=>n?.[a]!==void 0))}function c(s){return l=>l.prototype&&s.every(n=>l.prototype[n]!==void 0)}function i(s){return l=>s.every(n=>l?.toString?.()?.includes?.(n))}return{findByProps:(...s)=>o.WebpackModules.findByUniqueProperties(s,!0),findByProperties:(...s)=>o.WebpackModules.findByUniqueProperties(s,!0),findByPropsAll:(...s)=>o.WebpackModules.findByUniqueProperties(s,!1),findByPropertiesAll:(...s)=>o.WebpackModules.findByUniqueProperties(s,!1),findByKeywordAll:(...s)=>o.WebpackModules.findAll(t(s)),findByKeyword:(...s)=>o.WebpackModules.findAll(t(s))[0],findByNestedProps:(...s)=>o.WebpackModules.findAll(r(s))[0],findByNestedPropsAll:(...s)=>o.WebpackModules.findAll(r(s)),findByPrototypes:(...s)=>o.WebpackModules.findAll(c(s))[0],findByPrototypesAll:(...s)=>o.WebpackModules.findAll(c(s)),findByStrings:(...s)=>o.WebpackModules.findAll(i(s))[0],findByStringsAll:(...s)=>o.WebpackModules.findAll(i(s)),findAll:(s,l=!1)=>o.WebpackModules.findAll(s,{searchExports:l}),find:(s,l=!1)=>o.WebpackModules.find(s,{searchExports:l})}}});var F=h((qo,le)=>{var dt=W();le.exports=o=>{let e=dt(o);return{webpack:e,require:window.require,common:{constants:{Permissions:o.DiscordModules.DiscordPermissions},i18n:e.findByProps("_requestedLocale","getDefaultLocale"),uuid:e.findByProps("v1","v4"),modals:{actions:{show:(...t)=>o.DiscordModules.ModalActions.openModal(...t),close:(...t)=>o.DiscordModules.ModalActions.closeModal(...t)},ModalRoot:e.find(t=>t?.toString?.()?.includes?.("ENTERING"),!0),ModalComponents:e.findByProps("Header","Footer")},ActivityStore:e.findByProps("getAllApplicationActivities","getActivities"),Button:o.DiscordModules.ButtonData,ChannelStore:e.findByProps("getDMFromUserId","getDMUserIds","getChannel"),Rest:e.findByProps("get","post","getAPIBaseURL"),Flux:e.findByProps("connectStores","destroy"),FluxDispatcher:e.findByProps("_currentDispatchActionType","dispatch"),GuildMemberStore:e.findByProps("getMembers","getMember"),GuildStore:e.findByProps("getGuild","getGuildCount"),InviteStore:e.findByProps("acceptInvite","acceptInviteAndTransitionToInviteChannel"),Markdown:e.find(t=>t?.prototype?.render&&t.rules),MessageStore:e.findByProps("getMessages","getMessage"),NoteStore:e.findByProps("getNote","getName"),PermissionStore:e.findByProps("getChannelPermissions"),React:o.DiscordModules.React,ReactDOM:o.DiscordModules.ReactDOM,RelationshipStore:e.findByProps("getRelationships","getFriendIDs"),Router:o.DiscordModules.NavigationUtils,SelectedChannelStore:e.findByProps("getVoiceChannelId","getChannelId"),SelectedGuildStore:e.findByProps("getLastSelectedGuildId","getGuildId"),SimpleMarkdown:o.DiscordModules.SimpleMarkdown,UserStore:e.findByProps("getUser","getCurrentUser"),VoiceStateStore:e.findByProps("getVoiceState","getUserVoiceChannelId"),TypingStore:e.findByProps("isTyping","getTypingUsers"),MediaEngineStore:e.findByProperties("getAecDump","getOutputVolume"),SoundpackStore:e.findByProps("getSoundpack")}}}});var X=h((Io,de)=>{de.exports=o=>({createElement:(e,t,...r)=>{if(typeof e=="function")return e({...t,children:[].concat(...r)});let c=document.createElement(e);for(let i of Object.keys(t))i.indexOf("on")===0?c.addEventListener(i.slice(2).toLowerCase(),t[i]):i==="children"?c.append(...Array.isArray(t[i])?t[i]:[].concat(t[i])):c.setAttribute(i==="className"?"class":i,t[i]);return r.length&&c.append(...r),c},parseHTML:e=>o.DOMTools.parseHTML(e,!0).firstElementChild,parents:o.DOMTools.parents,escapeHTML:o.DOMTools.escapeHTML,toCSSProp(e){let t=document.createElement("div");return Object.entries(e).forEach(r=>{t.style.hasOwnProperty(r[0])?t.style[r[0]]=r[1]:t.style.setProperty(r[0],r[1])}),t.getAttribute("style")},toHTMLProps(e){return Object.entries(e).map(t=>`${t[0].replace(/ +/,"-")}="${t[0]=="style"&&typeof t[1]!="string"?this.toCSSProp(t[1]):this.escapeHTML(t[1])}"`).join(" ")}})});var H=h(G=>{"use strict";Object.defineProperty(G,"__esModule",{value:!0});G.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var fe=h(D=>{"use strict";var ut=D&&D.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(D,"__esModule",{value:!0});var ue=ut(H()),K=class{constructor(){this.listeners=Object.values(ue.default).reduce((e,t)=>(e[t]=new Set,e),{}),this.on=function(e,t){if(this.listeners[e].has(t))throw Error(`This listener on ${e} already exists.`);this.listeners[e].add(t)},this.once=function(e,t){let r=(c,i)=>{this.off(c,r),t(c,i)};this.on(e,r)},this.off=function(e,t){this.listeners[e].delete(t)},this.emit=function(e,t){for(let r of this.listeners[e])r(e,t)};for(let e of Object.values(ue.default))this[e.toLowerCase()]=t=>{this.emit(e,t)}}};D.default=K});var pe=h(x=>{"use strict";var ft=x&&x.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(x,"__esModule",{value:!0});var pt=ft(fe());function ht(o={},{nestArrays:e=!0}={}){let t=new pt.default;function r(c,i,s){return new Proxy(c,{get(l,n){let a=[...s,n],u=l[n];return u!=null?(t.get({path:a,value:u}),!e&&Array.isArray(u)?u:typeof u=="object"?r(u,i,a):u):r(l[n]={},i,a)},set(l,n,a){return l[n]=a,t.set({path:[...s,n],value:a}),!0},deleteProperty(l,n){return delete l[n]?(t.delete({path:[...s,n]}),!0):!1},has(l,n){return typeof l[n]=="object"&&Object.keys(l[n]).length===0?!1:n in l}})}return Object.assign({store:r(o,o,[]),ghost:o},t)}x.default=ht});var j=h(T=>{"use strict";var he=T&&T.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(T,"__esModule",{value:!0});T.make=T.Events=void 0;var gt=H();Object.defineProperty(T,"Events",{enumerable:!0,get:function(){return he(gt).default}});var yt=pe();Object.defineProperty(T,"make",{enumerable:!0,get:function(){return he(yt).default}})});var J=h(b=>{"use strict";Object.defineProperty(b,"__esModule",{value:!0});function w(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function ge(o,e){let t=indexedDB.open(o);t.onupgradeneeded=()=>t.result.createObjectStore(e);let r=w(t);return(c,i)=>r.then(s=>i(s.transaction(e,c).objectStore(e)))}var V;function E(){return V||(V=ge("keyval-store","keyval")),V}function wt(o,e=E()){return e("readonly",t=>w(t.get(o)))}function bt(o,e,t=E()){return t("readwrite",r=>(r.put(e,o),w(r.transaction)))}function mt(o,e=E()){return e("readwrite",t=>(o.forEach(r=>t.put(r[1],r[0])),w(t.transaction)))}function At(o,e=E()){return e("readonly",t=>Promise.all(o.map(r=>w(t.get(r)))))}function Et(o,e,t=E()){return t("readwrite",r=>new Promise((c,i)=>{r.get(o).onsuccess=function(){try{r.put(e(this.result),o),c(w(r.transaction))}catch(s){i(s)}}}))}function St(o,e=E()){return e("readwrite",t=>(t.delete(o),w(t.transaction)))}function _t(o,e=E()){return e("readwrite",t=>(o.forEach(r=>t.delete(r)),w(t.transaction)))}function Tt(o=E()){return o("readwrite",e=>(e.clear(),w(e.transaction)))}function z(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},w(o.transaction)}function vt(o=E()){return o("readonly",e=>{if(e.getAllKeys)return w(e.getAllKeys());let t=[];return z(e,r=>t.push(r.key)).then(()=>t)})}function Ot(o=E()){return o("readonly",e=>{if(e.getAll)return w(e.getAll());let t=[];return z(e,r=>t.push(r.value)).then(()=>t)})}function Pt(o=E()){return o("readonly",e=>{if(e.getAll&&e.getAllKeys)return Promise.all([w(e.getAllKeys()),w(e.getAll())]).then(([r,c])=>r.map((i,s)=>[i,c[s]]));let t=[];return o("readonly",r=>z(r,c=>t.push([c.key,c.value])).then(()=>t))})}b.clear=Tt;b.createStore=ge;b.del=St;b.delMany=_t;b.entries=Pt;b.get=wt;b.getMany=At;b.keys=vt;b.promisifyRequest=w;b.set=bt;b.setMany=mt;b.update=Et;b.values=Ot});var me=h(S=>{S.Map=Map;S.WeakMap=WeakMap;S.WeakSet=WeakSet;S.Set=Set;var ye=o=>typeof o=="object"&&o!=null&&!(o instanceof Boolean)&&!(o instanceof Date)&&!(o instanceof Number)&&!(o instanceof RegExp)&&!(o instanceof String),Mt=o=>"#"+o.map(e=>String(e).replace(/~/g,"~0").replace(/\//g,"~1")).join("/"),we=()=>{let o=new S.WeakMap;return function(t,r){if(t!=="$ref"&&ye(r)){if(o.has(r))return{$ref:Mt(o.get(r))};o.set(r,[...o.get(this)??[],t])}return r}};function be(){let o=new S.WeakMap,e=new S.WeakMap,t=new S.Set;function r(c){let i=c.$ref.slice(1).split("/"),s,l,n=this;for(var a=0;a<i.length;a++)s=i[a].replace(/~1/g,"/").replace(/~0/g,"~"),n=n[s];l=o.get(c),l[e.get(c)]=n}return function(i,s){if(i==="$ref")t.add(this);else if(ye(s)){var l=i===""&&Object.keys(this).length===1;l?t.forEach(r,this):(o.set(s,this),e.set(s,i))}return s}}var kt=o=>Object.defineProperties(o,{decycle:{value:(e,t)=>o.stringify(e,we(),t)},retrocycle:{value:e=>o.parse(e,be())}});Object.assign(S,{decycle:we,retrocycle:be,extend:kt})});var Z=h((Xo,Ae)=>{var N=j(),Y=J(),{decycle:Dt,retrocycle:xt}=me();async function jt(o){let e=await Y.get(`AcordStore;${o}`);typeof e=="string"&&(e=JSON.parse(e,xt()));let t=N.make(e??{}),r=()=>{try{Y.set(`AcordStore;${o}`,JSON.stringify({...t.ghost},Dt()))}catch{Y.set(`AcordStore;${o}`,JSON.stringify({}))}};return t.on(N.Events.SET,r),t.on(N.Events.UPDATE,r),t.on(N.Events.DELETE,r),t}Ae.exports=jt});var Se=h((Go,Ee)=>{Ee.exports=function(e,t,{walkable:r=null,ignore:c=[],limit:i=100}={}){let s=0;function l(n,a,{walkable:u=null,ignore:d=[]}={}){if(s+=1,!(s>i)){if(typeof a=="string"){if(n.hasOwnProperty(a))return n[a]}else if(a(n))return n;if(!!n){if(Array.isArray(n))for(let f of n){let p=l(f,a,{walkable:u,ignore:d});if(p)return p}else if(typeof n=="object"){for(let f of Object.keys(n))if(!(u!=null&&!u.includes(f))&&!d.includes(f))try{let p=l(n[f],a,{walkable:u,ignore:d});if(p)return p}catch{}}}}}return l(e,t,{walkable:r,ignore:c})}});var Te=h((Ho,_e)=>{var Ct=["Clickable","Tooltip"];_e.exports=function(o,{parent:e=!1,displayName:t=!0,blockList:r=Ct}={}){let c=n=>!n?.type?.displayName||r.includes(n?.type?.displayName),i=n=>typeof n?.type!="string"&&(t?!c(n):!0),s=n=>i(n)?n?.type:s(n.return),l=s(acord.utils.getReactInstance(o));return e?find(n=>n?.default===l):l}});var Oe=h((Ko,ve)=>{ve.exports=function(e){if(window.DiscordNative){DiscordNative.clipboard.copy(e);return}navigator.clipboard.writeText(e).catch(()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(r){console.error(r)}document.body.removeChild(t)})}});var O=h((Vo,Me)=>{var Pe=Se(),Nt=Te(),Bt=Oe(),Q=(o,e)=>(...t)=>console[o]("%cAcord%c",`background-color: ${e}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...t);Me.exports={sleep:o=>new Promise(e=>setTimeout(e,o)),logger:{log:Q("log","#00fbb0"),warn:Q("warn","#debf18"),error:Q("error","red")},react:{getInstance:o=>o.__reactFiber$,getOwnerInstance:o=>{for(let e=o.__reactFiber$;e;e=e.return)if(e.stateNode?.forceUpdate)return e.stateNode},findInTree:(o,e)=>Pe(o,e,{walkable:["props","children","child","sibling"]}),findByDomNode:Nt,getComponents(o){let e=o.__reactFiber$,t=[],r=e;for(;r&&r.return&&typeof r.return.type!="string";)r.return.type&&t.push(r.return.type),r=r.return;return t},getStateNodes(o){let e=o.__reactFiber$,t=[],r=e;for(;r&&r.return&&!(r.return.stateNode instanceof HTMLElement);)r.return.stateNode&&t.push(r.return.stateNode),r=r.return;return t},getProps:(o,e=r=>r,t=1e4)=>{let r=o.__reactFiber$;for(let c=r.return,i=0;i>t||c!==null;c=c?.return,i++)if(c?.pendingProps&&e(c.pendingProps))return c.pendingProps;return null}},findInTree:Pe,copyText:Bt,interval(o,e){let t=setInterval(o,e);return()=>{clearInterval(t)}},timeout(o,e){let t=setTimeout(o,e);return()=>{clearInterval(t)}},ifExists(o,e){o&&e(o)},format(o,...e){return`${o}`.replaceAll(/{(\d+)}/g,(t,r)=>e[Number(r)])}}});var De=h((zo,ke)=>{var qt=O();ke.exports=async o=>{let e={},t=[],r=null;if(typeof o=="string"){r=o,r.endsWith("/")&&(r=r.slice(0,-1));try{t=await(await fetch(`${r}/locales.json`,noStore)).json(),e.default=await(await fetch(`${r}/default.json`,noStore)).json()}catch(l){console.error(l)}for(let l=0;l<t.length;l++){let n=t[l];try{e[n]=await(await fetch(`${r}/${n}.json`,noStore)).json()}catch(a){console.error(a)}}}else e=o,t=Object.keys(o),t.includes("default")&&t.splice(t.indexOf("default"),1);async function c(){if(!r)return;let l=acord.i18n.locale;if(!(e[l]||!t.includes(l)))try{e[l]=await(await fetch(`${r}/${l}.json`,noStore)).json()}catch(n){console.error(n)}}let i=new Proxy({},{get(l,n){return window.acord?(c(),e[acord.i18n.locale]?.[n]||e.default?.[n]||acord.i18n.messages[n]||n):n}});function s(l,...n){return qt.format(i[l],...n)}return{messages:i,format:s}}});var $=h((Jo,qe)=>{var xe=Z(),It=j(),{logger:B}=O(),Ut=De(),ee={cache:"no-store"},P=It.make({}),y=null,$t=window.eval;async function je(o){return Object.assign({extension:Object.assign(o,{i18n:await Ut(o.manifest.i18n||{})})},window.acord)}async function Ce(o,e){let t=await je(e),r=`(acord)=>{return ${o}}${atob("Ci8v")}#sourceURL=${e.url}`,c=$t(r)(t),i=typeof c=="function"?c(e):c;return i.api=t,i}async function Rt(){y=await xe("LoadedExtensionsStore")}async function q(o){let e=y.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(P.ghost[o])throw new Error(`EXTENSION_ALREADY_ENABLED ${o}`);if(e.manifest.eula&&!e.eulaAccepted){if(!await acord.ui.modals.show.confirmation(acord.i18n.format("ACCEPT_EXTENSION_EULA"),typeof e.manifest.eula=="string"?e.manifest.eula:acord.i18n.format("ACCEPT_EXTENSION_EULA_DESCRIPTION")))return;P.store[o].eulaAccepted=!0}let t,r=!1,c=await xe(o);try{t=await Ce(e.source,{persist:c,url:o,manifest:e.manifest}),Array.isArray(t?.settings?.data)&&t.settings.data.forEach(i=>{i.property&&typeof c.ghost.settings?.[i.property]>"u"&&(c.store.settings[i.property]=i.value)})}catch(i){B.error("EXTENSION_EVAL_ERR",e.manifest.about.name,`${i} ${i?.stack?.join?.(`
`)}`),r=!0}try{t.load?.(),e.manifest.locked||acord.ui.toasts.show(acord.i18n.format(`IMPORTING_${e.manifest.type.toUpperCase()}`,e.manifest.about.name))}catch(i){B.error("EXTENSION_LOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.format("EXTENSION_LOAD_ERROR",e.manifest.about.name))}P.store[o]=t,r&&setTimeout(()=>{try{e.unload()}catch(i){B.error("EXTENSION_UNLOAD_ERR",e.manifest.about.name,i),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",e.manifest.about.name))}e.enabled=!1})}function U(o){let e=P.ghost[o],t=y.ghost[o];if(!e)throw new Error(`EXTENSION_NOT_FOUND ${o}`);if(!P.ghost[o])throw new Error(`EXTENSION_NOT_LOADED ${o}`);try{e.unload(),acord.ui.toasts.show(acord.i18n.format(`STOPPING_${t.manifest.type.toUpperCase()}`,t.manifest.about.name))}catch(r){B.error("EXTENSION_UNLOAD_ERR",t.manifest.about.name,r),acord.ui.toasts.show(acord.i18n.format("EXTENSION_UNLOAD_ERROR",t.manifest.about.name))}delete P.store[o]}async function Lt(o){let e=y.store[o];if(!y.ghost?.[o])throw new Error(`EXTENSION_NOT_FOUND ${o}`);e.enabled?(await U(o),e.enabled=!1):(await q(o),e.enabled=!0)}async function I(o,e=!0){let t=o.replace(/\/?$/,"/"),r=new URL("extension.json",t).href,c=new URL("extension.js",t).href,i=y.ghost?.[t],s=i?y.store[t]:void 0,l=i?.enabled??e,n=/^https?:\/\/raw\.githubusercontent\.com\/AcordPlugin/.test(t),a;try{let f=await fetch(r,ee);if(a=await f.json(),f.status!==200&&!i)throw i&&delete y.store[t],"NO_MAN_200"}catch(f){throw new Error(`NO_PARSE ${f}`)}if(a.locked&&!n)throw new Error("INVALID_LOCKED");if(!["plugin","theme"].includes(a?.type))throw new Error("INVALID_TYPE");if(i){if(a){if(s.manifest.hash!==a.hash){let f=await fetch(c,ee);if(f.status!==200)throw delete y.store[t],new Error("NO_200");s.source=await f.text()}_.isEqual(s.manifest,a)||(s.manifest=a)}l&&await q(t);return}let u=await fetch(c,ee);if(u.status!==200)throw new Error("NO_200");let d=await u.text();y.store[t]={manifest:a,verified:n,source:d,enabled:l,url:t},l&&await q(t)}function Ne(o){let e=y.ghost?.[o];if(!!e){try{U(o)}catch{}e.manifest.locked||delete y.store[o]}}var Wt=["https://raw.githubusercontent.com/AcordPlugin/plugins/main/fixtures/acord-ui/dist/","https://raw.githubusercontent.com/AcordPlugin/releases/main/fixture/"];async function Ft(){await Promise.allSettled(Object.keys(y.ghost).map(I)),Wt.forEach(o=>{y.ghost?.[o]||I(o)})}function Xt(){Object.keys(y.ghost).forEach(o=>{try{U(o)}catch{}})}async function Be(o){let e=!!y.ghost[o]?.enabled;try{Ne(o)}catch{}try{await I(o,e)}catch{}}async function Gt(){let o=Object.entries(y.store);for(let e=0;e<o.length;e++)await Be(o[e][0],o[e][1].enabled)}qe.exports={evaluate:Ce,load:I,init:Rt,startAll:Ft,reloadAll:Gt,reload:Be,buildAPI:je,nests:{get enabled(){return P},get loaded(){return y}},remove:Ne,start:q,stop:U,toggle:Lt,stopAll:Xt}});var Le=h((Yo,Re)=>{var te=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,Kt=Object.getOwnPropertyNames,Vt=Object.prototype.hasOwnProperty,zt=(o,e)=>{for(var t in e)te(o,t,{get:e[t],enumerable:!0})},Jt=(o,e,t,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of Kt(e))!Vt.call(o,c)&&c!==t&&te(o,c,{get:()=>e[c],enumerable:!(r=Ht(e,c))||r.enumerable});return o},Yt=o=>Jt(te({},"__esModule",{value:!0}),o),Ie={};zt(Ie,{after:()=>oo,before:()=>eo,instead:()=>to,unpatchAll:()=>Qt});Re.exports=Yt(Ie);var Ue=["a","b","i"],M=new Map;function Zt(o,e,t,r,c){let i=M.get(e)?.[o];if(!i)return c?Reflect.construct(e[o],t,r):e[o].apply(r,t);for(let n of i.b.values()){let a=n.call(r,t);Array.isArray(a)&&(t=a)}let s=(...n)=>c?Reflect.construct(i.o,n,r):i.o.apply(r,n);for(let n of i.i.values()){let a=s;s=(...u)=>n.call(r,u,a)}let l=s(...t);for(let n of i.a.values())l=n.call(r,t,l)??l;return l}function $e(o,e,t,r){let c=M.get(o),i=c?.[e];return i?.[r].has(t)?(i[r].delete(t),Ue.every(s=>i[s].size===0)&&(Reflect.defineProperty(o,e,{value:i.o,writable:!0,configurable:!0})||(o[e]=i.o),delete c[e]),Object.keys(c).length==0&&M.delete(o),!0):!1}function Qt(){for(let[o,e]of M.entries())for(let t in e)for(let r of Ue)for(let c of e[t]?.[r].keys()??[])$e(o,t,c,r)}var oe=o=>(e,t,r,c=!1)=>{if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);M.has(t)||M.set(t,{});let i=M.get(t);if(!i[e]){let n=t[e];i[e]={o:n,b:new Map,i:new Map,a:new Map};let a=(f,p,m)=>{let A=Zt(e,t,p,f,m);return c&&l(),A},u=new Proxy(n,{apply:(f,p,m)=>a(p,m,!1),construct:(f,p)=>a(n,p,!0),get:(f,p,m)=>p=="toString"?n.toString.bind(n):Reflect.get(f,p,m)});Reflect.defineProperty(t,e,{value:u,configurable:!0,writable:!0})||(t[e]=u)}let s=Symbol(),l=()=>$e(t,e,s,o);return i[e][o].set(s,r),l},eo=oe("b"),to=oe("i"),oo=oe("a")});var C=h((Zo,We)=>{var ro=Le();We.exports={...ro,injectCSS(o){let e=document.createElement("style");return e.className="AcordInjectedCSS",e.textContent=o,document.head.appendChild(e),()=>{e?.remove()}},unpatchAllCSS(){document.querySelectorAll(".AcordInjectedCSS").forEach(o=>{o.remove()})}}});var Xe=h((Qo,Fe)=>{var no=$(),so=C();Fe.exports=o=>{let e=o.WebpackModules.find(a=>a?.__proto__?.handleConnection),t=new Set,r=new Map;async function c(a,u){let d;try{if(d=JSON.parse(u),!Array.isArray(d)||d.length<1||d.length>3)throw"Array expected as message.";if(typeof d[0]!="string")throw"Array[0] needs to be string.";if(typeof d[1]!="string")throw"Array[1] needs to be string."}catch(g){a.send(JSON.stringify([null,{ok:!1,error:`${g}`}]))}let[f,p,m]=d,A=r.get(p);if(!A)return a.send(JSON.stringify([f,{ok:!1,error:"Unable to find handler."}]));try{let g=await A(m);a.send(JSON.stringify([f,{ok:!0,data:g}]))}catch(g){a.send(JSON.stringify([f,{ok:!1,error:`${g}`}]))}}function i(a,u){if(typeof a!="string")throw new Error("EventName needs to be a string.");if(typeof u!="function")throw new Error("Callback needs to be a function.");if(r.has(a))throw new Error("EventName already in use.");return r.set(a,u),()=>{r.delete(a)}}let s=so.instead("handleConnection",e,(a,u)=>{let d=a[0];if(d.upgradeReq().url!=="/acord")return u(...a);t.add(d),d.on("message",f=>{c(d,f)}),d.on("close",()=>t.delete(d))});function l(){s(),r.clear(),t.forEach(a=>a.close())}function n(a,...u){if(!r.has(a))throw new Error("Unable to find handler!");return r.get(a)(...u)}return i("InstallExtension",async({url:a}={})=>{if(!(!a||!await acord.ui.modals.show.confirmation(acord.i18n.format("IMPORT_EXTENSION"),acord.i18n.format("IMPORT_EXTENSION_DESCRIPTION",a))))try{await no.load(a)}catch(d){acord.ui.toasts.show.error(`${d}`)}}),{unpatchSocket:l,connectedSockets:t,socketEvents:r,set:i,trigger:n}}});var He=h((er,Ge)=>{var io=X(),ao=W(),{injectCSS:co}=C();Ge.exports=o=>{let e=io(o),t=ao(o),r=t.findByProps("root","small"),c=t.findByProps("notDevTools","app");co(".acord--layer-container{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1001;pointer-events:none;transition:100ms ease all}.acord--backdrop{background-color:rgba(0,0,0,.5);position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1002;pointer-events:none}.acord--layer{position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1003;pointer-events:all}.acord--modal-root{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1004;pointer-events:all}");function i(s,{size:l="large",classes:n=""}={}){let a=document.querySelector(`.${c.notDevTools}`),u=a.querySelector(".acord--layer-container");if(u||(u=e.parseHTML('<div class="acord--layer-container"></div>'),a.appendChild(u)),!u.querySelector(".acord--backdrop")){let g=e.parseHTML('<div class="acord--backdrop"></div>');u.prepend(g)}let d=e.parseHTML('<div class="acord--layer"></div>'),f=e.parseHTML(`<div class="${r.root} ${r[l]} ${e.escapeHTML(n)} acord--modal-root"></div>`),p=!1,m=[];async function A(){p||(p=!0,d?.remove(),document.querySelector(".acord--modal-root")||document.querySelector(".acord--backdrop")?.remove?.(),m.forEach(g=>g()))}return d.addEventListener("click",g=>{!g.target.classList.contains("acord--layer")||A()}),f.replaceChildren(typeof s=="function"?s({close:A,onClose(g){m.push(g)},root:f}):s),d.replaceChildren(f),u.appendChild(d),{close:A,onClose(g){m.push(g)},root:f}}return{show:Object.assign((...s)=>o.Modals.showModal(...s),{confirmation:(s,l,n={})=>new Promise(a=>{o.Modals.showConfirmationModal(s,l,{onConfirm:()=>a(!0),onCancel:()=>a(!1),confirmText:n?.confirm,cancelText:n?.cancel,danger:n?.danger})}),alert:(s,l)=>o.Modals.showAlertModal(s,l),legacy:(...s)=>i(...s)})}}});var Ve=h((tr,Ke)=>{var lo=F(),uo=O(),re="https://raw.githubusercontent.com/AcordPlugin/i18n/main",ne={cache:"no-store"};Ke.exports=o=>{let e=lo(o),t=[],r={};async function c(){try{t=await(await fetch(`${re}/locales.json`,ne)).json()}catch{}try{r.default=await(await fetch(`${re}/default.json`,ne)).json()}catch{}}async function i(){let n=e.common.i18n._requestedLocale;if(!(r[n]||!t.includes(n)))try{r[n]=await(await fetch(`${re}/${n}.json`,ne)).json()}catch{}}let s=new Proxy({},{get(n,a){i();let u=e.common.i18n._requestedLocale;return r[u]?.[a]||r.default?.[a]||e.common.i18n.Messages[a]||a}});function l(n,...a){return uo.format(s[n],...a)}return{init:c,format:l,messages:s,get locale(){return e.common.i18n._requestedLocale}}}});var Je=h((or,ze)=>{var fo=j(),po=J(),ho=Z();ze.exports={nests:fo,idbKeyval:po,createPersistentNest:ho}});var Ye=h((rr,go)=>{go.exports={info:{name:"Acord",authors:[{name:"K\u0131ra\xE7 Arma\u011Fan \xD6nal",discord_id:"707309693449535599",github_username:"TheArmagan"}],version:"0.1.467",description:"Acord is a BetterDiscord plugin developed to enable extension developers to make extensions more easily and wisely."},main:"index.js"}});var Qe=h((sr,Ze)=>{Ze.exports=class{constructor(){this.listeners=new Map}_prepareListenersMap(e){this.listeners.has(e)||this.listeners.set(e,new Map)}on(e,t){return this._prepareListenersMap(e),this.listeners.get(e).set(t,{once:!1}),()=>{this.listeners.get(e).delete(t)}}once(e,t){return this._prepareListenersMap(e),this.listeners.get(e)?.set(t,{once:!0}),()=>{this.listeners.get(e).delete(t)}}off(e,t){if(!e)return this.listeners=new Map;if(!t)return this.listeners?.delete(e);this.listeners.get(e)?.delete(t)}emit(e,...t){if(!this.listeners.has(e))return;let r=this.listeners.get(e);r.forEach(({once:c},i)=>{c&&r?.delete(i),i(...t)})}}});var tt=h((ir,et)=>{var yo=Qe(),wo=new yo;et.exports=wo});var ie=h((ar,ot)=>{var se=class{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(r=>r==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}};ot.exports=new se});var nt=h((cr,rt)=>{var{logger:v}=O(),bo=j(),mo=$();rt.exports=o=>{let e=null,t=null,r=null,c=bo.make({}),i=!1,s=!1;o.set("UpdateDevelopmentExtension",async({source:n,manifest:a})=>{if(!(!s||i)){if(i=!0,e){v.log(`Unloading development extension.. (${a.about.name})`);try{e?.unload?.(),e=null,t=null,r=null,v.log(`Development extension unloaded! (${a.about.name})`)}catch(u){v.error(`Unable to unload development extension! (${a.about.name})`,u)}}await new Promise(u=>setTimeout(u,1));try{e=await mo.evaluate(n,{persist:c,id:"https://FakeExtensionId",manifest:a}),Array.isArray(e?.settings?.data)&&e.settings.data.forEach(u=>{u.property&&typeof c.ghost.settings?.[u.property]>"u"&&(c.store.settings[u.property]=u.value)}),t=n,r=a,e?.load?.(),v.log(`Development extension is loaded! (${a.about.name})`)}catch(u){v.error(`Failed to load development extension! (${a.about.name})`,u)}finally{}i=!1}});function l(){if(e){v.log("Unloading development extension..");try{e?.unload?.(),e=null,t=null,r=null,v.log("Development extension unloaded!")}catch(n){v.error("Unable to unload development extension!",n)}return!0}return!1}return{get extension(){return{loaded:t?{source:t,manifest:r}:null,enabled:e}},get enabled(){return s},set enabled(n){s=!!n},unload:l}}});var it=h((lr,st)=>{var Ao=ie(),Eo=O();st.exports=function(e){Ao.add(Eo.interval(()=>{document.querySelectorAll("[acord--tooltip-content]").forEach(t=>{if(!t.acordTooltip)try{let r=t.setAttribute,c=t.removeAttribute;t.setAttribute=function(n,a){if(t.acordTooltip)switch(n){case"acord--tooltip-content":{t.acordTooltip.label=a,t.acordTooltip.disabled=!a?.trim?.();break}case"acord--tooltip-style":{t.acordTooltip.style=a??"primary";break}case"acord--tooltip-side":{t.acordTooltip.side=a??"top";break}}return r.bind(this,n,a)},t.removeAttribute=function(n){if(t.acordTooltip)switch(n){case"acord--tooltip-content":{t.acordTooltip.disabled=!0,t.acordTooltip.label="";break}case"acord--tooltip-style":{t.acordTooltip.style="primary";break}case"acord--tooltip-side":{t.acordTooltip.side="top";break}}return c.call(this,n)};let i=t.getAttribute("acord--tooltip-content"),s=t.getAttribute("acord--tooltip-style")||"primary",l=t.getAttribute("acord--tooltip-side")||"top";if(t.acordTooltip){t.acordTooltip.disabled=!!i?.trim(),t.acordTooltip.label=i,t.acordTooltip.style=s,t.acordTooltip.side=l;return}t.acordTooltip=new e.Tooltip(t,i,{style:s,side:l}),t.acordTooltip.tooltipElement.style.zIndex=9999999}catch{}})},100))}});var So=F(),_o=X(),To=Xe(),vo=He(),Oo=Ve(),R=O(),Po=Je(),L=$(),ae=C(),ct=Ye(),at=tt(),Mo=ie(),ko=nt(),{injectCSS:Do}=C(),xo=it(),jo=["952550103271485520"],Co=(o,e)=>{let t=So(e),r=To(e),c=ko(r),i=_o(e),s=vo(e),l=Oo(e);return class extends o{async onStart(){await e.PluginUpdater.checkForUpdate("Acord",ct.info.version,"https://raw.githubusercontent.com/AcordPlugin/releases/main/acord.plugin.js"),Do('[class*="acord--"] * {box-sizing: border-box;}');let n={internal:Po,modules:t,utils:R,patcher:ae,extensions:(()=>{let d={...L};return delete d.init,d})(),events:at,ui:{modals:s,toasts:{show:Object.assign((...d)=>BdApi.UI.showToast(...d),{success:d=>BdApi.UI.showToast(d,{type:"success"}),error:d=>BdApi.UI.showToast(d,{type:"error"}),info:d=>BdApi.UI.showToast(d,{type:"info"}),warning:d=>BdApi.UI.showToast(d,{type:"warning"})})},notices:{show:Object.assign((...d)=>BdApi.UI.showNotice(...d),{success:(d,f={})=>BdApi.UI.showNotice(d,{type:"success",...f}),error:(d,f={})=>BdApi.UI.showNotice(d,{type:"error",...f}),info:(d,f={})=>BdApi.UI.showNotice(d,{type:"info",...f}),warning:(d,f={})=>BdApi.UI.showNotice(d,{type:"warning",...f})})},tooltips:{create:Object.assign((d,f,p={})=>new e.Tooltip(d,f,{style:"primary",...p}),{success:(d,f,p={})=>new e.Tooltip(d,f,{style:"green",...p}),error:(d,f,p={})=>new e.Tooltip(d,f,{style:"red",...p}),warning:(d,f,p={})=>new e.Tooltip(d,f,{style:"yellow",...p})})},contextMenus:{patch:(d,f)=>BdApi.ContextMenu.patch(d,f),build:{item:d=>BdApi.ContextMenu.buildItem(d),menu:Object.assign(d=>BdApi.ContextMenu.buildMenu(d),{children:d=>BdApi.ContextMenu.buildMenuChildren(d)})},open:(d,f,p)=>BdApi.ContextMenu.open(d,f,p)}},dom:Object.assign(i,{patch:(d,f,p=!1)=>(()=>{function m(A){A.nodeType!==Node.TEXT_NODE&&A.querySelectorAll(d).forEach(async g=>{if(g.acord||(g.acord={unmountCallbacks:[],patchedSelectors:new Set},g.classList.add("acord--patched")),g.acord.patchedSelectors.has(d))return;g.acord.patchedSelectors.add(d);let k=await f(g);typeof k=="function"&&g.acord.unmountCallbacks.push(k)})}return p&&document.querySelectorAll(d).forEach(m),at.on("domMutation",A=>{A.addedNodes.forEach(m),A.removedNodes.forEach(g=>{g.nodeType!==Node.TEXT_NODE&&g.querySelectorAll(d).forEach(async k=>{!k.acord||k.acord.unmountCallbacks.forEach(lt=>lt())})})})})()}),i18n:{format:l.format,messages:l.messages,get locale(){return l.locale}},websocket:{set:r.set,trigger:r.trigger},dev:c,unload(){ae.unpatchAll(),ae.unpatchAllCSS(),L.stopAll(),r.unpatchSocket(),Mo.removeAll(),socket.disconnect(),c.unload()},_:e,other:{}},a=t.common.UserStore.getCurrentUser(),u=!1;if(jo.forEach(d=>{if(u)return;let f=t.common.GuildStore.getGuild(d);f?u=`You are blocked from Acord extension system due to be in the some of the blocked guilds like ${f.name}.`:a.id===d&&(u="You are blocked from Acord.")}),u){R.logger.error("Unable to load Acord!"),BdApi.UI.showToast(u,{type:"error"});return}window.acord=n,globalThis.acord=n,xo(e),await l.init(),await L.init(),await L.startAll(),R.logger.log(l.messages.ACORD_LOADED),BdApi.UI.showToast(l.messages.ACORD_LOADED,{type:"success"})}observer(n){window.acord&&window.acord.events.emit("domMutation",n)}onStop(){BdApi.UI.showToast(l.messages.ACORD_UNLOADED,{type:"success"}),R.logger.log(l.messages.ACORD_UNLOADED);try{window.acord.events.emit("unload"),window.acord.unload()}catch{}delete window.acord,delete globalThis.acord}}};if(global.ZLibrary){let o=global.ZLibrary.buildPlugin(ct);module.exports=Co(...o),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3)}else{let o=!1;setTimeout(async()=>{let e=require("request"),{shell:t}=require("electron"),r=require("fs"),c=require("path");BdApi.showToast("Downloading Acord dependencies.."),e.get("https://betterdiscord.app/gh-redirect?id=9",async(i,s,l)=>{if(i)return t.openExternal("https://betterdiscord.app/Download?id=9");s.statusCode===302?e.get(s.headers.location,async(n,a,u)=>{if(n)return t.openExternal("https://betterdiscord.app/Download?id=9");r.writeFile(c.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),u,()=>{})}):r.writeFile(c.join(BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),l,()=>{})}),(async()=>{for(;!(global.ZLibrary||o);)await new Promise(i=>setTimeout(i,500));global.ZLibrary&&(BdApi.showToast("Reloading the Acord.."),BdApi.Plugins.reload("Acord"),setTimeout(()=>{BdApi.Plugins.isEnabled("Acord")||BdApi.Plugins.enable("Acord")},1e3))})()},1),module.exports=class{constructor(t){}async start(){}stop(){o=!0}}}
