// Placeholder / simulated institutional content for the JSPV portal.
// All copy is fictional placeholder material as indicated by the design brief.

import habitatgeImg from "@/assets/news/parc-public-habitatge.jpg";
import educacioImg from "@/assets/news/defensa-educacio-publica.jpg";
import danaImg from "@/assets/news/resposta-dana-generacio-de-ferro.jpg";
import congresImg from "@/assets/news/xiv-congres-alcoi-marcos-dura.jpg";
import feminismeImg from "@/assets/news/feminisme-eix-transversal.jpg";
import memoriaImg from "@/assets/news/memoria-democratica-valencia.jpg";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "El Partit", href: "/partit" },
  { label: "Actualitat", href: "/actualitat" },
  { label: "En les Institucions", href: "/institucions" },
  { label: "Campanyes", href: "/campanyes" },
];

export const CONTACT = {
  email: "info@jspv.es",
  organitzacio: "organitzacio@jspv.es",
  premsa: "premsa@jspv.es",
  adreca: "Carrer de Blanqueries, 4 · 46003 València",
  instagram: { handle: "@jovesocialistes", url: "https://instagram.com/jovesocialistes" },
  x: { handle: "@JSPV_Valencia", url: "https://x.com/JSPV_Valencia" },
};

export interface NewsItem {
  slug: string;
  title: string;
  category: "Habitatge" | "Educació" | "Emergències" | "Organització" | "Feminisme" | "Memòria";
  date: string;
  iso: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: string[];
}

export const NEWS: NewsItem[] = [
  {
    slug: "parc-public-habitatge",
    title: "JSPV exigeix un parc públic d'habitatge: la vivenda és un dret, no un negoci",
    category: "Habitatge",
    date: "15 de juny de 2026",
    iso: "2026-06-15",
    excerpt:
      "Davant la crisi que expulsa la joventut dels seus barris, proposem un pla de xoc per a l'emancipació i la regulació dels lloguers abusius.",
    image: habitatgeImg,
    imageAlt: "Blocs d'habitatges residencials en una ciutat valenciana",
    body: [
      "La crisi de l'habitatge s'ha convertit en la principal barrera per a l'emancipació de la joventut valenciana. Joves Socialistes del País Valencià reclama un parc públic d'habitatge accessible i una regulació decidida dels preus del lloguer en les zones tensionades.",
      "La proposta inclou la mobilització de sòl públic per a promoció en règim de lloguer assequible, ajudes directes a l'emancipació i la persecució dels usos especulatius que buiden els centres històrics de les nostres ciutats.",
      "«L'habitatge és un dret reconegut, no un actiu financer. La nostra generació no pot acceptar que la independència vital depenga del codi postal on naixes», assenyala la nova executiva sorgida del XIV Congrés.",
    ],
  },
  {
    slug: "defensa-educacio-publica",
    title: "En defensa de l'educació pública: no als retalls de la Conselleria",
    category: "Educació",
    date: "10 de juny de 2026",
    iso: "2026-06-10",
    excerpt:
      "L'educació pública valenciana és la columna vertebral de la igualtat d'oportunitats. No permetrem que patisca retalls.",
    image: educacioImg,
    imageAlt: "Aula lluminosa d'un centre educatiu públic",
    body: [
      "L'educació pública és la principal eina de transformació social i d'igualtat d'oportunitats. JSPV acompanya les mobilitzacions de la comunitat educativa enfront de les retallades pressupostàries impulsades pel Consell.",
      "Defensem una xarxa pública forta, beques suficients i unes condicions laborals dignes per al professorat. La igualtat comença a les aules i es construïx cada dia.",
    ],
  },
  {
    slug: "resposta-dana-generacio-de-ferro",
    title: "La resposta de la DANA: la generació de ferro que es va emplenar de fang",
    category: "Emergències",
    date: "2 de juny de 2026",
    iso: "2026-06-02",
    excerpt:
      "Quan altres van fugir, la joventut valenciana va estar en primera línia ajudant els pobles afectats. No som la generació de cristall.",
    image: danaImg,
    imageAlt: "Voluntaris retirant fang d'un carrer després de les inundacions",
    body: [
      "La gestió de la DANA va demostrar que la joventut valenciana no és la «generació de cristall» que alguns descriuen. Milers de joves es van emplenar de fang per ajudar la ciutadania davant la inacció institucional.",
      "Reivindiquem eixa solidaritat com a senya d'identitat: una «generació de ferro» que no abandona i que exigix institucions a l'altura de les emergències climàtiques.",
    ],
  },
  {
    slug: "xiv-congres-alcoi-marcos-dura",
    title: "XIV Congrés Nacional a Alcoi: nova executiva, nou impuls per al País Valencià",
    category: "Organització",
    date: "7 de juny de 2026",
    iso: "2026-06-07",
    excerpt:
      "Marcos Durà és elegit Secretari General amb una Comissió Executiva Nacional renovada per vertebrar el territori comarca a comarca.",
    image: congresImg,
    imageAlt: "Sala d'assemblea durant un congrés polític",
    body: [
      "El XIV Congrés Nacional, celebrat a Alcoi els dies 6 i 7 de juny de 2026, va culminar amb l'elecció de Marcos Durà com a Secretari General de JSPV.",
      "La nova Comissió Executiva Nacional aposta per l'escolta activa i la vertebració territorial, comarca a comarca, com a eixos de l'etapa que comença.",
    ],
  },
  {
    slug: "feminisme-eix-transversal",
    title: "Feminisme com a eix transversal: cap pas enrere en igualtat",
    category: "Feminisme",
    date: "28 de maig de 2026",
    iso: "2026-05-28",
    excerpt:
      "La igualtat real entre dones i homes vertebra tota la nostra acció política. La defensem en cada institució i en cada carrer.",
    image: feminismeImg,
    imageAlt: "Manifestació feminista amb pancartes en un carrer",
    body: [
      "El feminisme és un eix transversal de la nostra acció política. JSPV treballa per polítiques públiques que garantisquen la igualtat real i combatisquen les violències masclistes.",
      "Reivindiquem una agenda feminista valenta que no admeta passos enrere ni en drets ni en recursos.",
    ],
  },
  {
    slug: "memoria-democratica-valencia",
    title: "Memòria democràtica: dignitat, veritat i reparació",
    category: "Memòria",
    date: "20 de maig de 2026",
    iso: "2026-05-20",
    excerpt:
      "Defensem la memòria democràtica com a fonament d'una societat lliure que coneix i respecta la seua història.",
    image: memoriaImg,
    imageAlt: "Monument commemoratiu de la memòria democràtica amb flors",
    body: [
      "La memòria democràtica és un pilar de la convivència. JSPV impulsa polítiques de veritat, justícia i reparació per a les víctimes de la dictadura.",
      "Conéixer la nostra història és la millor garantia per a defensar la democràcia present i futura.",
    ],
  },
];

export interface ExecutiveMember {
  name: string;
  role: string;
  area: string;
}

export const EXECUTIVE_CORE: ExecutiveMember[] = [
  { name: "Marcos Durà Gimeno", role: "Secretaria General", area: "Nucli de Direcció" },
  { name: "Itziar Lafita Balaguer", role: "Organització", area: "Nucli de Direcció" },
  { name: "Francisco José Hidalgo Vidal", role: "Presidència", area: "Nucli de Direcció" },
  { name: "Iván López Sánchez", role: "1a Vicesec. d'Habitatge", area: "Vicesecretaries Generals" },
  { name: "Rocío Vila Soriano", role: "2a Vicesec. d'Educació", area: "Vicesecretaries Generals" },
];

export const EXECUTIVE_FULL: ExecutiveMember[] = [
  { name: "Marcos Durà Gimeno", role: "Secretaria General", area: "Nucli de Direcció" },
  { name: "Itziar Lafita Balaguer", role: "Organització", area: "Nucli de Direcció" },
  { name: "Francisco José Hidalgo Vidal", role: "Presidència", area: "Nucli de Direcció" },
  { name: "Leire Juan Checa", role: "Portaveu", area: "Nucli de Direcció" },
  { name: "Iván López Sánchez", role: "1a Vicesec. d'Habitatge", area: "Vicesecretaries Generals" },
  { name: "Rocío Vila Soriano", role: "2a Vicesec. d'Educació", area: "Vicesecretaries Generals" },
  { name: "Héctor Giner González", role: "3a Vicesec. de Municipalisme", area: "Vicesecretaries Generals" },
  { name: "José Luis Bravo Josemaría", role: "Vicesec. d'Organització", area: "Coordinació i Estratègia" },
  { name: "Rafael Coloma Francés", role: "Acció Política i Estratègia Electoral", area: "Coordinació i Estratègia" },
  { name: "Pedro Sabaté Roca", role: "Administració", area: "Coordinació i Estratègia" },
  { name: "María Márquez Bonmatí", role: "Igualtat", area: "Drets i Inclusió" },
  { name: "Alejandro Ruiz Cortés", role: "LGTBIQ+", area: "Drets i Inclusió" },
  { name: "Victoria Ferri Hernández", role: "Política Social i Inclusió", area: "Drets i Inclusió" },
  { name: "Manel Agea Tur", role: "Política Lingüística", area: "Cultura, Llengua i Memòria" },
  { name: "Ariadna López Martínez", role: "Cultura i Tradicions", area: "Cultura, Llengua i Memòria" },
  { name: "Andrea Cantos Martínez", role: "Memòria Democràtica", area: "Cultura, Llengua i Memòria" },
  { name: "Irene Martínez Romero", role: "Política Institucional", area: "Acció i Polítiques Públiques" },
  { name: "Mari Carmen Deltell", role: "Acció Republicana", area: "Acció i Polítiques Públiques" },
  { name: "M. Carmen Marqueño Moreno", role: "Medi Ambient i Canvi Climàtic", area: "Acció i Polítiques Públiques" },
  { name: "José Alejandro Bernabeu Martínez", role: "Sanitat i Salut Mental", area: "Desenvolupament i Societat" },
  { name: "Pablo Luis Más Llopis", role: "Moviments Socials", area: "Desenvolupament i Societat" },
  { name: "Tarek Berrakkad Lasri", role: "Migracions i Multiculturalitat", area: "Desenvolupament i Societat" },
  { name: "Marc Tormo Varoch", role: "Formació i Nova Militància", area: "Militància i Entorn Laboral" },
  { name: "Arnau López Guitart", role: "Universitats", area: "Militància i Entorn Laboral" },
  { name: "Claudia Garcia Llopis", role: "Drets Laborals", area: "Militància i Entorn Laboral" },
  { name: "Maria Arastey Sanmartín", role: "Sindicalisme", area: "Militància i Entorn Laboral" },
  { name: "Abel Ortega Gastaldo", role: "Associacionisme", area: "Altres Sectors Clau" },
  { name: "Carolina Lucena García", role: "Esports", area: "Altres Sectors Clau" },
  { name: "Pau de la Resurrección Pérez", role: "Europeisme", area: "Altres Sectors Clau" },
  { name: "Mohamed Al Howaidi Nasralla", role: "Ciència i Innovació", area: "Altres Sectors Clau" },
  { name: "Adrián Campos Campillo", role: "Comunicació i Xarxes", area: "Altres Sectors Clau" },
];

export interface ValueItem {
  title: string;
  desc: string;
}

export const VALUES: ValueItem[] = [
  { title: "Socialdemocràcia", desc: "Una societat justa i igualitària amb serveis públics forts i drets garantits per a tothom." },
  { title: "Republicanisme", desc: "Sobirania popular, laïcitat i institucions transparents al servei de la ciutadania." },
  { title: "Progressisme", desc: "Avancem en drets i llibertats sense renunciar a la responsabilitat de governar." },
  { title: "Feminisme", desc: "La igualtat real entre dones i homes vertebra tota la nostra acció política." },
  { title: "Federalisme", desc: "Un estat federal que reconega la plurinacionalitat i garantisca una finançament just." },
  { title: "Europeisme", desc: "Una Europa social, federal i democràtica que protegisca els drets de la ciutadania." },
  { title: "Valencianisme del s. XXI", desc: "Autogovern, llengua i identitat des de la diversitat i el respecte democràtic." },
];

export interface Milestone {
  year: string;
  title: string;
  desc: string;
}

export const HISTORY: Milestone[] = [
  { year: "1903", title: "Fundació", desc: "Tomás Meabe funda les Joventuts Socialistes a Erandio per a estructurar el socialisme democràtic i el republicanisme entre la joventut." },
  { year: "1910", title: "Mobilització", desc: "Les Joventuts Socialistes encapçalen les mobilitzacions contra la guerra i per les llibertats." },
  { year: "1939", title: "Exili i clandestinitat", desc: "La dictadura força la reorganització en la clandestinitat i l'exili, mantenint viva la flama democràtica." },
  { year: "1970s", title: "Expansió territorial", desc: "Gran creixement en universitats i centres de treball durant la transició democràtica." },
  { year: "1988", title: "Autonomia orgànica", desc: "Es consolida l'autonomia orgànica de les Joves Socialistes del País Valencià." },
  { year: "2026", title: "XIV Congrés · Alcoi", desc: "Marcos Durà encapçala una nova etapa centrada en la vertebració territorial i l'escolta activa." },
];

export interface Campaign {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  points: string[];
}

export const CAMPAIGNS: Campaign[] = [
  {
    slug: "habitatge-es-un-dret",
    title: "L'habitatge és un dret",
    tag: "Habitatge",
    summary: "Pla de xoc per l'emancipació: parc públic de lloguer assequible i regulació de preus en zones tensionades.",
    points: [
      "Mobilització de sòl públic per a lloguer assequible.",
      "Regulació de preus en zones tensionades.",
      "Ajudes directes a l'emancipació juvenil.",
    ],
  },
  {
    slug: "educacio-publica-de-tots",
    title: "Educació pública de tots i per a tots",
    tag: "Educació",
    summary: "Defensa de la xarxa pública, beques suficients i condicions dignes per al professorat.",
    points: [
      "Inversió sostinguda en la xarxa pública.",
      "Sistema de beques que garantisca la igualtat.",
      "Condicions laborals dignes per al professorat.",
    ],
  },
  {
    slug: "generacio-de-ferro",
    title: "Generació de ferro",
    tag: "Joventut",
    summary: "Reivindicació del paper de la joventut davant les emergències i contra els discursos que la criminalitzen.",
    points: [
      "Reconeixement del voluntariat juvenil en emergències.",
      "Polítiques de salut mental accessibles.",
      "Resposta a la precarietat i a l'atur juvenil.",
    ],
  },
  {
    slug: "feminisme-sense-passos-enrere",
    title: "Feminisme sense passos enrere",
    tag: "Igualtat",
    summary: "Agenda feminista valenta: igualtat real, recursos contra les violències masclistes i corresponsabilitat.",
    points: [
      "Recursos suficients contra les violències masclistes.",
      "Polítiques de corresponsabilitat i conciliació.",
      "Igualtat efectiva en l'àmbit laboral.",
    ],
  },
];

export interface Representative {
  name: string;
  role: string;
  inst: string;
  prov: "València" | "Alacant" | "Castelló";
  type: "Les Corts" | "Ajuntaments" | "Diputacions";
}

export const REPRESENTATIVES: Representative[] = [
  { name: "Laia García", role: "Regidora d'Igualtat", inst: "Ajuntament de Burjassot", prov: "València", type: "Ajuntaments" },
  { name: "Marc Ribera", role: "Diputat provincial", inst: "Diputació de València", prov: "València", type: "Diputacions" },
  { name: "Júlia Navarro", role: "Regidora de Joventut", inst: "Ajuntament d'Alacant", prov: "Alacant", type: "Ajuntaments" },
  { name: "Sergi Palau", role: "Regidor de Medi Ambient", inst: "Ajuntament de Castelló", prov: "Castelló", type: "Ajuntaments" },
  { name: "Noa Ferrer", role: "Diputada", inst: "Les Corts Valencianes", prov: "València", type: "Les Corts" },
  { name: "Àlex Molina", role: "Regidor d'Habitatge", inst: "Ajuntament de Gandia", prov: "València", type: "Ajuntaments" },
  { name: "Isabel Vidal", role: "Regidora d'Educació", inst: "Ajuntament d'Elx", prov: "Alacant", type: "Ajuntaments" },
  { name: "Pau Soler", role: "Diputat provincial", inst: "Diputació d'Alacant", prov: "Alacant", type: "Diputacions" },
  { name: "Marta Climent", role: "Regidora de Cultura", inst: "Ajuntament de Vila-real", prov: "Castelló", type: "Ajuntaments" },
  { name: "Dani Torres", role: "Diputat", inst: "Les Corts Valencianes", prov: "Castelló", type: "Les Corts" },
  { name: "Laura Pons", role: "Regidora de Serveis Socials", inst: "Ajuntament de Torrent", prov: "València", type: "Ajuntaments" },
  { name: "Carles Miralles", role: "Regidor d'Esports", inst: "Ajuntament de Sagunt", prov: "València", type: "Ajuntaments" },
  { name: "Rosa Fullana", role: "Diputada provincial", inst: "Diputació de Castelló", prov: "Castelló", type: "Diputacions" },
  { name: "Oriol Sanz", role: "Diputat", inst: "Les Corts Valencianes", prov: "Alacant", type: "Les Corts" },
];

export const COMARQUES = [
  "L'Horta Nord", "L'Horta Sud", "La Safor", "La Marina Alta", "La Marina Baixa",
  "El Comtat", "L'Alcoià", "La Vall d'Albaida", "La Ribera Alta", "La Ribera Baixa",
  "La Costera", "La Canal de Navarrés", "El Vinalopó Mitjà", "El Baix Vinalopó", "La Vega Baixa",
  "L'Alacantí", "L'Alt Palància", "L'Alt Millars", "L'Alcalatén", "La Plana Alta",
  "La Plana Baixa", "Els Ports", "L'Alt Maestrat", "El Baix Maestrat", "El Camp de Túria",
  "El Camp de Morvedre", "La Foia de Bunyol", "La Vall de Cofrents", "El Racó d'Ademús",
];
