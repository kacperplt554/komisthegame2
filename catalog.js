// KATALOG WYGLĄDU AUT. Nowy model = jedna pozycja poniżej (klucz: "Marka Model").
// body: sedan | hatch | wagon, L = długość, W = szerokość, h1 = wysokość nadwozia, h2 = wysokość kabiny.
// Opcjonalnie png:'nazwa.png' – w przyszłości grafika PNG zamiast rysowanej kodem (patrz sprites.js).
const CAR_SPECS={
 'Bavaria 320d':{body:'sedan',L:112,W:56,h1:20,h2:15},
 'Volkswagen Golf':{body:'hatch',L:96,W:52,h1:20,h2:17},
 'Opel Astra':{body:'hatch',L:100,W:53,h1:20,h2:17},
 'Ford Focus':{body:'hatch',L:100,W:53,h1:20,h2:17},
 'Toyota Corolla':{body:'sedan',L:104,W:54,h1:20,h2:16},
 'Audi A4':{body:'sedan',L:112,W:56,h1:21,h2:15},
 'Skoda Octavia':{body:'wagon',L:112,W:56,h1:21,h2:17}};
const DEFAULT_SPEC={body:'sedan',L:108,W:55,h1:20,h2:16};
const carSpec=c=>CAR_SPECS[c.brand+' '+c.model]||DEFAULT_SPEC;
