import {
    g as Y,
    a as j,
    e as V,
    b as Q,
    n as F,
    c as W,
    d as ee,
    f as K,
    m,
    s as _,
    h as te,
    i as U,
    S as ie
} from "../../swiper.CwAco-4D.js";

function ae(P) {
    let {
        swiper: e,
        extendParams: $,
        on: h,
        emit: v
    } = P;
    const p = Y(),
        M = j();
    e.keyboard = {
        enabled: !1
    }, $({
        keyboard: {
            enabled: !1,
            onlyInViewport: !0,
            pageUpDown: !0
        }
    });

    function k(O) {
        if (!e.enabled) return;
        const {
            rtlTranslate: H
        } = e;
        let E = O;
        E.originalEvent && (E = E.originalEvent);
        const A = E.keyCode || E.charCode,
            o = e.params.keyboard.pageUpDown,
            l = o && A === 33,
            g = o && A === 34,
            f = A === 37,
            i = A === 39,
            t = A === 38,
            n = A === 40;
        if (!e.allowSlideNext && (e.isHorizontal() && i || e.isVertical() && n || g) || !e.allowSlidePrev && (e.isHorizontal() && f || e.isVertical() && t || l)) return !1;
        if (!(E.shiftKey || E.altKey || E.ctrlKey || E.metaKey) && !(p.activeElement && (p.activeElement.isContentEditable || p.activeElement.nodeName && (p.activeElement.nodeName.toLowerCase() === "input" || p.activeElement.nodeName.toLowerCase() === "textarea")))) {
            if (e.params.keyboard.onlyInViewport && (l || g || f || i || t || n)) {
                let c = !1;
                if (V(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && V(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
                const C = e.el,
                    T = C.clientWidth,
                    D = C.clientHeight,
                    r = M.innerWidth,
                    x = M.innerHeight,
                    u = Q(C);
                H && (u.left -= C.scrollLeft);
                const I = [
                    [u.left, u.top],
                    [u.left + T, u.top],
                    [u.left, u.top + D],
                    [u.left + T, u.top + D]
                ];
                for (let d = 0; d < I.length; d += 1) {
                    const b = I[d];
                    if (b[0] >= 0 && b[0] <= r && b[1] >= 0 && b[1] <= x) {
                        if (b[0] === 0 && b[1] === 0) continue;
                        c = !0
                    }
                }
                if (!c) return
            }
            e.isHorizontal() ? ((l || g || f || i) && (E.preventDefault ? E.preventDefault() : E.returnValue = !1), ((g || i) && !H || (l || f) && H) && e.slideNext(), ((l || f) && !H || (g || i) && H) && e.slidePrev()) : ((l || g || t || n) && (E.preventDefault ? E.preventDefault() : E.returnValue = !1), (g || n) && e.slideNext(), (l || t) && e.slidePrev()), v("keyPress", A)
        }
    }

    function S() {
        e.keyboard.enabled || (p.addEventListener("keydown", k), e.keyboard.enabled = !0)
    }

    function y() {
        e.keyboard.enabled && (p.removeEventListener("keydown", k), e.keyboard.enabled = !1)
    }
    h("init", () => {
        e.params.keyboard.enabled && S()
    }), h("destroy", () => {
        e.keyboard.enabled && y()
    }), Object.assign(e.keyboard, {
        enable: S,
        disable: y
    })
}

function ne(P) {
    let {
        swiper: e,
        extendParams: $,
        on: h,
        emit: v
    } = P;
    const p = j();
    $({
        mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarget: "container",
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: "swiper-no-mousewheel"
        }
    }), e.mousewheel = {
        enabled: !1
    };
    let M, k = F(),
        S;
    const y = [];

    function O(t) {
        let T = 0,
            D = 0,
            r = 0,
            x = 0;
        return "detail" in t && (D = t.detail), "wheelDelta" in t && (D = -t.wheelDelta / 120), "wheelDeltaY" in t && (D = -t.wheelDeltaY / 120), "wheelDeltaX" in t && (T = -t.wheelDeltaX / 120), "axis" in t && t.axis === t.HORIZONTAL_AXIS && (T = D, D = 0), r = T * 10, x = D * 10, "deltaY" in t && (x = t.deltaY), "deltaX" in t && (r = t.deltaX), t.shiftKey && !r && (r = x, x = 0), (r || x) && t.deltaMode && (t.deltaMode === 1 ? (r *= 40, x *= 40) : (r *= 800, x *= 800)), r && !T && (T = r < 1 ? -1 : 1), x && !D && (D = x < 1 ? -1 : 1), {
            spinX: T,
            spinY: D,
            pixelX: r,
            pixelY: x
        }
    }

    function H() {
        e.enabled && (e.mouseEntered = !0)
    }

    function E() {
        e.enabled && (e.mouseEntered = !1)
    }

    function A(t) {
        return e.params.mousewheel.thresholdDelta && t.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && F() - k < e.params.mousewheel.thresholdTime ? !1 : t.delta >= 6 && F() - k < 60 ? !0 : (t.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), v("scroll", t.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), v("scroll", t.raw)), k = new p.Date().getTime(), !1)
    }

    function o(t) {
        const n = e.params.mousewheel;
        if (t.direction < 0) {
            if (e.isEnd && !e.params.loop && n.releaseOnEdges) return !0
        } else if (e.isBeginning && !e.params.loop && n.releaseOnEdges) return !0;
        return !1
    }

    function l(t) {
        let n = t,
            c = !0;
        if (!e.enabled || t.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
        const C = e.params.mousewheel;
        e.params.cssMode && n.preventDefault();
        let T = e.el;
        e.params.mousewheel.eventsTarget !== "container" && (T = document.querySelector(e.params.mousewheel.eventsTarget));
        const D = T && T.contains(n.target);
        if (!e.mouseEntered && !D && !C.releaseOnEdges) return !0;
        n.originalEvent && (n = n.originalEvent);
        let r = 0;
        const x = e.rtlTranslate ? -1 : 1,
            u = O(n);
        if (C.forceToAxis)
            if (e.isHorizontal())
                if (Math.abs(u.pixelX) > Math.abs(u.pixelY)) r = -u.pixelX * x;
                else return !0;
        else if (Math.abs(u.pixelY) > Math.abs(u.pixelX)) r = -u.pixelY;
        else return !0;
        else r = Math.abs(u.pixelX) > Math.abs(u.pixelY) ? -u.pixelX * x : -u.pixelY;
        if (r === 0) return !0;
        C.invert && (r = -r);
        let I = e.getTranslate() + r * C.sensitivity;
        if (I >= e.minTranslate() && (I = e.minTranslate()), I <= e.maxTranslate() && (I = e.maxTranslate()), c = e.params.loop ? !0 : !(I === e.minTranslate() || I === e.maxTranslate()), c && e.params.nested && n.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
            const d = {
                time: F(),
                delta: Math.abs(r),
                direction: Math.sign(r),
                raw: t
            };
            y.length >= 2 && y.shift();
            const b = y.length ? y[y.length - 1] : void 0;
            if (y.push(d), b ? (d.direction !== b.direction || d.delta > b.delta || d.time > b.time + 150) && A(d) : A(d), o(d)) return !0
        } else {
            const d = {
                    time: F(),
                    delta: Math.abs(r),
                    direction: Math.sign(r)
                },
                b = S && d.time < S.time + 500 && d.delta <= S.delta && d.direction === S.direction;
            if (!b) {
                S = void 0;
                let L = e.getTranslate() + r * C.sensitivity;
                const N = e.isBeginning,
                    a = e.isEnd;
                if (L >= e.minTranslate() && (L = e.minTranslate()), L <= e.maxTranslate() && (L = e.maxTranslate()), e.setTransition(0), e.setTranslate(L), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!N && e.isBeginning || !a && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
                        direction: d.direction < 0 ? "next" : "prev",
                        byMousewheel: !0
                    }), e.params.freeMode.sticky) {
                    clearTimeout(M), M = void 0, y.length >= 15 && y.shift();
                    const s = y.length ? y[y.length - 1] : void 0,
                        w = y[0];
                    if (y.push(d), s && (d.delta > s.delta || d.direction !== s.direction)) y.splice(0);
                    else if (y.length >= 15 && d.time - w.time < 500 && w.delta - d.delta >= 1 && d.delta <= 6) {
                        const B = r > 0 ? .8 : .2;
                        S = d, y.splice(0), M = W(() => {
                            e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, B)
                        }, 0)
                    }
                    M || (M = W(() => {
                        if (e.destroyed || !e.params) return;
                        const B = .5;
                        S = d, y.splice(0), e.slideToClosest(e.params.speed, !0, void 0, B)
                    }, 500))
                }
                if (b || v("scroll", n), e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(), C.releaseOnEdges && (L === e.minTranslate() || L === e.maxTranslate())) return !0
            }
        }
        return n.preventDefault ? n.preventDefault() : n.returnValue = !1, !1
    }

    function g(t) {
        let n = e.el;
        e.params.mousewheel.eventsTarget !== "container" && (n = document.querySelector(e.params.mousewheel.eventsTarget)), n[t]("mouseenter", H), n[t]("mouseleave", E), n[t]("wheel", l)
    }

    function f() {
        return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", l), !0) : e.mousewheel.enabled ? !1 : (g("addEventListener"), e.mousewheel.enabled = !0, !0)
    }

    function i() {
        return e.params.cssMode ? (e.wrapperEl.addEventListener(event, l), !0) : e.mousewheel.enabled ? (g("removeEventListener"), e.mousewheel.enabled = !1, !0) : !1
    }
    h("init", () => {
        !e.params.mousewheel.enabled && e.params.cssMode && i(), e.params.mousewheel.enabled && f()
    }), h("destroy", () => {
        e.params.cssMode && f(), e.mousewheel.enabled && i()
    }), Object.assign(e.mousewheel, {
        enable: f,
        disable: i
    })
}

function Z(P, e, $, h) {
    return P.params.createElements && Object.keys(h).forEach(v => {
        if (!$[v] && $.auto === !0) {
            let p = ee(P.el, `.${h[v]}`)[0];
            p || (p = K("div", h[v]), p.className = h[v], P.el.append(p)), $[v] = p, e[v] = p
        }
    }), $
}

function se(P) {
    let {
        swiper: e,
        extendParams: $,
        on: h,
        emit: v
    } = P;
    $({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }), e.navigation = {
        nextEl: null,
        prevEl: null
    };

    function p(o) {
        let l;
        return o && typeof o == "string" && e.isElement && (l = e.el.querySelector(o) || e.hostEl.querySelector(o), l) ? l : (o && (typeof o == "string" && (l = [...document.querySelectorAll(o)]), e.params.uniqueNavElements && typeof o == "string" && l && l.length > 1 && e.el.querySelectorAll(o).length === 1 ? l = e.el.querySelector(o) : l && l.length === 1 && (l = l[0])), o && !l ? o : l)
    }

    function M(o, l) {
        const g = e.params.navigation;
        o = m(o), o.forEach(f => {
            f && (f.classList[l ? "add" : "remove"](...g.disabledClass.split(" ")), f.tagName === "BUTTON" && (f.disabled = l), e.params.watchOverflow && e.enabled && f.classList[e.isLocked ? "add" : "remove"](g.lockClass))
        })
    }

    function k() {
        const {
            nextEl: o,
            prevEl: l
        } = e.navigation;
        if (e.params.loop) {
            M(l, !1), M(o, !1);
            return
        }
        M(l, e.isBeginning && !e.params.rewind), M(o, e.isEnd && !e.params.rewind)
    }

    function S(o) {
        o.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), v("navigationPrev"))
    }

    function y(o) {
        o.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), v("navigationNext"))
    }

    function O() {
        const o = e.params.navigation;
        if (e.params.navigation = Z(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }), !(o.nextEl || o.prevEl)) return;
        let l = p(o.nextEl),
            g = p(o.prevEl);
        Object.assign(e.navigation, {
            nextEl: l,
            prevEl: g
        }), l = m(l), g = m(g);
        const f = (i, t) => {
            i && i.addEventListener("click", t === "next" ? y : S), !e.enabled && i && i.classList.add(...o.lockClass.split(" "))
        };
        l.forEach(i => f(i, "next")), g.forEach(i => f(i, "prev"))
    }

    function H() {
        let {
            nextEl: o,
            prevEl: l
        } = e.navigation;
        o = m(o), l = m(l);
        const g = (f, i) => {
            f.removeEventListener("click", i === "next" ? y : S), f.classList.remove(...e.params.navigation.disabledClass.split(" "))
        };
        o.forEach(f => g(f, "next")), l.forEach(f => g(f, "prev"))
    }
    h("init", () => {
        e.params.navigation.enabled === !1 ? A() : (O(), k())
    }), h("toEdge fromEdge lock unlock", () => {
        k()
    }), h("destroy", () => {
        H()
    }), h("enable disable", () => {
        let {
            nextEl: o,
            prevEl: l
        } = e.navigation;
        if (o = m(o), l = m(l), e.enabled) {
            k();
            return
        }[...o, ...l].filter(g => !!g).forEach(g => g.classList.add(e.params.navigation.lockClass))
    }), h("click", (o, l) => {
        let {
            nextEl: g,
            prevEl: f
        } = e.navigation;
        g = m(g), f = m(f);
        const i = l.target;
        let t = f.includes(i) || g.includes(i);
        if (e.isElement && !t) {
            const n = l.path || l.composedPath && l.composedPath();
            n && (t = n.find(c => g.includes(c) || f.includes(c)))
        }
        if (e.params.navigation.hideOnClick && !t) {
            if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === i || e.pagination.el.contains(i))) return;
            let n;
            g.length ? n = g[0].classList.contains(e.params.navigation.hiddenClass) : f.length && (n = f[0].classList.contains(e.params.navigation.hiddenClass)), v(n === !0 ? "navigationShow" : "navigationHide"), [...g, ...f].filter(c => !!c).forEach(c => c.classList.toggle(e.params.navigation.hiddenClass))
        }
    });
    const E = () => {
            e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")), O(), k()
        },
        A = () => {
            e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")), H()
        };
    Object.assign(e.navigation, {
        enable: E,
        disable: A,
        update: k,
        init: O,
        destroy: H
    })
}

function z(P) {
    return P === void 0 && (P = ""), `.${P.trim().replace(/([\.:!+\/()[\]])/g,"\\$1").replace(/ /g,".")}`
}

function le(P) {
    let {
        swiper: e,
        extendParams: $,
        on: h,
        emit: v
    } = P;
    const p = "swiper-pagination";
    $({
        pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: i => i,
            formatFractionTotal: i => i,
            bulletClass: `${p}-bullet`,
            bulletActiveClass: `${p}-bullet-active`,
            modifierClass: `${p}-`,
            currentClass: `${p}-current`,
            totalClass: `${p}-total`,
            hiddenClass: `${p}-hidden`,
            progressbarFillClass: `${p}-progressbar-fill`,
            progressbarOppositeClass: `${p}-progressbar-opposite`,
            clickableClass: `${p}-clickable`,
            lockClass: `${p}-lock`,
            horizontalClass: `${p}-horizontal`,
            verticalClass: `${p}-vertical`,
            paginationDisabledClass: `${p}-disabled`
        }
    }), e.pagination = {
        el: null,
        bullets: []
    };
    let M, k = 0;

    function S() {
        return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0
    }

    function y(i, t) {
        const {
            bulletActiveClass: n
        } = e.params.pagination;
        i && (i = i[`${t==="prev"?"previous":"next"}ElementSibling`], i && (i.classList.add(`${n}-${t}`), i = i[`${t==="prev"?"previous":"next"}ElementSibling`], i && i.classList.add(`${n}-${t}-${t}`)))
    }

    function O(i, t, n) {
        if (i = i % n, t = t % n, t === i + 1) return "next";
        if (t === i - 1) return "previous"
    }

    function H(i) {
        const t = i.target.closest(z(e.params.pagination.bulletClass));
        if (!t) return;
        i.preventDefault();
        const n = U(t) * e.params.slidesPerGroup;
        if (e.params.loop) {
            if (e.realIndex === n) return;
            const c = O(e.realIndex, n, e.slides.length);
            c === "next" ? e.slideNext() : c === "previous" ? e.slidePrev() : e.slideToLoop(n)
        } else e.slideTo(n)
    }

    function E() {
        const i = e.rtl,
            t = e.params.pagination;
        if (S()) return;
        let n = e.pagination.el;
        n = m(n);
        let c, C;
        const T = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
            D = e.params.loop ? Math.ceil(T / e.params.slidesPerGroup) : e.snapGrid.length;
        if (e.params.loop ? (C = e.previousRealIndex || 0, c = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : typeof e.snapIndex < "u" ? (c = e.snapIndex, C = e.previousSnapIndex) : (C = e.previousIndex || 0, c = e.activeIndex || 0), t.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
            const r = e.pagination.bullets;
            let x, u, I;
            if (t.dynamicBullets && (M = te(r[0], e.isHorizontal() ? "width" : "height"), n.forEach(d => {
                    d.style[e.isHorizontal() ? "width" : "height"] = `${M*(t.dynamicMainBullets+4)}px`
                }), t.dynamicMainBullets > 1 && C !== void 0 && (k += c - (C || 0), k > t.dynamicMainBullets - 1 ? k = t.dynamicMainBullets - 1 : k < 0 && (k = 0)), x = Math.max(c - k, 0), u = x + (Math.min(r.length, t.dynamicMainBullets) - 1), I = (u + x) / 2), r.forEach(d => {
                    const b = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(L => `${t.bulletActiveClass}${L}`)].map(L => typeof L == "string" && L.includes(" ") ? L.split(" ") : L).flat();
                    d.classList.remove(...b)
                }), n.length > 1) r.forEach(d => {
                const b = U(d);
                b === c ? d.classList.add(...t.bulletActiveClass.split(" ")) : e.isElement && d.setAttribute("part", "bullet"), t.dynamicBullets && (b >= x && b <= u && d.classList.add(...`${t.bulletActiveClass}-main`.split(" ")), b === x && y(d, "prev"), b === u && y(d, "next"))
            });
            else {
                const d = r[c];
                if (d && d.classList.add(...t.bulletActiveClass.split(" ")), e.isElement && r.forEach((b, L) => {
                        b.setAttribute("part", L === c ? "bullet-active" : "bullet")
                    }), t.dynamicBullets) {
                    const b = r[x],
                        L = r[u];
                    for (let N = x; N <= u; N += 1) r[N] && r[N].classList.add(...`${t.bulletActiveClass}-main`.split(" "));
                    y(b, "prev"), y(L, "next")
                }
            }
            if (t.dynamicBullets) {
                const d = Math.min(r.length, t.dynamicMainBullets + 4),
                    b = (M * d - M) / 2 - I * M,
                    L = i ? "right" : "left";
                r.forEach(N => {
                    N.style[e.isHorizontal() ? L : "top"] = `${b}px`
                })
            }
        }
        n.forEach((r, x) => {
            if (t.type === "fraction" && (r.querySelectorAll(z(t.currentClass)).forEach(u => {
                    u.textContent = t.formatFractionCurrent(c + 1)
                }), r.querySelectorAll(z(t.totalClass)).forEach(u => {
                    u.textContent = t.formatFractionTotal(D)
                })), t.type === "progressbar") {
                let u;
                t.progressbarOpposite ? u = e.isHorizontal() ? "vertical" : "horizontal" : u = e.isHorizontal() ? "horizontal" : "vertical";
                const I = (c + 1) / D;
                let d = 1,
                    b = 1;
                u === "horizontal" ? d = I : b = I, r.querySelectorAll(z(t.progressbarFillClass)).forEach(L => {
                    L.style.transform = `translate3d(0,0,0) scaleX(${d}) scaleY(${b})`, L.style.transitionDuration = `${e.params.speed}ms`
                })
            }
            t.type === "custom" && t.renderCustom ? (_(r, t.renderCustom(e, c + 1, D)), x === 0 && v("paginationRender", r)) : (x === 0 && v("paginationRender", r), v("paginationUpdate", r)), e.params.watchOverflow && e.enabled && r.classList[e.isLocked ? "add" : "remove"](t.lockClass)
        })
    }

    function A() {
        const i = e.params.pagination;
        if (S()) return;
        const t = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
        let n = e.pagination.el;
        n = m(n);
        let c = "";
        if (i.type === "bullets") {
            let C = e.params.loop ? Math.ceil(t / e.params.slidesPerGroup) : e.snapGrid.length;
            e.params.freeMode && e.params.freeMode.enabled && C > t && (C = t);
            for (let T = 0; T < C; T += 1) i.renderBullet ? c += i.renderBullet.call(e, T, i.bulletClass) : c += `<${i.bulletElement} ${e.isElement?'part="bullet"':""} class="${i.bulletClass}"></${i.bulletElement}>`
        }
        i.type === "fraction" && (i.renderFraction ? c = i.renderFraction.call(e, i.currentClass, i.totalClass) : c = `<span class="${i.currentClass}"></span> / <span class="${i.totalClass}"></span>`), i.type === "progressbar" && (i.renderProgressbar ? c = i.renderProgressbar.call(e, i.progressbarFillClass) : c = `<span class="${i.progressbarFillClass}"></span>`), e.pagination.bullets = [], n.forEach(C => {
            i.type !== "custom" && _(C, c || ""), i.type === "bullets" && e.pagination.bullets.push(...C.querySelectorAll(z(i.bulletClass)))
        }), i.type !== "custom" && v("paginationRender", n[0])
    }

    function o() {
        e.params.pagination = Z(e, e.originalParams.pagination, e.params.pagination, {
            el: "swiper-pagination"
        });
        const i = e.params.pagination;
        if (!i.el) return;
        let t;
        typeof i.el == "string" && e.isElement && (t = e.el.querySelector(i.el)), !t && typeof i.el == "string" && (t = [...document.querySelectorAll(i.el)]), t || (t = i.el), !(!t || t.length === 0) && (e.params.uniqueNavElements && typeof i.el == "string" && Array.isArray(t) && t.length > 1 && (t = [...e.el.querySelectorAll(i.el)], t.length > 1 && (t = t.find(n => V(n, ".swiper")[0] === e.el))), Array.isArray(t) && t.length === 1 && (t = t[0]), Object.assign(e.pagination, {
            el: t
        }), t = m(t), t.forEach(n => {
            i.type === "bullets" && i.clickable && n.classList.add(...(i.clickableClass || "").split(" ")), n.classList.add(i.modifierClass + i.type), n.classList.add(e.isHorizontal() ? i.horizontalClass : i.verticalClass), i.type === "bullets" && i.dynamicBullets && (n.classList.add(`${i.modifierClass}${i.type}-dynamic`), k = 0, i.dynamicMainBullets < 1 && (i.dynamicMainBullets = 1)), i.type === "progressbar" && i.progressbarOpposite && n.classList.add(i.progressbarOppositeClass), i.clickable && n.addEventListener("click", H), e.enabled || n.classList.add(i.lockClass)
        }))
    }

    function l() {
        const i = e.params.pagination;
        if (S()) return;
        let t = e.pagination.el;
        t && (t = m(t), t.forEach(n => {
            n.classList.remove(i.hiddenClass), n.classList.remove(i.modifierClass + i.type), n.classList.remove(e.isHorizontal() ? i.horizontalClass : i.verticalClass), i.clickable && (n.classList.remove(...(i.clickableClass || "").split(" ")), n.removeEventListener("click", H))
        })), e.pagination.bullets && e.pagination.bullets.forEach(n => n.classList.remove(...i.bulletActiveClass.split(" ")))
    }
    h("changeDirection", () => {
        if (!e.pagination || !e.pagination.el) return;
        const i = e.params.pagination;
        let {
            el: t
        } = e.pagination;
        t = m(t), t.forEach(n => {
            n.classList.remove(i.horizontalClass, i.verticalClass), n.classList.add(e.isHorizontal() ? i.horizontalClass : i.verticalClass)
        })
    }), h("init", () => {
        e.params.pagination.enabled === !1 ? f() : (o(), A(), E())
    }), h("activeIndexChange", () => {
        typeof e.snapIndex > "u" && E()
    }), h("snapIndexChange", () => {
        E()
    }), h("snapGridLengthChange", () => {
        A(), E()
    }), h("destroy", () => {
        l()
    }), h("enable disable", () => {
        let {
            el: i
        } = e.pagination;
        i && (i = m(i), i.forEach(t => t.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)))
    }), h("lock unlock", () => {
        E()
    }), h("click", (i, t) => {
        const n = t.target,
            c = m(e.pagination.el);
        if (e.params.pagination.el && e.params.pagination.hideOnClick && c && c.length > 0 && !n.classList.contains(e.params.pagination.bulletClass)) {
            if (e.navigation && (e.navigation.nextEl && n === e.navigation.nextEl || e.navigation.prevEl && n === e.navigation.prevEl)) return;
            const C = c[0].classList.contains(e.params.pagination.hiddenClass);
            v(C === !0 ? "paginationShow" : "paginationHide"), c.forEach(T => T.classList.toggle(e.params.pagination.hiddenClass))
        }
    });
    const g = () => {
            e.el.classList.remove(e.params.pagination.paginationDisabledClass);
            let {
                el: i
            } = e.pagination;
            i && (i = m(i), i.forEach(t => t.classList.remove(e.params.pagination.paginationDisabledClass))), o(), A(), E()
        },
        f = () => {
            e.el.classList.add(e.params.pagination.paginationDisabledClass);
            let {
                el: i
            } = e.pagination;
            i && (i = m(i), i.forEach(t => t.classList.add(e.params.pagination.paginationDisabledClass))), l()
        };
    Object.assign(e.pagination, {
        enable: g,
        disable: f,
        render: A,
        update: E,
        init: o,
        destroy: l
    })
}

function re(P) {
    let {
        swiper: e,
        extendParams: $,
        on: h
    } = P;
    $({
        a11y: {
            enabled: !0,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            slideLabelMessage: "{{index}} / {{slidesLength}}",
            containerMessage: null,
            containerRoleDescriptionMessage: null,
            containerRole: null,
            itemRoleDescriptionMessage: null,
            slideRole: "group",
            id: null,
            scrollOnFocus: !0
        }
    }), e.a11y = {
        clicked: !1
    };
    let v = null,
        p, M, k = new Date().getTime();

    function S(a) {
        const s = v;
        s.length !== 0 && _(s, a)
    }

    function y(a) {
        const s = () => Math.round(16 * Math.random()).toString(16);
        return "x".repeat(a).replace(/x/g, s)
    }

    function O(a) {
        a = m(a), a.forEach(s => {
            s.setAttribute("tabIndex", "0")
        })
    }

    function H(a) {
        a = m(a), a.forEach(s => {
            s.setAttribute("tabIndex", "-1")
        })
    }

    function E(a, s) {
        a = m(a), a.forEach(w => {
            w.setAttribute("role", s)
        })
    }

    function A(a, s) {
        a = m(a), a.forEach(w => {
            w.setAttribute("aria-roledescription", s)
        })
    }

    function o(a, s) {
        a = m(a), a.forEach(w => {
            w.setAttribute("aria-controls", s)
        })
    }

    function l(a, s) {
        a = m(a), a.forEach(w => {
            w.setAttribute("aria-label", s)
        })
    }

    function g(a, s) {
        a = m(a), a.forEach(w => {
            w.setAttribute("id", s)
        })
    }

    function f(a, s) {
        a = m(a), a.forEach(w => {
            w.setAttribute("aria-live", s)
        })
    }

    function i(a) {
        a = m(a), a.forEach(s => {
            s.setAttribute("aria-disabled", !0)
        })
    }

    function t(a) {
        a = m(a), a.forEach(s => {
            s.setAttribute("aria-disabled", !1)
        })
    }

    function n(a) {
        if (a.keyCode !== 13 && a.keyCode !== 32) return;
        const s = e.params.a11y,
            w = a.target;
        if (!(e.pagination && e.pagination.el && (w === e.pagination.el || e.pagination.el.contains(a.target)) && !a.target.matches(z(e.params.pagination.bulletClass)))) {
            if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
                const B = m(e.navigation.prevEl);
                m(e.navigation.nextEl).includes(w) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? S(s.lastSlideMessage) : S(s.nextSlideMessage)), B.includes(w) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? S(s.firstSlideMessage) : S(s.prevSlideMessage))
            }
            e.pagination && w.matches(z(e.params.pagination.bulletClass)) && w.click()
        }
    }

    function c() {
        if (e.params.loop || e.params.rewind || !e.navigation) return;
        const {
            nextEl: a,
            prevEl: s
        } = e.navigation;
        s && (e.isBeginning ? (i(s), H(s)) : (t(s), O(s))), a && (e.isEnd ? (i(a), H(a)) : (t(a), O(a)))
    }

    function C() {
        return e.pagination && e.pagination.bullets && e.pagination.bullets.length
    }

    function T() {
        return C() && e.params.pagination.clickable
    }

    function D() {
        const a = e.params.a11y;
        C() && e.pagination.bullets.forEach(s => {
            e.params.pagination.clickable && (O(s), e.params.pagination.renderBullet || (E(s, "button"), l(s, a.paginationBulletMessage.replace(/\{\{index\}\}/, U(s) + 1)))), s.matches(z(e.params.pagination.bulletActiveClass)) ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current")
        })
    }
    const r = (a, s, w) => {
            O(a), a.tagName !== "BUTTON" && (E(a, "button"), a.addEventListener("keydown", n)), l(a, w), o(a, s)
        },
        x = a => {
            M && M !== a.target && !M.contains(a.target) && (p = !0), e.a11y.clicked = !0
        },
        u = () => {
            p = !1, requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    e.destroyed || (e.a11y.clicked = !1)
                })
            })
        },
        I = a => {
            k = new Date().getTime()
        },
        d = a => {
            if (e.a11y.clicked || !e.params.a11y.scrollOnFocus || new Date().getTime() - k < 100) return;
            const s = a.target.closest(`.${e.params.slideClass}, swiper-slide`);
            if (!s || !e.slides.includes(s)) return;
            M = s;
            const w = e.slides.indexOf(s) === e.activeIndex,
                B = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(s);
            w || B || a.sourceCapabilities && a.sourceCapabilities.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
                p || (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(s.getAttribute("data-swiper-slide-index"))), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(s)), 0), p = !1)
            }))
        },
        b = () => {
            const a = e.params.a11y;
            a.itemRoleDescriptionMessage && A(e.slides, a.itemRoleDescriptionMessage), a.slideRole && E(e.slides, a.slideRole);
            const s = e.slides.length;
            a.slideLabelMessage && e.slides.forEach((w, B) => {
                const R = e.params.loop ? parseInt(w.getAttribute("data-swiper-slide-index"), 10) : B,
                    G = a.slideLabelMessage.replace(/\{\{index\}\}/, R + 1).replace(/\{\{slidesLength\}\}/, s);
                l(w, G)
            })
        },
        L = () => {
            const a = e.params.a11y;
            e.el.append(v);
            const s = e.el;
            a.containerRoleDescriptionMessage && A(s, a.containerRoleDescriptionMessage), a.containerMessage && l(s, a.containerMessage), a.containerRole && E(s, a.containerRole);
            const w = e.wrapperEl,
                B = a.id || w.getAttribute("id") || `swiper-wrapper-${y(16)}`,
                R = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite";
            g(w, B), f(w, R), b();
            let {
                nextEl: G,
                prevEl: q
            } = e.navigation ? e.navigation : {};
            G = m(G), q = m(q), G && G.forEach(X => r(X, B, a.nextSlideMessage)), q && q.forEach(X => r(X, B, a.prevSlideMessage)), T() && m(e.pagination.el).forEach(J => {
                J.addEventListener("keydown", n)
            }), Y().addEventListener("visibilitychange", I), e.el.addEventListener("focus", d, !0), e.el.addEventListener("focus", d, !0), e.el.addEventListener("pointerdown", x, !0), e.el.addEventListener("pointerup", u, !0)
        };

    function N() {
        v && v.remove();
        let {
            nextEl: a,
            prevEl: s
        } = e.navigation ? e.navigation : {};
        a = m(a), s = m(s), a && a.forEach(B => B.removeEventListener("keydown", n)), s && s.forEach(B => B.removeEventListener("keydown", n)), T() && m(e.pagination.el).forEach(R => {
            R.removeEventListener("keydown", n)
        }), Y().removeEventListener("visibilitychange", I), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", d, !0), e.el.removeEventListener("pointerdown", x, !0), e.el.removeEventListener("pointerup", u, !0))
    }
    h("beforeInit", () => {
        v = K("span", e.params.a11y.notificationClass), v.setAttribute("aria-live", "assertive"), v.setAttribute("aria-atomic", "true")
    }), h("afterInit", () => {
        e.params.a11y.enabled && L()
    }), h("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
        e.params.a11y.enabled && b()
    }), h("fromEdge toEdge afterInit lock unlock", () => {
        e.params.a11y.enabled && c()
    }), h("paginationUpdate", () => {
        e.params.a11y.enabled && D()
    }), h("destroy", () => {
        e.params.a11y.enabled && N()
    })
}
const oe = {
    debug: !1,
    inview: !1,
    swiper: null,
    elements: {
        swiper: null,
        modalItems: null
    },
    mount() {
        this.initElements(), this.initSwiper(), this.initModal()
    },
    initElements() {
        this.elements.swiper = this.$one(".swiper"), this.elements.modalItems = this.$("[data-modal-item]")
    },
    initSwiper() {
        this.elements.swiper && (this.swiper = new ie(this.elements.swiper, {
            modules: [re, ae, ne, se, le],
            slidesPerView: 1,
            spaceBetween: 24,
            autoHeight: !0,
            grabCursor: !0,
            speed: 800,
            loop: !0,
            navigation: {
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next"
            },
            pagination: {
                type: "progressbar",
                el: ".swiper-pagination"
            },
            keyboard: {
                enabled: !0
            },
            mousewheel: {
                enabled: !0,
                forceToAxis: !0
            },
            watchSlidesProgress: !0,
            observer: !0,
            observeParents: !0,
            slidesPerGroupAuto: !1,
            on: {
                init: () => {
                    typeof ScrollTrigger < "u" && ScrollTrigger.refresh()
                },
                slideChangeTransitionStart: () => {
                    this.elements.swiper.classList.add("is-changing")
                },
                slideChangeTransitionEnd: () => {
                    this.elements.swiper.classList.remove("is-changing"), typeof ScrollTrigger < "u" && ScrollTrigger.refresh()
                },
                transitionEnd: () => {
                    this.elements.swiper.classList.remove("is-changing")
                }
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3
                },
                1280: {
                    slidesPerView: 4
                }
            }
        }))
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
    handleModalClick(P) {
        P.preventDefault();
        const $ = P.currentTarget.querySelector(".item_modal");
        if (!$) {
            this.log("Modal content not found", "error");
            return
        }
        const h = $.innerHTML,
            v = new CustomEvent("modal-bio:open", {
                detail: {
                    contentHTML: h,
                    sourceBlock: "team-swiper"
                }
            });
        document.dispatchEvent(v), this.log("Modal open event dispatched from team-swiper", "log")
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["team-swiper"] = {
    default: oe
});