class c {
    constructor(e = {}) {
        this.options = {
            trigger: e.trigger || null,
            element: e.element || "[data-text-reveal]",
            scope: e.scope || document,
            splitType: e.splitType || "words",
            wordClass: e.wordClass || "text-reveal-word",
            overlayClass: e.overlayClass || "text-reveal-overlay",
            duration: e.duration || .8,
            delay: e.delay || 0,
            stagger: e.stagger || .1,
            ease: e.ease || "expo.out",
            start: e.start || "top 80%",
            scrub: e.scrub || !1,
            debug: e.debug || !1,
            onComplete: e.onComplete || null,
            onUpdate: e.onUpdate || null,
            ...e
        }, this.splitText = null, this.scrollTrigger = null, this.words = [], this.overlays = []
    }
    initSplitText() {
        const i = (this.options.scope || document).querySelectorAll(this.options.element);
        return i.length === 0 ? (console.warn("TextReveal: No elements found with selector:", this.options.element), this) : (this.options.debug && console.warn(`TextReveal: Found ${i.length} elements to process`), i.forEach(t => {
            if (t.dataset.textRevealProcessed === "true") {
                this.options.debug && console.warn("TextReveal: Element already processed, collecting existing overlays:", t);
                const s = t.querySelectorAll(`.${this.options.wordClass}`);
                this.words = [...this.words, ...s], s.forEach(o => {
                    const l = o.querySelector(`.${this.options.overlayClass}`);
                    l && !this.overlays.includes(l) && this.overlays.push(l)
                });
                return
            }
            const n = new SplitText(t, {
                type: this.options.splitType,
                wordsClass: this.options.wordClass
            });
            this.splitText = n, t.dataset.textRevealProcessed = "true";
            const r = t.querySelectorAll(`.${this.options.wordClass}`);
            this.words = [...this.words, ...r], r.forEach(s => {
                if (s.querySelector(`.${this.options.overlayClass}`)) {
                    const l = s.querySelector(`.${this.options.overlayClass}`);
                    this.overlays.includes(l) || this.overlays.push(l);
                    return
                }
                const o = document.createElement("div");
                o.className = this.options.overlayClass, o.style.cssText = `
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: currentColor;
					transform-origin: bottom;
					transform: scaleY(1);
					pointer-events: none;
				`, s.style.position = "relative", s.style.overflow = "hidden", s.appendChild(o), this.overlays.push(o)
            })
        }), this.overlays.length > 0 && gsap.set(this.overlays, {
            scaleY: 1
        }), this.options.debug && console.warn(`TextReveal: Created ${this.overlays.length} overlays for ${i.length} elements`), this)
    }
    initScrollTrigger() {
        if (this.overlays.length === 0) return console.warn("TextReveal: No overlays found. Call initSplitText() first."), this;
        this.options.debug && console.warn(`TextReveal: Found ${this.overlays.length} overlays for ScrollTrigger`);
        const e = this.options.scope || document;
        return this.options.debug && console.warn("TextReveal: Scope:", e, "Element selector:", this.options.element), e.querySelectorAll(this.options.element).forEach(t => {
            if (t.dataset.textRevealScrollTrigger === "true") {
                this.options.debug && console.warn("TextReveal: ScrollTrigger already exists for element:", t);
                return
            }
            const n = t.querySelectorAll(`.${this.options.overlayClass}`);
            n.length !== 0 && (ScrollTrigger.create({
                trigger: t,
                start: this.options.start,
                markers: this.options.debug,
                once: !0,
                onEnter: () => {
                    gsap.to(n, {
                        scaleY: 0,
                        duration: this.options.duration,
                        ease: this.options.ease,
                        stagger: this.options.stagger,
                        delay: this.options.delay,
                        onComplete: () => {
                            n.forEach(r => {
                                if (r && r.parentNode) {
                                    r.parentNode.removeChild(r);
                                    const s = this.overlays.indexOf(r);
                                    s > -1 && this.overlays.splice(s, 1)
                                }
                            }), this.options.onComplete && this.options.onComplete()
                        },
                        onUpdate: this.options.onUpdate
                    })
                }
            }), t.dataset.textRevealScrollTrigger = "true")
        }), this
    }
    init() {
        return this.initSplitText().initScrollTrigger()
    }
    refresh() {
        return this.scrollTrigger && ScrollTrigger.refresh(), this
    }
    setDebug(e) {
        return this.options.debug = e, this.scrollTrigger && (this.scrollTrigger.vars.markers = e, ScrollTrigger.refresh()), this
    }
}

function h(a = {}) {
    return new c(a)
}
export {
    h as c
};