import {
    d as i
} from "../../vendor.3B3OSiTz.js";
const o = {
    debug: !1,
    inview: !1,
    scrollHandler: null,
    elements: {
        logo: null,
        navigationToggle: null
    },
    options: {
        scrollThreshold: 10
    },
    mount() {
        this.initElements(), this.initScrollDetection(), this.initLogoHref(), this.initNavigationToggle()
    },
    initElements() {
        this.elements.logo = this.$one(".logo_anchor"), this.elements.navigationToggle = this.$('[data-navigation-toggle="toggle"]')
    },
    initScrollDetection() {
        this.scrollHandler = i(() => {
            window.scrollY > this.options.scrollThreshold ? document.documentElement.classList.add("has-scrolled") : document.documentElement.classList.remove("has-scrolled")
        }, 16), window.addEventListener("scroll", this.scrollHandler)
    },
    initLogoHref() {
        lenis && this.elements.logo && this.elements.logo.classList.contains("is-home") && this.elements.logo.addEventListener("click", t => {
            t.preventDefault(), lenis.scrollTo(0, {
                duration: 1.2,
                immediate: !1
            })
        })
    },
    initNavigationToggle() {
        this.elements.navigationToggle && this.elements.navigationToggle.length > 0 && this.elements.navigationToggle.forEach(t => {
            t.addEventListener("click", () => {
                const e = this.block.getAttribute("data-navigation-status") === "active" ? "not-active" : "active";
                this.block.setAttribute("data-navigation-status", e)
            })
        })
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry.header = {
    default: o
});