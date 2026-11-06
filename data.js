// Dane statyczne gry – rozszerzone o konfiguracje silników i wyposażenia
const MODELS = [
  {
    b: 'BMW',
    m: 'Seria 3',
    gens: [
      {
        code: 'E90',
        years: [2005, 2011],
        engines: [
          { name: '318d', type: 'diesel', power: 143, displacement: 2.0 },
          { name: '320d', type: 'diesel', power: 163, displacement: 2.0 },
          { name: '320d', type: 'diesel', power: 184, displacement: 2.0 },
          { name: '330d', type: 'diesel', power: 231, displacement: 3.0 }
        ],
        basePrice: 42000,
        fuel: 'diesel'
      },
      {
        code: 'F30',
        years: [2012, 2019],
        engines: [
          { name: '316d', type: 'diesel', power: 116, displacement: 2.0 },
          { name: '320d', type: 'diesel', power: 190, displacement: 2.0 },
          { name: '330d', type: 'diesel', power: 258, displacement: 3.0 }
        ],
        basePrice: 48000,
        fuel: 'diesel'
      }
    ]
  },
  {
    b: 'Audi',
    m: 'A4',
    gens: [
      {
        code: 'B7',
        years: [2004, 2008],
        engines: [
          { name: '2.0 TDI', type: 'diesel', power: 140, displacement: 2.0 },
          { name: '3.0 TDI V6', type: 'diesel', power: 240, displacement: 3.0 }
        ],
        basePrice: 35000,
        fuel: 'diesel'
      }
    ]
  },
  // Dodaj kolejne marki, modele i generacje wg potrzeb
];

// Lista możliwego wyposażenia (możesz rozszerzyć)
const EQUIPMENTS = [
  "Skórzana tapicerka",
  "Alcantara",
  "Podgrzewane fotele",
  "Elektrycznie regulowane fotele",
  "Pamięć foteli",
  "Sportowe fotele",
  "Panoramiczny dach",
  "Szyberdach",
  "Klimatyzacja automatyczna",
  "Dwustrefowa klimatyzacja",
  "Nawigacja",
  "Kamera cofania",
  "Czujniki parkowania",
  "Tempomat",
  "Aktywny tempomat",
  "Reflektory LED",
  "Reflektory ksenonowe",
  "Światła adaptacyjne",
  "System bezkluczykowy",
  "Elektrycznie składane lusterka",
  "Nagłośnienie premium",
  "Sportowa kierownica",
  "Pakiet M",
  "Pakiet S line",
  "Pakiet AMG",
  "Hak holowniczy"
];
