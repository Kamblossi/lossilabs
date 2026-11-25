(() => {
  const GHOST_URL = 'https://rnd.lossilabs.tech';
  const CONTENT_KEY = '8389428054cf5acab365f19d14';
  const ROTATE_MS = 60000;

  const STREAM_TAGS = ['news-and-updates', 'releases', 'manuals'];
  const CATEGORIES = [
    { slug: '', label: 'All' },
    { slug: 'news-and-updates', label: 'News & Updates' },
    { slug: 'releases', label: 'Releases' },
    { slug: 'manuals', label: 'Manuals' }
  ];

  const ARROW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="51" height="48" fill="none" viewBox="0 0 51 48"><path fill="currentColor" d="M6.728 9.09A12 12 0 0 1 18.369 0H39c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12H12.37C4.561 48-1.167 40.663.727 33.09l6-24Z"/></svg>`;
  const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fmtDate = iso => iso ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  const postUrl = p => `${GHOST_URL}/${p.slug}/`;
  const tagName = p => p.primary_tag ? p.primary_tag.name : 'The Lab';
  const hasTag = (post, slug) => (post.tags || []).some(t => t.slug === slug);

  function renderThumbCard(p) {
    return `<a class="e-post-thumb posts_item inview-element is-inview" data-element="post-thumb" href="${postUrl(p)}" style="display:flex;flex-direction:column;justify-content:space-between;text-decoration:none;">
      <div class="item_meta"><div class="meta_type u-ts--1">${esc(tagName(p))}</div><time class="meta_date">${fmtDate(p.published_at)}</time></div>
      <h6 class="item_title"><span class="title_el">${esc(p.title)}</span></h6>
      <p style="font-size:14px;opacity:.78;margin:10px 0 18px;line-height:1.5;">${esc(p.custom_excerpt || p.excerpt || '')}</p>
      <div class="item_foot"><div class="foot_label">Read article ↗</div></div><figure class="item_background"></figure><div class="item_btn"><div class="btn_el u-btn--2"><i class="btn_icon">${ARROW_SVG}</i></div></div>
    </a>`;
  }

  // A. LANDING PAGE (/): Populate The Lab preview cards with Featured posts first, then latest dispatches
  function initLandingLab(posts) {
    const grid = document.querySelector('[data-rnd-home-grid]')
      || document.querySelector('.home-lab .posts_results, .lab-preview .posts_results, .posts_results');
    if (!grid) return;

    const featured = posts.filter(p => p.featured === true);
    const rest = posts.filter(p => !p.featured);
    const curated = [...featured, ...rest].slice(0, 3);

    grid.innerHTML = curated.length
      ? curated.map(renderThumbCard).join('')
      : `<p style="font-family:'RobotoMono',monospace;opacity:.7;padding:24px 0;grid-column:1/-1;">New R&amp;D dispatches publishing soon on rnd.lossilabs.tech.</p>`;
  }

  // B. THE LAB (/the-lab/) — 1. HIGHLIGHTS: Strictly Featured posts, rotating every 60s
  function renderHighlight(post, idx, total) {
    const img = post.feature_image
      ? `<aside class="item_image"><img decoding="async" src="${esc(post.feature_image)}" class="image_el img-crop" alt="${esc(post.title)}" /></aside>`
      : '';
    const dots = total > 1
      ? `<div style="display:flex;align-items:center;gap:8px;margin-top:14px;position:relative;z-index:5;">
          <span style="font-family:'RobotoMono',monospace;font-size:12px;opacity:0.7;">HIGHLIGHT ${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span>
          <div style="display:flex;gap:6px;">${Array.from({ length: total }, (_, i) =>
            `<button type="button" data-rnd-slide="${i}" aria-label="Show highlight ${i + 1}" style="width:${i === idx ? '22px' : '8px'};height:8px;border-radius:999px;border:none;cursor:pointer;background:${i === idx ? '#294a33' : 'rgba(34,47,48,0.28)'};transition:all .25s;"></button>`
          ).join('')}</div>
        </div>`
      : '';
    return `<a class="e-post-feature featured_item inview-element is-inview" data-element="post-feature" href="${postUrl(post)}" aria-label="${esc(post.title)}" style="opacity:1;transition:opacity .35s;">
      ${img}<aside class="item_content"><div class="content_inner">
        <div class="item_meta"><div class="meta_type u-ts--1">${esc(tagName(post))}</div><time class="meta_date">${fmtDate(post.published_at)}</time></div>
        <hgroup class="item_hgroup"><h6 class="hgroup_title"><span class="title_el">${esc(post.title)}</span></h6><div class="hgroup_excerpt">${esc(post.custom_excerpt || post.excerpt || '')}</div></hgroup>
        <div class="item_foot"><div class="foot_label">Read on R&amp;D Lab</div></div>${dots}
      </div></aside><figure class="item_background"></figure><div class="item_btn"><div class="btn_el u-btn--2"><i class="btn_icon">${ARROW_SVG}</i></div></div>
    </a>`;
  }

  function initHighlights(posts) {
    const box = document.querySelector('.featured');
    if (!box) return;
    const featured = posts.filter(p => p.featured === true);
    if (!featured.length) {
      box.innerHTML = `<p style="font-family:'RobotoMono',monospace;opacity:0.7;padding:24px 0;">No featured highlights selected yet. Toggle "Feature this post" in Ghost Admin to spotlight entries here.</p>`;
      return;
    }

    let cur = 0;
    let paused = false;

    const mount = i => {
      cur = (i + featured.length) % featured.length;
      box.innerHTML = renderHighlight(featured[cur], cur, featured.length);
      box.querySelectorAll('[data-rnd-slide]').forEach(b =>
        b.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          mount(Number(b.dataset.rndSlide));
        })
      );
    };

    mount(0);
    box.addEventListener('mouseenter', () => { paused = true; });
    box.addEventListener('mouseleave', () => { paused = false; });

    if (featured.length > 1) {
      setInterval(() => {
        if (!paused && !document.hidden) {
          const card = box.querySelector('.e-post-feature');
          if (card) card.style.opacity = '0.2';
          setTimeout(() => mount(cur + 1), 220);
        }
      }, ROTATE_MS);
    }
  }

  // B. THE LAB (/the-lab/) — 2. MIDDLE ARCHIVE: News & Updates, Releases, and Manuals
  function initStreamArchive(posts) {
    const archive = document.querySelector('.post-archive');
    if (!archive) return;

    const results = archive.querySelector('[data-rnd-lab-grid], .posts_results');
    if (!results) return;

    const streamPosts = posts.filter(p => STREAM_TAGS.some(slug => hasTag(p, slug)));
    const group = archive.querySelector('.filter_group, .archive_filter, form');

    const render = slug => {
      const list = slug ? streamPosts.filter(p => hasTag(p, slug)) : streamPosts;
      results.innerHTML = list.length
        ? list.map(renderThumbCard).join('')
        : `<p style="font-family:'RobotoMono',monospace;opacity:.7;padding:24px 0;grid-column:1/-1;">No dispatches published in this category yet.</p>`;
    };

    if (group) {
      const bar = document.createElement('div');
      bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px;';
      bar.innerHTML = CATEGORIES.map((c, i) =>
        `<button type="button" data-rnd-cat="${c.slug}" style="padding:10px 18px;border-radius:999px;border:1px solid rgba(34,47,48,.2);font-family:'RobotoMono',monospace;font-size:13px;cursor:pointer;background:${i === 0 ? '#222F30' : 'transparent'};color:${i === 0 ? '#fff' : '#222F30'};">${c.label}</button>`
      ).join('');
      group.replaceWith(bar);

      bar.querySelectorAll('[data-rnd-cat]').forEach(btn =>
        btn.addEventListener('click', () => {
          bar.querySelectorAll('[data-rnd-cat]').forEach(b => {
            b.style.background = 'transparent';
            b.style.color = '#222F30';
          });
          btn.style.background = '#222F30';
          btn.style.color = '#fff';
          render(btn.dataset.rndCat);
        })
      );
    }

    render('');
  }

  // B. THE LAB (/the-lab/) — 3. BOTTOM PUBLICATIONS: Strictly Research posts
  function initPublications(posts) {
    const sec = document.querySelector('[data-cid="posts-list"]');
    if (!sec) return;

    const researchPosts = posts.filter(p => hasTag(p, 'research'));

    const h = sec.querySelector('.heading_title');
    if (h) h.textContent = 'Publications';

    const c = sec.querySelector('.heading_counter');
    if (c) c.textContent = String(researchPosts.length);

    const list = sec.querySelector('.block_list .block_list') || sec.querySelector('aside.block_list');
    if (!list) return;

    list.innerHTML = researchPosts.length
      ? researchPosts.map(p => `<a class="list_item inview-element is-inview" href="${postUrl(p)}">
          <h6 class="item_title"><span class="title_el">${esc(p.title)}</span></h6>
          <div class="item_meta">${esc(tagName(p))} · ${fmtDate(p.published_at)}</div>
          <div class="item_btn u-btn--2"><i class="btn_icon">${ARROW_SVG}</i></div>
          <div class="item_hover"></div>
        </a>`).join('')
      : `<p style="font-family:'RobotoMono',monospace;opacity:.7;padding:24px 0;">No research publications listed yet.</p>`;
  }

  async function boot() {
    try {
      const r = await fetch(`${GHOST_URL}/ghost/api/content/posts/?key=${CONTENT_KEY}&include=tags&limit=all&order=published_at%20desc`);
      const { posts = [] } = await r.json();
      const isLabPage = Boolean(document.querySelector('.post-archive') || document.querySelector('[data-cid="posts-list"]'));

      if (isLabPage) {
        initHighlights(posts);
        initStreamArchive(posts);
        initPublications(posts);
      } else {
        initLandingLab(posts);
      }
    } catch (e) {
      console.error('[Lossi R&D Sync]', e);
    }
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
