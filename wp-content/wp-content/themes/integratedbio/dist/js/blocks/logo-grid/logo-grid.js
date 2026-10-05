const y = {
    debug: !1,
    inview: !0,
    options: {
        type: "all"
    },
    elements: {
        logosParent: null,
        logosItem: null
    },
    mount() {
        this.initElements(), this.initDirectionalListHover()
    },
    initElements() {
        this.elements.logosParent = this.$one(".logos"), this.elements.logosItem = this.$(".logos_item")
    },
    initDirectionalListHover() {
        if (!this.elements.logosParent) return;
        const g = window.matchMedia("(hover: hover) and (pointer: fine)"),
            u = window.matchMedia("(min-width: 1025px)");
        if (!g.matches || !u.matches) return;
        const r = {
                top: "translateY(-100%)",
                bottom: "translateY(100%)",
                left: "translateX(-100%)",
                right: "translateX(100%)"
            },
            l = this.options.type;
        this.elements.logosItem.forEach(t => {
            const e = t.querySelector(".item_hover");
            e && (t.addEventListener("mouseenter", o => {
                const n = a(o, t, l);
                e.style.transition = "none", e.style.transform = r[n] || "translate(0, 0)", e.offsetHeight, e.style.transition = "", e.style.transform = "translate(0%, 0%)", t.setAttribute("data-status", `enter-${n}`)
            }), t.addEventListener("mouseleave", o => {
                const n = a(o, t, l);
                t.setAttribute("data-status", `leave-${n}`), e.style.transform = r[n] || "translate(0, 0)"
            }))
        });

        function a(t, e, o) {
            const {
                left: n,
                top: m,
                width: c,
                height: d
            } = e.getBoundingClientRect(), i = t.clientX - n, s = t.clientY - m;
            if (o === "y") return s < d / 2 ? "top" : "bottom";
            if (o === "x") return i < c / 2 ? "left" : "right";
            const w = {
                top: s,
                right: c - i,
                bottom: d - s,
                left: i
            };
            return Object.entries(w).reduce((h, f) => h[1] < f[1] ? h : f)[0]
        }
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["logo-grid"] = {
    default: y
});