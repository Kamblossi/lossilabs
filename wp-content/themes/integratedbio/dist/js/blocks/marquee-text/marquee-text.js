const g = {
    debug: !1,
    inview: !1,
    options: {
        duplicate: 2,
        direction: "left",
        speed: 15,
        scrollSpeed: 10
    },
    elements: {
        marquee: null,
        marqueeContent: null,
        marqueeScroll: null
    },
    mount() {
        this.initElements(), this.initMarqueeScrollDirection()
    },
    initElements() {
        this.elements.marquee = this.$one(".marquee"), this.elements.marqueeContent = this.$one(".marquee_collection"), this.elements.marqueeScroll = this.$one(".marquee_scroll")
    },
    initMarqueeScrollDirection() {
        if (!this.elements.marquee || !this.elements.marqueeContent || !this.elements.marqueeScroll) {
            this.log("Marquee elements not found");
            return
        }
        const {
            duplicate: e,
            direction: a,
            speed: m,
            scrollSpeed: r
        } = this.options, t = a === "right" ? 1 : -1, c = window.innerWidth < 479 ? .25 : window.innerWidth < 991 ? .5 : 1, u = m * (this.elements.marqueeContent.offsetWidth / window.innerWidth) * c;
        if (this.elements.marqueeScroll.style.marginLeft = `${r*-1}%`, this.elements.marqueeScroll.style.width = `${r*2+100}%`, e > 0) {
            const i = document.createDocumentFragment();
            for (let n = 0; n < e; n++) i.appendChild(this.elements.marqueeContent.cloneNode(!0));
            this.elements.marqueeScroll.appendChild(i)
        }
        const s = this.elements.marquee.querySelectorAll(".marquee_collection"),
            l = gsap.to(s, {
                xPercent: -100,
                repeat: -1,
                duration: u,
                ease: "linear"
            }).totalProgress(.5);
        gsap.set(s, {
            xPercent: t === 1 ? 100 : -100
        }), l.timeScale(t), l.play(), this.elements.marquee.setAttribute("data-marquee-status", "normal"), ScrollTrigger.create({
            trigger: this.elements.marquee,
            start: "top bottom",
            end: "bottom top",
            onUpdate: i => {
                const n = i.direction === 1,
                    h = n ? -t : t;
                l.timeScale(h), this.elements.marquee.setAttribute("data-marquee-status", n ? "normal" : "inverted")
            }
        });
        const d = gsap.timeline({
                scrollTrigger: {
                    trigger: this.elements.marquee,
                    start: "0% 100%",
                    end: "100% 0%",
                    scrub: 0
                }
            }),
            o = t === -1 ? r : -r,
            q = -o;
        d.fromTo(this.elements.marqueeScroll, {
            x: `${o}vw`
        }, {
            x: `${q}vw`,
            ease: "none"
        })
    },
    destroy() {
        ScrollTrigger.getAll().forEach(e => {
            e.trigger === this.elements.marquee && e.kill()
        })
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["marquee-text"] = {
    default: g
});