import {
    _ as l
} from "./preload-helper.CEWoU19s.js";
class c {
    constructor({
        comp: t,
        selector: e,
        sources: i,
        purgeAttributes: s = !1,
        isChild: o = !0,
        attributes: r = [],
        classes: a = [],
        alt: n = "Your browser does not support the video tag.",
        poster: h = ""
    }) {
        if (this.comp = t, this.selector = typeof e == "string" ? t.querySelector(e) : e, this.sources = i, this.purgeAttributes = s, this.isChild = o, this.attributes = r, this.alt = n, this.classes = a, this.poster = h, this.videoContainer = this.selector, !this.videoContainer) throw new Error(`Container for video not found using selector: ${this.selector}`);
        if (!Array.isArray(this.sources) || !this.sources.length) throw new Error("Video source(s) not provided or not in expected format.");
        this.createVideo()
    }
    createVideo() {
        if (this.videoContainer) {
            const t = this.videoContainer.querySelector("video");
            t && t.remove()
        }
        if (this.video = document.createElement("video"), this.video.innerText = this.alt, this.poster && this.video.setAttribute("poster", this.poster), !this.purgeAttributes)
            for (const t of this.videoContainer.attributes) this.video.setAttribute(t.name, t.value);
        this.isChild || (this.classes = [...this.classes, ...this.videoContainer.className.split(" ")]), this.classes.forEach(t => {
            this.video.classList.add(t)
        }), this.attributes.forEach(t => {
            if (t.includes("=")) {
                const e = t.split("="),
                    i = e[0],
                    s = e.length > 1 ? e[1] : "";
                this.video.setAttribute(i, s)
            } else this.video.setAttribute(t, "")
        }), this.video.hasAttribute("muted") && (this.video.muted = !0), this.video.hasAttribute("preload") || this.video.setAttribute("preload", "metadata"), this.sources.forEach(t => {
            const e = document.createElement("source"),
                i = t.type ?? "video/mp4";
            e.setAttribute("src", t.source), e.setAttribute("type", i), t.media && e.setAttribute("media", t.media), this.video.appendChild(e)
        }), this.isChild ? (this.videoContainer.appendChild(this.video), this.videoContainer.classList.add("has-lazy-loaded")) : this.videoContainer.replaceWith(this.video), this.video.addEventListener("loadeddata", () => {
            this.video.classList.add("has-lazy-loaded")
        })
    }
    destroy() {
        this.video && (this.video.remove(), this.video = null)
    }
    play() {
        this.video && this.video.play()
    }
    pause() {
        this.video && this.video.pause()
    }
    mute() {
        this.video.muted || (this.video.muted = !0)
    }
    unmute() {
        this.video.muted && (this.video.muted = !1)
    }
    showControls() {
        this.video.setAttribute("controls", "")
    }
    hideControls() {
        this.video.removeAttribute("controls")
    }
    reset() {
        this.video && (this.video.currentTime = 0, this.video.pause())
    }
    changeSources(t = []) {
        if (!Array.isArray(t) || !t.length) throw new Error("New sources not provided.");
        this.video.querySelectorAll("source").forEach(e => e.remove()), t.forEach(e => {
            const i = document.createElement("source");
            i.setAttribute("src", e[0]), i.setAttribute("type", e[1]), this.video.appendChild(i)
        }), this.video.load()
    }
}
class v {
    constructor(t, e = {}) {
        this.comp = t, this.debug = e.debug || !1, this.videos = t.querySelectorAll(".js-video-handler"), this.videoInstances = [], this.hlsInstances = [], this._readyPromise = new Promise(i => {
            this._resolveReady = i
        }), this.videoEl = null, this.init()
    }
    whenReady() {
        return this._readyPromise
    }
    log(t, e = "log", i = null) {
        if (this.debug) {
            const s = `[VideoHandler] ${t}`;
            i ? console[e](s, i) : console[e](s)
        }
    }
    init() {
        this.videos.forEach(t => {
            const e = () => window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape",
                i = () => e() === "portrait" && t.dataset.srcPortrait ? {
                    src: t.dataset.srcPortrait,
                    type: t.dataset.videoTypePortrait || t.dataset.videoType || "mp4"
                } : {
                    src: t.dataset.src,
                    type: t.dataset.videoType || "mp4"
                },
                s = async () => {
                    const {
                        src: o,
                        type: r
                    } = i();
                    if (this.log("Initializing video:", "log", {
                            type: r,
                            src: o,
                            element: t
                        }), !o) {
                        this.log("Video source not provided for video handler", "warn");
                        return
                    }
                    r === "hls" ? (this.log("Initializing HLS video"), await this.initHLS(t, o)) : (this.log("Initializing MP4 video"), this.initMP4(t, o))
                };
            for (; t.firstChild;) t.removeChild(t.firstChild);
            this.videoEl = null, s(), window.addEventListener("orientationchange", () => {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                this.videoEl = null, s()
            })
        })
    }
    async initHLS(t, e) {
        const {
            default: i
        } = await l(async () => {
            const {
                default: a
            } = await
            import ("./hls.aSGbo4Wv.js");
            return {
                default: a
            }
        }, []);
        if (!i.isSupported()) {
            this.log("HLS is not supported in this browser", "warn");
            return
        }
        this.log("Creating HLS instance for:", "log", e);
        const s = new i;
        this.hlsInstances.push(s);
        const o = document.createElement("video");
        t.appendChild(o), this.videoEl || (this.videoEl = o, this._resolveReady(o));
        const r = JSON.parse(t.dataset.videoOptions || "{}");
        this.log("Applying video options:", "log", r), r.attributes && r.attributes.forEach(a => {
            o.setAttribute(a, "")
        }), o.setAttribute("preload", "metadata"), o.setAttribute("playsinline", ""), o.setAttribute("webkit-playsinline", ""), s.loadSource(e), s.attachMedia(o), s.on(i.Events.MANIFEST_PARSED, (function() {
            this.log("HLS manifest parsed, video ready for playback")
        }).bind(this)), s.on(i.Events.ERROR, (a, n) => {
            if (this.log("HLS Error:", "error", {
                    event: a,
                    data: n
                }), n.fatal) switch (n.type) {
                case i.ErrorTypes.NETWORK_ERROR:
                    this.log("Fatal network error encountered, trying to recover", "error"), s.startLoad();
                    break;
                case i.ErrorTypes.MEDIA_ERROR:
                    this.log("Fatal media error encountered, trying to recover", "error"), s.recoverMediaError();
                    break;
                default:
                    this.log("Fatal error encountered, stopping playback", "error"), s.destroy();
                    break
            }
        })
    }
    initMP4(t, e) {
        let i = !1;
        const s = new MutationObserver(() => {
            const n = t.querySelector("video");
            n && !i && (this.videoEl = n, this._resolveReady(n), s.disconnect(), i = !0)
        });
        s.observe(t, {
            childList: !0
        });
        const o = JSON.parse(t.dataset.videoOptions || "{}"),
            r = {
                comp: this.comp,
                selector: t,
                sources: [{
                    source: e,
                    type: "video/mp4"
                }],
                ...o,
                isChild: !0
            },
            a = new c(r);
        this.videoInstances.push(a)
    }
    destroy() {
        this.videoInstances.forEach(t => t.destroy()), this.videoInstances = [], this.hlsInstances.forEach(t => t.destroy()), this.hlsInstances = [], this.log("Video handler destroyed")
    }
}
export {
    v as
    default
};