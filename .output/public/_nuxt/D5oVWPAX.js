import{e as y,a as z,s as _e,G as K,aa as ae,ab as Ie,f as P,d as H,O as we,L as ve,N as ne,K as Q,F as fe,J as X,M as me,I as Ce,ac as ke,ad as L,Q as he,a1 as Te,V as Ee,o as G,c as le,j as D,w as j,g as c,D as Re,i as Me,l as ze,h as Pe,t as re,_ as De,H as Fe}from"./BdTB-59g.js";import{_ as Ve}from"./DzKKKXDy.js";import{a as $e,_ as Ae}from"./DeMFEWLY.js";import{w as Be,a as je,i as Y,I as se,l as Ne,o as N,n as Le}from"./pw0acHvw.js";import{c as F,f as ue,i as Ke,u as Ue}from"./DbLm-Aro.js";import{f as qe,s as He,t as de,u as Je}from"./BHAjzfTM.js";import{o as ce,S as We}from"./Dxjtr6Ew.js";import{u as q,o as w,E as Ge,A as ee,T as ie,i as Qe,N as Z,O as Xe}from"./BL69-MhK.js";function U(o,a,e){let n=e.initialDeps??[],t;return()=>{var s,u,l,v;let h;e.key&&((s=e.debug)!=null&&s.call(e))&&(h=Date.now());const p=o();if(!(p.length!==n.length||p.some((T,E)=>n[E]!==T)))return t;n=p;let k;if(e.key&&((u=e.debug)!=null&&u.call(e))&&(k=Date.now()),t=a(...p),e.key&&((l=e.debug)!=null&&l.call(e))){const T=Math.round((Date.now()-h)*100)/100,E=Math.round((Date.now()-k)*100)/100,V=E/16,A=(b,S)=>{for(b=String(b);b.length<S;)b=" "+b;return b};console.info(`%c⏱ ${A(E,5)} /${A(T,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*V,120))}deg 100% 31%);`,e==null?void 0:e.key)}return(v=e==null?void 0:e.onChange)==null||v.call(e,t),t}}function oe(o,a){if(o===void 0)throw new Error(`Unexpected undefined${a?`: ${a}`:""}`);return o}const Ye=(o,a)=>Math.abs(o-a)<1,Ze=o=>o,et=o=>{const a=Math.max(o.startIndex-o.overscan,0),e=Math.min(o.endIndex+o.overscan,o.count-1),n=[];for(let t=a;t<=e;t++)n.push(t);return n},tt=(o,a)=>{const e=o.scrollElement;if(!e)return;const n=s=>{const{width:u,height:l}=s;a({width:Math.round(u),height:Math.round(l)})};if(n(e.getBoundingClientRect()),typeof ResizeObserver>"u")return()=>{};const t=new ResizeObserver(s=>{const u=s[0];if(u!=null&&u.borderBoxSize){const l=u.borderBoxSize[0];if(l){n({width:l.inlineSize,height:l.blockSize});return}}n(e.getBoundingClientRect())});return t.observe(e,{box:"border-box"}),()=>{t.unobserve(e)}},lt=(o,a)=>{const e=o.scrollElement;if(!e)return;const n=()=>{a(e[o.options.horizontal?"scrollLeft":"scrollTop"])};return n(),e.addEventListener("scroll",n,{passive:!0}),()=>{e.removeEventListener("scroll",n)}},ot=(o,a,e)=>{if(a!=null&&a.borderBoxSize){const n=a.borderBoxSize[0];if(n)return Math.round(n[e.options.horizontal?"inlineSize":"blockSize"])}return Math.round(o.getBoundingClientRect()[e.options.horizontal?"width":"height"])},nt=(o,{adjustments:a=0,behavior:e},n)=>{var t,s;const u=o+a;(s=(t=n.scrollElement)==null?void 0:t.scrollTo)==null||s.call(t,{[n.options.horizontal?"left":"top"]:u,behavior:e})};class st{constructor(a){this.unsubs=[],this.scrollElement=null,this.isScrolling=!1,this.isScrollingTimeoutId=null,this.scrollToIndexTimeoutId=null,this.measurementsCache=[],this.itemSizeCache=new Map,this.pendingMeasuredCacheIndexes=[],this.scrollDirection=null,this.scrollAdjustments=0,this.measureElementCache=new Map,this.observer=(()=>{let e=null;const n=()=>e||(typeof ResizeObserver<"u"?e=new ResizeObserver(t=>{t.forEach(s=>{this._measureElement(s.target,s)})}):null);return{disconnect:()=>{var t;return(t=n())==null?void 0:t.disconnect()},observe:t=>{var s;return(s=n())==null?void 0:s.observe(t,{box:"border-box"})},unobserve:t=>{var s;return(s=n())==null?void 0:s.unobserve(t)}}})(),this.range=null,this.setOptions=e=>{Object.entries(e).forEach(([n,t])=>{typeof t>"u"&&delete e[n]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:Ze,rangeExtractor:et,onChange:()=>{},measureElement:ot,initialRect:{width:0,height:0},scrollMargin:0,gap:0,scrollingDelay:150,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,...e}},this.notify=e=>{var n,t;(t=(n=this.options).onChange)==null||t.call(n,this,e)},this.maybeNotify=U(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.scrollElement=null},this._didMount=()=>(this.measureElementCache.forEach(this.observer.observe),()=>{this.observer.disconnect(),this.cleanup()}),this._willUpdate=()=>{const e=this.options.getScrollElement();this.scrollElement!==e&&(this.cleanup(),this.scrollElement=e,this._scrollToOffset(this.scrollOffset,{adjustments:void 0,behavior:void 0}),this.unsubs.push(this.options.observeElementRect(this,n=>{this.scrollRect=n,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,n=>{this.scrollAdjustments=0,this.scrollOffset!==n&&(this.isScrollingTimeoutId!==null&&(clearTimeout(this.isScrollingTimeoutId),this.isScrollingTimeoutId=null),this.isScrolling=!0,this.scrollDirection=this.scrollOffset<n?"forward":"backward",this.scrollOffset=n,this.maybeNotify(),this.isScrollingTimeoutId=setTimeout(()=>{this.isScrollingTimeoutId=null,this.isScrolling=!1,this.scrollDirection=null,this.maybeNotify()},this.options.scrollingDelay))})))},this.getSize=()=>this.scrollRect[this.options.horizontal?"width":"height"],this.memoOptions=U(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey],(e,n,t,s)=>(this.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:n,scrollMargin:t,getItemKey:s}),{key:!1}),this.getFurthestMeasurement=(e,n)=>{const t=new Map,s=new Map;for(let u=n-1;u>=0;u--){const l=e[u];if(t.has(l.lane))continue;const v=s.get(l.lane);if(v==null||l.end>v.end?s.set(l.lane,l):l.end<v.end&&t.set(l.lane,!0),t.size===this.options.lanes)break}return s.size===this.options.lanes?Array.from(s.values()).sort((u,l)=>u.end===l.end?u.index-l.index:u.end-l.end)[0]:void 0},this.getMeasurements=U(()=>[this.memoOptions(),this.itemSizeCache],({count:e,paddingStart:n,scrollMargin:t,getItemKey:s},u)=>{const l=this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[];const v=this.measurementsCache.slice(0,l);for(let h=l;h<e;h++){const p=s(h),m=this.options.lanes===1?v[h-1]:this.getFurthestMeasurement(v,h),k=m?m.end+this.options.gap:n+t,T=u.get(p),E=typeof T=="number"?T:this.options.estimateSize(h),V=k+E,A=m?m.lane:h%this.options.lanes;v[h]={index:h,start:k,size:E,end:V,key:p,lane:A}}return this.measurementsCache=v,v},{key:!1,debug:()=>this.options.debug}),this.calculateRange=U(()=>[this.getMeasurements(),this.getSize(),this.scrollOffset],(e,n,t)=>this.range=e.length>0&&n>0?it({measurements:e,outerSize:n,scrollOffset:t}):null,{key:!1,debug:()=>this.options.debug}),this.getIndexes=U(()=>[this.options.rangeExtractor,this.calculateRange(),this.options.overscan,this.options.count],(e,n,t,s)=>n===null?[]:e({...n,overscan:t,count:s}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{const n=this.options.indexAttribute,t=e.getAttribute(n);return t?parseInt(t,10):(console.warn(`Missing attribute name '${n}={index}' on measured element.`),-1)},this._measureElement=(e,n)=>{const t=this.measurementsCache[this.indexFromElement(e)];if(!t||!e.isConnected){this.measureElementCache.forEach((l,v)=>{l===e&&(this.observer.unobserve(e),this.measureElementCache.delete(v))});return}const s=this.measureElementCache.get(t.key);s!==e&&(s&&this.observer.unobserve(s),this.observer.observe(e),this.measureElementCache.set(t.key,e));const u=this.options.measureElement(e,n,this);this.resizeItem(t,u)},this.resizeItem=(e,n)=>{const t=this.itemSizeCache.get(e.key)??e.size,s=n-t;s!==0&&(e.start<this.scrollOffset+this.scrollAdjustments&&this._scrollToOffset(this.scrollOffset,{adjustments:this.scrollAdjustments+=s,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(e.index),this.itemSizeCache=new Map(this.itemSizeCache.set(e.key,n)),this.notify(!1))},this.measureElement=e=>{e&&this._measureElement(e,void 0)},this.getVirtualItems=U(()=>[this.getIndexes(),this.getMeasurements()],(e,n)=>{const t=[];for(let s=0,u=e.length;s<u;s++){const l=e[s],v=n[l];t.push(v)}return t},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{const n=this.getMeasurements();return oe(n[pe(0,n.length-1,t=>oe(n[t]).start,e)])},this.getOffsetForAlignment=(e,n)=>{const t=this.getSize();n==="auto"&&(e<=this.scrollOffset?n="start":e>=this.scrollOffset+t?n="end":n="start"),n==="start"?e=e:n==="end"?e=e-t:n==="center"&&(e=e-t/2);const s=this.options.horizontal?"scrollWidth":"scrollHeight",l=(this.scrollElement?"document"in this.scrollElement?this.scrollElement.document.documentElement[s]:this.scrollElement[s]:0)-this.getSize();return Math.max(Math.min(l,e),0)},this.getOffsetForIndex=(e,n="auto")=>{e=Math.max(0,Math.min(e,this.options.count-1));const t=oe(this.getMeasurements()[e]);if(n==="auto")if(t.end>=this.scrollOffset+this.getSize()-this.options.scrollPaddingEnd)n="end";else if(t.start<=this.scrollOffset+this.options.scrollPaddingStart)n="start";else return[this.scrollOffset,n];const s=n==="end"?t.end+this.options.scrollPaddingEnd:t.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(s,n),n]},this.isDynamicMode=()=>this.measureElementCache.size>0,this.cancelScrollToIndex=()=>{this.scrollToIndexTimeoutId!==null&&(clearTimeout(this.scrollToIndexTimeoutId),this.scrollToIndexTimeoutId=null)},this.scrollToOffset=(e,{align:n="start",behavior:t}={})=>{this.cancelScrollToIndex(),t==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.getOffsetForAlignment(e,n),{adjustments:void 0,behavior:t})},this.scrollToIndex=(e,{align:n="auto",behavior:t}={})=>{e=Math.max(0,Math.min(e,this.options.count-1)),this.cancelScrollToIndex(),t==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size.");const[s,u]=this.getOffsetForIndex(e,n);this._scrollToOffset(s,{adjustments:void 0,behavior:t}),t!=="smooth"&&this.isDynamicMode()&&(this.scrollToIndexTimeoutId=setTimeout(()=>{if(this.scrollToIndexTimeoutId=null,this.measureElementCache.has(this.options.getItemKey(e))){const[v]=this.getOffsetForIndex(e,u);Ye(v,this.scrollOffset)||this.scrollToIndex(e,{align:u,behavior:t})}else this.scrollToIndex(e,{align:u,behavior:t})}))},this.scrollBy=(e,{behavior:n}={})=>{this.cancelScrollToIndex(),n==="smooth"&&this.isDynamicMode()&&console.warn("The `smooth` scroll behavior is not fully supported with dynamic size."),this._scrollToOffset(this.scrollOffset+e,{adjustments:void 0,behavior:n})},this.getTotalSize=()=>{var e;const n=this.getMeasurements();let t;return n.length===0?t=this.options.paddingStart:t=this.options.lanes===1?((e=n[n.length-1])==null?void 0:e.end)??0:Math.max(...n.slice(-this.options.lanes).map(s=>s.end)),t-this.options.scrollMargin+this.options.paddingEnd},this._scrollToOffset=(e,{adjustments:n,behavior:t})=>{this.options.scrollToFn(e,{behavior:t,adjustments:n},this)},this.measure=()=>{this.itemSizeCache=new Map,this.notify(!1)},this.setOptions(a),this.scrollRect=this.options.initialRect,this.scrollOffset=typeof this.options.initialOffset=="function"?this.options.initialOffset():this.options.initialOffset,this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(e=>{this.itemSizeCache.set(e.key,e.size)}),this.maybeNotify()}}const pe=(o,a,e,n)=>{for(;o<=a;){const t=(o+a)/2|0,s=e(t);if(s<n)o=t+1;else if(s>n)a=t-1;else return t}return o>0?o-1:0};function it({measurements:o,outerSize:a,scrollOffset:e}){const n=o.length-1,s=pe(0,n,l=>o[l].start,e);let u=s;for(;u<n&&o[u].end<e+a;)u++;return{startIndex:s,endIndex:u}}function at(o){const a=new st(z(o)),e=_e(a),n=a._didMount();return K(()=>z(o).getScrollElement(),t=>{t&&a._willUpdate()},{immediate:!0}),K(()=>z(o),t=>{a.setOptions({...t,onChange:(s,u)=>{var l;ae(e),(l=t.onChange)==null||l.call(t,s,u)}}),a._willUpdate(),ae(e)},{immediate:!0}),Ie(n),e}function rt(o){return at(y(()=>({observeElementRect:tt,observeElementOffset:lt,scrollToFn:nt,...z(o)})))}function ut(o,a,e){let n=P(e==null?void 0:e.value),t=y(()=>o.value!==void 0);return[y(()=>t.value?o.value:n.value),function(s){return t.value||(n.value=s),a==null?void 0:a(s)}]}function be(o={},a=null,e=[]){for(let[n,t]of Object.entries(o))xe(e,ge(a,n),t);return e}function ge(o,a){return o?o+"["+a+"]":a}function xe(o,a,e){if(Array.isArray(e))for(let[n,t]of e.entries())xe(o,ge(a,n.toString()),t);else e instanceof Date?o.push([a,e.toISOString()]):typeof e=="boolean"?o.push([a,e?"1":"0"]):typeof e=="string"?o.push([a,e]):typeof e=="number"?o.push([a,`${e}`]):e==null?o.push([a,""]):be(e,a,o)}var dt={};function ct(o,a){return o===a}var vt=(o=>(o[o.Open=0]="Open",o[o.Closed=1]="Closed",o))(vt||{}),ft=(o=>(o[o.Single=0]="Single",o[o.Multi=1]="Multi",o))(ft||{}),mt=(o=>(o[o.Pointer=0]="Pointer",o[o.Focus=1]="Focus",o[o.Other=2]="Other",o))(mt||{});let ye=Symbol("ComboboxContext");function W(o){let a=me(ye,null);if(a===null){let e=new Error(`<${o} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(e,W),e}return a}let Se=Symbol("VirtualContext"),ht=H({name:"VirtualProvider",setup(o,{slots:a}){let e=W("VirtualProvider"),n=y(()=>{let l=w(e.optionsRef);if(!l)return{start:0,end:0};let v=window.getComputedStyle(l);return{start:parseFloat(v.paddingBlockStart||v.paddingTop),end:parseFloat(v.paddingBlockEnd||v.paddingBottom)}}),t=rt(y(()=>({scrollPaddingStart:n.value.start,scrollPaddingEnd:n.value.end,count:e.virtual.value.options.length,estimateSize(){return 40},getScrollElement(){return w(e.optionsRef)},overscan:12}))),s=y(()=>{var l;return(l=e.virtual.value)==null?void 0:l.options}),u=P(0);return K([s],()=>{u.value+=1}),ve(Se,e.virtual.value?t:null),()=>[Q("div",{style:{position:"relative",width:"100%",height:`${t.value.getTotalSize()}px`},ref:l=>{if(l){if(typeof process<"u"&&dt.JEST_WORKER_ID!==void 0||e.activationTrigger.value===0)return;e.activeOptionIndex.value!==null&&e.virtual.value.options.length>e.activeOptionIndex.value&&t.value.scrollToIndex(e.activeOptionIndex.value)}}},t.value.getVirtualItems().map(l=>ke(a.default({option:e.virtual.value.options[l.index],open:e.comboboxState.value===0})[0],{key:`${u.value}-${l.index}`,"data-index":l.index,"aria-setsize":e.virtual.value.options.length,"aria-posinset":l.index+1,style:{position:"absolute",top:0,left:0,transform:`translateY(${l.start}px)`,overflowAnchor:"none"}})))]}}),pt=H({name:"Combobox",emits:{"update:modelValue":o=>!0},props:{as:{type:[Object,String],default:"template"},disabled:{type:[Boolean],default:!1},by:{type:[String,Function],nullable:!0,default:null},modelValue:{type:[Object,String,Number,Boolean],default:void 0},defaultValue:{type:[Object,String,Number,Boolean],default:void 0},form:{type:String,optional:!0},name:{type:String,optional:!0},nullable:{type:Boolean,default:!1},multiple:{type:[Boolean],default:!1},immediate:{type:[Boolean],default:!1},virtual:{type:Object,default:null}},inheritAttrs:!1,setup(o,{slots:a,attrs:e,emit:n}){let t=P(1),s=P(null),u=P(null),l=P(null),v=P(null),h=P({static:!1,hold:!1}),p=P([]),m=P(null),k=P(2),T=P(!1);function E(r=f=>f){let f=m.value!==null?p.value[m.value]:null,g=r(p.value.slice()),x=g.length>0&&g[0].dataRef.order.value!==null?g.sort((C,B)=>C.dataRef.order.value-B.dataRef.order.value):Xe(g,C=>w(C.dataRef.domRef)),I=f?x.indexOf(f):null;return I===-1&&(I=null),{options:x,activeOptionIndex:I}}let V=y(()=>o.multiple?1:0),A=y(()=>o.nullable),[b,S]=ut(y(()=>o.modelValue),r=>n("update:modelValue",r),y(()=>o.defaultValue)),$=y(()=>b.value===void 0?q(V.value,{1:[],0:void 0}):b.value),d=null,_=null;function O(r){return q(V.value,{0(){return S==null?void 0:S(r)},1:()=>{let f=L(i.value.value).slice(),g=L(r),x=f.findIndex(I=>i.compare(g,L(I)));return x===-1?f.push(g):f.splice(x,1),S==null?void 0:S(f)}})}let R=y(()=>{});K([R],([r],[f])=>{if(i.virtual.value&&r&&f&&m.value!==null){let g=r.indexOf(f[m.value]);g!==-1?m.value=g:m.value=null}});let i={comboboxState:t,value:$,mode:V,compare(r,f){if(typeof o.by=="string"){let g=o.by;return(r==null?void 0:r[g])===(f==null?void 0:f[g])}return o.by===null?ct(r,f):o.by(r,f)},calculateIndex(r){return i.virtual.value?o.by===null?i.virtual.value.options.indexOf(r):i.virtual.value.options.findIndex(f=>i.compare(f,r)):p.value.findIndex(f=>i.compare(f.dataRef.value,r))},defaultValue:y(()=>o.defaultValue),nullable:A,immediate:y(()=>!1),virtual:y(()=>null),inputRef:u,labelRef:s,buttonRef:l,optionsRef:v,disabled:y(()=>o.disabled),options:p,change(r){S(r)},activeOptionIndex:y(()=>{if(T.value&&m.value===null&&(i.virtual.value?i.virtual.value.options.length>0:p.value.length>0)){if(i.virtual.value){let f=i.virtual.value.options.findIndex(g=>{var x;return!((x=i.virtual.value)!=null&&x.disabled(g))});if(f!==-1)return f}let r=p.value.findIndex(f=>!f.dataRef.disabled);if(r!==-1)return r}return m.value}),activationTrigger:k,optionsPropsRef:h,closeCombobox(){T.value=!1,!o.disabled&&t.value!==1&&(t.value=1,m.value=null)},openCombobox(){if(T.value=!0,!o.disabled&&t.value!==0){if(i.value.value){let r=i.calculateIndex(i.value.value);r!==-1&&(m.value=r)}t.value=0}},setActivationTrigger(r){k.value=r},goToOption(r,f,g){T.value=!1,d!==null&&cancelAnimationFrame(d),d=requestAnimationFrame(()=>{if(o.disabled||v.value&&!h.value.static&&t.value===1)return;if(i.virtual.value){m.value=r===F.Specific?f:ue({focus:r},{resolveItems:()=>i.virtual.value.options,resolveActiveIndex:()=>{var C,B;return(B=(C=i.activeOptionIndex.value)!=null?C:i.virtual.value.options.findIndex(te=>{var J;return!((J=i.virtual.value)!=null&&J.disabled(te))}))!=null?B:null},resolveDisabled:C=>i.virtual.value.disabled(C),resolveId(){throw new Error("Function not implemented.")}}),k.value=g??2;return}let x=E();if(x.activeOptionIndex===null){let C=x.options.findIndex(B=>!B.dataRef.disabled);C!==-1&&(x.activeOptionIndex=C)}let I=r===F.Specific?f:ue({focus:r},{resolveItems:()=>x.options,resolveActiveIndex:()=>x.activeOptionIndex,resolveId:C=>C.id,resolveDisabled:C=>C.dataRef.disabled});m.value=I,k.value=g??2,p.value=x.options})},selectOption(r){let f=p.value.find(x=>x.id===r);if(!f)return;let{dataRef:g}=f;O(g.value)},selectActiveOption(){if(i.activeOptionIndex.value!==null){if(i.virtual.value)O(i.virtual.value.options[i.activeOptionIndex.value]);else{let{dataRef:r}=p.value[i.activeOptionIndex.value];O(r.value)}i.goToOption(F.Specific,i.activeOptionIndex.value)}},registerOption(r,f){let g=we({id:r,dataRef:f});if(i.virtual.value){p.value.push(g);return}_&&cancelAnimationFrame(_);let x=E(I=>(I.push(g),I));m.value===null&&i.isSelected(f.value.value)&&(x.activeOptionIndex=x.options.indexOf(g)),p.value=x.options,m.value=x.activeOptionIndex,k.value=2,x.options.some(I=>!w(I.dataRef.domRef))&&(_=requestAnimationFrame(()=>{let I=E();p.value=I.options,m.value=I.activeOptionIndex}))},unregisterOption(r,f){if(d!==null&&cancelAnimationFrame(d),f&&(T.value=!0),i.virtual.value){p.value=p.value.filter(x=>x.id!==r);return}let g=E(x=>{let I=x.findIndex(C=>C.id===r);return I!==-1&&x.splice(I,1),x});p.value=g.options,m.value=g.activeOptionIndex,k.value=2},isSelected(r){return q(V.value,{0:()=>i.compare(L(i.value.value),L(r)),1:()=>L(i.value.value).some(f=>i.compare(L(f),L(r)))})},isActive(r){return m.value===i.calculateIndex(r)}};Be([u,l,v],()=>i.closeCombobox(),y(()=>t.value===0)),ve(ye,i),je(y(()=>q(t.value,{0:Y.Open,1:Y.Closed})));let M=y(()=>{var r;return(r=w(u))==null?void 0:r.closest("form")});return ne(()=>{K([M],()=>{if(!M.value||o.defaultValue===void 0)return;function r(){i.change(o.defaultValue)}return M.value.addEventListener("reset",r),()=>{var f;(f=M.value)==null||f.removeEventListener("reset",r)}},{immediate:!0})}),()=>{var r,f,g;let{name:x,disabled:I,form:C,...B}=o,te={open:t.value===0,disabled:I,activeIndex:i.activeOptionIndex.value,activeOption:i.activeOptionIndex.value===null?null:i.virtual.value?i.virtual.value.options[(r=i.activeOptionIndex.value)!=null?r:0]:(g=(f=i.options.value[i.activeOptionIndex.value])==null?void 0:f.dataRef.value)!=null?g:null,value:$.value};return Q(fe,[...x!=null&&$.value!=null?be({[x]:$.value}).map(([J,Oe])=>Q(qe,Ge({features:He.Hidden,key:J,as:"input",type:"hidden",hidden:!0,readOnly:!0,form:C,name:J,value:Oe}))):[],ee({theirProps:{...e,...ie(B,["by","defaultValue","immediate","modelValue","multiple","nullable","onUpdate:modelValue","virtual"])},ourProps:{},slot:te,slots:a,attrs:e,name:"Combobox"})])}}}),bt=H({name:"ComboboxInput",props:{as:{type:[Object,String],default:"input"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},displayValue:{type:Function},defaultValue:{type:String,default:void 0},id:{type:String,default:null}},emits:{change:o=>!0},setup(o,{emit:a,attrs:e,slots:n,expose:t}){var s;let u=(s=o.id)!=null?s:`headlessui-combobox-input-${se()}`,l=W("ComboboxInput"),v=y(()=>Qe(w(l.inputRef))),h={value:!1};t({el:l.inputRef,$el:l.inputRef});function p(){l.change(null);let d=w(l.optionsRef);d&&(d.scrollTop=0),l.goToOption(F.Nothing)}let m=y(()=>{var d;let _=l.value.value;return w(l.inputRef)?typeof o.displayValue<"u"&&_!==void 0?(d=o.displayValue(_))!=null?d:"":typeof _=="string"?_:"":""});ne(()=>{K([m,l.comboboxState,v],([d,_],[O,R])=>{if(h.value)return;let i=w(l.inputRef);i&&((R===0&&_===1||d!==O)&&(i.value=d),requestAnimationFrame(()=>{var M;if(h.value||!i||((M=v.value)==null?void 0:M.activeElement)!==i)return;let{selectionStart:r,selectionEnd:f}=i;Math.abs((f??0)-(r??0))===0&&r===0&&i.setSelectionRange(i.value.length,i.value.length)}))},{immediate:!0}),K([l.comboboxState],([d],[_])=>{if(d===0&&_===1){if(h.value)return;let O=w(l.inputRef);if(!O)return;let R=O.value,{selectionStart:i,selectionEnd:M,selectionDirection:r}=O;O.value="",O.value=R,r!==null?O.setSelectionRange(i,M,r):O.setSelectionRange(i,M)}})});let k=P(!1);function T(){k.value=!0}function E(){ce().nextFrame(()=>{k.value=!1})}function V(d){switch(h.value=!0,d.key){case N.Enter:if(h.value=!1,l.comboboxState.value!==0||k.value)return;if(d.preventDefault(),d.stopPropagation(),l.activeOptionIndex.value===null){l.closeCombobox();return}l.selectActiveOption(),l.mode.value===0&&l.closeCombobox();break;case N.ArrowDown:return h.value=!1,d.preventDefault(),d.stopPropagation(),q(l.comboboxState.value,{0:()=>l.goToOption(F.Next),1:()=>l.openCombobox()});case N.ArrowUp:return h.value=!1,d.preventDefault(),d.stopPropagation(),q(l.comboboxState.value,{0:()=>l.goToOption(F.Previous),1:()=>{l.openCombobox(),he(()=>{l.value.value||l.goToOption(F.Last)})}});case N.Home:if(d.shiftKey)break;return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(F.First);case N.PageUp:return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(F.First);case N.End:if(d.shiftKey)break;return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(F.Last);case N.PageDown:return h.value=!1,d.preventDefault(),d.stopPropagation(),l.goToOption(F.Last);case N.Escape:if(h.value=!1,l.comboboxState.value!==0)return;d.preventDefault(),l.optionsRef.value&&!l.optionsPropsRef.value.static&&d.stopPropagation(),l.nullable.value&&l.mode.value===0&&l.value.value===null&&p(),l.closeCombobox();break;case N.Tab:if(h.value=!1,l.comboboxState.value!==0)return;l.mode.value===0&&l.activationTrigger.value!==1&&l.selectActiveOption(),l.closeCombobox();break}}function A(d){a("change",d),l.nullable.value&&l.mode.value===0&&d.target.value===""&&p(),l.openCombobox()}function b(d){var _,O,R;let i=(_=d.relatedTarget)!=null?_:de.find(M=>M!==d.currentTarget);if(h.value=!1,!((O=w(l.optionsRef))!=null&&O.contains(i))&&!((R=w(l.buttonRef))!=null&&R.contains(i))&&l.comboboxState.value===0)return d.preventDefault(),l.mode.value===0&&(l.nullable.value&&l.value.value===null?p():l.activationTrigger.value!==1&&l.selectActiveOption()),l.closeCombobox()}function S(d){var _,O,R;let i=(_=d.relatedTarget)!=null?_:de.find(M=>M!==d.currentTarget);(O=w(l.buttonRef))!=null&&O.contains(i)||(R=w(l.optionsRef))!=null&&R.contains(i)||l.disabled.value||l.immediate.value&&l.comboboxState.value!==0&&(l.openCombobox(),ce().nextFrame(()=>{l.setActivationTrigger(1)}))}let $=y(()=>{var d,_,O,R;return(R=(O=(_=o.defaultValue)!=null?_:l.defaultValue.value!==void 0?(d=o.displayValue)==null?void 0:d.call(o,l.defaultValue.value):null)!=null?O:l.defaultValue.value)!=null?R:""});return()=>{var d,_,O,R,i,M,r;let f={open:l.comboboxState.value===0},{displayValue:g,onChange:x,...I}=o,C={"aria-controls":(d=l.optionsRef.value)==null?void 0:d.id,"aria-expanded":l.comboboxState.value===0,"aria-activedescendant":l.activeOptionIndex.value===null?void 0:l.virtual.value?(_=l.options.value.find(B=>!l.virtual.value.disabled(B.dataRef.value)&&l.compare(B.dataRef.value,l.virtual.value.options[l.activeOptionIndex.value])))==null?void 0:_.id:(O=l.options.value[l.activeOptionIndex.value])==null?void 0:O.id,"aria-labelledby":(M=(R=w(l.labelRef))==null?void 0:R.id)!=null?M:(i=w(l.buttonRef))==null?void 0:i.id,"aria-autocomplete":"list",id:u,onCompositionstart:T,onCompositionend:E,onKeydown:V,onInput:A,onFocus:S,onBlur:b,role:"combobox",type:(r=e.type)!=null?r:"text",tabIndex:0,ref:l.inputRef,defaultValue:$.value,disabled:l.disabled.value===!0?!0:void 0};return ee({ourProps:C,theirProps:I,slot:f,attrs:e,slots:n,features:Z.RenderStrategy|Z.Static,name:"ComboboxInput"})}}}),gt=H({name:"ComboboxOptions",props:{as:{type:[Object,String],default:"ul"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},hold:{type:[Boolean],default:!1}},setup(o,{attrs:a,slots:e,expose:n}){let t=W("ComboboxOptions"),s=`headlessui-combobox-options-${se()}`;n({el:t.optionsRef,$el:t.optionsRef}),X(()=>{t.optionsPropsRef.value.static=o.static}),X(()=>{t.optionsPropsRef.value.hold=o.hold});let u=Ne(),l=y(()=>u!==null?(u.value&Y.Open)===Y.Open:t.comboboxState.value===0);return Ke({container:y(()=>w(t.optionsRef)),enabled:y(()=>t.comboboxState.value===0),accept(v){return v.getAttribute("role")==="option"?NodeFilter.FILTER_REJECT:v.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(v){v.setAttribute("role","none")}}),()=>{var v,h,p;let m={open:t.comboboxState.value===0},k={"aria-labelledby":(p=(v=w(t.labelRef))==null?void 0:v.id)!=null?p:(h=w(t.buttonRef))==null?void 0:h.id,id:s,ref:t.optionsRef,role:"listbox","aria-multiselectable":t.mode.value===1?!0:void 0},T=ie(o,["hold"]);return ee({ourProps:k,theirProps:T,slot:m,attrs:a,slots:t.virtual.value&&t.comboboxState.value===0?{...e,default:()=>[Q(ht,{},e.default)]}:e,features:Z.RenderStrategy|Z.Static,visible:l.value,name:"ComboboxOptions"})}}}),xt=H({name:"ComboboxOption",props:{as:{type:[Object,String],default:"li"},value:{type:[Object,String,Number,Boolean]},disabled:{type:Boolean,default:!1},order:{type:[Number],default:null}},setup(o,{slots:a,attrs:e,expose:n}){let t=W("ComboboxOption"),s=`headlessui-combobox-option-${se()}`,u=P(null);n({el:u,$el:u});let l=y(()=>{var b;return t.virtual.value?t.activeOptionIndex.value===t.calculateIndex(o.value):t.activeOptionIndex.value===null?!1:((b=t.options.value[t.activeOptionIndex.value])==null?void 0:b.id)===s}),v=y(()=>t.isSelected(o.value)),h=me(Se,null),p=y(()=>({disabled:o.disabled,value:o.value,domRef:u,order:y(()=>o.order)}));ne(()=>t.registerOption(s,p)),Ce(()=>t.unregisterOption(s,l.value)),X(()=>{let b=w(u);b&&(h==null||h.value.measureElement(b))}),X(()=>{t.comboboxState.value===0&&l.value&&(t.virtual.value||t.activationTrigger.value!==0&&he(()=>{var b,S;return(S=(b=w(u))==null?void 0:b.scrollIntoView)==null?void 0:S.call(b,{block:"nearest"})}))});function m(b){var S;if(o.disabled||(S=t.virtual.value)!=null&&S.disabled(o.value))return b.preventDefault();t.selectOption(s),Le()||requestAnimationFrame(()=>{var $;return($=w(t.inputRef))==null?void 0:$.focus({preventScroll:!0})}),t.mode.value===0&&requestAnimationFrame(()=>t.closeCombobox())}function k(){var b;if(o.disabled||(b=t.virtual.value)!=null&&b.disabled(o.value))return t.goToOption(F.Nothing);let S=t.calculateIndex(o.value);t.goToOption(F.Specific,S)}let T=Ue();function E(b){T.update(b)}function V(b){var S;if(!T.wasMoved(b)||o.disabled||(S=t.virtual.value)!=null&&S.disabled(o.value)||l.value)return;let $=t.calculateIndex(o.value);t.goToOption(F.Specific,$,0)}function A(b){var S;T.wasMoved(b)&&(o.disabled||(S=t.virtual.value)!=null&&S.disabled(o.value)||l.value&&(t.optionsPropsRef.value.hold||t.goToOption(F.Nothing)))}return()=>{let{disabled:b}=o,S={active:l.value,selected:v.value,disabled:b},$={id:s,ref:u,role:"option",tabIndex:b===!0?void 0:-1,"aria-disabled":b===!0?!0:void 0,"aria-selected":v.value,disabled:void 0,onClick:m,onFocus:k,onPointerenter:E,onMouseenter:E,onPointermove:V,onMousemove:V,onPointerleave:A,onMouseleave:A},d=ie(o,["order","value"]);return ee({ourProps:$,theirProps:d,slot:S,attrs:e,slots:a,name:"ComboboxOption"})}}});const yt={class:"border-muted-200 dark:border-muted-700 dark:bg-muted-800 border bg-white"},St={class:"flex h-16 w-full items-center justify-between px-10"},Ot=c("h2",{class:"font-heading text-muted-700 text-lg font-semibold dark:text-white"}," Search ",-1),_t={class:"relative h-[calc(100dvh_-_64px)] w-full px-10"},It={class:"group relative"},wt={class:"text-muted-400 group-focus-within:text-primary-500 absolute start-0 top-0 flex size-12 items-center justify-center transition-colors duration-300"},Ct={key:0,class:"text-muted-700 relative cursor-default select-none px-4 py-2"},kt={class:"hover:bg-muted-100 dark:hover:bg-muted-700 flex cursor-pointer items-center rounded-lg p-2 transition-colors duration-300"},Tt={class:"relative inline-flex size-9 items-center justify-center rounded-full"},Et=["src"],Rt={class:"ms-3"},Mt={class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"},zt={class:"text-muted-400 font-sans text-xs"},Pt={class:"py-6"},Dt=c("h4",{class:"font-alt text-muted-400 mb-4 text-sm font-semibold uppercase"}," People ",-1),Ft={class:"space-y-4"},Vt=c("div",{class:"relative inline-flex size-9 items-center justify-center rounded-full"},[c("img",{src:Ve,class:"max-w-full rounded-full object-cover shadow-sm dark:border-transparent",alt:""})],-1),$t=c("div",{class:"ms-3"},[c("h6",{class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"}," Mike Miller "),c("p",{class:"text-muted-400 font-sans text-xs"}," Frontend Developer ")],-1),At=c("div",{class:"relative inline-flex size-9 items-center justify-center rounded-full"},[c("img",{src:$e,class:"max-w-full rounded-full object-cover shadow-sm dark:border-transparent",alt:""})],-1),Bt=c("div",{class:"ms-3"},[c("h6",{class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"}," John Sabierski "),c("p",{class:"text-muted-400 font-sans text-xs"}," Backend Developer ")],-1),jt=c("div",{class:"relative inline-flex size-9 items-center justify-center rounded-full"},[c("img",{src:Ae,class:"max-w-full rounded-full object-cover shadow-sm dark:border-transparent",alt:""})],-1),Nt=c("div",{class:"ms-3"},[c("h6",{class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"}," Ronald Cardine "),c("p",{class:"text-muted-400 font-sans text-xs"}," Frontend Developer ")],-1),Lt={class:"py-6"},Kt=c("h4",{class:"font-alt text-muted-400 mb-4 text-sm font-semibold uppercase"}," Recent ",-1),Ut={class:"space-y-4"},qt={class:"dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500"},Ht=c("div",{class:"ms-3"},[c("h6",{class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"}," Browser Support "),c("p",{class:"text-muted-400 font-sans text-xs"}," Blog article ")],-1),Jt={class:"bg-warning-100 text-warning-600 dark:bg-warning-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full"},Wt=c("div",{class:"ms-3"},[c("h6",{class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"}," Twitch new API "),c("p",{class:"text-muted-400 font-sans text-xs"}," Blog article ")],-1),Gt={class:"bg-primary-100 text-primary-600 dark:bg-primary-500 dark:text-muted-50 relative inline-flex size-10 items-center justify-center rounded-full"},Qt=c("div",{class:"ms-3"},[c("h6",{class:"font-heading text-muted-800 text-sm font-semibold dark:text-white"}," Social integrations "),c("p",{class:"text-muted-400 font-sans text-xs"}," Blog article ")],-1),sl=H({__name:"DemoPanelSearch",setup(o){const{close:a}=Te();Ee("Escape",a);const e=[{id:1,name:"Clarissa Perez",role:"Sales Manager",avatar:"/img/avatars/19.svg"},{id:2,name:"Aaaron Splatter",role:"Project Manager",avatar:"/img/avatars/16.svg"},{id:3,name:"Mike Miller",role:"UI/UX Designer",avatar:"/img/avatars/3.svg"},{id:4,name:"Benedict Kessler",role:"Mobile Developer",avatar:"/img/avatars/22.svg"},{id:5,name:"Maya Rosselini",role:"Product Manager",avatar:"/img/avatars/2.svg"}],n=P(""),t=P(""),s=y(()=>t.value===""?e:e.filter(l=>l.name.toLowerCase().includes(t.value.toLowerCase()))),u=P(null);return(l,v)=>{const h=De,p=Fe;return G(),le("div",yt,[D(z(Je),{"initial-focus":z(u)},{default:j(()=>[c("div",St,[Ot,c("button",{type:"button",class:"text-muted-400 nui-focus hover:bg-muted-100 focus:bg-muted-100 hover:text-muted-600 focus:text-muted-600 dark:hover:bg-muted-700 dark:focus:bg-muted-700 flex size-10 items-center justify-center rounded-full transition-colors duration-300 dark:hover:text-white dark:focus:text-white",onClick:v[0]||(v[0]=(...m)=>z(a)&&z(a)(...m))},[D(h,{name:"feather:chevron-left",class:"size-6"})])]),c("div",_t,[D(z(pt),{modelValue:z(n),"onUpdate:modelValue":v[3]||(v[3]=m=>Re(n)?n.value=m:null),class:"relative z-10 mt-5",as:"div"},{default:j(()=>[c("div",It,[D(z(bt),{ref_key:"comboInput",ref:u,class:"border-muted-300 text-muted-600 focus:border-primary-500 focus:shadow-muted-300/50 dark:border-muted-700 dark:bg-muted-800 dark:text-muted-200 dark:placeholder:text-muted-600 dark:focus:border-muted-600 dark:focus:shadow-muted-800/50 h-12 w-full rounded-lg border bg-white py-3 pe-4 ps-10 font-sans text-sm leading-5 !outline-none transition duration-300 focus:shadow-lg","display-value":m=>m.name,placeholder:"Search...",onChange:v[1]||(v[1]=m=>t.value=m.target.value)},null,8,["display-value"]),c("div",wt,[D(h,{name:"feather:search",class:"size-5"})])]),D(z(We),{leave:"transition ease-in duration-100","leave-from":"opacity-100","leave-to":"opacity-0",onAfterLeave:v[2]||(v[2]=m=>t.value="")},{default:j(()=>[D(z(gt),{as:"div",class:"nui-slimscroll divide-muted-100 border-muted-200 dark:divide-muted-700 dark:border-muted-700 dark:bg-muted-800 absolute mt-1 max-h-60 w-full divide-y overflow-auto rounded-lg border bg-white py-1 text-base shadow-lg outline-none sm:text-sm"},{default:j(()=>[z(s).length===0&&z(t)!==""?(G(),le("div",Ct," Nothing found. ")):Me("",!0),(G(!0),le(fe,null,ze(z(s),m=>(G(),Pe(z(xt),{key:m.id,class:"p-2",as:"div",value:m},{default:j(()=>[c("div",kt,[c("div",Tt,[c("img",{src:m.avatar,class:"max-w-full rounded-full object-cover shadow-sm dark:border-transparent",alt:""},null,8,Et)]),c("div",Rt,[c("h6",Mt,re(m.name),1),c("p",zt,re(m.role),1)])])]),_:2},1032,["value"]))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"]),c("div",Pt,[Dt,c("ul",Ft,[c("li",null,[D(p,{to:"#",class:"flex items-center"},{default:j(()=>[Vt,$t]),_:1})]),c("li",null,[D(p,{to:"#",class:"flex items-center"},{default:j(()=>[At,Bt]),_:1})]),c("li",null,[D(p,{to:"#",class:"flex items-center"},{default:j(()=>[jt,Nt]),_:1})])])]),c("div",Lt,[Kt,c("ul",Ut,[c("li",null,[D(p,{to:"#",class:"flex items-center"},{default:j(()=>[c("div",qt,[D(h,{name:"feather:chrome",class:""})]),Ht]),_:1})]),c("li",null,[D(p,{to:"#",class:"flex items-center"},{default:j(()=>[c("div",Jt,[D(h,{name:"feather:tv",class:""})]),Wt]),_:1})]),c("li",null,[D(p,{to:"#",class:"flex items-center"},{default:j(()=>[c("div",Gt,[D(h,{name:"feather:twitter",class:""})]),Qt]),_:1})])])])])]),_:1},8,["initial-focus"])])}}});export{sl as default};