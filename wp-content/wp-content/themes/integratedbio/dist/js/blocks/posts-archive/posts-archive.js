class p {
    constructor(e, s = {}) {
        this.container = e, this.defaults = {
            postsPerPage: 10,
            debug: !1,
            stateClasses: {
                loading: "is-loading",
                empty: "is-empty",
                filtered: "is-filtered",
                disabled: "is-disabled"
            },
            hooks: {
                beforeFetch: t => Promise.resolve(),
                afterFetch: t => Promise.resolve(),
                onEmpty: t => Promise.resolve(),
                onFiltered: (t, i) => Promise.resolve(),
                onReset: t => Promise.resolve(),
                onError: (t, i) => Promise.resolve(),
                beforeRender: t => Promise.resolve(),
                afterRender: t => Promise.resolve(),
                beforeTransition: t => Promise.resolve(),
                afterTransition: t => Promise.resolve()
            },
            filters: {
                enabled: !0,
                instant: !0,
                relation: "AND",
                defaultTaxonomyFilters: {},
                types: {
                    checkbox: {
                        selector: '.filters-terms input[type="checkbox"]',
                        getValue: t => ({
                            taxonomy: t.name,
                            value: t.value,
                            checked: t.checked
                        })
                    },
                    search: {
                        selector: '.filters-terms input[type="search"]',
                        delay: 500,
                        minChars: 3,
                        getValue: t => ({
                            query: t.value
                        })
                    }
                },
                submitHandler: s.filters.submitHandler || this.defaultSubmitHandler.bind(this)
            },
            selectors: {
                results: ".js-posts-results",
                empty: ".js-posts-empty",
                template: "#post-template",
                pagination: ".js-pagination",
                paginationPrev: ".js-prev",
                paginationNext: ".js-next",
                paginationPages: ".js-pages",
                paginationNumber: ".js-page-number",
                paginationDivider: ".js-page-divider",
                resetButton: ".js-filters-reset",
                totalPosts: ".js-posts-total",
                currentPagePosts: ".js-posts-current",
                currentPageRange: ".js-posts-range",
                searchTerm: ".js-search-term",
                submitButton: ".js-filters-submit",
                filterCount: ".js-filter-count"
            },
            endpoints: {
                posts: "/wp-admin/admin-ajax.php"
            },
            templates: {
                totalPosts: t => `${t} posts`,
                currentPagePosts: t => `${t} posts`,
                currentPageRange: (t, i, a) => `Showing ${t}-${i} of ${a}`,
                searchTerm: t => t,
                pageNumber: (t, i) => `
					<button
						class="${this.options.selectors.paginationNumber.slice(1)} ${i?"-active":""}"
						${i?'aria-current="page"':""}
						aria-label="${this.options.aria.pageNumber(t)}"
					>${t}</button>
				`
            },
            aria: {
                pageNumber: t => `Go to page ${t}`,
                paginationPrev: "Go to previous page",
                paginationNext: "Go to next page",
                searchStatus: "Search results updated",
                currentPage: "Current page",
                totalResults: "Total results",
                rangeStatus: "Showing results range"
            },
            render: {
                empty: t => `No posts found${t?` for "${t}"`:""}.`,
                post: null
            }
        }, this.options = this.mergeDeep(this.defaults, s), this.debug = this.options.debug ? console.log.bind(console, "[🜄 PostFilter]") : () => {}, this.options.render ? .post || console.error("[PostFilter] No render.post function provided. This is required for rendering posts."), this.results = e.querySelector(this.options.selectors.results) || null, this.empty = e.querySelector(this.options.selectors.empty) || null, this.template = e.querySelector(this.options.selectors.template) || null, this.pagination = e.querySelector(this.options.selectors.pagination) || null, this.resetButton = e.querySelector(this.options.selectors.resetButton) || null, this.totalPostsEl = e.querySelector(this.options.selectors.totalPosts) || null, this.currentPagePostsEl = e.querySelector(this.options.selectors.currentPagePosts) || null, this.currentPageRangeEl = e.querySelector(this.options.selectors.currentPageRange) || null, this.searchTermEl = e.querySelector(this.options.selectors.searchTerm) || null, this.state = {
            page: 1,
            filters: this.options.filters.defaultTaxonomyFilters || {},
            maxPages: 1,
            totalPosts: 0,
            currentPosts: 0,
            rangeStart: 0,
            rangeEnd: 0
        }, this.searchTimer = null, this._boundHandlers = new Map, this.imageObserver = null, this.initLazyLoading(), this.currentTrigger = "initial", this.bindEvents(), this.applyUrlParams(), this.fetchPosts()
    }
    mergeDeep(e, s) {
        if (!s) return e;
        const t = i => i && typeof i == "object" && !Array.isArray(i);
        if (t(e) && t(s))
            for (const i in s) t(s[i]) ? (e[i] || Object.assign(e, {
                [i]: {}
            }), this.mergeDeep(e[i], s[i])) : Object.assign(e, {
                [i]: s[i]
            });
        return e
    }
    bindEvents() {
        if (this.options.filters.enabled) {
            if (Object.entries(this.options.filters.types).forEach(([s, t]) => {
                    this.container.querySelectorAll(t.selector).forEach(i => {
                        const a = () => {
                            if (this.options.filters.instant)
                                if (s === "search") {
                                    const r = this.options.filters.types.search,
                                        n = i.value.trim();
                                    (n.length === 0 || n.length >= r.minChars) && (clearTimeout(this.searchTimer), this.searchTimer = setTimeout(() => {
                                        this.currentTrigger = "search", this.state.page = 1, this.updateFilters(), this.updateUrl(), this.fetchPosts()
                                    }, r.delay))
                                } else this.currentTrigger = "filter", this.state.page = 1, this.updateFilters(), this.updateUrl(), this.fetchPosts();
                            this.updateButtonStates()
                        };
                        this._boundHandlers.set(i, a), i.addEventListener("input", a)
                    })
                }), this.resetButton) {
                const s = () => {
                    clearTimeout(this.searchTimer), this.currentTrigger = "reset", this.resetFilters(), this.updateUrl()
                };
                this._boundHandlers.set(this.resetButton, s), this.resetButton.addEventListener("click", s)
            }
            if (!this.options.filters.instant) {
                const s = this.container.querySelector("form"),
                    t = this.container.querySelector(this.options.selectors.submitButton);
                if (s && t) {
                    const i = a => {
                        this.currentTrigger = "submit", this.options.filters.submitHandler(a)
                    };
                    this._boundHandlers.set(s, i), s.addEventListener("submit", i)
                }
            }
        }
        if (this.pagination) {
            const s = this.pagination.querySelector(this.options.selectors.paginationPrev),
                t = this.pagination.querySelector(this.options.selectors.paginationNext);
            if (s) {
                const i = () => {
                    this.currentTrigger = "pagination", this.changePage("prev")
                };
                this._boundHandlers.set(s, i), s.addEventListener("click", i)
            }
            if (t) {
                const i = () => {
                    this.currentTrigger = "pagination", this.changePage("next")
                };
                this._boundHandlers.set(t, i), t.addEventListener("click", i)
            }
        }
        const e = () => {
            this.currentTrigger = "url", this.applyUrlParams()
        };
        this._boundHandlers.set(window, e), window.addEventListener("popstate", e)
    }
    updateFilters() {
        const e = {};
        this.debug("Updating filters..."), Object.entries(this.options.filters.types).forEach(([t, i]) => {
            this.container.querySelectorAll(i.selector).forEach(a => {
                const r = i.getValue(a);
                this.debug("Filter input:", {
                    type: t,
                    data: r,
                    element: a
                }), t === "checkbox" && r.checked ? r.value && (e[r.taxonomy] || (e[r.taxonomy] = []), e[r.taxonomy].push(r.value)) : t === "search" && r.query ? .trim() && (e.query || (e.query = []), e.query.push(r.query.trim()))
            })
        }), this.debug("Final filters:", e), this.state.filters = e, this.debug("Filters updated:", this.state.filters);
        const s = Object.keys(e).length > 0;
        this.container.classList.toggle(this.options.stateClasses.filtered, s), this.updateSearchTerm(), this.options.hooks.onFiltered(e, this.currentTrigger), this.updateButtonStates()
    }
    updateSearchTerm() {
        if (this.searchTermEl && this.state.filters.query) {
            const e = this.state.filters.query[0],
                s = this.options.templates ? .searchTerm || this.defaults.templates.searchTerm;
            this.searchTermEl.textContent = s(e), this.searchTermEl.setAttribute("role", "status"), this.searchTermEl.setAttribute("aria-label", this.options.aria ? .searchStatus || this.defaults.aria.searchStatus)
        }
    }
    applyUrlParams() {
        const e = new URLSearchParams(window.location.search),
            s = e.get("page");
        s && (this.state.page = parseInt(s, 10)), Object.entries(this.options.filters.types).forEach(([t, i]) => {
            this.container.querySelectorAll(i.selector).forEach(a => {
                const r = a.name.replace("[]", ""),
                    n = e.get(r);
                if (n) {
                    const l = n.split(",");
                    t === "checkbox" ? a.checked = l.includes(a.value) : t === "search" && (a.value = n)
                }
            })
        }), this.updateFilters()
    }
    updateUrl() {
        const e = new URLSearchParams;
        e.set("page", this.state.page), Object.entries(this.state.filters).forEach(([t, i]) => {
            i.length && e.set(t, i.join(","))
        });
        const s = `${window.location.pathname}?${e.toString()}`;
        window.history.replaceState(null, "", s), this.debug("URL updated:", s)
    }
    changePage(e) {
        e === "prev" && this.state.page > 1 ? this.state.page-- : e === "next" && this.state.page < this.state.maxPages && this.state.page++, this.fetchPosts()
    }
    async fetchPosts(e = !1) {
        try {
            this.container.classList.add(this.options.stateClasses.loading), await this.options.hooks.beforeFetch(this.currentTrigger), e || await this.options.hooks.beforeTransition(this.currentTrigger);
            const s = new URLSearchParams({
                page: this.state.page,
                posts_per_page: this.options.postsPerPage,
                relation: this.options.filters.relation || "AND"
            });
            this.options.offset && s.append("offset", this.options.offset), this.options.params ? .include && s.append("include", this.options.params.include.join(",")), this.options.params ? .exclude && s.append("exclude", this.options.params.exclude.join(",")), this.options.params ? .excludedCategories && s.append("excluded_categories", this.options.params.excludedCategories.join(","));
            const t = { ...this.options.filters.defaultTaxonomyFilters,
                ...this.state.filters
            };
            Object.keys(t).length > 0 && s.append("tax_query", JSON.stringify(t)), this.debug("Sending request with:", {
                page: this.state.page,
                filters: t,
                include: this.options.params ? .include,
                exclude: this.options.params ? .exclude,
                excludedCategories: this.options.params ? .excludedCategories
            });
            const i = await fetch(`${this.options.endpoints.posts}?${s.toString()}`),
                a = await i.json();
            if (this.debug("Response data:", a), !i.ok) throw new Error(a.message || "Error fetching posts");
            const {
                posts: r,
                total: n,
                pages: l
            } = a;
            if (this.state.totalPosts = parseInt(n), this.state.maxPages = parseInt(l), this.state.currentPosts = r.length, this.updatePageRange(), this.updateFilterCounts(r, a), await this.options.hooks.afterFetch(this.currentTrigger), r.length === 0) {
                if (await this.options.hooks.onEmpty(this.currentTrigger), this.empty) {
                    const h = this.getSearchTerm(),
                        c = this.options.render ? .empty || this.defaults.render.empty;
                    this.empty.innerHTML = c(h), this.empty.style.display = "block"
                }
                this.results && (this.results.innerHTML = ""), this.pagination && (this.pagination.style.display = "none"), this.container.classList.add(this.options.stateClasses.empty)
            } else this.empty && (this.empty.style.display = "none"), this.pagination && (this.pagination.style.display = ""), e ? await this.renderPosts(r, !0) : await this.renderPosts(r, !1), this.container.classList.remove(this.options.stateClasses.empty);
            this.container.classList.remove(this.options.stateClasses.loading), this.updateCounts(), this.pagination && this.renderPagination(), await this.options.hooks.afterTransition(this.currentTrigger)
        } catch (s) {
            if (this.debug("Error:", s), console.error("Error fetching posts:", s), this.empty) {
                const t = this.getSearchTerm(),
                    i = this.options.render ? .empty || this.defaults.render.empty;
                this.empty.innerHTML = i(t), this.empty.style.display = "block"
            }
            this.results && (this.results.innerHTML = ""), this.pagination && (this.pagination.style.display = "none"), this.container.classList.add(this.options.stateClasses.empty), this.container.classList.remove(this.options.stateClasses.loading), await this.options.hooks.onError(s, this.currentTrigger)
        }
    }
    preparePostsContent(e) {
        return this.template ? e.map(s => this.template.innerHTML.replace(/\{\{\s*(\w+)\s*\}\}/g, (i, a) => s[a] || "")).join("") : ""
    }
    updateCounts() {
        if (this.totalPostsEl) {
            const e = this.options.templates ? .totalPosts || this.defaults.templates.totalPosts;
            this.totalPostsEl.innerHTML = e(this.state.totalPosts), this.totalPostsEl.setAttribute("aria-label", this.options.aria ? .totalResults || this.defaults.aria.totalResults)
        }
        if (this.currentPagePostsEl) {
            const e = this.options.templates ? .currentPagePosts || this.defaults.templates.currentPagePosts;
            this.currentPagePostsEl.innerHTML = e(this.state.currentPosts)
        }
        if (this.currentPageRangeEl) {
            const e = this.options.templates ? .currentPageRange || this.defaults.templates.currentPageRange;
            this.currentPageRangeEl.innerHTML = e(this.state.rangeStart, this.state.rangeEnd, this.state.totalPosts)
        }
    }
    getTotalPosts() {
        return this.state.totalPosts
    }
    getCurrentPage() {
        return this.state.page
    }
    getCurrentPagePosts() {
        return this.state.currentPosts
    }
    getPageRange() {
        return {
            start: this.state.rangeStart,
            end: this.state.rangeEnd,
            total: this.state.totalPosts
        }
    }
    getSearchTerm() {
        return this.state.filters.query ? .[0] || null
    }
    renderPagination() {
        if (!this.pagination) return;
        this.pagination.children.length === 0 && (this.pagination.innerHTML = `
				<button class="pagination_btn -prev js-prev u-disable-button" disabled>&larr; Previous</button>
				<div class="pagination_pages js-pages"></div>
				<button class="pagination_btn -next js-next u-disable-button" disabled>Next &rarr;</button>
			`);
        const e = this.pagination.querySelector(this.options.selectors.paginationPrev),
            s = this.pagination.querySelector(this.options.selectors.paginationNext),
            t = this.pagination.querySelector(this.options.selectors.paginationPages);
        if (!e || !s || !t) return;
        this.pagination.setAttribute("role", "navigation"), this.pagination.setAttribute("aria-label", "Posts navigation"), e && e.setAttribute("aria-label", this.options.aria ? .paginationPrev || this.defaults.aria.paginationPrev), s && s.setAttribute("aria-label", this.options.aria ? .paginationNext || this.defaults.aria.paginationNext), e.disabled = this.state.page === 1, s.disabled = this.state.page === this.state.maxPages, e.setAttribute("aria-disabled", e.disabled.toString()), s.setAttribute("aria-disabled", s.disabled.toString());
        let i = "";
        const a = this.options.templates ? .pageNumber || this.defaults.templates.pageNumber,
            r = this.options.maxVisiblePages || 10,
            n = Math.max(1, this.state.page - Math.floor(r / 2)),
            l = Math.min(this.state.maxPages, n + r - 1);
        n > 1 && (i += a.call(this, 1, this.state.page === 1), n > 2 && (i += `<span class="${this.options.selectors.paginationDivider.slice(1)}">...</span>`));
        for (let h = n; h <= l; h++) {
            const c = h === this.state.page;
            i += a.call(this, h, c)
        }
        l < this.state.maxPages && (l < this.state.maxPages - 1 && (i += `<span class="${this.options.selectors.paginationDivider.slice(1)}">...</span>`), i += a.call(this, this.state.maxPages, this.state.maxPages === this.state.page)), t.innerHTML = i, t.querySelectorAll(this.options.selectors.paginationNumber).forEach(h => {
            h.addEventListener("click", () => {
                this.currentTrigger = "pagination", this.state.page = parseInt(h.textContent), this.fetchPosts()
            })
        })
    }
    destroy() {
        clearTimeout(this.searchTimer), this._boundHandlers.forEach((s, t) => {
            t.removeEventListener(t === window ? "popstate" : t.type === "button" ? "click" : "input", s)
        }), this._boundHandlers.clear(), this.pagination && this.pagination.querySelectorAll(this.options.selectors.paginationNumber).forEach(s => {
            const t = this._boundHandlers.get(s);
            t && (s.removeEventListener("click", t), this._boundHandlers.delete(s))
        }), this.container = null, this.template = null, this.results = null, this.empty = null, this.pagination = null, this.resetButton = null, this.totalPostsEl = null, this.currentPagePostsEl = null, this.currentPageRangeEl = null, this.searchTermEl = null, this.state = null, this.options = null, this.imageObserver && (this.imageObserver.disconnect(), this.imageObserver = null), this.resetButton && (this.resetButton.classList.remove(this.options.stateClasses.disabled), this.resetButton.tagName === "BUTTON" && (this.resetButton.disabled = !1));
        const e = this.container.querySelector(this.options.selectors.submitButton);
        e && (e.classList.remove(this.options.stateClasses.disabled), e.tagName === "BUTTON" && (e.disabled = !1))
    }
    resetFilters() {
        Object.entries(this.options.filters.types).forEach(([, e]) => {
            this.container.querySelectorAll(e.selector).forEach(s => {
                s.type === "checkbox" || s.type === "radio" ? s.checked = !1 : s.tagName === "SELECT" ? s.selectedIndex = 0 : s.type === "search" && (s.value = "")
            })
        }), this.state.page = 1, this.state.filters = {}, this.container.classList.remove(this.options.stateClasses.filtered, this.options.stateClasses.empty), this.options.hooks.onReset(this.currentTrigger), this.fetchPosts(), this.updateButtonStates()
    }
    initLazyLoading() {
        "IntersectionObserver" in window && (this.imageObserver = new IntersectionObserver((e, s) => {
            e.forEach(t => {
                if (t.isIntersecting) {
                    const i = t.target;
                    this.loadImage(i), s.unobserve(i)
                }
            })
        }, {
            rootMargin: "50px 0px",
            threshold: .01
        }))
    }
    loadImage(e) {
        const s = e.dataset.src;
        s && (e.src = s, e.classList.add("is-loaded"))
    }
    observeImages() {
        if (!this.imageObserver) return;
        this.results.querySelectorAll("img.lazy:not(.is-loaded)").forEach(s => this.imageObserver.observe(s))
    }
    async renderPosts(e) {
        if (await this.options.hooks.beforeRender(this.currentTrigger), this.results) {
            if (this.options.render ? .post) this.results.innerHTML = e.map(s => this.options.render.post(s)).join("");
            else if (this.template) {
                const s = this.template.innerHTML;
                this.results.innerHTML = e.map(t => {
                    let i = s;
                    return Object.entries(t).forEach(([a, r]) => {
                        i = i.replace(new RegExp(`{{\\s*${a}\\s*}}`, "g"), r)
                    }), i
                }).join("")
            }
            this.observeImages()
        }
        await this.options.hooks.afterRender(this.currentTrigger)
    }
    defaultSubmitHandler(e) {
        e.preventDefault(), this.state.page = 1, this.updateFilters(), this.updateUrl(), this.fetchPosts()
    }
    updateButtonStates() {
        const e = this.options.filters.instant ? Object.keys(this.state.filters).length > 0 : this.hasPendingFilters(),
            s = this.state.page === 1;
        if (this.resetButton) {
            const t = !e && s;
            this.resetButton.classList.toggle(this.options.stateClasses.disabled, t), this.resetButton.tagName === "BUTTON" && (this.resetButton.disabled = t)
        }
        if (!this.options.filters.instant) {
            const t = this.container.querySelector(this.options.selectors.submitButton);
            if (t) {
                const i = !e;
                t.classList.toggle(this.options.stateClasses.disabled, i), t.tagName === "BUTTON" && (t.disabled = i)
            }
        }
    }
    hasPendingFilters() {
        let e = !1;
        return Object.entries(this.options.filters.types).forEach(([s, t]) => {
            this.container.querySelectorAll(t.selector).forEach(i => {
                (s === "checkbox" && i.checked || s === "search" && i.value.trim().length >= t.minChars) && (e = !0)
            })
        }), e
    }
    updatePageRange() {
        const e = this.options.postsPerPage;
        this.state.rangeStart = (this.state.page - 1) * e + 1, this.state.rangeEnd = Math.min(this.state.rangeStart + e - 1, this.state.totalPosts)
    }
    updateFilterCounts(e, s) {
        const t = s.categoryTotals || {};
        this.container.querySelectorAll(this.options.selectors.filterCount).forEach(i => {
            const a = i.dataset.termId,
                r = t[a] || 0;
            i.textContent = r > 0 ? `(${r})` : "(0)"
        })
    }
}
const d = {
    debug: !1,
    inview: !0,
    elements: {
        container: null
    },
    mount() {
        this.initElements(), this.initFilters()
    },
    initElements() {
        this.elements.container = this.$one(".post-archive")
    },
    initFilters() {
        const o = this.elements.container,
            e = this.block;
        if (!o) return;
        this.postsThumbSelector = ".e-post-thumb", this.postsPerPage = e.dataset.initialPosts ? parseInt(e.dataset.initialPosts, 10) : 12, this.includePosts = e.dataset.include ? e.dataset.include.split(",") : null, this.excludePosts = e.dataset.exclude ? e.dataset.exclude.split(",") : null, this.excludedCategories = e.dataset.excludedCategories ? e.dataset.excludedCategories.split(",") : null, this.offset = e.dataset.offset ? parseInt(e.dataset.offset, 10) : 0, this.loadMoreEnabled = e.dataset.loadMore === "true", this.initialPostsToShow = parseInt(e.dataset.initialPosts), this.postsToLoadMore = e.dataset.loadMorePosts ? parseInt(e.dataset.loadMorePosts) : 6, this.currentlyVisible = 0, this.allPosts = [], this.isLoadingMore = !1;
        const s = {
            postsPerPage: this.loadMoreEnabled ? 1e3 : this.postsPerPage,
            offset: this.offset,
            endpoints: {
                posts: "/wp-json/post-archive/v1/posts"
            },
            params: {
                include: this.includePosts,
                exclude: this.excludePosts,
                excludedCategories: this.excludedCategories
            },
            debug: !1,
            hooks: {
                beforeTransition: async t => {
                    t !== "initial" && lenis.scrollTo(o, {
                        duration: 1,
                        offset: -125,
                        immediate: !1
                    });
                    const i = o.querySelectorAll(this.postsThumbSelector);
                    i.length && await gsap.to(i, {
                        opacity: 0,
                        y: -12,
                        stagger: 0,
                        duration: .2
                    })
                },
                beforeRender: async () => {
                    gsap.killTweensOf(o.querySelectorAll(this.postsThumbSelector))
                },
                afterRender: async () => {
                    const t = o.querySelectorAll(this.postsThumbSelector);
                    if (this.loadMoreEnabled) {
                        this.currentlyVisible = 0, this.allPosts = [], this.handleLoadMoreRender();
                        const i = Array.from(t).filter(a => a.style.display !== "none");
                        gsap.set(i, {
                            opacity: 0,
                            y: 12
                        }), await gsap.to(i, {
                            opacity: 1,
                            y: 0,
                            stagger: .1,
                            duration: .3
                        })
                    } else gsap.set(t, {
                        opacity: 0,
                        y: 12
                    }), await gsap.to(t, {
                        opacity: 1,
                        y: 0,
                        stagger: .1,
                        duration: .3
                    })
                },
                afterTransition: async () => {
                    ScrollTrigger.refresh()
                }
            },
            filters: {
                enabled: !0,
                instant: !0,
                relation: "OR",
                searchDelay: 300,
                types: {
                    checkbox: {
                        selector: '.js-terms input[type="radio"]',
                        getValue: t => ({
                            taxonomy: t.name.replace("[]", ""),
                            value: t.value,
                            checked: t.checked
                        })
                    },
                    search: {
                        selector: '.js-search input[type="search"]',
                        getValue: t => ({
                            query: t.value
                        })
                    }
                }
            },
            templates: {
                totalPosts: t => `${t}`
            },
            render: {
                post: t => {
                    const i = {
                            class: "e-post-thumb " + t.classes,
                            href: t.redirect_url || t.permalink,
                            "aria-label": t.title,
                            target: t.redirect_url ? "_blank" : "_self",
                            id: `post-${t.id}`
                        },
                        a = Object.entries(i).map(([n, l]) => `${n}="${l}"`).join(" "),
                        r = t.categories ? .length ? t.categories[0].name : "Type";
                    return `
						<a ${a}>
							<div class="item_meta">
								<div class="meta_type u-ts--1">${r}</div>
								<time class="meta_date">${t.date}</time>
							</div>
							<h6 class="item_title">
								<span class="title_el">${t.title}</span>
							</h6>
							<div class="item_foot">
								<div class="foot_label">Read article</div>
							</div>
							<figure class="item_background"></figure>
							<div class="item_btn">
								<div class="btn_el u-btn--2">
									<i class="btn_icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="51" height="48" fill="none" viewBox="0 0 51 48">
											<path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z"/>
										</svg>
									</i>
								</div>
								<svg class="btn_bg" xmlns="http://www.w3.org/2000/svg" width="87" height="90" fill="none" viewBox="0 0 87 90"><path fill="#fff" d="M35.43 45.104 23.71 81.57A12.146 12.146 0 0 1 12.145 90C5.438 90 0 84.562 0 77.854V16C0 7.163 7.163 0 16 0h55c8.837 0 16 7.163 16 16v2c0 8.837-7.163 16-16 16H50.663a16 16 0 0 0-15.232 11.104Z"/></svg>
							</div>
						</a>
					`
                },
                empty: t => `Oops! No posts found${t?` for "${t}".`:"."}`
            },
            selectors: {
                pagination: ".js-pagination",
                paginationPrev: ".js-prev",
                paginationNext: ".js-next",
                paginationPages: ".js-pages",
                paginationNumber: ".pagination_number",
                paginationDivider: ".pagination_divider"
            },
            maxVisiblePages: 7
        };
        if (this.grid = new p(o, s), this.loadMoreEnabled) {
            this.initLoadMore();
            const t = o.querySelector(".js-pagination");
            t && (t.style.display = "none")
        }
    },
    initLoadMore() {
        const o = this.elements.container;
        this.loadMoreWrapper = document.createElement("div"), this.loadMoreWrapper.className = "posts_load-button", this.loadMoreButton = document.createElement("button"), this.loadMoreButton.className = "load-more-btn u-btn--3 -plus", this.loadMoreButton.setAttribute("data-label", "Load More Articles"), this.loadMoreButton.innerHTML = '<span class="btn_label">Load More Articles</span>', this.loadMoreButton.setAttribute("type", "button"), this.loadMoreWrapper.appendChild(this.loadMoreButton);
        const e = o.querySelector(".posts");
        e && e.appendChild(this.loadMoreWrapper), this.loadMoreButton.addEventListener("click", () => this.loadMore())
    },
    async handleLoadMoreRender() {
        const e = this.elements.container.querySelectorAll(this.postsThumbSelector);
        this.allPosts = Array.from(e), this.currentlyVisible = Math.min(this.initialPostsToShow, this.allPosts.length), this.updateVisiblePosts(), this.updateLoadMoreButton()
    },
    updateVisiblePosts() {
        this.allPosts.forEach((o, e) => {
            e < this.currentlyVisible ? (o.style.display = "", o.classList.add("is-visible")) : (o.style.display = "none", o.classList.remove("is-visible"))
        })
    },
    updateLoadMoreButton() {
        if (!this.loadMoreButton) return;
        this.currentlyVisible < this.allPosts.length ? (this.loadMoreButton.style.display = "", this.loadMoreButton.disabled = this.isLoadingMore, this.loadMoreButton.setAttribute("data-label", this.isLoadingMore ? "Loading..." : "Load More Articles"), this.loadMoreButton.querySelector(".btn_label").textContent = this.isLoadingMore ? "Loading More..." : "Load More Articles") : this.loadMoreButton.style.display = "none"
    },
    async loadMore() {
        if (this.isLoadingMore) return;
        this.grid.currentTrigger = "other", this.isLoadingMore = !0, this.updateLoadMoreButton();
        const o = Math.min(this.currentlyVisible + this.postsToLoadMore, this.allPosts.length),
            e = this.allPosts.slice(this.currentlyVisible, o);
        gsap.set(e, {
            opacity: 0,
            y: 20,
            display: ""
        }), await gsap.to(e, {
            opacity: 1,
            y: 0,
            stagger: .1,
            duration: .4
        }), this.currentlyVisible = o, this.updateVisiblePosts(), this.isLoadingMore = !1, this.updateLoadMoreButton(), ScrollTrigger.refresh()
    }
};
typeof window < "u" && (window.blockRegistry || (window.blockRegistry = {}), window.blockRegistry["posts-archive"] = {
    default: d
});