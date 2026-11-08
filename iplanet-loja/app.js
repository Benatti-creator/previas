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
  var links = [['index.html', 'Início', 'home'], ['produtos.html', 'Produtos', 'produtos'], ['servicos.html', 'Serviços', 'servicos'], ['precos.html', 'Preços', 'precos'], ['galeria.html', 'Galeria', 'galeria'], ['contato.html', 'Contato', 'contato']];
  var logo = '<a class="logo" href="index.html" aria-label="iPlanet Store, página inicial"><span class="logo__s"><img src="img/loja/logo-simbolo.webp" width="240" height="156" alt=""></span><span class="logo__t"><b>iPlanet Store</b><span>Sapezal-MT</span></span></a>';
  var hd = document.getElementById('hd');
  if (hd) {
    hd.className = 'hd';
    hd.innerHTML = '<div class="wrap hd__in">' + logo +
      '<nav class="nav" aria-label="Principal">' + links.map(function (l) { return '<a href="' + l[0] + '"' + (pag === l[2] ? ' aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') + '</nav>' +
      '<a class="btn btn--p" href="' + wa('Olá! Quero um orçamento.') + '" target="_blank" rel="noopener">' + ic('wa') + 'Orçamento no WhatsApp</a>' +
      '<button class="burger" aria-label="Abrir menu" aria-expanded="false" aria-controls="drawer">' + ic('menu') + '</button></div>' +
      '<div class="drawer" id="drawer">' + links.map(function (l) { return '<a href="' + l[0] + '"' + (pag === l[2] ? ' aria-current="page"' : '') + '>' + l[1] + '</a>'; }).join('') +
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
      '<div><h4>Páginas</h4><ul>' + links.map(function (l) { return '<li><a href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '<li><a href="precos.html#orcamento">Montar orçamento</a></li><li><a href="creditos.html">Créditos</a></li></ul></div>' +
      '</div><div class="ft__b"><span>Imagens ilustrativas. Imagens de produto: Apple Newsroom (material de divulgação). Marcas pertencentes à Apple Inc.</span><span>© ' + new Date().getFullYear() + ' iPlanet Store · Sapezal-MT</span></div></div>';
  }

  if (!document.querySelector('.wa') && pag !== 'precos') {
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
    return '<a class="mod rv' + (m.tileEscuro ? ' mod--k' : '') + '" href="produtos.html#' + m.id + '"><h3>' + m.nome + '</h3><div class="mod__img">' + foto(m.fotoTile, m.nome, '(max-width:640px) 78vw, 22vw') + '</div><div class="mod__f"><span class="cons">' + (m.preco || 'sob consulta') + '</span><span class="mod__v">Ver opções<span class="mod__ar">' + ic('arrow') + '</span></span></div></a>';
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

  /* ===================== v5: módulos das páginas ===================== */
  function gbTxt(n) { return n >= 1024 ? (n / 1024) + ' TB' : n + ' GB'; }
  function $(s) { return document.getElementById(s); }
  function brl(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function qs(k) { var m = new RegExp('[?&]' + k + '=([^&#]*)').exec(location.search); return m ? decodeURIComponent(m[1]) : ''; }

  /* ---------- seletor de modelo (produtos) ---------- */
  if ($('palco')) (function () {
    var M = IPHONES, i = 0, c = 0, g = 0, palco = $('palco');
    var id = location.hash.slice(1); M.forEach(function (m, k) { if (m.id === id) i = k; });
    $('pills').innerHTML = M.map(function (m, k) { return '<button class="pill" data-k="' + k + '" aria-pressed="false">' + m.curto + '</button>'; }).join('');
    $('pills').addEventListener('click', function (e) { var b = e.target.closest('.pill'); if (!b) return; i = +b.dataset.k; c = 0; g = 0; history.replaceState(null, '', '#' + M[i].id); draw(true); });
    function draw(anim) {
      var m = M[i];
      [].forEach.call($('pills').children, function (b, k) { b.setAttribute('aria-pressed', k === i); });
      palco.classList.toggle('k', !!m.escuro);
      var html = foto(m.foto, m.nome, '(max-width:980px) 100vw, 58vw', { eager: true });
      if (anim && palco.firstChild) { palco.firstChild.classList.add('out'); setTimeout(function () { palco.innerHTML = html; }, 180); } else palco.innerHTML = html;
      $('s-nome').textContent = m.nome; $('s-frase').textContent = m.frase;
      $('s-cores').innerHTML = m.cores.map(function (x, k) { return '<button class="sw" style="background:' + x[1] + '" aria-label="' + x[0] + '" aria-pressed="' + (k === c) + '" data-c="' + k + '"></button>'; }).join('');
      $('s-cor').textContent = m.cores[c][0];
      $('s-gb').innerHTML = m.gb.map(function (x, k) { return '<button class="pill" aria-pressed="' + (k === g) + '" data-g="' + k + '">' + gbTxt(x) + '</button>'; }).join('');
      $('s-preco').textContent = (window.PRECOS_IPHONE || {})[m.id + '-' + m.gb[g]] || m.preco || 'sob consulta';
      $('s-quero').href = wa('Olá! Quero orçamento do ' + m.nome + ', cor ' + m.cores[c][0] + ', ' + gbTxt(m.gb[g]));
      $('s-quero').innerHTML = ic('wa') + 'Quero esse';
      $('s-orc').href = 'precos.html?item=' + m.id + '#orcamento';
    }
    $('s-cores').addEventListener('click', function (e) { var b = e.target.closest('.sw'); if (b) { c = +b.dataset.c; draw(); } });
    $('s-gb').addEventListener('click', function (e) { var b = e.target.closest('.pill'); if (b) { g = +b.dataset.g; draw(); } });
    draw();
    addEventListener('hashchange', function () { var h = location.hash.slice(1); M.forEach(function (m, k) { if (m.id === h) { i = k; c = 0; g = 0; draw(true); document.getElementById('c-iphone').scrollIntoView({ behavior: 'smooth' }); } }); });
  })();

  /* ---------- comparativo ---------- */
  if ($('cmp')) (function () {
    var M = IPHONES, rows = [['Tela', 'tela'], ['Chip', 'chip'], ['Câmera', 'camera'], ['Cores', 'cores'], ['Armazenamento', 'gb'], ['Valor', 'preco']];
    function val(m, k) { var v = m[k]; if (k === 'gb') v = m.gb.map(gbTxt).join(', '); if (k === 'cores') v = m.cores.length + ' cores'; if (k === 'preco') v = v || 'sob consulta'; return v; }
    $('cmp').innerHTML = '<thead><tr><th scope="col"><span class="sr">Item</span></th>' + M.map(function (m) { return '<th scope="col">' + m.nome + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th>' + M.map(function (m) { return '<td>' + val(m, r[1]) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';
    $('cmp-cards').innerHTML = M.map(function (m) { return '<article class="cmp-c"><h3>' + m.nome + '</h3><dl>' + rows.filter(function (r) { return r[1] !== 'cores'; }).map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + val(m, r[1]) + '</dd>'; }).join('') + '</dl></article>'; }).join('');
  })();

  /* ---------- catálogo em cartões (produtos) ---------- */
  var CAT_IPHONE = [
    { id: '17-pro-max', nome: 'iPhone 17 Pro e Pro Max', foto: 'pro-camera', k: true, texto: 'O conjunto Pro de câmeras, em dois tamanhos.' },
    { id: 'air', nome: 'iPhone Air', foto: 'familia-crop', texto: 'O mais fino da linha.' },
    { id: '17', nome: 'iPhone 17', foto: 'i17-cores', texto: 'O iPhone novo para a maioria.' },
    { id: '16e', nome: 'iPhone 16e', foto: 'i16e-cores', texto: 'A porta de entrada para o iPhone.' },
    { id: '16', nome: 'iPhone 16', foto: 'i16-cores', texto: 'Gasta menos que o 17, em cinco cores.' },
    { id: '15', nome: 'iPhone 15', foto: 'i15-cores', texto: 'O iPhone novo mais em conta.' }
  ];
  function cartao(p) {
    return '<article class="cat-c rv' + (p.k ? ' cat-c--k' : '') + '"><div class="cat-c__img">' + foto(p.foto, p.nome, '(max-width:640px) 100vw, (max-width:980px) 50vw, 33vw') + '</div><div class="cat-c__b"><h3>' + p.nome + '</h3><p>' + p.texto + '</p><span class="cons">' + (p.preco || 'sob consulta') + '</span><div class="cat-c__a"><a class="btn btn--p" href="precos.html?item=' + p.id + '#orcamento">' + ic('plus') + 'Adicionar ao orçamento</a><a class="lnk" target="_blank" rel="noopener" href="' + wa('Olá! Quero orçamento de ' + p.nome + '.') + '">Pedir no WhatsApp</a></div></div></article>';
  }
  document.querySelectorAll('[data-cat]').forEach(function (box) {
    var gr = box.getAttribute('data-cat');
    var arr = gr === 'iPhone' ? CAT_IPHONE : ACESSORIOS.filter(function (a) { return gr.split('|').indexOf(a.grupo) > -1; });
    box.classList.add('cat--' + arr.length); box.innerHTML = arr.map(cartao).join('');
  });
  /* filtro de categoria fixo: realça a seção visível */
  var filtro = $('filtro');
  if (filtro && 'IntersectionObserver' in window) {
    var fl = filtro.querySelectorAll('a');
    var fo = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) fl.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'); }); }); }, { rootMargin: '-40% 0px -55% 0px' });
    fl.forEach(function (a) { var t = document.querySelector(a.getAttribute('href')); if (t) fo.observe(t); });
  }

  /* ---------- simulador de parcelas (qualquer [data-sim]) ---------- */
  document.querySelectorAll('[data-sim]').forEach(function (bx) {
    var inp = bx.querySelector('input'), sel = bx.querySelector('select'), out = bx.querySelector('.sim-parc'), sx = bx.querySelector('.sim-x'), lista = bx.querySelector('.sim-lista');
    sel.innerHTML = Object.keys(TAXAS_EXEMPLO).map(function (n) { return '<option value="' + n + '"' + (n === '18' ? ' selected' : '') + '>' + n + 'x</option>'; }).join('');
    function go() {
      var v = parseFloat(inp.value), x = +sel.value;
      sx.textContent = x + 'x de';
      out.textContent = v > 0 ? brl(v * (1 + TAXAS_EXEMPLO[x] / 100) / x) : 'R$ —';
      if (lista) lista.innerHTML = [1, 3, 6, 10, 12, 18].map(function (n) { return '<li><span>' + n + 'x</span><b>' + (v > 0 ? brl(v * (1 + TAXAS_EXEMPLO[n] / 100) / n) : 'R$ —') + '</b></li>'; }).join('');
    }
    inp.addEventListener('input', go); sel.addEventListener('input', go); go();
  });

  /* ---------- tabela de preços ---------- */
  if ($('tab-precos')) (function () {
    var cols = [128, 256, 512, 1024, 2048], P = window.PRECOS_IPHONE || {};
    function cel(m, gb) { return m.gb.indexOf(gb) < 0 ? '<span class="tp-na">não tem</span>' : (P[m.id + '-' + gb] || '<a class="tp-wa" target="_blank" rel="noopener" href="' + wa('Olá! Quero o valor do ' + m.nome + ', ' + gbTxt(gb)) + '">sob consulta</a>'); }
    var TH = { '17-pro-max': 'pro-laranja', '17-pro': 'pro-camera', 'air': 'air-tile', '17': 'i17-hero', '16e': 'i16e-cores', '16': 'i16-hero', '15': 'i15-hero' };
    function mini(m) { return '<span class="tp-th' + (m.id.indexOf('pro') > -1 ? ' tp-th--k' : '') + '">' + foto(TH[m.id], m.nome, '96px') + '</span>'; }
    var T = $('tab-precos'), C = $('tab-precos-c'), mq = matchMedia('(max-width:640px)');
    function rend() { var cel_m = mq.matches;
    T.innerHTML = cel_m ? '' : '<thead><tr><th scope="col">Modelo</th>' + cols.map(function (c) { return '<th scope="col">' + gbTxt(c) + '</th>'; }).join('') + '</tr></thead><tbody>' + IPHONES.map(function (m) { return '<tr><th scope="row"><span class="tp-m">' + mini(m) + m.nome + '</span></th>' + cols.map(function (c) { return '<td>' + cel(m, c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';
    C.innerHTML = !cel_m ? '' : IPHONES.map(function (m) { var tem = m.gb.some(function (c) { return P[m.id + '-' + c]; }); var lista = m.gb.map(function (c) { return c >= 1024 ? (c / 1024) + ' TB' : c; }).join(' · ').replace(/(\d)$/, '$1 GB').replace(/(\d) ·/g, '$1 ·'); return '<article class="cmp-c tp-c"><div class="tp-c__h">' + mini(m) + '<div><h3>' + m.nome + '</h3><span class="tp-gb">' + m.gb.map(gbTxt).join(' · ') + '</span></div></div>' + '<dl class="tp-dl">' + m.gb.map(function (c) { return '<dt>' + gbTxt(c) + '</dt><dd>' + cel(m, c) + '</dd>'; }).join('') + '</dl>' + '</article>'; }).join('');
    }
    rend(); if (mq.addEventListener) mq.addEventListener('change', rend); else mq.addListener(rend);
    var gs = {}; PRECOS_OUTROS.forEach(function (o) { (gs[o.grupo] = gs[o.grupo] || []).push(o); });
    function grp(g) { return '<div class="tp-g rv"><h3>' + g + '</h3><ul>' + gs[g].map(function (o) { return '<li><span>' + o.nome + '</span><b>' + (o.preco || '<a class="tp-wa" target="_blank" rel="noopener" href="' + wa('Olá! Quero o valor de ' + o.nome) + '">sob consulta</a>') + '</b></li>'; }).join('') + '</ul></div>'; }
    $('tab-outros').innerHTML = '<div class="tp-col">' + grp('AirPods') + grp('iPad') + '</div><div class="tp-col">' + grp('Acessórios') + '</div>';
  })();

  /* ---------- montador de orçamento ---------- */
  if ($('o-item')) (function () {
    var itens = [['iphone', 'iPhone']].concat(ACESSORIOS.map(function (a) { return [a.id, a.nome]; })).concat(ITENS_ICONE.map(function (a) { return ['ic-' + a.nome, a.nome]; }));
    var st = { item: 'iphone', m: 0, c: 0, g: 0 };
    var q = qs('item') || location.hash.slice(1);
    IPHONES.forEach(function (m, k) { if (m.id === q) st.m = k; });
    itens.forEach(function (x) { if (x[0] === q) st.item = q; });
    function chips(el, arr, sel, key) { $(el).innerHTML = arr.map(function (x, k) { return '<button class="pill" data-v="' + k + '" aria-pressed="' + (k === sel) + '">' + x + '</button>'; }).join(''); $(el).onclick = function (e) { var b = e.target.closest('.pill'); if (!b) return; st[key] = +b.dataset.v; if (key === 'm') { st.c = 0; st.g = 0; } if (key === 'itemI') { st.item = itens[st.itemI][0]; } draw(); }; }
    $('o-x').innerHTML = Object.keys(TAXAS_EXEMPLO).map(function (n) { return '<option value="' + n + '"' + (n === '18' ? ' selected' : '') + '>' + n + 'x</option>'; }).join('');
    function draw() {
      st.itemI = itens.findIndex(function (x) { return x[0] === st.item; });
      chips('o-item', itens.map(function (x) { return x[1]; }), st.itemI, 'itemI');
      var isI = st.item === 'iphone'; $('b-mod').style.display = $('b-cor').style.display = isI ? '' : 'none';
      var m = IPHONES[st.m], nome, det = [], img = '', k = false;
      if (isI) {
        chips('o-mod', IPHONES.map(function (x) { return x.curto; }), st.m, 'm');
        chips('o-cor', m.cores.map(function (x) { return '<span class="dot" style="background:' + x[1] + '"></span>' + x[0]; }), st.c, 'c');
        chips('o-gb', m.gb.map(gbTxt), st.g, 'g');
        nome = m.nome; det = [['Cor', m.cores[st.c][0]], ['Armazenamento', gbTxt(m.gb[st.g])]]; img = foto(m.foto, m.nome, '400px'); k = !!m.escuro;
      } else {
        var a = ACESSORIOS.find(function (x) { return x.id === st.item; });
        nome = itens[st.itemI][1]; if (st.item === 'airpods-max') det.push(['Cor', 'combine no WhatsApp']); if (a) img = foto(a.foto, a.nome, '400px'); else img = '<span style="color:#B8913A">' + ic('plug').replace('<svg', '<svg width="64" height="64"') + '</span>';
      }
      var big = isI || st.item === 'ipad'; $('b-troca').style.display = $('b-sim').style.display = big ? '' : 'none';
      var tr = big ? $('o-troca').value.trim() : ''; if (tr) det.push(['Para vender/troca', tr]);
      var x = +$('o-x').value;
      if (big) det.push(['Parcelas', 'até ' + x + 'x']); det.push(['Valor', 'sob consulta']);
      $('r-img').classList.toggle('k', k); $('r-img').innerHTML = img; $('r-nome').textContent = nome;
      $('r-l').innerHTML = det.map(function (d) { return '<li><span>' + d[0] + '</span><b>' + d[1] + '</b></li>'; }).join('');
      var msg = isI ? 'Olá! Quero orçamento do ' + nome + ', cor ' + m.cores[st.c][0] + ', ' + gbTxt(m.gb[st.g]) + '. Parcelas: até ' + x + 'x.' : 'Olá! Quero orçamento de: ' + nome + '.' + (big ? ' Parcelas: até ' + x + 'x.' : '');
      if (tr) msg += ' Tenho um iPhone para vender ou dar na troca: ' + tr + '.';
      $('r-env').href = wa(msg); $('r-env').innerHTML = ic('wa') + 'Enviar no WhatsApp';
    }
    ['o-troca', 'o-x'].forEach(function (i) { $(i).addEventListener('input', draw); });
    draw();
  })();

  /* ---------- galeria com filtro e lightbox ---------- */
  var GAL = [
    ['pro-cores', 'iPhone 17 Pro', 'iphone', 'k'], ['air-cores', 'iPhone Air', 'iphone', ''], ['i17-hero', 'iPhone 17', 'iphone', ''],
    ['pro-laranja', 'iPhone 17 Pro Max', 'iphone', 'k'], ['i16-cores', 'iPhone 16', 'iphone', ''], ['i15-hero', 'iPhone 15', 'iphone', ''],
    ['airpods-familia', 'AirPods Pro 3, AirPods 4 e AirPods Max', 'airpods', ''], ['pro-camera', 'iPhone 17 Pro', 'iphone', 'k'], ['i16e-frente-verso', 'iPhone 16e', 'iphone', ''],
    ['air-perfil', 'iPhone Air', 'iphone', 'w'], ['ipad-air', 'iPad Air', 'airpods', 'c'], ['i17-cores', 'iPhone 17', 'iphone', ''],
    ['pro-capa-silicone', 'Capinha de silicone 17 Pro', 'acess', ''], ['airpods-pro3', 'AirPods Pro 3', 'airpods', ''], ['i16-hero', 'iPhone 16', 'iphone', ''],
    ['familia', 'iPhone Air', 'iphone', ''], ['bateria-magsafe', 'Bateria MagSafe', 'acess', ''], ['airpods-max-cores', 'AirPods Max', 'airpods', ''],
    ['i15-cores', 'iPhone 15', 'iphone', ''], ['pro-capa-transp', 'Capinha transparente 17 Pro', 'acess', ''], ['i16e-cores', 'iPhone 16e', 'iphone', ''],
    ['airpods4', 'AirPods 4', 'airpods', 's'], ['i17-capa-silicone', 'Capinha de silicone 17', 'acess', ''], ['i16-linha', 'iPhone 16', 'iphone', 'sz'],
    ['i15-capas', 'Capinha FineWoven 15', 'acess', ''], ['airtag', 'AirTag', 'acess', '']
  ];
  var LOJA_F = [['fachada', 'Fachada'], ['mesa-produtos', 'Balcão'], ['caixa-ipad', 'iPad'], ['iphone-detalhe', 'iPhone']];
  var gal = $('gal');
  if (gal) {
    var cells = 0, its = GAL.map(function (g, n) {
      var d = FOTOS[g[0]] || [1600, 1200], r = d[0] / d[1], c = g[3].indexOf('s') > -1 ? 'g-q' : ((r > 1.45 || g[3].indexOf('w') > -1) ? 'g-w' : (r < .8 ? 'g-t' : 'g-q'));
      cells += c === 'g-q' ? 1 : 2; return { g: g, n: n, c: c };
    });
    for (var z = its.length - 1; cells % 4 && z >= 0; z--) if (its[z].c === 'g-w' && its[z].g[3].indexOf('w') < 0) { its[z].c = 'g-q'; cells--; }
    /* celular (2 colunas): número par de tiles 1x1 */
    var um = its.filter(function (o) { return o.c !== 'g-w'; });
    if (um.length % 2) { for (var y = um.length - 1; y >= 0; y--) if (um[y].c === 'g-q') { um[y].m = ' g-w2'; break; } }
    gal.innerHTML = its.map(function (o) { return '<button class="g-i ' + o.c + (o.m || '') + (o.g[3].indexOf('k') > -1 ? ' g-k' : '') + (o.g[3].indexOf('c') > -1 ? ' g-c' : '') + (o.g[3].indexOf('z') > -1 ? ' g-z' : '') + '" data-f="' + o.g[2] + '" data-n="' + o.n + '">' + foto(o.g[0], o.g[1], '(max-width:640px) 100vw, 33vw') + '<span>' + o.g[1] + '</span></button>'; }).join('');
    var gl = $('gal-loja');
    gl.innerHTML = LOJA_F.map(function (l, n) { return '<button class="g-i g-l" data-f="loja" data-n="l' + n + '"><img src="img/loja/' + l[0] + '.webp" width="360" height="640" alt="' + l[1] + ', iPlanet Store" loading="lazy" decoding="async"><span>' + l[1] + '</span></button>'; }).join('');
    var gf = $('gal-f');
    gf.addEventListener('click', function (e) {
      var b = e.target.closest('.pill'); if (!b) return;
      [].forEach.call(gf.children, function (x) { x.setAttribute('aria-pressed', x === b); });
      var f = b.dataset.f;
      gal.querySelectorAll('.g-i').forEach(function (it) { it.hidden = !(f === 'todos' || it.dataset.f === f); });
      $('sec-gal-g').hidden = f === 'loja'; $('sec-loja').hidden = !(f === 'todos' || f === 'loja');
    });
    var lb = $('lb');
    var atual = null;
    function vis() { return [].slice.call(document.querySelectorAll('#gal .g-i, #gal-loja .g-i')).filter(function (x) { return x.offsetParent !== null; }); }
    function anda(d) { var L = vis(), k = L.indexOf(atual); if (k < 0 || !L.length) return; mostra(L[(k + d + L.length) % L.length]); }
    function abre(e) { var b = e.target.closest('.g-i'); if (b) mostra(b); }
    function mostra(b) {
      atual = b;
      var n = b.dataset.n, nome, src, loja = n.charAt(0) === 'l';
      if (loja) { var l = LOJA_F[+n.slice(1)]; nome = l[1]; src = 'img/loja/' + l[0] + '.webp'; }
      else { var g = GAL[+n]; nome = g[1]; src = 'img/oficiais/' + g[0] + '-1600.webp'; }
      lb.querySelector('.lb__img').innerHTML = '<img src="' + src + '" alt="' + nome + '">';
      lb.querySelector('h2').textContent = nome;
      lb.querySelector('.cons').textContent = loja ? 'Seg–sex 9h–18h · Sáb 9h–13h' : 'sob consulta';
      var a = lb.querySelector('.btn'); a.href = wa(loja ? 'Olá! Vi as fotos da loja no site.' : 'Olá! Quero orçamento ' + (/^iP/.test(nome) ? 'do ' : 'de ') + nome + '.'); a.innerHTML = ic('wa') + 'Pedir no WhatsApp';
      lb.classList.toggle('lb--l', loja);
      if (!lb.open) { if (lb.showModal) lb.showModal(); else lb.setAttribute('open', ''); }
    }
    lb.querySelector('.lb__p').addEventListener('click', function () { anda(-1); });
    lb.querySelector('.lb__n').addEventListener('click', function () { anda(1); });
    lb.querySelector('.lb__p').innerHTML = ic('arrow'); lb.querySelector('.lb__n').innerHTML = ic('arrow');
    lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') { anda(-1); e.preventDefault(); } if (e.key === 'ArrowRight') { anda(1); e.preventDefault(); } });
    gal.addEventListener('click', abre); gl.addEventListener('click', abre);
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lb__x')) lb.close(); });
    lb.querySelector('.lb__x').innerHTML = ic('x');
  }

  var cmm = $('cores-mod');
  if (cmm) cmm.innerHTML = IPHONES.map(function (m) { return '<a class="cm rv" href="produtos.html#' + m.id + '"><h3>' + m.nome + '<span class="cm__ar">' + ic('arrow') + '</span></h3><ul>' + m.cores.map(function (x) { return '<li><i style="background:' + x[1] + '"></i>' + x[0] + '</li>'; }).join('') + '</ul></a>'; }).join('');

  /* ---------- formulário de contato: só monta a mensagem ---------- */
  var fwa = $('f-wa');
  if (fwa) fwa.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('f-nome').value.trim(), o = $('f-oque').value.trim();
    var msg = 'Olá! ' + (n ? 'Sou ' + n + '. ' : '') + (o ? 'Procuro: ' + o + '.' : 'Vim pelo site.');
    window.open(wa(msg), '_blank', 'noopener');
  });

  /* ---------- animação de entrada ---------- */
  var rv = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach(function (e) { io.observe(e); });
  } else rv.forEach(function (e) { e.classList.add('on'); });
  addEventListener('beforeprint', function () { rv.forEach(function (e) { e.classList.add('on'); }); });
})();
