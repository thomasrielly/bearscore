import{Y as F,d as z,o as c,c as v,g as e,t as i,j as t,n as y,a1 as B,V as D,f as P,e as S,w as s,k as d,a as n,h,i as b,F as I,l as V,m as N,_ as R,p as T,H as A}from"./BdTB-59g.js";import{_ as E}from"./27bQY4ce.js";import{_ as L}from"./BUkPELon.js";import{_ as U}from"./DcI7UQCK.js";import H from"./BZ9MYVZO.js";import{u as M}from"./BHAjzfTM.js";import"./BL69-MhK.js";const Y=F("/img/illustrations/card-chip.svg"),K={class:"flex h-full flex-col gap-3"},W=e("div",{class:"flex items-center gap-2"},[e("div",{class:"bg-muted-200 dark:bg-muted-700 size-2 rounded-full"}),e("span",{class:"text-muted-400 font-sans text-sm"}," Mastercard ")],-1),X={class:"mt-auto space-y-1"},q=e("img",{class:"mb-3 w-11",src:Y,alt:"Card chip",width:"44",height:"31"},null,-1),G={class:"font-heading text-muted-500 text-sm","x-text":"cardholder"},J={class:"font-heading text-muted-400 text-xs"},O={class:"font-heading text-muted-400 flex w-full items-center gap-2 text-xs"},Q={class:"flex items-center gap-2"},Z=e("span",null,"EXP",-1),ee={class:"flex items-center gap-2"},te=e("span",null,"CVC",-1),se=e("div",{class:"absolute end-5 top-4 flex"},[e("div",{class:"-me-2 size-9 rounded-full bg-rose-500/60"}),e("div",{class:"relative z-10 -ms-2 size-9 rounded-full bg-yellow-500/60"})],-1),de={class:"absolute bottom-7 end-5 flex"},ae=z({__name:"DemoCreditCardReal",props:{name:{default:"•••••• ••••••"},number:{default:"•••• •••• •••• ••••"},expiryYear:{default:"••"},expiryMonth:{default:"••"},cvc:{default:"•••"},centered:{type:Boolean,default:!0},contrast:{default:"low"}},setup(g){const o=g;return(x,u)=>{const w=H;return c(),v("div",{class:y(["border-muted-200 dark:border-muted-800 shadow-muted-400/10 dark:shadow-muted-800/10 relative h-[200px] w-full max-w-[315px] rounded-xl border bg-white p-6 shadow-xl",[o.centered?"mx-auto":"",o.contrast==="high"&&"dark:bg-muted-950",o.contrast==="low"&&"dark:bg-muted-900"]])},[e("div",K,[W,e("div",X,[q,e("div",null,[e("h5",G,i(o.name),1)]),e("div",null,[e("p",J,[e("span",null,i(o.number),1)])]),e("div",O,[e("div",Q,[Z,e("span",null,i(o.expiryMonth)+"/"+i(o.expiryYear),1)]),e("div",ee,[te,e("span",null,i(o.cvc),1)])])])]),se,e("div",de,[t(w,{class:"text-primary-500 size-10"})])],2)}}}),ie={class:"border-muted-200 dark:border-muted-700 dark:bg-muted-800 border-l bg-white"},le={class:"border-muted-200 dark:border-muted-700 flex h-20 w-full items-center justify-between border-b px-6"},oe={class:"nui-slimscroll relative h-[calc(100dvh_-_80px)] w-full overflow-y-auto p-6"},ne={class:"mb-3"},ue={class:"flex items-center justify-between"},re={class:"text-end"},ce={class:"pt-2"},me={class:"text-muted-500 dark:text-muted-400 flex w-full items-center justify-between"},_e={class:"flex items-center gap-1"},fe={key:0,class:"bg-muted-100 dark:bg-muted-900 rounded-xl p-6"},xe={class:"border-muted-200 dark:border-muted-700 mb-3 flex items-center justify-between border-b pb-3"},pe={class:"space-y-4"},he={class:"flex items-center justify-between"},be={class:"flex items-center gap-2"},ve=e("div",{class:"bg-muted-800 size-2 rounded-full"},null,-1),ge={"data-nui-tooltip":"Settled transactions"},we={class:"flex items-center justify-between"},ke={class:"flex items-center gap-2"},ze=e("div",{class:"bg-muted-500 size-2 rounded-full"},null,-1),ye={"data-nui-tooltip":"Unsettled transactions or temporary holds"},$e={class:"flex items-center justify-between"},Ce={class:"flex items-center gap-2"},je=e("div",{class:"bg-muted-300 size-2 rounded-full"},null,-1),Fe={"data-nui-tooltip":"Unavailable funds due to spend on other cards. Reach out for assistance."},Be={class:"flex items-center justify-between"},De={class:"flex items-center gap-2"},Pe=e("div",{class:"size-2 rounded-full bg-white"},null,-1),Se={class:"mt-4 w-full space-y-5"},Ie={class:"space-y-4 px-2"},Ve={class:"flex items-center justify-between gap-2"},Ne={class:"border-muted-200 dark:border-muted-700 border-t"},Re={class:"pt-6"},Te={class:"border-muted-200 dark:border-muted-700 border-t"},Ae={class:"space-y-4 py-6"},Ee={class:"flex items-center justify-between"},Le={class:"flex items-center justify-between"},Ue={class:"flex items-center justify-between"},He={class:"flex items-center justify-between"},Je=z({__name:"DemoPanelCard",props:{card:{default:void 0}},setup(g){const o=g,{close:x}=B();D("Escape",x);const u=P(!1),w=S(()=>{var a,m;return((a=o.card)==null?void 0:a.daySpent)/((m=o.card)==null?void 0:m.limits.spend)*100});return(a,m)=>{const p=N,_=R,l=E,$=L,r=U,C=ae,k=T,j=A;return c(),v("div",ie,[t(n(M),null,{default:s(()=>[e("div",le,[t(p,{as:"h3",size:"xs",weight:"semibold",class:"text-muted-500 dark:text-muted-100 uppercase"},{default:s(()=>[d(" Card Details ")]),_:1}),e("button",{type:"button",class:"nui-mask nui-mask-blob hover:bg-muted-100 focus:bg-muted-100 dark:hover:bg-muted-700 dark:focus:bg-muted-700 text-muted-700 dark:text-muted-400 flex size-10 cursor-pointer items-center justify-center outline-transparent transition-colors duration-300",onClick:m[0]||(m[0]=(...f)=>n(x)&&n(x)(...f))},[t(_,{name:"lucide:arrow-right",class:"size-4"})])]),e("div",oe,[e("div",ne,[e("div",ue,[e("div",null,[t(p,{as:"h4",size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(i(a.card.name),1)]),_:1}),t(l,{size:"xs",class:"text-muted-400"},{default:s(()=>[d(i(a.card.cardInfo.name),1)]),_:1})]),e("div",re,[t(p,{as:"h4",size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(" $"+i(a.card.daySpent.toFixed(2)),1)]),_:1}),t(l,{size:"xs",class:"text-muted-400"},{default:s(()=>[d(" Spent today ")]),_:1})])]),t($,{value:n(w),size:"xs",class:"my-2"},null,8,["value"]),e("div",ce,[e("button",{type:"button",class:"nui-focus mb-3 flex w-full items-center",onClick:m[1]||(m[1]=f=>u.value=!n(u))},[e("span",me,[e("span",_e,[t(_,{name:"lucide:chevron-down",class:y(["size-3 transition-transform duration-300",n(u)?"rotate-180":""])},null,8,["class"]),n(u)?b("",!0):(c(),h(r,{key:0,size:"xs"},{default:s(()=>[d(" Show details ")]),_:1})),n(u)?(c(),h(r,{key:1,size:"xs"},{default:s(()=>[d(" Hide details ")]),_:1})):b("",!0)]),n(u)?b("",!0):(c(),h(r,{key:0,size:"xs"},{default:s(()=>[d(" $"+i(a.card.funds.available.toFixed(2))+" available · $"+i(a.card.limits.spend.toFixed(2))+" limit ",1)]),_:1}))])]),n(u)?(c(),v("div",fe,[e("div",xe,[t(p,{as:"h5",size:"xs",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(" Total daily limit ")]),_:1}),t(r,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(" $"+i((a.card.limits.spend+a.card.limits.withdraw).toFixed(2)),1)]),_:1})]),e("div",pe,[e("div",he,[e("div",be,[ve,t(l,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[d(" Posted ")]),_:1}),e("span",ge,[t(_,{name:"lucide:help-circle",class:"text-muted-400 size-3"})])]),t(r,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(" $"+i(a.card.funds.posted.toFixed(2)),1)]),_:1})]),e("div",we,[e("div",ke,[ze,t(l,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[d(" Pending ")]),_:1}),e("span",ye,[t(_,{name:"lucide:help-circle",class:"text-muted-400 size-3"})])]),t(r,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(" $"+i(a.card.funds.pending.toFixed(2)),1)]),_:1})]),e("div",$e,[e("div",Ce,[je,t(l,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[d(" Unavailable ")]),_:1}),e("span",Fe,[t(_,{name:"lucide:help-circle",class:"text-muted-400 size-3"})])]),t(r,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(" $"+i(a.card.funds.unavailable.toFixed(2)),1)]),_:1})]),e("div",Be,[e("div",De,[Pe,t(l,{size:"sm",class:"text-muted-700 dark:text-muted-400"},{default:s(()=>[d(" Available to spend ")]),_:1})]),t(r,{size:"sm",weight:"medium",class:"text-muted-800 dark:text-muted-100"},{default:s(()=>[d(" $"+i(a.card.funds.available.toFixed(2)),1)]),_:1})])])])):b("",!0)]),e("div",Se,[t(C,{status:a.card.cardInfo.status,name:a.card.cardInfo.name,number:a.card.cardInfo.number,brand:a.card.cardInfo.brand},null,8,["status","name","number","brand"]),e("div",Ie,[t(l,{size:"xs",class:"text-muted-400 text-center"},{default:s(()=>[d(" This card was issued on "+i(a.card.creationDate),1)]),_:1}),e("div",Ve,[t(k,{rounded:"md",size:"sm"},{default:s(()=>[d(" Disable ")]),_:1}),t(k,{variant:"pastel",color:"muted",rounded:"md",size:"sm"},{default:s(()=>[d(" Replace ")]),_:1}),t(k,{variant:"pastel",color:"muted",rounded:"md",size:"sm"},{default:s(()=>[d(" Cancel ")]),_:1})])]),e("div",Ne,[e("div",Re,[t(l,{size:"xs",class:"text-muted-400 mb-2"},{default:s(()=>[d(" Billing address ")]),_:1}),(c(!0),v(I,null,V(a.card.address,f=>(c(),h(l,{key:f,size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(i(f),1)]),_:2},1024))),128))])]),e("div",Te,[e("div",Ae,[e("div",Ee,[t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(" Daily spend limit ")]),_:1}),t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(" $"+i(a.card.limits.spend.toFixed(2)),1)]),_:1})]),e("div",Le,[e("div",null,[t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(" Daily withdrawal limit ")]),_:1}),t(l,{size:"xs",class:"text-muted-400 mb-1"},{default:s(()=>[d(" Cash withdrawn today ")]),_:1})]),e("div",null,[t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300 mb-1"},{default:s(()=>[d(" $"+i(a.card.limits.withdraw.toFixed(2)),1)]),_:1}),t(l,{size:"xs",class:"text-muted-400 mb-1"},{default:s(()=>[d(" $"+i(a.card.dayWithdraw.toFixed(2)),1)]),_:1})])]),e("div",Ue,[t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(" Account ")]),_:1}),t(j,{to:"#",class:"text-muted-600 nui-focus dark:text-muted-300 font-sans text-sm font-medium underline-offset-4 hover:underline","data-nui-tooltip":"View Account"},{default:s(()=>[d(" Checking "+i(a.card.account),1)]),_:1})]),e("div",He,[t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300"},{default:s(()=>[d(" Card type ")]),_:1}),t(l,{size:"sm",weight:"medium",class:"text-muted-600 dark:text-muted-300 capitalize"},{default:s(()=>[d(i(a.card.cardInfo.type),1)]),_:1})])])])])])])]),_:1})])}}});export{Je as default};