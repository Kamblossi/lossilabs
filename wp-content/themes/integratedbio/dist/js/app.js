import {
    g as r
} from "./gsap.CH_iu5NA.js";
import {
    S as a
} from "./gsapScrollTrigger.C4gmGO9R.js";
import {
    S as w
} from "./gsapSplitText.Cpc1cBKW.js";
import {
    M as h
} from "./gsapMorphSVGPlugin.Dqn9TAat.js";
import {
    e as S,
    b as g
} from "./blocks.lZcM2_hG.js";
import {
    d as v
} from "./vendor.3B3OSiTz.js";
import {
    L as y
} from "./animations.B9scULNb.js";
const c = {
    text: {
        default: "M0 0h5.63c7.808 0 13.536 7.337 11.642 14.91l-6.09 24.359A11.527 11.527 0 0 1 0 48V0Z",
        hover: "M0 0c5.29 0 9.9 3.6 11.183 8.731l6.09 24.359C19.165 40.663 13.437 48 5.63 48H0V0Z"
    },
    blob: {
        default: "M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z",
        hover: "M.728 14.91C-1.166 7.338 4.562 0 12.369 0H39c6.628 0 12 5.373 12 12v24c0 6.627-5.372 12-12 12H18.37a12 12 0 0 1-11.641-9.09l-6-24Z"
    }
};

function L() {
    const o = document.querySelectorAll(".u-btn--1, .u-btn--2, .u-btn--4");
    o.length !== 0 && o.forEach(e => {
        const d = e.classList.contains("u-btn--2") || e.classList.contains("u-btn--4");
        let i = null,
            t = null;
        if (d) {
            const n = e.querySelector(".btn_icon svg");
            if (!n) {
                console.warn("Button morph: Icon SVG not found for arrow-only button", e);
                return
            }
            if (t = n.querySelector("path"), !t) {
                console.warn("Button morph: Icon path not found for arrow-only button", e);
                return
            }
        } else {
            const n = e.querySelector(".btn_label svg"),
                m = e.querySelector(".btn_icon svg");
            if (!n || !m) {
                console.warn("Button morph: SVG elements not found", e);
                return
            }
            if (i = n.querySelector("path"), t = m.querySelector("path"), !i || !t) {
                console.warn("Button morph: Path elements not found", e);
                return
            }
        }
        if (d) {
            const n = e.closest(".list_item");
            n ? (n.addEventListener("mouseenter", () => {
                l(i, t)
            }), n.addEventListener("mouseleave", () => {
                u(i, t)
            })) : (e.addEventListener("mouseenter", () => {
                l(i, t)
            }), e.addEventListener("mouseleave", () => {
                u(i, t)
            }))
        } else e.addEventListener("mouseenter", () => {
            l(i, t)
        }), e.addEventListener("mouseleave", () => {
            u(i, t)
        })
    })
}

function l(o, e) {
    e && (o && gsap.to(o, {
        morphSVG: c.text.hover,
        duration: .3,
        ease: "power2.out"
    }), gsap.to(e, {
        morphSVG: c.blob.hover,
        duration: .3,
        ease: "power2.out"
    }))
}

function u(o, e) {
    e && (o && gsap.to(o, {
        morphSVG: c.text.default,
        duration: .3,
        ease: "power2.out"
    }), gsap.to(e, {
        morphSVG: c.blob.default,
        duration: .3,
        ease: "power2.out"
    }))
}
window.gsap = r;
window.ScrollTrigger = a;
window.SplitText = w;
window.MorphSVGPlugin = h;
r.registerPlugin(w, a, h);
let s = null;
window.utils = window.utils || {};
const T = performance.navigation.type === 1 || performance.getEntriesByType("navigation")[0] ?.type === "reload",
    E = sessionStorage.getItem("hasVisited");
window.utils.hasVisited = E === "true" && !T;
let f = window.innerWidth;
const V = v(() => {
        window.innerWidth !== f && (f = window.innerWidth, g.fireResize(), a.refresh())
    }, 300),
    M = () => {
        if (typeof window.UnicornStudio < "u" && typeof window.UnicornStudio.init == "function") {
            window.UnicornStudio.init()
        }
    },
    p = async () => {
        window.scrollTo(0, 0);
        const o = async () => {
                s = new y({
                    lerp: .1,
                    duration: 1.2,
                    autoRaf: !1,
                    anchors: !0,
                    wrapper: window,
                    content: document.documentElement,
                    prevent: n => n.classList.contains("modal_view")
                }), window.lenis = s, typeof a < "u" && s.on("scroll", a.update), typeof r < "u" && (r.ticker.add(n => {
                    s.raf(n * 1e3)
                }), r.ticker.lagSmoothing(0)), setTimeout(() => {
                    window.scrollTo(0, 0), s.scrollTo(0, {
                        immediate: !0
                    })
                }, 100), window.matchMedia("(prefers-reduced-motion: reduce)").matches && (document.documentElement.classList.add("has-reduced-motion"), s.stop()), document.querySelector(".c-hero-xl") && (s.stop(), setTimeout(() => {
                    s.start()
                }, 2300)), S(() => {
                    g.init({
                        debug: !1,
                        inview: {
                            matchMedia: "(prefers-reduced-motion: no-preference) and (min-width: 1025px)",
                            animation: {
                                from: {
                                    opacity: 0,
                                    y: 20
                                },
                                to: {
                                    opacity: 1,
                                    y: 0,
                                    duration: .8,
                                    ease: "power2.out",
                                    stagger: .05
                                }
                            },
                            scrollTrigger: {
                                start: "top 80%",
                                toggleActions: "play none none none",
                                scrub: !1
                            }
                        }
                    }), L(), M()
                }, {
                    timeout: 1e3
                });
                const t = document.querySelector("main[data-load-container]");
                t && (t.classList.remove("is-loading"), t.classList.add("has-loaded"))
            },
            e = () => {
                document.documentElement.classList.remove("css-loading"), document.documentElement.classList.add("css-ready")
            },
            d = async () => {
                document.documentElement.classList.remove("is-loading"), document.documentElement.classList.add("has-loaded")
            };
        o(), e(), await d(), window.utils.hasVisited || sessionStorage.setItem("hasVisited", "true"), window.addEventListener("resize", V, {
            passive: !0
        })
    };
document.readyState === "complete" ? p() : document.addEventListener("DOMContentLoaded", () => {
    p()
});