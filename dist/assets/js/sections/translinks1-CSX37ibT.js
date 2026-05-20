import{T as f,a as C,b as m}from"../shared/translink-core-Bl2Bdf_J.js";import{g as u}from"../vendor/animation-x_L3MCmw.js";class k{mount(e){const t=f.getInstance(),n=document.createElement("aside");n.className="w-[var(--sidebar-width)] flex-none flex flex-col items-center py-[clamp(1.5rem,5vh,3rem)] gap-4 bg-transparent relative shrink-0 z-20",n.innerHTML=`
            <!-- S1 Brand Vertical -->
            <div class="flex-none flex flex-col items-center w-full px-0">
                <div id="s1-logo-placeholder" class="w-10 h-10 md:w-[60px] md:h-[60px] mx-auto flex items-center justify-center bg-transparent relative mb-10 md:mb-16"></div>
            </div>

            <!-- Brand Name Vertical -->
            <div class="flex-1 flex flex-col items-center justify-center relative w-full gap-8 md:gap-12 py-8 md:py-12">
                <span class="text-crimson font-bold text-[0.6vw] uppercase tracking-[0.4em] vertical-text absolute left-1/4 md:left-[15%] bottom-4 opacity-50 font-space">
                    ${t.t("sections.s1.sidebar_label")}
                </span>
                <span class="text-[1.2vw] leading-none uppercase tracking-widest vertical-text mb-8 md:mb-12 text-obsidian/40 font-bold">
                    ${t.t("global.brand")}
                </span>
                <h1 class="text-[5.5vw] leading-none font-normal tracking-[0.05em] vertical-text uppercase font-bebas" tech-pulse-text>
                    ${t.t("sections.s1.vertical_title")}
                </h1>
            </div>

        `,e.appendChild(n)}}class T{mount(e){const t=f.getInstance(),n=document.createElement("div");n.className="flex-1 flex flex-col landscape:flex-row overflow-hidden min-h-0 relative bg-transparent",n.innerHTML=`
            <!-- 3D Canvas Column -->
            <div class="w-full landscape:w-[50%] flex-1 landscape:flex-none landscape:h-full p-[var(--hero-p-inner)] flex items-center justify-center order-2 landscape:order-1 min-h-0 relative z-10">
                <div id="three-canvas-container" class="w-full h-full max-h-[100%] flex items-center justify-center relative overflow-hidden group">
                </div>
            </div>

            <!-- Text Content -->
            <div id="s1-scroll-content" class="w-full landscape:w-[50%] flex-1 landscape:flex-none landscape:h-full p-[var(--hero-p-outer)] flex flex-col order-1 landscape:order-2 border-b landscape:border-b-0 landscape:border-l border-transparent bg-transparent min-h-0 overflow-y-auto custom-scrollbar relative z-10">
                <div class="w-full mt-[12vh] mb-auto landscape:my-auto py-4">
                    <h2 class="text-[clamp(1.5rem,3.2vw,5rem)] !font-inter !font-black leading-[1.1] tracking-tight mb-[var(--hero-title-mb)] min-h-[3em]">
                        <div class="whitespace-nowrap">
                            <span class="s1-part1 text-crimson"></span>
                            <span class="s1-part2 text-obsidian"></span>
                        </div>
                        <div class="whitespace-nowrap">
                            <span class="s1-part3 text-obsidian text-[0.85em] opacity-80"></span>
                        </div>
                    </h2>
                    <p class="s1-anim-subheadline text-fluid-p text-secondary mb-[var(--hero-para-mb)] leading-relaxed font-medium min-h-[4em]"></p>

                    <!-- Stats Row -->
                    <div class="s1-anim-trust opacity-0 translate-y-4 flex gap-[var(--hero-gap)]">
                        <div>
                            <div class="text-stat-value font-black flex items-baseline">
                                12<span class="text-crimson text-[0.6em]">+</span>
                            </div>
                            <div class="text-stat-label uppercase text-muted font-bold leading-tight tracking-wider">
                                ${t.t("sections.s1.trust_badge_years")}<br/>${t.t("sections.s1.trust_badge_excellence")}
                            </div>
                        </div>
                        <div>
                            <div class="text-stat-value font-black flex items-baseline">
                                99.9<span class="text-crimson text-[0.6em]">%</span>
                            </div>
                            <div class="text-stat-label uppercase text-muted font-bold leading-tight tracking-wider">
                                ${t.t("sections.s1.trust_badge_platform")}<br/>${t.t("sections.s1.trust_badge_uptime")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,e.appendChild(n)}}class _{mount(e){new C("s1","Hero Section Active").mount(e)}}class q{mount(e){const t=document.createElement("main");t.className="w-[var(--content-width)] flex-none flex flex-col overflow-visible shrink-0 relative z-10",new T().mount(t),new _().mount(t),e.appendChild(t)}}class ${mount(e){const t=m.createWrapper("s1"),n=t.querySelector(".flex-1");new k().mount(n),new q().mount(n),m.addNavGutter(n),m.addFooter(t),e.appendChild(t)}}class H{setup(e){const t=e.id==="s1-clone"||e.closest("#s1-clone")!==null,n=e.querySelector(".s1-part1"),l=e.querySelector(".s1-part2"),o=e.querySelector(".s1-part3"),r=e.querySelector(".s1-anim-subheadline"),i=e.querySelector(".s1-anim-trust"),c=f.getInstance(),x=c.t("sections.s1.hero_part1"),v=c.t("sections.s1.hero_part2"),h=c.t("sections.s1.hero_part3"),b=c.t("sections.s1.hero_description");if(t&&n&&l&&o&&r&&(n.textContent=x,l.textContent=v,o.textContent=h,r.textContent=b,i&&u.set(i,{opacity:1,y:0})),!t&&n&&l&&o&&r){n.textContent="",l.textContent="",o.textContent="",r.textContent="";const s=(d,g,S,w)=>{let p=0;const y=()=>{p<g.length?(d.textContent+=g.charAt(p),p++,setTimeout(y,S)):w&&w()};y()};setTimeout(()=>{s(n,x,12,()=>{s(l,v,8,()=>{s(o,h,8,()=>{s(r,b,4,()=>{i&&u.to(i,{opacity:1,y:0,duration:.8,ease:"power3.out"})})})})})},200)}if(!t){const s=document.getElementById("s1"),d=e.querySelector("#s1-scroll-content");s&&d&&u.fromTo(d,{opacity:1,y:0},{opacity:0,y:-(40*(window.innerHeight/1080)),ease:"power1.in",scrollTrigger:{id:"s1-scroll-fade",trigger:s,start:"top top",end:"bottom top",scrub:1.5,invalidateOnRefresh:!0}})}}}class L{mount(e){new $().mount(e),requestAnimationFrame(()=>{requestAnimationFrame(()=>{const n=e.id==="s1"?e:e.querySelector("#s1");n&&new H().setup(n)})})}}export{L as T};
