const p = {
    debug: !1,
    inview: !0,
    options: {
        type: "all"
    },
    elements: {
        blockList: null,
        listItems: null,
        modalItems: null
    },
    textReveal: null,
    mount() {
        this.initElements(), this.initDirectionalListHover(), this.initModal()
    },
    initElements() {
        this.elements.blockList = this.$one(".block_list"), this.elements.listItems = this.$(".list_item"), this.elements.modalItems = this.$("[data-modal-item]")
    },
    initDirectionalListHover() {
        if (!this.elements.blockList) return;
        const s = window.matchMedia("(hover: hover) and (pointer: fine)"),
            c = window.matchMedia("(min-width: 1025px)");
        if (!s.matches || !c.matches) return;
        const o = {
                top: "translateY(-100%)",
                bottom: "translateY(100%)",
                left: "translateX(-100%)",
                right: "translateX(100%)"
            },
            l = this.options.type;
        this.elements.listItems.forEach(t => {
            const e = t.querySelector(".item_hover");
            e && (t.addEventListener("mouseenter", i => {
                const n = a(i, t, l);
                e.style.transition = "none", e.style.transform = o[n] || "translate(0, 0)", e.offsetHeight, e.style.transition = "", e.style.transform = "translate(0%, 0%)", t.setAttribute("data-status", `enter-${n}`)
            }), t.addEventListener("mouseleave", i => {
                const n = a(i, t, l);
                t.setAttribute("data-status", `leave-${n}`), e.style.transform = o[n] || "translate(0, 0)"
            }))
        });

        function a(t, e, i) {
            const {
                left: n,
                top: g,
                width: m,
                height: h
            } = e.getBoundingClientRect(), r = t.clientX - n, d = t.clientY - g;
            if (i === "y") return d < h / 2 ? "top" : "bottom";
            if (i === "x") return r < m / 2 ? "left" : "right";
            const w = {
                top: d,
                right: m - r,
                bottom: h - d,
                left: r
            };
            return Object.entries(w).reduce((u, f) => u[1] < f[1] ? u : f)[0]
        }
    },
    initModal() {
        if (!this.elements.modalItems.length) {
            this.log("Modal items not found", "warn");
            return
        }
        this.on("click", this.elements.modalItems, this.handleModalClick), this.log("Modal functionality initialized", "log", {
            modalItems: this.elements.modalItems.length
        })
    },
    handleModalClick(s) {
        s.preventDefault();
        const o = s.currentTarget.querySelector(".item_modal");
        if (!o) {
            this.log("Modal content not found", "error");
            return
        }
        const l = o.innerHTML,
            a = new CustomEvent("modal-bio:open", {
                detail: {
                    contentHTML: l,
                    sourceBlock: "team-list"
                }
            });
        document.dispatchEvent(a), this.log("Modal open event dispatched from team-list", "log")
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["team-list"] = {
    default: p
});