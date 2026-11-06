// Losowanie pomocnicze
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const COLORS = ['#c0392b','#2980b9','#27ae60','#bdc3c7','#2c3e50','#f39c12','#8e44ad'];

// Generator pojedynczego samochodu z indywidualnymi parametrami
function generateCar() {
  // Losuj model i generację
  const model = MODELS[rnd(0, MODELS.length - 1)];
  const gen = model.gens[rnd(0, model.gens.length - 1)];
  // Rok produkcji w obrębie generacji
  const year = rnd(gen.years[0], gen.years[1]);
  // Silnik z generatora
  const engine = gen.engines[rnd(0, gen.engines.length - 1)];
  // Przebieg zależny od wieku (średnio 15 000 km/rok)
  const age = 2026 - year;
  const mileage = clamp(rnd(age * 8000, age * 20000), 5000, 450000);
  // Stan techniczny i wizualny – losowy z przedziału od 70% do 95%
  const conditionTechnical = rnd(70, 95);
  const conditionVisual = rnd(70, 95);
  // Wybierz kolor z listy
  const color = COLORS[rnd(0, COLORS.length - 1)];
  // Losowe wyposażenie
  const equipCount = rnd(3, 7);
  const equipment = [];
  while (equipment.length < equipCount) {
    const item = EQUIPMENTS[rnd(0, EQUIPMENTS.length - 1)];
    if (!equipment.includes(item)) equipment.push(item);
  }
  // Liczba poprzednich właścicieli
  const previousOwners = rnd(1, 3);
  // Identyfikator
  const id = `${model.b}_${model.m}_${gen.code}_${year}_${Math.floor(mileage / 1000)}`;

  return {
    id,
    brand: model.b,
    model: model.m,
    generation: gen.code,
    year,
    mileage,
    engineName: engine.name,
    engineType: engine.type,
    enginePower: engine.power,
    engineDisplacement: engine.displacement,
    fuel: gen.fuel,
    color,
    conditionTechnical,
    conditionVisual,
    equipment,
    previousOwners,
    pricePaid: 0,
  };
}

// Wyliczenie wartości rynkowej i proponowanych cen
function calculatePrices(car) {
  // Znajdź model i generację bazową cenę
  const model = MODELS.find(m => m.b === car.brand && m.m === car.model);
  if (!model) return null;
  const gen = model.gens.find(g => g.code === car.generation);
  if (!gen) return null;

  let basePrice = gen.basePrice;

  // Cena bazowa maleje z wiekiem - 7% na rok, minimum 50% wartości
  const age = 2026 - car.year;
  basePrice *= Math.max(0.5, 1 - 0.07 * age);

  // Cena maleje wraz z przebiegiem, minimalnie do 60%
  basePrice *= Math.max(0.6, 1 - car.mileage / 300000);

  // Moc silnika podbija cenę - do +30%
  const enginePowerRange = gen.engines.reduce((acc, e) => {
    acc.min = Math.min(acc.min, e.power);
    acc.max = Math.max(acc.max, e.power);
    return acc;
  }, { min: Infinity, max: -Infinity });

  if (enginePowerRange.max > enginePowerRange.min) {
    const powerFactor = (car.enginePower - enginePowerRange.min) / (enginePowerRange.max - enginePowerRange.min);
    basePrice *= 1 + 0.3 * powerFactor;
  }

  // Wyposażenie podbija cenę o 1.5% za element
  basePrice *= 1 + 0.015 * car.equipment.length;

  // Stan techniczny i wizualny
  const avgCondition = ((car.conditionTechnical + car.conditionVisual) / 2) / 100;
  basePrice *= avgCondition;

  // Zaokrąglenie do 100 PLN
  const marketValue = Math.round(basePrice / 100) * 100;

  // Cena zakupu około 65-75% wartości rynkowej
  const purchasePrice = Math.round(marketValue * (0.65 + Math.random() * 0.1));

  // Sugerowana cena sprzedaży +15% marży
  const suggestedPrice = Math.round(marketValue * 1.15);

  // Minimalna opłacalna cena (85% wartości rynkowej)
  const minSellingPrice = Math.round(marketValue * 0.85);

  return {
    marketValue,
    purchasePrice,
    suggestedPrice,
    minSellingPrice,
  };
}
