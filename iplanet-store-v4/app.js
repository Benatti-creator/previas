/* iPlanet Store — scripts do site. Os dados vêm de dados.js */
(function () {
  document.documentElement.classList.add('js');
  var L = window.LOJA;

  /* ---------- ícones (Lucide, licença ISC) ---------- */
  var P = {
    wa: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    battery: '<rect width="16" height="10" x="2" y="7" rx="2"/><path d="M22 11v2"/><path d="M6 11v2"/><path d="M10 11v2"/>',
    plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    layers: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    cable: '<path d="M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1"/><path d="M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9"/><path d="M21 21v-2h-4"/><path d="M3 5h4V3"/><path d="M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r="1"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    insta: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    ext: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    store: '<path d="M2 7h20l-2-5H4z"/><path d="M4 7v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7"/><path d="M15 22v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>'
  };
  function ic(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>'; }
  window.ic = ic;

  function wa(msg) { return 'https://wa.me/' + L.whatsapp + (msg ? '?text=' + encodeURIComponent(msg) : ''); }
  window.waLink = wa;
  function def(v) { return v ? v : '<span class="def">a definir</span>'; }
  window.def = def;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function foto(n, alt, sizes, opts) {
    opts = opts || {};
    var d = (window.FOTOS[n] || [1600, 1200]);
    var b = 'img/oficiais/' + n;
    return '<img src="' + b + '-800.webp" srcset="' + b + '-800.webp 800w, ' + b + '-1600.webp ' + d[0] + 'w" sizes="' + (sizes || '50vw') + '" width="' + d[0] + '" height="' + d[1] + '" alt="' + esc(alt) + '"' + (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (opts.cls ? ' class="' + opts.cls + '"' : '') + '>';
  }
  window.foto = foto;

  /* ---------- cabeçalho e rodapé ---------- */
  var pag = document.body.getAttribute('data-pag') || '';
  var links = [['iphone.html', 'iPhone', 'iphone'], ['acessorios.html', 'Acessórios', 'acessorios'], ['assistencia.html', 'Assistência', 'assistencia'], ['loja.html', 'A loja', 'loja']];
  var logo = '<a class="logo" href="index.html" aria-label="iPlanet Store, página inicial"><span class="logo__s"><img src="img/loja/logo-simbolo.webp" width="240" height="156" alt=""></span><span class="logo__t"><b>iPlanet Store</b><span>Sapezal-MT</span></span></a>';
  var hd = document.getElementById('hd');
  if (hd) {
    hd.className = 'hd';
    hd.innerHTML = '<div class="wrap hd__in">' + logo +
      '<nav class="nav" aria-label="Principal">' + links.map(function (l) { return '<a href="' + l[0] + '"' + (pag === l[2] ? ' aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') + '</nav>' +
      '<a class="btn btn--p" href="' + wa('Olá! Quero um orçamento.') + '" target="_blank" rel="noopener">' + ic('wa') + 'Orçamento no WhatsApp</a>' +
      '<button class="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="drawer">' + ic('menu') + '</button></div>' +
      '<div class="drawer" id="drawer">' + [['index.html', 'Início']].concat(links).map(function (l) { return '<a href="' + l[0] + '">' + l[1] + '</a>'; }).join('') + '<a href="orcamento.html">Montar orçamento</a>' +
      '<a class="btn btn--p" href="' + wa('Olá! Quero um orçamento.') + '" target="_blank" rel="noopener">' + ic('wa') + 'Orçamento no WhatsApp</a></div>';
    var bg = hd.querySelector('.burger'), dr = hd.querySelector('.drawer');
    bg.addEventListener('click', function () {
      var on = dr.classList.toggle('on');
      bg.setAttribute('aria-expanded', on); bg.setAttribute('aria-label', on ? 'Fechar menu' : 'Abrir menu');
      bg.innerHTML = ic(on ? 'x' : 'menu'); document.body.style.overflow = on ? 'hidden' : '';
    });
    addEventListener('scroll', function () { hd.classList.toggle('sc', scrollY > 8); }, { passive: true });
  }

  var ft = document.getElementById('ft');
  if (ft) {
    ft.className = 'ft';
    ft.innerHTML = '<div class="wrap"><div class="ft__g">' +
      '<div>' + logo + '<p class="ft__p">Especialista em iPhone em Sapezal desde ' + L.desde + '. Compra, venda e assistência. Parcelamos em até ' + L.parcelasMax + 'x.</p></div>' +
      '<div><h4>Contato</h4><ul><li><a href="' + wa() + '" target="_blank" rel="noopener">WhatsApp ' + L.whatsappVisivel + '</a></li><li><a href="' + L.instagram + '" target="_blank" rel="noopener">Instagram ' + L.instagramUsuario + '</a></li><li>Endereço: ' + def(L.endereco) + '</li></ul></div>' +
      '<div><h4>Horário</h4><ul>' + L.horario.map(function (h) { return '<li>' + h.dias + ': ' + h.horas + '</li>'; }).join('') + '</ul></div>' +
      '<div><h4>Páginas</h4><ul>' + links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '<li><a href="orcamento.html">Orçamento</a></li><li><a href="creditos.html">Créditos</a></li></ul></div>' +
      '</div><div class="ft__b"><span>Imagens ilustrativas. Imagens de produto: Apple Newsroom (material de divulgação). Marcas pertencentes à Apple Inc.</span><span>© ' + new Date().getFullYear() + ' iPlanet Store · Sapezal-MT</span></div></div>';
  }

  if (!document.querySelector('.wa') && pag !== 'orcamento') {
    var f = document.createElement('a'); f.className = 'wa'; f.href = wa('Olá! Vim pelo site.'); f.target = '_blank'; f.rel = 'noopener';
    f.setAttribute('aria-label', 'Conversar no WhatsApp'); f.innerHTML = ic('wa'); document.body.appendChild(f);
  }

  /* ---------- campos ligados aos dados ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa')); a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-ic]').forEach(function (e) { e.insertAdjacentHTML('afterbegin', ic(e.getAttribute('data-ic'))); });
  document.querySelectorAll('[data-k]').forEach(function (e) { e.innerHTML = def(L[e.getAttribute('data-k')]); });
  document.querySelectorAll('[data-insta]').forEach(function (a) { a.href = L.instagram; });
  document.querySelectorAll('[data-hr]').forEach(function (u) { u.innerHTML = L.horario.map(function (h) { return '<li><span>' + h.dias + '</span><b>' + h.horas + '</b></li>'; }).join(''); });
  document.querySelectorAll('[data-aberto]').forEach(function (e) {
    var d = new Date(), x = L.expediente[d.getDay()], h = d.getHours() + d.getMinutes() / 60;
    var ab = x && h >= x[0] && h < x[1];
    e.textContent = ab ? 'Aberto agora' : 'Fechado agora'; if (!ab) e.classList.add('f');
  });
  document.querySelectorAll('[data-maps]').forEach(function (a) { a.href = L.linkMaps; a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- listas ---------- */
  var mods = document.getElementById('mods');
  if (mods) mods.innerHTML = IPHONES.map(function (m) {
    return '<a class="mod rv' + (m.tileEscuro ? ' mod--k' : '') + '" href="iphone.html#' + m.id + '"><h3>' + m.nome + '</h3><div class="mod__img">' + foto(m.fotoTile, m.nome, '(max-width:640px) 78vw, 22vw') + '</div><div class="mod__f"><span class="cons">' + (m.preco || 'sob consulta') + '</span><span class="mod__ar">' + ic('arrow') + '</span></div></a>';
  }).join('');

  var svc = document.getElementById('svc');
  if (svc) svc.innerHTML = SERVICOS.map(function (s) {
    return '<li class="rv"><i>' + ic(s.icone) + '</i><div><b>' + s.nome + '</b><span>' + s.texto + '</span></div><em>Prazo ' + def(s.prazo) + '</em></li>';
  }).join('');

  var svcl = document.getElementById('svc-l');
  if (svcl) svcl.innerHTML = SERVICOS.map(function (s) {
    return '<li class="rv"><i>' + ic(s.icone) + '</i><div><b>' + s.nome + '</b><span>' + s.texto + '</span></div></li>';
  }).join('');
  document.querySelectorAll('[data-icones="faixa"]').forEach(function (box) {
    box.innerHTML = ITENS_ICONE.map(function (i) { return '<div class="faixa__i rv">' + ic(i.icone) + '<div><b>' + i.nome + '</b><span>' + i.texto + '</span><a class="lnk" target="_blank" rel="noopener" href="' + wa('Olá! Quero orçamento de: ' + i.nome + '.') + '">Consultar</a></div></div>'; }).join('');
  });
  var svcg = document.getElementById('svc-g');
  if (svcg) svcg.innerHTML = SERVICOS.map(function (s) {
    return '<article class="svc-c rv"><i>' + ic(s.icone) + '</i><h3>' + s.nome + '</h3><p>' + s.texto + '</p><dl><dt>Prazo</dt><dd>' + def(s.prazo) + '</dd><dt>Garantia</dt><dd>' + def(L.garantia) + '</dd><dt>Valor</dt><dd class="cons">sob consulta</dd></dl></article>';
  }).join('');

  var faq = document.getElementById('faq');
  if (faq) faq.innerHTML = FAQ.map(function (q, i) { return '<details' + (i === 0 ? ' open' : '') + '><summary>' + q.p + ic('plus') + '</summary><p>' + q.r + '</p></details>'; }).join('');

  document.querySelectorAll('[data-icones="cards"]').forEach(function (box) {
    box.innerHTML = ITENS_ICONE.map(function (i) { return '<article class="svc-c rv"><i>' + ic(i.icone) + '</i><h3>' + i.nome + '</h3><p>' + i.texto + '</p><a class="mini-btn" target="_blank" rel="noopener" href="' + wa('Olá! Quero orçamento de ' + i.nome.toLowerCase() + ' para o meu iPhone.') + '">' + ic('wa') + 'Consultar</a></article>'; }).join('');
  });
  document.querySelectorAll('[data-icones=""]').forEach(function (box) {
    box.innerHTML = ITENS_ICONE.map(function (i) { return '<div class="ico rv"><i>' + ic(i.icone) + '</i><div><b>' + i.nome + '</b><span>' + i.texto + '</span></div></div>'; }).join('');
  });

  /* ---------- animação de entrada ---------- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (e) { io.observe(e); });
  } else rv.forEach(function (e) { e.classList.add('on'); });
  addEventListener('beforeprint', function () { rv.forEach(function (e) { e.classList.add('on'); }); });
})();
