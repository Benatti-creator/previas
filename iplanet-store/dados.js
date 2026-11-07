/* =========================================================
   DADOS DA LOJA — iPlanet Store (Sapezal-MT)
   Tudo o que aparece no site sai daqui. Veja COMO-EDITAR.md.
   Regra: campo vazio ("") aparece no site como a etiqueta "A definir".
   ========================================================= */

window.LOJA = {
  nome: "iPlanet Store",
  cidade: "Sapezal - MT",
  desde: 2025,
  whatsapp: "5565998078968",          // só números, com 55 + DDD
  whatsappVisivel: "(65) 99807-8968",
  instagram: "https://www.instagram.com/iplanetstore.sapezal",
  instagramUsuario: "@iplanetstore.sapezal",
  parcelasMax: 18,

  /* ---- CAMPOS "A DEFINIR" (o Marcelo preenche) ---- */
  endereco: "",            // ex.: "Av. Tal, 123 - Centro, Sapezal - MT"
  linkMaps: "",            // link do Google Maps da loja
  comoChegar: "",          // ex.: "Em frente à praça, ao lado do banco X"
  notaGoogle: "",          // ex.: "4,9 (32 avaliações)"
  garantiaProdutos: "",    // ex.: "90 dias da loja + garantia Apple"
  retirada: "",            // ex.: "Retire na loja no mesmo dia"
  entrega: "",             // ex.: "Entregamos em Sapezal sem custo"
  pagamentoOutros: "",     // além do cartão. ex.: "Pix e dinheiro"

  horario: [
    { dias: "Segunda a sexta", horas: "9h às 18h" },
    { dias: "Sábado", horas: "9h às 13h" },
    { dias: "Domingo", horas: "Fechado" }
  ],
  // Para o aviso "aberto agora": 0=domingo ... 6=sábado. [abre, fecha] em horas.
  expediente: { 0: null, 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 13] }
};

/* ---------- Categorias do catálogo ---------- */
window.CATEGORIAS = [
  { id: "iphone", nome: "iPhones" },
  { id: "ipad", nome: "iPad" },
  { id: "airpods", nome: "AirPods" },
  { id: "airtag", nome: "AirTag" },
  { id: "carregador", nome: "Carregadores e cabos" },
  { id: "capinha", nome: "Capinhas" },
  { id: "pelicula", nome: "Películas" }
];

/* ---------- Catálogo ----------
   LISTA DE EXEMPLO: o Marcelo confirma o que tem.
   var.valores  = memórias ou opções do produto.
   precos       = { "256 GB": "7999" }  (só números). Vazio = "A definir".
   condicao     = "Novo", "Lacrado" ou "Seminovo". Vazio = "A definir".
   cores        = [nome, cor em hex] — a bolinha e a cor da imagem ilustrativa.
   foto         = caminho da foto real (ex.: "img/iphone-17-pro.webp"). Vazio = imagem ilustrativa.
   img          = desenho ilustrativo (não mexer). */
window.MODELOS_IPHONE = ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone Air", "iPhone 17", "iPhone 16", "iPhone 16e", "iPhone 15", "Outro modelo"];
var MI = window.MODELOS_IPHONE;

window.PRODUTOS = [
  { id: "iphone-17-pro-max", cat: "iphone", nome: "iPhone 17 Pro Max", destaque: true,
    texto: "A bateria que mais dura da linha e a tela maior, para quem vive no celular.",
    var: { rotulo: "Memória", valores: ["256 GB", "512 GB", "1 TB", "2 TB"] }, precos: {},
    cores: [["Laranja-cósmico", "#d8743c"], ["Azul-profundo", "#2f3d5a"], ["Prateado", "#d8d9dc"]],
    condicao: "", foto: "img/produtos/iphone-17-pro-max.webp", credito: "Foto: Ahmad Ali Karim, CC0, via Wikimedia Commons", img: { t: "iphone", cam: "pro" } },
  { id: "iphone-17-pro", cat: "iphone", nome: "iPhone 17 Pro", destaque: true,
    texto: "Câmera tripla de nível Pro num tamanho que cabe no bolso da calça.",
    var: { rotulo: "Memória", valores: ["256 GB", "512 GB", "1 TB"] }, precos: {},
    cores: [["Azul-profundo", "#2f3d5a"], ["Laranja-cósmico", "#d8743c"], ["Prateado", "#d8d9dc"]],
    condicao: "", foto: "img/produtos/iphone-17-pro.webp", credito: "Foto: Olgierd Rudak, CC0, via Wikimedia Commons", img: { t: "iphone", cam: "pro" } },
  { id: "iphone-air", cat: "iphone", nome: "iPhone Air", destaque: true,
    texto: "O mais fino e leve: some no bolso e não pesa na mão.",
    var: { rotulo: "Memória", valores: ["256 GB", "512 GB", "1 TB"] }, precos: {},
    cores: [["Azul-céu", "#c6d9ea"], ["Dourado-claro", "#e6d5b0"], ["Branco-nuvem", "#eeece6"], ["Preto-espacial", "#2a2b2f"]],
    condicao: "", foto: "img/produtos/iphone-air.webp", credito: "Foto: Ahmad Ali Karim, CC0, via Wikimedia Commons", img: { t: "iphone", cam: "air" } },
  { id: "iphone-17", cat: "iphone", nome: "iPhone 17", destaque: true,
    texto: "Tela de 120 Hz e 256 GB de entrada: espaço de sobra para foto e vídeo.",
    var: { rotulo: "Memória", valores: ["256 GB", "512 GB"] }, precos: {},
    cores: [["Lavanda", "#cbbde0"], ["Sálvia", "#b7c6a3"], ["Azul-névoa", "#a8bed6"], ["Branco", "#f1f1ee"], ["Preto", "#2b2b2d"]],
    condicao: "", foto: "img/produtos/iphone-17.webp", credito: "Foto: Ahmad Ali Karim, CC0, via Wikimedia Commons", img: { t: "iphone", cam: "duo" } },
  { id: "iphone-16", cat: "iphone", nome: "iPhone 16",
    texto: "Botão de câmera e chip rápido por um valor menor que a linha nova.",
    var: { rotulo: "Memória", valores: ["128 GB", "256 GB", "512 GB"] }, precos: {},
    cores: [["Ultramarino", "#5d70de"], ["Verde-acinzentado", "#a8c4b5"], ["Rosa", "#efb8ce"], ["Branco", "#f2f1ec"], ["Preto", "#2c2c2e"]],
    condicao: "", foto: "img/produtos/iphone-16.webp", credito: "Foto: メイド理世, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "iphone", cam: "duo" } },
  { id: "iphone-16e", cat: "iphone", nome: "iPhone 16e",
    texto: "A porta de entrada para o iPhone, com bateria que aguenta o dia.",
    var: { rotulo: "Memória", valores: ["128 GB", "256 GB", "512 GB"] }, precos: {},
    cores: [["Branco", "#f2f1ee"], ["Preto", "#2b2b2d"]],
    condicao: "", foto: "img/produtos/iphone-16e.webp", credito: "Foto: 茅野ふたば, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "iphone", cam: "uno" } },
  { id: "iphone-15", cat: "iphone", nome: "iPhone 15",
    texto: "Câmera de 48 MP e USB-C: carrega com o mesmo cabo do notebook.",
    var: { rotulo: "Memória", valores: ["128 GB", "256 GB", "512 GB"] }, precos: {},
    cores: [["Rosa", "#ebc9d1"], ["Azul", "#c6d5df"], ["Verde", "#cddbc9"], ["Amarelo", "#f0e3ae"], ["Preto", "#35373b"]],
    condicao: "", foto: "img/produtos/iphone-15.webp", credito: "Foto: ThePhotoGraphIc, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "iphone", cam: "diag" } },

  { id: "ipad", cat: "ipad", nome: "iPad",
    texto: "Tela grande para estudar, desenhar e ver série sem forçar a vista.",
    var: { rotulo: "Memória", valores: ["128 GB", "256 GB", "512 GB"] }, precos: {},
    cores: [["Azul", "#a9c3dc"], ["Rosa", "#e9bccb"], ["Amarelo", "#efdc8f"], ["Prateado", "#d8d9dc"]],
    condicao: "", foto: "img/produtos/ipad.webp", credito: "Foto: 茅野ふたば, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "ipad" } },
  { id: "ipad-air", cat: "ipad", nome: "iPad Air",
    texto: "Leve para levar na bolsa e forte para editar foto e trabalhar.",
    var: { rotulo: "Memória", valores: ["128 GB", "256 GB", "512 GB", "1 TB"] }, precos: {},
    cores: [["Azul", "#9fb7cf"], ["Roxo", "#b9a9cf"], ["Estelar", "#e8e1d4"], ["Cinza-espacial", "#55575c"]],
    condicao: "", foto: "img/produtos/ipad-air.webp", credito: "Foto: 茅野ふたば, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "ipad" } },
  { id: "ipad-pro", cat: "ipad", nome: "iPad Pro",
    texto: "O iPad mais potente, para quem desenha, edita vídeo ou troca o notebook.",
    var: { rotulo: "Memória", valores: ["256 GB", "512 GB", "1 TB", "2 TB"] }, precos: {},
    cores: [["Preto-espacial", "#2a2b2f"], ["Prateado", "#d8d9dc"]],
    condicao: "", foto: "img/produtos/ipad-pro.webp", credito: "Foto: 彭家杰, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "ipad", cam: "pro" } },
  { id: "ipad-mini", cat: "ipad", nome: "iPad mini",
    texto: "Cabe numa mão: leitura, mapa e anotação em qualquer lugar.",
    var: { rotulo: "Memória", valores: ["128 GB", "256 GB", "512 GB"] }, precos: {},
    cores: [["Roxo", "#b9a9cf"], ["Estelar", "#e8e1d4"], ["Azul", "#9fb7cf"], ["Cinza-espacial", "#55575c"]],
    condicao: "", foto: "", img: { t: "ipad", mini: true } },

  { id: "airpods-4", cat: "airpods", nome: "AirPods 4",
    texto: "Pareia com o iPhone em um toque e troca sozinho para o iPad.",
    var: { rotulo: "Versão", valores: ["Sem cancelamento de ruído", "Com cancelamento de ruído"] }, precos: {},
    cores: [], condicao: "", foto: "img/produtos/airpods-4.webp", credito: "Foto: AppleFans 1, CC0, via Wikimedia Commons", img: { t: "airpods" } },
  { id: "airpods-pro", cat: "airpods", nome: "AirPods Pro",
    texto: "Cancelamento de ruído para a academia, o ônibus e a máquina barulhenta.",
    var: { rotulo: "Versão", valores: ["Geração atual"] }, precos: {},
    cores: [], condicao: "", foto: "img/produtos/airpods-pro.webp", credito: "Foto: Hajoon0102, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "airpods", pro: true } },
  { id: "airpods-max", cat: "airpods", nome: "AirPods Max",
    texto: "Fone de cabeça com som cheio para quem passa horas ouvindo.",
    var: { rotulo: "Versão", valores: ["USB-C"] }, precos: {},
    cores: [["Meia-noite", "#3a3d45"], ["Estelar", "#e8e1d4"], ["Azul", "#8fa9c4"], ["Laranja", "#e59a6b"], ["Roxo", "#b3a3c9"]],
    condicao: "", foto: "img/produtos/airpods-max.webp", credito: "Foto: Arne Müseler, CC BY-SA 3.0 de, via Wikimedia Commons", img: { t: "max" } },

  { id: "airtag", cat: "airtag", nome: "AirTag",
    texto: "Na chave, na mochila ou na mala: você vê no mapa onde ficou.",
    var: { rotulo: "Embalagem", valores: ["1 unidade", "4 unidades"] }, precos: {},
    cores: [], condicao: "", foto: "img/produtos/airtag.webp", credito: "Foto: ajay_suresh, CC BY 2.0, via Wikimedia Commons", img: { t: "airtag" } },

  { id: "fonte-20w", cat: "carregador", nome: "Fonte USB-C 20W",
    texto: "Carrega rápido o iPhone e o iPad, sem esquentar o aparelho.",
    var: { rotulo: "Opção", valores: ["Só a fonte", "Fonte + cabo USB-C"] }, precos: {},
    cores: [], condicao: "", foto: "", img: { t: "fonte" } },
  { id: "cabo", cat: "carregador", nome: "Cabo de carga",
    texto: "Lightning ou USB-C: sai com o cabo do seu modelo, sem errar na compra.",
    var: { rotulo: "Tipo", valores: ["USB-C para USB-C", "USB-C para Lightning"] }, precos: {},
    cores: [], condicao: "", foto: "img/produtos/cabo.webp", credito: "Foto: Fructibus, CC0, via Wikimedia Commons", img: { t: "cabo" } },
  { id: "magsafe", cat: "carregador", nome: "Carregador MagSafe",
    texto: "Encostou, grudou e carregou: sem cabo pendurado na mesa.",
    var: { rotulo: "Opção", valores: ["MagSafe"] }, precos: {},
    cores: [], condicao: "", foto: "img/produtos/magsafe.webp", credito: "Foto: James Tamim, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "magsafe" } },

  { id: "capinha-transparente", cat: "capinha", nome: "Capinha transparente",
    texto: "Mostra a cor do seu iPhone e protege a câmera na queda.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [["Transparente", "#dfe6ea"]], condicao: "", foto: "img/produtos/capinha-transparente.webp", credito: "Foto: Panamitsu, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "capa", clara: true } },
  { id: "capinha-silicone", cat: "capinha", nome: "Capinha de silicone",
    texto: "Toque macio que não escorrega da mão.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [["Areia", "#d9c7a6"], ["Azul", "#4d6a93"], ["Rosa", "#e7a9b9"], ["Verde", "#7b9a7f"], ["Preto", "#26262a"]],
    condicao: "", foto: "", img: { t: "capa" } },
  { id: "capinha-magsafe", cat: "capinha", nome: "Capinha MagSafe",
    texto: "Com ímã: funciona no carregador MagSafe e no suporte do carro.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [["Transparente", "#dfe6ea"], ["Preto", "#26262a"]], condicao: "", foto: "img/produtos/capinha-magsafe.webp", credito: "Foto: 茅野ふたば, CC BY-SA 4.0, via Wikimedia Commons", img: { t: "capa", ima: true } },
  { id: "capinha-antiimpacto", cat: "capinha", nome: "Capinha antiimpacto",
    texto: "Borda reforçada para quem trabalha na rua e deixa o celular cair.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [["Preto", "#26262a"], ["Fumê", "#6b6f75"]], condicao: "", foto: "", img: { t: "capa", grossa: true } },

  { id: "pelicula-vidro", cat: "pelicula", nome: "Película de vidro",
    texto: "Do tamanho certo da tela, para o vidro não trincar na primeira queda.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [], condicao: "", foto: "img/produtos/pelicula-vidro.webp", credito: "Foto: unwire.hk, Public domain, via Wikimedia Commons", img: { t: "pelicula" } },
  { id: "pelicula-3d", cat: "pelicula", nome: "Película 3D",
    texto: "Cobre a tela até a borda e não descola nos cantos.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [], condicao: "", foto: "", img: { t: "pelicula", borda: true } },
  { id: "pelicula-privacidade", cat: "pelicula", nome: "Película privacidade",
    texto: "Quem está do lado não lê a sua tela no ônibus nem na fila.",
    var: { rotulo: "Para o modelo", valores: MI }, precos: {},
    cores: [], condicao: "", foto: "", img: { t: "pelicula", priv: true } }
];

/* ---------- Assistência técnica ----------
   prazo, preco e garantia: vazio = "A definir" até o Marcelo confirmar. */
window.SERVICOS = [
  { id: "tela", nome: "Troca de tela", texto: "Tela trincada, com mancha ou que não responde ao toque tem troca de tela na própria loja.", prazo: "", preco: "", garantia: "", img: { t: "s-tela" } },
  { id: "bateria", nome: "Troca de bateria", texto: "Bateria que não segura o dia volta a aguentar do café à noite.", prazo: "", preco: "", garantia: "", img: { t: "s-bateria" } },
  { id: "conector", nome: "Conector de carga", texto: "Cabo que só carrega torto volta a encaixar e carregar de primeira.", prazo: "", preco: "", garantia: "", img: { t: "s-conector" } },
  { id: "camera", nome: "Câmera e vidro da câmera", texto: "Foto embaçada ou lente rachada: troca da câmera ou do vidro da lente.", prazo: "", preco: "", garantia: "", img: { t: "s-camera" } },
  { id: "agua", nome: "Aparelho que molhou", texto: "Aparelho que molhou tem mais chance de voltar quanto mais cedo chega à loja.", prazo: "", preco: "", garantia: "", img: { t: "s-agua" } },
  { id: "software", nome: "Sistema e backup", texto: "Atualização travada, iCloud, fotos e contatos passados para o aparelho novo.", prazo: "", preco: "", garantia: "", img: { t: "s-software" } }
];

/* Como funciona o conserto: escreva as etapas reais. Vazio = "A definir". */
window.ETAPAS_CONSERTO = "";

/* ---------- Taxas do cartão ----------
   EXEMPLO — trocar pelas taxas reais da maquininha.
   Número = % que entra sobre o valor à vista. Ex.: 12: 14.9 => 12x com 14,9% a mais. */
window.TAXAS = {
  1: 0, 2: 4.6, 3: 5.6, 4: 6.6, 5: 7.6, 6: 8.6,
  7: 9.9, 8: 10.9, 9: 11.9, 10: 12.9, 11: 13.9, 12: 14.9,
  13: 16.2, 14: 17.2, 15: 18.2, 16: 19.2, 17: 20.2, 18: 21.2
};
window.TAXAS_SAO_EXEMPLO = true; // mude para false quando colocar as taxas reais

/* ---------- Fotos reais da loja (pasta img/) ---------- */
window.GALERIA = [
  { arquivo: "img/fachada.webp", titulo: "Loja de porta aberta em Sapezal", texto: "Compra, venda e conserto no mesmo balcão, desde 2025.", cat: "loja", largura: 360, altura: 640 },
  { arquivo: "img/mesa-produtos.webp", titulo: "iPhone, iPad, AirPods e AirTag no mesmo balcão", texto: "Aparelho, fone e AirTag saem juntos, num orçamento só.", cat: "loja", largura: 360, altura: 640 },
  { arquivo: "img/caixa-ipad.webp", titulo: "iPad para estudo e trabalho", texto: "Tela grande para aula, planilha e desenho.", cat: "ipad", produto: "ipad-pro", largura: 360, altura: 640 },
  { arquivo: "img/iphone-detalhe.webp", titulo: "iPhone na bancada da loja", texto: "Diga o modelo e a memória: o valor do dia chega no WhatsApp.", cat: "iphone", largura: 360, altura: 640 }
];
