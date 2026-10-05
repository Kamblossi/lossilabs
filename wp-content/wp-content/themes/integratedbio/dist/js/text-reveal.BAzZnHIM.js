class n {
    constructor(t = {}) {
        this.options = {
            trigger: t.trigger || null,
            element: t.element || "[data-text-reveal]",
            scope: t.scope || document,
            splitType: t.splitType || "words",
            wordClass: t.wordClass || "text-reveal-word",
            overlayClass: t.overlayClass || "text-reveal-overlay",
            duration: t.duration || .8,
            delay: t.delay || 0,
            stagger: t.stagger || .1,
            ease: t.ease || "expo.out",
            start: t.start || "top 80%",
            scrub: t.scrub || !1,
            debug: t.debug || !1,
            onComplete: t.onComplete || null,
            onUpdate: t.onUpdate || null,
            ...t
        }, this.splitTextInstances = new Map, this.scrollTriggerInstances = new Map, this.words = [], this.overlays = [], this.isInitialized = !1
    }
    async waitForReady() {
        document.fonts && document.fonts.ready && await document.fonts.ready, await new Promise(t => requestAnimationFrame(t)), await new Promise(t => setTimeout(t, 50))
    }
    async initSplitText() {
        await this.waitForReady();
        const o = (this.options.scope || document).querySelectorAll(this.options.element);
        return o.length === 0 ? (console.warn("TextReveal: No elements found with selector:", this.options.element), this) : (this.options.debug && console.warn(`TextReveal: Found ${o.length} elements to process`), o.forEach(e => {
            if (e.dataset.textRevealProcessed === "true") {
                this.options.debug && console.warn("TextReveal: Element already processed, skipping:", e);
                return
            }
            const i = new SplitText(e, {
                type: this.options.splitType,
                wordsClass: this.options.wordClass
            });
            this.splitTextInstances.set(e, i), e.dataset.textRevealProcessed = "true";
            const l = e.querySelectorAll(`.${this.options.wordClass}`);
            this.words = [...this.words, ...l], l.forEach(s => {
                if (s.querySelector(`.${this.options.overlayClass}`)) return;
                const r = document.createElement("div");
                r.className = this.options.overlayClass, r.style.cssText = `
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: currentColor;
					transform-origin: bottom;
					transform: scaleY(1);
					pointer-events: none;
					z-index: 1;
				`, s.style.position = "relative", s.style.overflow = "hidden", s.appendChild(r), this.overlays.push(r)
            })
        }), this.overlays.length > 0 && gsap.set(this.overlays, {
            scaleY: 1
        }), this.options.debug && console.warn(`TextReveal: Created ${this.overlays.length} overlays for ${o.length} elements`), this)
    }
    initSplitTextSync() {
        const o = (this.options.scope || document).querySelectorAll(this.options.element);
        return o.length === 0 ? (console.warn("TextReveal: No elements found with selector:", this.options.element), this) : (this.options.debug && console.warn(`TextReveal: Found ${o.length} elements to process`), o.forEach(e => {
            if (e.dataset.textRevealProcessed === "true") {
                this.options.debug && console.warn("TextReveal: Element already processed, skipping:", e);
                return
            }
            const i = new SplitText(e, {
                type: this.options.splitType,
                wordsClass: this.options.wordClass
            });
            this.splitTextInstances.set(e, i), e.dataset.textRevealProcessed = "true";
            const l = e.querySelectorAll(`.${this.options.wordClass}`);
            this.words = [...this.words, ...l], l.forEach(s => {
                if (s.querySelector(`.${this.options.overlayClass}`)) return;
                const r = document.createElement("div");
                r.className = this.options.overlayClass, r.style.cssText = `
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: currentColor;
					transform-origin: bottom;
					transform: scaleY(1);
					pointer-events: none;
					z-index: 1;
				`, s.style.position = "relative", s.style.overflow = "hidden", s.appendChild(r), this.overlays.push(r)
            })
        }), this.overlays.length > 0 && gsap.set(this.overlays, {
            scaleY: 1
        }), this.options.debug && console.warn(`TextReveal: Created ${this.overlays.length} overlays for ${o.length} elements`), this)
    }
    initScrollTrigger() {
        return this.overlays.length === 0 ? (console.warn("TextReveal: No overlays found. Call initSplitText() first."), this) : (this.options.debug && console.warn(`TextReveal: Found ${this.overlays.length} overlays for ScrollTrigger`), (this.options.scope || document).querySelectorAll(this.options.element).forEach(e => {
            if (e.dataset.textRevealScrollTrigger === "true") {
                this.options.debug && console.warn("TextReveal: ScrollTrigger already exists for element:", e);
                return
            }
            const i = e.querySelectorAll(`.${this.options.overlayClass}`);
            if (i.length === 0) return;
            const l = ScrollTrigger.create({
                trigger: e,
                start: this.options.start,
                markers: this.options.debug,
                once: !0,
                onEnter: () => {
                    e.dataset.textRevealAnimated !== "true" && (e.dataset.textRevealAnimated = "true", gsap.to(i, {
                        scaleY: 0,
                        duration: this.options.duration,
                        ease: this.options.ease,
                        stagger: this.options.stagger,
                        delay: this.options.delay,
                        onComplete: () => {
                            i.forEach(s => {
                                if (s && s.parentNode) {
                                    s.parentNode.removeChild(s);
                                    const r = this.overlays.indexOf(s);
                                    r > -1 && this.overlays.splice(r, 1)
                                }
                            }), this.options.onComplete && this.options.onComplete()
                        },
                        onUpdate: this.options.onUpdate
                    }))
                }
            });
            this.scrollTriggerInstances.set(e, l), e.dataset.textRevealScrollTrigger = "true"
        }), this)
    }
    async init() {
        return this.isInitialized ? (console.warn("TextReveal: Already initialized"), this) : (await this.initSplitText(), this.initScrollTrigger(), this.isInitialized = !0, this)
    }
    refresh() {
        return ScrollTrigger.refresh(), this
    }
    setDebug(t) {
        return this.options.debug = t, this.scrollTriggerInstances.forEach(o => {
            o.vars.markers = t
        }), ScrollTrigger.refresh(), this
    }
    destroy() {
        return this.scrollTriggerInstances.forEach(e => {
            e.kill()
        }), this.scrollTriggerInstances.clear(), this.splitTextInstances.forEach(e => {
            e.revert()
        }), this.splitTextInstances.clear(), this.words = [], this.overlays = [], this.isInitialized = !1, (this.options.scope || document).querySelectorAll(this.options.element).forEach(e => {
            e.dataset.textRevealProcessed = "false", e.dataset.textRevealScrollTrigger = "false", e.dataset.textRevealAnimated = "false"
        }), this
    }
}

function c(a = {}) {
    return new n(a)
}
export {
    c
};