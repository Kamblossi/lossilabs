const n = {
    debug: !1,
    inview: !0,
    elements: {
        modalItems: null
    },
    mount() {
        this.initElements(), this.initModal()
    },
    initElements() {
        this.elements.modalItems = this.$("[data-modal-item]")
    },
    initModal() {
        if (!this.elements.modalItems.length) {
            this.log("Modal items not found", "warn");
            return
        }
        this.on("click", this.elements.modalItems, this.handleModalClick), this.log("Modal functionality initialized", "log", {
            modalItems: this.elements.modalItems.length
        })
    },
    handleModalClick(t) {
        t.preventDefault();
        const e = t.currentTarget.querySelector(".item_modal");
        if (!e) {
            this.log("Modal content not found", "error");
            return
        }
        const o = e.innerHTML,
            i = new CustomEvent("modal-bio:open", {
                detail: {
                    contentHTML: o,
                    sourceBlock: "team-grid"
                }
            });
        document.dispatchEvent(i), this.log("Modal open event dispatched from team-grid", "log")
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["team-grid"] = {
    default: n
});