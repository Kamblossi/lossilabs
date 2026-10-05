import {
    c as e
} from "../../text-reveal.BAzZnHIM.js";
const i = {
    debug: !1,
    inview: !1,
    mount() {
        this.textReveal = e({
            trigger: this.$el,
            scope: this.$el,
            debug: this.debug
        }).initSplitTextSync(), setTimeout(() => {
            this.textReveal.initScrollTrigger()
        }, 800)
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry.hero = {
    default: i
});