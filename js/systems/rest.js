/* ═══════════════════════════════════════════════════
   REST SYSTEM
   ═══════════════════════════════════════════════════ */

function doShortRest() {
  char.classResources.forEach(r => {
    if (r.restoreOn === 'short') r.current = getResourceMax(r);
  });

  save();
  renderClassResources();
  renderHitDice();
}

function doLongRest() {
  char.currentHp = char.maxHp;

  for (let i = 1; i <= 9; i++) char.spellSlots[i].used = 0;

  char.hitDice.forEach(hd => {
    const recover = Math.max(1, Math.ceil(hd.total / 2));
    hd.used = Math.max(0, hd.used - recover);
  });

  char.classResources.forEach(r => {
    r.current = getResourceMax(r);
  });

  char.deathSaves = { successes: 0, failures: 0 };

  if (char.activeConditions.length > 0 && confirm('Clear all active conditions?')) {
    char.activeConditions = [];
  }

  save();
  updateCombat();
  renderSpellSlots();
  renderHitDice();
  renderDeathSaves();
  renderClassResources();
  renderConditionsBar();
}

function setupRestButtons() {
  document.getElementById('short-rest-btn').addEventListener('click', () => {
    if (confirm('Take a short rest? This will recover short-rest resources.')) doShortRest();
  });

  document.getElementById('long-rest-btn').addEventListener('click', () => {
    if (confirm('Take a long rest? This will recover HP, spell slots, hit dice, and all resources.')) doLongRest();
  });
}
