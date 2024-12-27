import{W as re,aq as G,e as w,a3 as ne,G as de,aj as ue,d as W,o as l,c as d,g as n,r as I,n as x,a as e,j as z,w as y,k as L,F as S,l as D,h as c,t as j,p as pe,H as q,at as me,f as ce,a6 as E,a9 as V,R as B,au as M,i as v,C as se,m as fe,_ as xe,av as ve}from"./BdTB-59g.js";import{_ as ye}from"./BcdKrAMO.js";import{_ as ge}from"./DcI7UQCK.js";function ie(){const b=re(),t=G(),s=w(()=>{var m,r,p,i,a,g,h,k,C,$,N;return((p=(r=(m=t.tairo)==null?void 0:m.topnav)==null?void 0:r.navigation)==null?void 0:p.enabled)===!1||((h=(g=(a=(i=t.tairo)==null?void 0:i.topnav)==null?void 0:a.navigation)==null?void 0:g.items)==null?void 0:h.length)===0?[]:(N=($=(C=(k=t.tairo)==null?void 0:k.topnav)==null?void 0:C.navigation)==null?void 0:$.items)==null?void 0:N.map(O=>({...O}))}),o=ne("collapse-open",()=>!1),f=w(()=>{var m;return(m=s.value)==null?void 0:m.find(r=>r.activePath?b.path.startsWith(r.activePath):r.to?b.path.startsWith(r.to.toString()):!1)}),u=ne("topnav-selected-menu-item",()=>f.value);return de(f,m=>{u.value=m}),ue(),{menuItems:s,activeMenuItem:f,selectedMenuItem:u,isMobileOpen:o}}const be={class:"flex w-full flex-col items-center justify-between md:h-16 md:flex-row"},_e={class:"w-full grow md:w-auto"},we={class:"me-auto block md:hidden"},he={class:"flex overflow-x-auto lg:overflow-x-hidden"},ke=W({__name:"TairoTopnavNavigation",props:{display:{default:"expanded-md"},position:{default:"absolute"}},setup(b){const t=b,{menuItems:s,isMobileOpen:o}=ie();return G(),(f,u)=>{const m=ye,r=pe,p=ge,i=q;return l(),d("div",{class:x(["dark:bg-muted-800 border-muted-200 dark:border-muted-700 left-0 top-0 z-40 w-full border-b bg-white transition-all duration-300",[t.position==="fixed"&&"fixed",t.position==="absolute"&&"absolute"]])},[n("nav",{class:x(["relative",[t.display==="condensed"&&"w-full",t.display==="horizontal-scroll"&&"mx-auto w-full pe-4",t.display==="expanded-sm"&&"mx-auto w-full max-w-5xl px-4 lg:px-0",t.display==="expanded-md"&&"mx-auto w-full max-w-6xl px-4 lg:px-0",t.display==="expanded-lg"&&"mx-auto w-full max-w-7xl px-4 lg:px-0",t.display==="expanded-xl"&&"mx-auto w-full px-4 lg:px-0"]])},[n("div",be,[n("div",_e,[I(f.$slots,"default")]),n("div",{class:x(["dark:bg-muted-800 fixed start-0 top-0 z-20 w-full grow items-center bg-white p-3 md:static md:z-0 md:block md:w-auto md:bg-transparent md:p-0",e(o)?"flex":"hidden"])},[n("div",we,[z(m,{color:"muted",rounded:"full",onClick:u[0]||(u[0]=a=>o.value=!1)})]),I(f.$slots,"toolbar",{},()=>[z(r,{to:"#",color:"primary"},{default:y(()=>[L(" Get Started ")]),_:1})])],2)])],2),n("div",{class:x(["flex items-center",[t.display==="condensed"&&"w-full",t.display==="horizontal-scroll"&&"mx-auto w-full overflow-x-auto",t.display==="expanded-sm"&&"mx-auto w-full max-w-5xl",t.display==="expanded-md"&&"mx-auto w-full max-w-6xl",t.display==="expanded-lg"&&"mx-auto w-full max-w-7xl",t.display==="expanded-xl"&&"mx-auto w-full"]])},[n("div",he,[(l(!0),d(S,null,D(e(s),(a,g)=>(l(),c(i,{key:g,to:a.to,class:"text-muted-400 hover:text-muted-500 dark:text-muted-500 dark:hover:text-muted-400 flex items-center justify-center border-b-2 border-transparent p-3 text-center transition-colors duration-300","exact-active-class":"!border-primary-500 !text-muted-800 dark:!text-muted-100"},{default:y(()=>[z(p,{size:"sm"},{default:y(()=>[L(j(a.name),1)]),_:2},1024)]),_:2},1032,["to"]))),128))])],2)],2)}}}),Ce=W({__name:"TairoTopnavCircularMenu",setup(b){const{y:t}=me(),s=G(),o=ce(!1),f=w(()=>(t.value<60&&(o.value=!1),t.value>60)),u=["translate-x-[-6.5em] rtl:translate-x-[6.5em] translate-y-[-0.25em]","translate-x-[-5.75em] rtl:translate-x-[5.75em] translate-y-[3em]","translate-x-[-3.15em] rtl:translate-x-[3.15em] translate-y-[5.5em]","translate-x-[0em] translate-y-[6.5em]"],m=w(()=>{var r,p,i,a;return((a=(i=(p=(r=s.tairo)==null?void 0:r.collapse)==null?void 0:p.circularMenu)==null?void 0:i.tools)==null?void 0:a.slice(0,4))||[]});return(r,p)=>(l(),d("div",{class:x(["after:bg-primary-600 after:shadow-primary-500/50 dark:after:shadow-muted-800/10 fixed bottom-[0.6em] end-[1em] z-[90] rotate-90 transition-transform duration-300 after:absolute after:end-0 after:top-0 after:block after:size-12 after:rounded-full after:shadow-lg after:transition-transform after:duration-300 after:content-['']",[e(o)?"after:ease-[cubic-bezier(0.68, 1.55, 0.265, 1)] after:scale-[5.5]":"",e(f)?"":"translate-y-24"]])},[n("button",{type:"button",class:"bg-primary-500 shadow-primary-500/50 dark:shadow-muted-800/10 relative z-30 flex size-12 -rotate-90 items-center justify-center rounded-full text-white shadow-lg",onClick:p[0]||(p[0]=i=>o.value=!e(o))},[n("span",{class:x(["relative block size-3 transition-all duration-300",e(o)?"scale-90 top-0":"-top-0.5"])},[n("span",{class:x(["bg-muted-50 absolute block h-0.5 w-full transition-all duration-300",e(o)?"-rotate-45 top-1":"top-0.5"])},null,2),n("span",{class:x(["bg-muted-50 absolute top-1/2 block h-0.5 w-full transition-all duration-300",e(o)?"opacity-0 translate-x-4":""])},null,2),n("span",{class:x(["bg-muted-50 absolute block h-0.5 w-full transition-all duration-300",e(o)?"rotate-45 bottom-1.5":"bottom-0"])},null,2)],2)]),n("div",null,[(l(!0),d(S,null,D(e(m),(i,a)=>(l(),d(S,null,[i.component?(l(),d("div",{key:i.component,class:x(["absolute end-[0.2em] top-[0.2em] z-20 flex -rotate-90 items-center justify-center transition-all duration-300",e(o)?u[a]:"translate-x-0 translate-y-0"])},[(l(),c(B(("resolveComponentOrNative"in r?r.resolveComponentOrNative:e(M))(i.component)),E(V(i.props)),null,16))],2)):v("",!0)],64))),256))])],2))}}),$e={class:"dark:bg-muted-900 border-muted-200 dark:border-muted-700 bg-muted-50 relative border-t"},Ne={key:1,class:"ltablet:w-1/5 block w-full lg:w-1/5"},Te={class:"ltablet:mt-0 ltablet:gap-6 mt-6 flex flex-wrap items-center justify-center gap-4 lg:mt-0 lg:gap-6"},ze={class:"text-muted-500 dark:text-muted-400 ltablet:w-1/5 ltablet:justify-end ltablet:mt-0 mt-6 flex w-full items-center justify-center text-sm lg:mt-0 lg:w-1/5 lg:justify-end"},Oe={key:0,class:"inline-flex gap-1"},je=n("span",null,"©",-1),Be={key:0},Me=W({__name:"TairoTopnavFooter",props:{display:{default:"expanded-lg"}},setup(b){var f;const t=b,s=(f=G().tairo.topnav)==null?void 0:f.footer,o=new Date().getFullYear();return(u,m)=>{var p,i,a,g,h,k,C,$,N,O,H;const r=q;return l(),d("footer",$e,[(i=(p=e(s))==null?void 0:p.logoSeparator)!=null&&i.component?(l(),c(r,{key:0,to:"/","aria-label":"Go to Homepage",class:"dark:bg-muted-900 bg-muted-50 absolute inset-x-0 -top-4 mx-auto flex h-9 w-14 items-center justify-center"},{default:y(()=>[(l(),c(B(("resolveComponentOrNative"in u?u.resolveComponentOrNative:e(M))(e(s).logoSeparator.component)),E(V(e(s).logoSeparator.props)),null,16))]),_:1})):v("",!0),n("div",{class:x(["ltablet:flex-row mx-auto flex flex-col items-center justify-between px-6 py-8 lg:flex-row",[t.display==="expanded-sm"&&"mx-auto w-full max-w-5xl",t.display==="expanded-md"&&"mx-auto w-full max-w-6xl",t.display==="expanded-lg"&&"mx-auto w-full max-w-7xl",t.display==="expanded-xl"&&"mx-auto w-full"]])},[(g=(a=e(s))==null?void 0:a.logo)!=null&&g.component?(l(),c(r,{key:0,to:"/","aria-label":"Go to Homepage",class:"ltablet:w-1/5 block w-full lg:w-1/5"},{default:y(()=>[(l(),c(B(("resolveComponentOrNative"in u?u.resolveComponentOrNative:e(M))(e(s).logo.component)),E(V(e(s).logo.props)),null,16))]),_:1})):(l(),d("div",Ne)),n("div",Te,[(l(!0),d(S,null,D((h=e(s))==null?void 0:h.links,_=>(l(),c(r,{key:_.to,to:_.to,rel:_.rel,target:_.target,class:"text-muted-600 hover:text-primary-500 dark:text-muted-200 dark:hover:text-primary-400 text-sm transition-colors duration-300"},{default:y(()=>[L(j(_.name),1)]),_:2},1032,["to","rel","target"]))),128))]),n("div",ze,[(C=(k=e(s))==null?void 0:k.copyright)!=null&&C.name&&((N=($=e(s))==null?void 0:$.copyright)!=null&&N.to)?(l(),d("span",Oe,[je,z(r,{to:e(s).copyright.to,target:"_blank",rel:"noopener",class:"text-muted-600 hover:text-primary-500 dark:text-muted-200 dark:hover:text-primary-400 text-sm transition-colors duration-300"},{default:y(()=>[L(j(e(s).copyright.name),1)]),_:1},8,["to"]),(H=(O=e(s))==null?void 0:O.copyright)!=null&&H.since?(l(),d("span",Be,j(e(s).copyright.since)+"-"+j(e(o))+".",1)):v("",!0)])):v("",!0)])],2)])}}}),Se={class:"dark:bg-muted-900 bg-muted-50 pb-20"},Pe={key:0,class:"flex h-16 w-full items-center gap-x-4"},Fe={class:"flex items-center justify-center md:hidden"},Ie={key:0},Le={class:"flex items-center justify-end gap-4 md:gap-2"},Ve=W({__name:"TairoTopnavLayout",props:{topnav:{type:Boolean,default:!0},toolbar:{type:Boolean,default:!0},circularMenu:{type:Boolean,default:!0},display:{default:"expanded-lg"}},setup(b){var i;const t=b,s=re(),o=(i=G().tairo)==null?void 0:i.topnav,{isMobileOpen:f}=ie(),u=w(()=>{var a;return((a=o==null?void 0:o.navigation)==null?void 0:a.enabled)!==!1&&t.topnav!==!1}),m=w(()=>{var a;return((a=o==null?void 0:o.toolbar)==null?void 0:a.enabled)!==!1&&t.toolbar!==!1}),r=w(()=>{var a;return((a=o==null?void 0:o.circularMenu)==null?void 0:a.enabled)!==!1&&t.circularMenu!==!1}),p=w(()=>{if(t.display==="condensed")return"bg-muted-50 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden";if(!u.value)return"bg-muted-50 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10";const a=["bg-muted-50 dark:bg-muted-900 relative min-h-screen w-full overflow-x-hidden px-4 transition-all duration-300 xl:px-10"];return t.display==="horizontal-scroll"&&a.push("!pe-0 xl:!pe-0"),a});return(a,g)=>{var _,A;const h=q,k=fe,C=xe,$=ke,N=ve,O=Ce,H=Me;return l(),d("div",null,[n("div",Se,[I(a.$slots,"navigation",{},()=>[e(u)?(l(),c($,{key:0,display:t.display,position:"fixed"},{toolbar:y(()=>{var P,F;return[e(m)?(l(),d("div",Ie,[n("div",Le,[(l(!0),d(S,null,D((F=(P=e(o))==null?void 0:P.toolbar)==null?void 0:F.tools,T=>(l(),d(S,null,[T.component?(l(),c(B(("resolveComponentOrNative"in a?a.resolveComponentOrNative:e(M))(T.component)),se({key:T.component},T.props),null,16)):v("",!0)],64))),256))])])):v("",!0)]}),default:y(()=>{var P,F,T,Y,J,K,Q,U,X,Z,ee,te,ae,oe;return[(T=(F=(P=e(o))==null?void 0:P.navigation)==null?void 0:F.logo)!=null&&T.component?(l(),d("div",Pe,[z(h,{to:"/",class:"flex items-center justify-center"},{default:y(()=>{var R,le;return[(l(),c(B(("resolveComponentOrNative"in a?a.resolveComponentOrNative:e(M))((R=e(o))==null?void 0:R.navigation.logo.component)),E(V((le=e(o))==null?void 0:le.navigation.logo.props)),null,16))]}),_:1}),(J=(Y=e(o))==null?void 0:Y.toolbar)!=null&&J.showTitle?(l(),c(k,{key:0,as:"h1",size:"lg",weight:"light",class:"text-muted-800 hidden md:block dark:text-white"},{default:y(()=>[I(a.$slots,"title",{},()=>[L(j(e(s).meta.title),1)])]),_:3})):v("",!0),(U=(Q=(K=e(o))==null?void 0:K.navigation)==null?void 0:Q.header)!=null&&U.component?(l(),c(B(("resolveComponentOrNative"in a?a.resolveComponentOrNative:e(M))((ee=(Z=(X=e(o))==null?void 0:X.navigation)==null?void 0:Z.header)==null?void 0:ee.component)),E(se({key:1},(oe=(ae=(te=e(o))==null?void 0:te.navigation)==null?void 0:ae.header)==null?void 0:oe.props)),null,16)):v("",!0),n("div",Fe,[n("button",{type:"button",onClick:g[0]||(g[0]=R=>f.value=!0)},[z(C,{name:"lucide:menu",class:"text-muted-400 size-6"})])])])):v("",!0)]}),_:3},8,["display"])):v("",!0)]),n("div",{class:x(e(p))},[n("div",{class:x(["pt-40 md:pt-36",[t.display==="condensed"&&"w-full",t.display==="horizontal-scroll"&&"mx-auto w-full overflow-x-auto",t.display==="expanded-sm"&&"mx-auto w-full max-w-5xl",t.display==="expanded-md"&&"mx-auto w-full max-w-6xl",t.display==="expanded-lg"&&"mx-auto w-full max-w-7xl",t.display==="expanded-xl"&&"mx-auto w-full"]])},[I(a.$slots,"default")],2)],2),z(N),e(r)?(l(),c(O,{key:0})):v("",!0)]),(A=(_=e(o))==null?void 0:_.footer)!=null&&A.enabled?(l(),c(H,{key:0,display:t.display},null,8,["display"])):v("",!0)])}}});export{Ve as _};
