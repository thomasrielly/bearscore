import{d as f,f as u,N as d,L as i,c as b}from"./BdTB-59g.js";const m=Symbol.for("nuxt:client-only"),h=f({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(k,{slots:e,attrs:c}){const l=u(!1);return d(()=>{l.value=!0}),i(m,!0),a=>{var t;if(l.value)return(t=e.default)==null?void 0:t.call(e);const n=e.fallback||e.placeholder;if(n)return n();const r=a.fallback||a.placeholder||"",o=a.fallbackTag||a.placeholderTag||"span";return b(o,c,r)}}});export{h as _};
