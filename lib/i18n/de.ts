/* German: the source language and the only public one. Its shape defines `Copy`; en.ts must match it.
   {placeholders} are filled by `fill` (lib/i18n). Photos, icons and logos stay in lib/content.ts,
   lib/services.ts and lib/references.ts.
   Tone and section order follow the reference design (Movera, research/movera-reference.md): a small
   tag, one short confident headline, one plain sentence, one button. Nothing here invents a fact
   about the client: numbers are only those we know (four trades, three countries, the Google rating). The service texts are
   the client's own from the old site, rewritten for industrial buyers. */
import type { NeedKey, ObjectKey, TimeframeKey } from '@/lib/inquiry';
import type { RefCategory } from '@/lib/references';
import type { ServiceSlug } from '@/lib/services';

interface ServiceText {
  name: string;
  /** One sentence for the service rows on the start page and the overview */
  summary: string;
  meta: { title: string; description: string };
  headline: string;
  lead: string;
  scopeTitle: string;
  /** In the order of the photos in lib/services.ts */
  scope: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  faq: { q: string; a: string }[];
}

/** What a reference photo shows: label and value, set as a spec sheet */
interface ReferenceText { title: string; specs: [string, string][] }


export const de = {
  meta: {
    title: 'IsoPro Energies | Industrieisolierung & Brandschutz aus Mannheim',
    description: 'Wärme-, Kälte-, Brand- und Schallschutz für Rohrleitungen, Behälter und Kanäle. IsoPro Energies GmbH aus Mannheim, tätig in Deutschland, Österreich und der Schweiz.',
    locale: 'de_DE',
  },
  skip: 'Zum Inhalt springen',

  home: {
    hero: {
      title: 'Energie bleibt, wo sie hingehört',
      lead: 'Wir dämmen Rohrleitungen, Behälter und Kanäle gegen Wärmeverlust, Kondensat, Feuer und Lärm.',
      button: 'Leistungen entdecken',
      scroll: 'Nach unten scrollen',
      // The Google rating at the hero's lower edge (GOOGLE_REVIEWS in lib/reviews.ts). The faces beside it
      // are stock models, so the line states the rating only and does not call them reviewers.
      reviews: {
        stars: '{rating} von 5 Sternen',
        count: '{count} Bewertungen auf Google',
      },
    },
    impact: {
      subtitle: 'Über uns',
      // A centred statement; *…* marks the words set in grey
      statement: 'Bei IsoPro Energies dämmen und schützen wir Anlagen *mit Präzision,* damit die Energie im System bleibt und Brandschutz *von Anfang an* dazugehört.',
      button: 'Mehr über uns',
      // In the order of PHOTOS.impact (lib/content.ts)
      imageAlts: [
        'Gedämmte Behälter und Leitungen im Außenbereich',
        'Ein Monteur dämmt Lüftungskanäle auf einem Dach und ummantelt sie mit Aluminium',
        'Verteiler und Pumpengruppe, diffusionsdicht in Elastomer gedämmt',
      ],
      // In the order of IMPACT_ICONS (lib/content.ts)
      points: ['Weniger Energieverlust', 'Brandschutz inklusive', 'Lückenlos dokumentiert'],
    },
    services: {
      subtitle: 'Unsere Leistungen',
      title: 'Dämmung und Brandschutz für jede Anlage',
      button: 'Alle Leistungen',
      details: 'Details ansehen',
      // The speech bubbles on the photo panels of the start page
      taglines: {
        waermedaemmung: 'Wärme bleibt im Rohr',
        kaeltedaemmung: 'Kein Tropfen, kein Rost',
        brandschutz: 'Jede Durchführung dicht',
        schallschutz: 'Ruhe in der Halle',
      } satisfies Record<ServiceSlug, string>,
    },
    why: {
      subtitle: 'Warum IsoPro Energies',
      title: 'Wir halten Anlagen effizient und sicher',
      text: 'Dämmung und Brandschutz aus einer Hand: von der Begehung über die Montage bis zur Dokumentation, abgestimmt auf Ihren Betrieb.',
      imageAlt: 'Ein Monteur prüft gedämmte Rohrleitungen unter der Decke',
      // In the order of WHY_ICONS (lib/content.ts)
      features: [
        { title: 'Saubere Details', text: 'Formteile, Armaturen und Abschlüsse: Dort entscheidet sich, ob eine Dämmung hält.' },
        { title: 'Lückenlos dokumentiert', text: 'Jede Abschottung gekennzeichnet, jeder Aufbau nachvollziehbar, bereit für die Abnahme.' },
        { title: 'Ein Ansprechpartner', text: 'Von der Begehung bis zur Abnahme eine Person, die Ihre Anlage kennt.' },
        { title: 'Rücksicht auf den Betrieb', text: 'Abgestimmte Zeiten, saubere Baustellen und klare Absprachen.' },
      ],
    },
    // The Google reviews themselves are quoted word for word from lib/reviews.ts, in every language
    reviews: {
      subtitle: 'Kundenstimmen',
      title: 'Was unsere Kunden sagen',
      text: 'Echte Bewertungen aus unserem Google-Profil, im Wortlaut.',
      source: 'Google-Bewertung',
      count: '{count} Bewertungen auf Google',
      button: 'Alle Bewertungen',
    },
    // The ways of working with IsoPro (where the reference has prices): a list beside a tall photo.
    // *…* in the title marks the words set in grey
    audiences: {
      subtitle: 'Zusammenarbeit',
      title: 'Direkt beauftragt *oder als Gewerk* im Projekt',
      items: [
        {
          title: 'Für Betreiber',
          text: 'Für Industrie, Gewerbe, Krankenhäuser und Verwaltungsbauten: Begehung und Aufmaß vor Ort, eine Montage, die auf Ihren Betrieb abgestimmt ist, die Unterlagen für die Abnahme und ein Ansprechpartner von Anfang bis Ende.',
          link: '',
        },
        {
          title: 'Für Generalunternehmer und TGA-Firmen',
          text: 'Als Gewerk in Ihrem Projekt: Dämmung und Brandschutz aus einer Hand, abgestimmt mit den anderen Gewerken, jede Abschottung gekennzeichnet, mit Übereinstimmungserklärung und Unterlagen.',
          link: '',
        },
        {
          title: 'Für Isolierbetriebe und Kolonnen',
          text: 'Für größere Projekte suchen wir Nachunternehmer, die dauerhaft mit uns arbeiten wollen.',
          link: 'Partner werden',
        },
      ],
      button: 'Projekt anfragen',
      imageAlt: 'Luftbild einer Industrieanlage',
    },
    references: {
      subtitle: 'Referenzen',
      title: 'Ausgeführte Arbeiten aus unseren Projekten',
      button: 'Alle Referenzen',
    },
    blog: {
      subtitle: 'Blog',
      title: 'Praxiswissen zu Dämmung und Brandschutz',
      button: 'Alle Beiträge',
    },
    contact: {
      subtitle: 'Kontakt',
      title: 'So kommen Sie zu Ihrem Angebot',
    },
  },

  /** The closing bar at the end of the inner pages */
  cta: {
    title: 'Sie planen eine Dämmung oder brauchen Brandschutz?',
    text: 'Schicken Sie uns Eckdaten, Pläne oder Fotos. Wir melden uns mit Rückfragen oder einem Termin für die Begehung.',
    button: 'Projekt anfragen',
  },

  /** The five steps, from inquiry to handover */
  process: {
    subtitle: 'Unser Ablauf',
    title: 'Von der Anfrage bis zur Abnahme',
    step: '(Schritt {n})',
    steps: [
      { title: 'Anfrage', text: 'Sie schicken uns Eckdaten, Pläne oder Fotos.' },
      { title: 'Begehung & Aufmaß', text: 'Wir sehen uns die Anlage vor Ort an und nehmen Maß.' },
      { title: 'Angebot', text: 'Schriftlich, mit Aufbau, Materialien und Mengen.' },
      { title: 'Montage', text: 'Abgestimmt auf Ihren Betrieb und die anderen Gewerke.' },
      { title: 'Abnahme & Doku', text: 'Abschottungen gekennzeichnet, Unterlagen vollständig.' },
    ],
  },

  faq: {
    subtitle: 'Fragen & Antworten',
    title: 'Häufige Fragen, klare Antworten',
    items: [
      { q: 'Welche Anlagen dämmen Sie?', a: 'Rohrleitungen und Armaturen, Verteiler, Behälter, Speicher und Tanks sowie Lüftungs- und Klimakanäle: gegen Wärmeverlust, Kondensat, Feuer und Lärm. Dazu kommen Blechummantelungen und Brandschutzabschottungen an Wand- und Deckendurchführungen.' },
      { q: 'Arbeiten Sie auch außerhalb von Mannheim?', a: 'Ja. Unser Sitz ist Mannheim, wir arbeiten in ganz Deutschland, in Österreich und in der Schweiz.' },
      { q: 'Wie kommen wir zu einem Angebot?', a: 'Schicken Sie uns über das Formular oder per E-Mail die Eckdaten, gern mit Fotos oder Plänen. Danach sehen wir uns die Anlage vor Ort an, nehmen Maß und schicken Ihnen ein schriftliches Angebot.' },
      { q: 'Welche Materialien setzen Sie ein?', a: 'Je nach Aufgabe Mineralwolle, Elastomer (zum Beispiel Armaflex), Schaumglas (zum Beispiel Foamglas) und Systeme von Isover, Alujet und Geralit, darüber Mäntel aus Aluminium oder verzinktem Stahl. Für Abschottungen nutzen wir zugelassene Brandschutzsysteme.' },
      { q: 'Dokumentieren Sie Brandschutzabschottungen?', a: 'Ja. Jede Abschottung wird gekennzeichnet, und Sie erhalten die Unterlagen, die Sie für die Abnahme brauchen.' },
      { q: 'Arbeiten Sie für Generalunternehmer und TGA-Firmen?', a: 'Wir arbeiten direkt für Betreiber ebenso wie als Gewerk im Projekt eines Generalunternehmers oder einer TGA-Fachfirma. Sprechen Sie uns an.' },
    ],
  },

  services: {
    waermedaemmung: {
      name: 'Wärmedämmung',
      summary: 'Mineralwolle und Blechmantel für warmgehende Leitungen, Armaturen, Behälter und Kanäle.',
      meta: {
        title: 'Wärmedämmung für Rohrleitungen, Behälter und Anlagen',
        description: 'Wärmedämmung von Rohrleitungen, Armaturen, Behältern und Kanälen mit Mineralwolle und Blechummantelung. IsoPro Energies aus Mannheim, tätig in Deutschland, Österreich und der Schweiz.',
      },
      headline: 'Wärmedämmung für Rohrleitungen, Behälter und Anlagen',
      lead: 'Wir dämmen warmgehende Leitungen, Armaturen, Behälter und Kanäle: von der Planung über die Montage bis zur Blechummantelung. Damit die Wärme im Medium bleibt und nicht in der Halle.',
      scopeTitle: 'Was wir wärmedämmen',
      scope: [
        { title: 'Rohrleitungen und Armaturen', text: 'Rohrschalen und Matten aus Mineralwolle. Armaturen und Flansche bekommen abnehmbare Kappen, damit sie für die Wartung zugänglich bleiben.' },
        { title: 'Behälter, Speicher und Tanks', text: 'Dämmung von Behältern, Speichern, Kolonnen und Tanks, in der Halle wie im Außenbereich.' },
        { title: 'Verteiler in Technikzentralen', text: 'Heizungsverteiler, Pumpengruppen und Steigleitungen, sauber ummantelt und beschriftbar.' },
        { title: 'Blechummantelung', text: 'Mantel aus Aluminium oder verzinktem Stahl. Er schützt die Dämmung vor Stößen und Witterung und hält sie über Jahre wirksam.' },
      ],
      benefits: [
        { title: 'Weniger Energie, niedrigere Kosten', text: 'Jeder Meter ungedämmte Leitung gibt Wärme ab, die bezahlt wurde. Eine passende Dämmung senkt den Verlust und damit Energieeinsatz und CO₂.' },
        { title: 'Schutz vor heißen Oberflächen', text: 'Gedämmte Leitungen und Behälter bleiben an der Oberfläche berührbar. Das schützt Mitarbeitende und Anlagenteile in der Umgebung.' },
        { title: 'Vorgaben sicher einhalten', text: 'Für Heizungs- und Warmwasserleitungen in Gebäuden schreibt das Gebäudeenergiegesetz (GEG) eine Dämmung vor. Wir wählen Dämmstoff und Dicke passend dazu.' },
      ],
      faq: [
        { q: 'Welche Dämmstoffe setzen Sie bei warmgehenden Leitungen ein?', a: 'Meist Mineralwolle, als Rohrschale oder als Drahtnetzmatte. Welche Variante und welche Dicke, hängt von Temperatur, Durchmesser und Umgebung ab. Darüber kommt ein Mantel aus Aluminium oder verzinktem Stahl.' },
        { q: 'Lohnt es sich, Armaturen und Flansche zu dämmen?', a: 'Ja. Ungedämmte Armaturen sind Wärmebrücken, über die viel Energie verloren geht. Mit abnehmbaren Kappen bleiben sie trotzdem für Wartung und Prüfung zugänglich.' },
        { q: 'Können Sie im laufenden Betrieb arbeiten?', a: 'In vielen Fällen ja. Montagezeiten, Bereiche und Zugänge stimmen wir vorher mit Ihrem Betrieb und den anderen Gewerken ab.' },
      ],
    },
    kaeltedaemmung: {
      name: 'Kältedämmung',
      summary: 'Diffusionsdicht gedämmt, damit kein Tauwasser entsteht und die Kälte im System bleibt.',
      meta: {
        title: 'Kältedämmung für Kälte-, Klima- und Kühlwasseranlagen',
        description: 'Diffusionsdichte Kältedämmung mit Elastomer oder Schaumglas für Kälte-, Klima- und Kühlwasserleitungen. IsoPro Energies aus Mannheim.',
      },
      headline: 'Kältedämmung für Kälte-, Klima- und Kühlwasseranlagen',
      lead: 'Kalte Leitungen brauchen eine Dämmung, die dicht bleibt. Wir dämmen Kälte- und Klimaanlagen diffusionsdicht, damit kein Tauwasser entsteht und die Kälte dort bleibt, wo sie hingehört.',
      scopeTitle: 'Was wir kältedämmen',
      scope: [
        { title: 'Kälte- und Kühlwasserleitungen', text: 'Leitungen, Formteile und Armaturen diffusionsdicht gedämmt, mit verklebten Stößen und Endabschlüssen.' },
        { title: 'Verteiler und Pumpengruppen', text: 'Elastomer passgenau um Pumpen, Ventile und Verteiler, damit auch an Formteilen kein Tauwasser entsteht.' },
        { title: 'Klima- und Lüftungsanlagen', text: 'Kalte Kanäle und Anschlüsse von Klimageräten, in der Zentrale und auf dem Dach.' },
        { title: 'Behälter und Speicher', text: 'Kältespeicher und Behälter, bei tiefen Temperaturen auch mit Schaumglas.' },
      ],
      benefits: [
        { title: 'Kein Tauwasser, keine Korrosion', text: 'Wo warme Luft auf kalte Oberflächen trifft, kondensiert Feuchte. Eine dichte Dämmung verhindert nasse Dämmstoffe, Tropfwasser und Korrosion unter der Dämmung.' },
        { title: 'Kälte bleibt im System', text: 'Weniger Kälteverlust heißt weniger Laufzeit für Kältemaschinen und niedrigere Energie- und Betriebskosten.' },
        { title: 'Auf Dauer wirksam', text: 'Kältedämmung steht und fällt mit der Verarbeitung. Wir verkleben jede Naht und jeden Abschluss so, dass die Dampfbremse über Jahre geschlossen bleibt.' },
      ],
      faq: [
        { q: 'Warum ist bei Kälteleitungen die Dichtheit so wichtig?', a: 'Wasserdampf aus der Raumluft wandert zur kalten Rohroberfläche und kondensiert dort. Ist die Dämmung nicht dicht, wird sie nass, verliert ihre Wirkung, und das Rohr beginnt zu rosten. Deshalb wird kältegedämmt diffusionsdicht und mit verklebten Nähten.' },
        { q: 'Elastomer oder Schaumglas: was passt wann?', a: 'Elastomer (zum Beispiel Armaflex) ist flexibel und schnell montiert, typisch für Klima- und Kälteleitungen in Gebäuden. Schaumglas (zum Beispiel Foamglas) ist druckfest, nicht brennbar und dampfdicht und eignet sich für tiefe Temperaturen und anspruchsvolle Bereiche. Was passt, klären wir bei der Begehung.' },
        { q: 'Sanieren Sie auch durchfeuchtete Dämmung?', a: 'Ja. Wir bauen die nasse Dämmung zurück, sehen uns den Untergrund an und dämmen neu und dicht.' },
      ],
    },
    brandschutz: {
      name: 'Brandschutz',
      summary: 'Abschottungen nach Zulassung, nichtbrennbare Dämmung und ein Schild an jeder Durchführung.',
      meta: {
        title: 'Brandschutz: Abschottungen und Brandschutzdämmung',
        description: 'Brandschutzabschottungen für Rohr- und Leitungsdurchführungen, nichtbrennbare Dämmung und Kennzeichnung jeder Abschottung. IsoPro Energies aus Mannheim.',
      },
      headline: 'Brandschutz für Leitungen und Durchführungen',
      lead: 'Wo Leitungen durch Wände und Decken gehen, darf ein Feuer nicht mitwandern. Wir schotten Durchführungen mit zugelassenen Systemen ab, dämmen Leitungen nichtbrennbar und kennzeichnen jede Abschottung.',
      scopeTitle: 'Was wir im Brandschutz übernehmen',
      scope: [
        { title: 'Rohrabschottungen', text: 'Durchführungen in Decken und Wänden, verschlossen mit dem System, das zu Rohrwerkstoff, Durchmesser und Bauteil passt.' },
        { title: 'Brandschutzdämmung an Leitungen', text: 'Nichtbrennbare Dämmung an Rohrleitungen, auch dort, wo Wärme- oder Kältedämmung und Brandschutz zusammenkommen.' },
        { title: 'Kennzeichnung und Dokumentation', text: 'Jede Abschottung bekommt ihr Schild. Dazu erhalten Sie die Unterlagen, die Sie für die Abnahme brauchen.' },
        { title: 'Sensible Gebäude', text: 'Krankenhäuser, Flughäfen, Produktionshallen und Verwaltungsbauten, in denen Brandschutz und laufender Betrieb zusammenpassen müssen.' },
      ],
      benefits: [
        { title: 'Eingebaut nach Zulassung', text: 'Jedes Abschottungssystem hat seine Regeln: welche Rohre, welche Dämmung, welche Bauteile. Wir bauen es so ein, wie die Zulassung es verlangt.' },
        { title: 'Nachweisbar bis zur letzten Durchführung', text: 'Ein Schild an jeder Abschottung und vollständige Unterlagen machen die Abnahme einfacher und spätere Änderungen nachvollziehbar.' },
        { title: 'Dämmung und Brandschutz aus einer Hand', text: 'Wer dämmt, sollte auch abschotten: das spart eine Schnittstelle zwischen zwei Gewerken, an der sonst Fehler entstehen.' },
      ],
      faq: [
        { q: 'Was gehört zu einer fachgerechten Abschottung?', a: 'Ein zugelassenes System, das zu Rohrwerkstoff, Durchmesser, Dämmung und Bauteil passt, ein Einbau genau nach dieser Zulassung, die Kennzeichnung an der Abschottung und die Übereinstimmungserklärung des Errichters.' },
        { q: 'Wer dokumentiert die Abschottungen?', a: 'Wir. Jede Abschottung trägt ein Schild mit ihren Angaben, und Sie bekommen die Unterlagen für die Abnahme mit.' },
        { q: 'Können Wärme- oder Kältedämmung und Brandschutz zusammen ausgeführt werden?', a: 'Ja, und das ist meist sinnvoll: An der Durchführung trifft die Dämmung auf die Abschottung. Kommt beides aus einer Hand, passen die Systeme zueinander.' },
      ],
    },
    schallschutz: {
      name: 'Schallschutz',
      summary: 'Leisere Leitungen, Kanäle und Anlagenteile, auf Wunsch kombiniert mit Wärme oder Kälte.',
      meta: {
        title: 'Schallschutz für Rohrleitungen, Kanäle und Anlagen',
        description: 'Schalldämmung von Rohrleitungen, Lüftungskanälen und Anlagenteilen, auf Wunsch kombiniert mit Wärme- oder Kältedämmung. IsoPro Energies aus Mannheim.',
      },
      headline: 'Schallschutz für Leitungen, Kanäle und Anlagen',
      lead: 'Laute Anlagen belasten Mitarbeitende und Nachbarn. Wir dämmen Leitungen, Kanäle und Anlagenteile schalltechnisch, damit es im Betrieb und um ihn herum leiser wird.',
      scopeTitle: 'Was wir schalldämmen',
      scope: [
        { title: 'Rohrleitungen', text: 'Leitungen mit Strömungs- oder Pumpengeräuschen, in Technikzentralen, Hallen und an Fassaden.' },
        { title: 'Lüftungs- und Klimakanäle', text: 'Kanäle, die Geräusche von Ventilatoren und Geräten weitertragen, innen wie auf dem Dach.' },
        { title: 'Anlagenteile und Aggregate', text: 'Schalldämmung an Geräten, Behältern und Anlagenteilen, abgestimmt auf Wartungszugänge.' },
      ],
      benefits: [
        { title: 'Leiser am Arbeitsplatz', text: 'Weniger Lärm in Hallen und Technikräumen entlastet Mitarbeitende und hilft, Vorgaben zum Lärmschutz einzuhalten.' },
        { title: 'Ruhe für die Nachbarschaft', text: 'Anlagen auf Dächern und an Fassaden sind oft die lautesten Quellen nach außen. Eine Schalldämmung hilft, Auflagen zum Immissionsschutz einzuhalten.' },
        { title: 'Kombiniert mit Wärme und Kälte', text: 'Schall-, Wärme- und Kältedämmung lassen sich in einem Aufbau verbinden. Das spart einen zweiten Arbeitsgang.' },
      ],
      faq: [
        { q: 'Wie wird eine Rohrleitung schallgedämmt?', a: 'Meist mit einem mehrschichtigen Aufbau: Mineralwolle nimmt den Schall auf und entkoppelt, eine Schwerfolie schirmt ab, und ein Blechmantel schließt das Ganze ohne starre Verbindung zum Rohr ab.' },
        { q: 'Lässt sich Schallschutz mit Wärme- oder Kältedämmung kombinieren?', a: 'Ja. Der Aufbau wird dann so gewählt, dass er beide Aufgaben erfüllt, bei Kälteleitungen zusätzlich diffusionsdicht.' },
        { q: 'Woher wissen wir, welche Maßnahme nötig ist?', a: 'Bei der Begehung sehen wir uns die Quelle und die Umgebung an. Liegen Messungen oder ein Gutachten vor, bauen wir darauf auf.' },
      ],
    },
  } satisfies Record<ServiceSlug, ServiceText>,

  /** The parts every service page shares */
  servicePage: {
    back: 'Alle Leistungen',
    benefits: 'Ihr Nutzen',
    faq: 'Häufige Fragen',
    ctaText: 'Sie planen ein Projekt? Schicken Sie uns Eckdaten, Pläne oder Fotos.',
    ctaButton: 'Projekt anfragen',
    more: 'Mehr zu {name}',
    others: { subtitle: 'Weitere Leistungen', title: 'Alles aus einer Hand', button: 'Alle Leistungen' },
  },

  servicesPage: {
    meta: {
      title: 'Leistungen: Dämmtechnik und Brandschutz',
      description: 'Wärmedämmung, Kältedämmung, Brandschutz und Schallschutz für Rohrleitungen, Behälter und Kanäle. IsoPro Energies aus Mannheim.',
    },
    banner: {
      subtitle: 'Unsere Leistungen',
      title: 'Dämmtechnik für jede Anlage',
      text: 'Wärme, Kälte, Brand und Schall: Wir finden den Aufbau, der zu Ihrer Anlage passt, und führen ihn sauber aus.',
      button: 'Projekt anfragen',
    },
    intro: {
      subtitle: 'Unsere Leistungen',
      title: 'IsoPro liefert Dämmung und Brandschutz aus einer Hand, für Anlagen, die laufen müssen.',
    },
  },

  about: {
    meta: {
      title: 'Über uns: Dämmtechnik aus Mannheim',
      description: 'IsoPro Energies GmbH: Dämmtechnik und Brandschutz aus Mannheim. Wärme-, Kälte-, Brand- und Schallschutz für Industrie, Gewerbe und technische Gebäude.',
    },
    banner: {
      subtitle: 'Über IsoPro Energies',
      title: 'Dämmtechnik und Brandschutz aus Mannheim',
      text: 'Wir planen, dämmen und schotten ab: für Betreiber, Generalunternehmer und TGA-Firmen.',
      button: 'Projekt anfragen',
    },
    mission: {
      subtitle: 'Wer wir sind',
      title: 'Energie sparen beginnt an der Leitung.',
      text: 'Energie zu sparen und CO₂ zu vermeiden, ist nicht nur eine Frage des Klimas, sondern auch der Wirtschaftlichkeit. Gerade in Industrieanlagen, Krankenhäusern, Flughäfen und großen Verwaltungsbauten geht über ungedämmte Leitungen und Behälter viel Energie verloren.',
      blocks: [
        {
          title: 'Unsere Aufgabe',
          text: 'Wir sorgen dafür, dass die Energie im System bleibt: mit Dämmungen, die zur Aufgabe passen, sauber ausgeführt und dokumentiert. Und weil Brandschutz im Isolierhandwerk an erster Stelle steht, gehört er bei uns von Anfang an dazu.',
          items: ['Saubere Details', 'Lückenlos dokumentiert', 'Ein Ansprechpartner'],
        },
        {
          title: 'Unser Einsatzgebiet',
          text: 'Von Mannheim aus sind wir in Deutschland, Österreich und der Schweiz im Einsatz: für Betreiber, Generalunternehmer und TGA-Firmen.',
          items: [],
        },
      ],
      director: 'Geschäftsführer: {name}',
      imageAlts: ['Gedämmte Verteiler in einer Technikzentrale', 'Gedämmte Lüftungskanäle auf einem Dach'],
    },
    timeline: { subtitle: 'So arbeiten wir', title: 'Von der Anfrage bis zur Abnahme', label: 'Schritt {n}' },
    partners: 'Wir verarbeiten Systeme von',
  },

  career: {
    meta: {
      title: 'Karriere: Jobs für Isolierer in Mannheim',
      description: 'Jobs bei IsoPro Energies in Mannheim: Monteure und Isolierer, Berufseinsteiger und Nachunternehmer für Wärme-, Kälte- und Brandschutzdämmung.',
    },
    banner: {
      subtitle: 'Karriere',
      title: 'Karriere bei IsoPro Energies',
      text: 'Wir suchen Menschen, die unsere Leidenschaft für Energieeffizienz teilen: mit viel Erfahrung oder ganz am Anfang.',
      button: 'Jetzt bewerben',
    },
    why: {
      subtitle: 'Warum IsoPro?',
      title: 'Abwechslungsreiche Projekte, ein starkes Team und echte Entwicklung.',
      text: 'Ob Technikzentrale, Tanklager oder Dachkanal: Bei uns arbeiten Sie an Anlagen in Industrie und Gewerbe, im Team und mit Material, das Sie kennen. Wer neu einsteigt, wird eingearbeitet.',
    },
    rolesTitle: 'Offene Stellen',
    rolesHeading: 'Werden Sie Teil unseres Teams',
    // The keys are the anchors the footer links to (/karriere#nachunternehmer)
    roles: {
      monteure: { title: 'Monteure & Isolierer (m/w/d)', text: 'Erfahrung in Wärme-, Kälte- oder Brandschutzdämmung, gern auch mit Blechbearbeitung.' },
      einsteiger: { title: 'Berufseinsteiger (m/w/d)', text: 'Handwerklich geschickt und motiviert? Wir arbeiten Sie im Team ein.' },
      nachunternehmer: { title: 'Nachunternehmer', text: 'Isolierbetriebe und Kolonnen, die bei größeren Projekten dauerhaft mit uns arbeiten wollen.' },
    },
    lists: [
      { title: 'Ihre Aufgaben', items: ['Wärmedämmung an Rohrleitungen, Behältern und Kanälen', 'Kältedämmung an Kälte- und Klimaanlagen', 'Brandschutz an Durchführungen und Leitungen', 'Blechummantelung und Armaturenkappen'] },
      { title: 'Ihr Profil', items: ['Motivation und Freude am Handwerk', 'Teamfähigkeit', 'Zuverlässigkeit', 'Fachkenntnisse oder die Bereitschaft, sie zu lernen'] },
      { title: 'Was wir bieten', items: ['Abwechslungsreiche Projekte in Industrie und Gewerbe', 'Einarbeitung im Team', 'Entwicklungsmöglichkeiten im Betrieb'] },
    ],
    /** Subject line of the application email */
    subject: 'Bewerbung',
  },

  contact: {
    meta: {
      title: 'Kontakt und Projektanfrage',
      description: 'Kontakt zu IsoPro Energies in Mannheim: Telefon, E-Mail und Projektanfrage für Wärme-, Kälte-, Brand- und Schallschutz.',
    },
    banner: {
      subtitle: 'Kontakt',
      title: 'Lassen Sie uns über Ihr Projekt sprechen',
      text: 'Rufen Sie an, schreiben Sie uns oder schicken Sie Ihre Anfrage direkt über das Formular.',
    },
    form: {
      subtitle: 'Projekt anfragen',
      title: 'Vier kurze Schritte',
      text: 'Mit Fotos oder Plänen können wir Ihr Projekt schneller einschätzen.',
    },
    ways: { phone: 'Telefon', email: 'E-Mail', office: 'Büro' },
    // Where IsoPro works, as listed on the old start page
  },

  referencesPage: {
    meta: {
      title: 'Referenzen: Dämmung und Brandschutz',
      description: 'Ausgeführte Arbeiten von IsoPro Energies: Wärme- und Kältedämmung, Brandschutzabschottungen, Lüftungs- und Klimakanäle.',
    },
    banner: {
      subtitle: 'Referenzen',
      title: 'Ausgeführte Arbeiten',
      text: 'Fotos von unseren Baustellen. Kunden, Orte und Mengen nennen wir auf Anfrage.',
    },
  },

  /* The blog's page texts (app/blog). The articles themselves are in lib/blog.ts, in German only. */
  blog: {
    meta: {
      title: 'Blog: Praxiswissen Dämmung und Brandschutz',
      description: 'Praxiswissen zu Wärmedämmung, Kältedämmung und Brandschutz an technischen Anlagen, von IsoPro Energies aus Mannheim.',
    },
    banner: {
      subtitle: 'Blog',
      title: 'Wissen aus der Praxis',
      text: 'Was wir auf Baustellen sehen und worauf es ankommt: Beiträge zu Wärmedämmung, Kältedämmung, Brandschutz und Schallschutz an technischen Anlagen.',
    },
    readTime: '{n} Min. Lesezeit',
    read: 'Weiterlesen',
    published: 'Veröffentlicht am {date}',
    summary: 'Das Wichtigste in Kürze',
    contents: 'Inhalt',
    faq: 'Häufige Fragen zum Thema',
    home: 'Start',
    back: 'Alle Beiträge',
    more: 'Weitere Beiträge',
    ctaText: 'Sie haben eine Frage zu Ihrer Anlage? Wir sehen sie uns gern an.',
    ctaButton: 'Projekt anfragen',
  },

  refCategories: {
    waerme: 'Wärmedämmung',
    kaelte: 'Kältedämmung',
    brand: 'Brandschutz',
    lueftung: 'Lüftung & Klima',
  } satisfies Record<RefCategory, string>,

  /* What each photo in lib/references.ts shows. The old site has no project data (no client, place,
     year or quantity), so the cards say only what the photo shows. */
  references: {
    p13: { title: 'Heizungsverteiler mit Blechmantel', specs: [['Objekt', 'Verteiler und Pumpengruppen'], ['Aufbau', 'Dämmung, Blechummantelung'], ['Detail', 'abnehmbare Armaturenkappen']] },
    p18: { title: 'Rohrabschottungen in der Geschossdecke', specs: [['Objekt', 'Rohrdurchführungen'], ['Aufbau', 'Abschottung mit Brandschutzmörtel'], ['Nachweis', 'Schild an jeder Abschottung']] },
    p11: { title: 'Verteiler in Elastomer', specs: [['Objekt', 'Verteiler und Pumpengruppen'], ['Aufbau', 'Elastomer, diffusionsdicht verklebt'], ['Detail', 'passgenau an Formteilen']] },
    p05: { title: 'Lüftungskanäle auf dem Dach', specs: [['Objekt', 'außenliegende Kanäle'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'wetterfest ummantelt']] },
    p17: { title: 'Montage an Dachkanälen', specs: [['Objekt', 'Lüftungskanäle im Außenbereich'], ['Aufbau', 'Dämmung, Aluminiummantel'], ['Detail', 'Montage vom Gerüst']] },
    p06: { title: 'Behälter und Leitungen im Außenbereich', specs: [['Objekt', 'Behälter, Rohrleitungen'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'witterungsfest']] },
    p08: { title: 'Abschottung mit Kennzeichnung', specs: [['Objekt', 'Rohrdurchführungen in der Decke'], ['Aufbau', 'Brandschutzmörtel'], ['Nachweis', 'Kennzeichnungsschild']] },
    p02: { title: 'Pumpengruppe in Elastomer', specs: [['Objekt', 'Pumpen und Formteile'], ['Aufbau', 'Elastomer'], ['Detail', 'Pumpenköpfe frei zugänglich']] },
    p29: { title: 'Verteiler in der Technikzentrale', specs: [['Objekt', 'Verteilerbalken, Steigleitungen'], ['Aufbau', 'Dämmung, Blechmantel'], ['Stand', 'während der Montage']] },
    p28: { title: 'Lüftungsgerät mit Kanalanschlüssen', specs: [['Objekt', 'Kanäle am Dachgerät'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'Außenaufstellung']] },
    p21: { title: 'Leitungen durch die Decke', specs: [['Objekt', 'Rohrleitungen mit Dämmung'], ['Aufbau', 'Abschottung je Durchführung'], ['Nachweis', 'Kennzeichnung an der Decke']] },
    p19: { title: 'Verteiler während der Montage', specs: [['Objekt', 'Verteiler, Pumpengruppen'], ['Aufbau', 'Elastomer'], ['Stand', 'Montage läuft']] },
    p09: { title: 'Verteiler mit Absperrarmaturen', specs: [['Objekt', 'Verteiler, Armaturen'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'Handräder frei bedienbar']] },
    p16: { title: 'Kanaltrasse über dem Flachdach', specs: [['Objekt', 'Lüftungskanäle'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'wetterfest ummantelt']] },
    p23: { title: 'Abschottungen an Steigleitungen', specs: [['Objekt', 'Rohrdurchführungen'], ['Aufbau', 'Abschottung, Streckendämmung'], ['Nachweis', 'Kennzeichnungsschilder']] },
    p24: { title: 'Armaturen in Elastomer', specs: [['Objekt', 'Absperrarmaturen, Rohrleitungen'], ['Aufbau', 'Elastomer'], ['Detail', 'Handrad frei']] },
    p27: { title: 'Leitungen an der Lüftungszentrale', specs: [['Objekt', 'Rohrleitungen am Lüftungsgerät'], ['Aufbau', 'Dämmung, Aluminiummantel'], ['Detail', 'lange gerade Trassen']] },
    p20: { title: 'Verteiler mit Steigleitungen', specs: [['Objekt', 'Verteiler, Steigleitungen'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'Leitungen bis unter die Decke']] },
    p14: { title: 'Abschottung mit Dämmung', specs: [['Objekt', 'gedämmte Rohrdurchführungen'], ['Aufbau', 'Brandschutzmörtel'], ['Nachweis', 'Kennzeichnungsschild']] },
    p30: { title: 'Kanal am Lüftungsgerät', specs: [['Objekt', 'Kanalanschluss'], ['Aufbau', 'Dämmung, Blechmantel'], ['Detail', 'Außenaufstellung']] },
  } satisfies Record<string, ReferenceText>,

  notFound: {
    subtitle: 'Fehler 404',
    title: 'Diese Seite gibt es nicht',
    text: 'Vielleicht hat sich die Adresse geändert. Auf der Startseite finden Sie alle Leistungen.',
    button: 'Zur Startseite',
  },

  footer: {
    company: 'Unternehmen',
    services: 'Leistungen',
    info: 'Info',
    faq: 'Häufige Fragen',
    subcontractors: 'Nachunternehmer',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    lead: 'Sie haben eine Frage zu Ihrer Anlage? Schreiben Sie uns, wir antworten persönlich.',
    write: 'Anfrage stellen',
    rights: '© {year} {name}. Alle Rechte vorbehalten.',
  },

  /** The strings Client Components use at runtime (components/i18n.tsx) */
  client: {
    nav: {
      home: '{name}, zur Startseite',
      main: 'Hauptnavigation',
      mobile: 'Mobile Navigation',
      open: 'Menü öffnen',
      close: 'Menü schließen',
      start: 'Start',
      services: 'Leistungen',
      allServices: 'Alle Leistungen',
      references: 'Referenzen',
      blog: 'Blog',
      about: 'Über uns',
      career: 'Karriere',
      contact: 'Kontakt',
    },

    /** The Google reviews slider on the start page */
    reviews: {
      prev: 'Vorherige Bewertung',
      next: 'Nächste Bewertung',
      position: 'Bewertung {n} von {total}',
    },

    grid: {
      filter: 'Referenzen filtern',
      all: 'Alle',
      open: '{title}: Foto groß anzeigen',
      close: 'Schließen',
    },

    form: {
      steps: ['Leistung', 'Objekt', 'Umfang', 'Kontakt'],
      progressLabel: 'Fortschritt',
      optional: '(optional)',
      // The email to IsoPro keeps the German labels in lib/inquiry.ts
      needs: {
        waerme: { label: 'Wärmedämmung', hint: 'warmgehende Leitungen und Anlagen' },
        kaelte: { label: 'Kältedämmung', hint: 'Kälte, Klima, Kühlwasser' },
        brand: { label: 'Brandschutz', hint: 'Abschottungen, Brandschutzdämmung' },
        schall: { label: 'Schallschutz', hint: 'laute Leitungen und Anlagen' },
        sonstiges: { label: 'Anderes', hint: 'Ummantelung, Sanierung, Wartung' },
      } satisfies Record<NeedKey, { label: string; hint: string }>,
      objects: {
        rohr: 'Rohrleitungen & Armaturen',
        behaelter: 'Behälter & Tanks',
        kanal: 'Lüftungs- & Klimakanäle',
        verteiler: 'Verteiler & Technikzentrale',
        durchfuehrung: 'Wand- & Deckendurchführungen',
        sonstiges: 'Anderes',
      } satisfies Record<ObjectKey, string>,
      timeframes: {
        bald: 'So bald wie möglich',
        quartal: 'In den nächsten 3 Monaten',
        spaeter: 'Später',
        offen: 'Noch offen',
      } satisfies Record<TimeframeKey, string>,
      needTitle: 'Worum geht es?',
      objectsTitle: 'Welche Bereiche betrifft es?',
      objectsHint: 'Mehrere Antworten möglich.',
      scopeTitle: 'Umfang, Ort und Zeitraum',
      location: 'Ort der Anlage',
      locationPlaceholder: 'PLZ und Ort',
      scope: 'Ungefährer Umfang',
      scopePlaceholder: 'z. B. 250 m Rohrleitung DN 50–150',
      timeframe: 'Wann soll es losgehen?',
      description: 'Beschreibung',
      descriptionPlaceholder: 'Medium und Temperaturen, Neubau oder Bestand, besondere Anforderungen …',
      files: 'Fotos oder Pläne',
      filesNote: '(optional, bis zu {max} Dateien)',
      preparing: 'Wird vorbereitet …',
      attach: 'Datei anhängen',
      remove: '{name} entfernen',
      contactTitle: 'Wie erreichen wir Sie?',
      company: 'Firma',
      name: 'Name',
      phone: 'Telefon',
      email: 'E-Mail',
      either: 'Telefon oder E-Mail genügt.',
      consent: {
        before: 'Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Mehr in der ',
        link: 'Datenschutzerklärung',
        after: '.',
      },
      back: 'Zurück',
      next: 'Weiter',
      sending: 'Wird gesendet …',
      send: 'Anfrage senden',
      done: {
        title: 'Danke, {name}. Ihre Anfrage ist bei uns.',
        text: 'Wir sehen sie uns an und melden uns {how}, mit Rückfragen oder einem Terminvorschlag für die Begehung.',
        byBoth: 'per E-Mail oder Telefon',
        byEmail: 'per E-Mail',
        byPhone: 'telefonisch',
        urgent: 'Eilig? Rufen Sie uns an:',
        preview: 'Entwicklungsmodus: Die Anfrage wurde nicht versendet, sondern im Server-Log ausgegeben (RESEND_API_KEY fehlt).',
        again: 'Neue Anfrage',
      },
      errors: {
        need: 'Bitte wählen Sie eine Leistung.',
        objects: 'Bitte wählen Sie mindestens einen Bereich.',
        name: 'Bitte geben Sie Ihren Namen an.',
        phone: 'Bitte prüfen Sie die Telefonnummer.',
        email: 'Bitte prüfen Sie die E-Mail-Adresse.',
        contact: 'Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.',
        consent: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
        tooMany: 'Sie können bis zu {max} Dateien anhängen.',
        wrongType: 'Bitte nur Fotos oder PDF-Dateien anhängen.',
        tooLarge: 'Die Dateien sind zusammen zu groß. Größere Pläne schicken Sie bitte per E-Mail.',
        failed: 'Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es noch einmal oder rufen Sie an: {phone}.',
        offline: 'Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
      },
    },

    dev: { label: 'Sprache der Vorschau' },
  },
};
