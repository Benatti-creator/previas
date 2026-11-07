/* =========================================================
   DADOS DA LOJA — iPlanet Store (Sapezal-MT)
   Tudo o que muda no site está aqui. Veja COMO-EDITAR.md.
   Campo vazio ("") aparece no site como a etiqueta "a definir".
   ========================================================= */

window.LOJA = {
  nome: "iPlanet Store",
  cidade: "Sapezal-MT",
  desde: 2025,
  dono: "Marcelo",
  whatsapp: "5565998078968",            // só números: 55 + DDD + número
  whatsappVisivel: "(65) 99807-8968",
  instagram: "https://www.instagram.com/iplanetstore.sapezal",
  instagramUsuario: "@iplanetstore.sapezal",
  parcelasMax: 18,

  /* ---- A DEFINIR (preencha entre as aspas) ---- */
  endereco: "",        // ex.: "Av. Tal, 123 - Centro"
  linkMaps: "https://www.google.com/maps?q=Sapezal,+MT",
  garantia: "",        // ex.: "90 dias"
  entrega: "",         // ex.: "Retirada na loja ou entrega em Sapezal"

  horario: [
    { dias: "Segunda a sexta", horas: "9h às 18h" },
    { dias: "Sábado", horas: "9h às 13h" },
    { dias: "Domingo", horas: "Fechado" }
  ],
  // 0 = domingo ... 6 = sábado. [abre, fecha]
  expediente: { 0: null, 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 13] }
};

/* Tamanho original das fotos (para não esticar). Não precisa mexer. */
window.FOTOS = {
  "air-cores": [1600, 1143], "air-perfil": [1600, 1143], "airpods-familia": [1600, 900],
  "airpods-max-cores": [1600, 1066], "airpods-pro3": [1306, 1306], "airpods4": [1600, 900],
  "bateria-magsafe": [1306, 1828], "familia": [1600, 1143], "i16e-cores": [1306, 1306],
  "i16e-frente-verso": [1306, 1306], "i17-capa-silicone": [1306, 1828], "i17-cores": [1600, 773],
  "i17-hero": [1306, 1828], "ipad-air": [1600, 900], "pro-camera": [1600, 900],
  "pro-capa-silicone": [1306, 1828], "pro-capa-transp": [1306, 1828], "pro-cores": [1306, 1306],
  "pro-laranja": [1306, 1306], "familia-crop": [1379, 798], "air-cores-crop": [1230, 1060], "air-tile": [360, 1030], "airpods4-crop": [874, 810]
};

/* ---------- iPhones ----------
   preco: "" mostra "sob consulta".
   foto: nome da foto em img/oficiais (sem o -800.webp). escuro: true = foto de fundo preto. */
window.IPHONES = [
  {
    id: "17-pro-max", nome: "iPhone 17 Pro Max", curto: "17 Pro Max", preco: "",
    foto: "pro-cores", escuro: true, fotoTile: "pro-laranja", tileEscuro: true,
    frase: "A maior tela da linha.",
    cores: [["Azul profundo", "#2B3A55"], ["Laranja cósmico", "#E0732F"], ["Prateado", "#D9D9D6"]],
    gb: [256, 512, 1024, 2048],
    tela: "6,9\" Super Retina XDR, ProMotion 120 Hz", chip: "A19 Pro",
    camera: "Três câmeras de 48 MP (teleobjetiva 4x)", bateria: "consulte"
  },
  {
    id: "17-pro", nome: "iPhone 17 Pro", curto: "17 Pro", preco: "",
    foto: "pro-laranja", escuro: true, fotoTile: "pro-capa-transp",
    frase: "O conjunto Pro de câmeras num tamanho que cabe na mão.",
    cores: [["Azul profundo", "#2B3A55"], ["Laranja cósmico", "#E0732F"], ["Prateado", "#D9D9D6"]],
    gb: [256, 512, 1024],
    tela: "6,3\" Super Retina XDR, ProMotion 120 Hz", chip: "A19 Pro",
    camera: "Três câmeras de 48 MP (teleobjetiva 4x)", bateria: "consulte"
  },
  {
    id: "air", nome: "iPhone Air", curto: "Air", preco: "",
    foto: "air-cores", fotoTile: "air-tile",
    frase: "5,6 mm de espessura. Some no bolso.",
    cores: [["Azul-céu", "#BFD3E6"], ["Dourado-claro", "#E8DCC3"], ["Branco-nuvem", "#F1F1EF"], ["Preto-espacial", "#2A2A2C"]],
    gb: [256, 512, 1024],
    tela: "6,5\" Super Retina XDR, ProMotion 120 Hz", chip: "A19 Pro",
    camera: "Câmera Fusion de 48 MP", bateria: "consulte"
  },
  {
    id: "17", nome: "iPhone 17", curto: "17", preco: "",
    foto: "i17-hero", fotoTile: "i17-hero",
    frase: "Tela de 120 Hz e 256 GB já no modelo de entrada.",
    cores: [["Lavanda", "#CFC3E6"], ["Azul-névoa", "#A9BFD6"], ["Preto", "#2A2A2C"], ["Branco", "#F1F1EF"], ["Sálvia", "#B9C9B0"]],
    gb: [256, 512],
    tela: "6,3\" Super Retina XDR, ProMotion 120 Hz", chip: "A19",
    camera: "Duas câmeras de 48 MP", bateria: "consulte"
  },
  {
    id: "16e", nome: "iPhone 16e", curto: "16e", preco: "",
    foto: "i16e-frente-verso", fotoTile: "i16e-cores",
    frase: "A porta de entrada para o iPhone, com chip atual.",
    cores: [["Branco", "#F1F1EF"], ["Preto", "#2A2A2C"]],
    gb: [128, 256, 512],
    tela: "6,1\" Super Retina XDR", chip: "A18",
    camera: "Câmera Fusion de 48 MP", bateria: "consulte"
  }
];

/* ---------- Acessórios e outros produtos ---------- */
window.ACESSORIOS = [
  { id: "airpods-pro-3", nome: "AirPods Pro 3", grupo: "AirPods", foto: "airpods-pro3", texto: "Cancelamento de ruído ativo e estojo com alto-falante para achar.", preco: "" },
  { id: "airpods-4", nome: "AirPods 4", grupo: "AirPods", foto: "airpods4-crop", texto: "Formato aberto, leve, com versão com cancelamento de ruído.", preco: "" },
  { id: "airpods-max", nome: "AirPods Max", grupo: "AirPods", foto: "airpods-max-cores", texto: "Fone over-ear, em cinco cores.", preco: "" },
  { id: "ipad", nome: "iPad Air", grupo: "iPad", foto: "ipad-air", texto: "Consulte tamanho, cor e armazenamento.", preco: "" },
  { id: "capa-silicone-pro", nome: "Capinha de silicone 17 Pro", grupo: "Capinhas", foto: "pro-capa-silicone", texto: "Silicone macio, com MagSafe.", preco: "" },
  { id: "capa-transp-pro", nome: "Capinha transparente 17 Pro", grupo: "Capinhas", foto: "pro-capa-transp", texto: "Mostra a cor do aparelho.", preco: "" },
  { id: "capa-silicone-17", nome: "Capinha de silicone 17", grupo: "Capinhas", foto: "i17-capa-silicone", texto: "Para o iPhone 17, em várias cores.", preco: "" },
  { id: "bateria-magsafe", nome: "Bateria MagSafe", grupo: "Energia", foto: "bateria-magsafe", texto: "Encaixa atrás do iPhone Air e carrega no bolso.", preco: "" }
];

/* Itens sem foto (aparecem como cartões com ícone) */
window.ITENS_ICONE = [
  { nome: "Carregadores", icone: "plug", texto: "Para o seu iPhone, AirPods ou iPad. Diga o modelo." },
  { nome: "Cabos", icone: "cable", texto: "Do tipo certo para o seu aparelho." },
  { nome: "Películas", icone: "smartphone", texto: "Para o seu modelo de iPhone." },
  { nome: "AirTag", icone: "tag", texto: "Também temos AirTag. Consulte." }
];

/* ---------- Assistência técnica ----------
   prazo: "" aparece como "a definir". */
window.SERVICOS = [
  { nome: "Troca de tela", icone: "smartphone", texto: "Vidro trincado, toque falhando ou manchas.", prazo: "" },
  { nome: "Troca de bateria", icone: "battery", texto: "Descarrega rápido ou desliga sozinho.", prazo: "" },
  { nome: "Conector de carga", icone: "plug", texto: "Não carrega ou só carrega em uma posição.", prazo: "" },
  { nome: "Câmera", icone: "camera", texto: "Foto embaçada, tremendo ou tela preta.", prazo: "" },
  { nome: "Traseira de vidro", icone: "layers", texto: "Vidro de trás quebrado.", prazo: "" },
  { nome: "Diagnóstico", icone: "search", texto: "Não sabe o que é? A gente abre e olha.", prazo: "" }
];

window.FAQ = [
  { p: "Quanto custa o conserto?", r: "Depende do modelo e da peça. Mande uma foto e o modelo no WhatsApp e passamos o valor." },
  { p: "Quanto tempo demora?", r: "O prazo de cada serviço ainda está a definir. Informamos na hora do orçamento." },
  { p: "Tem garantia no serviço?", r: "A garantia ainda está a definir. Confirme no orçamento." },
  { p: "Preciso deixar o aparelho na loja?", r: "Para a maioria dos serviços, sim. Combine o horário pelo WhatsApp." },
  { p: "Vocês consertam iPhone antigo?", r: "Consulte pelo WhatsApp com o modelo exato." }
];

/* ---------- Parcelamento ----------
   EXEMPLO: troque pelas taxas reais da maquininha (% sobre o valor). */
window.TAXAS_EXEMPLO = {
  1: 0, 2: 4.5, 3: 5.5, 4: 6.5, 5: 7.5, 6: 8.5, 7: 9.5, 8: 10.5, 9: 11.5,
  10: 12.5, 11: 13.5, 12: 14.5, 13: 15.5, 14: 16.5, 15: 17.5, 16: 18.5, 17: 19.5, 18: 20.5
};
