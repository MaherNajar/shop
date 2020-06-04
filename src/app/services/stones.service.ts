import { Injectable } from '@angular/core';
import { Product } from '../models/product';

export interface Stone {
  cssColor: string;
  name: string;
}

const Stones: Stone[] = [
  { name: 'Agate', cssColor: 'brown' },
  { name: 'Améthyste', cssColor: '#884da7' },
  { name: 'Aigue-marine', cssColor: '#7FFFD4' },
  { name: 'Aventurine', cssColor: '#989d79' },
  { name: 'Quartz', cssColor: '#51484F' },
  { name: 'Chrysoprase', cssColor: '#a0d3b6' },
  { name: 'Ruby Zoisite', cssColor: '#e0115f' },
  { name: 'Cristal', cssColor: 'wheat' },
  { name: 'Jaspe rouge', cssColor: '#d73b3e' },
  { name: 'Cornaline', cssColor: '#b31b1b' },
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
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fcristal.jpg?alt=media&token=0c5ea5bc-bf63-4f0c-8c31-6cabe26e1faf',
  },
  Améthyste: {
    title: 'Améthyste',
    description:
      "Pierre de la <strong>spiritualit\u00E9</strong>. Cette pierre est la pierre de <strong>pr\u00E9dilection</strong> pour aider \u00E0 <strong>surmonter un deuil</strong>.\r\n    <strong>Calme les angoisses</strong>. Apporte <strong>d\u00E9tente</strong> et <strong>s\u00E9r\u00E9nit\u00E9</strong>. Aide les personnes souffrant de probl\u00E8me de boisson ou autre d\u00E9pendance \u00E0 r\u00E9sister face \u00E0 la\r\n    tentation. <strong>Favorise l'\u00E9veil</strong> et la <strong>sagesse</strong>. Favorise un <strong>sommeil</strong> plus <strong>r\u00E9parateur</strong> et <strong>serein</strong>, att\u00E9nue les\r\n    cauchemars.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Famethyst.jpg?alt=media&token=fe033986-800f-4596-957b-a92b456db824',
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
      "Hildegarde de Bingen la conseillait pour les <strong>femmes enceintes</strong> afin de favoriser un bon accouchement. Par contre, selon de nombreux t\u00E9moignages, il\r\n    semblerait indispensable de la retirer lorsque le travail commence, c'est-\u00E0-dire lors des premi\u00E8res contractions, au risque de \" bloquer le travail&nbsp;\"&nbsp;.&nbsp;<strong>Stimule\r\n    l'organisme</strong>. Id\u00E9ale pour les&nbsp;blocages d'ordre sexuels : baisse de libido.",
    image:
      'https://firebasestorage.googleapis.com/v0/b/omyperles.appspot.com/o/pierres%2Fcornaline.jpg?alt=media&token=7fe14f29-2a5a-466a-b047-2b6328b3f872',
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
