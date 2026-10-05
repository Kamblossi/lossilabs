function u(e, t, n = null, i = !1, s = "") {
    if (!i) return;
    const r = `%c[●] ${e} ${t}${s?` for '${s}'`:""}`;
    n ? console.log(r, "font-weight: bold", n) : console.log(r, "font-weight: bold")
}
class B {
    constructor(t, n = {}, i = !1) {
        if (this.component = t, this.debug = i || n && n.debug || !1, this.scrollTriggers = [], this.timelines = [], this.matchMediaInstance = null, this.componentName = t.dataset.cid, !n || !n.animation || !n.scrollTrigger) {
            console.error(`[InviewAnimation] Invalid animation config for component '${this.componentName}'.`, {
                component: t,
                config: n
            });
            return
        }
        this.config = n, u("▶", "Initializing inview animation", {
            component: t,
            config: this.config
        }, this.debug, this.componentName)
    }
    init() {
        if (!this.config) {
            u("⏭", "No config found, skipping init", null, this.debug, this.componentName);
            return
        }
        this.config.matchMedia ? (this.matchMediaInstance = gsap.matchMedia(), this.matchMediaInstance.add(this.config.matchMedia, () => {
            this.createAnimations()
        })) : this.createAnimations()
    }
    createAnimations() {
        const t = this.component.querySelectorAll(this.config.trigger || ".inview-trigger");
        if (!t.length) {
            u("⏭", `No triggers found, selector: ${this.config.trigger||".inview-trigger"}`, {
                component: this.component
            }, this.debug, this.componentName);
            return
        }
        u("▶", `Found ${t.length} trigger(s)`, {
            triggers: Array.from(t)
        }, this.debug, this.componentName), t.forEach((n, i) => {
            const s = n.querySelectorAll(this.config.elements || ".inview-element");
            if (!s.length) {
                u("⏭", `No elements found for trigger ${i+1}`, {
                    trigger: n
                }, this.debug, this.componentName);
                return
            }
            u("▶", `Creating timeline (trigger ${i+1}/${t.length} with ${s.length} elements)`, {
                trigger: n,
                elements: Array.from(s)
            }, this.debug, this.componentName);
            const r = this.component.componentModule,
                l = o => {
                    if (o) return function(...a) {
                        return o.apply(r, a)
                    }
                },
                c = { ...this.config.scrollTrigger,
                    onEnter: l(this.config.scrollTrigger.onEnter),
                    onLeave: l(this.config.scrollTrigger.onLeave),
                    onEnterBack: l(this.config.scrollTrigger.onEnterBack),
                    onLeaveBack: l(this.config.scrollTrigger.onLeaveBack)
                },
                f = { ...this.config.animation,
                    to: { ...this.config.animation.to,
                        onComplete: l(this.config.animation.to.onComplete)
                    }
                },
                d = gsap.timeline({
                    scrollTrigger: {
                        markers: this.debug,
                        trigger: n,
                        ...c
                    }
                });
            if (typeof this.config.setup == "function") {
                const o = this.config.setup.call(r, {
                    elements: s,
                    trigger: n,
                    timeline: d
                });
                o instanceof Promise && d.add(() => o)
            }
            c.scrub ? d.fromTo(s, f.from, { ...f.to,
                ease: f.to.ease || "none"
            }) : d.fromTo(s, f.from, f.to), this.timelines.push(d), this.scrollTriggers.push(d.scrollTrigger)
        }), u("░", `Created ${this.timelines.length} animations across ${t.length} trigger(s)`, {
            timelines: this.timelines,
            scrollTriggers: this.scrollTriggers,
            triggers: Array.from(t)
        }, this.debug, this.componentName)
    }
    start() {
        this.timelines.forEach(t => t.play())
    }
    pause() {
        this.timelines.forEach(t => t.pause())
    }
    destroy() {
        u("▶", `Starting cleanup (${this.scrollTriggers.length} triggers, ${this.timelines.length} timelines)`, {
            scrollTriggers: this.scrollTriggers,
            timelines: this.timelines
        }, this.debug, this.componentName), this.scrollTriggers.forEach(t => {
            t && typeof t.kill == "function" && t.kill()
        }), this.scrollTriggers = [], this.timelines.forEach(t => {
            t && (t.scrollTrigger && typeof t.scrollTrigger.kill == "function" && t.scrollTrigger.kill(), t.kill())
        }), this.timelines = [], this.matchMediaInstance && typeof this.matchMediaInstance.kill == "function" && (this.matchMediaInstance.kill(), this.matchMediaInstance = null), this.component = null, this.config = null, u("░", "Cleanup complete", null, this.debug, this.componentName)
    }
}
const T = (e, t = {}) => {
        window.requestIdleCallback ? window.requestIdleCallback(e, t) : requestAnimationFrame(e)
    },
    y = {
        events: {},
        on(e, t) {
            this.events[e] || (this.events[e] = []), this.events[e].push(t)
        },
        off(e) {
            this.events[e] && (this.events[e] = [])
        },
        emit(e, t) {
            this.events[e] && this.events[e].forEach(n => n(t))
        }
    },
    $ = e => {
        const t = e.dataset.cid;
        if (!t) throw new Error("Path slug is missing for a block.");
        const n = {
            js: e.dataset.js !== void 0
        };
        return {
            pathSlug: t,
            options: n
        }
    },
    v = (e, t, n) => {
        n && console.log(`%c${e}`, "font-weight: bold;", t)
    },
    L = (e, t) => function(n, i = "log", ...s) {
        if (t) {
            const r = "✓",
                l = e.dataset.cid,
                c = `${r} [${l}]: ${n}`;
            switch (i && typeof i == "string" ? i.toLowerCase() : "log") {
                case "warn":
                    console.warn(c, ...s);
                    break;
                case "error":
                    console.error(c, ...s);
                    break;
                default:
                    console.log(c, ...s)
            }
        }
    },
    N = e => (typeof window.blockRegistry > "u" && (window.blockRegistry = {}), window.blockRegistry[e] ? window.blockRegistry[e] : (console.warn(`Block module '${e}' not found in block registry. Make sure the JS file is properly enqueued.`), null)),
    k = e => {
        e.block = e;
        const t = o => e.querySelectorAll(o),
            n = o => e.querySelector(o),
            i = o => {
                const a = `[data-ref="${o}"]`;
                return e.querySelector(a) || null
            },
            s = o => {
                const a = `[data-ref="${o}"]`;
                return e.querySelectorAll(a)
            };
        e.bindMethods = o => {
            Object.keys(o).forEach(a => {
                typeof o[a] == "function" && (o[a] = o[a].bind(o))
            })
        };
        let r = [];
        const l = (o, a, g, p) => {
                const h = (m, ...w) => {
                    g.call(void 0, m, ...w, p)
                };
                (a instanceof NodeList ? Array.from(a) : [a]).forEach(m => {
                    if (m) {
                        const w = o === "scroll" ? {
                            passive: !0
                        } : {};
                        m.addEventListener(o, h, w), r.push({
                            type: o,
                            el: m,
                            originalFunc: g,
                            boundFunc: h,
                            options: w
                        })
                    } else console.error("Invalid element for event listener:", m)
                })
            },
            c = (o, a, g) => {
                const p = r.findIndex(h => h.type === o && h.originalFunc === g);
                if (p !== -1) {
                    const h = r[p];
                    (a instanceof NodeList ? Array.from(a) : [a]).forEach(m => m.removeEventListener(o, h.boundFunc, h.options)), r.splice(p, 1)
                }
            },
            f = () => {
                r.forEach(o => {
                    (Array.isArray(o.el) ? o.el : [o.el]).forEach(g => {
                        (g instanceof HTMLElement || g === window || g === document) && g.removeEventListener(o.type, o.boundFunc, o.options)
                    })
                }), r = []
            },
            d = () => {
                const o = r.length;
                console.log(`Event listeners for block '${e.dataset.cid}' [${o}]:`), r.forEach(a => {
                    console.log(`Event: ${a.type}, Elements:`, a.el, "Function:", a.boundFunc)
                })
            };
        e.$ = t, e.$one = n, e.ref = i, e.refs = s, e.on = l, e.off = c, e.removeAllEventListeners = f, e.logEvents = d, e.name = e.dataset.cid, e.id = e.getAttribute("id") || e.dataset.cid
    },
    S = e => {
        const {
            pathSlug: t,
            options: n
        } = $(e);
        n.js && (e.dataset.jsLoaded = "false", e.dataset.jsMounted = "false");
        try {
            if (n.js) {
                const i = N(t);
                if (!i) {
                    console.error(`[⚑] Block module '${t}' not found. Make sure the JS file is properly enqueued.`);
                    return
                }
                const s = i.default || i,
                    r = s.debug === !0,
                    l = s.inview,
                    c = Object.create(s);
                if (Object.keys(s).forEach(f => {
                        typeof s[f] == "function" && (c[f] = s[f].bind(c))
                    }), Object.assign(c, e), c.id = e.getAttribute("id") || e.dataset.cid, c.name = e.dataset.cid, c.log = L(e, r), e.blockModule = c, e.dataset.jsLoaded = "true", typeof c.premount == "function") {
                    v(`[⚑] Calling premount() for block '${t}'`, null, A);
                    try {
                        c.premount()
                    } catch (f) {
                        console.error(`[⚑] Error in premount() for block '${t}':`, f)
                    }
                }
                l && T(() => {
                    let f;
                    typeof l == "object" ? f = {
                        trigger: ".inview-trigger",
                        elements: ".inview-element",
                        ...b,
                        ...l
                    } : l === !0 && (f = {
                        trigger: ".inview-trigger",
                        elements: ".inview-element",
                        ...b
                    }), c.inview = new B(e, f, r), c.inview.init()
                })
            }
        } catch (i) {
            console.error(`[⚑] Failed to initialise block '${t}': `, i)
        }
    },
    M = (e, t, n) => {
        const i = e.blockModule;
        if (i && typeof i.mount == "function") {
            v(`[📦] Mounting block '${t}'`, {
                block: e,
                options: n
            }, A);
            const s = i.mount();
            s instanceof Promise ? s.then(() => {
                e.dataset.jsMounted = "true", y.emit("mount", {
                    block: {
                        name: t,
                        el: e,
                        options: n
                    }
                })
            }).catch(r => {
                console.error(`[⚑] Error mounting block '${t}':`, r)
            }) : (e.dataset.jsMounted = "true", y.emit("mount", {
                block: {
                    name: t,
                    el: e,
                    options: n
                }
            }))
        } else e.dataset.jsMounted = "true"
    };

function q(e) {
    const t = new IntersectionObserver((n, i) => {
        n.forEach(s => {
            if (s.isIntersecting) {
                const r = s.target,
                    {
                        pathSlug: l,
                        options: c
                    } = $(r);
                M(r, l, c), i.unobserve(r)
            }
        })
    }, {
        threshold: 0,
        rootMargin: "0px 0px 200px 0px"
    });
    e.forEach(n => {
        t.observe(n)
    })
}
let A = !1,
    b = null;
const C = (e = {}) => {
        const {
            debug: t = !1,
            inview: n = null
        } = e;
        A = t, b = n, I();
        const i = Array.from(document.querySelectorAll("[data-js][data-cid]"));
        if (v("[▶️] Initializing blocks with settings:", {
                settings: e,
                blocks: i
            }, t), !i.length) {
            v("No blocks were found.", null, t);
            return
        }
        i.forEach(l => S(l));
        const s = i.filter(l => l.hasAttribute("data-js-critical")),
            r = i.filter(l => !l.hasAttribute("data-js-critical"));
        s.forEach(l => {
            const {
                pathSlug: c,
                options: f
            } = $(l);
            M(l, c, f)
        }), r.length > 0 && q(r), typeof ScrollTrigger < "u" && T(() => {
            ScrollTrigger.sort(), v("[📌] Sorted ScrollTriggers after blocks loaded (idle)", null, t)
        })
    },
    I = () => {
        Array.from(document.querySelectorAll("[data-cid]")).forEach(t => {
            k(t)
        })
    },
    E = new Set,
    F = e => (E.add(e), () => E.delete(e)),
    R = () => {
        E.forEach(e => {
            try {
                e()
            } catch (t) {
                console.error("Resize callback error", t)
            }
        })
    },
    x = {
        register: I,
        init: C,
        hooks: y,
        onResize: F,
        fireResize: R
    };
export {
    x as b, T as e
};