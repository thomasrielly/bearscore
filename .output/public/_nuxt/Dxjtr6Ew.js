import{s as oe,I as se,a as ue,i as p,l as de}from"./pw0acHvw.js";import{N as fe,S as g,u as x,c as ve,A as Q,T as pe,o as J}from"./BL69-MhK.js";import{a as me}from"./BHAjzfTM.js";import{d as W,f as b,K as X,e as w,N as E,I as Y,J as A,G as ce,L as H,n as he,M as P}from"./BdTB-59g.js";function D(){let e=[],t={addEventListener(n,r,i,a){return n.addEventListener(r,i,a),t.add(()=>n.removeEventListener(r,i,a))},requestAnimationFrame(...n){let r=requestAnimationFrame(...n);t.add(()=>cancelAnimationFrame(r))},nextFrame(...n){t.requestAnimationFrame(()=>{t.requestAnimationFrame(...n)})},setTimeout(...n){let r=setTimeout(...n);t.add(()=>clearTimeout(r))},microTask(...n){let r={current:!0};return me(()=>{r.current&&n[0]()}),t.add(()=>{r.current=!1})},style(n,r,i){let a=n.style.getPropertyValue(r);return Object.assign(n.style,{[r]:i}),this.add(()=>{Object.assign(n.style,{[r]:a})})},group(n){let r=D();return n(r),this.add(()=>r.dispose())},add(n){return e.push(n),()=>{let r=e.indexOf(n);if(r>=0)for(let i of e.splice(r,1))i()}},dispose(){for(let n of e.splice(0))n()}};return t}function ge(e){let t={called:!1};return(...n)=>{if(!t.called)return t.called=!0,e(...n)}}function O(e,...t){e&&t.length>0&&e.classList.add(...t)}function F(e,...t){e&&t.length>0&&e.classList.remove(...t)}var j=(e=>(e.Finished="finished",e.Cancelled="cancelled",e))(j||{});function be(e,t){let n=D();if(!e)return n.dispose;let{transitionDuration:r,transitionDelay:i}=getComputedStyle(e),[a,l]=[r,i].map(o=>{let[s=0]=o.split(",").filter(Boolean).map(u=>u.includes("ms")?parseFloat(u):parseFloat(u)*1e3).sort((u,d)=>d-u);return s});return a!==0?n.setTimeout(()=>t("finished"),a+l):t("finished"),n.add(()=>t("cancelled")),n.dispose}function K(e,t,n,r,i,a){let l=D(),o=a!==void 0?ge(a):()=>{};return F(e,...i),O(e,...t,...n),l.nextFrame(()=>{F(e,...n),O(e,...r),l.add(be(e,s=>(F(e,...r,...t),O(e,...i),o(s))))}),l.add(()=>F(e,...t,...n,...r,...i)),l.add(()=>o("cancelled")),l.dispose}function h(e=""){return e.split(/\s+/).filter(t=>t.length>1)}let M=Symbol("TransitionContext");var ye=(e=>(e.Visible="visible",e.Hidden="hidden",e))(ye||{});function Ee(){return P(M,null)!==null}function Se(){let e=P(M,null);if(e===null)throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");return e}function Te(){let e=P(N,null);if(e===null)throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");return e}let N=Symbol("NestingContext");function C(e){return"children"in e?C(e.children):e.value.filter(({state:t})=>t==="visible").length>0}function Z(e){let t=b([]),n=b(!1);E(()=>n.value=!0),Y(()=>n.value=!1);function r(a,l=g.Hidden){let o=t.value.findIndex(({id:s})=>s===a);o!==-1&&(x(l,{[g.Unmount](){t.value.splice(o,1)},[g.Hidden](){t.value[o].state="hidden"}}),!C(t)&&n.value&&(e==null||e()))}function i(a){let l=t.value.find(({id:o})=>o===a);return l?l.state!=="visible"&&(l.state="visible"):t.value.push({id:a,state:"visible"}),()=>r(a,g.Unmount)}return{children:t,register:i,unregister:r}}let _=fe.RenderStrategy,Le=W({props:{as:{type:[Object,String],default:"div"},show:{type:[Boolean],default:null},unmount:{type:[Boolean],default:!0},appear:{type:[Boolean],default:!1},enter:{type:[String],default:""},enterFrom:{type:[String],default:""},enterTo:{type:[String],default:""},entered:{type:[String],default:""},leave:{type:[String],default:""},leaveFrom:{type:[String],default:""},leaveTo:{type:[String],default:""}},emits:{beforeEnter:()=>!0,afterEnter:()=>!0,beforeLeave:()=>!0,afterLeave:()=>!0},setup(e,{emit:t,attrs:n,slots:r,expose:i}){let a=b(0);function l(){a.value|=p.Opening,t("beforeEnter")}function o(){a.value&=~p.Opening,t("afterEnter")}function s(){a.value|=p.Closing,t("beforeLeave")}function u(){a.value&=~p.Closing,t("afterLeave")}if(!Ee()&&oe())return()=>X(we,{...e,onBeforeEnter:l,onAfterEnter:o,onBeforeLeave:s,onAfterLeave:u},r);let d=b(null),S=w(()=>e.unmount?g.Unmount:g.Hidden);i({el:d,$el:d});let{show:m,appear:U}=Se(),{register:q,unregister:B}=Te(),f=b(m.value?"visible":"hidden"),I={value:!0},y=se(),T={value:!1},R=Z(()=>{!T.value&&f.value!=="hidden"&&(f.value="hidden",B(y),u())});E(()=>{let v=q(y);Y(v)}),A(()=>{if(S.value===g.Hidden&&y){if(m.value&&f.value!=="visible"){f.value="visible";return}x(f.value,{hidden:()=>B(y),visible:()=>q(y)})}});let V=h(e.enter),k=h(e.enterFrom),ee=h(e.enterTo),z=h(e.entered),te=h(e.leave),ne=h(e.leaveFrom),re=h(e.leaveTo);E(()=>{A(()=>{if(f.value==="visible"){let v=J(d);if(v instanceof Comment&&v.data==="")throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")}})});function ae(v){let $=I.value&&!U.value,c=J(d);!c||!(c instanceof HTMLElement)||$||(T.value=!0,m.value&&l(),m.value||s(),v(m.value?K(c,V,k,ee,z,L=>{T.value=!1,L===j.Finished&&o()}):K(c,te,ne,re,z,L=>{T.value=!1,L===j.Finished&&(C(R)||(f.value="hidden",B(y),u()))})))}return E(()=>{ce([m],(v,$,c)=>{ae(c),I.value=!1},{immediate:!0})}),H(N,R),ue(w(()=>x(f.value,{visible:p.Open,hidden:p.Closed})|a.value)),()=>{let{appear:v,show:$,enter:c,enterFrom:L,enterTo:Ae,entered:Ce,leave:Be,leaveFrom:$e,leaveTo:Oe,...G}=e,le={ref:d},ie={...G,...U.value&&m.value&&ve.isServer?{class:he([n.class,G.class,...V,...k])}:{}};return Q({theirProps:ie,ourProps:le,slot:{},slots:r,attrs:n,features:_,visible:f.value==="visible",name:"TransitionChild"})}}}),Fe=Le,we=W({inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"},show:{type:[Boolean],default:null},unmount:{type:[Boolean],default:!0},appear:{type:[Boolean],default:!1},enter:{type:[String],default:""},enterFrom:{type:[String],default:""},enterTo:{type:[String],default:""},entered:{type:[String],default:""},leave:{type:[String],default:""},leaveFrom:{type:[String],default:""},leaveTo:{type:[String],default:""}},emits:{beforeEnter:()=>!0,afterEnter:()=>!0,beforeLeave:()=>!0,afterLeave:()=>!0},setup(e,{emit:t,attrs:n,slots:r}){let i=de(),a=w(()=>e.show===null&&i!==null?(i.value&p.Open)===p.Open:e.show);A(()=>{if(![!0,!1].includes(a.value))throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.')});let l=b(a.value?"visible":"hidden"),o=Z(()=>{l.value="hidden"}),s=b(!0),u={show:a,appear:w(()=>e.appear||!s.value)};return E(()=>{A(()=>{s.value=!1,a.value?l.value="visible":C(o)||(l.value="hidden")})}),H(N,o),H(M,u),()=>{let d=pe(e,["show","appear","unmount","onBeforeEnter","onBeforeLeave","onAfterEnter","onAfterLeave"]),S={unmount:e.unmount};return Q({ourProps:{...S,as:"template"},theirProps:{},slot:{},slots:{...r,default:()=>[X(Fe,{onBeforeEnter:()=>t("beforeEnter"),onAfterEnter:()=>t("afterEnter"),onBeforeLeave:()=>t("beforeLeave"),onAfterLeave:()=>t("afterLeave"),...n,...S,...d},r.default)]},attrs:{},features:_,visible:l.value==="visible",name:"Transition"})}}});export{we as S,Le as h,D as o};
