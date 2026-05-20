var c=Object.defineProperty;var m=(a,t,e)=>t in a?c(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var r=(a,t,e)=>m(a,typeof t!="symbol"?t+"":t,e);import{T as d,a as p,c as u,b as l}from"../shared/translink-core-Bl2Bdf_J.js";import{g as i}from"../vendor/animation-x_L3MCmw.js";class f{mount(t){const e=d.getInstance(),n=document.createElement("aside");n.className="w-[var(--sidebar-width)] flex-none flex flex-col items-center py-[clamp(1.5rem,5vh,3rem)] gap-4 bg-transparent relative shrink-0 z-20",n.innerHTML=`
            <div class="flex-none flex flex-col items-center w-full px-0">
                <div id="s3-logo-placeholder" class="w-10 h-10 md:w-[60px] md:h-[60px] mx-auto flex items-center justify-center bg-transparent relative mb-10 md:mb-16"></div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-center relative w-full gap-8 md:gap-12 py-8 md:py-12">
                <span class="text-crimson font-bold text-[0.6vw] uppercase tracking-[0.4em] vertical-text absolute left-1/4 md:left-[15%] bottom-4 opacity-50 font-space">
                    ${e.t("sections.s3.sidebar_label")}
                </span>
                <span class="text-[1.2vw] leading-none uppercase tracking-widest vertical-text mb-8 md:mb-12 text-obsidian/40 font-bold">
                    ${e.t("global.brand")}
                </span>
                <h1 class="text-[5.5vw] leading-none font-normal tracking-[0.05em] vertical-text uppercase font-bebas" tech-pulse-text>
                    ${e.t("sections.s3.vertical_title")}
                </h1>
            </div>

        `,t.appendChild(n)}}class v{mount(t){const e=document.createElement("div");e.className="flex-1 flex flex-col overflow-hidden min-h-0 relative bg-transparent",e.innerHTML=`
            <div id="s3-scroll-content" class="w-full h-full p-[var(--hero-p-outer)] overflow-y-auto custom-scrollbar flex flex-col justify-center items-center relative">
                <!-- S3 Fuel Data Block -->
            </div>
        `,t.appendChild(e)}}class h{mount(t){new p("s3","Dynamic Route Sync").mount(t)}}class x{mount(t){const e=document.createElement("main");e.className="w-[var(--content-width)] flex-none flex flex-col overflow-visible shrink-0 relative z-10",new v().mount(e);const n=document.createElement("div");n.id="s3-telemetry-mount",n.className="absolute bottom-8 left-0 z-30",e.appendChild(n),new u("s3","TELEMETRY_S3").mount(n),new h().mount(e),t.appendChild(e)}}class g{mount(t){const e=l.createWrapper("s3"),n=e.querySelector(".flex-1");new f().mount(n),new x().mount(n),l.addNavGutter(n),l.addFooter(e),t.appendChild(e)}}class y{constructor(){r(this,"tls",[])}setup(t){const e=document.getElementById("s3");if(!e)return;this.destroy();const n=e.querySelector("h2"),o=e.querySelector(".grid, #s3-stats");if(n){const s=i.timeline({scrollTrigger:{trigger:e,start:"top 90%",end:"top 30%",scrub:2,invalidateOnRefresh:!0}});s.fromTo(n,{opacity:0,y:150,rotateX:-25,scale:.9,transformOrigin:"top"},{opacity:1,y:0,rotateX:0,scale:1,ease:"power3.out"}),this.tls.push(s)}if(o){const s=i.timeline({scrollTrigger:{trigger:e,start:"top 70%",end:"top 10%",scrub:1.8,invalidateOnRefresh:!0}});s.fromTo(o.children,{opacity:0,y:80,scale:.6,rotateY:15},{opacity:1,y:0,scale:1,rotateY:0,stagger:.15,duration:.8,ease:"back.out(1.7)"}),this.tls.push(s)}}destroy(){this.tls.forEach(t=>t.kill()),this.tls=[]}}class S{mount(t){new g().mount(t),setTimeout(()=>{new y().setup(t)},100)}}export{S as T};
