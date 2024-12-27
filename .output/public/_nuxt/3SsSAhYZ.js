import{d as w,f as g,a4 as B,o as f,c as y,a as d,h as b,a5 as v,i as T,j as e,w as s,A as C,a6 as k,C as $,a7 as j,E as N,a1 as P,V as Z,O as V,a8 as D,g as t,k as a,t as c,a9 as L,m as S,_ as E}from"./BdTB-59g.js";import{_ as H}from"./27bQY4ce.js";import{_ as I}from"./DcI7UQCK.js";import{_ as O}from"./gkZ7sznU.js";import{u as M}from"./BHAjzfTM.js";import"./BL69-MhK.js";const R=w({__name:"AddonApexcharts",props:{type:{},height:{},width:{},series:{},options:{}},setup(x){const m=x,{LazyApexCharts:_,isLoaded:p}=useLazyApexCharts(),h=g(null),o=g(!1),{stop:r}=B(h,([{isIntersecting:l}])=>{l&&(o.value=l,r())});return(l,u)=>{const i=N,n=O;return f(),y("div",{ref_key:"target",ref:h},[!d(p)&&!d(o)?(f(),b(i,{key:0,class:"m-4 w-[calc(100%-32px)]",style:v({height:`${l.height-32}px`})},null,8,["style"])):T("",!0),e(n,null,{default:s(()=>[d(o)?C((f(),b(d(_),k($({key:0},m)),null,16)),[[j,d(p)]]):(f(),b(i,{key:1,class:"m-4 w-[calc(100%-32px)]",style:v({height:`${l.height-32}px`})},null,8,["style"]))]),_:1})],512)}}}),F={class:"border-muted-200 dark:border-muted-700 dark:bg-muted-800 border-l bg-white"},K={class:"border-muted-200 dark:border-muted-700 flex h-20 w-full items-center justify-between border-b px-6"},X={class:"nui-slimscroll relative h-[calc(100dvh_-_5rem)] w-full overflow-y-auto overflow-x-hidden p-6"},Y={class:"flex items-center justify-between"},q={class:"py-6 pe-4 text-end"},G={class:"space-y-4 py-6 pe-4"},J={class:"flex items-center justify-between"},Q={class:"flex items-center gap-2"},U=t("div",{class:"bg-muted-500 size-2 rounded-full"},null,-1),W={class:"flex items-center justify-between"},ee={class:"flex items-center gap-2"},te=t("div",{class:"bg-muted-500 size-2 rounded-full"},null,-1),se={class:"flex items-center justify-between"},ae={class:"flex items-center gap-2"},oe=t("div",{class:"bg-muted-300 size-2 rounded-full"},null,-1),ie={class:"flex items-center justify-between"},ne={class:"flex items-center gap-2"},le=t("div",{class:"bg-muted-200 size-2 rounded-full"},null,-1),de={class:"-mt-6 p-4"},pe=w({__name:"DemoPanelAccount",props:{account:{default:void 0}},setup(x){const m=x,{close:_}=P();Z("Escape",_);const p=V(h());function h(){const{primary:o}=D(),r="area",l=250,u={chart:{zoom:{enabled:!1},toolbar:{show:!1}},dataLabels:{enabled:!1},stroke:{width:[2,2,2],curve:"smooth"},colors:[o.value],legend:{show:!1,position:"top"},grid:{show:!1,padding:{left:-10,right:0,bottom:10}},xaxis:{type:"datetime",categories:["2022-09-19T00:00:00.000Z","2022-09-20T01:30:00.000Z","2022-09-21T02:30:00.000Z","2022-09-22T03:30:00.000Z","2022-09-23T04:30:00.000Z","2022-09-24T05:30:00.000Z","2022-09-25T06:30:00.000Z"]},yaxis:{labels:{show:!1,offsetX:-15},axisBorder:{show:!1},axisTicks:{show:!1}},tooltip:{x:{format:"dd/MM/yy HH:mm"},y:{formatter:n=>`$${n}`}}},i=g(m.account.history);return{type:r,height:l,options:u,series:i}}return(o,r)=>{const l=S,u=E,i=H,n=I,z=R;return f(),y("div",F,[e(d(M),null,{default:s(()=>[t("div",K,[e(l,{as:"h3",size:"xs",weight:"semibold",class:"text-muted-500 dark:text-muted-100 uppercase"},{default:s(()=>[a(" Account Details ")]),_:1}),t("button",{type:"button",class:"nui-mask nui-mask-blob hover:bg-muted-100 focus:bg-muted-100 dark:hover:bg-muted-700 dark:focus:bg-muted-700 text-muted-700 dark:text-muted-400 flex size-10 cursor-pointer items-center justify-center outline-transparent transition-colors duration-300",onClick:r[0]||(r[0]=(...A)=>d(_)&&d(_)(...A))},[e(u,{name:"lucide:arrow-right",class:"size-4"})])]),t("div",X,[t("div",Y,[t("div",null,[e(l,{as:"h4",size:"lg",weight:"medium",class:"text-muted-800 dark:text-muted-100 capitalize"},{default:s(()=>[a(c(m.account.type)+" "+c(m.account.number),1)]),_:1}),e(i,{size:"sm",class:"text-muted-400"},{default:s(()=>[a(c(o.account.owner.name),1)]),_:1})]),t("div",q,[e(i,{size:"xs",class:"text-muted-400 mb-1"},{default:s(()=>[a(" Account balance ")]),_:1}),e(i,{size:"2xl",weight:"medium",class:"text-muted-800 dark:text-muted-100 mb-1"},{default:s(()=>[a(" $"+c(o.account.balance.toFixed(2)),1)]),_:1})])]),t("div",G,[t("div",J,[t("div",Q,[U,e(i,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[a(" Routing number ")]),_:1}),e(n,{"data-nui-tooltip":"The wire routing number"},{default:s(()=>[e(u,{name:"lucide:help-circle",class:"text-muted-400 size-3"})]),_:1})]),e(n,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[a(c(o.account.details.routingNumber),1)]),_:1})]),t("div",W,[t("div",ee,[te,e(i,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[a(" Account number ")]),_:1}),e(n,{"data-nui-tooltip":"Your full account number"},{default:s(()=>[e(u,{name:"lucide:help-circle",class:"text-muted-400 size-3"})]),_:1})]),e(n,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[a(c(o.account.details.accountNumber),1)]),_:1})]),t("div",se,[t("div",ae,[oe,e(i,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[a(" IBAN ")]),_:1}),e(n,{"data-nui-tooltip":"The international identifier"},{default:s(()=>[e(u,{name:"lucide:help-circle",class:"text-muted-400 size-3"})]),_:1})]),e(n,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[a(c(o.account.details.iban),1)]),_:1})]),t("div",ie,[t("div",ne,[le,e(i,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[a(" Bank code ")]),_:1})]),e(n,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[a(c(o.account.details.bankCode),1)]),_:1})])]),t("div",de,[e(z,k(L(d(p))),null,16)])])]),_:1})])}}});export{pe as default};
