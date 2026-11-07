/* iPlanet Store — comportamento do site. Os dados ficam em dados.js. */
(function () {
  document.documentElement.classList.add("js");
  const L = window.LOJA, PRODS = window.PRODUTOS || [], SERVS = window.SERVICOS || [];
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const zap = txt => "https://wa.me/" + L.whatsapp + (txt ? "?text=" + encodeURIComponent(txt) : "");
  const num = p => Number(String(p).replace(/\./g, "").replace(",", "."));
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const ADEF = '<span class="consulta">Sob consulta</span>';
  const campo = (v, alt) => v ? esc(v) : (alt || "");
  const precoHTML = p => p ? brl(num(p)) : ADEF;
  const taxa = n => (window.TAXAS && window.TAXAS[n]) || 0;
  const parcela = (v, n) => v * (1 + taxa(n) / 100) / n;
  const porId = id => PRODS.find(p => p.id === id);
  const catNome = id => ((window.CATEGORIAS || []).find(c => c.id === id) || { nome: id }).nome;

  /* ================= ILUSTRAÇÕES (SVG) ================= */
  let uid = 0;
  function tom(hex, a) {
    let h = hex.replace("#", ""); if (h.length === 3) h = h.split("").map(x => x + x).join("");
    const n = parseInt(h, 16); let r = n >> 16, g = n >> 8 & 255, b = n & 255;
    const f = v => Math.round(a >= 0 ? v + (255 - v) * a : v * (1 + a));
    return "#" + [f(r), f(g), f(b)].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("");
  }
  function lente(x, y, r, aro) {
    return `<circle cx="${x}" cy="${y}" r="${r + 3}" fill="${aro}" opacity=".9"/><circle cx="${x}" cy="${y}" r="${r}" fill="#121316" stroke="#3a3d44" stroke-width="1.5"/>
      <circle cx="${x}" cy="${y}" r="${r * .62}" fill="url(#lv)"/><circle cx="${x}" cy="${y}" r="${r * .3}" fill="#05060a"/>
      <circle cx="${x - r * .28}" cy="${y - r * .3}" r="${r * .16}" fill="#fff" opacity=".7"/><path d="M${x - r * .78} ${y + r * .1} A${r * .8} ${r * .8} 0 0 1 ${x - r * .05} ${y - r * .78}" stroke="#cfe0ff" stroke-width="${r * .12}" fill="none" opacity=".45" stroke-linecap="round"/><path d="M${x + r * .35} ${y + r * .55} A${r * .7} ${r * .7} 0 0 0 ${x + r * .62} ${y + r * .2}" stroke="#fff" stroke-width="${r * .08}" fill="none" opacity=".3" stroke-linecap="round"/>`;
  }
  const flash = (x, y) => `<circle cx="${x}" cy="${y}" r="6" fill="#f3ead2" stroke="#9d978a" stroke-width="1"/>`;
  function telaCelular(i, conteudo) {
    return `<rect x="72" y="22" width="156" height="296" rx="32" fill="#2a2a2e" stroke="#55565c" stroke-width="2"/>
      <rect x="80" y="30" width="140" height="280" rx="25" fill="url(#tl${i})"/>
      <rect x="128" y="40" width="44" height="13" rx="6.5" fill="#050506"/>${conteudo}
      <path d="M80 60 L200 30 L220 30 L80 150Z" fill="#fff" opacity=".05"/>`;
  }
  function ilustra(img, cor) {
    const i = ++uid, t = img.t;
    cor = cor || "#d8d9dc";
    const claro = tom(cor, .28), escuro = tom(cor, -.22), aro = tom(cor, -.12);
    let defs = `<radialGradient id="lv" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#3b4a72"/><stop offset=".6" stop-color="#11162a"/><stop offset="1" stop-color="#030409"/></radialGradient>
      <linearGradient id="cp${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${claro}"/><stop offset=".55" stop-color="${cor}"/><stop offset="1" stop-color="${escuro}"/></linearGradient>
      <linearGradient id="br${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="bc${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9c9cc"/></linearGradient>
      <radialGradient id="tl${i}" cx=".5" cy=".3" r=".9"><stop offset="0" stop-color="#3a2d16"/><stop offset=".5" stop-color="#15120c"/><stop offset="1" stop-color="#060505"/></radialGradient>
      <linearGradient id="mt${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".18" stop-color="${tom(cor, -.45)}"/><stop offset=".42" stop-color="#f4f4f6"/><stop offset=".62" stop-color="${tom(cor, -.5)}"/><stop offset=".85" stop-color="#e9e9ec"/><stop offset="1" stop-color="${tom(cor, -.55)}"/></linearGradient><filter id="sc${i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.5"/></filter><filter id="sb${i}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7"/></filter>`;
    let corpo = "", sombraW = 82;
    if (t === "iphone") {
      corpo = `<rect x="73" y="20" width="154" height="300" rx="33" fill="${tom(cor, -.35)}"/>
        <rect x="75" y="22" width="150" height="296" rx="31" fill="url(#cp${i})"/>
        <rect x="74.5" y="21.5" width="151" height="297" rx="31.5" fill="none" stroke="url(#mt${i})" stroke-width="3.2"/><rect x="77.5" y="24.5" width="145" height="291" rx="29" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1"/>
        <path d="M75 120 L225 40 L225 110 L75 210Z" fill="url(#br${i})" opacity=".55"/>`;
      const c = img.cam;
      if (c === "pro") corpo += `<rect x="79" y="26" width="142" height="92" rx="27" fill="${tom(cor, -.06)}" stroke="${tom(cor, .35)}" stroke-opacity=".7"/>
        <rect x="86" y="32" width="84" height="80" rx="22" fill="${tom(cor, -.14)}"/>${lente(108, 54, 14, aro)}${lente(108, 90, 14, aro)}${lente(146, 72, 14, aro)}${flash(196, 54)}<circle cx="196" cy="90" r="6" fill="#16171a"/>`;
      else if (c === "air") corpo += `<rect x="79" y="32" width="142" height="48" rx="24" fill="${tom(cor, -.1)}" stroke="${tom(cor, .35)}" stroke-opacity=".7"/>${lente(106, 56, 14, aro)}${flash(146, 56)}<circle cx="172" cy="56" r="3" fill="#16171a"/>`;
      else if (c === "duo") corpo += `<rect x="86" y="34" width="46" height="88" rx="23" fill="${tom(cor, -.1)}" stroke="${tom(cor, .4)}" stroke-opacity=".6"/>${lente(109, 57, 14, aro)}${lente(109, 99, 14, aro)}${flash(150, 50)}`;
      else if (c === "uno") corpo += `<rect x="86" y="34" width="46" height="46" rx="15" fill="${tom(cor, -.1)}"/>${lente(109, 57, 14, aro)}${flash(146, 48)}`;
      else corpo += `<rect x="84" y="32" width="84" height="84" rx="24" fill="${tom(cor, .12)}" opacity=".85"/>${lente(106, 54, 14, aro)}${lente(146, 94, 14, aro)}${flash(150, 52)}`;
    } else if (t === "ipad") {
      const w = img.mini ? 150 : 196, h = img.mini ? 228 : 276, x = 150 - w / 2, y = 168 - h / 2;
      sombraW = w / 2 + 10;
      corpo = `<rect x="${x - 1.5}" y="${y - 1.5}" width="${w + 3}" height="${h + 3}" rx="22" fill="${tom(cor, -.38)}"/>
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="url(#cp${i})"/>
        <rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="${h - 2}" rx="19" fill="none" stroke="${tom(cor, .5)}" stroke-opacity=".55" stroke-width="1.4"/>
        <path d="M${x} ${y + h * .42} L${x + w} ${y + h * .1} L${x + w} ${y + h * .3} L${x} ${y + h * .66}Z" fill="url(#br${i})" opacity=".7"/>
        <rect x="${x + w * .3}" y="${y + h - 5}" width="${w * .4}" height="3" rx="1.5" fill="${tom(cor, -.3)}" opacity=".7"/>`;
      if (img.cam === "pro") corpo += `<rect x="${x + 12}" y="${y + 12}" width="50" height="58" rx="15" fill="${tom(cor, -.12)}" stroke="${tom(cor, .4)}" stroke-opacity=".7"/>${lente(x + 30, y + 30, 10, aro)}${lente(x + 30, y + 54, 10, aro)}${flash(x + 50, y + 30)}<circle cx="${x + 50}" cy="${y + 54}" r="5" fill="#16171a"/>`;
      else corpo += `<circle cx="${x + 26}" cy="${y + 26}" r="14" fill="${tom(cor, -.12)}" stroke="${tom(cor, .4)}" stroke-opacity=".7"/>${lente(x + 26, y + 26, 9, aro)}`;
    } else if (t === "airpods") {
      if (img.pro) corpo = `<g transform="translate(0 26)">
        <path d="M104 74 a24 22 0 1 1 34 20 l-3 42 a8 8 0 0 1 -16 0 z" fill="url(#bc${i})" stroke="#bdbdc2"/><ellipse cx="102" cy="66" rx="13" ry="15" fill="#d8d8dc" stroke="#b9b9be"/><ellipse cx="102" cy="66" rx="6" ry="8" fill="#8e8e94"/>
        <path d="M196 74 a24 22 0 1 0 -34 20 l3 42 a8 8 0 0 0 16 0 z" fill="url(#bc${i})" stroke="#bdbdc2"/><ellipse cx="198" cy="66" rx="13" ry="15" fill="#d8d8dc" stroke="#b9b9be"/><ellipse cx="198" cy="66" rx="6" ry="8" fill="#8e8e94"/>
        <rect x="132" y="104" width="7" height="12" rx="3" fill="#2a2a2e"/><rect x="161" y="104" width="7" height="12" rx="3" fill="#2a2a2e"/>
        <rect x="70" y="168" width="160" height="112" rx="34" fill="url(#bc${i})" stroke="#c2c2c7"/>
        <path d="M71 204 H229" stroke="#b4b4ba" stroke-width="1.5"/><circle cx="150" cy="238" r="3.5" fill="#6fc48a"/><rect x="132" y="276" width="36" height="5" rx="2.5" fill="#9c9ca3"/>
        <circle cx="86" cy="262" r="2.5" fill="#9c9ca3"/><circle cx="214" cy="262" r="2.5" fill="#9c9ca3"/>
        <path d="M84 180 Q150 166 216 180" stroke="#fff" stroke-width="3" fill="none" opacity=".85"/></g>`;
      else corpo = `<g transform="translate(0 30)"><path d="M118 70 a20 20 0 1 1 26 18 l-4 70 a8 8 0 0 1 -16 0 z" fill="url(#bc${i})" stroke="#bdbdc2"/>
        <path d="M182 70 a20 20 0 1 0 -26 18 l4 70 a8 8 0 0 0 16 0 z" fill="url(#bc${i})" stroke="#bdbdc2"/>
        <circle cx="128" cy="68" r="6" fill="#2a2a2e"/><circle cx="172" cy="68" r="6" fill="#2a2a2e"/>
        <rect x="96" y="160" width="108" height="104" rx="44" fill="url(#bc${i})" stroke="#c2c2c7"/>
        <path d="M97 192 H203" stroke="#b4b4ba" stroke-width="1.5"/><circle cx="150" cy="222" r="3.5" fill="#9c9ca3"/>
        <path d="M108 172 Q150 160 192 172" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/></g>`;
    } else if (t === "max") {
      corpo = `<path d="M84 190 C84 70 216 70 216 190" fill="none" stroke="${escuro}" stroke-width="16" stroke-linecap="round"/>
        <path d="M92 182 C94 92 206 92 208 182" fill="none" stroke="#2b2c30" stroke-width="7" opacity=".55"/>
        <rect x="58" y="160" width="62" height="108" rx="28" fill="url(#cp${i})"/><rect x="180" y="160" width="62" height="108" rx="28" fill="url(#cp${i})"/>
        <rect x="104" y="170" width="20" height="88" rx="10" fill="${tom(cor, -.4)}"/><rect x="176" y="170" width="20" height="88" rx="10" fill="${tom(cor, -.4)}"/>
        <path d="M66 180 Q70 166 90 164" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`;
    } else if (t === "airtag") {
      defs += `<radialGradient id="at${i}" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#f1f1f3"/><stop offset="1" stop-color="#cfd0d5"/></radialGradient>
        <linearGradient id="ai${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f4f6"/><stop offset=".45" stop-color="#9ea0a8"/><stop offset=".7" stop-color="#e6e7ea"/><stop offset="1" stop-color="#7d7f87"/></linearGradient>
        <linearGradient id="ar${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c79a4a"/><stop offset=".5" stop-color="#8a6326"/><stop offset="1" stop-color="#5b3f15"/></linearGradient>`;
      corpo = `<path d="M150 108 C150 40 230 26 238 86 C244 128 206 140 186 132" fill="none" stroke="url(#ar${i})" stroke-width="20" stroke-linecap="round"/>
        <path d="M156 104 C160 52 222 42 228 88" fill="none" stroke="#e7c27a" stroke-width="3" opacity=".6" stroke-linecap="round"/>
        <circle cx="150" cy="196" r="96" fill="url(#ar${i})"/><circle cx="150" cy="196" r="84" fill="url(#ai${i})"/>
        <circle cx="150" cy="196" r="76" fill="url(#at${i})" stroke="#d6d7db"/>
        <circle cx="150" cy="196" r="44" fill="none" stroke="#e2e3e6" stroke-width="2"/>
        <path d="M94 160 A68 68 0 0 1 176 126" stroke="#fff" stroke-width="7" fill="none" opacity=".95" stroke-linecap="round"/>
        <ellipse cx="122" cy="168" rx="18" ry="9" fill="#fff" opacity=".9" transform="rotate(-35 122 168)"/>`;
      cor = "#c9cacf";
    } else if (t === "fonte") {
      corpo = `<rect x="138" y="58" width="9" height="40" rx="3" fill="#b9b9bf"/><rect x="156" y="58" width="9" height="40" rx="3" fill="#b9b9bf"/>
        <rect x="96" y="92" width="112" height="124" rx="22" fill="url(#bc${i})" stroke="#c4c4c9"/>
        <rect x="136" y="180" width="32" height="12" rx="6" fill="#1b1b1e"/><path d="M104 106 Q150 96 200 106" stroke="#fff" stroke-width="3" fill="none"/>
        <path d="M152 216 C152 270 70 250 92 300 C104 326 180 322 214 296" fill="none" stroke="#f1f1f3" stroke-width="7" stroke-linecap="round"/>`;
    } else if (t === "cabo") {
      corpo = `<path d="M90 90 C40 140 60 230 150 230 C240 230 260 140 210 100 C170 70 110 110 130 160 C146 200 210 190 200 140" fill="none" stroke="#f1f1f3" stroke-width="8" stroke-linecap="round"/>
        <path d="M90 90 C40 140 60 230 150 230" fill="none" stroke="#c9c9cf" stroke-width="2" opacity=".6"/>
        <rect x="74" y="58" width="30" height="40" rx="8" fill="url(#bc${i})" stroke="#bdbdc3" transform="rotate(-35 89 78)"/>
        <rect x="190" y="104" width="22" height="34" rx="6" fill="url(#bc${i})" stroke="#bdbdc3"/><rect x="195" y="96" width="12" height="10" rx="2" fill="#d7c38a"/>`;
    } else if (t === "magsafe") {
      corpo = `<circle cx="150" cy="150" r="78" fill="url(#bc${i})" stroke="#c4c4c9"/><circle cx="150" cy="150" r="64" fill="#e9e9ec" stroke="#cfcfd4"/>
        <circle cx="150" cy="150" r="36" fill="none" stroke="#d2d2d7" stroke-width="3"/><path d="M98 112 A64 64 0 0 1 190 100" stroke="#fff" stroke-width="5" fill="none"/>
        <path d="M150 228 C150 280 200 290 240 320" fill="none" stroke="#f1f1f3" stroke-width="7" stroke-linecap="round"/>`;
    } else if (t === "capa") {
      const op = img.clara ? .28 : 1, st = img.clara ? '#ffffff' : tom(cor, -.3);
      corpo = `<rect x="70" y="16" width="160" height="308" rx="36" fill="url(#cp${i})" opacity="${op}" stroke="${st}" stroke-opacity=".8" stroke-width="${img.grossa ? 6 : 2}"/>
        <rect x="82" y="28" width="92" height="94" rx="25" fill="#0b0a09" opacity=".88"/><rect x="82" y="28" width="92" height="94" rx="25" fill="none" stroke="${img.clara ? "#fff" : tom(cor, .3)}" stroke-opacity=".7" stroke-width="2"/>
        ${img.ima ? `<circle cx="150" cy="190" r="50" fill="none" stroke="${img.clara ? "#ffffff" : tom(cor, .35)}" stroke-width="4" opacity=".8"/><rect x="146" y="246" width="8" height="20" rx="3" fill="${img.clara ? "#fff" : tom(cor, .35)}" opacity=".8"/>` : ""}
        ${img.grossa ? `<path d="M70 70 V52 A36 36 0 0 1 106 16 H124 M230 70 V52 A36 36 0 0 0 194 16 H176 M70 270 V288 A36 36 0 0 0 106 324 H124 M230 270 V288 A36 36 0 0 1 194 324 H176" fill="none" stroke="${tom(cor, .25)}" stroke-width="10" stroke-linecap="round"/>` : ""}
        <path d="M70 140 L230 60 L230 120 L70 210Z" fill="url(#br${i})" opacity=".6"/>`;
    } else if (t === "pelicula") {
      const tint = img.priv ? "#0d0d10" : "#ffffff", to = img.priv ? .7 : .07;
      corpo = `<g transform="rotate(-8 150 170)"><rect x="96" y="40" width="140" height="270" rx="28" fill="${tint}" opacity="${to}" stroke="#fff" stroke-opacity=".35" stroke-width="2"/></g>
        <rect x="74" y="28" width="148" height="286" rx="30" fill="${tint}" opacity="${img.priv ? .8 : .1}" stroke="#ffffff" stroke-opacity=".75" stroke-width="2"/>
        ${img.borda ? `<rect x="74" y="28" width="148" height="286" rx="30" fill="none" stroke="#0a0a0b" stroke-width="9"/>` : ""}
        <rect x="128" y="42" width="40" height="12" rx="6" fill="none" stroke="#fff" stroke-opacity=".6"/>
        <path d="M74 120 L222 50 L222 80 L74 160Z" fill="#fff" opacity=".22"/><path d="M74 190 L222 120 L222 132 L74 204Z" fill="#fff" opacity=".14"/>`;
    } else if (t === "s-tela") {
      corpo = telaCelular(i, `<path d="M168 120 L140 150 L150 176 L110 210 M140 150 L100 140 M150 176 L196 196 L210 240 M168 120 L190 92 M150 176 L136 250 L150 300 M110 210 L84 230" stroke="#f4ecd8" stroke-width="2" fill="none" opacity=".85"/><circle cx="148" cy="166" r="12" fill="#f4ecd8" opacity=".3"/>`);
    } else if (t === "s-bateria") {
      corpo = telaCelular(i, `<rect x="108" y="140" width="76" height="40" rx="9" fill="none" stroke="#e3b652" stroke-width="4"/><rect x="186" y="152" width="7" height="16" rx="2" fill="#e3b652"/>
        <rect x="114" y="146" width="56" height="28" rx="5" fill="#e3b652"/><text x="150" y="222" text-anchor="middle" font-family="Outfit,sans-serif" font-size="26" font-weight="700" fill="#f2d58e">100%</text>`);
    } else if (t === "s-conector") {
      corpo = `<rect x="40" y="70" width="220" height="140" rx="40" fill="url(#cp${i})"/><rect x="40" y="70" width="220" height="140" rx="40" fill="none" stroke="#fff" stroke-opacity=".3"/>
        <rect x="124" y="176" width="52" height="18" rx="9" fill="#08080a" stroke="#555" /><rect x="132" y="182" width="36" height="6" rx="3" fill="#d4c08a"/>
        ${[70, 82, 94, 206, 218, 230].map(x => `<circle cx="${x}" cy="185" r="3.5" fill="#1a1a1d"/>`).join("")}
        <rect x="128" y="236" width="44" height="18" rx="7" fill="#d9d9de"/><rect x="118" y="250" width="64" height="52" rx="14" fill="url(#bc${i})" stroke="#bdbdc2"/>
        <path d="M150 302 V340" stroke="#f1f1f3" stroke-width="10" stroke-linecap="round"/>`;
      cor = "#8d8f96"; sombraW = 0;
    } else if (t === "s-camera") {
      const c2 = "#2f3d5a";
      corpo = `<rect x="40" y="50" width="220" height="230" rx="56" fill="${tom(c2, .08)}" stroke="${tom(c2, .4)}"/>${lente(108, 116, 40, tom(c2, -.1))}${lente(108, 222, 40, tom(c2, -.1))}${lente(200, 168, 40, tom(c2, -.1))}
        <path d="M84 98 L132 140 M96 92 L118 130" stroke="#f4ecd8" stroke-width="2" opacity=".8"/><circle cx="214" cy="84" r="12" fill="#f3ead2"/>`;
    } else if (t === "s-agua") {
      corpo = telaCelular(i, `<path d="M150 120 C150 120 124 156 124 174 a26 26 0 0 0 52 0 C176 156 150 120 150 120Z" fill="#7fb2dd" opacity=".9"/><path d="M140 168 a10 10 0 0 0 8 14" stroke="#fff" stroke-width="3" fill="none"/>`) +
        `<path d="M232 90 c0 0 -10 14 -10 21 a10 10 0 0 0 20 0 c0 -7 -10 -21 -10 -21Z" fill="#7fb2dd" opacity=".8"/><path d="M62 230 c0 0 -9 12 -9 18 a9 9 0 0 0 18 0 c0 -6 -9 -18 -9 -18Z" fill="#7fb2dd" opacity=".7"/>`;
    } else if (t === "s-software") {
      corpo = telaCelular(i, `<circle cx="150" cy="170" r="42" fill="none" stroke="#3a3326" stroke-width="8"/><circle cx="150" cy="170" r="42" fill="none" stroke="#e3b652" stroke-width="8" stroke-dasharray="190 264" stroke-linecap="round" transform="rotate(-90 150 170)"/>
        <path d="M150 150 V184 M136 172 L150 186 L164 172" stroke="#f2d58e" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="108" y="240" width="84" height="8" rx="4" fill="#3a3326"/><rect x="108" y="240" width="58" height="8" rx="4" fill="#e3b652"/>`);
    }
    const sombra = sombraW ? `<ellipse cx="150" cy="330" rx="${sombraW}" ry="9" fill="#000" opacity=".75" filter="url(#sb${i})"/><ellipse cx="150" cy="327" rx="${sombraW * .78}" ry="4.5" fill="#000" opacity=".9" filter="url(#sc${i})"/>` : "";
    return `<svg class="ilu" viewBox="0 0 300 345" role="img" aria-label="Imagem ilustrativa" preserveAspectRatio="xMidYMid meet"><defs>${defs}</defs>${sombra}${corpo}</svg>`;
  }
  window.ILUSTRA = ilustra;
  function midia(p, cor, grande) {
    if (p.foto) return `<span class="foto-prod"><img src="${esc(p.foto)}" alt="${esc(p.nome)}" loading="lazy" decoding="async"></span><span class="ilus-selo">Imagem ilustrativa</span>`;
    return ilustra(p.img, cor) + `<span class="ilus-selo">Imagem ilustrativa</span>`;
  }

  /* ================= DADOS SIMPLES ================= */
  $$("[data-zap]").forEach(a => { a.href = zap(a.dataset.zap || "Olá, iPlanet Store! Vim pelo site e quero um orçamento."); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-tel]").forEach(el => el.textContent = L.whatsappVisivel);
  $$("[data-insta]").forEach(a => { a.href = L.instagram; a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-horario]").forEach(ul => ul.innerHTML = L.horario.map(h => `<li><span>${h.dias}</span><b>${h.horas}</b></li>`).join(""));
  const preencher = root => { $$("[data-campo]", root).forEach(el => { const v = L[el.dataset.campo]; if (v) { el.textContent = v; el.classList.remove("adef"); } }); $$("[data-se]", root).forEach(el => { if (!L[el.dataset.se]) el.remove(); }); };
  preencher(document);
  $$("[data-ano]").forEach(el => el.textContent = new Date().getFullYear());
  $$("[data-ilus]").forEach(el => { try { const o = JSON.parse(el.dataset.ilus); el.insertAdjacentHTML("afterbegin", ilustra(o, el.dataset.cor)); } catch (e) { } });
  $$("[data-mapa]").forEach(f => { if (L.endereco) f.src = "https://www.google.com/maps?q=" + encodeURIComponent(L.endereco) + "&output=embed"; });
  $$("[data-link-maps]").forEach(a => { a.href = L.linkMaps || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(L.endereco || "Sapezal, MT"); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-aberto]").forEach(el => {
    const d = new Date(), e = L.expediente[d.getDay()], h = d.getHours() + d.getMinutes() / 60;
    const ab = e && h >= e[0] && h < e[1];
    el.classList.add("aberto"); if (!ab) el.classList.add("fechado");
    el.textContent = ab ? `Aberto agora, até as ${e[1]}h` : "Fechado agora. Mande mensagem no WhatsApp";
  });
  const bt = $(".abrir-menu"), menu = $(".menu");
  if (bt) bt.addEventListener("click", () => { const a = menu.classList.toggle("aberto"); bt.setAttribute("aria-expanded", a); });

  /* ================= SACOLA DE ORÇAMENTO ================= */
  const CH = "iplanet-orcamento";
  let S = { itens: [], pag: "cartao", parc: "12", nome: "", troca: "", receb: "Retirar na loja" };
  try { const s = JSON.parse(localStorage.getItem(CH)); if (s && Array.isArray(s.itens)) S = Object.assign(S, s); } catch (e) { }
  const salvar = () => { try { localStorage.setItem(CH, JSON.stringify(S)); } catch (e) { } };

  document.body.insertAdjacentHTML("beforeend", `
  <button class="sacola-barra" type="button" aria-controls="sacola" aria-expanded="false"><span class="sb-n">0</span><span class="sb-t">Seu orçamento</span><span class="sb-v">Ver e enviar</span></button>
  <div class="sacola-fundo" hidden></div>
  <aside class="sacola" id="sacola" aria-label="Seu orçamento">
    <div class="sac-cab"><h2>Seu orçamento</h2><button class="sac-fechar" type="button" aria-label="Fechar orçamento">×</button></div>
    <div class="sac-corpo">
      <ul class="sac-lista"></ul>
      <p class="sac-vazia">Aparelho, capinha e conserto num pedido só: você recebe o preço de tudo junto, com as parcelas.</p>
      <div class="sac-campos">
        <div class="sac-linha"><fieldset><legend>Pagamento</legend>
          <label class="radio"><input type="radio" name="sac-pag" value="cartao"> Cartão</label>
          <label class="radio"><input type="radio" name="sac-pag" value="vista"> À vista</label>
        </fieldset>
        <label class="sac-parc">Parcelas<select name="sac-parc">${Array.from({ length: L.parcelasMax }, (_, k) => `<option value="${k + 1}">${k + 1}x</option>`).join("")}</select></label></div>
        <p class="sac-obs sac-vista" data-se="pagamentoOutros">Formas à vista: <span data-campo="pagamentoOutros"></span></p>
        <div class="sac-linha"><label>Como quer receber<select name="sac-receb"><option>Retirar na loja</option><option>Quero saber sobre entrega</option></select></label>
        <label>Seu nome<input name="sac-nome" autocomplete="name" placeholder="Seu nome"></label></div>
        <label>Aparelho para dar na troca (opcional)<input name="sac-troca" placeholder="Ex.: iPhone 13, 128 GB, bateria 85%"></label>
      </div>
    </div>
    <div class="sac-pe">
      <p class="sac-total"></p>
      <a class="btn btn-ouro btn-zap sac-enviar" target="_blank" rel="noopener">Enviar orçamento no WhatsApp</a>
      <button class="sac-limpar" type="button">Limpar orçamento</button>
    </div>
  </aside>
  <div class="aviso-add" role="status" aria-live="polite"></div>`);
  preencher($('.sacola'));

  const sac = $(".sacola"), barra = $(".sacola-barra"), fundo = $(".sacola-fundo"), lugar = $("[data-sacola-lugar]");
  const mqFixa = matchMedia("(min-width: 1100px)");
  function posicionar() {
    if (lugar && mqFixa.matches) { lugar.appendChild(sac); sac.classList.add("fixa"); fechar(); }
    else if (sac.parentElement !== document.body) { document.body.appendChild(sac); sac.classList.remove("fixa"); }
  }
  function abrir() { if (sac.classList.contains("fixa")) { sac.scrollIntoView({ behavior: "smooth", block: "start" }); return; } sac.classList.add("aberta"); const av = document.querySelector(".aviso-add"); if (av) av.classList.remove("on"); fundo.hidden = false; barra.setAttribute("aria-expanded", "true"); document.body.classList.add("trava"); }
  function fechar() { sac.classList.remove("aberta"); fundo.hidden = true; barra.setAttribute("aria-expanded", "false"); document.body.classList.remove("trava"); }
  if (lugar) { document.body.classList.add("tem-sacola-fixa"); posicionar(); mqFixa.addEventListener("change", posicionar); }
  barra.addEventListener("click", abrir); fundo.addEventListener("click", fechar); $(".sac-fechar").addEventListener("click", fechar);
  document.addEventListener("keydown", e => { if (e.key === "Escape") fechar(); });
  $$("[data-abrir-sacola]").forEach(b => b.addEventListener("click", e => { e.preventDefault(); abrir(); }));

  function precoItem(it) { const p = porId(it.id); return p && p.precos && p.precos[it.var] ? num(p.precos[it.var]) : 0; }
  function mensagem() {
    const ls = ["Olá, iPlanet Store! Montei este orçamento no site:", ""];
    S.itens.forEach((it, k) => ls.push(`${k + 1}) ${it.nome}${it.var ? " — " + it.var : ""}${it.cor ? " — " + it.cor : ""} — ${it.qtd} un.`));
    ls.push("");
    ls.push("Pagamento: " + (S.pag === "cartao" ? `cartão de crédito em ${S.parc}x` : "à vista"));
    ls.push("Recebimento: " + S.receb);
    if (S.troca.trim()) ls.push("Quero avaliar na troca: " + S.troca.trim());
    if (S.nome.trim()) ls.push("Nome: " + S.nome.trim());
    ls.push("", "Pode me passar o valor e as parcelas?");
    return ls.join("\n");
  }
  function render() {
    const n = S.itens.reduce((a, b) => a + b.qtd, 0);
    $(".sb-n").textContent = n;
    barra.classList.toggle("tem", n > 0);
    document.body.classList.toggle("sacola-com-itens", n > 0);
    $(".sac-lista").innerHTML = S.itens.map((it, k) => {
      const p = porId(it.id), cor = p && p.cores && (p.cores.find(c => c[0] === it.cor) || [])[1];
      const mini = p ? (p.foto ? `<img src="${esc(p.foto)}" alt="" width="56" height="56" style="object-fit:contain">` : ilustra(p.img, cor)) : (it.tipo === "servico" ? ilustra((SERVS.find(s => s.id === it.id) || {}).img || { t: "s-tela" }) : "");
      return `<li><div class="sac-mini">${mini}</div><div class="sac-info"><b>${esc(it.nome)}</b><span>${esc([it.var, it.cor].filter(Boolean).join(" · "))}</span>
        <div class="qtd"><button type="button" data-q="-1" data-k="${k}" aria-label="Diminuir">−</button><span>${it.qtd}</span><button type="button" data-q="1" data-k="${k}" aria-label="Aumentar">+</button>
        <button type="button" class="rem" data-rem="${k}">Remover</button></div></div></li>`;
    }).join("");
    $(".sac-vazia").hidden = n > 0; $(".sac-campos").hidden = n === 0; $(".sac-pe").hidden = n === 0;
    $$('input[name="sac-pag"]').forEach(r => r.checked = r.value === S.pag);
    $('select[name="sac-parc"]').value = S.parc; $('select[name="sac-receb"]').value = S.receb;
    $('input[name="sac-troca"]').value = S.troca; $('input[name="sac-nome"]').value = S.nome;
    $(".sac-parc").hidden = S.pag !== "cartao"; { const sv = $(".sac-vista"); if (sv) sv.hidden = S.pag !== "vista"; }
    const soma = S.itens.reduce((a, it) => a + precoItem(it) * it.qtd, 0), todos = S.itens.every(it => precoItem(it));
    $(".sac-total").innerHTML = soma && todos ? `Total à vista ${brl(soma)}${S.pag === "cartao" ? ` · ${S.parc}x de ${brl(parcela(soma, +S.parc))}` : ""}` : `Preço sob consulta <small>A loja responde com o valor e as parcelas no WhatsApp.</small>`;
    $(".sac-enviar").href = zap(mensagem());
    $$("[data-sacola-n]").forEach(el => el.textContent = n);
  }
  sac.addEventListener("click", e => {
    const q = e.target.closest("[data-q]"), r = e.target.closest("[data-rem]");
    if (q) { const it = S.itens[+q.dataset.k]; it.qtd = Math.max(1, Math.min(20, it.qtd + +q.dataset.q)); }
    else if (r) S.itens.splice(+r.dataset.rem, 1);
    else if (e.target.closest(".sac-limpar")) S.itens = [];
    else return;
    salvar(); render();
  });
  sac.addEventListener("input", e => {
    const t = e.target;
    if (t.name === "sac-pag") S.pag = t.value; else if (t.name === "sac-parc") S.parc = t.value; else if (t.name === "sac-receb") S.receb = t.value;
    else if (t.name === "sac-troca") S.troca = t.value; else if (t.name === "sac-nome") S.nome = t.value; else return;
    salvar();
    if (t.name === "sac-pag") render(); else { $(".sac-enviar").href = zap(mensagem()); if (t.name === "sac-parc") render(); }
  });
  const marcaRolou = () => document.body.classList.toggle("rolou", scrollY > 80); addEventListener("scroll", marcaRolou, { passive: true }); marcaRolou();
  const aviso = $(".aviso-add"); let tAviso;
  function adicionar(item) {
    const ex = S.itens.find(i => i.id === item.id && i.var === item.var && i.cor === item.cor);
    if (ex) ex.qtd = Math.min(20, ex.qtd + 1); else S.itens.push(Object.assign({ qtd: 1 }, item));
    salvar(); render();
    aviso.innerHTML = `<span class="av-t"><b>${esc(item.nome)}</b> entrou no orçamento</span><button type="button" data-abrir>Ver orçamento</button>`;
    aviso.classList.add("on"); clearTimeout(tAviso); tAviso = setTimeout(() => aviso.classList.remove("on"), 3200);
    barra.classList.remove("pulsa"); void barra.offsetWidth; barra.classList.add("pulsa");
  }
  aviso.addEventListener("click", e => { if (e.target.closest("[data-abrir]")) { aviso.classList.remove("on"); abrir(); } });
  window.ADICIONAR = adicionar;

  /* ================= CARDS DE PRODUTO ================= */
  function card(p) {
    const cor = p.cores[0], v0 = p.var.valores[0], longo = p.var.valores.length > 5;
    const ops = longo
      ? `<label class="op op-sel"><span class="op-rot">${esc(p.var.rotulo)}</span><select data-var>${p.var.valores.map(v => `<option>${esc(v)}</option>`).join("")}</select></label>`
      : `<div class="op"><span class="op-rot">${esc(p.var.rotulo)}</span><div class="chips">${p.var.valores.map((v, k) => `<button type="button" class="chip" data-var-v="${esc(v)}" aria-pressed="${k === 0}">${esc(v)}</button>`).join("")}</div></div>`;
    const cores = p.cores.length ? `<div class="op"><span class="op-rot">Cor: <b data-cor-nome>${esc(cor[0])}</b></span><div class="dots">${p.cores.map((c, k) => `<button type="button" class="dot" style="--c:${c[1]}" data-cor="${esc(c[0])}" data-hex="${c[1]}" aria-label="${esc(c[0])}" aria-pressed="${k === 0}"></button>`).join("")}</div></div>` : "";
    return `<article class="prod revela" data-id="${p.id}" data-cat="${p.cat}">
      <div class="prod-img">${midia(p, cor && cor[1])}</div>${p.credito ? `<p class="credito">${esc(p.credito)}</p>` : ""}
      <div class="prod-info">
        <p class="prod-cat">${esc(catNome(p.cat))}</p>
        <h3>${esc(p.nome)}</h3>
        <p class="prod-txt">${esc(p.texto)}</p>
        ${ops}${cores}
        <dl class="prod-dados${p.condicao ? "" : " um"}">${p.condicao ? `<div><dt>Condição</dt><dd>${esc(p.condicao)}</dd></div>` : ""}<div><dt>Preço</dt><dd data-preco>${precoHTML(p.precos[v0])}</dd></div></dl>
        <button type="button" class="btn btn-ouro add">Adicionar ao orçamento</button>
      </div></article>`;
  }
  function ligarCards(box) {
    box.addEventListener("click", e => {
      const art = e.target.closest(".prod"); if (!art) return;
      const p = porId(art.dataset.id);
      const ch = e.target.closest("[data-var-v]"), dt = e.target.closest(".dot"), add = e.target.closest(".add");
      if (ch) { $$("[data-var-v]", art).forEach(b => b.setAttribute("aria-pressed", b === ch)); atualizaPreco(art, p); }
      if (dt) {
        $$(".dot", art).forEach(b => b.setAttribute("aria-pressed", b === dt)); $("[data-cor-nome]", art).textContent = dt.dataset.cor;
        if (!p.foto) $(".prod-img", art).innerHTML = midia(p, dt.dataset.hex);
      }
      if (add) adicionar({ id: p.id, nome: p.nome, var: varSel(art), cor: (($(".dot[aria-pressed=true]", art) || {}).dataset || {}).cor || "", tipo: "produto" });
    });
    box.addEventListener("change", e => { if (e.target.matches("[data-var]")) { const art = e.target.closest(".prod"); atualizaPreco(art, porId(art.dataset.id)); } });
  }
  const varSel = art => { const s = $("[data-var]", art); return s ? s.value : (($("[data-var-v][aria-pressed=true]", art) || {}).dataset || {}).varV || ""; };
  function atualizaPreco(art, p) {
    const pr = p.precos[varSel(art)];
    $("[data-preco]", art).innerHTML = pr ? `${brl(num(pr))}<small>ou ${L.parcelasMax}x de ${brl(parcela(num(pr), L.parcelasMax))}</small>` : ADEF;
  }
  $$("[data-catalogo]").forEach(box => {
    const filtro = box.dataset.catalogo;
    const lista = filtro === "destaques" ? PRODS.filter(p => p.destaque) : PRODS;
    box.innerHTML = lista.map(card).join("");
    ligarCards(box);
  });
  // filtros do catálogo
  $$("[data-filtros]").forEach(f => {
    const alvo = $(f.dataset.filtros), extra = f.dataset.extra ? JSON.parse(f.dataset.extra) : [];
    const cats = [{ id: "todos", nome: "Todos" }].concat(extra, window.CATEGORIAS);
    f.innerHTML = cats.map((c, k) => `<button type="button" class="filtro" data-f="${c.id}" aria-pressed="${k === 0}">${esc(c.nome)}</button>`).join("");
    const aplicar = id => {
      $$(".filtro", f).forEach(b => b.setAttribute("aria-pressed", b.dataset.f === id));
      $$("[data-cat]", alvo).forEach(el => el.hidden = !(id === "todos" || el.dataset.cat === id));
    };
    f.addEventListener("click", e => { const b = e.target.closest(".filtro"); if (b) { aplicar(b.dataset.f); history.replaceState(null, "", "#" + b.dataset.f); } });
    const h = location.hash.slice(1); if (cats.some(c => c.id === h)) aplicar(h);
  });

  /* ================= SERVIÇOS ================= */
  $$("[data-servicos]").forEach(box => {
    box.innerHTML = SERVS.map(s => `<article class="serv revela" id="s-${s.id}">
      <div class="serv-img">${ilustra(s.img)}<span class="ilus-selo">Imagem ilustrativa</span></div>
      <div class="serv-info"><h3>${esc(s.nome)}</h3><p>${esc(s.texto)}</p>
        <dl class="prod-dados${s.prazo && s.garantia ? " tres" : " um"}">${s.prazo ? `<div><dt>Prazo</dt><dd>${esc(s.prazo)}</dd></div>` : ""}<div><dt>Valor</dt><dd>${s.preco ? brl(num(s.preco)) : "Sob consulta, na avaliação"}</dd></div>${s.garantia ? `<div><dt>Garantia</dt><dd>${esc(s.garantia)}</dd></div>` : ""}</dl>
        <div class="serv-acoes"><button type="button" class="btn btn-ouro" data-orcar="${s.id}">Orçar este conserto</button><button type="button" class="btn btn-linha" data-add-serv="${s.id}">Adicionar ao orçamento</button></div>
      </div></article>`).join("");
    box.addEventListener("click", e => {
      const o = e.target.closest("[data-orcar]"), a = e.target.closest("[data-add-serv]");
      if (o) { const f = $("[data-form-conserto]"); if (f) { f.defeito.value = SERVS.find(s => s.id === o.dataset.orcar).nome; f.scrollIntoView({ behavior: "smooth", block: "start" }); setTimeout(() => f.modelo.focus({ preventScroll: true }), 500); } }
      if (a) { const s = SERVS.find(x => x.id === a.dataset.addServ); adicionar({ id: s.id, nome: s.nome, var: "", cor: "", tipo: "servico" }); }
    });
  });
  $$("[data-etapas]").forEach(el => { if (window.ETAPAS_CONSERTO) { el.textContent = window.ETAPAS_CONSERTO; el.classList.remove("adef"); } });

  /* ================= FORMULÁRIOS → WHATSAPP ================= */
  $$("[data-opcoes-modelo]").forEach(s => s.innerHTML = window.MODELOS_IPHONE.map(m => `<option>${esc(m)}</option>`).join(""));
  $$("[data-opcoes-defeito]").forEach(s => s.innerHTML = SERVS.map(x => `<option>${esc(x.nome)}</option>`).join("") + "<option>Outro defeito</option>");
  $$("[data-form-conserto]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const t = ["Olá, iPlanet Store! Quero orçar um conserto:", "", "Aparelho: " + f.modelo.value, "Defeito: " + f.defeito.value];
    if (f.detalhe.value.trim()) t.push("O que acontece: " + f.detalhe.value.trim());
    if (f.nome.value.trim()) t.push("Nome: " + f.nome.value.trim());
    window.open(zap(t.join("\n")), "_blank", "noopener");
  }));
  $$("[data-form-contato]").forEach(f => f.addEventListener("submit", e => {
    e.preventDefault();
    const t = ["Olá, iPlanet Store! Vim pelo site.", "", "Assunto: " + f.assunto.value];
    if (f.msg.value.trim()) t.push(f.msg.value.trim());
    if (f.nome.value.trim()) t.push("Nome: " + f.nome.value.trim());
    window.open(zap(t.join("\n")), "_blank", "noopener");
  }));

  /* ================= TABELA DE PREÇOS ================= */
  $$("[data-tabela-precos]").forEach(box => {
    let h = "";
    window.CATEGORIAS.forEach(c => {
      const ps = PRODS.filter(p => p.cat === c.id); if (!ps.length) return;
      h += `<section class="tab-cat revela" id="tab-${c.id}"><h3>${esc(c.nome)}</h3><div class="tab-rola"><table><thead><tr><th scope="col">Produto</th><th scope="col">${esc(ps[0].var.rotulo)}</th><th scope="col">À vista</th><th scope="col">Em até ${L.parcelasMax}x</th><th scope="col"><span class="sr">Ação</span></th></tr></thead><tbody>`;
      ps.forEach(p => {
        const vals = p.var.rotulo === "Para o modelo" ? ["Todos os modelos"] : p.var.valores;
        vals.forEach((v, k) => {
          const pr = p.precos[v];
          h += `<tr>${k === 0 ? `<th scope="row" rowspan="${vals.length}"><span class="tab-ilu">${p.foto ? `<img src="${esc(p.foto)}" alt="" width="44" height="44" style="object-fit:contain">` : ilustra(p.img, p.cores[0] && p.cores[0][1])}</span>${esc(p.nome)}</th>` : ""}
            <td data-l="${esc(ps[0].var.rotulo)}">${esc(v)}</td><td data-l="À vista">${precoHTML(pr)}</td><td data-l="Em até ${L.parcelasMax}x">${pr ? `${L.parcelasMax}x de ${brl(parcela(num(pr), L.parcelasMax))}` : "No orçamento"}</td>
            <td class="acao"><button type="button" class="mini-add" data-tab-add="${p.id}" data-v="${esc(v === "Todos os modelos" ? p.var.valores[0] : v)}" aria-label="Adicionar ${esc(p.nome)} ${esc(v)} ao orçamento">+ Orçamento</button></td></tr>`;
        });
      });
      h += `</tbody></table></div></section>`;
    });
    h += `<section class="tab-cat revela" id="tab-servicos"><h3>Assistência técnica</h3><div class="tab-rola"><table><thead><tr><th scope="col">Conserto</th><th scope="col">Prazo</th><th scope="col">Valor</th><th scope="col">Garantia</th><th scope="col"><span class="sr">Ação</span></th></tr></thead><tbody>
      ${SERVS.map(s => `<tr><th scope="row">${esc(s.nome)}</th><td data-l="Prazo">${campo(s.prazo, "Na avaliação")}</td><td data-l="Valor">${precoHTML(s.preco)}</td><td data-l="Garantia">${campo(s.garantia, "No orçamento")}</td><td class="acao"><button type="button" class="mini-add" data-tab-serv="${s.id}">+ Orçamento</button></td></tr>`).join("")}</tbody></table></div></section>`;
    box.innerHTML = h;
    box.addEventListener("click", e => {
      const a = e.target.closest("[data-tab-add]"), s = e.target.closest("[data-tab-serv]");
      if (a) { const p = porId(a.dataset.tabAdd); adicionar({ id: p.id, nome: p.nome, var: a.dataset.v, cor: p.cores[0] ? p.cores[0][0] : "", tipo: "produto" }); }
      if (s) { const x = SERVS.find(y => y.id === s.dataset.tabServ); adicionar({ id: x.id, nome: x.nome, var: "", cor: "", tipo: "servico" }); }
    });
  });

  /* ================= SIMULADOR DE PARCELAS ================= */
  $$("[data-simulador]").forEach(box => {
    const mini = box.dataset.simulador === "mini";
    box.innerHTML = `<div class="sim-form">
        <label>Valor à vista do produto<span class="sim-campo"><span>R$</span><input type="text" inputmode="decimal" value="${box.dataset.valor || "2000"}" aria-label="Valor à vista em reais"></span></label>
        ${mini ? "" : `<label>Parcelas<select>${Array.from({ length: L.parcelasMax }, (_, k) => `<option value="${k + 1}"${k + 1 === 12 ? " selected" : ""}>${k + 1}x</option>`).join("")}</select></label>`}
      </div>
      <div class="sim-res" aria-live="polite"></div>
      ${mini ? "" : `<div class="tab-rola"><table class="sim-tab"><thead><tr><th scope="col">Parcelas</th><th scope="col">Valor da parcela</th><th scope="col" class="sim-tcol">Total</th></tr></thead><tbody></tbody></table></div>`}
      ${window.TAXAS_SAO_EXEMPLO ? `<p class="sim-aviso">Simulação com taxas de exemplo. O valor final é confirmado no orçamento pelo WhatsApp.</p>` : `<p class="sim-aviso">Simulação. O valor final é confirmado no orçamento.</p>`}`;
    const inp = $("input", box), sel = $("select", box);
    const calc = () => {
      const v = num(inp.value) || 0, n = sel ? +sel.value : L.parcelasMax;
      $(".sim-res", box).innerHTML = v ? `<span class="sim-n">${n}x de</span><strong>${brl(parcela(v, n))}</strong><span class="sim-t">Total no cartão ${brl(parcela(v, n) * n)}</span>` : `<span class="sim-t">Digite o valor à vista para ver as parcelas.</span>`;
      const tb = $("tbody", box);
      if (tb) tb.innerHTML = v ? Array.from({ length: L.parcelasMax }, (_, k) => `<tr${k + 1 === n ? ' class="sel"' : ""}><td>${k + 1}x</td><td>${brl(parcela(v, k + 1))}<small class="sim-tot">Total ${brl(parcela(v, k + 1) * (k + 1))}</small></td><td class="sim-tcol">${brl(parcela(v, k + 1) * (k + 1))}</td></tr>`).join("") : "";
    };
    inp.addEventListener("input", calc); if (sel) sel.addEventListener("change", calc); calc();
  });

  /* ================= GALERIA ================= */
  $$("[data-galeria]").forEach(box => {
    const lim = +box.dataset.galeria || 0;
    let itens = window.GALERIA.map(g => ({ foto: g, cat: g.cat === "loja" ? "loja" : g.cat, titulo: g.titulo, texto: g.texto, prod: g.produto }));
    if (!lim) itens = itens.concat(PRODS.map(p => ({ p, cat: p.cat, titulo: p.nome, texto: p.texto, prod: p.id })));
    else itens = itens.filter(it => !(box.dataset.pular || "").split(",").includes(it.foto && it.foto.arquivo)).slice(0, lim);
    box.innerHTML = itens.map((it, k) => `<figure class="gal-item${it.foto ? " gal-foto" : ""} revela" data-cat="${it.cat}">
        <button type="button" class="gal-abrir" data-k="${k}" aria-label="Ampliar: ${esc(it.titulo)}">${it.foto ? `<img src="${it.foto.arquivo}" alt="${esc(it.titulo)}" width="${it.foto.largura}" height="${it.foto.altura}" loading="lazy">` : midia(it.p, it.p.cores[0] && it.p.cores[0][1])}</button>
        <figcaption><b>${esc(it.titulo)}</b><span>${esc(it.texto)}</span>${it.p && it.p.credito ? `<small class="credito">${esc(it.p.credito)}</small>` : ""}</figcaption>
        ${lim ? "" : (it.prod ? `<button type="button" class="btn btn-ouro btn-p" data-quero="${it.prod}">Quero este</button>` : `<a class="btn btn-linha btn-p" href="${zap("Olá, iPlanet Store! Vi a galeria do site e quero saber o que tem na loja hoje.")}" target="_blank" rel="noopener">Perguntar o que tem hoje</a>`)}
      </figure>`).join("") + (lim ? "" : `<div class="gal-item gal-pede revela"><div class="gal-pede-in"><b>Não achou o seu?</b><p>Diga o modelo, a memória e a cor: a loja responde se tem e passa o valor e as parcelas.</p><a class="btn btn-ouro btn-zap" href="${zap("Olá, iPlanet Store! Não achei na galeria o que procuro. Vocês têm...")}" target="_blank" rel="noopener">Peça pelo WhatsApp</a></div></div>`);
    if (lim) return;
    const pede = $(".gal-pede", box);
    const encaixa = () => { if (!pede) return; pede.style.gridColumn = ""; const cols = getComputedStyle(box).gridTemplateColumns.split(" ").filter(Boolean).length; const n = $$(".gal-item:not(.gal-pede)", box).filter(el => !el.hidden).length; const sobra = cols - (n % cols); pede.style.gridColumn = cols > 1 ? `span ${sobra}` : ""; };
    encaixa(); addEventListener("resize", encaixa); document.addEventListener("click", e => { if (e.target.closest(".filtro")) setTimeout(encaixa, 0); });
    const dlg = document.createElement("dialog"); dlg.className = "lupa"; document.body.appendChild(dlg);
    box.addEventListener("click", e => {
      const q = e.target.closest("[data-quero]"), ab = e.target.closest(".gal-abrir");
      if (q) { const p = porId(q.dataset.quero); adicionar({ id: p.id, nome: p.nome, var: p.var.valores[0], cor: p.cores[0] ? p.cores[0][0] : "", tipo: "produto" }); }
      if (ab) {
        const it = itens[+ab.dataset.k];
        dlg.innerHTML = `<div class="lupa-img">${it.foto ? `<img src="${it.foto.arquivo}" alt="${esc(it.titulo)}" width="360" height="640">` : midia(it.p, it.p.cores[0] && it.p.cores[0][1])}${it.p && it.p.credito ? `<p class="credito lupa-cred">${esc(it.p.credito)}</p>` : ""}</div>
          <div class="lupa-txt"><h2>${esc(it.titulo)}</h2><p>${esc(it.texto)}</p>${it.p ? `<p class="lupa-op">${esc(it.p.var.rotulo)}: ${esc(it.p.var.valores.slice(0, 5).join(" · "))}</p>` : ""}
          ${it.prod ? `<button type="button" class="btn btn-ouro" data-quero-l="${it.prod}">Quero este</button>` : ""}<button type="button" class="btn btn-linha" data-fechar>Fechar</button></div>`;
        dlg.showModal();
      }
    });
    dlg.addEventListener("click", e => {
      if (e.target === dlg || e.target.closest("[data-fechar]")) dlg.close();
      const q = e.target.closest("[data-quero-l]");
      if (q) { const p = porId(q.dataset.queroL); adicionar({ id: p.id, nome: p.nome, var: p.var.valores[0], cor: p.cores[0] ? p.cores[0][0] : "", tipo: "produto" }); dlg.close(); }
    });
  });

  /* ================= ENTRADAS SUAVES ================= */
  const els = $$(".revela");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("vis"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -6% 0px" });
    els.forEach(el => io.observe(el));
    setTimeout(() => els.forEach(el => el.classList.add("vis")), 2500);
  } else els.forEach(el => el.classList.add("vis"));


  // indicador dos trilhos que rolam de lado no celular
  function trilhos() {
    $$(".grade-prod.dest, .cats, .gal-prev").forEach(t => {
      let d = t.nextElementSibling;
      if (!d || !d.classList.contains("trilho-dica")) { d = document.createElement("div"); d.className = "trilho-dica"; d.setAttribute("aria-hidden", "true"); t.after(d); }
      const itens = [...t.children].filter(c => c.offsetParent && c.tagName !== "NOSCRIPT");
      if (t.scrollWidth <= t.clientWidth + 4 || itens.length < 2) { d.hidden = true; return; }
      d.hidden = false;
      d.innerHTML = '<span class="trilho-dots">' + itens.map(() => "<i></i>").join("") + "</span><span>Arraste para o lado →</span>";
      const pts = [...d.querySelectorAll("i")];
      const marca = () => { const x = t.scrollLeft, max = t.scrollWidth - t.clientWidth; const k = max <= 0 ? 0 : Math.round(x / max * (itens.length - 1)); pts.forEach((p, i) => p.classList.toggle("on", i === k)); };
      marca(); if (!t._trilho) { t._trilho = 1; t.addEventListener("scroll", marca, { passive: true }); }
    });
  }
  setTimeout(trilhos, 400); addEventListener("resize", () => { clearTimeout(trilhos._t); trilhos._t = setTimeout(trilhos, 200); });
  render();
})();
