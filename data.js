const CAR_DATABASE = [
  {
    brand: "BMW",
    models: [
      {
        name: "Seria 3",
        generations: [
          {
            code: "E90",
            years: [2005, 2011],
            engines: [
              { name: "318d", power: 143, displacement: 2.0, fuel: "Diesel", gearbox: "manual", drive: "RWD" },
              { name: "320d", power: 163, displacement: 2.0, fuel: "Diesel", gearbox: "manual", drive: "RWD" },
              { name: "320d", power: 184, displacement: 2.0, fuel: "Diesel", gearbox: "auto", drive: "RWD" },
              { name: "330d", power: 231, displacement: 3.0, fuel: "Diesel", gearbox: "auto", drive: "RWD" }
            ],
            basePrice: 42000,
            equipmentOptions: ["Standard", "M Sport", "Luxury"]
          },
          {
            code: "F30",
            years: [2012, 2019],
            engines: [
              { name: "316d", power: 116, displacement: 2.0, fuel: "Diesel", gearbox: "manual", drive: "RWD" },
              { name: "320d", power: 190, displacement: 2.0, fuel: "Diesel", gearbox: "auto", drive: "RWD" },
              { name: "330d", power: 258, displacement: 3.0, fuel: "Diesel", gearbox: "auto", drive: "RWD" }
            ],
            basePrice: 48000,
            equipmentOptions: ["Standard", "M Sport", "Luxury"]
          }
        ]
      }
    ]
  },
  {
    brand: "Audi",
    models: [
      {
        name: "A4",
        generations: [
          {
            code: "B7",
            years: [2004, 2008],
            engines: [
              { name: "2.0 TDI", power: 140, displacement: 2.0, fuel: "Diesel", gearbox: "manual", drive: "FWD" },
              { name: "3.0 TDI V6", power: 240, displacement: 3.0, fuel: "Diesel", gearbox: "auto", drive: "AWD" }
            ],
            basePrice: 35000,
            equipmentOptions: ["Standard", "S line"]
          }
        ]
      }
    ]
  },
  {
    brand: "Volkswagen",
    models: [
      {
        name: "Golf",
        generations: [
          {
            code: "V",
            years: [2003, 2008],
            engines: [
              { name: "1.9 TDI", power: 105, displacement: 1.9, fuel: "Diesel", gearbox: "manual", drive: "FWD" },
              { name: "1.4 TSI", power: 125, displacement: 1.4, fuel: "Petrol", gearbox: "manual", drive: "FWD" }
            ],
            basePrice: 25000,
            equipmentOptions: ["Standard", "Sport"]
          }
        ]
      }
    ]
  }
];

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
