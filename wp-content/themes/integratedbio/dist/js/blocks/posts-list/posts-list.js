import {
    c as p
} from "../../text-reveal.D28zYMh5.js";
const b = {
    debug: !1,
    inview: !0,
    options: {
        type: "all",
        postsToLoadMore: 3
    },
    elements: {
        blockList: null,
        listItems: null,
        loadMoreButtons: null
    },
    textReveal: null,
    allPosts: [],
    currentlyVisible: 0,
    isLoadingMore: !1,
    mount() {
        this.initElements(), this.initDirectionalListHover(), this.initLoadMore(), this.textReveal = p({
            trigger: this.$el,
            scope: this.$el,
            debug: this.debug
        }).init()
    },
    initElements() {
        this.elements.blockList = this.$one(".block_list"), this.elements.listItems = this.$(".list_item"), this.elements.loadMoreButtons = this.$(".js-more")
    },
    initDirectionalListHover() {
        if (!this.elements.blockList) return;
        const e = window.matchMedia("(hover: hover) and (pointer: fine)"),
            t = window.matchMedia("(min-width: 1025px)");
        if (!e.matches || !t.matches) return;
        const n = {
                top: "translateY(-100%)",
                bottom: "translateY(100%)",
                left: "translateX(-100%)",
                right: "translateX(100%)"
            },
            d = this.options.type;
        this.elements.listItems.forEach(s => {
            const i = s.querySelector(".item_hover");
            i && (s.addEventListener("mouseenter", l => {
                const o = h(l, s, d);
                i.style.transition = "none", i.style.transform = n[o] || "translate(0, 0)", i.offsetHeight, i.style.transition = "", i.style.transform = "translate(0%, 0%)", s.setAttribute("data-status", `enter-${o}`)
            }), s.addEventListener("mouseleave", l => {
                const o = h(l, s, d);
                s.setAttribute("data-status", `leave-${o}`), i.style.transform = n[o] || "translate(0, 0)"
            }))
        });

        function h(s, i, l) {
            const {
                left: o,
                top: m,
                width: c,
                height: u
            } = i.getBoundingClientRect(), r = s.clientX - o, a = s.clientY - m;
            if (l === "y") return a < u / 2 ? "top" : "bottom";
            if (l === "x") return r < c / 2 ? "left" : "right";
            const y = {
                top: a,
                right: c - r,
                bottom: u - a,
                left: r
            };
            return Object.entries(y).reduce((g, f) => g[1] < f[1] ? g : f)[0]
        }
    },
    initLoadMore() {
        if (!this.elements.listItems.length || !this.elements.loadMoreButtons.length) return;
        this.allPosts = Array.from(this.elements.listItems);
        const e = parseInt(this.block.getAttribute("data-initial-posts")) || this.allPosts.length;
        this.currentlyVisible = Math.min(e, this.allPosts.length), this.updateVisiblePosts(), this.elements.loadMoreButtons.forEach(t => {
            t.addEventListener("click", () => this.loadMore())
        }), this.updateLoadMoreButtons()
    },
    updateVisiblePosts() {
        this.allPosts.forEach((e, t) => {
            t < this.currentlyVisible ? (e.style.display = "", e.classList.add("is-visible")) : (e.style.display = "none", e.classList.remove("is-visible"))
        })
    },
    updateLoadMoreButtons() {
        if (!this.elements.loadMoreButtons.length) return;
        const e = this.currentlyVisible < this.allPosts.length;
        this.elements.loadMoreButtons.forEach(t => {
            t.dataset.defaultLabel || (t.dataset.defaultLabel = t.getAttribute("data-label") || t.textContent.trim());
            const n = t.dataset.defaultLabel;
            if (e) {
                t.style.display = "", t.disabled = this.isLoadingMore, t.setAttribute("data-label", this.isLoadingMore ? "Loading..." : n);
                const d = t.querySelector(".btn_label");
                d && (d.textContent = this.isLoadingMore ? "Loading..." : n)
            } else t.style.display = "none"
        })
    },
    async loadMore() {
        if (this.isLoadingMore) return;
        this.isLoadingMore = !0, this.updateLoadMoreButtons();
        try {
            const e = this.allPosts.length,
                t = this.allPosts.slice(this.currentlyVisible, e);
            gsap.set(t, {
                opacity: 0,
                y: 20,
                display: ""
            }), await gsap.to(t, {
                opacity: 1,
                y: 0,
                stagger: .1,
                duration: .4
            }), this.currentlyVisible = e, this.updateVisiblePosts(), typeof ScrollTrigger < "u" && ScrollTrigger.refresh()
        } finally {
            this.isLoadingMore = !1, this.updateLoadMoreButtons()
        }
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["posts-list"] = {
    default: b
});