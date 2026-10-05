const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["js/video-handler.BDfMoYwR.js", "js/preload-helper.CEWoU19s.js"]))) => i.map(i => d[i]);
import {
    _ as s
} from "../../preload-helper.CEWoU19s.js";
const n = {
    debug: !1,
    inview: !0,
    options: {
        intersection: {
            root: null,
            rootMargin: "0px",
            threshold: 0
        }
    },
    elements: {
        logo: null,
        videoContainer: null,
        background: null
    },
    async mount() {
        this.initElements(), this.initLogoHref(), this.initIntersectionObserver(), this.initVideoHandler(), this.initParallaxEffect()
    },
    initElements() {
        this.elements.logo = this.$one(".logo_anchor"), this.elements.videoContainer = this.$one(".js-video-handler"), this.elements.background = this.$one(".footer_background")
    },
    initLogoHref() {
        lenis && this.elements.logo && this.elements.logo.classList.contains("is-home") && this.elements.logo.addEventListener("click", e => {
            e.preventDefault(), lenis.scrollTo(0, {
                immediate: !0
            })
        })
    },
    initIntersectionObserver() {
        this.checkInitialViewportState(), this.intersectionObserver = new IntersectionObserver(e => {
            e.forEach(i => {
                const t = this.inview;
                this.inview = i.isIntersecting, t !== this.inview && (this.inview ? (this.log("👁️ Intersection Observer: Footer block entered viewport"), this.videoHandler && this.videoHandler.videoEl ? this.resumeVideo() : this.elements.videoContainer && this.log("⏳ Video handler not ready yet, storing viewport state for later")) : (this.log("👁️ Intersection Observer: Footer block left viewport"), this.videoHandler && this.videoHandler.videoEl ? this.pauseVideoForViewport() : this.elements.videoContainer && this.log("⏳ Video handler not ready yet, storing viewport state for later")))
            })
        }, this.options.intersection), this.intersectionObserver.observe(this.block)
    },
    checkInitialViewportState() {
        const e = this.block.getBoundingClientRect(),
            i = e.top < window.innerHeight && e.bottom > 0;
        this.inview = i, this.log("📍 Initial viewport state:", i ? "IN viewport" : "OUT of viewport"), this.log("📍 Block position:", "top:", Math.round(e.top), "bottom:", Math.round(e.bottom), "window height:", window.innerHeight)
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
    initParallaxEffect() {
        this.elements.background && window.gsap && window.ScrollTrigger ? (this.log("Initializing parallax effect for footer background"), gsap.set(this.elements.background, {
            y: -120,
            opacity: .6
        }), gsap.to(this.elements.background, {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: this.block,
                start: "top bottom",
                end: "bottom bottom",
                scrub: !0,
                markers: this.debug ?? !0,
                onUpdate: e => {
                    this.log("Parallax progress:", e.progress.toFixed(3))
                }
            }
        })) : this.log("GSAP or ScrollTrigger not available, skipping parallax effect")
    },
    initVideoHandler() {
        this.elements.videoContainer ? (this.log("Initializing video handler for footer"), s(async () => {
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
            }), this.videoHandler.whenReady().then(i => {
                this.userManuallyPaused = !1, this.wasPlayingBefore = !1, this.processPendingViewportActions(), i.muted = !0, i.setAttribute("muted", "");
                const t = () => {
                    i.play().then(() => {
                        this.block.classList.add("has-video-ready"), this.block.classList.remove("has-video-paused"), this.log("Video played, .has-video-ready added, .has-video-paused removed"), this.wasPlayingBefore = !0, this.userManuallyPaused = !1
                    }).catch(o => {
                        console.warn("Autoplay failed:", o)
                    })
                };
                i.addEventListener("canplay", t, {
                    once: !0
                }), i.readyState >= 2 && t(), !i.paused && !i.ended && (this.block.classList.add("has-video-ready"), this.block.classList.remove("has-video-paused"), this.wasPlayingBefore = !0)
            })
        }).catch(e => {
            this.log("Failed to load video background:", "warn", e)
        })) : this.log("No video container found, skipping video handler initialization")
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry.footer = {
    default: n
});