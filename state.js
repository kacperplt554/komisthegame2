const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const COLORS = ['Czarny', 'Biały', 'Srebrny', 'Niebieski', 'Czerwony', 'Szary', 'Zielony'];

function rndChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEquipment(equipmentOptions) {
  const equipment = [];
  if (equipmentOptions && equipmentOptions.length) {
    const pkg = rndChoice(equipmentOptions);
    equipment.push(pkg + " Pakiet");
  }
  const count = rndInt(3, 7);
  while (equipment.length < count) {
    const item = rndChoice(EQUIPMENTS);
    if (!equipment.includes(item)) equipment.push(item);
  }
  return equipment;
}

function generateCar() {
  const brandObj = rndChoice(CAR_DATABASE);
  const modelObj = rndChoice(brandObj.models);
  const genObj = rndChoice(modelObj.generations);
  const year = rndInt(genObj.years[0], genObj.years[1]);
  const engine = rndChoice(genObj.engines);
  const age = 2026 - year;
  const mileage = clamp(rndInt(age * 8000, age * 20000), 5000, 450000);
  const techCondition = rndInt(70, 95);
  const visualCondition = rndInt(70, 95);
  const color = rndChoice(COLORS);
  const equipment = generateEquipment(genObj.equipmentOptions);
  const previousOwners = rndInt(1, 3);
  const history = "Bez poważnych wypadków";
  const id = `${brandObj.brand}_${modelObj.name}_${genObj.code}_${year}_${Math.floor(mileage / 1000)}`;

  return {
    id,
    brand: brandObj.brand,
    model: modelObj.name,
    generation: genObj.code,
    year,
    mileage,
    engineName: engine.name,
    enginePower: engine.power,
    engineDisplacement: engine.displacement,
    fuel: engine.fuel,
    gearbox: engine.gearbox,
    drive: engine.drive,
    color,
    conditionTechnical: techCondition,
    conditionVisual: visualCondition,
    equipment,
    previousOwners,
    history,
    pricePaid: 0
  };
}

function calculateCarPrices(car) {
  const modelData = CAR_DATABASE.find(b => b.brand === car.brand)
    .models.find(m => m.name === car.model);
  const genData = modelData.generations.find(g => g.code === car.generation);
  let basePrice = genData.basePrice;

  const age = 2026 - car.year;
  basePrice *= Math.max(0.5, 1 - 0.07 * age);
  basePrice *= Math.max(0.6, 1 - car.mileage / 300000);

  const powers = genData.engines.map(e => e.power);
  const powerMin = Math.min(...powers);
  const powerMax = Math.max(...powers);
  if (powerMax > powerMin) {
    const factor = (car.enginePower - powerMin) / (powerMax - powerMin);
    basePrice *= 1 + 0.3 * factor;
  }

  basePrice *= 1 + 0.015 * car.equipment.length;

  const avgCondition = ((car.conditionTechnical * 0.7) + (car.conditionVisual * 0.3)) / 100;
  basePrice *= avgCondition;

  const marketValue = Math.round(basePrice / 100) * 100;
  const purchasePrice = Math.round(marketValue * (0.65 + Math.random() * 0.1));
  const suggestedPrice = Math.round(marketValue * 1.15);
  const minSellingPrice = Math.round(marketValue * 0.85);

  return {
    marketValue,
    purchasePrice,
    suggestedPrice,
    minSellingPrice
  };
}
