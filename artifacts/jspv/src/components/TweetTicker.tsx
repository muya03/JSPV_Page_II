import { Twitter } from "lucide-react";

const TWEETS = [
  {
    id: "1",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "6 jul",
    text: "El XIV Congrés Nacional de Joves Socialistes del País Valencià ha elegit a Marcos Durà com a nou Secretari General. Comença una nova etapa per a l'organització. 🌹🔴 #JSPV #XIV Congrés",
    likes: 142,
    retweets: 58,
  },
  {
    id: "2",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "4 jul",
    text: "L'habitatge és un dret, no un negoci. Exigim mesures urgents per garantir l'accés a l'habitatge a la joventut del País Valencià. #HabitatgeÉsUnDret",
    likes: 211,
    retweets: 94,
  },
  {
    id: "3",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "2 jul",
    text: "Alcoi ens ha acollit per al nostre XIV Congrés Nacional. Prop de 300 delegades i delegats de tot el País Valencià construint el futur de l'organització. Gràcies Alcoi! 💪",
    likes: 189,
    retweets: 73,
  },
  {
    id: "4",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "28 jun",
    text: "La Generació de Ferro no es rendeix. Joves que van patir la DANA i ara exigim reconstrucció, justícia i suport institucional. El País Valencià es reconstrueix de peu. 🔴",
    likes: 334,
    retweets: 127,
  },
  {
    id: "5",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "25 jun",
    text: "El feminisme és una prioritat política, no una declaració d'intencions. Des de JSPV treballem cada dia per la igualtat real entre dones i homes. #8M365Dies",
    likes: 178,
    retweets: 61,
  },
  {
    id: "6",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "22 jun",
    text: "Avui hem presentat el nostre argumentari sobre canvi climàtic. Les persones joves serem les més afectades i per això exigim acció climàtica ambiciosa ja. 🌍 #CrisClimatica",
    likes: 156,
    retweets: 52,
  },
  {
    id: "7",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "19 jun",
    text: "Enhorabona als joves militants que han accedit a la Universitat. Des de JSPV us recordem que l'educació pública és el millor ascensor social que tenim. Defenseu-la! 📚",
    likes: 203,
    retweets: 88,
  },
  {
    id: "8",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "15 jun",
    text: "Hui en #ConsellNacional hem aprovat la nostra resolució política per a la nova etapa. Una JSPV arrelada al territori, propera a la joventut i amb les idees clares.",
    likes: 118,
    retweets: 44,
  },
  {
    id: "9",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "12 jun",
    text: "La salut mental de la joventut és una emergència. Exigim recursos públics, accés universal a psicòlegs en els centres educatius i destigmatitzar la salut mental. 💙 #SalutMental",
    likes: 291,
    retweets: 115,
  },
  {
    id: "10",
    handle: "@JSPV_oficial",
    name: "JSPV",
    date: "8 jun",
    text: "Vine a JSPV! Organitza't, forma part del canvi i construeix amb nosaltres el País Valencià que volem. L'organització juvenil del socialisme valencià t'espera. 🌹",
    likes: 97,
    retweets: 36,
  },
];

function TweetCard({ tweet }: { tweet: (typeof TWEETS)[0] }) {
  return (
    <a
      href={`https://x.com/JSPV_oficial`}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 w-[320px] bg-white border border-border rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="font-display font-extrabold text-white text-xs leading-none">JS</span>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-foreground leading-tight">{tweet.name}</p>
            <p className="text-xs text-muted-foreground">{tweet.handle}</p>
          </div>
        </div>
        <Twitter size={15} className="text-[#1D9BF0] shrink-0 mt-0.5" />
      </div>

      <p className="text-sm text-foreground leading-relaxed line-clamp-3">{tweet.text}</p>

      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
        <span>{tweet.date}</span>
        <div className="flex items-center gap-3">
          <span>🔁 {tweet.retweets}</span>
          <span>❤️ {tweet.likes}</span>
        </div>
      </div>
    </a>
  );
}

export function TweetTicker({ lang }: { lang: string }) {
  const doubled = [...TWEETS, ...TWEETS];

  return (
    <section className="bg-[hsl(var(--surface))] border-t border-border py-10 overflow-hidden">
      <div className="container-page mb-6">
        <div className="flex items-center gap-2.5">
          <Twitter size={16} className="text-[#1D9BF0]" />
          <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {lang === "es" ? "Últimos tweets" : "Últims tweets"}
          </p>
          <a
            href="https://x.com/JSPV_oficial"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-semibold text-primary hover:underline"
          >
            @JSPV_oficial →
          </a>
        </div>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-[hsl(var(--surface))] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-[hsl(var(--surface))] to-transparent" />

        <div className="flex gap-4 tweet-ticker-track pb-2">
          {doubled.map((tweet, i) => (
            <TweetCard key={`${tweet.id}-${i}`} tweet={tweet} />
          ))}
        </div>
      </div>
    </section>
  );
}
