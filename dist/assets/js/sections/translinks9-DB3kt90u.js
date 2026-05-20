var d=Object.defineProperty;var m=(a,e,t)=>e in a?d(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var i=(a,e,t)=>m(a,typeof e!="symbol"?e+"":e,t);import{T as c,a as p,c as f,b as n}from"../shared/translink-core-Bl2Bdf_J.js";import{g as r}from"../vendor/animation-x_L3MCmw.js";class u{mount(e){const t=c.getInstance(),s=document.createElement("aside");s.className="w-[var(--sidebar-width)] flex-none flex flex-col items-center py-[clamp(1.5rem,5vh,3rem)] gap-4 bg-transparent relative shrink-0 z-20",s.innerHTML=`
            <div class="flex-none flex flex-col items-center w-full px-0">
                <div id="s9-logo-placeholder" class="w-10 h-10 md:w-[60px] md:h-[60px] mx-auto flex items-center justify-center bg-transparent relative mb-10 md:mb-16"></div>
            </div>

            <div class="flex-1 flex flex-col items-center justify-center relative w-full gap-8 md:gap-12 py-8 md:py-12">
                <span class="text-crimson font-bold text-[0.6vw] uppercase tracking-[0.4em] vertical-text absolute left-1/4 md:left-[15%] bottom-4 opacity-50 font-space">
                    ${t.t("sections.s9.sidebar_label")}
                </span>
                <span class="text-[1.2vw] leading-none uppercase tracking-widest vertical-text mb-8 md:mb-12 text-obsidian/40 font-bold">
                    ${t.t("global.brand")}
                </span>
                <h1 class="text-[5.5vw] leading-none font-normal tracking-[0.05em] vertical-text uppercase font-bebas" tech-pulse-text>
                    ${t.t("sections.s9.vertical_title")}
                </h1>
            </div>

        `,e.appendChild(s)}}class v{mount(e){const t=c.getInstance(),s=document.createElement("div");s.className="flex-1 flex flex-col overflow-hidden min-h-0 relative bg-transparent",s.innerHTML=`
        <div id="s9-scroll-content" class="w-full h-full p-[var(--hero-p-outer)] flex flex-col justify-center relative z-10">
            <!-- Top Vision Header -->
            <div class="mb-[4vh] opacity-80">
                <span class="text-stat-label font-bold tracking-[0.8em] uppercase text-primary">
                    ${t.t("sections.s9.content_header")}
                </span>
            </div>

            <!-- Hero Headline -->
            <h2 class="text-fluid-h1 font-medium leading-[1.1] mb-[6vh] max-w-4xl">
                ${t.t("sections.s9.content_headline_part1")} <br/>
                ${t.t("sections.s9.content_headline_part2")} <span class="text-crimson">${t.t("sections.s9.content_headline_part3")}</span>
            </h2>

            <!-- Separator Line -->
            <div class="w-full h-px hud-frame-border mb-[6vh]"></div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                <div class="flex flex-col">
                    <div class="text-stat-value font-black flex items-baseline">
                        ${t.t("sections.s9.stat_1_value").replace("CH",'<span class="text-[0.4em] ml-1 font-bold">CH</span>')}
                    </div>
                    <div class="text-stat-label uppercase text-muted font-bold tracking-[0.2em] mt-2">
                        ${t.t("sections.s9.stat_1_label")}
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="text-stat-value font-black flex items-baseline">
                        ${t.t("sections.s9.stat_2_value").replace("P",'<span class="text-[0.4em] ml-1 font-bold">P</span>')}
                    </div>
                    <div class="text-stat-label uppercase text-muted font-bold tracking-[0.2em] mt-2">
                        ${t.t("sections.s9.stat_2_label")}
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="text-stat-value font-black flex items-baseline">
                        24<span class="text-[0.4em] mx-0.5 font-bold opacity-40">/</span><span class="text-[0.6em] font-bold">7</span>
                    </div>
                    <div class="text-stat-label uppercase text-muted font-bold tracking-[0.2em] mt-2">
                        ${t.t("sections.s9.stat_3_label")}
                    </div>
                </div>
                <div class="flex flex-col">
                    <div class="text-stat-value font-black flex items-baseline">
                        ${t.t("sections.s9.stat_4_value").replace("+",'<span class="text-[0.4em] ml-1 font-bold">+</span>')}
                    </div>
                    <div class="text-stat-label uppercase text-muted font-bold tracking-[0.2em] mt-2">
                        ${t.t("sections.s9.stat_4_label")}
                    </div>
                </div>
            </div>
        </div>
        `,e.appendChild(s)}}class x{mount(e){new p("s9","Safety Awareness Stream").mount(e)}}class b{mount(e){const t=document.createElement("main");t.className="w-[var(--content-width)] flex-none flex flex-col overflow-visible shrink-0 relative h-full min-h-full",new v().mount(t);const s=document.createElement("div");s.id="s9-telemetry-mount",s.className="absolute bottom-8 left-0 z-30",t.appendChild(s),new f("s9","TELEMETRY_S9").mount(s),new x().mount(t),e.appendChild(t)}}class h{mount(e){const t=n.createWrapper("s9"),s=t.querySelector(".flex-1");new u().mount(s),new b().mount(s),n.addNavGutter(s),n.addFooter(t),e.appendChild(t)}}class g{constructor(){i(this,"tls",[])}setup(e){const t=document.getElementById("s9");if(!t)return;this.destroy();const s=t.querySelector("h2"),o=t.querySelector(".grid, #s9-stats");if(s){const l=r.timeline({scrollTrigger:{trigger:t,start:"top 90%",end:"top 30%",scrub:2,invalidateOnRefresh:!0}});l.fromTo(s,{opacity:0,y:150,rotateX:-25,scale:.9,transformOrigin:"top"},{opacity:1,y:0,rotateX:0,scale:1,ease:"power3.out"}),this.tls.push(l)}if(o){const l=r.timeline({scrollTrigger:{trigger:t,start:"top 70%",end:"top 10%",scrub:1.8,invalidateOnRefresh:!0}});l.fromTo(o.children,{opacity:0,y:80,scale:.6,rotateY:15},{opacity:1,y:0,scale:1,rotateY:0,stagger:.15,duration:.8,ease:"back.out(1.7)"}),this.tls.push(l)}}destroy(){this.tls.forEach(e=>e.kill()),this.tls=[]}}class _{mount(e){new h().mount(e),setTimeout(()=>{new g().setup(e)},100)}}export{_ as T};
