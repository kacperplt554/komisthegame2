function carDetails(c) {
  const prices = calculateCarPrices(c) || {};
  return `<div class="card">
    <div class="row" style="align-items:flex-start">
      <div>
        <b>${c.brand} ${c.model} ${c.generation} ${c.year}</b>
        <div class="mut">${c.engineName}, ${c.fuel}, ${c.enginePower} KM, ${c.mileage.toLocaleString('pl-PL')} km</div>
        <div class="mut">Stan techniczny: ${c.conditionTechnical}% • Stan wizualny: ${c.conditionVisual}%</div>
        <div><b>Wartość rynkowa:</b> ${prices.marketValue ? prices.marketValue.toLocaleString('pl-PL') + ' zł' : 'brak danych'}</div>
        <div><b>Cena zakupu:</b> ${prices.purchasePrice ? prices.purchasePrice.toLocaleString('pl-PL') + ' zł' : '-'}</div>
        <div><b>Sugerowana cena sprzedaży:</b> ${prices.suggestedPrice ? prices.suggestedPrice.toLocaleString('pl-PL') + ' zł' : '-'}</div>
        <div><b>Minimalna cena sprzedaży:</b> ${prices.minSellingPrice ? prices.minSellingPrice.toLocaleString('pl-PL') + ' zł' : '-'}</div>
      </div>
    </div>
    <br>
    <div><b>Wyposażenie:</b><ul>${c.equipment.map(e => `<li>${e}</li>`).join('')}</ul></div>
  </div>`;
}
