import{d as S,u,o as s,c as r,g as D,r as y,n as t,a as e,i,t as $}from"./BdTB-59g.js";const z=["src"],A=["src"],C={key:2,class:"nui-avatar-text"},N=["src"],P=S({__name:"BaseAvatar",props:{src:{default:void 0},srcDark:{default:void 0},badgeSrc:{default:void 0},text:{default:"?"},mask:{default:void 0},dot:{type:[Boolean,String],default:!1},ring:{type:[Boolean,String],default:!1},color:{default:void 0},rounded:{default:void 0},size:{default:void 0},classes:{default:()=>({})}},setup(w){const a=w,l=u(a,"BaseAvatar","color"),n=u(a,"BaseAvatar","rounded"),c=u(a,"BaseAvatar","size"),h={white:"bg-white dark:bg-muted-800 text-muted-600 dark:text-muted-200",muted:"bg-muted-100 dark:bg-muted-800 text-muted-600 dark:text-muted-200",primary:"bg-primary-500/20 text-primary-500",info:"bg-info-500/20 text-info-500",success:"bg-success-500/20 text-success-500",warning:"bg-warning-500/20 text-warning-500",danger:"bg-danger-500/20 text-danger-500",yellow:"bg-yellow-500/20 text-yellow-400",pink:"bg-pink-500/20 text-pink-400",indigo:"bg-indigo-500/20 text-indigo-500",violet:"bg-violet-500/20 text-violet-500"},g={success:"nui-dot-success",primary:"nui-dot-primary",info:"nui-dot-info",warning:"nui-dot-warning",danger:"nui-dot-danger",pink:"nui-dot-pink",yellow:"nui-dot-yellow"},m={success:"nui-ring-success",primary:"nui-ring-primary",info:"nui-ring-info",warning:"nui-ring-warning",danger:"nui-ring-danger",pink:"nui-ring-pink",yellow:"nui-ring-yellow"},_={xxs:"nui-avatar-xxs",xs:"nui-avatar-xs",sm:"nui-avatar-sm",md:"nui-avatar-md",lg:"nui-avatar-lg",xl:"nui-avatar-xl","2xl":"nui-avatar-2xl","3xl":"nui-avatar-3xl","4xl":"nui-avatar-4xl"},d={none:"nui-avatar-rounded-none",sm:"nui-avatar-rounded-sm",md:"nui-avatar-rounded-md",lg:"nui-avatar-rounded-lg",full:"nui-avatar-rounded-full"},B={hex:"nui-mask-hex",hexed:"nui-mask-hexed",deca:"nui-mask-deca",blob:"nui-mask-blob",diamond:"nui-mask-diamond"};return(o,V)=>{var v,k,p,x;return s(),r("div",{class:t(["nui-avatar",[e(c)&&_[e(c)],e(n)&&d[e(n)],!a.src&&e(l)&&h[e(l)],a.mask&&(a.rounded==="none"||e(n)==="none")&&`nui-avatar-mask ${B[a.mask]}`,a.ring&&(a.ring===!0?`nui-avatar-ring ${m.primary}`:`nui-avatar-ring ${m[a.ring]}`),(v=a.classes)==null?void 0:v.wrapper]])},[D("div",{class:t(["nui-avatar-inner",(k=a.classes)==null?void 0:k.inner])},[y(o.$slots,"default",{},()=>{var f,b;return[a.src?(s(),r("img",{key:0,src:a.src,class:t(["nui-avatar-img",[e(n)&&d[e(n)],a.srcDark?"dark:hidden":"",(f=a.classes)==null?void 0:f.img]])},null,10,z)):i("",!0),a.src&&a.srcDark?(s(),r("img",{key:1,src:a.srcDark,class:t(["nui-avatar-img hidden dark:block",[e(n)&&d[e(n)],(b=a.classes)==null?void 0:b.img]])},null,10,A)):i("",!0),a.src?i("",!0):(s(),r("span",C,$(a.text),1))]})],2),"badge"in o.$slots||a.badgeSrc?(s(),r("div",{key:0,class:t(["nui-avatar-badge",(p=a.classes)==null?void 0:p.badge])},[y(o.$slots,"badge",{},()=>[a.badgeSrc?(s(),r("img",{key:0,src:a.badgeSrc,class:"nui-badge-img",alt:""},null,8,N)):i("",!0)])],2)):i("",!0),a.dot?(s(),r("span",{key:1,class:t(["nui-avatar-dot",[a.dot===!0?g.primary:g[a.dot],(x=a.classes)==null?void 0:x.dot]])},null,2)):i("",!0)],2)}}});export{P as _};
