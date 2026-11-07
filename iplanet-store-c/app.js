/* iPlanet Store — versão C. Lê tudo de dados.js. */
(function () {
  "use strict";
  var L = window.LOJA || {}, P = window.PRODUTOS || [], S = window.SERVICOS || [], T = window.TAXAS || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var byId = function (id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; };
  var IPH = P.filter(function (p) { return p.cat === "iphone"; });
  var brl = function (n) { return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); };
  var ADEF = '<span class="adef">a definir</span>';
  var val = function (v) { return v ? esc(v) : ADEF; };
  var curto = function (n) { return n.replace(/^iPhone\s*/, ""); };
  var wa = function (msg) { return "https://wa.me/" + (L.whatsapp || "5565998078968") + "?text=" + encodeURIComponent(msg); };
  document.documentElement.classList.add("js");

  /* ---------- cores ---------- */
  function mix(hex, amt) { // amt >0 clareia, <0 escurece
    var h = hex.replace("#", ""), r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
    var t = amt < 0 ? 0 : 255, p = Math.abs(amt);
    r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  var uid = 0;

  /* ---------- ilustrações (desenhadas aqui, imagem ilustrativa) ---------- */
  function lens(x, y, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#141416"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * .72) + '" fill="#1f2230" stroke="#3a3d4a" stroke-width="1.5"/><circle cx="' + (x - r * .25) + '" cy="' + (y - r * .25) + '" r="' + (r * .2) + '" fill="#6b7290" opacity=".7"/>';
  }
  function iphone(cor, cam) {
    var id = "g" + (++uid), c = cor || "#2a2b2f", hi = mix(c, .35), lo = mix(c, -.35), cam_ = "";
    if (cam === "pro") cam_ = '<rect x="14" y="14" width="172" height="104" rx="26" fill="' + mix(c, -.12) + '"/><rect x="22" y="22" width="92" height="88" rx="22" fill="' + mix(c, -.22) + '"/>' + lens(48, 46, 17) + lens(48, 88, 17) + lens(88, 67, 17) + '<circle cx="146" cy="44" r="6" fill="' + mix(c, -.4) + '"/><circle cx="146" cy="90" r="5" fill="#f3e3b8" opacity=".8"/>';
    else if (cam === "air") cam_ = '<rect x="14" y="16" width="172" height="58" rx="29" fill="' + mix(c, -.15) + '"/>' + lens(48, 45, 17) + '<circle cx="92" cy="45" r="6" fill="' + mix(c, -.4) + '"/><circle cx="160" cy="45" r="5" fill="#f3e3b8" opacity=".8"/>';
    else if (cam === "duo") cam_ = '<rect x="20" y="20" width="62" height="112" rx="31" fill="' + mix(c, -.14) + '"/>' + lens(51, 51, 18) + lens(51, 101, 18) + '<circle cx="96" cy="40" r="5" fill="#f3e3b8" opacity=".8"/>';
    else if (cam === "uno") cam_ = '<rect x="20" y="20" width="62" height="62" rx="20" fill="' + mix(c, -.14) + '"/>' + lens(51, 51, 18) + '<circle cx="96" cy="34" r="5" fill="#f3e3b8" opacity=".8"/>';
    else cam_ = '<rect x="20" y="20" width="96" height="96" rx="26" fill="' + mix(c, -.14) + '"/>' + lens(46, 46, 17) + lens(90, 90, 17) + '<circle cx="92" cy="42" r="5" fill="#f3e3b8" opacity=".8"/>';
    return '<svg viewBox="0 0 200 410" class="ilu" role="img" aria-label="Imagem ilustrativa de iPhone"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + hi + '"/><stop offset=".55" stop-color="' + c + '"/><stop offset="1" stop-color="' + lo + '"/></linearGradient><linearGradient id="' + id + 's" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
      '<rect x="2" y="2" width="196" height="406" rx="38" fill="' + mix(c, -.5) + '"/><rect x="5" y="5" width="190" height="400" rx="35" fill="url(#' + id + ')"/>' + cam_ +
      '<path d="M40 5 L110 5 L40 405 L5 405 L5 200 Z" fill="url(#' + id + 's)" opacity=".7"/><rect x="198" y="120" width="2" height="60" rx="1" fill="' + lo + '"/><rect x="0" y="100" width="2" height="30" rx="1" fill="' + lo + '"/><rect x="0" y="140" width="2" height="44" rx="1" fill="' + lo + '"/></svg>';
  }
  function ilus(img, cor) {
    img = img || {}; var t = img.t, c = cor || "#d8d9dc", G = "#c9a45c", id = "h" + (++uid);
    var g = function (body, vb) { return '<svg viewBox="' + (vb || "0 0 200 200") + '" class="ilu" role="img" aria-label="Imagem ilustrativa">' + body + "</svg>"; };
    switch (t) {
      case "iphone": return iphone(cor, img.cam);
      case "ipad": var w = img.mini ? 120 : 170, h = img.mini ? 170 : 220, x = (200 - w) / 2;
        return g('<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b2418"/><stop offset=".5" stop-color="#8a6a33"/><stop offset="1" stop-color="#15131a"/></linearGradient></defs><rect x="' + x + '" y="10" width="' + w + '" height="' + h + '" rx="16" fill="' + mix(c, -.3) + '"/><rect x="' + (x + 3) + '" y="13" width="' + (w - 6) + '" height="' + (h - 6) + '" rx="13" fill="#0c0c0e"/><rect x="' + (x + 10) + '" y="20" width="' + (w - 20) + '" height="' + (h - 20) + '" rx="7" fill="url(#' + id + ')"/><circle cx="' + (x + w * .3) + '" cy="' + (10 + h * .35) + '" r="' + (w * .22) + '" fill="#e9cf95" opacity=".35"/>', "0 0 200 " + (h + 20));
      case "airpods": return g('<rect x="45" y="60" width="110" height="100" rx="34" fill="#e9e7e1" stroke="#6f6b62" stroke-width="2"/><path d="M45 100 H155" stroke="#6f6b62" stroke-width="2"/><circle cx="100" cy="128" r="4" fill="#6f6b62"/>' + (img.pro ? '<rect x="70" y="20" width="22" height="34" rx="11" fill="#f7f6f2" stroke="#6f6b62" stroke-width="2"/><rect x="108" y="20" width="22" height="34" rx="11" fill="#f7f6f2" stroke="#6f6b62" stroke-width="2"/>' : '<rect x="72" y="14" width="16" height="44" rx="8" fill="#f7f6f2" stroke="#6f6b62" stroke-width="2"/><rect x="112" y="14" width="16" height="44" rx="8" fill="#f7f6f2" stroke="#6f6b62" stroke-width="2"/>'));
      case "max": return g('<path d="M50 120 V90 a50 50 0 0 1 100 0 V120" fill="none" stroke="' + mix(c, -.2) + '" stroke-width="14" stroke-linecap="round"/><rect x="30" y="105" width="44" height="70" rx="20" fill="' + c + '"/><rect x="126" y="105" width="44" height="70" rx="20" fill="' + c + '"/><rect x="60" y="115" width="10" height="50" rx="5" fill="' + mix(c, -.25) + '"/><rect x="130" y="115" width="10" height="50" rx="5" fill="' + mix(c, -.25) + '"/>');
      case "airtag": return g('<defs><linearGradient id="' + id + 'c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbfaf7"/><stop offset="1" stop-color="#e4e2dc"/></linearGradient><linearGradient id="' + id + 'm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9eaec"/><stop offset=".5" stop-color="#a9abaf"/><stop offset="1" stop-color="#d7d8db"/></linearGradient></defs><circle cx="62" cy="34" r="22" fill="none" stroke="url(#' + id + 'm)" stroke-width="6"/><path d="M74 50 C82 64 92 76 104 86 L128 64 C116 56 104 48 88 40 Z" fill="#8a5a33"/><path d="M78 52 C86 64 94 72 104 80" fill="none" stroke="#b07a4b" stroke-width="2" stroke-dasharray="4 4"/><g transform="translate(124 124)"><path d="M-58 -30 A66 66 0 0 1 10 -66 L30 -56 A62 62 0 0 0 -50 -14 Z" fill="#7b4f2c"/><circle r="66" fill="#6d4426"/><circle r="66" fill="none" stroke="#9a6a42" stroke-width="2" stroke-dasharray="5 5" transform="scale(.9)"/><circle r="50" fill="url(#' + id + 'm)"/><circle r="46" fill="url(#' + id + 'c)"/><path d="M-30 -30 A42 42 0 0 1 24 -36" fill="none" stroke="#fff" stroke-width="4" opacity=".9"/></g>', "0 0 200 200");
      case "fonte": return g('<rect x="45" y="62" width="110" height="110" rx="18" fill="#e2e0d9" stroke="#4f4b44" stroke-width="3"/><rect x="76" y="26" width="12" height="38" rx="3" fill="#3d4045"/><rect x="112" y="26" width="12" height="38" rx="3" fill="#3d4045"/><rect x="84" y="112" width="32" height="10" rx="5" fill="#4f4b44"/>');
      case "cabo": return g('<path d="M40 150 C 40 60, 160 60, 160 110 S 70 160, 80 100 S 150 40, 160 30" fill="none" stroke="#eeede8" stroke-width="9" stroke-linecap="round"/><path d="M40 150 C 40 60, 160 60, 160 110 S 70 160, 80 100 S 150 40, 160 30" fill="none" stroke="#d5d2c8" stroke-width="1.5"/><rect x="30" y="148" width="20" height="34" rx="5" fill="#f4f3ef" stroke="#c9c5b9" stroke-width="2"/><rect x="152" y="8" width="18" height="26" rx="5" fill="#f4f3ef" stroke="#c9c5b9" stroke-width="2"/>');
      case "magsafe": return g('<path d="M100 150 C 100 175, 150 180, 175 190" fill="none" stroke="#5a564e" stroke-width="8"/><circle cx="100" cy="95" r="66" fill="#4a4e54"/><circle cx="100" cy="95" r="57" fill="#e2e0d9"/><circle cx="100" cy="95" r="36" fill="none" stroke="#55514a" stroke-width="4"/><circle cx="100" cy="95" r="7" fill="#55514a"/>');
      case "capa": var cc = c, op = img.clara ? .45 : 1;
        return g('<rect x="45" y="8" width="110" height="224" rx="24" fill="' + cc + '" opacity="' + op + '" stroke="' + mix(cc, -.3) + '" stroke-width="' + (img.grossa ? 7 : 3) + '"/><rect x="58" y="22" width="44" height="64" rx="14" fill="#0f0f12" opacity=".85"/>' + (img.ima ? '<circle cx="100" cy="140" r="34" fill="none" stroke="#e9cf95" stroke-width="4"/><rect x="96" y="178" width="8" height="18" rx="3" fill="#e9cf95"/>' : ''), "0 0 200 240");
      case "pelicula": return g('<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".45" stop-color="#e8eef2" stop-opacity=".35"/><stop offset="1" stop-color="#c6d2da" stop-opacity=".7"/></linearGradient></defs><rect x="50" y="10" width="100" height="216" rx="' + (img.borda ? 22 : 16) + '" fill="' + (img.priv ? "#1d1e22" : "#dfe7ec") + '" stroke="' + (img.borda ? "#1d1e22" : "#b8c6cf") + '" stroke-width="' + (img.borda ? 6 : 2) + '"/><rect x="50" y="10" width="100" height="216" rx="16" fill="url(#' + id + ')" opacity="' + (img.priv ? .25 : 1) + '"/><path d="M60 200 L140 40" stroke="#fff" stroke-width="6" opacity=".6"/>', "0 0 200 236");
      // serviços: traço dourado
      case "s-tela": return g('<rect x="62" y="20" width="76" height="160" rx="16" fill="none" stroke="' + G + '" stroke-width="4"/><path d="M100 70 L88 96 L110 104 L94 140 M110 104 L128 112 M88 96 L70 92" fill="none" stroke="#e9cf95" stroke-width="3" stroke-linecap="round"/>');
      case "s-bateria": return g('<rect x="50" y="62" width="92" height="76" rx="14" fill="none" stroke="' + G + '" stroke-width="4"/><rect x="146" y="86" width="10" height="28" rx="4" fill="' + G + '"/><path d="M104 74 L84 104 H100 L92 128 L118 94 H102 Z" fill="#e9cf95"/>');
      case "s-conector": return g('<rect x="40" y="80" width="70" height="40" rx="20" fill="none" stroke="' + G + '" stroke-width="4"/><rect x="58" y="94" width="34" height="12" rx="6" fill="' + G + '"/><path d="M118 100 H150 M150 88 V112 H178 V88 Z" fill="none" stroke="#e9cf95" stroke-width="4" stroke-linejoin="round"/>');
      case "s-camera": return g('<circle cx="100" cy="100" r="54" fill="none" stroke="' + G + '" stroke-width="4"/><circle cx="100" cy="100" r="34" fill="none" stroke="#e9cf95" stroke-width="3"/><circle cx="100" cy="100" r="12" fill="' + G + '"/><circle cx="88" cy="86" r="5" fill="#f3e3b8"/>');
      case "s-agua": return g('<path d="M100 30 C 80 62, 60 86, 60 112 a40 40 0 0 0 80 0 C 140 86, 120 62, 100 30 Z" fill="none" stroke="' + G + '" stroke-width="4"/><path d="M82 116 a20 20 0 0 0 18 18" fill="none" stroke="#e9cf95" stroke-width="4" stroke-linecap="round"/>');
      case "s-software": return g('<path d="M146 92 A48 48 0 0 0 58 76" fill="none" stroke="' + G + '" stroke-width="4" stroke-linecap="round"/><path d="M54 108 A48 48 0 0 0 142 124" fill="none" stroke="' + G + '" stroke-width="4" stroke-linecap="round"/><path d="M50 60 L58 78 L76 70" fill="none" stroke="#e9cf95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M150 140 L142 122 L124 130" fill="none" stroke="#e9cf95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>');
    }
    return g('<rect x="50" y="20" width="100" height="160" rx="18" fill="' + c + '"/>');
  }
  window.ILUS = ilus;
  var corDe = function (p, i) { return p.cores && p.cores.length ? p.cores[i || 0][1] : null; };
  var precoDe = function (p, v) { var x = p.precos && v ? p.precos[v] : ""; return x ? Number(String(x).replace(/\D/g, "")) : 0; };

  /* ---------- orçamento (estado salvo neste navegador) ---------- */
  var KEY = "iplanetC-orc";
  var novo = function () { return { modelo: "", memoria: "", cor: "", itens: [], servicos: [], troca: "", pag: "cartao", parc: 1, valor: "", nome: "" }; };
  var O = novo();
  try { var sv = JSON.parse(localStorage.getItem(KEY) || "null"); if (sv && typeof sv === "object") O = Object.assign(novo(), sv); } catch (e) {}
  function salvar() { try { localStorage.setItem(KEY, JSON.stringify(O)); } catch (e) {} contar(); }
  function total() { return (O.modelo && O.modelo !== "nenhum" ? 1 : 0) + O.itens.length + O.servicos.length; }
  function contar() { $$("[data-conta]").forEach(function (el) { var n = total(); el.textContent = n; el.parentNode.classList.toggle("tem", n > 0); }); }
  function toast(t) {
    var el = $(".toast"); if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = t; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("on"); }, 2600);
  }
  function addItem(id, v, cor) {
    var p = byId(id); if (!p) return;
    if (p.cat === "iphone") { O.modelo = id; O.memoria = v || p.var.valores[0]; O.cor = cor || (p.cores[0] ? p.cores[0][0] : ""); }
    else O.itens.push({ id: id, v: v || p.var.valores[0], cor: cor || (p.cores[0] ? p.cores[0][0] : "") });
    salvar(); toast(p.nome + " entrou no orçamento");
  }

  /* ---------- cabeçalho ---------- */
  var nav = $(".pill");
  if (nav) {
    var bt = $(".pill__menu");
    bt && bt.addEventListener("click", function () { var o = nav.classList.toggle("aberto"); bt.setAttribute("aria-expanded", o); });
    var onS = function () { nav.classList.toggle("rolou", window.scrollY > 30); };
    window.addEventListener("scroll", onS, { passive: true }); onS();
  }
  contar();

  /* ---------- aberto agora ---------- */
  $$("[data-aberto]").forEach(function (el) {
    var d = new Date(), e = (L.expediente || {})[d.getDay()], h = d.getHours() + d.getMinutes() / 60;
    var ab = e && h >= e[0] && h < e[1];
    el.textContent = ab ? "Aberto agora" : "Fechado agora"; el.classList.add(ab ? "sim" : "nao");
  });
  $$("[data-horario]").forEach(function (el) {
    el.innerHTML = (L.horario || []).map(function (x) { return "<li><span>" + esc(x.dias) + "</span><b>" + esc(x.horas) + "</b></li>"; }).join("");
  });
  $$("[data-campo]").forEach(function (el) { el.innerHTML = val(L[el.getAttribute("data-campo")]); });
  $$("[data-mapa]").forEach(function (f) { f.src = "https://www.google.com/maps?q=" + encodeURIComponent(L.endereco || "Sapezal, MT") + "&output=embed"; });
  $$("[data-wa]").forEach(function (a) { a.href = wa(a.getAttribute("data-wa") || "Olá! Vim pelo site da iPlanet Store."); });

  /* ---------- primeira tela: vitrine ---------- */
  var vit = $("[data-vitrine]");
  if (vit) {
    var ordem = ["iphone-15", "iphone-16", "iphone-16e", "iphone-17", "iphone-air", "iphone-17-pro", "iphone-17-pro-max"];
    var lista = ordem.map(byId).filter(Boolean);
    IPH.forEach(function (p) { if (lista.indexOf(p) < 0) lista.push(p); });
    var tabs = $(".vit__modelos", vit), stage = $(".vit__aparelho", vit), cores = $(".vit__cores", vit), nome = $(".vit__nome", vit), txt = $(".vit__texto", vit), go = $(".vit__go", vit);
    var atual = byId("iphone-17-pro") || lista[0], ci = 0;
    tabs.innerHTML = lista.map(function (p) { return '<button type="button" role="tab" data-m="' + p.id + '">' + esc(curto(p.nome)) + "</button>"; }).join("");
    function pinta(anim) {
      $$("button", tabs).forEach(function (b) { var on = b.getAttribute("data-m") === atual.id; b.setAttribute("aria-selected", on); b.classList.toggle("on", on); });
      var html = ilus(atual.img, corDe(atual, ci));
      if (anim && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stage.classList.add("sai"); setTimeout(function () { stage.innerHTML = html; stage.classList.remove("sai"); }, 220);
      } else stage.innerHTML = html;
      cores.innerHTML = (atual.cores || []).map(function (c, i) { return '<button type="button" class="bola' + (i === ci ? " on" : "") + '" style="--c:' + c[1] + '" data-i="' + i + '" aria-label="' + esc(c[0]) + '" title="' + esc(c[0]) + '"></button>'; }).join("") + '<span class="vit__cor">' + esc(atual.cores[ci] ? atual.cores[ci][0] : "") + "</span>";
      nome.textContent = atual.nome; txt.textContent = atual.texto;
      go.href = "orcamento.html?modelo=" + atual.id + "&cor=" + ci;
    }
    tabs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; atual = byId(b.getAttribute("data-m")); ci = 0; pinta(true); });
    cores.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; ci = +b.getAttribute("data-i"); pinta(true); });
    pinta(false);
  }

  /* ---------- bento: ilustrações ---------- */
  $$("[data-ilu]").forEach(function (el) {
    var p = byId(el.getAttribute("data-ilu")), ci = +(el.getAttribute("data-cor") || 0);
    if (p) el.innerHTML = ilus(p.img, corDe(p, ci));
  });
  $$("[data-ilus]").forEach(function (el) { el.innerHTML = ilus({ t: el.getAttribute("data-ilus") }); });

  /* ---------- comparador ---------- */
  var cmp = $("[data-comparador]");
  if (cmp) {
    var esc3 = ["iphone-17-pro-max", "iphone-17", "iphone-16e"].map(function (id, i) { return byId(id) ? id : IPH[i].id; });
    var linhas = [["Tela", function (p) { return val(p.tela); }], ["Para quem", function (p) { return esc(p.texto); }],
      ["Memórias", function (p) { return p.var.valores.map(function (v) { return '<span class="chip">' + esc(v) + "</span>"; }).join(""); }],
      ["Cores", function (p) { return p.cores.map(function (c) { return '<i class="bola mini" style="--c:' + c[1] + '" title="' + esc(c[0]) + '"></i>'; }).join("") + ' <small>' + p.cores.length + " opções</small>"; }],
      ["Condição", function (p) { return val(p.condicao); }], ["Preço", function (p) { var v = precoDe(p, p.var.valores[0]); return v ? "a partir de " + brl(v) : '<span class="adef">a definir</span>'; }],
      ["Garantia", function () { return val(L.garantiaProdutos); }]];
    function desenha() {
      var cols = esc3.slice(0, matchMedia("(max-width: 620px)").matches ? 2 : 3).map(byId);
      var h = '<div class="cmp__grade" style="--n:' + cols.length + '"><div class="cmp__canto">Escolha até 3 modelos</div>';
      cols.forEach(function (p, i) {
        h += '<div class="cmp__cab"><label class="sr" for="cmp' + i + '">Modelo ' + (i + 1) + '</label><select id="cmp' + i + '" data-i="' + i + '">' + IPH.map(function (q) { return '<option value="' + q.id + '"' + (q.id === p.id ? " selected" : "") + ">" + esc(q.nome) + "</option>"; }).join("") + '</select><div class="cmp__ilu">' + ilus(p.img, corDe(p)) + "</div></div>";
      });
      linhas.forEach(function (l) { h += '<div class="cmp__rot">' + l[0] + "</div>"; cols.forEach(function (p) { h += '<div class="cmp__val" data-rot="' + l[0] + '">' + l[1](p) + "</div>"; }); });
      h += '<div class="cmp__rot"></div>'; cols.forEach(function (p) { h += '<div class="cmp__val"><a class="btn btn--linha" href="orcamento.html?modelo=' + p.id + '">Orçar este</a></div>'; });
      cmp.innerHTML = h + "</div>";
    }
    cmp.addEventListener("change", function (e) { if (e.target.matches("select")) { esc3[+e.target.getAttribute("data-i")] = e.target.value; desenha(); } });
    desenha();
    var mqc = matchMedia("(max-width: 620px)"); if (mqc.addEventListener) mqc.addEventListener("change", desenha);
  }

  /* ---------- acordeão ---------- */
  $$(".faq__q").forEach(function (b) {
    b.addEventListener("click", function () { var o = b.getAttribute("aria-expanded") === "true"; b.setAttribute("aria-expanded", !o); b.nextElementSibling.hidden = o; });
  });
  $$("[data-faq-campo]").forEach(function (el) { var v = L[el.getAttribute("data-faq-campo")]; el.innerHTML = v ? esc(v) : ADEF + " " + esc(el.getAttribute("data-se-vazio") || ""); });

  /* ---------- catálogo ---------- */
  var cat = $("[data-catalogo]");
  if (cat) {
    var filtros = $("[data-filtros]"), busca = $("#busca"), atualCat = (location.hash || "").replace("#", "") || "todos";
    var cats = [{ id: "todos", nome: "Tudo" }].concat(window.CATEGORIAS || []);
    filtros.innerHTML = cats.map(function (c) { var n = c.id === "todos" ? P.length : P.filter(function (p) { return p.cat === c.id; }).length; return '<button type="button" data-c="' + c.id + '">' + esc(c.nome) + " <small>" + n + "</small></button>"; }).join("");
    function card(p) {
      var ci = 0, foto = p.foto ? '<img src="' + esc(p.foto) + '" alt="' + esc(p.nome) + '" loading="lazy">' : ilus(p.img, corDe(p));
      return '<article class="prod" data-id="' + p.id + '" data-cat="' + p.cat + '"><div class="prod__img' + (p.cat === "iphone" ? " escuro" : "") + '">' + foto + (p.foto ? "" : '<span class="ilustr">imagem ilustrativa</span>') + "</div>" +
        '<div class="prod__corpo"><p class="prod__cat">' + esc((window.CATEGORIAS || []).filter(function (c) { return c.id === p.cat; }).map(function (c) { return c.nome; })[0] || "") + "</p><h3>" + esc(p.nome) + "</h3><p>" + esc(p.texto) + "</p>" +
        '<dl class="prod__dados"><div><dt>Preço</dt><dd data-preco>' + (precoDe(p, p.var.valores[0]) ? brl(precoDe(p, p.var.valores[0])) : ADEF) + "</dd></div><div><dt>Condição</dt><dd>" + val(p.condicao) + "</dd></div></dl>" +
        '<label class="campo"><span>' + esc(p.var.rotulo) + '</span><select data-v>' + p.var.valores.map(function (v) { return "<option>" + esc(v) + "</option>"; }).join("") + "</select></label>" +
        (p.cores.length > 1 ? '<div class="prod__cores" role="radiogroup" aria-label="Cor">' + p.cores.map(function (c, i) { return '<button type="button" role="radio" aria-checked="' + (i === ci) + '" class="bola' + (i === ci ? " on" : "") + '" style="--c:' + c[1] + '" data-i="' + i + '" aria-label="' + esc(c[0]) + '" title="' + esc(c[0]) + '"></button>'; }).join("") + "</div>" : "") +
        '<button type="button" class="btn btn--escuro prod__add">Adicionar ao orçamento</button></div></article>';
    }
    cat.innerHTML = P.map(card).join("");
    function filtra() {
      var q = (busca.value || "").toLowerCase().trim(), n = 0;
      $$("button", filtros).forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-c") === atualCat); b.setAttribute("aria-pressed", b.getAttribute("data-c") === atualCat); });
      $$(".prod", cat).forEach(function (el) { var p = byId(el.getAttribute("data-id")); var ok = (atualCat === "todos" || p.cat === atualCat) && (!q || (p.nome + " " + p.texto).toLowerCase().indexOf(q) > -1); el.hidden = !ok; if (ok) n++; });
      $("[data-qtd]").textContent = n + (n === 1 ? " produto" : " produtos");
      $(".cat__vazio").hidden = n > 0;
    }
    filtros.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b) return; atualCat = b.getAttribute("data-c"); history.replaceState(null, "", atualCat === "todos" ? location.pathname : "#" + atualCat); filtra(); });
    busca.addEventListener("input", filtra);
    cat.addEventListener("click", function (e) {
      var el = e.target.closest(".prod"); if (!el) return; var p = byId(el.getAttribute("data-id"));
      var b = e.target.closest(".bola");
      if (b) { $$(".bola", el).forEach(function (x) { x.classList.remove("on"); x.setAttribute("aria-checked", "false"); }); b.classList.add("on"); b.setAttribute("aria-checked", "true"); if (!p.foto) $(".prod__img", el).firstChild.outerHTML = ilus(p.img, p.cores[+b.getAttribute("data-i")][1]); return; }
      if (e.target.closest(".prod__add")) { var on = $(".bola.on", el); addItem(p.id, $("[data-v]", el).value, on ? p.cores[+on.getAttribute("data-i")][0] : ""); var ab = e.target.closest(".prod__add"); ab.textContent = "No orçamento ✓"; setTimeout(function () { ab.textContent = "Adicionar ao orçamento"; }, 1800); }
    });
    cat.addEventListener("change", function (e) { if (!e.target.matches("[data-v]")) return; var el = e.target.closest(".prod"), p = byId(el.getAttribute("data-id")), v = precoDe(p, e.target.value); $("[data-preco]", el).innerHTML = v ? brl(v) : ADEF; });
    filtra();
  }

  /* ---------- assistência ---------- */
  var srv = $("[data-servicos]");
  if (srv) {
    srv.innerHTML = S.map(function (s, i) {
      return '<article class="srv"><div class="srv__ilu">' + ilus(s.img) + '</div><div class="srv__corpo"><span class="srv__n">' + String(i + 1).padStart(2, "0") + "</span><h3>" + esc(s.nome) + "</h3><p>" + esc(s.texto) + '</p><dl class="srv__dados"><div><dt>Prazo</dt><dd>' + val(s.prazo) + "</dd></div><div><dt>Preço</dt><dd>" + val(s.preco) + "</dd></div><div><dt>Garantia</dt><dd>" + val(s.garantia) + '</dd></div></dl><div class="srv__acoes"><a class="btn btn--ouro" href="' + wa("Olá! Quero orçamento de " + s.nome.toLowerCase() + ". Meu aparelho é: ") + '" target="_blank" rel="noopener">Pedir orçamento de ' + esc(s.nome.toLowerCase()) + '</a><button type="button" class="btn btn--linha" data-srv="' + s.id + '">Somar ao orçamento</button></div></div></article>';
    }).join("");
    srv.addEventListener("click", function (e) { var b = e.target.closest("[data-srv]"); if (!b) return; var id = b.getAttribute("data-srv"); if (O.servicos.indexOf(id) < 0) O.servicos.push(id); salvar(); toast("Serviço somado ao orçamento"); b.textContent = "Somado ✓"; });
    var et = $("[data-etapas]"); if (et) et.innerHTML = window.ETAPAS_CONSERTO ? esc(window.ETAPAS_CONSERTO) : ADEF;
  }

  /* ---------- montador passo a passo ---------- */
  var M = $("[data-montador]");
  if (M) {
    var qs = new URLSearchParams(location.search);
    if (qs.get("modelo") && byId(qs.get("modelo"))) { var pm = byId(qs.get("modelo")); O.modelo = pm.id; O.memoria = pm.var.valores[0]; O.cor = (pm.cores[+qs.get("cor") || 0] || pm.cores[0] || [""])[0]; salvar(); }
    var passo = 1, NOMES = ["Modelo", "Memória e cor", "Acessórios", "Pagamento", "Revisar e enviar"];
    var corpo = $(".mt__corpo", M), barra = $(".mt__barra i", M), lista_ = $(".mt__passos", M), voltar = $(".mt__voltar", M), seguir = $(".mt__seguir", M), resumo = $(".mt__resumo", M);
    lista_.innerHTML = NOMES.map(function (n, i) { return '<li><button type="button" data-p="' + (i + 1) + '"><b>' + (i + 1) + "</b><span>" + n + "</span></button></li>"; }).join("");
    var ACESS = P.filter(function (p) { return p.cat !== "iphone"; });
    function modeloP() { return O.modelo && O.modelo !== "nenhum" ? byId(O.modelo) : null; }
    function valorBase() {
      var s = 0, p = modeloP(); if (p) s += precoDe(p, O.memoria);
      O.itens.forEach(function (it) { var q = byId(it.id); if (q) s += precoDe(q, it.v); });
      return s;
    }
    function linhasResumo() {
      var r = [], p = modeloP();
      if (p) r.push(p.nome + " · " + (O.memoria || "memória a escolher") + (O.cor ? " · " + O.cor : ""));
      O.itens.forEach(function (it) { var q = byId(it.id); if (q) r.push(q.nome + " · " + it.v + (it.cor ? " · " + it.cor : "")); });
      O.servicos.forEach(function (id) { var s = S.filter(function (x) { return x.id === id; })[0]; if (s) r.push("Assistência: " + s.nome); });
      return r;
    }
    function parcelaTxt() {
      var v = valorBase() || Number(String(O.valor).replace(/[^\d,]/g, "").replace(",", ".")) || 0;
      if (O.pag !== "cartao") return { txt: O.pag === "pix" ? "Pix ou dinheiro (a confirmar)" : "Quero saber as opções", v: v };
      var tx = T[O.parc] || 0, tot = v * (1 + tx / 100);
      return { txt: O.parc + "x no cartão" + (v ? " — simulação: " + O.parc + " de " + brl(tot / O.parc) + " (total " + brl(tot) + ")" : ""), v: v, tot: tot };
    }
    function mensagem() {
      var r = linhasResumo(), pg = parcelaTxt(), m = "Olá, iPlanet Store! Montei este orçamento no site:\n\n";
      m += r.length ? r.map(function (x) { return "• " + x; }).join("\n") : "• (ainda não escolhi itens)";
      if (O.troca.trim()) m += "\n\nQuero avaliar meu aparelho na troca: " + O.troca.trim();
      m += "\n\nPagamento: " + pg.txt;
      if (pg.v && !valorBase()) m += "\n(valor que usei na simulação: " + brl(pg.v) + ")";
      if (O.pag === "cartao") m += "\nSei que é simulação; aguardo o valor final.";
      if (O.nome.trim()) m += "\n\nMeu nome: " + O.nome.trim();
      return m;
    }
    function pintaResumo() {
      var r = linhasResumo(), p = modeloP();
      resumo.innerHTML = '<div class="mt__res-ilu">' + (p ? ilus(p.img, (p.cores.filter(function (c) { return c[0] === O.cor; })[0] || p.cores[0] || [])[1]) : ilus({ t: "capa" }, "#2a2b2f")) + '</div><h3>Seu orçamento <small>' + total() + (total() === 1 ? " item" : " itens") + "</small></h3>" +
        (r.length ? "<ul>" + r.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : '<p class="mt__vazio">Escolha o modelo ou pule para os acessórios.</p>') +
        '<p class="mt__res-pag">Pagamento: ' + esc(total() === 0 && !O.valor && O.parc === 1 ? "a escolher" : parcelaTxt().txt) + "</p>";
    }
    var render = {
      1: function () {
        return '<h2 class="mt__h">Qual iPhone você quer?</h2><p class="mt__sub">Toque no modelo. Se veio só por capinha ou conserto, escolha a última opção.</p><div class="mt__modelos">' +
          IPH.map(function (p) { return '<button type="button" class="mt__mod' + (O.modelo === p.id ? " on" : "") + '" data-mod="' + p.id + '" aria-pressed="' + (O.modelo === p.id) + '"><span class="mt__mod-ilu">' + ilus(p.img, corDe(p)) + "</span><b>" + esc(p.nome) + "</b><small>" + esc(p.tela || "") + "</small></button>"; }).join("") +
          '<button type="button" class="mt__mod mt__mod--nada' + (O.modelo === "nenhum" ? " on" : "") + '" data-mod="nenhum" aria-pressed="' + (O.modelo === "nenhum") + '"><span class="mt__mod-ilu">' + ilus({ t: "capa" }, "#c9a45c") + "</span><b>Sem iPhone agora</b><small>só acessório ou conserto</small></button></div>";
      },
      2: function () {
        var p = modeloP();
        if (!p) return '<h2 class="mt__h">Memória e cor</h2><p class="mt__sub">Você não escolheu iPhone, então esta etapa fica de fora. Siga para os acessórios.</p><label class="campo campo--grande"><span>Quer avaliar seu aparelho na troca? Conte qual é</span><textarea data-troca rows="3" placeholder="Ex.: iPhone 12, 128 GB, tela inteira">' + esc(O.troca) + "</textarea></label>";
        return '<h2 class="mt__h">' + esc(p.nome) + ': memória e cor</h2><div class="mt__dupla"><div class="mt__prev">' + ilus(p.img, (p.cores.filter(function (c) { return c[0] === O.cor; })[0] || p.cores[0])[1]) + '<span class="ilustr">imagem ilustrativa</span></div><div>' +
          '<p class="mt__rot">Memória</p><div class="mt__chips">' + p.var.valores.map(function (v) { var pr = precoDe(p, v); return '<button type="button" class="opc' + (O.memoria === v ? " on" : "") + '" data-mem="' + esc(v) + '" aria-pressed="' + (O.memoria === v) + '">' + esc(v) + "<small>" + (pr ? brl(pr) : "preço a definir") + "</small></button>"; }).join("") + "</div>" +
          '<p class="mt__rot">Cor <span class="mt__cor-nome">' + esc(O.cor) + '</span></p><div class="mt__chips">' + p.cores.map(function (c) { return '<button type="button" class="bola grande' + (O.cor === c[0] ? " on" : "") + '" style="--c:' + c[1] + '" data-cor="' + esc(c[0]) + '" aria-label="' + esc(c[0]) + '" title="' + esc(c[0]) + '"></button>'; }).join("") + "</div>" +
          '<p class="mt__rot">Condição</p><p>' + val(p.condicao) + ' <small class="mt__nota">a loja confirma no WhatsApp</small></p>' +
          '<label class="campo campo--grande"><span>Quer avaliar seu aparelho na troca? Conte qual é</span><textarea data-troca rows="3" placeholder="Ex.: iPhone 12, 128 GB, tela inteira">' + esc(O.troca) + "</textarea></label></div></div>";
      },
      3: function () {
        var p = modeloP(), sel = function (id) { for (var i = 0; i < O.itens.length; i++) if (O.itens[i].id === id) return O.itens[i]; return null; };
        return '<h2 class="mt__h">Acessórios e conserto</h2><p class="mt__sub">Marque o que quiser levar junto' + (p ? ". Capinha e película já vêm no tamanho do " + esc(p.nome) : "") + '.</p><div class="mt__acess">' +
          ACESS.map(function (q) { var s = sel(q.id), pre = s ? s.v : (p && q.var.valores.indexOf(p.nome) > -1 ? p.nome : q.var.valores[0]);
            return '<div class="ac' + (s ? " on" : "") + '" data-ac="' + q.id + '"><button type="button" class="ac__tg" aria-pressed="' + !!s + '"><span class="ac__ilu">' + ilus(q.img, corDe(q)) + "</span><b>" + esc(q.nome) + '</b><i aria-hidden="true"></i></button><label class="ac__v"><span class="sr">' + esc(q.var.rotulo) + '</span><select data-acv>' + q.var.valores.map(function (v) { return "<option" + (v === pre ? " selected" : "") + ">" + esc(v) + "</option>"; }).join("") + "</select></label></div>"; }).join("") +
          '</div><details class="mt__srv"' + (O.servicos.length ? " open" : "") + '><summary>Somar conserto ou assistência técnica <small>(opcional)</small></summary><div class="mt__chips">' + S.map(function (s) { var on = O.servicos.indexOf(s.id) > -1; return '<button type="button" class="opc' + (on ? " on" : "") + '" data-sv="' + s.id + '" aria-pressed="' + on + '">' + esc(s.nome) + "</button>"; }).join("") + "</div></details>";
      },
      4: function () {
        var vb = valorBase(), v = vb || Number(String(O.valor).replace(/[^\d,]/g, "").replace(",", ".")) || 0, max = L.parcelasMax || 18, rows = "";
        for (var n = 1; n <= max; n++) { var tot = v * (1 + (T[n] || 0) / 100); rows += '<button type="button" class="parc' + (O.parc === n ? " on" : "") + '" data-parc="' + n + '" aria-pressed="' + (O.parc === n) + '"><b>' + n + "x</b><span>" + (v ? brl(tot / n) : "—") + "</span><small>" + (v ? "total " + brl(tot) : "") + "</small></button>"; }
        return '<h2 class="mt__h">Pagamento e parcelas</h2><div class="mt__chips">' +
          [["cartao", "Cartão de crédito"], ["pix", "Pix ou dinheiro"], ["duvida", "Quero saber as opções"]].map(function (x) { return '<button type="button" class="opc' + (O.pag === x[0] ? " on" : "") + '" data-pag="' + x[0] + '" aria-pressed="' + (O.pag === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>" +
          (O.pag === "cartao" ? (vb ? '<p class="mt__sub">Valor somado dos itens: <b class="num">' + brl(vb) + "</b></p>" : '<label class="campo campo--valor"><span>Os preços ainda são passados no WhatsApp. Digite um valor para simular</span><span class="valor"><i>R$</i><input data-valor inputmode="decimal" placeholder="2.000" value="' + esc(O.valor) + '"></span></label>') +
            '<div class="parcs">' + rows + '</div><p class="aviso">Simulação. As taxas desta tabela são de exemplo' + (window.TAXAS_SAO_EXEMPLO ? " e ainda serão confirmadas pela loja" : "") + "; o valor final vem confirmado no orçamento.</p>"
            : '<p class="mt__sub">Outras formas de pagamento: ' + val(L.pagamentoOutros) + "</p>");
      },
      5: function () {
        return '<h2 class="mt__h">Revise e envie</h2><p class="mt__sub">A mensagem abaixo vai pronta para o WhatsApp da loja ' + esc(L.whatsappVisivel || "") + '. Você ainda pode editar lá antes de enviar.</p><label class="campo"><span>Seu nome (opcional)</span><input data-nome autocomplete="given-name" value="' + esc(O.nome) + '" placeholder="Como a loja te chama"></label><pre class="mt__msg" data-msg>' + esc(mensagem()) + '</pre><div class="mt__fim"><a class="btn btn--ouro btn--g" data-enviar target="_blank" rel="noopener" href="' + wa(mensagem()) + '">Enviar no WhatsApp</a><button type="button" class="btn btn--linha" data-limpar>Começar de novo</button></div>';
      }
    };
    function ir(n, foco) {
      passo = Math.max(1, Math.min(5, n));
      corpo.innerHTML = render[passo](); barra.style.width = (passo / 5 * 100) + "%";
      $$("button", lista_).forEach(function (b) { var k = +b.getAttribute("data-p"); b.parentNode.className = k === passo ? "atual" : k < passo ? "feito" : ""; if (k === passo) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current"); });
      $(".mt__contador", M).textContent = "Passo " + passo + " de 5 · " + NOMES[passo - 1];
      var cb = $(".atual button", lista_); if (cb) lista_.scrollLeft = cb.offsetLeft - 16;
      voltar.disabled = passo === 1; seguir.hidden = passo === 5;
      seguir.textContent = passo === 4 ? "Revisar" : "Continuar";
      pintaResumo();
      if (foco) { var h = $(".mt__h", corpo); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); var top = M.getBoundingClientRect().top + scrollY - 90; if (Math.abs(scrollY - top) > 120) scrollTo({ top: top, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
    }
    function atualizaMsg() { var m = $("[data-msg]", M); if (m) { m.textContent = mensagem(); $("[data-enviar]", M).href = wa(mensagem()); } pintaResumo(); }
    voltar.addEventListener("click", function () { ir(passo - 1, true); });
    seguir.addEventListener("click", function () { ir(passo + (passo === 1 && O.modelo === "nenhum" ? 2 : 1), true); });
    lista_.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) ir(+b.getAttribute("data-p"), true); });
    corpo.addEventListener("click", function (e) {
      var t = e.target, b;
      if ((b = t.closest("[data-mod]"))) { var id = b.getAttribute("data-mod"); O.modelo = id; var p = byId(id); if (p) { O.memoria = p.var.valores[0]; O.cor = p.cores[0] ? p.cores[0][0] : ""; } salvar(); ir(1); return; }
      if ((b = t.closest("[data-mem]"))) { O.memoria = b.getAttribute("data-mem"); salvar(); ir(2); return; }
      if ((b = t.closest("[data-cor]"))) { O.cor = b.getAttribute("data-cor"); salvar(); ir(2); return; }
      if ((b = t.closest(".ac__tg"))) { var box = b.closest("[data-ac]"), aid = box.getAttribute("data-ac"), idx = -1; O.itens.forEach(function (it, i) { if (it.id === aid) idx = i; });
        if (idx > -1) O.itens.splice(idx, 1); else { var q = byId(aid); O.itens.push({ id: aid, v: $("[data-acv]", box).value, cor: q.cores[0] ? q.cores[0][0] : "" }); }
        box.classList.toggle("on", idx < 0); b.setAttribute("aria-pressed", idx < 0); salvar(); pintaResumo(); return; }
      if ((b = t.closest("[data-sv]"))) { var sid = b.getAttribute("data-sv"), k = O.servicos.indexOf(sid); if (k > -1) O.servicos.splice(k, 1); else O.servicos.push(sid); b.classList.toggle("on", k < 0); b.setAttribute("aria-pressed", k < 0); salvar(); pintaResumo(); return; }
      if ((b = t.closest("[data-pag]"))) { O.pag = b.getAttribute("data-pag"); salvar(); ir(4); return; }
      if ((b = t.closest("[data-parc]"))) { O.parc = +b.getAttribute("data-parc"); salvar(); $$(".parc", corpo).forEach(function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); }); pintaResumo(); return; }
      if (t.closest("[data-limpar]")) { O = novo(); salvar(); ir(1, true); }
    });
    corpo.addEventListener("input", function (e) {
      var t = e.target;
      if (t.matches("[data-troca]")) { O.troca = t.value; salvar(); }
      if (t.matches("[data-nome]")) { O.nome = t.value; salvar(); atualizaMsg(); }
      if (t.matches("[data-valor]")) { O.valor = t.value; salvar(); var v = Number(String(O.valor).replace(/[^\d,]/g, "").replace(",", ".")) || 0; $$(".parc", corpo).forEach(function (x) { var n = +x.getAttribute("data-parc"), tot = v * (1 + (T[n] || 0) / 100); $("span", x).textContent = v ? brl(tot / n) : "—"; $("small", x).textContent = v ? "total " + brl(tot) : ""; }); pintaResumo(); }
    });
    corpo.addEventListener("change", function (e) { if (e.target.matches("[data-acv]")) { var aid = e.target.closest("[data-ac]").getAttribute("data-ac"); O.itens.forEach(function (it) { if (it.id === aid) it.v = e.target.value; }); salvar(); pintaResumo(); } });
    ir(+(qs.get("passo") || (qs.get("modelo") ? 2 : 1)));
  }

  /* ---------- entrada suave ---------- */
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    $$(".rev").forEach(function (el) { el.classList.add("pre"); io.observe(el); });
  }
  var ano = $("[data-ano]"); if (ano) ano.textContent = new Date().getFullYear();
})();
