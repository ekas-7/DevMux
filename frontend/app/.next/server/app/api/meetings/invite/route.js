(()=>{var e={};e.id=956,e.ids=[956],e.modules={96330:e=>{"use strict";e.exports=require("@prisma/client")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},79428:e=>{"use strict";e.exports=require("buffer")},55511:e=>{"use strict";e.exports=require("crypto")},94735:e=>{"use strict";e.exports=require("events")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},11723:e=>{"use strict";e.exports=require("querystring")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},61200:(e,r,t)=>{"use strict";t.r(r),t.d(r,{patchFetch:()=>v,routeModule:()=>l,serverHooks:()=>m,workAsyncStorage:()=>d,workUnitAsyncStorage:()=>x});var s={};t.r(s),t.d(s,{POST:()=>c});var i=t(42706),a=t(28203),n=t(45994),o=t(39187),u=t(11587),p=t(45369);async function c(e){try{let r=await (0,p.j)();if(!r?.user?.email)return o.NextResponse.json({error:"Unauthorized"},{status:401});let{meetingId:t,friendEmail:s}=await e.json(),i=await u.z.meeting.update({where:{id:t},data:{participants:{connect:{email:s}}}});return console.log(o.NextResponse.json(i)),o.NextResponse.json(i)}catch(e){return console.error(e),o.NextResponse.json({error:"Internal Server Error"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/meetings/invite/route",pathname:"/api/meetings/invite",filename:"route",bundlePath:"app/api/meetings/invite/route"},resolvedPagePath:"/Users/ekaspreetsinghatwal/DevMux/app/api/meetings/invite/route.ts",nextConfigOutput:"",userland:s}),{workAsyncStorage:d,workUnitAsyncStorage:x,serverHooks:m}=l;function v(){return(0,n.patchFetch)({workAsyncStorage:d,workUnitAsyncStorage:x})}},96487:()=>{},78335:()=>{},45369:(e,r,t)=>{"use strict";t.d(r,{j:()=>a});var s=t(51825),i=t(26560);let a=async()=>await (0,s.getServerSession)(i.N)},26560:(e,r,t)=>{"use strict";t.d(r,{N:()=>a});var s=t(28053);let i=new(t(96330)).PrismaClient,a={providers:[(0,s.A)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET})],callbacks:{jwt:async({token:e,user:r})=>(r&&(e.id=r.id),e),session:async({session:e,token:r})=>(e.user&&(e.user.id=r.id),e),async signIn({user:e,account:r}){if(r?.provider==="google")try{await i.user.findUnique({where:{email:e.email}})||await i.user.create({data:{email:e.email,name:e.name||"",image:e.image||null}})}catch(e){return console.error("Error saving user to database:",e),!1}return!0}}}},11587:(e,r,t)=>{"use strict";t.d(r,{z:()=>i});var s=t(96330);let i=global.prisma||new s.PrismaClient}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[638,452,677],()=>t(61200));module.exports=s})();