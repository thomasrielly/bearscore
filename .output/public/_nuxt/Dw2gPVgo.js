import{d as f,u as t,e as v,o as p,c as h,r as w,n as B,a as k}from"./BdTB-59g.js";const T=f({__name:"BaseTag",props:{shadow:{default:void 0},color:{default:void 0},rounded:{default:void 0},size:{default:void 0},variant:{default:void 0}},setup(o){const a=o,n=t(a,"BaseTag","color"),s=t(a,"BaseTag","rounded"),e=t(a,"BaseTag","size"),u=t(a,"BaseTag","variant"),i={solid:"nui-tag-solid",pastel:"nui-tag-pastel",outline:"nui-tag-outline"},d={none:"",sm:"nui-tag-rounded-sm",md:"nui-tag-rounded-md",lg:"nui-tag-rounded-lg",full:"nui-tag-rounded-full"},l={default:"nui-tag-default","default-contrast":"nui-tag-default-contrast",muted:"nui-tag-muted","muted-contrast":"nui-tag-muted-contrast",light:"nui-tag-light",dark:"nui-tag-dark",black:"nui-tag-black",primary:"nui-tag-primary",info:"nui-tag-info",success:"nui-tag-success",warning:"nui-tag-warning",danger:"nui-tag-danger"},r={sm:"nui-tag-sm",md:"nui-tag-md"},g={flat:"nui-tag-shadow",hover:"nui-tag-shadow-hover"},c=v(()=>["nui-tag",e.value&&r[e.value],s.value&&d[s.value],u.value&&i[u.value],n.value&&l[n.value],a.shadow&&g[a.shadow]]);return(m,_)=>(p(),h("span",{class:B(k(c))},[w(m.$slots,"default")],2))}});export{T as _};
