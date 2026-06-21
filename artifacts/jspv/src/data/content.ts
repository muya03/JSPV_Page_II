// Placeholder / simulated institutional content for the JSPV portal.
// All copy is fictional placeholder material as indicated by the design brief.

import habitatgeImg from "@/assets/news/parc-public-habitatge.jpg";
import educacioImg from "@assets/6a01f22629d66.r_d.959-464-2500_1781884853325.jpeg";
import danaImg from "@assets/labores-de-limpieza-y-desescombro-en-paiporta-valencia_dcc1.j_1781879514303.webp";
import vpHabitatgeImg from "@assets/valenciaplaza-marcos-dura-habitatge_1781884452469.jpg";
import elPeriodicCongresImg from "@assets/elperiodic-marcos-dura-congres_1781884452470.jpg";
import congresImg from "@assets/8c18267208f1023c67fe9c3b60e7d22e_1781884452468.jpg";
import feminismeImg from "@assets/2430749_1781884520362.jpeg";
import memoriaImg from "@assets/13.-Ruta-de-La-valencia-republicana-Conociendo-Valencia.compre_1781884707175.jpg";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Nosaltres", href: "/partit" },
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
  /** If set, clicking the card opens this URL in a new tab (press coverage) */
  externalUrl?: string;
  /** Short name of the external media outlet */
  source?: string;
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
  {
    slug: "valenciaplaza-marcos-dura-habitatge",
    title: "Marcos Durà, JSPV: «Hem de continuar pressionant el govern perquè siga més valent en habitatge»",
    category: "Habitatge",
    date: "12 de juny de 2026",
    iso: "2026-06-12",
    excerpt:
      "El secretari general de JSPV, Marcos Durà, analitza la crisi d'habitatge i la necessitat d'una política més valenta del govern central.",
    image: vpHabitatgeImg,
    imageAlt: "Entrevista a Marcos Durà sobre la política d'habitatge",
    body: [],
    externalUrl: "https://valenciaplaza.com/valenciaplaza/comunitat-valenciana1/marcos-dura-jspv-tenemos-que-seguir-apretando-al-gobierno-para-que-sea-mas-valiente-en-vivienda",
    source: "València Plaza",
  },
  {
    slug: "elperiodic-marcos-dura-secretari-general",
    title: "Marcos Durà assumeix la secretaria general de JSPV al Congrés Nacional celebrat a Alcoi",
    category: "Organització",
    date: "8 de juny de 2026",
    iso: "2026-06-08",
    excerpt:
      "El Periòdic recull l'elecció de Marcos Durà com a nou secretari general de Joves Socialistes del País Valencià en el XIV Congrés d'Alcoi.",
    image: elPeriodicCongresImg,
    imageAlt: "Participants al XIV Congrés Nacional de JSPV a Alcoi",
    body: [],
    externalUrl: "https://www.elperiodic.com/marcos-dura-asume-secretaria-general-joves-socialistes-pais-valencia-congreso-nacional-celebrado-alcoi_1078784",
    source: "El Periòdic",
  },
];

export interface ExecutiveMember {
  name: string;
  role: string;
  area: string;
  bio: string;
}

export const EXECUTIVE_CORE: ExecutiveMember[] = [
  {
    name: "Marcos Durà Gimeno",
    role: "Secretaria General",
    area: "Nucli de Direcció",
    bio: "Elegit Secretari General al XIV Congrés Nacional d'Alcoi. Lidera l'organització amb l'objectiu de vertebrar el territori comarca a comarca i enfortir la presència de JSPV arreu del País Valencià.",
  },
  {
    name: "Itziar Lafita Balaguer",
    role: "Organització",
    area: "Nucli de Direcció",
    bio: "Responsable de l'organització interna i de la coordinació entre les federacions territorials. Impulsa l'enfortiment de l'estructura militant.",
  },
  {
    name: "Francisco José Hidalgo Vidal",
    role: "Presidència",
    area: "Nucli de Direcció",
    bio: "Presideix els òrgans col·legiats de JSPV i garanteix el compliment dels estatuts. Vetlla per la cohesió interna i la qualitat democràtica de l'organització.",
  },
  {
    name: "Iván López Sánchez",
    role: "1a Vicesec. d'Habitatge",
    area: "Vicesecretaries Generals",
    bio: "Coordina l'acció política en matèria d'habitatge, emancipació juvenil i regulació del mercat de l'arrendament en zones tensionades.",
  },
  {
    name: "Rocío Vila Soriano",
    role: "2a Vicesec. d'Educació",
    area: "Vicesecretaries Generals",
    bio: "Dirigeix les polítiques d'educació pública, defensant la igualtat d'oportunitats i unes condicions dignes per a tota la comunitat educativa.",
  },
];

export const EXECUTIVE_FULL: ExecutiveMember[] = [
  {
    name: "Marcos Durà Gimeno",
    role: "Secretaria General",
    area: "Nucli de Direcció",
    bio: "Elegit Secretari General al XIV Congrés Nacional d'Alcoi. Lidera l'organització amb l'objectiu de vertebrar el territori comarca a comarca i enfortir la presència de JSPV arreu del País Valencià.",
  },
  {
    name: "Itziar Lafita Balaguer",
    role: "Organització",
    area: "Nucli de Direcció",
    bio: "Responsable de l'organització interna i de la coordinació entre les federacions territorials. Impulsa l'enfortiment de l'estructura militant i la cohesió entre les agrupacions locals.",
  },
  {
    name: "Francisco José Hidalgo Vidal",
    role: "Presidència",
    area: "Nucli de Direcció",
    bio: "Presideix els òrgans col·legiats de JSPV i garanteix el compliment dels estatuts. Vetlla per la cohesió interna i la qualitat democràtica de l'organització.",
  },
  {
    name: "Leire Juan Checa",
    role: "Portaveu",
    area: "Nucli de Direcció",
    bio: "Porta la veu pública de JSPV en els mitjans de comunicació i les institucions. Articula el discurs polític de l'organització amb claredat i compromís.",
  },
  {
    name: "Iván López Sánchez",
    role: "1a Vicesec. d'Habitatge",
    area: "Vicesecretaries Generals",
    bio: "Coordina l'acció política en matèria d'habitatge, emancipació juvenil i regulació del mercat de l'arrendament en zones tensionades.",
  },
  {
    name: "Rocío Vila Soriano",
    role: "2a Vicesec. d'Educació",
    area: "Vicesecretaries Generals",
    bio: "Dirigeix les polítiques d'educació pública, defensant la igualtat d'oportunitats i unes condicions dignes per a tota la comunitat educativa.",
  },
  {
    name: "Héctor Giner González",
    role: "3a Vicesec. de Municipalisme",
    area: "Vicesecretaries Generals",
    bio: "Impulsa la presència de JSPV en els ajuntaments i fomenta una xarxa de joves representants municipals compromesos amb el territori.",
  },
  {
    name: "José Luis Bravo Josemaría",
    role: "Vicesec. d'Organització",
    area: "Coordinació i Estratègia",
    bio: "Dóna suport a l'estructura territorial i al creixement de la militància, coordinant les agrupacions locals i el treball de base.",
  },
  {
    name: "Rafael Coloma Francés",
    role: "Acció Política i Estratègia Electoral",
    area: "Coordinació i Estratègia",
    bio: "Dissenya l'estratègia electoral i l'acció política de l'organització tant en períodes de campanya com en el treball institucional quotidià.",
  },
  {
    name: "Pedro Sabaté Roca",
    role: "Administració",
    area: "Coordinació i Estratègia",
    bio: "Gestiona els recursos administratius i econòmics de JSPV, garantint el funcionament eficient i transparent de l'organització.",
  },
  {
    name: "María Márquez Bonmatí",
    role: "Igualtat",
    area: "Drets i Inclusió",
    bio: "Coordina les polítiques feministes i d'igualtat real, transversalitzant la perspectiva de gènere en tota l'acció política de JSPV.",
  },
  {
    name: "Alejandro Ruiz Cortés",
    role: "LGTBIQ+",
    area: "Drets i Inclusió",
    bio: "Impulsa els drets LGTBIQ+ i les polítiques de no-discriminació, construint una organització diversa, inclusiva i lliure de qualsevol forma de discriminació.",
  },
  {
    name: "Victoria Ferri Hernández",
    role: "Política Social i Inclusió",
    area: "Drets i Inclusió",
    bio: "Treballa per garantir els drets socials bàsics i la inclusió de les persones en situació de vulnerabilitat, amb un focus especial en la joventut.",
  },
  {
    name: "Manel Agea Tur",
    role: "Política Lingüística",
    area: "Cultura, Llengua i Memòria",
    bio: "Defensa el valencià com a llengua pròpia del País Valencià i impulsa polítiques actives de normalització lingüística en tots els àmbits.",
  },
  {
    name: "Ariadna López Martínez",
    role: "Cultura i Tradicions",
    area: "Cultura, Llengua i Memòria",
    bio: "Promou la cultura valenciana i les tradicions populars com a expressió viva de la identitat col·lectiva i del patrimoni immaterial del nostre poble.",
  },
  {
    name: "Andrea Cantos Martínez",
    role: "Memòria Democràtica",
    area: "Cultura, Llengua i Memòria",
    bio: "Lidera el treball en memòria, veritat i reparació per a les víctimes de la dictadura franquista, amb especial atenció al context valencià.",
  },
  {
    name: "Irene Martínez Romero",
    role: "Política Institucional",
    area: "Acció i Polítiques Públiques",
    bio: "Coordina la relació de JSPV amb les institucions públiques i la incidència política en tots els nivells de govern per fer avançar l'agenda progressista.",
  },
  {
    name: "Mari Carmen Deltell",
    role: "Acció Republicana",
    area: "Acció i Polítiques Públiques",
    bio: "Defensa la forma republicana d'estat i impulsa la renovació democràtica de les institucions cap a un model de sobirania popular plena.",
  },
  {
    name: "M. Carmen Marqueño Moreno",
    role: "Medi Ambient i Canvi Climàtic",
    area: "Acció i Polítiques Públiques",
    bio: "Treballa per una transició ecològica justa que compatibilitze la sostenibilitat ambiental amb la justícia social i la creació d'ocupació de qualitat.",
  },
  {
    name: "José Alejandro Bernabeu Martínez",
    role: "Sanitat i Salut Mental",
    area: "Desenvolupament i Societat",
    bio: "Defensa la sanitat pública universal i la salut mental com a dret fonamental per a la joventut, apostant per recursos accessibles i sense estigma.",
  },
  {
    name: "Pablo Luis Más Llopis",
    role: "Moviments Socials",
    area: "Desenvolupament i Societat",
    bio: "Articula la relació de JSPV amb els moviments socials i les entitats de la societat civil organitzada, construint aliances progressistes.",
  },
  {
    name: "Tarek Berrakkad Lasri",
    role: "Migracions i Multiculturalitat",
    area: "Desenvolupament i Societat",
    bio: "Treballa per una societat intercultural basada en la igualtat de drets i el respecte mutu, combatent el racisme i la xenofòbia.",
  },
  {
    name: "Marc Tormo Varoch",
    role: "Formació i Nova Militància",
    area: "Militància i Entorn Laboral",
    bio: "Dissenya el programa formatiu de l'organització i acompanya la incorporació de nova militància amb eines pedagògiques i espais de debat.",
  },
  {
    name: "Arnau López Guitart",
    role: "Universitats",
    area: "Militància i Entorn Laboral",
    bio: "Enforteix la presència de JSPV en els campus universitaris i defensa els drets dels estudiants davant la privatització i les retallades.",
  },
  {
    name: "Claudia Garcia Llopis",
    role: "Drets Laborals",
    area: "Militància i Entorn Laboral",
    bio: "Treballa per una joventut amb drets laborals dignes, fent front a la precarietat, el frau contractual i l'atur juvenil estructural.",
  },
  {
    name: "Maria Arastey Sanmartín",
    role: "Sindicalisme",
    area: "Militància i Entorn Laboral",
    bio: "Coordina la relació de JSPV amb el moviment sindical i impulsa la cultura de la negociació col·lectiva entre la joventut treballadora.",
  },
  {
    name: "Abel Ortega Gastaldo",
    role: "Associacionisme",
    area: "Altres Sectors Clau",
    bio: "Fomenta el teixit associatiu juvenil i la participació activa en la vida comunitària com a escola de ciutadania democràtica.",
  },
  {
    name: "Carolina Lucena García",
    role: "Esports",
    area: "Altres Sectors Clau",
    bio: "Promou l'esport com a eina de salut, integració social i valors democràtics, defensant el model d'esport públic i accessible.",
  },
  {
    name: "Pau de la Resurrección Pérez",
    role: "Europeisme",
    area: "Altres Sectors Clau",
    bio: "Impulsa la dimensió europea de JSPV i la participació de la joventut valenciana en les estructures juvenils europees i internacionals.",
  },
  {
    name: "Mohamed Al Howaidi Nasralla",
    role: "Ciència i Innovació",
    area: "Altres Sectors Clau",
    bio: "Defensa la inversió pública en recerca, ciència i tecnologia com a motor del benestar col·lectiu i de la transició digital soberana.",
  },
  {
    name: "Adrián Campos Campillo",
    role: "Comunicació i Xarxes",
    area: "Altres Sectors Clau",
    bio: "Gestiona la comunicació digital i la presència de JSPV a les xarxes socials, construint un relat proper, honest i accessible per a la joventut.",
  },
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
  photo?: string;
}

export const REPRESENTATIVES: Representative[] = [
  { name: "Benjamí Mompó", role: "Diputat", inst: "Les Corts Valencianes", prov: "València", type: "Les Corts", photo: "https://www.jse.org/wp-content/uploads/2024/11/benjami_mompo_valencia.jpg" },
  { name: "Cristina Martínez", role: "Diputada", inst: "Les Corts Valencianes", prov: "València", type: "Les Corts", photo: "https://www.jse.org/wp-content/uploads/2025/01/cristina-martinez.jpg" },
  { name: "Itziar Lafita", role: "Alcaldessa", inst: "Ajuntament de la Serratella", prov: "Castelló", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/ITZIAR-LAFITA.jpg" },
  { name: "Blanca Silvestre", role: "Regidora", inst: "Ajuntament de Nules", prov: "Castelló", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/BLANCA-SILVESTRE.jpg" },
  { name: "Lara Guadix", role: "Regidora", inst: "Ajuntament de Vinaròs", prov: "Castelló", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/LARA-GUADIX.jpg" },
  { name: "Jorge Ribes", role: "Regidor", inst: "Ajuntament de Castelló de la Plana", prov: "Castelló", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/JORGE-RIBES.jpg" },
  { name: "Tomás Mínguez", role: "Regidor", inst: "Ajuntament d'Altura", prov: "Castelló", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/TOMAS-MINGUEZ.jpg" },
  { name: "Juan Huguet", role: "Regidor", inst: "Ajuntament de la Vilavella", prov: "Castelló", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/JUAN-HUGUET.jpg" },
  { name: "Alejandro Morales", role: "Regidor", inst: "Ajuntament de Cullera", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/ALEJANDRO-MORALES.jpg" },
  { name: "Eugeni Ruiz", role: "Regidor", inst: "Ajuntament del Puig", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/EUGENI-RUIZ.jpg" },
  { name: "Nerea Gimeno", role: "Regidora", inst: "Ajuntament de Mislata", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/NEREA-GIMENO.jpg" },
  { name: "Sergio Ortiz", role: "Regidor", inst: "Ajuntament de Moixent", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/SERGIO-ORTIZ.jpg" },
  { name: "David Barbancho", role: "Regidor", inst: "Ajuntament de Riba-roja de Túria", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/DAVID-BARBANCHO.jpg" },
  { name: "Víctor Herrera", role: "Regidor", inst: "Ajuntament d'Utiel", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/VICTOR-HERRERA.jpg" },
  { name: "Iván Egea", role: "Regidor", inst: "Ajuntament de Benifaió", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/IVAN-EGEA.jpg" },
  { name: "Rafael Lluch", role: "Regidor", inst: "Ajuntament d'Algemesí", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/RAFAEL-LLUCH.jpg" },
  { name: "Gonzalo Moya", role: "Regidor", inst: "Ajuntament de Camporrobles", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/GONZALO-MOYA.jpg" },
  { name: "Francisco José Hidalgo", role: "Regidor", inst: "Ajuntament de Quart de Poblet", prov: "València", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/FRANCISCO-JOSE-HIDALGO.jpg" },
  { name: "Juan Miguel López", role: "Regidor", inst: "Ajuntament d'Oriola", prov: "Alacant", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/JUAN-MIGUEL-LOPEZ.jpg" },
  { name: "Víctor Leal", role: "Regidor", inst: "Ajuntament de Catral", prov: "Alacant", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/VICTOR-LEAL.jpg" },
  { name: "Rafael Coloma", role: "Regidor", inst: "Ajuntament de Biar", prov: "Alacant", type: "Ajuntaments", photo: "https://www.jse.org/wp-content/uploads/2025/02/RAFAEL-COLOMA.jpg" },
];

export interface AgendaEvent {
  id: string;
  title: string;
  titleEs: string;
  date: string;
  iso: string;
  location: string;
  type: "Assemblea" | "Acte" | "Formació" | "Manifestació" | "Reunió" | "Trobada";
}

export const AGENDA: AgendaEvent[] = [
  {
    id: "assemblea-valencia-juny",
    title: "Assemblea Local de València",
    titleEs: "Asamblea Local de Valencia",
    date: "22 juny 2026",
    iso: "2026-06-22",
    location: "Casa del Poble, València",
    type: "Assemblea",
  },
  {
    id: "acte-habitatge-castello",
    title: "Acte «L'habitatge és un dret» — Castelló",
    titleEs: "Acto «La vivienda es un derecho» — Castellón",
    date: "28 juny 2026",
    iso: "2026-06-28",
    location: "Plaça Major, Castelló de la Plana",
    type: "Acte",
  },
  {
    id: "escola-estiu-alacant",
    title: "Escola d'Estiu JSPV",
    titleEs: "Escuela de Verano JSPV",
    date: "5–6 juliol 2026",
    iso: "2026-07-05",
    location: "Alacant",
    type: "Formació",
  },
  {
    id: "reunio-cen-juliol",
    title: "Reunió de la Comissió Executiva Nacional",
    titleEs: "Reunión de la Comisión Ejecutiva Nacional",
    date: "12 juliol 2026",
    iso: "2026-07-12",
    location: "Seu JSPV, València",
    type: "Reunió",
  },
  {
    id: "trobada-comarcal-safor",
    title: "Trobada Comarcal de la Safor",
    titleEs: "Encuentro Comarcal de la Safor",
    date: "19 juliol 2026",
    iso: "2026-07-19",
    location: "Gandia",
    type: "Trobada",
  },
  {
    id: "manifestacio-agost",
    title: "Manifestació per l'Emancipació Juvenil",
    titleEs: "Manifestación por la Emancipación Juvenil",
    date: "1 agost 2026",
    iso: "2026-08-01",
    location: "Passeig de la Petxina, València",
    type: "Manifestació",
  },
];

export const COMARQUES = [
  "L'Horta Nord", "L'Horta Sud", "La Safor", "La Marina Alta", "La Marina Baixa",
  "El Comtat", "L'Alcoià", "La Vall d'Albaida", "La Ribera Alta", "La Ribera Baixa",
  "La Costera", "La Canal de Navarrés", "El Vinalopó Mitjà", "El Baix Vinalopó", "La Vega Baixa",
  "L'Alacantí", "L'Alt Palància", "L'Alt Millars", "L'Alcalatén", "La Plana Alta",
  "La Plana Baixa", "Els Ports", "L'Alt Maestrat", "El Baix Maestrat", "El Camp de Túria",
  "El Camp de Morvedre", "La Foia de Bunyol", "La Vall de Cofrents", "El Racó d'Ademús",
];
