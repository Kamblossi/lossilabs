import {
    c as e
} from "../../text-reveal.BAzZnHIM.js";
const i = {
    debug: !1,
    inview: !0,
    mount() {
        this.textReveal = e({
            trigger: this.$el,
            scope: this.$el,
            debug: this.debug
        }).init()
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["posts-grid"] = {
    default: i
});