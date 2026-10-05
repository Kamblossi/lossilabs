const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["js/video-handler.BDfMoYwR.js", "js/preload-helper.CEWoU19s.js"]))) => i.map(i => d[i]);
import {
    _ as T
} from "../../preload-helper.CEWoU19s.js";
import {
    d as A
} from "../../vendor.3B3OSiTz.js";
import {
    b as C
} from "../../blocks.lZcM2_hG.js";

function P() {
    return document.fonts && document.fonts.ready ? document.fonts.ready : new Promise(e => setTimeout(e, 1e3))
}
const H = {
    debug: !1,
    inview: !0,
    options: {
        contentAnimationDelay: 1.6,
        contentAnimationDuration: .8,
        contentStaggerDelay: .05,
        buttonDelay: .4,
        buttonAnimationDuration: .6,
        clipPathDuration: 2,
        clipPathDelay: .3,
        clipPathEase: "expo.inOut",
        backgroundOpacityStart: .875,
        backgroundOpacityEnd: .6,
        backgroundScaleStart: 1,
        backgroundScaleEnd: 1.2,
        transitionGap: .5,
        charFadeValue: .4,
        charStagger: .05,
        lineStagger: .05,
        transitionDuration: .5,
        scrollAmount: 1,
        scrollDistancePerItem: 1e3,
        intersection: {
            root: null,
            rootMargin: "0px",
            threshold: 0
        }
    },
    elements: {
        main: null,
        scroller: null,
        background: null,
        backgroundFixed: null,
        backgroundCanvas: null,
        heading: null,
        text: null,
        button: null
    },
    timelines: {
        contentAnimation: null,
        backgroundAnimation: null,
        backgroundFixed: null,
        scroller: null,
        videoContainer: null
    },
    splitTexts: [],
    async mount() {
        this.initElements(), this.initClipPathAnimation(), this.initVideoHandler(), this.initIntersectionObserver(), this.reinitializeScrollTriggers(), await this.initMainContentAnimations(), this._unregisterResize = C.onResize(A(() => {
            this.log("Handling resize - refreshing ScrollTriggers"), this.killScrollTriggers(), this.revertSplitTexts(), this.reinitializeScrollTriggers()
        }, 200))
    },
    initElements() {
        this.elements.main = this.$one(".hero_main"), this.elements.scroller = this.$one(".hero_scroller"), this.elements.background = this.$one(".hero_background"), this.elements.backgroundFixed = this.$one(".background_frame"), this.elements.backgroundCanvas = this.$one(".background_canvas"), this.elements.heading = this.$one(".main_heading"), this.elements.text = this.$one(".main_text"), this.elements.button = this.$one(".main_button"), this.elements.videoContainer = this.$one(".js-video-handler")
    },
    killScrollTriggers() {
        Object.values(this.timelines).forEach(e => {
            e && e.kill()
        }), Object.keys(this.timelines).forEach(e => {
            this.timelines[e] = null
        })
    },
    revertSplitTexts() {
        this.splitTexts.forEach(e => e ?.revert ?.()), this.splitTexts = []
    },
    reinitializeScrollTriggers() {
        this.initBackgroundAnimation(), this.initBackgroundFixed(), this.initScroller()
    },
    animateBackgroundChild(e) {
        const {
            backgroundOpacityStart: t,
            backgroundOpacityEnd: i,
            backgroundScaleStart: l,
            backgroundScaleEnd: a
        } = this.options, h = t - e * (t - i), r = l + e * (a - l);
        if (this.elements.backgroundCanvas) {
            const d = this.elements.backgroundCanvas.firstElementChild;
            d && gsap.set(d, {
                opacity: h,
                scale: r
            })
        }
    },
    initClipPathAnimation() {
        if (typeof gsap < "u" && this.elements.backgroundFixed) {
            this.log("Initialising clipPath animation");
            const e = this.elements.backgroundCanvas;
            if (e) {
                const i = window.matchMedia("(min-width: 1025px)").matches ? "200px" : "100px";
                gsap.fromTo(e, {
                    clipPath: `inset(50% 50% 50% 50% round ${i})`
                }, {
                    clipPath: "inset(0% 0% 0% 0% round 20px)",
                    duration: this.options.clipPathDuration,
                    delay: this.options.clipPathDelay,
                    ease: this.options.clipPathEase,
                    onComplete: () => {
                        gsap.set(this.elements.backgroundCanvas, {
                            clipPath: "inset(0% round 0%)"
                        })
                    }
                })
            }
        }
    },
    async initMainContentAnimations() {
        if (typeof gsap < "u") {
            if (this.log("Initialising main content animations"), window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                this.log("Reduced motion detected, skipping animations");
                return
            }
            await P(), this.timelines.contentAnimation = gsap.timeline({
                delay: this.options.contentAnimationDelay
            }), typeof SplitText < "u" && (this.elements.heading && this.setupTextLines(this.elements.heading, "heading"), this.elements.text && this.setupTextLines(this.elements.text, "text")), this.addContentAnimationsToTimeline()
        }
    },
    setupTextLines(e, t) {
        const i = new SplitText(e, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
            aria: !1
        });
        gsap.set(i.lines, {
            y: 110
        }), e.style.opacity = 1, t === "heading" ? this.headingSplit = i : t === "text" && (this.textSplit = i)
    },
    addContentAnimationsToTimeline() {
        this.elements.heading && this.headingSplit && this.timelines.contentAnimation.to(this.headingSplit.lines, {
            ease: "power2.out",
            y: 0,
            stagger: {
                each: this.options.contentStaggerDelay
            },
            duration: this.options.contentAnimationDuration
        }, 0), this.elements.text && this.textSplit && this.timelines.contentAnimation.to(this.textSplit.lines, {
            ease: "power2.out",
            y: 0,
            stagger: {
                each: this.options.contentStaggerDelay
            },
            duration: this.options.contentAnimationDuration
        }, 0), this.elements.button && (gsap.set(this.elements.button, {
            opacity: 0,
            y: 20,
            scale: .9
        }), this.timelines.contentAnimation.to(this.elements.button, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.7)",
            duration: this.options.buttonAnimationDuration
        }, this.options.buttonDelay))
    },
    initBackgroundAnimation() {
        typeof gsap < "u" && typeof ScrollTrigger < "u" && this.elements.main && this.elements.backgroundFixed && (this.log("Initialising background animation ScrollTrigger"), this.timelines.backgroundAnimation = ScrollTrigger.create({
            trigger: this.elements.main,
            start: "top top",
            end: "bottom+=50px bottom",
            scrub: 1,
            markers: this.debug ?? !1,
            onUpdate: e => {
                const t = e.progress,
                    l = window.matchMedia("(max-width: 1024px)").matches ? 8 : 12,
                    a = l - l * t,
                    h = 20 - 20 * t,
                    r = `calc(100% - ${a*2}px)`,
                    d = `calc(100vh - ${a*2}px)`;
                this.elements.backgroundFixed.style.top = `${a}px`, this.elements.backgroundFixed.style.left = `${a}px`, this.elements.backgroundFixed.style.width = r, this.elements.backgroundFixed.style.height = d, this.elements.backgroundFixed.style.borderRadius = `${h}px`
            }
        }))
    },
    initBackgroundFixed() {
        if (typeof gsap < "u" && typeof ScrollTrigger < "u" && this.elements.main && this.elements.backgroundFixed) {
            if (this.log("Initialising background fixed ScrollTrigger"), this.elements.scroller && this.elements.scroller.querySelector(".main_item")) {
                this.log("Scroller detected, background pin will be created after scroller initialization");
                return
            }
            this.timelines.backgroundFixed = ScrollTrigger.create({
                trigger: this.block,
                start: "top top",
                end: "bottom bottom",
                pin: this.elements.background,
                pinSpacing: !1,
                markers: this.debug ?? !1,
                onUpdate: t => {
                    this.animateBackgroundChild(t.progress)
                }
            })
        }
    },
    initScroller() {
        if (typeof gsap < "u" && typeof ScrollTrigger < "u" && typeof SplitText < "u" && this.elements.scroller) {
            this.log("Initialising scroller section");
            const e = this.elements.scroller.querySelector(".progress_bar"),
                t = this.elements.scroller.querySelector(".index_current"),
                i = this.elements.scroller.querySelectorAll(".main_item");
            if (!e || !t || i.length === 0) {
                this.log("Scroller elements not found");
                return
            }
            const a = i.length,
                {
                    transitionGap: h,
                    charFadeValue: r,
                    lineStagger: d,
                    transitionDuration: w,
                    scrollAmount: g,
                    scrollDistancePerItem: b
                } = this.options;
            gsap.set(i[0], {
                autoAlpha: 1
            }), i.forEach((o, s) => {
                s > 0 && gsap.set(o, {
                    autoAlpha: 0
                })
            }), this.splitTexts = [], i.forEach((o, s) => {
                const n = o.querySelector("p");
                if (n) {
                    const c = new SplitText(n, {
                        type: "lines, chars",
                        linesClass: "line",
                        charsClass: "char",
                        mask: "lines",
                        aria: !1
                    });
                    this.splitTexts[s] = c, gsap.set(c.chars, {
                        opacity: r
                    })
                }
            });
            let u = 0;
            const x = (o, s) => {
                o !== s && (o >= 0 && this.splitTexts[o] && gsap.to(this.splitTexts[o].lines, {
                    autoAlpha: 0,
                    y: -30,
                    ease: "power4.out",
                    duration: .4,
                    stagger: d,
                    onComplete: () => gsap.set(i[o], {
                        autoAlpha: 0
                    })
                }), gsap.delayedCall(h, () => {
                    s >= 0 && this.splitTexts[s] && (gsap.set(i[s], {
                        autoAlpha: 1
                    }), gsap.fromTo(this.splitTexts[s].lines, {
                        autoAlpha: 0,
                        y: 30
                    }, {
                        autoAlpha: 1,
                        y: 0,
                        ease: "power4.out",
                        duration: w,
                        stagger: d
                    }))
                }))
            };
            if (this.timelines.scroller = ScrollTrigger.create({
                    trigger: this.elements.scroller,
                    start: "top top",
                    end: () => `+=${a*b*g}px`,
                    pin: !0,
                    scrub: !0,
                    markers: this.debug ?? !1,
                    onUpdate: o => {
                        const s = Math.min(o.progress, g) / g;
                        let n = Math.floor(s * a + 1e-6);
                        n = Math.max(0, Math.min(a - 1, n)), gsap.set(e, {
                            scaleX: s
                        });
                        const c = n + 1;
                        if (t.textContent = c.toString().padStart(2, "0"), n !== u && (x(u, n), u = n), this.splitTexts[n]) {
                            const p = s * a - n,
                                v = Math.min(p * 1.5, 1),
                                y = this.splitTexts[n].chars.length,
                                m = Math.floor(v * y);
                            this.splitTexts[n].chars.forEach((f, k) => {
                                if (k < m) gsap.set(f, {
                                    opacity: 1
                                });
                                else if (k === m) {
                                    const S = v * y - m;
                                    gsap.set(f, {
                                        opacity: r + S * (1 - r)
                                    })
                                } else gsap.set(f, {
                                    opacity: r
                                })
                            })
                        }
                    }
                }), !this.timelines.backgroundFixed) {
                const o = this.elements.scroller.offsetTop,
                    s = this.elements.scroller.offsetHeight,
                    n = a * b * g,
                    c = o + s + n;
                this.timelines.backgroundFixed = ScrollTrigger.create({
                    trigger: this.block,
                    start: "top top",
                    end: () => `+=${c}px`,
                    pin: this.elements.background,
                    pinSpacing: !1,
                    markers: this.debug ?? !1,
                    onUpdate: p => {
                        this.animateBackgroundChild(p.progress)
                    }
                }), ScrollTrigger.refresh(), this.log("Created background pin with pixel-based distances:", "log", {
                    scrollerOffset: o + "px",
                    scrollerHeight: s + "px",
                    animationDistance: n + "px",
                    total: c + "px"
                })
            }
        }
    },
    initIntersectionObserver() {
        this.checkInitialViewportState(), this.intersectionObserver = new IntersectionObserver(e => {
            e.forEach(t => {
                const i = this.inview;
                this.inview = t.isIntersecting, i !== this.inview && (this.inview ? (this.log("👁️ Intersection Observer: Hero block entered viewport"), document.documentElement.classList.add("invert-logo"), this.videoHandler && this.videoHandler.videoEl ? this.resumeVideo() : this.elements.videoContainer && this.log("⏳ Video handler not ready yet, storing viewport state for later")) : (this.log("👁️ Intersection Observer: Hero block left viewport"), document.documentElement.classList.remove("invert-logo"), this.videoHandler && this.videoHandler.videoEl ? this.pauseVideoForViewport() : this.elements.videoContainer && this.log("⏳ Video handler not ready yet, storing viewport state for later")))
            })
        }, this.options.intersection), this.intersectionObserver.observe(this.block)
    },
    checkInitialViewportState() {
        const e = this.block.getBoundingClientRect(),
            t = e.top < window.innerHeight && e.bottom > 0;
        this.inview = t, t ? document.documentElement.classList.add("invert-logo") : document.documentElement.classList.remove("invert-logo"), this.log("📍 Initial viewport state:", t ? "IN viewport" : "OUT of viewport"), this.log("📍 Block position:", "top:", Math.round(e.top), "bottom:", Math.round(e.bottom), "window height:", window.innerHeight)
    },
    processPendingViewportActions() {
        this.videoHandler && this.videoHandler.videoEl && (this.log("🎬 Processing pending viewport actions - current inview state:", "log", this.inview), this.inview || this.pauseVideoForViewport())
    },
    resumeVideo() {
        this.videoHandler && this.videoHandler.videoEl && this.wasPlayingBefore && !this.userManuallyPaused ? (this.log("🎬 Intersection Observer: Resuming video playback (entered viewport)"), this.videoHandler.videoEl.play().catch(e => {
            this.log("❌ Failed to resume video:", "warn", e)
        })) : this.log("⏸️ Intersection Observer: Video not resumed - videoHandler:", !!this.videoHandler, "video element:", !!this.videoHandler ?.videoEl, "wasPlayingBefore:", this.wasPlayingBefore, "userManuallyPaused:", this.userManuallyPaused)
    },
    pauseVideoForViewport() {
        this.videoHandler && this.videoHandler.videoEl && !this.videoHandler.videoEl.paused ? (this.log("⏸️ Intersection Observer: Pausing video playback (left viewport)"), this.wasPlayingBefore = !0, this.videoHandler.videoEl.pause()) : this.log("ℹ️ Intersection Observer: Video not paused - videoHandler:", !!this.videoHandler, "video element:", !!this.videoHandler ?.videoEl, "paused:", this.videoHandler ?.videoEl ?.paused)
    },
    initVideoHandler() {
        this.elements.videoContainer ? (this.log("Initializing video handler for hero-xl"), T(async () => {
            const {
                default: e
            } = await
            import ("../../video-handler.BDfMoYwR.js");
            return {
                default: e
            }
        }, __vite__mapDeps([0, 1])).then(({
            default: e
        }) => {
            this.videoHandler = new e(this.block, {
                debug: this.debug ?? !1
            }), this.videoHandler.whenReady().then(t => {
                this.userManuallyPaused = !1, this.wasPlayingBefore = !1, this.processPendingViewportActions(), t.muted = !0, t.setAttribute("muted", "");
                const i = () => {
                    t.play().then(() => {
                        this.block.classList.add("has-video-ready"), this.block.classList.remove("has-video-paused"), this.log("Video played, .has-video-ready added, .has-video-paused removed"), this.wasPlayingBefore = !0, this.userManuallyPaused = !1
                    }).catch(l => {
                        console.warn("Autoplay failed:", l)
                    })
                };
                t.addEventListener("canplay", i, {
                    once: !0
                }), t.readyState >= 2 && i(), !t.paused && !t.ended && (this.block.classList.add("has-video-ready"), this.block.classList.remove("has-video-paused"), this.wasPlayingBefore = !0)
            })
        }).catch(e => {
            this.log("Failed to load video background:", "warn", e)
        })) : this.log("No video container found, skipping video handler initialization")
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["hero-xl"] = {
    default: H
});