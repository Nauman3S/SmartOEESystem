/*! For license information please see main.3256fc7a.chunk.js.LICENSE.txt */
(this["webpackJsonpsmart-oee-system"]=this["webpackJsonpsmart-oee-system"]||[]).push([[5],{100:function(e,t,n){"use strict";var c=n(198),a=n.n(c);t.a=a.a.create({baseURL:"https://smartoeesystem.production.rehanshakir.com/api"})},104:function(e,t,n){"use strict";t.a=n.p+"static/media/smartoee.a266be54.png"},105:function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return b})),n.d(t,"c",(function(){return u}));var c=n(11),a=n(20),r=n(45),s=n(100),l=n(132),i=n(83),j=n(52),o=function(e){return function(){var t=Object(a.a)(Object(c.a)().mark((function t(n){return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.post("/auth/signup",e);case 3:200===t.sent.status&&l.a.success({message:"Sign Up Successfull"}),n({type:r.d}),t.next=12;break;case 8:return t.prev=8,t.t0=t.catch(0),console.log(t.t0),t.abrupt("return",t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(a.a)(Object(c.a)().mark((function t(n){var a;return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.post("/auth/login",e);case 3:200===(a=t.sent).status&&(Object(j.c)(a.data.token),n({type:r.b,payload:a.data})),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),500===t.t0.response.status&&l.a.error({message:"".concat(t.t0.response.data.message)}),console.log(t.t0.response);case 11:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},b=function(e){return function(){var t=Object(a.a)(Object(c.a)().mark((function t(n){var a;return Object(c.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,s.a.get("/auth/my-profile",{headers:{Authorization:"Basic ".concat(e)}});case 3:a=t.sent,n({type:r.a,payload:a.data.user}),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},u=function(){return(new i.QueryCache).clear(),Object(j.a)(),{type:r.c}}},313:function(e,t,n){},314:function(e,t,n){},315:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n(28),r=n.n(a),s=n(38),l=n(36),i=n(80),j=n(2),o=n(45),d={isSignedIn:!1,userId:"",fullName:"",email:"",role:""},b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case o.d:return Object(j.a)({},e);case o.b:var n=t.payload,c=n.fullName,a=n.email,r=n.role,s=n._id;return Object(j.a)(Object(j.a)({},e),{},{isSignedIn:!0,fullName:c,email:a,role:r,userId:s});case o.a:return Object(j.a)(Object(j.a)({},e),{},{isSignedIn:!0,fullName:t.payload.fullName,email:t.payload.email,role:t.payload.role,userId:t.payload.userId});case o.c:default:return Object(j.a)({},e)}},u=Object(i.b)({auth:b}),h=n(202),O=(n(221),n(83)),x=n(10),m=n(3),f=n(325),p=n(327),g=n(329),v=n(11),y=n(20),w=n(156),C=n(104),N=n(105),S=n(330),k=n(331),I=n(5),T=function(e){var t=e.color,n=Object(l.b)(),c=Object(x.k)().pathname,a=Object(l.c)((function(e){return e.auth})),r=Object(x.n)(),i=c.replace("/",""),j=[Object(I.jsxs)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:[Object(I.jsx)("path",{d:"M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z",fill:t},"100"),Object(I.jsx)("path",{d:"M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z",fill:t},"101"),Object(I.jsx)("path",{d:"M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z",fill:t},"102")]},"0")],o=[Object(I.jsxs)("svg",{height:"20",width:"20",viewBox:"0 0 64 64",enableBackground:"new 0 0 64 64",fill:"none",children:[Object(I.jsx)("path",{d:"M52.4501991,28.7678509l-5-4.9990005c-0.3768997-0.3770008-0.9902-0.3770008-1.3671989,0 c-0.3778992,0.3778992-0.3778992,0.9902,0,1.3671989l3.3171997,3.3164005H35.2666016v2h14.1320992l-3.3157005,3.3163986 c-0.3778992,0.377903-0.3778992,0.9902,0,1.3672028c0.1884995,0.1884995,0.4365997,0.2831993,0.6835976,0.2831993 c0.2471008,0,0.4951019-0.0946999,0.6836014-0.2831993l5-5.0010014c0.1817017-0.1816006,0.2831993-0.4277,0.2831993-0.6835995 C52.7333984,29.1946507,52.6319008,28.9495506,52.4501991,28.7678509z",fill:t},"104"),Object(I.jsx)("path",{d:"M40.2666016,39.4524498c-0.5527,0-1,0.4473-1,1v10.7900009c0,1.0429993-0.8310013,2.2099991-1.9433022,2.2099991 h-6.0566998V11.2394505V9.8677502L30.0191994,9.33395L14.0765009,2.56445l-0.2606955-0.112h23.507494 c1.2168007,0,1.9433022,0.9921999,1.9433022,1.9511998v15.0487995c0,0.5527,0.4473,1,1,1c0.5527992,0,1-0.4473,1-1V4.4036498 c0-2.1786997-1.7685013-3.9511998-3.9433022-3.9511998H12.2666006c-0.5215998,0-0.9358997,0.4029-0.9822998,0.9124 L11.2666006,1.35725V1.45245V55.03405l17.1855011,7.3064003l2.8144989,1.2070999v-3.0951004v-5h6.0566998 c2.3584023,0,3.9433022-2.1767998,3.9433022-4.2099991V40.4524498 C41.2666016,39.8997498,40.8194008,39.4524498,40.2666016,39.4524498z M29.2665997,11.2394505v49.2129974l-15.999999-6.7766991 V4.4524498l15.9906988,6.7728004l0.0093002,0.0038996V11.2394505z",fill:t},"105")]})],d=[Object(I.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(I.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z",fill:t},"200")},"20")];return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsxs)("div",{className:"brand",children:[Object(I.jsx)("img",{src:C.a,alt:""}),Object(I.jsx)("span",{children:"Smart OEE System"})]}),Object(I.jsx)("hr",{}),Object(I.jsxs)(w.a,{theme:"light",mode:"inline",children:[Object(I.jsx)(w.a.Item,{children:Object(I.jsxs)(s.c,{to:"/",end:!0,children:[Object(I.jsx)("span",{className:"icon",style:{background:"dashboard"===i?t:""},children:j}),Object(I.jsx)("span",{className:"label",children:"Dashboard"})]})},"1"),a&&"admin"===a.role&&Object(I.jsx)(w.a.Item,{children:Object(I.jsxs)(s.c,{to:"/all-users",children:[Object(I.jsx)("span",{className:"icon",style:{background:"all-users"===i?t:""},children:Object(I.jsx)(S.a,{})}),Object(I.jsx)("span",{className:"label",children:"All Users"})]})},"2"),Object(I.jsx)(w.a.Item,{children:Object(I.jsxs)(s.c,{to:"/macaddress",children:[Object(I.jsx)("span",{className:"icon",style:{background:"macaddress"===i?t:""},children:Object(I.jsx)(k.a,{})}),Object(I.jsx)("span",{className:"label",children:"MacAddress"})]})},"8"),Object(I.jsx)(w.a.Item,{className:"menu-item-header",children:"Account"},"9"),Object(I.jsx)(w.a.Item,{children:Object(I.jsxs)(s.c,{to:"/profile",children:[Object(I.jsx)("span",{className:"icon",style:{background:"profile"===i?t:""},children:d}),Object(I.jsx)("span",{className:"label",children:"Profile"})]})},"10"),Object(I.jsx)(w.a.Item,{children:Object(I.jsxs)("div",{style:{marginLeft:16,marginTop:5},onClick:Object(y.a)(Object(v.a)().mark((function e(){return Object(v.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n(Object(N.c)());case 2:r("/sign-in");case 3:case"end":return e.stop()}}),e)}))),children:[Object(I.jsx)("span",{className:"icon",children:o}),Object(I.jsx)("span",{className:"label",children:"Logout"})]})},"11")]})]})},P=n(323),z=n(324),E=n(328),V=n(96),M=[Object(I.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(I.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z",fill:"#111827"})},0)],_=[Object(I.jsx)("svg",{width:"20",height:"20",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512",children:Object(I.jsx)("path",{d:"M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"})},0)];var H=function(e){var t=e.name,n=e.subName,a=e.onPress;Object(c.useEffect)((function(){return window.scrollTo(0,0)}));var r=Object(l.c)((function(e){return e.auth}));return Object(I.jsx)(I.Fragment,{children:Object(I.jsxs)(P.a,{gutter:[24,0],children:[Object(I.jsxs)(z.a,{span:24,md:6,children:[Object(I.jsxs)(E.a,{children:[Object(I.jsx)(E.a.Item,{children:Object(I.jsx)(s.c,{to:"/",children:"Pages"})}),Object(I.jsx)(E.a.Item,{style:{textTransform:"capitalize"},children:t.replace("/","")})]}),Object(I.jsx)("div",{className:"ant-page-header-heading",children:Object(I.jsx)("span",{className:"ant-page-header-heading-title",style:{textTransform:"capitalize"},children:n.replace("/","")})})]}),Object(I.jsxs)(z.a,{span:24,md:18,className:"header-control",children:[Object(I.jsx)(V.a,{type:"link",className:"sidebar-toggler",onClick:function(){return a()},children:_}),Object(I.jsxs)(s.b,{to:"/profile",className:"btn-sign-in",children:[M,Object(I.jsx)("span",{children:r.fullName})]})]})]})})};var B=function(){var e=f.a.Footer;return Object(I.jsx)(e,{style:{background:"#fafafa"},children:Object(I.jsx)(P.a,{className:"just",children:Object(I.jsx)(z.a,{xs:24,md:12,lg:12,children:Object(I.jsxs)("div",{className:"copyright",children:["\xa9 2022 -",Object(I.jsx)("a",{href:"#pablo",className:"font-weight-bold",target:"_blank",children:"Smart OEE System"})]})})})})},L=f.a.Header,Z=f.a.Content,A=f.a.Sider;var R,F,U,D=function(e){var t=e.children,n=Object(c.useState)(!1),a=Object(m.a)(n,2),r=a[0],s=a[1],l=Object(c.useState)("right"),i=Object(m.a)(l,2),j=i[0],o=i[1],d=Object(c.useState)("#1890ff"),b=Object(m.a)(d,2),u=b[0],h=b[1],O=Object(c.useState)("transparent"),v=Object(m.a)(O,2),y=v[0],w=v[1],C=Object(c.useState)(!1),N=Object(m.a)(C,2),S=N[0],k=N[1],P=function(){return s(!r)},z=function(e){return w(e)},E=function(e){return h(e)},V=function(e){return k(e)},M=Object(x.k)().pathname;return M=M.replace("/",""),Object(c.useEffect)((function(){o("rtl"===M?"left":"right")}),[M]),Object(I.jsxs)(f.a,{className:"layout-dashboard ".concat("profile"===M?"layout-profile":""," ").concat("rtl"===M?"layout-dashboard-rtl":""),children:[Object(I.jsx)(p.a,{title:!1,placement:"right"===j?"left":"right",closable:!1,onClose:function(){return s(!1)},visible:r,width:250,className:"drawer-sidebar ".concat("rtl"===M?"drawer-sidebar-rtl":""," "),children:Object(I.jsx)(f.a,{className:"layout-dashboard ".concat("rtl"===M?"layout-dashboard-rtl":""),children:Object(I.jsx)(A,{trigger:null,width:250,theme:"light",className:"sider-primary ant-layout-sider-primary ".concat("#fff"===y?"active-route":""),style:{background:y},children:Object(I.jsx)(T,{color:u})})})},"right"===j?"left":"right"),Object(I.jsx)(A,{breakpoint:"lg",collapsedWidth:"0",onCollapse:function(e,t){console.log(e,t)},trigger:null,width:250,theme:"light",className:"sider-primary ant-layout-sider-primary ".concat("#fff"===y?"active-route":""),style:{background:y},children:Object(I.jsx)(T,{color:u})}),Object(I.jsxs)(f.a,{children:[S?Object(I.jsx)(g.a,{children:Object(I.jsx)(L,{className:"".concat(S?"ant-header-fixed":""),children:Object(I.jsx)(H,{onPress:P,name:M,subName:M,handleSidenavColor:E,handleSidenavType:z,handleFixedNavbar:V})})}):Object(I.jsx)(L,{className:"".concat(S?"ant-header-fixed":""),children:Object(I.jsx)(H,{onPress:P,name:M,subName:M,handleSidenavColor:E,handleSidenavType:z,handleFixedNavbar:V})}),Object(I.jsxs)(Z,{className:"content-ant",children:[t,Object(I.jsx)(x.b,{})]}),Object(I.jsx)(B,{})]})]})},J=n(130),G=n(131),Q=Object(G.b)(R||(R=Object(J.a)(["\n    from{\n        opacity: 0;\n        /* transform: scale(0.25); */\n    }\n    to{\n        opacity: 1;\n        /* transform: scale(1); */\n    }\n"]))),W=G.a.div(F||(F=Object(J.a)(["\n  height: 100vh;\n  width: 100vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]))),X=G.a.img(U||(U=Object(J.a)(["\n  height: 50.223415682062296vh;\n  width: 30.965939329430547vw;\n  max-height: 250px;\n  max-width: 250px;\n  animation: "," 0.75s infinite;\n"])),Q),q=n(52),K=function(){var e=Object(l.c)((function(e){return e.auth})),t=Object(l.b)(),n=Object(c.useCallback)((function(){var n=Object(q.b)();n&&!e.isSignedIn&&t(Object(N.a)(n))}),[e.isSignedIn,t]);return Object(c.useEffect)((function(){n()}),[n]),Object(I.jsxs)(W,{children:[Object(I.jsx)(X,{src:C.a,alt:""}),Object(I.jsx)("h2",{style:{fontWeight:"bold"},children:"Smart OEE System"})]})},Y=n(132),$=n(326);n(312),n(313),n(314);function ee(e){var t=e.children,n=e.redirectTo,c=Object(q.b)();return c||Y.a.error({message:"Please login first"}),c?t:Object(I.jsx)(x.a,{to:n})}function te(e){var t=e.children,n=e.redirectTo;return Object(q.b)()?Object(I.jsx)(x.a,{to:n}):t}var ne=function(){var e=Object(l.c)((function(e){return e.auth})),t=("admin"===e.role||"superAdmin"===e.role)&&Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(9),n.e(15)]).then(n.bind(null,397))})),a=Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(0),n.e(3),n.e(4),n.e(10)]).then(n.bind(null,387))})),r="admin"===e.role&&Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(3),n.e(8)]).then(n.bind(null,388))})),s=Object(c.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(3),n.e(14),n.e(16)]).then(n.bind(null,389))})),i=Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(3),n.e(17)]).then(n.bind(null,390))})),j=Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(13)]).then(n.bind(null,396))})),o=Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(4),n.e(11)]).then(n.bind(null,391))})),d=("admin"===e.role||"superAdmin"===e.role)&&Object(c.lazy)((function(){return Promise.all([n.e(1),n.e(0),n.e(2),n.e(4),n.e(12)]).then(n.bind(null,392))}));return Object(I.jsx)(c.Suspense,{fallback:Object(I.jsx)(K,{}),children:Object(I.jsx)("div",{className:"App",children:Object(I.jsx)($.a,{exitBeforeEnter:!0,children:Object(I.jsxs)(x.e,{children:[Object(I.jsx)(x.c,{path:"/sign-up",element:Object(I.jsx)(te,{redirectTo:"/",children:Object(I.jsx)(i,{})})}),Object(I.jsx)(x.c,{path:"/sign-in",element:Object(I.jsx)(te,{redirectTo:"/",children:Object(I.jsx)(s,{})})}),Object(I.jsxs)(x.c,{path:"/",element:Object(I.jsx)(ee,{redirectTo:"/sign-in",children:Object(I.jsx)(D,{})}),children:[Object(I.jsx)(x.c,{index:!0,element:Object(I.jsx)(ee,{redirectTo:"/sign-in",children:e&&"admin"===e.role?Object(I.jsx)(t,{}):Object(I.jsx)(a,{})})}),e&&"admin"===e.role&&Object(I.jsx)(x.c,{exact:!0,path:"/all-users",element:Object(I.jsx)(ee,{redirectTo:"/sign-in",children:Object(I.jsx)(r,{})})}),e&&"admin"===e.role&&Object(I.jsx)(x.c,{path:"/data",element:Object(I.jsx)(ee,{redirectTo:"/sign-in",children:Object(I.jsx)(d,{})})}),Object(I.jsx)(x.c,{path:"/macaddress",element:Object(I.jsx)(ee,{redirectTo:"/sign-in",children:Object(I.jsx)(o,{})})}),Object(I.jsx)(x.c,{path:"/profile",element:Object(I.jsx)(ee,{redirectTo:"/sign-in",children:Object(I.jsx)(j,{})})}),Object(I.jsx)(x.c,{path:"*",element:Object(I.jsx)(x.a,{to:"/",replace:!0})})]})]})})})})},ce=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.c,ae=Object(i.d)(u,ce(Object(i.a)(h.a))),re=new O.QueryClient;r.a.render(Object(I.jsx)(l.a,{store:ae,children:Object(I.jsx)(s.a,{children:Object(I.jsx)(O.QueryClientProvider,{client:re,children:Object(I.jsx)(ne,{})})})}),document.getElementById("root"))},45:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"d",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return s}));var c="SIGN_IN",a="SIGN_UP",r="SIGN_OUT",s="LOAD_PROFILE"},52:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var c=function(){try{var e=localStorage.getItem("token");if(null===e)return;return JSON.parse(e)}catch(t){return}},a=function(e){try{var t=JSON.stringify(e);localStorage.setItem("token",t)}catch(n){}},r=function(){try{localStorage.removeItem("token")}catch(e){}}}},[[315,6,7]]]);
//# sourceMappingURL=main.3256fc7a.chunk.js.map