import{A,c as q,w as I,i as K,a as b,o as c,u as N,P as T,b as w,d as W}from"./BL69-MhK.js";import{d as B,J as D,f as p,e as y,N as g,I as M,K as k,F as G,G as O}from"./BdTB-59g.js";var H=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(H||{});let S=B({name:"Hidden",props:{as:{type:[Object,String],default:"div"},features:{type:Number,default:1}},setup(e,{slots:t,attrs:n}){return()=>{var a;let{features:o,...u}=e,r={"aria-hidden":(o&2)===2?!0:(a=u["aria-hidden"])!=null?a:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(o&4)===4&&(o&2)!==2&&{display:"none"}}};return A({ourProps:r,theirProps:u,slot:{},attrs:n,slots:t,name:"Hidden"})}}});function J(e){function t(){document.readyState!=="loading"&&(e(),document.removeEventListener("DOMContentLoaded",t))}typeof window<"u"&&typeof document<"u"&&(document.addEventListener("DOMContentLoaded",t),t())}let F=[];J(()=>{function e(t){t.target instanceof HTMLElement&&t.target!==document.body&&F[0]!==t.target&&(F.unshift(t.target),F=F.filter(n=>n!=null&&n.isConnected),F.splice(10))}window.addEventListener("click",e,{capture:!0}),window.addEventListener("mousedown",e,{capture:!0}),window.addEventListener("focus",e,{capture:!0}),document.body.addEventListener("click",e,{capture:!0}),document.body.addEventListener("mousedown",e,{capture:!0}),document.body.addEventListener("focus",e,{capture:!0})});function P(e){typeof queueMicrotask=="function"?queueMicrotask(e):Promise.resolve().then(e).catch(t=>setTimeout(()=>{throw t}))}function R(e,t,n,a){q.isServer||D(o=>{e=e??window,e.addEventListener(t,n,a),o(()=>e.removeEventListener(t,n,a))})}var L=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(L||{});function z(){let e=p(0);return I("keydown",t=>{t.key==="Tab"&&(e.value=t.shiftKey?1:0)}),e}function $(e){if(!e)return new Set;if(typeof e=="function")return new Set(e());let t=new Set;for(let n of e.value){let a=c(n);a instanceof HTMLElement&&t.add(a)}return t}var j=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(j||{});let te=Object.assign(B({name:"FocusTrap",props:{as:{type:[Object,String],default:"div"},initialFocus:{type:Object,default:null},features:{type:Number,default:30},containers:{type:[Object,Function],default:p(new Set)}},inheritAttrs:!1,setup(e,{attrs:t,slots:n,expose:a}){let o=p(null);a({el:o,$el:o});let u=y(()=>K(o)),r=p(!1);g(()=>r.value=!0),M(()=>r.value=!1),U({ownerDocument:u},y(()=>r.value&&!!(e.features&16)));let m=V({ownerDocument:u,container:o,initialFocus:y(()=>e.initialFocus)},y(()=>r.value&&!!(e.features&2)));X({ownerDocument:u,container:o,containers:e.containers,previousActiveElement:m},y(()=>r.value&&!!(e.features&8)));let l=z();function i(s){let f=c(o);f&&(v=>v())(()=>{N(l.value,{[L.Forwards]:()=>{T(f,w.First,{skipElements:[s.relatedTarget]})},[L.Backwards]:()=>{T(f,w.Last,{skipElements:[s.relatedTarget]})}})})}let d=p(!1);function h(s){s.key==="Tab"&&(d.value=!0,requestAnimationFrame(()=>{d.value=!1}))}function E(s){if(!r.value)return;let f=$(e.containers);c(o)instanceof HTMLElement&&f.add(c(o));let v=s.relatedTarget;v instanceof HTMLElement&&v.dataset.headlessuiFocusGuard!=="true"&&(C(f,v)||(d.value?T(c(o),N(l.value,{[L.Forwards]:()=>w.Next,[L.Backwards]:()=>w.Previous})|w.WrapAround,{relativeTo:s.target}):s.target instanceof HTMLElement&&b(s.target)))}return()=>{let s={},f={ref:o,onKeydown:h,onFocusout:E},{features:v,initialFocus:Y,containers:Z,...x}=e;return k(G,[!!(v&4)&&k(S,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:i,features:H.Focusable}),A({ourProps:f,theirProps:{...t,...x},slot:s,attrs:t,slots:n,name:"FocusTrap"}),!!(v&4)&&k(S,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:i,features:H.Focusable})])}}}),{features:j});function Q(e){let t=p(F.slice());return O([e],([n],[a])=>{a===!0&&n===!1?P(()=>{t.value.splice(0)}):a===!1&&n===!0&&(t.value=F.slice())},{flush:"post"}),()=>{var n;return(n=t.value.find(a=>a!=null&&a.isConnected))!=null?n:null}}function U({ownerDocument:e},t){let n=Q(t);g(()=>{D(()=>{var a,o;t.value||((a=e.value)==null?void 0:a.activeElement)===((o=e.value)==null?void 0:o.body)&&b(n())},{flush:"post"})}),M(()=>{t.value&&b(n())})}function V({ownerDocument:e,container:t,initialFocus:n},a){let o=p(null),u=p(!1);return g(()=>u.value=!0),M(()=>u.value=!1),g(()=>{O([t,n,a],(r,m)=>{if(r.every((i,d)=>(m==null?void 0:m[d])===i)||!a.value)return;let l=c(t);l&&P(()=>{var i,d;if(!u.value)return;let h=c(n),E=(i=e.value)==null?void 0:i.activeElement;if(h){if(h===E){o.value=E;return}}else if(l.contains(E)){o.value=E;return}h?b(h):T(l,w.First|w.NoScroll)===W.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.value=(d=e.value)==null?void 0:d.activeElement})},{immediate:!0,flush:"post"})}),o}function X({ownerDocument:e,container:t,containers:n,previousActiveElement:a},o){var u;R((u=e.value)==null?void 0:u.defaultView,"focus",r=>{if(!o.value)return;let m=$(n);c(t)instanceof HTMLElement&&m.add(c(t));let l=a.value;if(!l)return;let i=r.target;i&&i instanceof HTMLElement?C(m,i)?(a.value=i,b(i)):(r.preventDefault(),r.stopPropagation(),b(l)):b(a.value)},!0)}function C(e,t){for(let n of e)if(n.contains(t))return!0;return!1}export{R as E,P as a,S as f,H as s,F as t,te as u};
