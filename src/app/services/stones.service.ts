import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface Stone {
  cssColor: string;
  name: string;
}

const Stones: Stone[] = [
  { name: 'Agate', cssColor: 'brown' },
  { name: 'Aigue-marine', cssColor: '#7FFFD4' },
  { name: 'Améthyste', cssColor: '#884da7' },
  { name: 'Aventurine', cssColor: '#989d79' },
  { name: 'Chrysoprase', cssColor: '#a0d3b6' },
  { name: 'Corail', cssColor: '#FF7F50' },
  { name: 'Cornaline', cssColor: '#b31b1b' },
  { name: 'Cristal', cssColor: '#a7d8de' },
  { name: 'Jaspe rouge', cssColor: '#d73b3e' },
  { name: 'Labradorite', cssColor: '#657b83' },
  { name: 'Lapis Lazuli', cssColor: '#26619c' },
  { name: 'Malachite', cssColor: '#1fa055' },
  { name: 'Œil de tigre', cssColor: '#e08d3c' },
  { name: 'Perles en bois', cssColor: '#855E42' },
  { name: 'Perles de culture', cssColor: '#eae0c8' },
  { name: 'Perles fantaisies', cssColor: '#c89524' },
  { name: 'Pierre de soleil', cssColor: '#e7c4ac' },
  { name: 'Quartz', cssColor: '#f9c9d7' },
  { name: 'Ruby Zoisite', cssColor: '#e0115f' },
  { name: 'Unakite', cssColor: '#808000' },
];

const Stories = {
  Agate: {
    title: 'Agate',
    description:
      "L'agate poss\u00E9de de merveilleuses propri\u00E9t\u00E9s sur notre espace de vie et\r\n      notre environnement. L'agate est la pierre id\u00E9ale pour\r\n      <strong>harmoniser l\u2019\u00E9nergie</strong> et d\u2019<strong>apaiser</strong> nos\r\n      lieux de vie ou lieux professionnels. Placer une agate dans votre lieu de\r\n      vie (salon) ou dans votre lieu de travail, elle vous apportera\r\n      <strong>chance</strong> et <strong>calme</strong>. Placer une agate dans\r\n      la chambre d\u2019une personne malade, elle <strong></strong> redonne courage,\r\n      et permet au <strong>moral</strong> d\u2019aller mieux afin de combattre la\r\n      maladie",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fagate_400x300.jpg?alt=media&token=553e1972-10dd-4e7b-b40a-3affec127299',
  },
  Cristal: {
    title: 'Cristal',
    description:
      "Puissant <strong>amplificateur</strong>. Amplifie l'aura. Il\r\n        <strong>renforce</strong> notre organisme et revitalise&nbsp;l'ensemble\r\n        du corps. Apporte <strong>clart\u00E9</strong> et\r\n        <strong>compr\u00E9hension</strong> sur notre vie. Aide \u00E0\r\n        <strong>r\u00E9soudre&nbsp;&nbsp;les probl\u00E8mes&nbsp;</strong>\r\n        simplement&nbsp;en d\u00E9veloppant nos facult\u00E9s intellectuelles. Active et\r\n        renforce \u00E9galement&nbsp;l'\u00E9nergie des autres pierres . Outil\r\n        indispensable pour les th\u00E9rapeutes car les grecs et bien d'autres\r\n        cultures s'en servaient pour chasser les d\u00E9mons et les maladies. De\r\n        plus, ils l'utilisaient pour lire l'avenir, pour \u00EAtre\r\n        <strong>clairvoyant</strong> sur les d\u00E9cisions \u00E0\r\n        prendre.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fcristal_400x300.jpg?alt=media&token=0c5ea5bc-bf63-4f0c-8c31-6cabe26e1faf',
  },
  Améthyste: {
    title: 'Améthyste',
    description:
      "Pierre de la <strong>spiritualit\u00E9</strong>. Cette pierre est la pierre de <strong>pr\u00E9dilection</strong> pour aider \u00E0 <strong>surmonter un deuil</strong>.\r\n    <strong>Calme les angoisses</strong>. Apporte <strong>d\u00E9tente</strong> et <strong>s\u00E9r\u00E9nit\u00E9</strong>. Aide les personnes souffrant de probl\u00E8me de boisson ou autre d\u00E9pendance \u00E0 r\u00E9sister face \u00E0 la\r\n    tentation. <strong>Favorise l'\u00E9veil</strong> et la <strong>sagesse</strong>. Favorise un <strong>sommeil</strong> plus <strong>r\u00E9parateur</strong> et <strong>serein</strong>, att\u00E9nue les\r\n    cauchemars.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Famethyst_400x300.jpg?alt=media&token=fe033986-800f-4596-957b-a92b456db824',
  },
  Aventurine: {
    title: 'Aventurine',
    description:
      "Favorise l'\u00E9mergence de <strong>l'enfant int\u00E9rieur</strong>, aide l'expression des sentiments tout en gardant son <strong>self-control</strong>. Id\u00E9al pour les\r\n    \u00E9motifs, les <strong>hypersensibles</strong> car elle permet la <strong>maitrise des \u00E9motions</strong> extr\u00EAmes pouvant se manifester sous forme de col\u00E8re et d'agressivit\u00E9. Id\u00E9al lors de\r\n    l'adolescence pour favoriser l'<strong>ouverture</strong> aux autres",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Faventurine_400x300.jpg?alt=media&token=1037f703-e0f9-4f2a-9982-85a31ec5b4bb',
  },
  'Ruby Zoisite': {
    title: 'Ruby Zoisite',
    description:
      'la pierre roul\u00E9e rubis sur zo\u00EFsite est r\u00E9put\u00E9e pour <strong>stimuler l\u2019\u00E9nergie</strong> vitale et la <strong>motivation</strong> gr\u00E2ce \u00E0 l\u2019association <strong>naturelle</strong> et l\u2019\u00E9quilibrage des deux forces compl\u00E9mentaires de la zo\u00EFsite (couleur verte symbole d\u2019\u00E9nergie <strong>positive</strong>) et du rubis (couleur rouge incarnant la <strong>force</strong>, l\u2019autorit\u00E9 et le courage). Puissante pierre de base et de vitalit\u00E9, le rubis sur zo\u00EFsite, symbole d\u2019<strong>amour</strong> (c\u0153ur spirituel), dynamise aussi bien le corps que l\u2019esprit.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fruby-zoisite_400x300.jpg?alt=media&token=4455d033-955a-4d6e-b899-e4b1340e6c4d',
  },
  Chrysoprase: {
    title: 'Chrysoprase',
    description:
      "Redonne <strong>confiance en soi</strong>. Selon Hildegarde de Bingen, d\u00E9toxique le corps (action filtrante sur l'\u00E9nergie du &nbsp;foie et la v\u00E9sicule biliaire) et\r\n    l'esprit (permet de chasser les pens\u00E9es n\u00E9gatives et blocages entrainant des probl\u00E8mes relationnels ou sexuels). Elle la recommande \u00E9galement pour \u00E9viter de prononcer de mauvaises paroles sous\r\n    l'action de la col\u00E8re.Permet d'\u00EAtre plus <strong>positif</strong> envers soi-m\u00EAme, de se <strong>satisfaire de sa vie</strong> sans \u00EAtre jaloux des autres.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fchrysoprase_400x300.jpg?alt=media&token=f99746f7-7492-4c85-9a54-2df9961cadc2',
  },
  'Aigue-marine': {
    title: 'Aigue-marine',
    description:
      "L'aigue marine d\u00E9veloppe en <strong>douceur</strong> la <strong>sensibilit\u00E9</strong> et l'expression. \r\nElle d\u00E9lie les blocages \u00E9motionnels thoraciques et laryng\u00E9s.\r\nElle permet de ne pas \u00EAtre dans le jugement, d'accro\u00EEtre l'<strong>expression</strong> et la lucidit\u00E9.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Faigue-marine_400x300.jpg?alt=media&token=8724d2ce-6d8a-4e5a-b1e2-dfe6d04cb3d6',
  },
  Quartz: {
    title: 'Quartz',
    description:
      "Cette pierre <strong>calmante</strong>&nbsp;&nbsp;est associ\u00E9e au <strong>chakra du c\u0153ur</strong>. Elle symbolise l<strong>'Amour</strong> au sens large du terme :\r\n    l'amour de son prochain, l'amour de soi, <strong>l'ouverture au niveau du c\u0153ur</strong> et aussi <strong>faire l'amour</strong>. Id\u00E9al pour <strong>les peines de c\u0153ur</strong>, pour combler un\r\n    manque affectif et devenir plus aimant, plus doux et tendre. Elle est \u00E9galement pr\u00E9conis\u00E9e en cas&nbsp;de <strong>stress</strong>, d'<strong>angoisse</strong> . Id\u00E9al pour <strong>les\r\n    enfants</strong>. Pour les nourrissons,&nbsp;je conseille souvent de glisser un quartz rose sous le matelas afin d'apporter une <strong>atmosph\u00E8re apaisante</strong> empreinte de s\u00E9r\u00E9nit\u00E9 autour\r\n    de b\u00E9b\u00E9.&nbsp;&nbsp; De plus, associ\u00E9 \u00E0&nbsp; de tourmaline noire,&nbsp;le quartz rose&nbsp;aide \u00E0 neutraliser les perturbations g\u00E9obiologiques.",
    image: '',
  },
  'Jaspe rouge': {
    title: 'Jaspe rouge',
    description:
      "<strong>\u00E9nergies n\u00E9gatives</strong>\r\n    accumul\u00E9es. Les jaspes en g\u00E9n\u00E9ral agissent sur le <strong>1er chakra</strong> en lien avec la vitalit\u00E9 et l'enracinement. Il est conseill\u00E9 de les <strong>porter \u00E0 m\u00EAme la peau</strong> et sur une\r\n    <strong>longue p\u00E9riode</strong> car ils agissent tout en douceur. Au moyen \u00E2ge, le jaspe \u00E9tait la <strong>pierre du guerrier</strong>, en effet elle favorise notre nature guerri\u00E8re et combative\r\n    mais dans le bon sens du terme. Devenir un guerrier de lumi\u00E8re afin de <strong>faire face</strong> aux <strong>difficult\u00E9s</strong> de la vie et \u00E0 l'agressivit\u00E9 : <strong>surmonter</strong> les\r\n    <strong>conflits internes</strong> et <strong>externes</strong>. Renforce le courage et la pers\u00E9v\u00E9rance.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fjaspe-rouge_400x300.jpg?alt=media&token=63083a37-704a-4949-ae78-30b690f66ec1',
  },
  Cornaline: {
    title: 'Cornaline',
    description:
      "Hildegarde de Bingen la conseillait pour les <strong>femmes enceintes</strong> afin de favoriser un bon accouchement. Par contre, selon de nombreux t\u00E9moignages, il\r\n    semblerait indispensable de la retirer lorsque le travail commence, c'est-\u00E0-dire lors des premi\u00E8res contractions, au risque de bloquer le travail. <strong>Stimule\r\n l'organisme</strong>. Id\u00E9ale pour les&nbsp;blocages d'ordre sexuels : baisse de libido.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fcornaline_400x300.jpg?alt=media&token=7fe14f29-2a5a-466a-b047-2b6328b3f872',
  },
  Labradorite: {
    title: 'Labradorite',
    description:
      '<strong>Bouclier de protection</strong> pour <strong><em>\u00ABles \u00E9ponges \u00E9motionnelles\u00BB : &nbsp;</em></strong>les personnes hypersensibles<strong><em>.</em></strong>\r\n    On l\'appelle \u00E9galement la "<strong><em>pierre des th\u00E9rapeutes</em></strong>" ou encore <strong><em>"pierre des gu\u00E9risseurs"</em></strong> car elle&nbsp;permet&nbsp;aux professionnels de la\r\n    sant\u00E9,&nbsp;&nbsp;aux professionnels du domaine social et toutes les personnes&nbsp;<strong>altruistes</strong>&nbsp;de rester dans l<strong>\'aide</strong>, dans&nbsp;l\'<strong>\u00E9coute</strong>\r\n    <strong>active</strong><em>&nbsp;</em>&nbsp;tout en se prot\u00E9geant. La labradorite nous enveloppe de son manteau de lumi\u00E8re et absorbe les <strong>\u00E9nergies n\u00E9gatives</strong>. Elle&nbsp; nous\r\n    prot\u00E8ge du monde ext\u00E9rieur. Travaille sur les <strong>blessures \u00E9motionnelles</strong>, m\u00EAme les plus anciennes. Redonne de l\u2019\u00E9nergie. Favorise <strong>l\'amiti\u00E9</strong> en augmentant\r\n    consid\u00E9rablement notre vibration.',
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Flabradorite_400x300.jpg?alt=media&token=c592f84f-dbcf-4dbd-aa9e-556b0658760c',
  },
  'Lapis Lazuli': {
    title: 'Lapis Lazuli',
    description: `
    Le Lapis Lazuli est reconnu pour <strong>réduire le stress</strong>
     et les différents symptômes qui y sont liés : migraines, maux de ventre, inflammations diverses sont moins forts, 
     voire même éradiqués grâce à l'action apaisante de la pierre. 
     Elle contribue aussi à <strong>améliorer le sommeil</strong>, les allergies et les difficultés respiratoires.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2FLapis%20Lazuli.jpg?alt=media&token=c8551bd1-09f9-492f-bafb-e147c683eeba',
  },

  'Perles de culture': {
    title: 'Perles de culture',
    description: `
    C’est la pierre de la sincérité.
Elle soulagerait les problèmes d’<strong>infection des yeux</strong> (vision, cataracte,…)
Elle régulerait les palpitations du cœur et l’<strong>hypertension</strong>.
On l’utilise pour les <strong>problèmes de digestion</strong>.
La perle de culture augmenterait la <strong>fertilité</strong>.
Elle serait utile pour les traitements de la <strong>bipolarité</strong>.
Elle améliorerait le fonctionnement <strong>rénal</strong>.
La perle de culture aiderait dans les problèmes d’<strong>arthrite</strong>, de </strong>rhumatisme<strong> et du </strong>système lymphatique</strong>.
Elle soulagerait des problèmes <strong>cutanés</strong>.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fperles-de-culture_400x300.jpg?alt=media&token=539b5461-e902-476a-ad02-0d311825a336',
  },

  'Perles fantaisies': {
    title: 'Perles fantaisies',
    description: '',
    image: '',
  },
  'Perles en bois': {
    title: 'Perles en bois',
    description: '',
    image: '',
  },
  Corail: {
    title: 'Corail',
    description: `
    Le corail rouge est efficace pour les <strong>troubles de la circulation sanguine</strong>, telles que les varices, les hémorroïdes.
Il compense les <strong>carences en globules rouges et blanches</strong>.
Il est efficace pour le <strong>cholestérol</strong>, les problèmes de poids ou la <strong>fécondité</strong>.
Il <strong>fortifie le coeur</strong> et résorbe les verrues.
Il combat l’anémie.
il facilite la digestion et supprime la constipation.
Le corail blanc <strong>renforce la dentition</strong>.
Il est fréquemment indiqué lors de décalcification.
Il est souvent utilisé pour les greffes osseuses.
Le corail noir combat les énergies négatives
D’un précieux réconfort, il <strong>lutte contre la dépression</strong>.
D’une façon générale, le corail apporte une stabilité, ouvre à l’amour et au dévouement.
Il développe l’intuition, donne de l’énergie, du soutien et de la joie.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fcorail_400x300.jpg?alt=media&token=9c4b7e72-e484-4665-b4ae-b196842eab39',
  },
  Malachite: {
    title: 'Malachite',
    description: `
    En lithothérapie la malachite est une pierre très efficace <strong>contre les douleurs</strong> et contre les problèmes articulaires, absorbant les douleurs tel une éponge lorsqu’elle est appliqué sur les zones douloureuses. C’est une pierre <strong>anti-inflammatoire</strong> d’un point de vu énergétique, elle agira là ou sont les inflammations, les douleurs, elle est aussi diurétique.
La malachite améliore la capacité de persuasion et <strong>libère</strong> les blocages émotionnels du passé qui se sont enfouit au fil du temps dans les profondeurs de l’âme.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fmalachite_400x300.jpg?alt=media&token=87367a9f-5652-4ba7-9361-5fed2c89f933',
  },
  Unakite: {
    title: 'Unakite',
    description: `
    Sur le plan mental en lithothérapie, la pierre unakite permet à celui ou celle qui la porte de se retrouver face à lui ou elle-même. Si l’unakite est portée par exemple en pendentif unakite, les blocages liés au passé et étant enfouis dans l’inconscient s’éliminent petit à petit. L’<strong>unakite</strong> permet aussi d’apprendre à <strong>relativiser</strong> sur les situations, mais aussi à prendre du recul.

Il est très rare de trouver la pierre unakite à l’état de gemme, mais sous forme alvéolaire. Elle répond parfaitement à des problèmes osseux lorsqu’elle est majoritairement constituée de beige. Autrement, l’unakite répond aux <strong>problèmes de foie, d’intestins et de vésicule biliaire</strong> lorsqu’elle est dotée de touches vert jaune, vert sombre, avec des traces rouges clairs.

Sur le plan physique en lithothérapie, la pierre unakite permet de réguler l’ensemble des fonctions intestinales ainsi que le foie par le biais du chakra du plexus solaire. Les lithothérapeutes travaillent également sur le <strong>chakra</strong> racine afin d’agir directement sur les problèmes osseux, sur les rhumatismes, ainsi que sur les fractures. De façon plus générale, l’unakite vous aidera à <strong>renforcer votre système de défense immunitaire</strong>.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Funakite_400x300.jpg?alt=media&token=43201012-8b07-4307-a60b-181d0d446fe9',
  },
  'Œil de tigre': {
    title: 'Œil de tigre',
    description: `
    Un nom mystérieux et des couleurs envoûtantes pour cette pierre aux nombreuses vertus. 
    Porté par les guerriers et les soldats pendant les combats, l’œil de tigre <strong>protège et apporte force et courage</strong>.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2FOeil%20de%20tigre.jpg?alt=media&token=94a94640-1148-4e32-9486-9bb33a923a6d',
  },
  'Pierre de soleil': {
    title: 'Pierre de soleil',
    description: `
    Avec sa couleur solaire, la pierre héliolite est un symbole d'optimisme, de bonheur, de <strong>vitalité et de spontanéité.</strong>
    En lithothérapie, une des principales propriétés de la pierre de soleil est de véhiculer une </strong>énergie revigorante</strong>, aussi bien chez les femmes que chez les hommes.
    Cette pierre fine orange exerce un effet très purificateur sur le sang. De plus, elle </strong>renforce le système immunitaire</strong> et régule le cœur à l'aide de ses inclusions d'hématite ferreux.
    Placée au niveau du plexus solaire, une pierre polie en pierre de soleil permet un bon fonctionnement du système digestif et du transit intestinal et a pour bienfait d'éviter les ballonnements.
    `,
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2FPierre%20de%20soleil.jpg?alt=media&token=d5fe5692-911a-4ed9-b638-983375e92339',
  },
};

@Injectable({
  providedIn: 'root',
})
export class StoneService {
  getStoneObject(name: string) {
    return Stones.find((s) => s.name === name);
  }
  get allStones() {
    return Stones;
  }
  getFilteredStones(product: Product) {
    const stones = Stones.filter((s) =>
      product.stones.every((x) => x !== s.name)
    );
    return stones;
  }

  getStories(product: Product) {
    let result = [];
    product.stones.forEach((s) => result.push(Stories[s]));
    return result;
  }
}
