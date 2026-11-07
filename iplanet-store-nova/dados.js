/* =========================================================
   DADOS DA LOJA — iPlanet Store (Sapezal-MT)
   Tudo o que muda no site sai daqui. Veja COMO-EDITAR.md.
   Campo vazio ("") aparece no site como "a definir".
   ========================================================= */

window.LOJA = {
  nome: "iPlanet Store",
  cidade: "Sapezal - MT",
  desde: 2025,
  whatsapp: "5565998078968",
  whatsappVisivel: "(65) 99807-8968",
  instagram: "https://www.instagram.com/iplanetstore.sapezal",
  instagramUsuario: "@iplanetstore.sapezal",
  parcelasMax: 18,

  /* ---- A DEFINIR: o Marcelo preenche ---- */
  endereco: "",        // ex.: "Av. Tal, 123 - Centro, Sapezal - MT"
  comoChegar: "",      // ex.: "Em frente à praça"
  linkMaps: "",        // link do Google Maps da loja
  garantia: "",        // ex.: "90 dias da loja"
  seminovo: "",        // ex.: "Sim, revisados" ou "Não"
  troca: "",           // ex.: "Aceitamos seu aparelho como parte do pagamento"
  entrega: "",         // ex.: "Retirada na loja; entrega em Sapezal"
  prazoAssistencia: "",// ex.: "Bateria e tela no mesmo dia, com peça em estoque"
  pagamento: "",       // ex.: "Pix, dinheiro e cartão"

  horario: [
    { dias: "Segunda a sexta", horas: "9h às 18h" },
    { dias: "Sábado", horas: "9h às 13h" },
    { dias: "Domingo", horas: "Fechado" }
  ],
  // 0 = domingo ... 6 = sábado. [abre, fecha] em horas.
  expediente: { 0: null, 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 13] }
};

/* ---------- iPhones ----------
   cores e memórias = opções de fábrica. A loja confirma o que tem no WhatsApp.
   precos: { "256 GB": "7999" }. Vazio = "sob consulta".
   img: recorte em img/produtos. Vazio = "imagem a definir". */
window.IPHONES = [
  { id: "17-pro-max", nome: "iPhone 17 Pro Max", tela: "6,9\"", cameras: "3 traseiras", img: "img/produtos/iphone-17-pro-max.webp", presilha: true,
    memorias: ["256 GB", "512 GB", "1 TB", "2 TB"], cores: [["Prata", "#d9d9d6"], ["Laranja cósmico", "#d3672f"], ["Azul intenso", "#2e3a55"]], precos: {} },
  { id: "17-pro", nome: "iPhone 17 Pro", tela: "6,3\"", cameras: "3 traseiras", img: "img/produtos/iphone-17-pro.webp",
    memorias: ["256 GB", "512 GB", "1 TB"], cores: [["Prata", "#d9d9d6"], ["Laranja cósmico", "#d3672f"], ["Azul intenso", "#2e3a55"]], precos: {} },
  { id: "air", nome: "iPhone Air", tela: "6,5\"", cameras: "1 traseira", img: "img/produtos/iphone-air.webp", presilha: true,
    memorias: ["256 GB", "512 GB", "1 TB"], cores: [["Preto espacial", "#1d1d1f"], ["Branco nuvem", "#f2f1ed"], ["Dourado claro", "#e8d9b5"], ["Azul céu", "#c9dcec"]], precos: {} },
  { id: "17", nome: "iPhone 17", tela: "6,3\"", cameras: "2 traseiras", img: "img/produtos/iphone-17.webp", presilha: true,
    memorias: ["256 GB", "512 GB"], cores: [["Preto", "#232323"], ["Branco", "#f4f4f2"], ["Azul névoa", "#a9bdd3"], ["Lavanda", "#c9b8dc"], ["Sálvia", "#b9c6a8"]], precos: {} },
  { id: "16", nome: "iPhone 16", tela: "6,1\"", cameras: "2 traseiras", img: "",
    memorias: ["128 GB", "256 GB", "512 GB"], cores: [["Preto", "#2a2a2a"], ["Branco", "#f2f2f0"], ["Rosa", "#f0c3cf"], ["Verde-acinzentado", "#b7cbbf"], ["Ultramarino", "#5767c9"]], precos: {} },
  { id: "16e", nome: "iPhone 16e", tela: "6,1\"", cameras: "1 traseira", img: "",
    memorias: ["128 GB", "256 GB", "512 GB"], cores: [["Preto", "#2a2a2a"], ["Branco", "#f2f2f0"]], precos: {} },
  { id: "15", nome: "iPhone 15", tela: "6,1\"", cameras: "2 traseiras", img: "img/produtos/iphone-15.webp",
    memorias: ["128 GB", "256 GB", "512 GB"], cores: [["Preto", "#2b2c2e"], ["Azul", "#cfdbe3"], ["Verde", "#d3dfcf"], ["Amarelo", "#f1e7bf"], ["Rosa", "#ead2d6"]], precos: {} }
];

/* ---------- Acessórios (usados no montador de orçamento) ---------- */
window.ACESSORIOS = [
  { id: "capinha", nome: "Capinha", nota: "para o seu modelo" },
  { id: "pelicula", nome: "Película", nota: "vidro para a tela" },
  { id: "magsafe", nome: "Carregador MagSafe", nota: "encaixe magnético" },
  { id: "fonte", nome: "Fonte de tomada", nota: "carga rápida USB-C" },
  { id: "cabo", nome: "Cabo USB-C", nota: "reposição ou reserva" },
  { id: "airpods", nome: "AirPods", nota: "4, Pro ou Max" },
  { id: "airtag", nome: "AirTag", nota: "para chave, mochila, mala" },
  { id: "ipad", nome: "iPad", nota: "base, Air ou Pro" }
];

/* ---------- Assistência ----------
   prazo e garantia vazios = "a definir". */
window.SERVICOS = [
  { id: "tela", nome: "Troca de tela", nota: "Vidro trincado, toque falhando, manchas.", prazo: "", garantia: "" },
  { id: "bateria", nome: "Troca de bateria", nota: "Descarrega rápido, desliga sozinho, saúde baixa.", prazo: "", garantia: "" },
  { id: "conector", nome: "Conector de carga", nota: "Só carrega em uma posição ou não carrega.", prazo: "", garantia: "" },
  { id: "camera", nome: "Câmera", nota: "Foto tremida, mancha na lente, câmera preta.", prazo: "", garantia: "" },
  { id: "tampa", nome: "Tampa traseira", nota: "Vidro de trás quebrado.", prazo: "", garantia: "" },
  { id: "botoes", nome: "Botões e som", nota: "Volume, liga/desliga, alto-falante, microfone.", prazo: "", garantia: "" },
  { id: "diagnostico", nome: "Diagnóstico", nota: "Não sabe o que é? Traga que a gente olha.", prazo: "", garantia: "" }
];

/* ---------- Simulador de parcelas ----------
   EXEMPLO! Troque pelas taxas reais da maquininha.
   taxa = acréscimo total em % para cada número de parcelas. */
window.TAXAS_EXEMPLO = true;
window.TAXAS = { 1: 0, 2: 4.6, 3: 5.9, 4: 7.1, 5: 8.3, 6: 9.5, 7: 10.7, 8: 11.9, 9: 13.0, 10: 14.2, 11: 15.3, 12: 16.4, 13: 17.5, 14: 18.6, 15: 19.7, 16: 20.8, 17: 21.8, 18: 22.9 };
