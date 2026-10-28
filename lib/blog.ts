/* The blog (app/blog): six articles of practical know-how, written for search (one topic and its search
   terms per article, a short summary, a table of contents, questions and answers, links to the matching
   service). The articles are in German only, like the reviews and the legal pages: German is the only
   public language, and the English dev view shows them as they are. They hold no client facts of their
   own (no projects, numbers or certificates), only general practice and what the service texts already
   say; the client still has to approve them and set the real publication dates (OPEN.blog).
   In the text, [label](/path) becomes a link. */
import type { Copy } from '@/lib/i18n';
import type { ServiceSlug } from '@/lib/services';

/** A paragraph, a bullet list or a subheading */
export type Block = string | { list: string[] } | { h3: string };

export interface Post {
  slug: string;
  /** Names the category and decides which service the inquiry starts on */
  service: ServiceSlug;
  image: string;
  focus?: string;
  /** What the photo shows (it is also the article's share image) */
  imageAlt: string;
  /** The headline on the page and the cards */
  title: string;
  /** The title in search results, before " | IsoPro Energies" (keep it under about 45 characters) */
  seoTitle: string;
  /** The search snippet, about 140 to 155 characters */
  description: string;
  /** The opening under the headline and the line on share cards */
  excerpt: string;
  keywords: string[];
  /** ISO dates; set to the real dates at launch (OPEN.blog) */
  published: string;
  updated: string;
  /** "Das Wichtigste in Kürze": three or four points */
  summary: string[];
  sections: { id: string; heading: string; blocks: Block[] }[];
  faq: { q: string; a: string }[];
}

const LAUNCH = '2026-10-28';

/** Newest first; the start page shows the first two */
export const POSTS: Post[] = [
  {
    slug: 'armaturen-daemmen',
    service: 'waermedaemmung',
    image: '/img/armaturen.jpg',
    imageAlt: 'Gedämmte Rohrleitungen mit Armaturenkappen aus Blech in einer Technikzentrale',
    title: 'Armaturen dämmen: Warum sich abnehmbare Kappen lohnen',
    seoTitle: 'Armaturen dämmen mit abnehmbaren Kappen',
    description: 'Ungedämmte Ventile, Flansche und Pumpen sind Wärmebrücken. Wie abnehmbare Armaturenkappen Energie sparen und die Wartung trotzdem einfach halten.',
    excerpt: 'Ventile, Flansche und Pumpen bleiben oft ungedämmt, weil sie gewartet werden müssen. Dabei geht gerade dort viel Energie verloren. Abnehmbare Kappen lösen beides.',
    keywords: ['Armaturen dämmen', 'Armaturenkappen', 'Flansche dämmen', 'Ventile dämmen', 'Wärmebrücken Rohrleitung'],
    published: LAUNCH,
    updated: LAUNCH,
    summary: [
      'Ungedämmte Armaturen sind Wärmebrücken mitten in einer sonst gedämmten Leitung.',
      'Abnehmbare Kappen aus Dämmstoff und Blech lassen sich für die Wartung öffnen und wieder schließen.',
      'An Kälteleitungen müssen auch die Kappen dampfdicht sein, sonst bildet sich Kondenswasser.',
      'Bei einer Begehung lässt sich klären, welche Armaturen sich zuerst lohnen.',
    ],
    sections: [
      {
        id: 'warum-armaturen-ungedaemmt-bleiben',
        heading: 'Warum Armaturen so oft ungedämmt bleiben',
        blocks: [
          'In vielen Technikzentralen sind die Rohrleitungen sauber gedämmt, die Armaturen dazwischen aber nicht. Der Grund ist verständlich: Ventile, Schmutzfänger, Flansche, Pumpen und Messstellen müssen erreichbar bleiben. Eine fest verklebte Dämmung wäre bei der nächsten Wartung im Weg und müsste danach neu gemacht werden.',
          'So entstehen Lücken in der Dämmung, die im Alltag niemand mehr bemerkt. Gerade in Heizungs- und Prozessanlagen mit vielen Armaturen summieren sich diese Lücken über das ganze Netz.',
        ],
      },
      {
        id: 'armaturen-als-waermebruecke',
        heading: 'Armaturen als Wärmebrücke',
        blocks: [
          'Eine Armatur hat im Verhältnis zur Rohrleitung eine große, verwinkelte Oberfläche aus Metall. Ungedämmt gibt sie ständig Wärme an den Raum ab, solange das Medium warm ist. Das kostet Energie und heizt Technikräume unnötig auf.',
          'An Kälteleitungen ist es umgekehrt: Die kalte Armatur nimmt Wärme aus der Raumluft auf, und an ihrer Oberfläche schlägt sich Wasser nieder. Es tropft, läuft in die angrenzende Dämmung und lässt das Metall rosten. Warum das bei Kälte besonders heikel ist, beschreibt unser Beitrag zur [Kältedämmung und Kondenswasser](/blog/kaeltedaemmung-kondenswasser).',
        ],
      },
      {
        id: 'abnehmbare-armaturenkappen',
        heading: 'So sind abnehmbare Armaturenkappen aufgebaut',
        blocks: [
          'Eine Armaturenkappe wird für die jeweilige Armatur gefertigt. Innen liegt der Dämmstoff, außen ein Mantel aus Aluminium oder verzinktem Stahl. Gehalten wird sie von Verschlüssen, die sich von Hand öffnen lassen.',
          { list: [
            'Sie umschließt Gehäuse und Flansche vollständig.',
            'Sie schließt an die Dämmung der Rohrleitung an, ohne neue Lücke.',
            'Sie lässt sich für die Wartung abnehmen und danach wieder aufsetzen.',
            'Bei Bedarf bekommt sie Aussparungen für Spindeln, Handräder oder Messstellen.',
          ] },
          'Für die Wartung wird die Kappe abgenommen und danach wieder aufgesetzt. Neu gedämmt werden muss nichts. Welcher Mantel passt, hängt vom Einsatzort ab; mehr dazu im Beitrag [Blechummantelung: Aluminium oder Stahl?](/blog/blechummantelung-aluminium-oder-stahl).',
        ],
      },
      {
        id: 'kappen-an-kaelteleitungen',
        heading: 'Besonderheit an Kälteleitungen',
        blocks: [
          'An Kälteleitungen reicht eine einfache Kappe nicht. Sie muss dampfdicht an die diffusionsdichte Dämmung der Leitung anschließen, damit keine feuchte Luft an die kalte Armatur gelangt. Dafür braucht es einen anderen Aufbau als an warmgehenden Leitungen, zum Beispiel mit Elastomer und verklebten Fugen.',
        ],
      },
      {
        id: 'nachruesten',
        heading: 'Nachrüsten: Wo fängt man an?',
        blocks: [
          'Am meisten bringen Kappen dort, wo das Medium heiß oder kalt ist, die Anlage lange läuft und viele Armaturen dicht beieinander sitzen, etwa an Verteilern und Pumpengruppen. Bei einer Begehung sehen wir uns an, welche Armaturen ungedämmt sind, welche Temperaturen anliegen und wie oft sie zugänglich sein müssen. Daraus ergibt sich, wo sich das Nachrüsten zuerst lohnt.',
          'Mehr zu unserer [Wärmedämmung an Rohrleitungen und Armaturen](/leistungen/waermedaemmung).',
        ],
      },
    ],
    faq: [
      { q: 'Muss eine Armaturenkappe nach der Wartung neu gemacht werden?', a: 'Nein. Eine abnehmbare Kappe wird geöffnet, abgenommen und nach der Wartung wieder aufgesetzt. Sie ist für genau diesen Wechsel gebaut.' },
      { q: 'Lohnt sich das Dämmen einzelner Armaturen?', a: 'Meist ja, vor allem an Anlagen, die lange laufen, und dort, wo viele Armaturen beieinander sitzen. Ungedämmte Armaturen geben ständig Wärme ab oder nehmen sie bei Kälteleitungen auf.' },
      { q: 'Gibt es Armaturenkappen auch für Kälteleitungen?', a: 'Ja, aber mit dampfdichtem Aufbau, der an die diffusionsdichte Dämmung der Leitung anschließt. Sonst bildet sich unter der Kappe Kondenswasser.' },
    ],
  },
  {
    slug: 'kaeltedaemmung-kondenswasser',
    service: 'kaeltedaemmung',
    image: '/img/kaelte-rohre.jpg',
    imageAlt: 'Kälteleitungen mit diffusionsdichter Dämmung und Kugelhähnen',
    title: 'Kältedämmung: Wie Kondenswasser an Kälteleitungen entsteht und wie man es verhindert',
    seoTitle: 'Kältedämmung gegen Kondenswasser',
    description: 'Warum Kälte- und Klimaleitungen schwitzen, wie Feuchte in die Dämmung gelangt und worauf es bei diffusionsdichter Kältedämmung wirklich ankommt.',
    excerpt: 'An kalten Leitungen kondensiert Wasser aus der Raumluft. Ist die Dämmung nicht dicht, wird sie nass, verliert ihre Wirkung, und das Rohr darunter beginnt zu rosten.',
    keywords: ['Kältedämmung', 'Kondenswasser Kälteleitung', 'Taupunkt Rohrleitung', 'diffusionsdichte Dämmung', 'Elastomer Dämmung'],
    published: LAUNCH,
    updated: LAUNCH,
    summary: [
      'Liegt eine Oberfläche unter dem Taupunkt der Raumluft, bildet sich Kondenswasser.',
      'Kältedämmung muss deshalb diffusionsdicht sein, an jeder Naht, jedem Formteil und jeder Halterung.',
      'Feuchte, die in die Dämmung gelangt, bleibt dort und führt zu Korrosion unter der Dämmung.',
      'Durchfeuchtete Kältedämmung lässt sich nicht trocknen; sie wird zurückgebaut und neu gedämmt.',
    ],
    sections: [
      {
        id: 'taupunkt',
        heading: 'Taupunkt: Warum Kälteleitungen schwitzen',
        blocks: [
          'Luft enthält immer Wasserdampf. Kühlt sie an einer kalten Oberfläche ab, kann sie diesen Dampf irgendwann nicht mehr halten. Die Temperatur, bei der das passiert, heißt Taupunkt. Liegt eine Oberfläche darunter, schlägt sich Wasser auf ihr nieder.',
          'An Kälte-, Klima- und Kühlwasserleitungen ist das fast immer der Fall. Ohne Dämmung schwitzen sie, es tropft auf Decken, Böden und Anlagenteile. Die Kältedämmung hat deshalb zwei Aufgaben: Energie sparen und vor allem verhindern, dass ihre Außenseite unter den Taupunkt fällt.',
        ],
      },
      {
        id: 'feuchte-in-der-daemmung',
        heading: 'Der unsichtbare Teil: Feuchte in der Dämmung',
        blocks: [
          'Dazu kommt ein zweiter, langsamer Vorgang. Wasserdampf wandert durch Fugen, offene Stöße und undichte Stellen in die Dämmung hinein, angetrieben vom Unterschied zwischen warmer Raumluft und kaltem Rohr. An der kalten Rohrwand kondensiert er.',
          'Diese Feuchte kommt nicht von allein wieder heraus. Die Dämmung wird nach und nach nass, dämmt schlechter, die Oberfläche wird kälter, und noch mehr Wasser kondensiert. Unter der Dämmung beginnt die Korrosion, oft lange unbemerkt.',
        ],
      },
      {
        id: 'diffusionsdicht-daemmen',
        heading: 'Diffusionsdicht dämmen: worauf es ankommt',
        blocks: [
          'Kältedämmung wird deshalb diffusionsdicht ausgeführt. Bewährt haben sich zwei Wege:',
          { list: [
            'Geschlossenzellige Dämmstoffe wie Elastomer oder Schaumglas, die selbst kaum Wasserdampf durchlassen.',
            'Andere Dämmstoffe mit einer durchgehenden Dampfbremse auf der warmen Außenseite.',
          ] },
          'Entscheidend sind dann die Details. Längs- und Stoßnähte werden vollflächig verklebt, Formteile, Bögen und Abzweige sauber angeschlossen, Enden abgeschlossen. Eine einzige offene Stelle reicht, damit Feuchte eindringt und sich entlang der Leitung ausbreitet.',
          { h3: 'Halterungen und Armaturen' },
          'Halterungen sind ein typischer Schwachpunkt, weil das kalte Rohr dort am Metall des Trägers anliegt. Dort gehören Rohrschellen oder Unterlagen hin, die zum Dämmsystem passen und die Dämmung nicht unterbrechen. Dasselbe gilt für Armaturen: Auch sie werden dampfdicht eingebunden, siehe [Armaturen dämmen](/blog/armaturen-daemmen).',
        ],
      },
      {
        id: 'elastomer-oder-schaumglas',
        heading: 'Elastomer oder Schaumglas?',
        blocks: [
          'Elastomer ist flexibel und schnell montiert, typisch für Kälte- und Klimaleitungen in Gebäuden. Schaumglas ist druckfest, nicht brennbar und dampfdicht und eignet sich für tiefe Temperaturen und anspruchsvolle Bereiche. Welcher Dämmstoff passt, hängt von Temperatur, Umgebung, Brandschutz und Platz ab und wird bei der Begehung geklärt.',
        ],
      },
      {
        id: 'nasse-daemmung-sanieren',
        heading: 'Wenn die Dämmung schon nass ist',
        blocks: [
          'Nasse Kältedämmung lässt sich nicht trocknen. Sie wird zurückgebaut, der Untergrund wird geprüft und, wo nötig, behandelt, und dann wird neu und dicht gedämmt. Je früher, desto besser: Eine durchfeuchtete Dämmung dämmt kaum noch, und jeder Monat mit Korrosion darunter macht die Sanierung aufwendiger.',
          'Mehr zu unserer [Kältedämmung für Kälte-, Klima- und Kühlwasseranlagen](/leistungen/kaeltedaemmung).',
        ],
      },
    ],
    faq: [
      { q: 'Warum tropft meine gedämmte Kälteleitung?', a: 'Meist ist die Dämmung an einer Stelle nicht dicht, etwa an einer Naht, einem Formteil oder einer Halterung. Dort gelangt feuchte Luft an die kalte Oberfläche, und Wasser kondensiert.' },
      { q: 'Kann man nasse Kältedämmung trocknen lassen?', a: 'Nein. Die Feuchte sitzt im Dämmstoff und an der kalten Rohrwand. Nasse Kältedämmung wird zurückgebaut und neu und dicht ausgeführt.' },
      { q: 'Reicht bei Kälteleitungen eine dünne Dämmung?', a: 'Die Dicke muss so gewählt sein, dass die Außenseite der Dämmung nicht unter den Taupunkt der Raumluft fällt. Wie dick das ist, hängt von Medientemperatur, Raumklima und Dämmstoff ab.' },
    ],
  },
  {
    slug: 'rohrabschottung-brandschutz-abnahme',
    service: 'brandschutz',
    image: '/img/projekte/p08.jpg',
    focus: '50% 65%',
    imageAlt: 'Zwei gedämmte Rohrleitungen in einer Brandschutzabschottung im Boden, daneben das Kennzeichnungsschild',
    title: 'Rohrabschottungen im Brandschutz: Was bei der Abnahme zählt',
    seoTitle: 'Rohrabschottung: Was bei der Abnahme zählt',
    description: 'Brandschutzabschottungen für Rohrleitungen: warum die Zulassung den Einbau bestimmt, was zum Nachweis gehört und wie die Abnahme ohne Nacharbeit gelingt.',
    excerpt: 'Wo Leitungen durch Wände und Decken mit Brandschutzanforderung führen, muss die Öffnung wieder verschlossen werden. Bei der Abnahme zählt, ob System, Einbau und Nachweis zusammenpassen.',
    keywords: ['Rohrabschottung', 'Brandschutzabschottung', 'Abschottung Kennzeichnung', 'Übereinstimmungserklärung', 'Brandschutz Rohrdurchführung'],
    published: LAUNCH,
    updated: LAUNCH,
    summary: [
      'Jede Leitung durch eine Wand oder Decke mit Feuerwiderstand ist eine Öffnung, die verschlossen werden muss.',
      'Ein Abschottungssystem gilt nur für die Fälle, die seine Zulassung beschreibt.',
      'Zum Nachweis gehören das Schild an der Abschottung und die Übereinstimmungserklärung des Errichters.',
      'Dämmung und Abschottung sollten zusammen geplant werden.',
    ],
    sections: [
      {
        id: 'warum-abschotten',
        heading: 'Warum Rohrdurchführungen abgeschottet werden',
        blocks: [
          'Eine Wand oder Decke mit Feuerwiderstand trennt Brandabschnitte. Jede Rohrleitung, jedes Kabel und jeder Kanal, der hindurchführt, ist eine Öffnung in dieser Trennung. Damit Feuer und Rauch dort nicht in den nächsten Abschnitt gelangen, wird die Durchführung mit einem zugelassenen Abschottungssystem verschlossen.',
          'Bei der Abnahme wird deshalb nicht nur geschaut, ob die Öffnung zu ist. Es geht darum, ob das System für genau diese Durchführung zugelassen ist und ob es so eingebaut wurde, wie seine Zulassung es verlangt.',
        ],
      },
      {
        id: 'zulassung',
        heading: 'Die Zulassung bestimmt den Einbau',
        blocks: [
          'Ein Abschottungssystem gilt immer nur für bestimmte Fälle. Seine Zulassung legt unter anderem fest:',
          { list: [
            'welche Rohrwerkstoffe und Durchmesser durchgeführt werden dürfen,',
            'welche Dämmung die Leitung im Bereich der Abschottung haben darf oder muss,',
            'in welchen Wänden und Decken das System eingesetzt werden darf,',
            'welche Abstände zu anderen Durchführungen einzuhalten sind.',
          ] },
          'Was davon abweicht, ist von der Zulassung nicht mehr gedeckt. Ein häufiger Fall: Eine Leitung wird später mit einer anderen Dämmung versehen als der, mit der die Abschottung zugelassen ist.',
        ],
      },
      {
        id: 'nachweis',
        heading: 'Was zum Nachweis gehört',
        blocks: [
          'Zu jeder Abschottung gehören drei Dinge: das passende System, ein Einbau genau nach Zulassung und der Nachweis darüber. Zum Nachweis zählen:',
          { list: [
            'das Kennzeichnungsschild direkt an der Abschottung, mit den Angaben zum System und zum Errichter,',
            'die Übereinstimmungserklärung des Betriebs, der die Abschottung eingebaut hat,',
            'die Unterlagen zum System, die für die Abnahme vorgelegt werden.',
          ] },
        ],
      },
      {
        id: 'abnahme-ohne-nacharbeit',
        heading: 'So gelingt die Abnahme ohne Nacharbeit',
        blocks: [
          'Am meisten Zeit kostet eine Abnahme, wenn Unterlagen fehlen oder Schilder nicht zur Durchführung passen. Wir kennzeichnen jede Abschottung beim Einbau und übergeben die Unterlagen gesammelt. So lässt sich jede Durchführung ihrem Nachweis zuordnen, auch Jahre später, wenn eine Leitung dazukommt.',
          { h3: 'Dämmung und Abschottung zusammen planen' },
          'Wo gedämmte Leitungen durch Bauteile mit Brandschutzanforderung führen, sollten Dämmung und Abschottung zusammen geplant werden. Nicht jede Dämmung darf durch jede Abschottung geführt werden. Kommt beides aus einer Hand, passen die Systeme zueinander, und es entsteht keine Schnittstelle zwischen zwei Gewerken.',
          'Mehr zu unserem [Brandschutz an Leitungen und Durchführungen](/leistungen/brandschutz).',
        ],
      },
    ],
    faq: [
      { q: 'Wer darf eine Rohrabschottung einbauen?', a: 'Ein Fachbetrieb, der das System nach seiner Zulassung einbaut und dies mit einer Übereinstimmungserklärung bestätigt.' },
      { q: 'Was steht auf dem Kennzeichnungsschild einer Abschottung?', a: 'Angaben zum Abschottungssystem und seiner Zulassung, zum Errichter und zum Einbau. So lässt sich jede Abschottung später zuordnen.' },
      { q: 'Darf ich eine gedämmte Leitung durch jede Abschottung führen?', a: 'Nein. Die Zulassung des Systems legt fest, welche Dämmung im Bereich der Abschottung zulässig ist. Deshalb sollten Dämmung und Abschottung zusammen geplant werden.' },
    ],
  },
  {
    slug: 'rohrleitungen-daemmen-daemmdicke',
    service: 'waermedaemmung',
    image: '/img/blog-mineralwolle.jpg',
    imageAlt: 'Ein Monteur rollt eine Matte aus Mineralwolle für die Dämmung aus',
    title: 'Rohrleitungen dämmen: Welche Dämmdicke ist sinnvoll?',
    seoTitle: 'Rohrleitungen dämmen: die richtige Dämmdicke',
    description: 'Welche Dämmdicke Heizungs- und Prozessleitungen brauchen: Mindestanforderungen nach GEG, wirtschaftliche Dicken nach VDI 2055 und was in der Praxis zählt.',
    excerpt: 'Wie dick eine Rohrdämmung sein muss, hängt davon ab, wo die Leitung liegt und was sie führt. In Gebäuden gibt das Gebäudeenergiegesetz Mindestdicken vor, in Industrieanlagen zählt vor allem die Wirtschaftlichkeit.',
    keywords: ['Rohrleitungen dämmen', 'Dämmdicke Rohrleitung', 'GEG Rohrdämmung', 'VDI 2055', 'Heizungsrohre dämmen'],
    published: LAUNCH,
    updated: LAUNCH,
    summary: [
      'Für Heizungs- und Warmwasserleitungen in Gebäuden schreibt das GEG Mindestdicken vor, abhängig vom Durchmesser.',
      'In Industrieanlagen wird die Dicke meist wirtschaftlich bestimmt, zum Beispiel nach VDI 2055.',
      'Die beste Dicke nützt wenig, wenn Armaturen, Flansche und Halterungen ungedämmt bleiben.',
      'Dämmstoff, Temperatur und Umgebung bestimmen den Aufbau.',
    ],
    sections: [
      {
        id: 'warum-daemmdicke',
        heading: 'Warum die Dämmdicke zählt',
        blocks: [
          'Eine warmgehende Leitung verliert über ihre Oberfläche ständig Wärme. Die Dämmung bremst diesen Verlust, und zwar umso mehr, je dicker sie ist. Allerdings nimmt der Nutzen mit jeder weiteren Schicht ab, während Material, Platzbedarf und Kosten steigen. Die sinnvolle Dicke liegt irgendwo dazwischen.',
        ],
      },
      {
        id: 'geg',
        heading: 'Mindestdicken nach GEG in Gebäuden',
        blocks: [
          'Für Wärmeverteilungs- und Warmwasserleitungen sowie Armaturen in Gebäuden legt das Gebäudeenergiegesetz (GEG) Mindestdicken fest. Sie richten sich nach dem Innendurchmesser der Leitung und beziehen sich auf einen Dämmstoff mit einer Wärmeleitfähigkeit von 0,035 W/(m·K). Vereinfacht:',
          { list: [
            'Innendurchmesser bis 22 mm: 20 mm Dämmung,',
            'über 22 bis 35 mm: 30 mm,',
            'über 35 bis 100 mm: so dick wie der Innendurchmesser,',
            'über 100 mm: 100 mm.',
          ] },
          'In Wand- und Deckendurchbrüchen, an Kreuzungen und Verbindungsstellen gilt jeweils die Hälfte. Dämmstoffe mit anderer Wärmeleitfähigkeit werden umgerechnet. Maßgeblich ist immer der aktuelle Gesetzestext; für Kälteleitungen gelten eigene Anforderungen.',
        ],
      },
      {
        id: 'vdi-2055',
        heading: 'Wirtschaftliche Dämmdicke in Industrieanlagen',
        blocks: [
          'In Industrie- und Prozessanlagen geht es selten nur um Mindestwerte. Die Richtlinie VDI 2055 beschreibt, wie sich Wärme- und Kälteverluste berechnen und eine wirtschaftliche Dämmdicke bestimmen lassen. Einfließen unter anderem:',
          { list: [
            'Medientemperatur und Umgebungstemperatur,',
            'Betriebsstunden im Jahr,',
            'Energiepreis und Kosten der Dämmung,',
            'Dämmstoff und Ummantelung.',
          ] },
          'Bei heißen Medien und langen Laufzeiten fällt die wirtschaftliche Dicke oft deutlich größer aus als jede Mindestanforderung. Dazu kommen Vorgaben zum Berührungsschutz, wo heiße Oberflächen erreichbar sind.',
        ],
      },
      {
        id: 'details',
        heading: 'Die Dicke allein reicht nicht',
        blocks: [
          'In der Praxis gehen viele Verluste nicht über die gedämmten Meter verloren, sondern über die Stellen dazwischen: ungedämmte Armaturen, Flansche, Halterungen und offene Enden. Eine durchgehende Dämmung mit abnehmbaren Kappen an den Armaturen bringt oft mehr als ein paar Millimeter zusätzliche Dicke. Mehr dazu im Beitrag [Armaturen dämmen](/blog/armaturen-daemmen).',
          'Außen schützt eine [Blechummantelung](/blog/blechummantelung-aluminium-oder-stahl) die Dämmung vor Stößen und Witterung, damit sie ihre Wirkung über Jahre behält.',
        ],
      },
      {
        id: 'begehung',
        heading: 'Die richtige Dicke für Ihre Anlage',
        blocks: [
          'Welche Dicke und welcher Aufbau passen, klären wir bei der Begehung: anhand von Temperaturen, Durchmessern, Laufzeiten und Umgebung. Im Angebot stehen dann Aufbau, Materialien und Mengen.',
          'Mehr zu unserer [Wärmedämmung für Rohrleitungen, Behälter und Anlagen](/leistungen/waermedaemmung).',
        ],
      },
    ],
    faq: [
      { q: 'Wie dick muss die Dämmung von Heizungsrohren sein?', a: 'In Gebäuden gibt das GEG Mindestdicken vor, die sich nach dem Innendurchmesser richten: bei mittleren Durchmessern etwa so dick wie der Innendurchmesser, höchstens 100 mm, bezogen auf einen Dämmstoff mit 0,035 W/(m·K).' },
      { q: 'Gilt das GEG auch für Industrieanlagen?', a: 'Die Mindestdicken des GEG beziehen sich auf Leitungen in Gebäuden. In Industrieanlagen wird die Dicke meist wirtschaftlich bestimmt, etwa nach VDI 2055.' },
      { q: 'Lohnt sich eine dickere Dämmung als vorgeschrieben?', a: 'Bei heißen Medien und langen Laufzeiten oft ja. Wie viel dicker sinnvoll ist, zeigt eine Wirtschaftlichkeitsbetrachtung.' },
    ],
  },
  {
    slug: 'schallschutz-rohrleitungen',
    service: 'schallschutz',
    image: '/img/blog-kanaele-decke.jpg',
    imageAlt: 'Gedämmte Lüftungs- und Klimakanäle unter der Decke einer Industriehalle',
    title: 'Schallschutz an Rohrleitungen und Kanälen: So wird es leiser',
    seoTitle: 'Schallschutz an Rohrleitungen und Kanälen',
    description: 'Wie Rohrleitungen und Lüftungskanäle Lärm übertragen und was dagegen hilft: Schallschutzummantelung, Entkopplung an Halterungen und saubere Details.',
    excerpt: 'Pumpen, Ventile und Strömung machen Rohrleitungen und Kanäle zu Lautsprechern. Mit der richtigen Ummantelung und entkoppelten Halterungen wird es deutlich leiser.',
    keywords: ['Schallschutz Rohrleitungen', 'Schalldämmung Rohr', 'Schallschutzummantelung', 'Lüftungskanal Schalldämmung', 'Körperschall Rohrleitung'],
    published: LAUNCH,
    updated: LAUNCH,
    summary: [
      'Rohrleitungen und Kanäle strahlen Luftschall ab und leiten Körperschall über Halterungen weiter.',
      'Eine Schallschutzummantelung aus Dämmstoff und schwerer Schicht mindert den abgestrahlten Schall.',
      'Halterungen und Durchführungen müssen entkoppelt sein, sonst wandert der Schall am Dämmsystem vorbei.',
      'Schallschutz lässt sich mit Wärme- oder Kältedämmung kombinieren.',
    ],
    sections: [
      {
        id: 'woher-der-laerm-kommt',
        heading: 'Woher der Lärm kommt',
        blocks: [
          'In Rohrleitungen und Kanälen entsteht Schall durch Pumpen, Ventile, Regelarmaturen und die Strömung selbst. Die dünne Wand der Leitung schwingt mit und strahlt den Schall in den Raum ab. In Produktionshallen, Technikzentralen und Gebäuden mit Nachbarnutzungen wird daraus schnell ein Problem.',
        ],
      },
      {
        id: 'luftschall-und-koerperschall',
        heading: 'Luftschall und Körperschall',
        blocks: [
          'Zwei Wege muss man unterscheiden. Luftschall wird von der Oberfläche der Leitung abgestrahlt. Körperschall wandert durch das Material weiter, über Halterungen in Decken und Wände, und wird dort an ganz anderer Stelle hörbar.',
          'Eine wirksame Lösung behandelt beide Wege. Eine noch so gute Ummantelung hilft wenig, wenn die Leitung starr an der Decke hängt.',
        ],
      },
      {
        id: 'schallschutzummantelung',
        heading: 'So ist eine Schallschutzummantelung aufgebaut',
        blocks: [
          'Eine Schallschutzummantelung arbeitet meist nach dem Prinzip Masse und Feder: Eine weiche Dämmschicht entkoppelt, eine schwere Schicht darüber hält den Schall zurück, außen schützt ein Mantel. Wie viel Minderung nötig ist, hängt von der Quelle und dem Ziel im Raum ab. Die Norm DIN EN ISO 15665 beschreibt Aufbauten und Klassen für die Schalldämmung von Rohrleitungen.',
          { list: [
            'weiche, poröse Dämmschicht direkt auf der Leitung,',
            'schwere Schicht, zum Beispiel eine Schwerfolie,',
            'Mantel als Schutz nach außen.',
          ] },
        ],
      },
      {
        id: 'details-entscheiden',
        heading: 'Details entscheiden: Halterungen und Durchführungen',
        blocks: [
          'Schall sucht sich den leichtesten Weg. Halterungen werden deshalb mit schalldämmenden Einlagen ausgeführt, Durchführungen durch Wände und Decken elastisch geschlossen. Die Ummantelung muss lückenlos sein; offene Stellen an Flanschen oder Armaturen lassen den Schall ungehindert durch.',
          { h3: 'Kombiniert mit Wärme- oder Kältedämmung' },
          'Oft braucht eine Leitung mehr als eins: Schallschutz und Wärmedämmung, oder Schallschutz und eine diffusionsdichte Kältedämmung. Dann werden die Aufbauten aufeinander abgestimmt, damit jede Schicht ihre Aufgabe erfüllt, siehe auch [Kältedämmung gegen Kondenswasser](/blog/kaeltedaemmung-kondenswasser).',
        ],
      },
      {
        id: 'vorgehen',
        heading: 'Vorgehen bei lauten Leitungen',
        blocks: [
          'Wir sehen uns an, woher der Lärm kommt, wie die Leitungen befestigt sind und wo sie durch Bauteile führen. Daraus ergibt sich, ob eine Ummantelung reicht oder ob auch Halterungen und Durchführungen angepasst werden müssen.',
          'Mehr zu unserem [Schallschutz für Rohrleitungen, Kanäle und Anlagen](/leistungen/schallschutz).',
        ],
      },
    ],
    faq: [
      { q: 'Hilft normale Wärmedämmung gegen Rohrgeräusche?', a: 'Nur wenig. Wärmedämmung ist leicht und hält Schall kaum zurück. Für spürbaren Schallschutz braucht es einen Aufbau mit schwerer Schicht und entkoppelte Halterungen.' },
      { q: 'Warum höre ich Rohrgeräusche in einem anderen Raum?', a: 'Das ist meist Körperschall: Er wandert über Halterungen und Durchführungen in Decken und Wände und wird an anderer Stelle hörbar. Dagegen helfen entkoppelte Halterungen und elastische Durchführungen.' },
    ],
  },
  {
    slug: 'blechummantelung-aluminium-oder-stahl',
    service: 'waermedaemmung',
    image: '/img/blog-rohrleitungen-aussen.jpg',
    imageAlt: 'Ummantelte Rohrleitungen auf einer Rohrbrücke im Freien',
    title: 'Blechummantelung für Rohrleitungen: Aluminium, verzinkter Stahl oder Edelstahl?',
    seoTitle: 'Blechummantelung: Aluminium oder Stahl?',
    description: 'Welche Blechummantelung schützt die Rohrdämmung am besten? Aluminium, verzinkter Stahl und Edelstahl im Vergleich, mit Tipps für Außenbereiche.',
    excerpt: 'Die Blechummantelung schützt die Dämmung vor Stößen, Witterung und Feuchte. Welches Material passt, hängt vom Einsatzort ab: Halle, Außenbereich oder aggressive Umgebung.',
    keywords: ['Blechummantelung', 'Rohrleitung ummanteln', 'Aluminium Ummantelung', 'Ummantelung verzinkt', 'Isolierung Blechmantel'],
    published: LAUNCH,
    updated: LAUNCH,
    summary: [
      'Der Blechmantel schützt die Dämmung mechanisch und vor Witterung, damit sie lange wirkt.',
      'Aluminium ist leicht und gut zu verarbeiten, verzinkter Stahl robuster, Edelstahl für aggressive Umgebungen.',
      'Im Außenbereich kommt es auf Überlappungen und Abdichtung an, damit kein Wasser eindringt.',
      'Wo Brandschutz gefordert ist, muss auch der Mantel zum Brandschutzkonzept passen.',
    ],
    sections: [
      {
        id: 'wozu-ein-blechmantel',
        heading: 'Wozu ein Blechmantel?',
        blocks: [
          'Dämmstoffe wie Mineralwolle dämmen gut, sind aber empfindlich gegen Stöße, Tritte und Nässe. Der Blechmantel schützt sie davor. In Hallen verhindert er Beschädigungen im Betrieb, im Außenbereich hält er Regen und UV-Strahlung ab. Eine Dämmung, die trocken und unbeschädigt bleibt, behält ihre Wirkung über Jahre.',
        ],
      },
      {
        id: 'materialien-im-vergleich',
        heading: 'Die Materialien im Vergleich',
        blocks: [
          { h3: 'Aluminium' },
          'Leicht, korrosionsbeständig und gut zu verarbeiten, auch an Bögen und Formteilen. Aluminium ist in Technikzentralen und vielen Außenbereichen die übliche Wahl. Es ist allerdings weicher als Stahl und schmilzt bei deutlich niedrigeren Temperaturen.',
          { h3: 'Verzinkter Stahl' },
          'Robuster gegen Stöße und mechanische Belastung, etwa in Bereichen mit Fahrverkehr, Gerüsten oder häufigen Arbeiten an der Anlage. Bei beschädigter Verzinkung muss die Schnittkante geschützt werden, damit sie nicht rostet.',
          { h3: 'Edelstahl' },
          'Für aggressive Umgebungen, etwa mit Chemikalien, salzhaltiger Luft oder hohen Hygieneanforderungen in der Lebensmittelindustrie. Teurer in Material und Verarbeitung, dafür besonders beständig.',
        ],
      },
      {
        id: 'aussenbereich',
        heading: 'Im Außenbereich: Wasser darf nicht hinein',
        blocks: [
          'Draußen entscheidet die Ausführung mehr als das Material. Die Bleche werden so überlappt, dass Wasser abläuft und nicht in die Stöße läuft, ähnlich wie Dachziegel. Längsnähte liegen auf der wetterabgewandten Seite, Anschlüsse an Halterungen, Stutzen und Armaturen werden abgedichtet. Dringt doch Wasser ein, wird die Dämmung nass, und die Leitung darunter kann korrodieren.',
        ],
      },
      {
        id: 'brandschutz-und-mantel',
        heading: 'Brandschutz und Mantel',
        blocks: [
          'In Bereichen mit Brandschutzanforderungen muss der gesamte Aufbau zum Brandschutzkonzept passen, also auch der Mantel. Wo Leitungen durch Bauteile mit Feuerwiderstand führen, bestimmt die Zulassung der Abschottung, welcher Aufbau zulässig ist. Mehr dazu im Beitrag [Rohrabschottungen im Brandschutz](/blog/rohrabschottung-brandschutz-abnahme).',
        ],
      },
      {
        id: 'auswahl',
        heading: 'Welcher Mantel für Ihre Anlage?',
        blocks: [
          'Wir wählen den Mantel nach Einsatzort, Belastung und Umgebung aus und fertigen ihn passend zu Leitungen, Bögen, Armaturenkappen und Behältern. Bei der Begehung klären wir, wo welches Material sinnvoll ist.',
          'Mehr zu unserer [Wärmedämmung mit Blechummantelung](/leistungen/waermedaemmung).',
        ],
      },
    ],
    faq: [
      { q: 'Ist Aluminium oder verzinkter Stahl besser für die Rohrummantelung?', a: 'Aluminium ist leicht, korrosionsbeständig und gut zu verarbeiten, verzinkter Stahl ist robuster gegen Stöße. Was besser passt, hängt von der mechanischen Belastung und der Umgebung ab.' },
      { q: 'Braucht eine Rohrdämmung im Freien immer einen Blechmantel?', a: 'Im Außenbereich ist ein Schutz gegen Regen, UV-Strahlung und Beschädigung praktisch immer nötig. Ein Blechmantel mit richtig überlappten und abgedichteten Stößen ist dafür die bewährte Lösung.' },
    ],
  },
];

export const POST_SLUGS = POSTS.map(({ slug }) => slug);

export const postHref = (slug: string) => `/blog/${slug}`;

export const findPost = (slug: string) => POSTS.find((post) => post.slug === slug);

/** All the words of an article, for the reading time and the word count in its structured data */
export function wordCount(post: Post) {
  const text = [post.excerpt, ...post.summary, ...post.sections.flatMap(({ heading, blocks }) => [heading, ...blocks.flatMap((block) =>
    typeof block === 'string' ? [block] : 'list' in block ? block.list : [block.h3])]), ...post.faq.flatMap(({ q, a }) => [q, a])];
  return text.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').split(/\s+/).filter(Boolean).length;
}

/** Reading time at about 200 words a minute, rounded up */
export const minutesFor = (post: Post) => Math.max(1, Math.ceil(wordCount(post) / 200));

/** The category of an article: the name of its service in the page's language */
export const categoryOf = (post: Post, copy: Copy) => copy.services[post.service].name;
