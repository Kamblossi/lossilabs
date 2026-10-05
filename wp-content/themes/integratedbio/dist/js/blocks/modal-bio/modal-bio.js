/*! @license DOMPurify 3.2.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.7/LICENSE */
const {
    entries: At,
    setPrototypeOf: ut,
    isFrozen: jt,
    getPrototypeOf: Vt,
    getOwnPropertyDescriptor: Xt
} = Object;
let {
    freeze: b,
    seal: D,
    create: St
} = Object, {
    apply: Fe,
    construct: He
} = typeof Reflect < "u" && Reflect;
b || (b = function(t) {
    return t
});
D || (D = function(t) {
    return t
});
Fe || (Fe = function(t, r) {
    for (var o = arguments.length, l = new Array(o > 2 ? o - 2 : 0), f = 2; f < o; f++) l[f - 2] = arguments[f];
    return t.apply(r, l)
});
He || (He = function(t) {
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) o[l - 1] = arguments[l];
    return new t(...o)
});
const de = O(Array.prototype.forEach),
    qt = O(Array.prototype.lastIndexOf),
    mt = O(Array.prototype.pop),
    ee = O(Array.prototype.push),
    Kt = O(Array.prototype.splice),
    he = O(String.prototype.toLowerCase),
    Ne = O(String.prototype.toString),
    ve = O(String.prototype.match),
    te = O(String.prototype.replace),
    Zt = O(String.prototype.indexOf),
    Jt = O(String.prototype.trim),
    I = O(Object.prototype.hasOwnProperty),
    R = O(RegExp.prototype.test),
    ne = Qt(TypeError);

function O(s) {
    return function(t) {
        t instanceof RegExp && (t.lastIndex = 0);
        for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), l = 1; l < r; l++) o[l - 1] = arguments[l];
        return Fe(s, t, o)
    }
}

function Qt(s) {
    return function() {
        for (var t = arguments.length, r = new Array(t), o = 0; o < t; o++) r[o] = arguments[o];
        return He(s, r)
    }
}

function c(s, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : he;
    ut && ut(s, null);
    let o = t.length;
    for (; o--;) {
        let l = t[o];
        if (typeof l == "string") {
            const f = r(l);
            f !== l && (jt(t) || (t[o] = f), l = f)
        }
        s[l] = !0
    }
    return s
}

function en(s) {
    for (let t = 0; t < s.length; t++) I(s, t) || (s[t] = null);
    return s
}

function k(s) {
    const t = St(null);
    for (const [r, o] of At(s)) I(s, r) && (Array.isArray(o) ? t[r] = en(o) : o && typeof o == "object" && o.constructor === Object ? t[r] = k(o) : t[r] = o);
    return t
}

function oe(s, t) {
    for (; s !== null;) {
        const o = Xt(s, t);
        if (o) {
            if (o.get) return O(o.get);
            if (typeof o.value == "function") return O(o.value)
        }
        s = Vt(s)
    }

    function r() {
        return null
    }
    return r
}
const dt = b(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]),
    Pe = b(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "slot", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]),
    xe = b(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]),
    tn = b(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]),
    ke = b(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]),
    nn = b(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]),
    pt = b(["#text"]),
    ht = b(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]),
    Ue = b(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]),
    gt = b(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]),
    pe = b(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]),
    on = D(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    rn = D(/<%[\w\W]*|[\w\W]*%>/gm),
    an = D(/\$\{[\w\W]*/gm),
    sn = D(/^data-[\-\w.\u00B7-\uFFFF]+$/),
    ln = D(/^aria-[\-\w]+$/),
    wt = D(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    cn = D(/^(?:\w+script|data):/i),
    fn = D(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    yt = D(/^html$/i),
    un = D(/^[a-z][.\w]*(-[.\w]+)+$/i);
var Tt = Object.freeze({
    __proto__: null,
    ARIA_ATTR: ln,
    ATTR_WHITESPACE: fn,
    CUSTOM_ELEMENT: un,
    DATA_ATTR: sn,
    DOCTYPE_NAME: yt,
    ERB_EXPR: rn,
    IS_ALLOWED_URI: wt,
    IS_SCRIPT_OR_DATA: cn,
    MUSTACHE_EXPR: on,
    TMPLIT_EXPR: an
});
const ie = {
        element: 1,
        text: 3,
        progressingInstruction: 7,
        comment: 8,
        document: 9
    },
    mn = function() {
        return typeof window > "u" ? null : window
    },
    dn = function(t, r) {
        if (typeof t != "object" || typeof t.createPolicy != "function") return null;
        let o = null;
        const l = "data-tt-policy-suffix";
        r && r.hasAttribute(l) && (o = r.getAttribute(l));
        const f = "dompurify" + (o ? "#" + o : "");
        try {
            return t.createPolicy(f, {
                createHTML(d) {
                    return d
                },
                createScriptURL(d) {
                    return d
                }
            })
        } catch {
            return console.warn("TrustedTypes policy " + f + " could not be created."), null
        }
    },
    Et = function() {
        return {
            afterSanitizeAttributes: [],
            afterSanitizeElements: [],
            afterSanitizeShadowDOM: [],
            beforeSanitizeAttributes: [],
            beforeSanitizeElements: [],
            beforeSanitizeShadowDOM: [],
            uponSanitizeAttribute: [],
            uponSanitizeElement: [],
            uponSanitizeShadowNode: []
        }
    };

function Lt() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : mn();
    const t = a => Lt(a);
    if (t.version = "3.2.7", t.removed = [], !s || !s.document || s.document.nodeType !== ie.document || !s.Element) return t.isSupported = !1, t;
    let {
        document: r
    } = s;
    const o = r,
        l = o.currentScript,
        {
            DocumentFragment: f,
            HTMLTemplateElement: d,
            Node: m,
            Element: h,
            NodeFilter: C,
            NamedNodeMap: F = s.NamedNodeMap || s.MozNamedAttrMap,
            HTMLFormElement: u,
            DOMParser: H,
            trustedTypes: U
        } = s,
        q = h.prototype,
        bt = oe(q, "cloneNode"),
        Ot = oe(q, "remove"),
        Mt = oe(q, "nextSibling"),
        Ct = oe(q, "childNodes"),
        re = oe(q, "parentNode");
    if (typeof d == "function") {
        const a = r.createElement("template");
        a.content && a.content.ownerDocument && (r = a.content.ownerDocument)
    }
    let y, K = "";
    const {
        implementation: Te,
        createNodeIterator: Dt,
        createDocumentFragment: It,
        getElementsByTagName: Nt
    } = r, {
        importNode: vt
    } = o;
    let L = Et();
    t.isSupported = typeof At == "function" && typeof re == "function" && Te && Te.createHTMLDocument !== void 0;
    const {
        MUSTACHE_EXPR: Ee,
        ERB_EXPR: _e,
        TMPLIT_EXPR: Ae,
        DATA_ATTR: Pt,
        ARIA_ATTR: xt,
        IS_SCRIPT_OR_DATA: kt,
        ATTR_WHITESPACE: ze,
        CUSTOM_ELEMENT: Ut
    } = Tt;
    let {
        IS_ALLOWED_URI: Ge
    } = Tt, E = null;
    const Be = c({}, [...dt, ...Pe, ...xe, ...ke, ...pt]);
    let A = null;
    const We = c({}, [...ht, ...Ue, ...gt, ...pe]);
    let g = Object.seal(St(null, {
            tagNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            attributeNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null
            },
            allowCustomizedBuiltInElements: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: !1
            }
        })),
        Z = null,
        Se = null,
        Ye = !0,
        we = !0,
        $e = !1,
        je = !0,
        B = !1,
        ae = !0,
        z = !1,
        ye = !1,
        Le = !1,
        W = !1,
        se = !1,
        le = !1,
        Ve = !0,
        Xe = !1;
    const Ft = "user-content-";
    let Re = !0,
        J = !1,
        Y = {},
        $ = null;
    const qe = c({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let Ke = null;
    const Ze = c({}, ["audio", "video", "img", "source", "image", "track"]);
    let be = null;
    const Je = c({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]),
        ce = "http://www.w3.org/1998/Math/MathML",
        fe = "http://www.w3.org/2000/svg",
        v = "http://www.w3.org/1999/xhtml";
    let j = v,
        Oe = !1,
        Me = null;
    const Ht = c({}, [ce, fe, v], Ne);
    let ue = c({}, ["mi", "mo", "mn", "ms", "mtext"]),
        me = c({}, ["annotation-xml"]);
    const zt = c({}, ["title", "style", "font", "a", "script"]);
    let Q = null;
    const Gt = ["application/xhtml+xml", "text/html"],
        Bt = "text/html";
    let _ = null,
        V = null;
    const Wt = r.createElement("form"),
        Qe = function(e) {
            return e instanceof RegExp || e instanceof Function
        },
        Ce = function() {
            let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            if (!(V && V === e)) {
                if ((!e || typeof e != "object") && (e = {}), e = k(e), Q = Gt.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? Bt : e.PARSER_MEDIA_TYPE, _ = Q === "application/xhtml+xml" ? Ne : he, E = I(e, "ALLOWED_TAGS") ? c({}, e.ALLOWED_TAGS, _) : Be, A = I(e, "ALLOWED_ATTR") ? c({}, e.ALLOWED_ATTR, _) : We, Me = I(e, "ALLOWED_NAMESPACES") ? c({}, e.ALLOWED_NAMESPACES, Ne) : Ht, be = I(e, "ADD_URI_SAFE_ATTR") ? c(k(Je), e.ADD_URI_SAFE_ATTR, _) : Je, Ke = I(e, "ADD_DATA_URI_TAGS") ? c(k(Ze), e.ADD_DATA_URI_TAGS, _) : Ze, $ = I(e, "FORBID_CONTENTS") ? c({}, e.FORBID_CONTENTS, _) : qe, Z = I(e, "FORBID_TAGS") ? c({}, e.FORBID_TAGS, _) : k({}), Se = I(e, "FORBID_ATTR") ? c({}, e.FORBID_ATTR, _) : k({}), Y = I(e, "USE_PROFILES") ? e.USE_PROFILES : !1, Ye = e.ALLOW_ARIA_ATTR !== !1, we = e.ALLOW_DATA_ATTR !== !1, $e = e.ALLOW_UNKNOWN_PROTOCOLS || !1, je = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, B = e.SAFE_FOR_TEMPLATES || !1, ae = e.SAFE_FOR_XML !== !1, z = e.WHOLE_DOCUMENT || !1, W = e.RETURN_DOM || !1, se = e.RETURN_DOM_FRAGMENT || !1, le = e.RETURN_TRUSTED_TYPE || !1, Le = e.FORCE_BODY || !1, Ve = e.SANITIZE_DOM !== !1, Xe = e.SANITIZE_NAMED_PROPS || !1, Re = e.KEEP_CONTENT !== !1, J = e.IN_PLACE || !1, Ge = e.ALLOWED_URI_REGEXP || wt, j = e.NAMESPACE || v, ue = e.MATHML_TEXT_INTEGRATION_POINTS || ue, me = e.HTML_INTEGRATION_POINTS || me, g = e.CUSTOM_ELEMENT_HANDLING || {}, e.CUSTOM_ELEMENT_HANDLING && Qe(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) && (g.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck), e.CUSTOM_ELEMENT_HANDLING && Qe(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) && (g.attributeNameCheck = e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck), e.CUSTOM_ELEMENT_HANDLING && typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements == "boolean" && (g.allowCustomizedBuiltInElements = e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements), B && (we = !1), se && (W = !0), Y && (E = c({}, pt), A = [], Y.html === !0 && (c(E, dt), c(A, ht)), Y.svg === !0 && (c(E, Pe), c(A, Ue), c(A, pe)), Y.svgFilters === !0 && (c(E, xe), c(A, Ue), c(A, pe)), Y.mathMl === !0 && (c(E, ke), c(A, gt), c(A, pe))), e.ADD_TAGS && (E === Be && (E = k(E)), c(E, e.ADD_TAGS, _)), e.ADD_ATTR && (A === We && (A = k(A)), c(A, e.ADD_ATTR, _)), e.ADD_URI_SAFE_ATTR && c(be, e.ADD_URI_SAFE_ATTR, _), e.FORBID_CONTENTS && ($ === qe && ($ = k($)), c($, e.FORBID_CONTENTS, _)), Re && (E["#text"] = !0), z && c(E, ["html", "head", "body"]), E.table && (c(E, ["tbody"]), delete Z.tbody), e.TRUSTED_TYPES_POLICY) {
                    if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw ne('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
                    if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw ne('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
                    y = e.TRUSTED_TYPES_POLICY, K = y.createHTML("")
                } else y === void 0 && (y = dn(U, l)), y !== null && typeof K == "string" && (K = y.createHTML(""));
                b && b(e), V = e
            }
        },
        et = c({}, [...Pe, ...xe, ...tn]),
        tt = c({}, [...ke, ...nn]),
        Yt = function(e) {
            let n = re(e);
            (!n || !n.tagName) && (n = {
                namespaceURI: j,
                tagName: "template"
            });
            const i = he(e.tagName),
                p = he(n.tagName);
            return Me[e.namespaceURI] ? e.namespaceURI === fe ? n.namespaceURI === v ? i === "svg" : n.namespaceURI === ce ? i === "svg" && (p === "annotation-xml" || ue[p]) : !!et[i] : e.namespaceURI === ce ? n.namespaceURI === v ? i === "math" : n.namespaceURI === fe ? i === "math" && me[p] : !!tt[i] : e.namespaceURI === v ? n.namespaceURI === fe && !me[p] || n.namespaceURI === ce && !ue[p] ? !1 : !tt[i] && (zt[i] || !et[i]) : !!(Q === "application/xhtml+xml" && Me[e.namespaceURI]) : !1
        },
        N = function(e) {
            ee(t.removed, {
                element: e
            });
            try {
                re(e).removeChild(e)
            } catch {
                Ot(e)
            }
        },
        G = function(e, n) {
            try {
                ee(t.removed, {
                    attribute: n.getAttributeNode(e),
                    from: n
                })
            } catch {
                ee(t.removed, {
                    attribute: null,
                    from: n
                })
            }
            if (n.removeAttribute(e), e === "is")
                if (W || se) try {
                    N(n)
                } catch {} else try {
                    n.setAttribute(e, "")
                } catch {}
        },
        nt = function(e) {
            let n = null,
                i = null;
            if (Le) e = "<remove></remove>" + e;
            else {
                const T = ve(e, /^[\r\n\t ]+/);
                i = T && T[0]
            }
            Q === "application/xhtml+xml" && j === v && (e = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + e + "</body></html>");
            const p = y ? y.createHTML(e) : e;
            if (j === v) try {
                n = new H().parseFromString(p, Q)
            } catch {}
            if (!n || !n.documentElement) {
                n = Te.createDocument(j, "template", null);
                try {
                    n.documentElement.innerHTML = Oe ? K : p
                } catch {}
            }
            const w = n.body || n.documentElement;
            return e && i && w.insertBefore(r.createTextNode(i), w.childNodes[0] || null), j === v ? Nt.call(n, z ? "html" : "body")[0] : z ? n.documentElement : w
        },
        ot = function(e) {
            return Dt.call(e.ownerDocument || e, e, C.SHOW_ELEMENT | C.SHOW_COMMENT | C.SHOW_TEXT | C.SHOW_PROCESSING_INSTRUCTION | C.SHOW_CDATA_SECTION, null)
        },
        De = function(e) {
            return e instanceof u && (typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || !(e.attributes instanceof F) || typeof e.removeAttribute != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function")
        },
        it = function(e) {
            return typeof m == "function" && e instanceof m
        };

    function P(a, e, n) {
        de(a, i => {
            i.call(t, e, n, V)
        })
    }
    const rt = function(e) {
            let n = null;
            if (P(L.beforeSanitizeElements, e, null), De(e)) return N(e), !0;
            const i = _(e.nodeName);
            if (P(L.uponSanitizeElement, e, {
                    tagName: i,
                    allowedTags: E
                }), ae && e.hasChildNodes() && !it(e.firstElementChild) && R(/<[/\w!]/g, e.innerHTML) && R(/<[/\w!]/g, e.textContent) || e.nodeType === ie.progressingInstruction || ae && e.nodeType === ie.comment && R(/<[/\w]/g, e.data)) return N(e), !0;
            if (!E[i] || Z[i]) {
                if (!Z[i] && st(i) && (g.tagNameCheck instanceof RegExp && R(g.tagNameCheck, i) || g.tagNameCheck instanceof Function && g.tagNameCheck(i))) return !1;
                if (Re && !$[i]) {
                    const p = re(e) || e.parentNode,
                        w = Ct(e) || e.childNodes;
                    if (w && p) {
                        const T = w.length;
                        for (let M = T - 1; M >= 0; --M) {
                            const x = bt(w[M], !0);
                            x.__removalCount = (e.__removalCount || 0) + 1, p.insertBefore(x, Mt(e))
                        }
                    }
                }
                return N(e), !0
            }
            return e instanceof h && !Yt(e) || (i === "noscript" || i === "noembed" || i === "noframes") && R(/<\/no(script|embed|frames)/i, e.innerHTML) ? (N(e), !0) : (B && e.nodeType === ie.text && (n = e.textContent, de([Ee, _e, Ae], p => {
                n = te(n, p, " ")
            }), e.textContent !== n && (ee(t.removed, {
                element: e.cloneNode()
            }), e.textContent = n)), P(L.afterSanitizeElements, e, null), !1)
        },
        at = function(e, n, i) {
            if (Ve && (n === "id" || n === "name") && (i in r || i in Wt)) return !1;
            if (!(we && !Se[n] && R(Pt, n))) {
                if (!(Ye && R(xt, n))) {
                    if (!A[n] || Se[n]) {
                        if (!(st(e) && (g.tagNameCheck instanceof RegExp && R(g.tagNameCheck, e) || g.tagNameCheck instanceof Function && g.tagNameCheck(e)) && (g.attributeNameCheck instanceof RegExp && R(g.attributeNameCheck, n) || g.attributeNameCheck instanceof Function && g.attributeNameCheck(n, e)) || n === "is" && g.allowCustomizedBuiltInElements && (g.tagNameCheck instanceof RegExp && R(g.tagNameCheck, i) || g.tagNameCheck instanceof Function && g.tagNameCheck(i)))) return !1
                    } else if (!be[n]) {
                        if (!R(Ge, te(i, ze, ""))) {
                            if (!((n === "src" || n === "xlink:href" || n === "href") && e !== "script" && Zt(i, "data:") === 0 && Ke[e])) {
                                if (!($e && !R(kt, te(i, ze, "")))) {
                                    if (i) return !1
                                }
                            }
                        }
                    }
                }
            }
            return !0
        },
        st = function(e) {
            return e !== "annotation-xml" && ve(e, Ut)
        },
        lt = function(e) {
            P(L.beforeSanitizeAttributes, e, null);
            const {
                attributes: n
            } = e;
            if (!n || De(e)) return;
            const i = {
                attrName: "",
                attrValue: "",
                keepAttr: !0,
                allowedAttributes: A,
                forceKeepAttr: void 0
            };
            let p = n.length;
            for (; p--;) {
                const w = n[p],
                    {
                        name: T,
                        namespaceURI: M,
                        value: x
                    } = w,
                    X = _(T),
                    Ie = x;
                let S = T === "value" ? Ie : Jt(Ie);
                if (i.attrName = X, i.attrValue = S, i.keepAttr = !0, i.forceKeepAttr = void 0, P(L.uponSanitizeAttribute, e, i), S = i.attrValue, Xe && (X === "id" || X === "name") && (G(T, e), S = Ft + S), ae && R(/((--!?|])>)|<\/(style|title|textarea)/i, S)) {
                    G(T, e);
                    continue
                }
                if (X === "attributename" && ve(S, "href")) {
                    G(T, e);
                    continue
                }
                if (i.forceKeepAttr) continue;
                if (!i.keepAttr) {
                    G(T, e);
                    continue
                }
                if (!je && R(/\/>/i, S)) {
                    G(T, e);
                    continue
                }
                B && de([Ee, _e, Ae], ft => {
                    S = te(S, ft, " ")
                });
                const ct = _(e.nodeName);
                if (!at(ct, X, S)) {
                    G(T, e);
                    continue
                }
                if (y && typeof U == "object" && typeof U.getAttributeType == "function" && !M) switch (U.getAttributeType(ct, X)) {
                    case "TrustedHTML":
                        {
                            S = y.createHTML(S);
                            break
                        }
                    case "TrustedScriptURL":
                        {
                            S = y.createScriptURL(S);
                            break
                        }
                }
                if (S !== Ie) try {
                    M ? e.setAttributeNS(M, T, S) : e.setAttribute(T, S), De(e) ? N(e) : mt(t.removed)
                } catch {
                    G(T, e)
                }
            }
            P(L.afterSanitizeAttributes, e, null)
        },
        $t = function a(e) {
            let n = null;
            const i = ot(e);
            for (P(L.beforeSanitizeShadowDOM, e, null); n = i.nextNode();) P(L.uponSanitizeShadowNode, n, null), rt(n), lt(n), n.content instanceof f && a(n.content);
            P(L.afterSanitizeShadowDOM, e, null)
        };
    return t.sanitize = function(a) {
        let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            n = null,
            i = null,
            p = null,
            w = null;
        if (Oe = !a, Oe && (a = "<!-->"), typeof a != "string" && !it(a))
            if (typeof a.toString == "function") {
                if (a = a.toString(), typeof a != "string") throw ne("dirty is not a string, aborting")
            } else throw ne("toString is not a function");
        if (!t.isSupported) return a;
        if (ye || Ce(e), t.removed = [], typeof a == "string" && (J = !1), J) {
            if (a.nodeName) {
                const x = _(a.nodeName);
                if (!E[x] || Z[x]) throw ne("root node is forbidden and cannot be sanitized in-place")
            }
        } else if (a instanceof m) n = nt("<!---->"), i = n.ownerDocument.importNode(a, !0), i.nodeType === ie.element && i.nodeName === "BODY" || i.nodeName === "HTML" ? n = i : n.appendChild(i);
        else {
            if (!W && !B && !z && a.indexOf("<") === -1) return y && le ? y.createHTML(a) : a;
            if (n = nt(a), !n) return W ? null : le ? K : ""
        }
        n && Le && N(n.firstChild);
        const T = ot(J ? a : n);
        for (; p = T.nextNode();) rt(p), lt(p), p.content instanceof f && $t(p.content);
        if (J) return a;
        if (W) {
            if (se)
                for (w = It.call(n.ownerDocument); n.firstChild;) w.appendChild(n.firstChild);
            else w = n;
            return (A.shadowroot || A.shadowrootmode) && (w = vt.call(o, w, !0)), w
        }
        let M = z ? n.outerHTML : n.innerHTML;
        return z && E["!doctype"] && n.ownerDocument && n.ownerDocument.doctype && n.ownerDocument.doctype.name && R(yt, n.ownerDocument.doctype.name) && (M = "<!DOCTYPE " + n.ownerDocument.doctype.name + `>
` + M), B && de([Ee, _e, Ae], x => {
            M = te(M, x, " ")
        }), y && le ? y.createHTML(M) : M
    }, t.setConfig = function() {
        let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        Ce(a), ye = !0
    }, t.clearConfig = function() {
        V = null, ye = !1
    }, t.isValidAttribute = function(a, e, n) {
        V || Ce({});
        const i = _(a),
            p = _(e);
        return at(i, p, n)
    }, t.addHook = function(a, e) {
        typeof e == "function" && ee(L[a], e)
    }, t.removeHook = function(a, e) {
        if (e !== void 0) {
            const n = qt(L[a], e);
            return n === -1 ? void 0 : Kt(L[a], n, 1)[0]
        }
        return mt(L[a])
    }, t.removeHooks = function(a) {
        L[a] = []
    }, t.removeAllHooks = function() {
        L = Et()
    }, t
}
var _t = Lt();

function ge() {
    return ge = Object.assign ? Object.assign.bind() : function(s) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var o in r)({}).hasOwnProperty.call(r, o) && (s[o] = r[o])
        }
        return s
    }, ge.apply(null, arguments)
}
class Rt {
    constructor(t = {}) {
        this.options = ge({
            loadingClass: t.loadingClass || "is-loading",
            loadedClass: t.loadedClass || "has-loaded",
            errorClass: t.errorClass || "has-error",
            debugMode: t.debugMode || !1,
            allowedDomains: t.allowedDomains || []
        }, t), this.cache = new Map, this.controller = new AbortController
    }
    log(t) {
        this.options.debugMode && console.log(t)
    }
    validateUrl(t) {
        try {
            if (!t) return window.location.href;
            const r = window.location.origin,
                o = t.startsWith("http") ? t : new URL(t, r).href,
                l = new URL(o);
            if (!l.protocol || !l.host) throw new Error("Invalid URL: Must be absolute");
            if (!["http:", "https:"].includes(l.protocol)) throw new Error("Invalid URL: Protocol must be http or https");
            if (this.options.allowedDomains.length > 0) {
                const f = l.hostname;
                if (!this.options.allowedDomains.some(d => d === "localhost" || d === "127.0.0.1" || d === "[::1]" ? ["localhost", "127.0.0.1", "[::1]"].includes(f) : f === d || f.endsWith(`.${d}`))) throw new Error("Invalid URL: Domain not in allowlist")
            }
            if (l.origin !== window.location.origin && this.options.allowedDomains.length === 0) throw new Error("Invalid URL: Cross-origin requests require allowedDomains configuration");
            return l.href
        } catch (r) {
            throw this.options.debugMode && console.error("URL Validation Error:", {
                providedUrl: t,
                error: r.message
            }), new Error(`URL validation failed: ${r.message}`)
        }
    }
    fetchContent(t, r = null, o = !1) {
        const l = this.validateUrl(t);
        return fetch(l, {
            signal: this.controller.signal,
            credentials: "same-origin",
            mode: "cors"
        }).then(f => {
            if (!f.ok) throw new Error("Network response was not ok.");
            return this.log("Fetch response received"), f.text()
        }).then(f => {
            const d = new DOMParser().parseFromString(f, "text/html");
            let m = r ? d.querySelector(r) : d.body;
            if (!m) throw new Error(`Element not found for selector: ${r}`);
            return this.log("Parsed HTML and found element"), m = _t.sanitize(o && r ? m.outerHTML : m.innerHTML), m
        })
    }
    from({
        selector: t,
        url: r = window.location.href,
        includeParent: o = !1,
        onStart: l,
        onEnd: f,
        onError: d
    }) {
        if (!t) {
            const m = new Error("Selector must be defined.");
            return d ? d(m) : console.error(m), Promise.reject(m)
        }
        try {
            const m = this.validateUrl(r);
            l && l();
            const h = `${m}-${t}-${o}`;
            return this.log(`Cache key is: ${h}`), new Promise((C, F) => {
                if (this.cache.has(h)) {
                    const u = this.cache.get(h);
                    return this.log("Serving from cache"), f && f(u), void C(u)
                }
                if (this.log(`Fetching data from URL: ${m}`), m === window.location.href) {
                    const u = document.querySelector(t);
                    if (!u) {
                        const U = new Error(`Element not found for selector: ${t}`);
                        return d ? d(U) : console.error(U), F(U)
                    }
                    const H = _t.sanitize(o ? u.outerHTML : u.innerHTML);
                    this.cache.set(h, H), f && f(H), C(H)
                } else this.fetchContent(m, t, o).then(u => {
                    this.cache.set(h, u), f && f(u), C(u)
                }).catch(u => {
                    d ? d(u) : console.error("Error fetching content:", u), F(u)
                })
            })
        } catch (m) {
            return d ? d(m) : console.error(m), Promise.reject(m)
        }
    }
    to({
        destination: t,
        data: r,
        mode: o = "replace",
        delay: l = 0,
        onStart: f,
        onEnd: d,
        onError: m
    }) {
        if (!t || !r) {
            const u = new Error("Destination and data must be defined.");
            return m ? m(u) : console.error(u), Promise.reject(u)
        }
        const h = typeof t == "string" ? document.querySelector(t) : t;
        if (!h) {
            const u = new Error(`Target element not found for selector: ${t}`);
            return m ? m(u) : console.error(u), Promise.reject(u)
        }
        const C = f ? Promise.resolve(f(t, r)) : Promise.resolve();
        h.classList.add(this.options.loadingClass);
        const F = () => {
            try {
                this.log(`Inserting content via '${o}' mode`), document.createDocumentFragment();
                const u = document.createElement("div");
                if (u.innerHTML = r, o === "prepend")
                    for (const H of [...u.childNodes].reverse()) h.insertBefore(H, h.firstChild);
                else o === "append" || (h.innerHTML = ""), h.appendChild(u);
                return h.classList.remove(this.options.loadingClass), h.classList.add(this.options.loadedClass), d && d(h), Promise.resolve(h)
            } catch (u) {
                return h.classList.remove(this.options.loadingClass), h.classList.add(this.options.errorClass), m ? m(u) : console.error("Error inserting content:", u), Promise.reject(u)
            }
        };
        if (!(l > 0)) return C.then(F);
        this.log(`Delaying insertion by ${l} seconds`), setTimeout(() => C.then(F), 1e3 * l)
    }
    fromTo(t, r) {
        return this.from(t).then(o => this.to(ge({}, r, {
            data: o
        }))).catch(o => Promise.reject(o))
    }
    abortFetch() {
        this.controller.abort(), this.controller = new AbortController, this.cache.clear()
    }
}
window.ContentFetch = Rt;
const pn = {
    debug: !1,
    inview: !1,
    elements: {
        modal: null,
        modalView: null,
        overlay: null,
        exitButton: null
    },
    contentFetch: null,
    currentScrollY: 0,
    mount() {
        this.initElements(), this.initContentFetch(), this.initModal(), this.initGlobalEvents()
    },
    initElements() {
        this.elements.modal = this.block, this.elements.modalView = this.$one(".view_canvas"), this.elements.overlay = this.$one(".modal_overlay"), this.elements.exitButton = this.$one(".modal_exit")
    },
    initContentFetch() {
        this.contentFetch = new Rt, this.log("Content-fetch initialized for modal", "log")
    },
    initModal() {
        this.elements.overlay && this.on("click", this.elements.overlay, this.closeModal), this.elements.exitButton && this.on("click", this.elements.exitButton, this.closeModal), this.on("keydown", document, this.handleKeydown), this.log("Modal close functionality initialized", "log")
    },
    initGlobalEvents() {
        document.addEventListener("modal-bio:open", this.handleGlobalOpen.bind(this)), this.log("Global modal events initialized", "log")
    },
    handleGlobalOpen(s) {
        const {
            contentHTML: t,
            sourceBlock: r
        } = s.detail || {};
        if (!t || !this.elements.modalView) {
            this.log("Modal content or view not found", "error");
            return
        }
        lenis && (lenis.stop(), this.log("Lenis stopped for modal", "log")), document.body.style.overflow = "hidden", this.contentFetch.to({
            destination: this.elements.modalView,
            data: t,
            mode: "replace",
            onStart: () => {
                this.log(`Opening modal from ${r||"unknown"}`, "log"), this.elements.modal.classList.add("is-open")
            },
            onEnd: () => {
                this.log("Modal content loaded", "log"), this.animateModalContent()
            },
            onError: o => {
                this.log("Error loading modal content", "error", o)
            }
        })
    },
    animateModalContent() {
        const s = this.elements.modalView.querySelector(".modal_data");
        if (!s) {
            this.log("Modal content element not found for animation", "warn");
            return
        }
        gsap.fromTo(s, {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            delay: .4,
            duration: .6,
            ease: "power2.out",
            onComplete: () => {
                this.log("Modal content animation completed", "log")
            }
        })
    },
    closeModal() {
        lenis && (lenis.start(), this.log("Lenis started after modal close", "log")), document.body.style.overflow = "", this.elements.modal.classList.remove("is-open"), this.log("Modal closed", "log")
    },
    handleKeydown(s) {
        s.key === "Escape" && this.elements.modal.classList.contains("is-open") && this.closeModal()
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["modal-bio"] = {
    default: pn
});