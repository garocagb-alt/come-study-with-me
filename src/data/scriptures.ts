export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  book: string;
  bookShort: string;
  chapter: number;
  verses: Verse[];
}

export const scriptures: Chapter[] = [
  {
    book: "1 Nefi",
    bookShort: "1 Ne.",
    chapter: 1,
    verses: [
      { number: 1, text: "Yo, Nefi, nací de buenos padres y recibí, por tanto, alguna instrucción en toda la ciencia de mi padre; y habiendo visto muchas aflicciones durante el curso de mis días, siendo, no obstante, altamente favorecido del Señor en todos mis días, sí, habiendo logrado un conocimiento grande de la bondad y de los misterios de Dios, escribo, por tanto, la historia de lo acontecido en mis días." },
      { number: 2, text: "Sí, hago una relación en el idioma de mi padre, que se compone de la ciencia de los judíos y del idioma de los egipcios." },
      { number: 3, text: "Y sé que la relación que hago es verdadera; y la escribo de mi propia mano, y la escribo según mi conocimiento." },
      { number: 4, text: "Pues sucedió que en el comienzo del primer año del reinado de Sedequías, rey de Judá (habiendo sido mi padre, Lehi, residente en Jerusalén todos sus días), vinieron muchos profetas en aquel mismo año a profetizar al pueblo que se arrepintiese, o la gran ciudad de Jerusalén habría de ser destruida." },
      { number: 5, text: "De modo que mi padre, Lehi, mientras iba por el camino, rogó al Señor con todo su corazón, sí, a favor de su pueblo." },
      { number: 6, text: "Y aconteció que mientras oraba al Señor, se le apareció una columna de fuego sobre una roca que estaba delante de él; y vio y oyó mucho; y a causa de las cosas que vio y oyó, se estremeció y tembló sobremanera." },
      { number: 7, text: "Y sucedió que volvió a su propia casa en Jerusalén; y se echó sobre su cama, vencido por el Espíritu y por las cosas que había visto." },
      { number: 8, text: "Y hallándose así vencido por el Espíritu, fue arrebatado en una visión, de tal modo que vio los cielos abiertos, y creyó ver a Dios sentado en su trono, rodeado de innumerables concursos de ángeles, en actitud de cantar y alabar a su Dios." },
      { number: 9, text: "Y sucedió que vio a Uno que descendía del medio del cielo, y vio que su resplandor era mayor que el del sol al mediodía." },
      { number: 10, text: "Y vio también a otros doce que le seguían, y su fulgor sobrepasaba al de las estrellas del firmamento." },
      { number: 11, text: "Y descendieron y salieron por sobre la faz de la tierra; y el primero vino y se puso ante mi padre, y le dio un libro y le mandó que leyese." },
      { number: 12, text: "Y aconteció que mientras leía, fue lleno del Espíritu del Señor." },
      { number: 13, text: "Y leyó, diciendo: ¡Ay, ay de ti, Jerusalén, porque he visto tus abominaciones! Sí, mi padre leyó muchas cosas acerca de Jerusalén: que sería destruida, junto con sus habitantes; muchos perecerían por la espada, y muchos serían llevados cautivos a Babilonia." },
      { number: 14, text: "Y sucedió que cuando mi padre hubo leído y visto muchas cosas grandes y maravillosas, exclamó muchas cosas al Señor, tales como: ¡Grandes y maravillosas son tus obras, oh Señor Dios Todopoderoso! Tu trono es alto en los cielos, y tu poder, y bondad, y misericordia se extienden sobre todos los habitantes de la tierra; y puesto que eres misericordioso, no permitirás que aquellos que vengan a ti perezcan!" },
      { number: 15, text: "Y de esta manera fue el lenguaje de mi padre cuando alabó a su Dios, porque su alma se regocijaba y todo su corazón estaba henchido a causa de las cosas que había visto; sí, que el Señor le había manifestado." },
      { number: 16, text: "Y ahora yo, Nefi, no hago una relación completa de las cosas que mi padre ha escrito, porque ha escrito muchas cosas que él vio en visiones y en sueños; y también ha escrito muchas de las cosas que profetizó y habló a sus hijos, de las cuales no hago una relación completa." },
      { number: 17, text: "Pero haré una relación de lo acontecido en mis días. He aquí, hago un compendio de la historia de mi padre, sobre planchas que he hecho con mis propias manos; por lo tanto, después de haber compendiado la historia de mi padre, haré la relación de mi propia vida." },
      { number: 18, text: "Por lo tanto, quisiera que supierais que después que el Señor hubo manifestado tantas cosas maravillosas a mi padre Lehi, sí, concernientes a la destrucción de Jerusalén, he aquí, él fue entre el pueblo y empezó a profetizar y a declarar las cosas que él había visto y oído." },
      { number: 19, text: "Y sucedió que los judíos se burlaron de él a causa de las cosas que testificó de ellos; porque en verdad testificó de la maldad y abominaciones de ellos; y testificó que las cosas que había visto y oído, así como las cosas que había leído en el libro, manifestaban claramente la venida de un Mesías y también la redención del mundo." },
      { number: 20, text: "Y cuando los judíos oyeron estas cosas, se enojaron con él; sí, así como con los profetas de la antigüedad, a quienes habían echado, y apedreado y matado; y también intentaron quitarle la vida. Pero he aquí, yo, Nefi, os mostraré que las tiernas misericordias del Señor se extienden sobre todos aquellos que, a causa de su fe, él ha escogido, para fortalecerlos, sí, hasta tener el poder de librarse." },
    ],
  },
];

export const highlightColors = [
  { id: "red", label: "Expiación", color: "#ef4444", bg: "#fef2f2" },
  { id: "blue", label: "Convenios", color: "#3b82f6", bg: "#eff6ff" },
  { id: "green", label: "Promesas", color: "#22c55e", bg: "#f0fdf4" },
  { id: "yellow", label: "Doctrina", color: "#eab308", bg: "#fefce8" },
  { id: "purple", label: "Profecías", color: "#a855f7", bg: "#faf5ff" },
  { id: "pink", label: "Atributos de Cristo", color: "#ec4899", bg: "#fdf2f8" },
];
