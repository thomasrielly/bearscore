import{d as g,e as l,o,h as m,w as y,c as r,n as i,r as c,k as p,t,i as u,g as v,a as n,H as b}from"./BdTB-59g.js";const h=g({__name:"TairoTocAnchor",props:{label:{default:void 0},id:{default:void 0},level:{default:void 0},prefix:{default:"#"},prefixClasses:{default:"opacity-0 group-hover/toc:opacity-100 group-focus/toc:opacity-100 group-visible/toc:opacity-100 leading-6 text-primary-300 absolute -start-5 top-0"},suffix:{default:""},suffixClasses:{default:"opacity-0 group-hover/toc:opacity-100 group-focus/toc:opacity-100 group-visible/toc:opacity-100 leading-6 text-primary-300 absolute -end-5 -top-1"}},setup(f){const e=f,d=l(()=>e.label.toLowerCase().replace(/\s+/g,"-").replace(/[^\w-]+/g,"")),s=l(()=>e.id||d.value);return(a,C)=>{const x=b;return o(),m(x,{id:n(s),to:`#${n(s)}`,"data-toc-level":e.level,"data-toc-label":e.label,class:"tairo-toc-anchor nui-focus group/toc relative",style:{scrollMarginTop:"1.5rem"}},{default:y(()=>[e.prefix||"prefix"in a.$slots?(o(),r("span",{key:0,class:i(e.prefixClasses)},[c(a.$slots,"prefix",{},()=>[p(t(e.prefix),1)])],2)):u("",!0),v("span",null,t(e.label),1),e.suffix||"suffix"in a.$slots?(o(),r("span",{key:1,class:i(e.suffixClasses)},[c(a.$slots,"suffix",{},()=>[p(t(e.suffix),1)])],2)):u("",!0)]),_:3},8,["id","to","data-toc-level","data-toc-label"])}}});export{h as default};