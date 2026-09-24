(function () {
  'use strict';

  const S = window.ASTERA_SITE || {};
  const PRODUCTS = window.ASTERA_PRODUCTS || [];
  const CATS = window.ASTERA_CATEGORIES || [];
  const M = window.AsteraMockups;
  const page = document.body.dataset.page || '';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const STAR = '<span class="star" aria-hidden="true"></span>';
  const CHECK = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const catLabel = (slug) => (CATS.find((c) => c.slug === slug) || {}).label || '';
  const isPending = (url) => !url || !/^https?:\/\//i.test(String(url));
  const isNum = (v) => typeof v === 'number' && isFinite(v);
  const priceHTML = (p, cls) => isNum(p.price)
    ? '<span class="price ' + (cls || '') + '">' + money(p.price) + '</span>'
    : '<span class="price price--soon ' + (cls || '') + '">Valor em breve</span>';
  const nameHTML = (p) => esc(p.name) + (p.star ? '<span class="star title-star" aria-hidden="true"></span>' : '');
  const productUrl = (p) => (S.prettyProductUrls ? 'produtos/' + p.slug : 'produto.html?p=' + encodeURIComponent(p.slug));
  const siteUrlReady = () => S.url && S.url.indexOf('SEU-DOMINIO') === -1;

  const isPlaceholderSrc = (src) => !src || /^IMAGEM_/.test(String(src));
  const realImages = (p) => (p.images || []).filter((i) => !isPlaceholderSrc(i.src));
  const showSlots = new URLSearchParams(location.search).has('slots') || !!S.showImageSlots;

  function imgTag(img, p) {
    return '<img src="' + esc(img.src) + '" alt="' + esc(img.alt || 'Imagem da planilha ' + p.name) + '" loading="lazy" decoding="async">';
  }
  function slotHTML(p) {
    const names = (p.images || []).map((i) => esc(i.src)).join(' · ') || 'IMAGEM_';
    return '<div class="slot" role="img" aria-label="Espaço reservado para a imagem real de ' + esc(p.name) + '"><span class="star" aria-hidden="true"></span><strong>Imagem real da planilha</strong><code>' + names + '</code></div>';
  }
  function cover(p) {
    const real = realImages(p);
    if (real.length) return { html: '<div class="shot-frame">' + imgTag(real[0], p) + '</div>', photo: true };
    if (showSlots) return { html: '<div class="shot-frame">' + slotHTML(p) + '</div>', photo: true };
    return { html: M.render(p.kind, 'Mockup conceitual do produto ' + p.name), photo: false };
  }

  function buyLink(p, cls) {
    const pending = isPending(p.checkoutUrl);
    const wa = p.cta === 'whatsapp';
    const label = esc(p.ctaLabel || 'Comprar agora') + (wa && !pending ? '<span class="sr-only"> (abre em nova aba)</span>' : '');
    return '<a class="btn ' + cls + '" href="' + (pending ? '#comprar' : esc(p.checkoutUrl)) + '" data-buy data-product="' + esc(p.slug) + '"' +
      (pending ? ' data-pending="true"' : (wa ? ' target="_blank" rel="noopener noreferrer"' : ' rel="noopener"')) + '>' + label + '</a>';
  }

  function productCard(p, level) {
    const h = 'h' + (level || 3);
    const c = cover(p);
    return '<article class="card">' +
      '<div class="card__media' + (c.photo ? ' card__media--photo' : '') + '">' + c.html + '</div>' +
      '<div class="card__body">' +
        '<p class="card__cat">' + esc(catLabel(p.category)) + '</p>' +
        '<' + h + ' class="card__title">' + nameHTML(p) + '</' + h + '>' +
        '<p class="card__desc">' + esc(p.short) + '</p>' +
        '<div class="card__foot">' + priceHTML(p) +
        '<a class="btn btn--primary btn--sm card__link" href="' + productUrl(p) + '" aria-label="Ver produto: ' + esc(p.name) + '">Ver produto ' + STAR + '</a></div>' +
      '</div></article>';
  }

  function soonCards() {
    return (window.ASTERA_COMING_SOON || []).map((s) =>
      '<article class="card card--soon">' + STAR + '<h3 class="card__title">' + esc(s.name) + '</h3><p class="card__desc muted">' + esc(s.text) + '</p><p class="card__cat">Em breve</p></article>'
    ).join('');
  }

  function stepsHTML(steps) {
    return '<ol class="steps">' + steps.map((s, i) =>
      '<li class="step"><span class="step__num" aria-hidden="true">0' + (i + 1) + '</span><div><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></div></li>'
    ).join('') + '</ol>';
  }

  function renderHeader() {
    const el = $('[data-site-header]');
    if (!el) return;
    el.classList.add('site-header');
    const links = (S.nav || []).map((n) => '<a href="' + n.href + '"' + (n.page === page ? ' aria-current="page"' : '') + '>' + esc(n.label) + '</a>').join('');
    el.innerHTML =
      '<div class="wrap site-header__inner">' +
        '<a class="logo" href="index.html" aria-label="Ástera, página inicial"><span>ÁSTERA</span>' + STAR + '</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Abrir menu"><span></span><span></span></button>' +
        '<nav class="nav" id="site-nav" aria-label="Principal">' + links +
          '<p class="nav__extra">Prefere conversar? Chame no <a href="' + esc(S.instagram.url) + '" target="_blank" rel="noopener">Instagram</a>.</p>' +
        '</nav>' +
      '</div>';

    const toggle = $('.nav-toggle', el);
    const setOpen = (open) => {
      el.classList.toggle('is-nav-open', open);
      document.body.classList.toggle('is-locked', open);
      $$('main, [data-site-footer]').forEach((n) => (open ? n.setAttribute('inert', '') : n.removeAttribute('inert')));
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle.addEventListener('click', () => setOpen(!el.classList.contains('is-nav-open')));
    $$('.nav a', el).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && el.classList.contains('is-nav-open')) { setOpen(false); toggle.focus(); } });
    window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });

    const onScroll = () => el.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function renderFooter() {
    const el = $('[data-site-footer]');
    if (!el) return;
    el.classList.add('site-footer');
    const shop = PRODUCTS.slice(0, 5).map((p) => '<li><a href="' + productUrl(p) + '">' + esc(p.name) + '</a></li>').join('');
    const nav = (S.nav || []).filter((n) => n.page !== 'produtos').map((n) => '<li><a href="' + n.href + '">' + esc(n.label) + '</a></li>').join('');
    el.innerHTML =
      '<div class="wrap">' +
        '<div class="footer__grid">' +
          '<div class="footer__brand"><a class="logo" href="index.html" aria-label="Ástera, página inicial"><span>ÁSTERA</span>' + STAR + '</a><p>' + esc(S.tagline) + '</p></div>' +
          '<div class="footer__col"><h2>Loja</h2><ul>' + shop + '<li><a href="produtos.html">Todos os produtos</a></li></ul></div>' +
          '<div class="footer__col"><h2>Ástera</h2><ul>' + nav + '</ul></div>' +
          '<div class="footer__col"><h2>Fale com a gente</h2><ul>' +
            '<li><a href="' + esc(S.instagram.url) + '" target="_blank" rel="noopener">' + esc(S.instagram.handle) + '</a></li>' +
            '<li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a></li></ul></div>' +
        '</div>' +
        '<div class="footer__bottom"><p>© ' + new Date().getFullYear() + ' ÁSTERA ' + STAR + ' Todos os direitos reservados.</p>' +
        '<p>Site criado pela própria Ástera. <a href="sites-personalizados.html">Conheça a nova frente</a>.</p></div>' +
      '</div>';
  }

  function renderHome() {
    const hero = $('[data-hero-mockups]');
    if (hero) {
      hero.innerHTML = '<div class="hero__bgstar"></div>' +
        '<div class="hero__mock hero__mock--a">' + M.render('sales', 'Mockup conceitual do Controle de Vendas') + '</div>' +
        '<div class="hero__mock hero__mock--b">' + M.render('planner', 'Mockup conceitual do Planner') + '</div>' +
        '<div class="hero__mock hero__mock--c">' + M.render('finance', 'Mockup conceitual da Planilha Financeira') + '</div>';
    }
    const featured = $('[data-featured-products]');
    if (featured) {
      let list = PRODUCTS.filter((p) => p.featured);
      if (!list.length) list = PRODUCTS.slice(0, 4);
      featured.innerHTML = list.slice(0, 4).map((p) => productCard(p, 3)).join('');
    }
  }

  function renderSteps() {
    $$('[data-steps]').forEach((el) => { el.innerHTML = stepsHTML(S.steps || []); });
  }

  function renderShop() {
    const root = $('[data-shop]');
    if (!root) return;
    const used = CATS.filter((c) => PRODUCTS.some((p) => p.category === c.slug));
    let active = new URLSearchParams(location.search).get('cat') || 'todos';
    if (!used.some((c) => c.slug === active)) active = 'todos';

    const chips = used.length > 1
      ? '<div class="filters" role="group" aria-label="Filtrar por categoria">' +
        [{ slug: 'todos', label: 'Todos' }].concat(used).map((c) => '<button class="chip" type="button" data-cat="' + c.slug + '" aria-pressed="false">' + esc(c.label) + '</button>').join('') + '</div>'
      : '';
    root.innerHTML = chips + '<div class="grid-products" data-grid></div><p class="sr-only" role="status" data-count></p>';
    const grid = $('[data-grid]', root), count = $('[data-count]', root);

    function draw() {
      const list = active === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
      grid.innerHTML = list.map((p) => productCard(p, 2)).join('') + (active === 'todos' ? soonCards() : '');
      count.textContent = list.length + (list.length === 1 ? ' produto encontrado' : ' produtos encontrados');
      $$('.chip', root).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === active)));
    }
    root.addEventListener('click', (e) => {
      const b = e.target.closest('.chip');
      if (!b) return;
      active = b.dataset.cat;
      history.replaceState(null, '', active === 'todos' ? location.pathname : '?cat=' + active);
      draw();
    });
    draw();
  }

  function setMeta(attr, name, content) {
    let el = document.head.querySelector('meta[' + attr + '="' + name + '"]');
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.setAttribute('content', content);
  }
  function setCanonical(href) {
    let l = document.head.querySelector('link[rel="canonical"]');
    if (!l) { l = document.createElement('link'); l.rel = 'canonical'; document.head.appendChild(l); }
    l.href = href;
  }

  function renderProduct() {
    const root = $('[data-product-page]');
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const m = location.pathname.match(/\/produtos\/([^\/?#]+)/);
    const slug = decodeURIComponent(params.get('p') || (m && m[1]) || '');
    const p = PRODUCTS.find((x) => x.slug === slug);

    if (!p) {
      document.title = 'Produto não encontrado | Ástera ✦';
      root.innerHTML = '<div class="wrap empty">' + STAR + '<h1>Não encontramos esse produto</h1><p class="lede">O link pode estar antigo ou incompleto. Veja tudo o que a Ástera tem por aqui.</p><a class="btn btn--primary" href="produtos.html">Ver produtos</a></div>';
      return;
    }

    const seo = p.seo || {};
    const title = seo.title || p.name + ' | Ástera ✦';
    const desc = seo.description || p.short;
    document.title = title;
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    if (siteUrlReady()) {
      const canon = S.url + (S.prettyProductUrls ? '/produtos/' + p.slug : '/produto.html?p=' + p.slug);
      setCanonical(canon); setMeta('property', 'og:url', canon);
    }
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Product', name: p.name, description: p.short,
      category: catLabel(p.category), brand: { '@type': 'Brand', name: 'Ástera' },
      offers: isNum(p.price) ? { '@type': 'Offer', priceCurrency: 'BRL', price: p.price.toFixed(2), availability: 'https://schema.org/InStock', url: siteUrlReady() ? S.url + '/produto.html?p=' + p.slug : undefined } : undefined
    });
    document.head.appendChild(ld);

    const facts = [p.format, 'Fácil de usar', 'Design organizado', 'Acesso digital'].filter(Boolean);
    const faq = (p.faq || []).concat(p.useDefaultFaq === false ? [] : (window.ASTERA_DEFAULT_FAQ || []));
    const real = realImages(p);
    const c = cover(p);
    const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);

    root.innerHTML =
      '<div class="wrap">' +
        '<nav class="crumbs" aria-label="Você está em"><a href="produtos.html">Produtos</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(p.name) + '</span></nav>' +
        '<section class="pdp" aria-labelledby="pdp-title">' +
          '<div class="pdp__gallery"><div class="pdp__media' + (c.photo ? ' pdp__media--photo' : '') + '" data-main-media>' + c.html + '</div>' +
            (real.length > 1 ? '<div class="thumbs" role="group" aria-label="Imagens de ' + esc(p.name) + '">' + real.map((im, i) =>
              '<button class="thumb" type="button" data-thumb="' + i + '" aria-label="Ver imagem ' + (i + 1) + ' de ' + real.length + '"' + (i === 0 ? ' aria-current="true"' : '') + '><img src="' + esc(im.src) + '" alt="" loading="lazy" decoding="async"></button>').join('') + '</div>' : '') +
          '</div>' +
          '<div class="pdp__info">' +
            '<p class="pdp__cat">' + esc(catLabel(p.category)) + '</p>' +
            '<h1 id="pdp-title">' + nameHTML(p) + '</h1>' +
            '<p class="lede">' + esc(p.description) + '</p>' +
            '<div class="pdp__buy">' + priceHTML(p, 'price--xl') + buyLink(p, 'btn--primary btn--lg').replace('data-buy', 'data-buy data-main-buy') + '</div>' +
            '<p class="pdp__note">' + esc(p.note || 'Produto digital: sem frete e sem espera. O acesso chega por e-mail.') + '</p>' +
            '<ul class="checks">' + facts.map((f) => '<li>' + CHECK + esc(f) + '</li>').join('') + '</ul>' +
          '</div>' +
        '</section>' +

        '<section class="detail" aria-labelledby="d-find"><h2 id="d-find">Você vai encontrar</h2><div class="detail__body"><ul class="star-list">' +
          (p.features || []).map((f) => '<li>' + STAR + '<span>' + esc(f) + '</span></li>').join('') + '</ul></div></section>' +

        '<section class="detail" aria-labelledby="d-who"><h2 id="d-who">Para quem é?</h2><div class="detail__body"><p class="lede">' + esc(p.forWho) + '</p></div></section>' +

        '<section class="detail" aria-labelledby="d-how"><h2 id="d-how">Como funciona?</h2><div class="detail__body">' + stepsHTML(p.steps || S.steps || []) + '</div></section>' +

        '<section class="detail" aria-labelledby="d-faq"><h2 id="d-faq">Perguntas frequentes</h2><div class="detail__body faq">' +
          faq.map((f) => '<details><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>').join('') + '</div></section>' +

        '<section class="detail" aria-labelledby="d-go"><h2 id="d-go">Vamos começar?</h2><div class="detail__body"><div class="pdp__buy">' + priceHTML(p, 'price--xl') + buyLink(p, 'btn--primary btn--lg') + '</div></div></section>' +

        (related.length ? '<section class="related" aria-labelledby="d-rel"><h2 id="d-rel">Veja também</h2><div class="grid-products">' + related.map((x) => productCard(x, 3)).join('') + '</div></section>' : '') +
      '</div>';

    $$('[data-thumb]', root).forEach((b) => b.addEventListener('click', () => {
      const im = real[Number(b.dataset.thumb)];
      $('[data-main-media] .shot-frame', root).innerHTML = imgTag(im, p);
      $$('[data-thumb]', root).forEach((x) => x.removeAttribute('aria-current'));
      b.setAttribute('aria-current', 'true');
    }));

    const bar = document.createElement('div');
    bar.className = 'buybar';
    bar.innerHTML = '<div><span class="buybar__name">' + esc(p.name) + '</span>' + priceHTML(p) + '</div>' + buyLink(p, 'btn--primary');
    document.body.appendChild(bar);
    const main = $('[data-main-buy]', root);
    if (main && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => bar.classList.toggle('is-visible', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(main);
    }
  }

  function renderProjects() {
    const root = $('[data-projects]');
    if (!root) return;
    const list = (window.ASTERA_PROJECTS || []).map((pr) =>
      '<article class="project"><div class="card__media">' +
        (pr.image ? '<img src="' + esc(pr.image) + '" alt="Projeto ' + esc(pr.name) + '" loading="lazy">' : M.render(pr.kind || 'site', 'Mockup conceitual do projeto ' + pr.name)) +
      '</div><div class="project__body">' +
        (pr.badge ? '<span class="project__badge">' + esc(pr.badge) + '</span>' : '') +
        '<h3>' + esc(pr.name) + '</h3><p class="project__seg">' + esc(pr.segment) + '</p><p>' + esc(pr.description) + '</p>' +
        '<ul class="star-list">' + (pr.features || []).map((f) => '<li>' + STAR + '<span>' + esc(f) + '</span></li>').join('') + '</ul>' +
        (pr.url ? '<a class="btn btn--ghost btn--sm project__link" href="' + esc(pr.url) + '">' + esc(pr.urlLabel || 'Ver projeto') + '</a>' : '') +
      '</div></article>').join('');
    let soon = '';
    for (let i = 0; i < (window.ASTERA_PROJECTS_SOON || 0); i++) {
      soon += '<article class="project project--soon">' + STAR + '<h3>Projeto em breve</h3><p class="muted">O próximo pode ser o seu.</p></article>';
    }
    root.innerHTML = list + soon;
  }

  const ICON_IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" stroke="none"/></svg>';
  const ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.5l8 6 8-6"/></svg>';

  function renderContact() {
    const links = $('[data-contact-links]');
    if (links) {
      links.innerHTML =
        '<a class="contact-card" href="' + esc(S.instagram.url) + '" target="_blank" rel="noopener"><span class="contact-card__icon">' + ICON_IG + '</span><div><strong>Instagram</strong><span>' + esc(S.instagram.handle) + '</span></div></a>' +
        '<a class="contact-card" href="mailto:' + esc(S.email) + '"><span class="contact-card__icon">' + ICON_MAIL + '</span><div><strong>E-mail</strong><span>' + esc(S.email) + '</span></div></a>';
    }
    const box = $('[data-quote-form]');
    if (!box) return;
    const q = S.quoteForm || {};
    if (!q.enabled) { box.innerHTML = '<p class="lede">O formulário de orçamento abre em breve. Por enquanto, chame no Instagram ou por e-mail.</p>'; return; }
    const opts = (arr, first) => '<option value="">' + first + '</option>' + arr.map((o) => '<option>' + esc(o) + '</option>').join('');
    box.innerHTML =
      '<form class="form" novalidate>' +
        '<div class="field"><label for="q-nome">Nome</label><input id="q-nome" name="Nome" type="text" autocomplete="name" required></div>' +
        '<div class="field"><label for="q-email">E-mail</label><input id="q-email" name="E-mail" type="email" autocomplete="email" required></div>' +
        '<div class="field"><label for="q-marca">Nome da marca ou negócio</label><input id="q-marca" name="Marca_ou_negocio" type="text" autocomplete="organization"></div>' +
        '<div class="field"><label for="q-insta">Instagram</label><input id="q-insta" name="Instagram" type="text" placeholder="@seuperfil" autocapitalize="none" autocorrect="off"></div>' +
        '<div class="field field--full"><label for="q-tipo">Tipo de site</label><select id="q-tipo" name="Tipo_de_site" required>' + opts(q.types || [], 'Escolha uma opção') + '</select></div>' +
        '<div class="field field--full"><label for="q-precisa">O que você precisa?</label><textarea id="q-precisa" name="O_que_precisa" required placeholder="Ex.: uma página para apresentar meus serviços e receber contatos"></textarea></div>' +
        '<div class="field"><label for="q-invest">Faixa de investimento</label><select id="q-invest" name="Faixa_de_investimento">' + opts(q.budgets || [], 'Escolha uma opção') + '</select></div>' +
        '<div class="field"><label for="q-prazo">Prazo desejado</label><select id="q-prazo" name="Prazo_desejado">' + opts(q.deadlines || [], 'Escolha uma opção') + '</select></div>' +
        '<div class="field"><label for="q-tel">Telefone/WhatsApp</label><input id="q-tel" name="Telefone_WhatsApp" type="tel" inputmode="tel" autocomplete="tel" placeholder="(14) 99999-9999"></div>' +
        '<fieldset class="field radio-field"><legend>Gostaria que eu entrasse em contato pelo WhatsApp?</legend>' +
          '<div class="radio-group">' +
            '<label class="radio"><input type="radio" name="Deseja_contato_por_WhatsApp" value="Sim" required> <span>Sim</span></label>' +
            '<label class="radio"><input type="radio" name="Deseja_contato_por_WhatsApp" value="Não" required> <span>Não</span></label>' +
          '</div></fieldset>' +
        '<div class="field field--full"><label for="q-msg">Mensagem</label><textarea id="q-msg" name="Mensagem" placeholder="Conte um pouco sobre a sua marca e a sua ideia."></textarea></div>' +
        '<div class="form__actions">' +
          '<button class="btn btn--primary btn--lg" type="submit">Enviar pedido de orçamento</button>' +
          '<p class="form__status" role="status"></p>' +
        '</div>' +
        '<p class="form__privacy">Seus dados serão usados apenas para responder ao seu pedido de orçamento.</p>' +
        '<div class="form__result" role="status" aria-live="polite" data-result></div>' +
      '</form>';

    const form = $('form', box), status = $('.form__status', box), result = $('[data-result]', box);
    const telF = $('#q-tel', form);
    telF.addEventListener('input', () => telF.setCustomValidity(''));

    function showResult(kind, title, text) {
      result.className = 'form__result is-visible';
      result.innerHTML = '<p class="form__result-title">' + esc(title) + (kind === 'ok' ? '<span class="star" aria-hidden="true"></span>' : '') + '</p><p>' + esc(text) + '</p>';
    }
    function hideResult() { result.className = 'form__result'; result.innerHTML = ''; }

    function validate() {
      telF.setCustomValidity('');
      const chosen = form.querySelector('input[name="Deseja_contato_por_WhatsApp"]:checked');
      const telVal = telF.value.trim();
      if (chosen && chosen.value === 'Sim' && !telVal) {
        telF.setCustomValidity('Informe seu número de WhatsApp para que eu possa entrar em contato.');
      } else if (telVal) {
        const digits = telVal.replace(/\D/g, '');
        if (!/^(55)?\d{10,11}$/.test(digits)) telF.setCustomValidity('Informe um telefone válido, com DDD (ex.: (14) 99999-9999).');
      }
      return form.reportValidity();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hideResult();
      if (!validate()) return;

      const btn = form.querySelector('button[type="submit"]');
      const originalLabel = btn.textContent;
      btn.disabled = true; btn.textContent = 'Enviando…'; form.classList.add('is-sending');
      status.textContent = 'Enviando…';

      setTimeout(() => {
        const d = Object.fromEntries(new FormData(form));
        const linhas = [
          'Olá! Vim pelo site da Astera.',
          '',
          'Nome: ' + (d.Nome || '-'),
          'E-mail: ' + (d['E-mail'] || '-'),
          'Marca/negócio: ' + (d.Marca_ou_negocio || '-'),
          'Instagram: ' + (d.Instagram || '-'),
          'Tipo de site: ' + (d.Tipo_de_site || '-'),
          'O que preciso: ' + (d.O_que_precisa || '-'),
          'Investimento: ' + (d.Faixa_de_investimento || '-'),
          'Prazo: ' + (d.Prazo_desejado || '-'),
          'Telefone: ' + (d.Telefone_WhatsApp || '-'),
          'WhatsApp: ' + (d.Deseja_contato_por_WhatsApp || '-'),
          '',
          'Mensagem:',
          d.Mensagem || '-'
        ];
        const url = 'https://wa.me/' + (S.whatsapp || '') + '?text=' + encodeURIComponent(linhas.join('\n'));
        const win = window.open(url, '_blank');
        if (win) win.opener = null;

        status.textContent = '';
        if (win) {
          showResult('ok', 'WhatsApp aberto', 'Abri uma conversa no WhatsApp com os dados do seu pedido — é só enviar a mensagem por lá para finalizar o contato.');
          form.reset();
        } else {
          showResult('error', 'Não foi possível abrir o WhatsApp automaticamente.', 'Seu navegador bloqueou a nova janela. Tente novamente ou toque no link abaixo.');
          result.insertAdjacentHTML('beforeend', '<p><a class="btn btn--ghost btn--sm" href="' + esc(url) + '" target="_blank" rel="noopener noreferrer">Abrir WhatsApp manualmente</a></p>');
        }
        btn.disabled = false; btn.textContent = originalLabel; form.classList.remove('is-sending');
      }, 350);
    });
  }

  function wireCustomSitesCta() {
    $$('[data-custom-sites-cta]').forEach((a) => {
      a.textContent = (S.customSites || {}).ctaLabel || 'Quero criar meu site';
      a.setAttribute('href', (S.customSites || {}).ctaUrl || 'contato.html#orcamento');
    });
  }

  let toastTimer;
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('is-visible'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 3800);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-pending]');
    if (!a) return;
    e.preventDefault();
    toast('O link de compra deste produto ainda não foi configurado.');
    console.warn('[Ástera] Falta o checkoutUrl do produto "' + a.dataset.product + '" em js/products.js.');
  });

  renderHeader();
  renderFooter();
  renderHome();
  renderShop();
  renderProduct();
  renderSteps();
  renderProjects();
  renderContact();
  wireCustomSitesCta();
})();
