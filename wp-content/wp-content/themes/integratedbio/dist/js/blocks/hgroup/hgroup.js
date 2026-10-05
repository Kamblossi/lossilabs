import {
    c as y
} from "../../text-reveal.BAzZnHIM.js";
const w = {
    debug: !1,
    inview: !0,
    options: {
        type: "all"
    },
    elements: {
        blockList: null,
        listItems: null,
        accordionItems: null
    },
    textReveal: null,
    mount() {
        this.initElements(), this.initDirectionalListHover(), this.initAccordions(), this.textReveal = y({
            trigger: this.$el,
            scope: this.$el,
            debug: this.debug
        }).init()
    },
    initElements() {
        this.elements.blockList = this.$one(".block_list"), this.elements.listItems = this.$(".list_item"), this.elements.accordionItems = this.$(".list_item[data-accordion-status]")
    },
    initDirectionalListHover() {
        if (!this.elements.blockList) return;
        const o = window.matchMedia("(hover: hover) and (pointer: fine)"),
            a = window.matchMedia("(min-width: 1025px)");
        if (!o.matches || !a.matches) return;
        const r = {
                top: "translateY(-100%)",
                bottom: "translateY(100%)",
                left: "translateX(-100%)",
                right: "translateX(100%)"
            },
            t = this.options.type;
        this.elements.listItems.forEach(e => {
            const i = e.querySelector(".item_hover");
            i && (e.addEventListener("mouseenter", n => {
                const s = l(n, e, t);
                i.style.transition = "none", i.style.transform = r[s] || "translate(0, 0)", i.offsetHeight, i.style.transition = "", i.style.transform = "translate(0%, 0%)", e.setAttribute("data-status", `enter-${s}`)
            }), e.addEventListener("mouseleave", n => {
                const s = l(n, e, t);
                e.setAttribute("data-status", `leave-${s}`), i.style.transform = r[s] || "translate(0, 0)"
            }))
        });

        function l(e, i, n) {
            const {
                left: s,
                top: m,
                width: d,
                height: u
            } = i.getBoundingClientRect(), c = e.clientX - s, h = e.clientY - m;
            if (n === "y") return h < u / 2 ? "top" : "bottom";
            if (n === "x") return c < d / 2 ? "left" : "right";
            const p = {
                top: h,
                right: d - c,
                bottom: u - h,
                left: c
            };
            return Object.entries(p).reduce((g, f) => g[1] < f[1] ? g : f)[0]
        }
    },
    initAccordions() {
        !this.elements.accordionItems || this.elements.accordionItems.length === 0 || this.elements.accordionItems.forEach(o => {
            const a = o.querySelector(".item_inner");
            a && a.addEventListener("click", r => {
                r.preventDefault(), r.stopPropagation();
                const t = o.querySelector(".item_accordion_body");
                if (!t) return;
                const l = o.getAttribute("data-accordion-status") === "active",
                    e = !l;
                if (o.setAttribute("data-accordion-status", l ? "not-active" : "active"), a.setAttribute("aria-expanded", e ? "true" : "false"), t.setAttribute("aria-hidden", e ? "false" : "true"), e) {
                    t.style.height = "auto";
                    const i = t.offsetHeight;
                    t.style.height = "0", window.gsap ? window.gsap.to(t, {
                        duration: .6,
                        height: i,
                        opacity: 1,
                        ease: "power2.out",
                        onComplete: () => {
                            t.style.height = "auto"
                        }
                    }) : (t.style.transition = "height 0.6s ease-out, opacity 0.6s ease-out", t.style.height = i + "px", t.style.opacity = "1", setTimeout(() => {
                        t.style.height = "auto"
                    }, 600))
                } else {
                    const i = t.offsetHeight;
                    t.style.height = i + "px", t.offsetHeight, window.gsap ? window.gsap.to(t, {
                        duration: .6,
                        height: 0,
                        opacity: 0,
                        ease: "power2.in-out",
                        onComplete: () => {
                            t.style.height = "0"
                        }
                    }) : (t.style.transition = "height 0.6s ease-out, opacity 0.6s ease-out", t.style.height = "0", t.style.opacity = "0", setTimeout(() => {
                        t.style.height = "0"
                    }, 600))
                }
            })
        })
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry.hgroup = {
    default: w
});