class r {
    constructor() {
        this.transitionDuration = 1e3, this.init()
    }
    init() {
        document.documentElement.classList.contains("is-animating") && setTimeout(() => {
            document.documentElement.classList.remove("is-animating")
        }, this.transitionDuration), window.addEventListener("beforeunload", () => {
            document.documentElement.classList.add("is-animating")
        })
    }
}
new r;
const c = 250,
    d = (t, n) => {
        if (typeof t != "function") throw new TypeError("Expected a function");
        if (typeof n != "number" || n < 0) throw new TypeError("Wait must be a positive number")
    },
    m = (t, n = c, o = !1) => {
        d(t, n);
        let e;
        return {
            debouncedFn: function(...i) {
                const s = this,
                    a = () => {
                        e = null, o || t.apply(s, i)
                    },
                    u = o && !e;
                clearTimeout(e), e = setTimeout(a, n), u && t.apply(s, i)
            },
            getTimeout: () => e
        }
    },
    p = (t, n = c, o = !1) => {
        const {
            debouncedFn: e
        } = m(t, n, o);
        return e
    };
export {
    p as d
};