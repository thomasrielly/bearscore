import{_ as z}from"./DPwofR4Z.js";import{_ as B}from"./DcI7UQCK.js";import{d as C,f as r,al as $,N as D,U as E,o as _,c as f,g as e,j as t,w as s,k as a,t as N,n as v,i as S,a2 as T,_ as V,m as j,p as A}from"./BdTB-59g.js";import{_ as I}from"./k5M_ZLJu.js";import{_ as L}from"./27bQY4ce.js";import"./AIR4ZCVe.js";import"./CHIkifRQ.js";const P={class:"flex w-full items-center gap-3 text-start"},U={key:0,class:"border-muted-200 dark:border-muted-800 dark:bg-muted-950 shadow-muted-400/10 dark:shadow-muted-800/10 absolute end-0 top-12 w-full min-w-[280px] overflow-hidden rounded-xl border bg-white shadow-xl md:start-0 md:min-w-[575px]"},W={class:"border-muted-200 dark:border-muted-700 flex items-center border-b"},F={class:"flex h-[calc(100%_-_2.5rem)] flex-col p-3"},H={class:"my-3"},K={class:"flex justify-between items-center"},M={type:"button",class:"border-muted-200 dark:border-muted-700 me-2 ms-auto rounded-lg border px-2 py-1"},O={class:"mt-auto"},q=e("span",null,"Create Demo",-1),te=C({__name:"DemoTopnavWorkspaceDropdown",setup(G){const x=r([{id:1,name:"Stripe",logo:"/img/logos/companies/stripe.svg"}]),d=r(x.value[0]),c=r(null),o=r(!1);function w(){o.value=!0}$(c,()=>o.value=!1);function i(m){m.key==="Escape"&&(o.value=!1)}return D(()=>{document.addEventListener("keydown",i)}),E(()=>{document.removeEventListener("keydown",i)}),(m,n)=>{const b=z,l=B,u=V,k=I,p=j,g=L,h=A;return _(),f("div",{ref_key:"target",ref:c,class:"group/workspace relative z-10 ms-auto w-full max-w-[170px] md:ms-0 md:max-w-[240px]"},[e("button",{type:"button",class:v(["group-hover/workspace:bg-muted-100 dark:group-hover/workspace:bg-muted-900/60 w-full max-w-[170px] rounded-xl py-2 pe-3 ps-2 transition-colors duration-300 md:max-w-[240px]",o.value&&"bg-muted-100 dark:bg-muted-900/60"]),onClick:n[0]||(n[0]=y=>w())},[e("span",P,[t(b,{size:"xxs",src:d.value.logo},null,8,["src"]),e("div",null,[t(l,{size:"sm",class:"text-muted-800 dark:text-muted-200 line-clamp-1 block"},{default:s(()=>[a(N(d.value.name),1)]),_:1})]),t(u,{name:"lucide:chevrons-up-down",class:v(["text-muted-400 ms-auto size-4 transition-transform duration-300",o.value&&"rotate-180"])},null,8,["class"])])],2),t(T,{"enter-active-class":"transition duration-100 ease-out","enter-from-class":"transform scale-95 opacity-0","enter-to-class":"transform scale-100 opacity-100","leave-active-class":"transition duration-75 ease-in","leave-from-class":"transform scale-100 opacity-100","leave-to-class":"transform scale-95 opacity-0"},{default:s(()=>[o.value?(_(),f("div",U,[e("div",null,[e("div",W,[t(k,{icon:"lucide:search",placeholder:"Find demo...",classes:{input:"border-none !outline-none !bg-transparent"}}),e("button",{type:"button",class:"border-muted-200 dark:border-muted-700 me-2 ms-auto rounded-lg border px-2 py-1",onClick:n[1]||(n[1]=y=>o.value=!1)},[t(l,{size:"xs"},{default:s(()=>[a(" Esc ")]),_:1})])]),e("div",F,[t(p,{as:"h4",size:"sm",weight:"medium",class:"text-muted-400"},{default:s(()=>[a(" Demos ")]),_:1}),e("div",H,[e("ul",null,[e("li",null,[e("div",K,[e("div",null,[t(p,{size:"sm",weight:"medium"},{default:s(()=>[a(" Stripe Payment Solutions ")]),_:1}),t(g,{size:"xs",class:"text-muted-400"},{default:s(()=>[a(" A payment solution for start-ups ")]),_:1})]),e("button",M,[t(l,{size:"xs"},{default:s(()=>[a(" Edit ")]),_:1})])])])])]),e("div",O,[t(h,{rounded:"md",class:"w-full"},{default:s(()=>[t(u,{name:"lucide:plus",class:"size-4"}),q]),_:1})])])])])):S("",!0)]),_:1})],512)}}});export{te as default};