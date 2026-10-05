const s = {
    debug: !1,
    inview: !1,
    options: {
        duration: 1,
        ease: "expo.out",
        stagger: .15,
        start: "top 80%",
        end: "bottom 20%",
        contentDelay: .6,
        contentStagger: .2,
        contentDuration: .6
    },
    elements: {
        cardsContainer: null,
        cardsItems: null,
        cardsContent: null
    },
    mount() {
        window.innerWidth < 1025 || (this.initElements(), this.initAnimations())
    },
    initElements() {
        if (this.elements.cardsContainer = this.$one(".cards"), this.elements.cardsItems = this.$(".cards_item"), !this.elements.cardsContainer || !this.elements.cardsItems || !this.elements.cardsItems.length) return;
        const e = Array.from(this.elements.cardsItems);
        this.elements.cardsContent = e.map(t => [t.querySelector(".card_index"), t.querySelector(".card_icon"), t.querySelector(".card_label"), t.querySelector(".card_heading"), t.querySelector(".card_text")].filter(Boolean))
    },
    initAnimations() {
        !this.elements.cardsContainer || !this.elements.cardsItems.length || (gsap.to(this.elements.cardsItems, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            duration: this.options.duration,
            ease: this.options.ease,
            stagger: this.options.stagger,
            scrollTrigger: {
                trigger: this.elements.cardsContainer,
                start: this.options.start,
                end: this.options.end,
                toggleActions: "play none none none",
                markers: this.debug ?? !1
            }
        }), this.createContentTimeline())
    },
    createContentTimeline() {
        const e = gsap.timeline({
            scrollTrigger: {
                trigger: this.elements.cardsContainer,
                start: this.options.start,
                end: this.options.end,
                toggleActions: "play none none none",
                markers: this.debug ?? !1
            }
        });
        e.to({}, {
            duration: this.options.contentDelay
        }), this.elements.cardsContent.forEach((t, n) => {
            e.to(t, {
                opacity: 1,
                y: 0,
                duration: this.options.contentDuration,
                ease: "power2.out",
                stagger: this.options.contentStagger
            }, n * this.options.stagger)
        })
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["usp-cards"] = {
    default: s
});