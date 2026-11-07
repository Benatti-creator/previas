(function () {
  var L = window.LOJA || {};
  var doc = document.documentElement;
  doc.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduz = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function wa(texto) { return 'https://wa.me/' + L.whatsapp + '?text=' + encodeURIComponent(texto); }
  window.waLink = wa;
  var ADEF = '<span class="adef">a definir</span>';

  /* campos do dados.js */
  $$('[data-campo]').forEach(function (el) {
    var v = L[el.getAttribute('data-campo')];
    el.innerHTML = v ? String(v).replace(/</g, '&lt;') : ADEF;
  });
  $$('[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa') || 'Olá! Vim pelo site da iPlanet Store.'); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-horas]').forEach(function (ul) {
    ul.innerHTML = (L.horario || []).map(function (h) { return '<li><span>' + h.dias + '</span><span>' + h.horas + '</span></li>'; }).join('');
  });
  $$('[data-aberto]').forEach(function (el) {
    var d = new Date(), e = (L.expediente || {})[d.getDay()], h = d.getHours() + d.getMinutes() / 60;
    var ab = e && h >= e[0] && h < e[1];
    el.textContent = ab ? 'Aberto agora' : 'Fechado agora';
    if (ab) el.classList.add('sim');
  });
  $$('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* menu */
  var bt = $('.menu-bt');
  if (bt) {
    bt.addEventListener('click', function () {
      var ab = doc.classList.toggle('menu-aberto');
      bt.setAttribute('aria-expanded', ab); bt.setAttribute('aria-label', ab ? 'Fechar menu' : 'Abrir menu');
    });
    $$('.gaveta a').forEach(function (a) { a.addEventListener('click', function () { doc.classList.remove('menu-aberto'); bt.setAttribute('aria-expanded', false); bt.setAttribute('aria-label', 'Abrir menu'); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { doc.classList.remove('menu-aberto'); bt.setAttribute('aria-expanded', false); bt.setAttribute('aria-label', 'Abrir menu'); } });
  }

  /* revelar */
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else { $$('.rv').forEach(function (el) { el.classList.add('on'); }); }

  /* vitrine */
  var vit = $('.vit');
  if (vit) {
    var slides = $$('.vit__slide', vit), idx = $$('.vit__idx span', vit), dots = $$('.vit__dots button', vit), palco = $('.vit__palco', vit);
    var mostra = function (i) {
      slides.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      idx.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      dots.forEach(function (s, k) { s.classList.toggle('on', k === i); s.setAttribute('aria-current', k === i); });
    };
    mostra(0);
    var celular = function () { return innerWidth <= 760; };
    var porRolagem = function () {
      if (celular()) return;
      var r = vit.getBoundingClientRect(), total = vit.offsetHeight - innerHeight;
      if (total <= 0) return;
      var p = Math.min(Math.max(-r.top / total, 0), 0.999);
      mostra(Math.floor(p * slides.length));
    };
    addEventListener('scroll', porRolagem, { passive: true });
    addEventListener('resize', porRolagem);
    porRolagem();
    palco.addEventListener('scroll', function () {
      if (!celular()) return;
      mostra(Math.round(palco.scrollLeft / palco.clientWidth));
    }, { passive: true });
    dots.forEach(function (d, k) {
      d.addEventListener('click', function () { palco.scrollTo({ left: k * palco.clientWidth, behavior: reduz ? 'auto' : 'smooth' }); });
    });
  }

  /* ================= iPhone: seletor e comparador ================= */
  var sel = $('#seletor');
  if (sel && window.IPHONES) {
    var M = window.IPHONES, atual = { m: M.filter(function (x) { return x.id === "17-pro"; })[0] || M[0], cor: 0, mem: 0 };
    var lista = $('.sel__lista', sel), palcoI = $('.sel__palco', sel);
    lista.innerHTML = M.map(function (m, i) {
      return '<li><button type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '"><span>' + m.nome + '</span><small>' + m.tela + '</small></button></li>';
    }).join('');
    var imgHTML = function (m, cls) {
      if (!m.img) return '<div class="semimg ' + (cls || '') + '"><span class="semimg__cam"></span><div><b>' + m.nome + '</b><span class="semimg__t">foto em breve</span></div></div>';
      return '<img class="prod' + (m.presilha ? ' prod--fade' : '') + ' ' + (cls || '') + '" src="' + m.img + '" alt="' + m.nome + ', imagem ilustrativa" width="530" height="1000">';
    };
    var preco = function (m, mem) { var p = (m.precos || {})[mem]; return p ? 'R$ ' + Number(p).toLocaleString('pt-BR') : 'Sob consulta'; };
    var render = function (troca) {
      var m = atual.m, mem = m.memorias[atual.mem], cor = m.cores[atual.cor];
      var draw = function () {
        palcoI.innerHTML = '<div class="facho"></div><div class="chao"></div>' + imgHTML(m);
        var im = $('img', palcoI); if (im && troca) { im.classList.add('troca'); requestAnimationFrame(function () { requestAnimationFrame(function () { im.classList.remove('troca'); }); }); }
      };
      if (troca && !reduz) { var o = $('.prod', palcoI); if (o) o.classList.add('troca'); setTimeout(draw, 220); } else draw();
      $('#m-nome').textContent = m.nome;
      $('#m-ficha').textContent = 'Tela ' + m.tela + ' · ' + m.cameras;
      $('#m-cores').innerHTML = m.cores.map(function (c, k) { return '<button type="button" class="cor" style="background:' + c[1] + '" aria-label="' + c[0] + '" aria-pressed="' + (k === atual.cor) + '" data-k="' + k + '"></button>'; }).join('');
      $('#m-cor-nome').textContent = cor[0];
      $('#m-mem').innerHTML = m.memorias.map(function (x, k) { return '<button type="button" class="chip" aria-pressed="' + (k === atual.mem) + '" data-k="' + k + '">' + x + '</button>'; }).join('');
      $('#m-preco').innerHTML = preco(m, mem) + '<small>valor e parcelas no WhatsApp</small>';
      $('#m-wa').href = wa('Olá! Vim pelo site. Quero saber o valor do ' + m.nome + ' ' + mem + ' na cor ' + cor[0] + '. Vocês têm na loja?');
      $$('button', lista).forEach(function (b, k) { b.setAttribute('aria-pressed', M[k] === m); });
    };
    lista.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; atual = { m: M[+b.getAttribute('data-i')], cor: 0, mem: 0 }; render(true); });
    $('#m-cores').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; atual.cor = +b.getAttribute('data-k'); render(false); });
    $('#m-mem').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; atual.mem = +b.getAttribute('data-k'); render(false); });
    render(false);

    /* comparador */
    var lados = $$('.comp__lado');
    lados.forEach(function (ld, j) {
      var s = $('select', ld);
      s.innerHTML = M.map(function (m, i) { return '<option value="' + i + '">' + m.nome + '</option>'; }).join('');
      s.value = j === 0 ? 1 : 6;
      var pinta = function () {
        var m = M[+s.value];
        $('.comp__img', ld).innerHTML = '<div class="chao" style="bottom:0;height:80px"></div>' + imgHTML(m);
        $('dl', ld).innerHTML = '<dt>Tela</dt><dd>' + m.tela + '</dd><dt>Câmeras</dt><dd>' + m.cameras + '</dd><dt>Memórias</dt><dd>' + m.memorias.join(' · ') + '</dd><dt>Cores</dt><dd>' + m.cores.length + ' opções</dd><dt>Preço</dt><dd>Sob consulta</dd>';
      };
      s.addEventListener('change', pinta); pinta();
    });
  }

  /* ================= Orçamento: montador ================= */
  var mont = $('#montador');
  if (mont) {
    var E = { tipo: null, modelo: null, mem: null, cor: null, acess: [], serv: [], troca: '', nome: '', parc: '', obs: '' };
    var M2 = window.IPHONES || [], A = window.ACESSORIOS || [], S = window.SERVICOS || [];
    var passo = 0, et = $$('.etapa', mont), tabs = $$('.etapas button', mont);
    var op = function (attr, val, titulo, sub, img, on) {
      return '<button type="button" class="op" data-' + attr + '="' + val + '" aria-pressed="' + !!on + '">' + (img === undefined ? '' : img ? '<img src="' + img + '" alt="" width="44" height="56" loading="lazy">' : '<span class="ph"></span>') + '<span><b>' + titulo + '</b>' + (sub ? '<small>' + sub + '</small>' : '') + '</span></button>';
    };
    var pinta = function () {
      $('#o-modelos').innerHTML = M2.map(function (m, i) { return op('m', i, m.nome, 'Tela ' + m.tela, undefined, E.modelo === i); }).join('') + op('m', 'nenhum', 'Não quero iPhone agora', 'só acessório ou conserto', undefined, E.modelo === 'nenhum');
      var m = typeof E.modelo === 'number' ? M2[E.modelo] : null;
      $('#o-config').innerHTML = m ? (
        '<div class="opc"><span class="rot">Memória</span><div class="chips">' + m.memorias.map(function (x) { return '<button type="button" class="chip" data-mem="' + x + '" aria-pressed="' + (E.mem === x) + '">' + x + '</button>'; }).join('') + '</div></div>' +
        '<div class="opc" style="margin-top:28px"><span class="rot">Cor</span><div class="chips">' + m.cores.map(function (c) { return '<button type="button" class="chip" data-cor="' + c[0] + '" aria-pressed="' + (E.cor === c[0]) + '"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:' + c[1] + ';margin-right:8px;vertical-align:-1px;border:1px solid rgba(255,255,255,.3)"></span>' + c[0] + '</button>'; }).join('') + '</div></div>'
      ) : '<p class="lead">Sem iPhone neste pedido. Siga para acessórios e assistência.</p>';
      $('#o-acess').innerHTML = A.map(function (a) { return op('a', a.id, a.nome, a.nota, undefined, E.acess.indexOf(a.nome) > -1); }).join('');
      $('#o-serv').innerHTML = S.map(function (s) { return op('s', s.id, s.nome, s.nota.split('.')[0], undefined, E.serv.indexOf(s.nome) > -1); }).join('');
      resumo();
    };
    var linhas = function () {
      var r = [];
      if (typeof E.modelo === 'number') r.push([M2[E.modelo].nome, [E.mem, E.cor].filter(Boolean).join(' · ') || 'escolher']);
      E.acess.forEach(function (a) { r.push([a, 'acessório']); });
      E.serv.forEach(function (s) { r.push([s, 'assistência']); });
      if (E.troca) r.push(['Avaliar na troca', E.troca]);
      if (E.parc) r.push(['Parcelas', E.parc + 'x']);
      return r;
    };
    var msg = function () {
      var t = 'Olá! Vim pelo site da iPlanet Store e quero um orçamento.';
      if (E.nome) t += '\nMeu nome: ' + E.nome;
      if (typeof E.modelo === 'number') t += '\n\niPhone: ' + M2[E.modelo].nome + ', memória: ' + (E.mem || 'a escolher') + ', cor: ' + (E.cor || 'a escolher');
      if (E.acess.length) t += '\nAcessórios: ' + E.acess.join(', ');
      if (E.serv.length) t += '\nAssistência: ' + E.serv.join(', ');
      if (E.troca) t += '\nQuero avaliar meu aparelho na troca: ' + E.troca;
      if (E.parc) t += '\nPagamento: pensando em ' + E.parc + 'x no cartão';
      if (E.obs) t += '\nObservação: ' + E.obs;
      return t;
    };
    var resumo = function () {
      var r = linhas();
      var li = r.length ? r.map(function (x) { return '<li>' + x[0] + '<span>' + x[1] + '</span></li>'; }).join('') : '<li class="vaz">Nada escolhido ainda.</li>';
      $$('[data-resumo]').forEach(function (u) { u.innerHTML = li; });
      $$('[data-enviar]').forEach(function (a) { a.href = wa(msg()); });
      var n = $('#b-n'); if (n) n.textContent = r.length ? r.length + (r.length > 1 ? ' itens' : ' item') : 'Nenhum item';
      var pv = $('#o-previa'); if (pv) pv.textContent = msg();
    };
    var vai = function (i) {
      passo = Math.max(0, Math.min(et.length - 1, i));
      et.forEach(function (e, k) { e.classList.toggle('on', k === passo); });
      tabs.forEach(function (t, k) { t.classList.toggle('on', k === passo); t.classList.toggle('feito', k < passo); t.setAttribute('aria-current', k === passo ? 'step' : 'false'); });
      $('#o-volta').disabled = passo === 0;
      $('#o-segue').style.display = passo === et.length - 1 ? 'none' : '';
      if (window.scrollY > mont.offsetTop) mont.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth' });
    };
    tabs.forEach(function (t, k) { t.addEventListener('click', function () { vai(k); }); });
    $('#o-volta').addEventListener('click', function () { vai(passo - 1); });
    $('#o-segue').addEventListener('click', function () { vai(passo + 1); });
    mont.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-m')) { var v = b.getAttribute('data-m'); E.modelo = v === 'nenhum' ? 'nenhum' : +v; E.mem = null; E.cor = null; pinta(); }
      else if (b.hasAttribute('data-mem')) { E.mem = b.getAttribute('data-mem'); pinta(); }
      else if (b.hasAttribute('data-cor')) { E.cor = b.getAttribute('data-cor'); pinta(); }
      else if (b.hasAttribute('data-a')) { var a = A.filter(function (x) { return x.id === b.getAttribute('data-a'); })[0].nome; var i = E.acess.indexOf(a); i > -1 ? E.acess.splice(i, 1) : E.acess.push(a); pinta(); }
      else if (b.hasAttribute('data-s')) { var s = S.filter(function (x) { return x.id === b.getAttribute('data-s'); })[0].nome; var j = E.serv.indexOf(s); j > -1 ? E.serv.splice(j, 1) : E.serv.push(s); pinta(); }
    });
    ['nome', 'troca', 'obs'].forEach(function (k) { var el = $('#o-' + k); if (el) el.addEventListener('input', function () { E[k] = el.value.trim(); resumo(); }); });
    var ps = $('#o-parc');
    if (ps) { var h = '<option value="">Ainda não sei</option>'; for (var n = 1; n <= L.parcelasMax; n++) h += '<option value="' + n + '">' + n + 'x</option>'; ps.innerHTML = h; ps.addEventListener('change', function () { E.parc = ps.value; resumo(); }); }
    var bb = $('.barra__abre'); if (bb) bb.addEventListener('click', function () { var br = $('.barra'); var ab = br.classList.toggle('aberta'); bb.setAttribute('aria-expanded', ab); });
    pinta(); vai(0);
  }

  /* simulador */
  var sim = $('#simulador');
  if (sim && window.TAXAS) {
    var inp = $('#s-valor'), tb = $('#s-tab');
    var fmt = function (v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
    var calc = function () {
      var v = parseFloat(String(inp.value).replace(/\./g, '').replace(',', '.')) || 0, h = '';
      for (var n = 1; n <= L.parcelasMax; n++) {
        var tx = window.TAXAS[n] || 0, tot = v * (1 + tx / 100);
        h += '<tr' + (n === 10 || n === L.parcelasMax ? ' class="dest"' : '') + '><td>' + n + 'x</td><td>' + (v ? fmt(tot / n) : '—') + '</td><td>' + (v ? fmt(tot) : '—') + '</td></tr>';
      }
      tb.innerHTML = h;
    };
    inp.addEventListener('input', calc); calc();
  }

  /* assistência: lista vinda do dados.js */
  var sv = $('#servicos');
  if (sv && window.SERVICOS) {
    sv.innerHTML = window.SERVICOS.map(function (s, i) {
      return '<li><div><h3>' + s.nome + '</h3><p>' + s.nota + '</p></div>' +
        '<div class="campo"><span class="rot">Prazo</span>' + (s.prazo || ADEF) + '</div>' +
        '<div class="campo"><span class="rot">Garantia</span>' + (s.garantia || ADEF) + '</div>' +
        '<a class="link" target="_blank" rel="noopener" href="' + wa('Olá! Vim pelo site. Quero orçamento de ' + s.nome.toLowerCase() + ' no meu iPhone. Modelo: ') + '">Orçar</a></li>';
    }).join('');
    $$('.rv', sv).forEach(function (el) { el.classList.add('on'); });
  }
})();
