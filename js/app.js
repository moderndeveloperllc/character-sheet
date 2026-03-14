/* ═══════════════════════════════════════════════════
   APP: Init, Events, Update
   ═══════════════════════════════════════════════════ */

function populateFields() {
  document.getElementById('char-name').value = char.name;
  document.getElementById('char-level').value = char.level;
  document.getElementById('char-alignment').value = char.alignment;
  document.getElementById('char-xp').value = char.xp;
  document.getElementById('combat-ac').value = char.ac;
  document.getElementById('combat-init').value = char.initiative;
  document.getElementById('combat-speed').value = char.speed;
  document.getElementById('hp-current').value = char.currentHp;
  document.getElementById('hp-max').value = char.maxHp;
  document.getElementById('temp-hp').value = char.tempHp;
  document.getElementById('spell-ability').value = char.spellcastingAbility;

  document.querySelectorAll('[data-field]').forEach(field => {
    if (field.tagName === 'TEXTAREA') field.value = char[field.dataset.field] || '';
  });
}

function updateCalculated() {
  document.getElementById('prof-bonus-display').textContent = formatMod(getProfBonus());
  renderSaves();
  renderSkills();
  renderPassives();

  if (!char.acOverride) {
    char.ac = getBaseAC();
    document.getElementById('combat-ac').value = char.ac;
  }

  if (!char.initiativeOverride) {
    char.initiative = getMod(char.abilities.dex);
    document.getElementById('combat-init').value = char.initiative;
  }

  document.getElementById('spell-dc').textContent = getSpellDC();
  document.getElementById('spell-atk').textContent = formatMod(getSpellAttack());

  // Update spell slots if class has a caster type
  var classKey = char.charClass.toLowerCase();
  var slots = getSpellSlotsForClass(classKey, char.level);
  if (slots) {
    for (var i = 0; i < 9; i++) {
      char.spellSlots[i + 1].max = slots[i];
    }
    renderSpellSlots();
  }

  renderWeapons();
  updateCarryCapacity();
}

function setupEvents() {
  // Header text inputs
  document.querySelectorAll('#char-header [data-field]').forEach(input => {
    input.addEventListener('input', () => { char[input.dataset.field] = input.value; save(); });
  });

  // Level
  document.getElementById('level-up').addEventListener('click', () => {
    if (char.level < 20) { char.level++; document.getElementById('char-level').value = char.level; save(); updateCalculated(); }
  });
  document.getElementById('level-down').addEventListener('click', () => {
    if (char.level > 1) { char.level--; document.getElementById('char-level').value = char.level; save(); updateCalculated(); }
  });
  document.getElementById('char-level').addEventListener('change', (e) => {
    char.level = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
    e.target.value = char.level; save(); updateCalculated();
  });

  // XP
  document.getElementById('char-xp').addEventListener('change', (e) => { char.xp = parseInt(e.target.value) || 0; save(); });

  // Combat
  document.getElementById('combat-ac').addEventListener('change', (e) => { char.ac = parseInt(e.target.value) || 10; char.acOverride = true; save(); });
  document.getElementById('ac-auto').addEventListener('click', () => { char.acOverride = false; char.ac = getBaseAC(); document.getElementById('combat-ac').value = char.ac; save(); });
  document.getElementById('combat-init').addEventListener('change', (e) => { char.initiative = parseInt(e.target.value) || 0; char.initiativeOverride = true; save(); });
  document.getElementById('init-auto').addEventListener('click', () => { char.initiativeOverride = false; char.initiative = getMod(char.abilities.dex); document.getElementById('combat-init').value = char.initiative; save(); });
  document.getElementById('combat-speed').addEventListener('change', (e) => { char.speed = parseInt(e.target.value) || 30; save(); });

  // HP
  document.getElementById('hp-current').addEventListener('change', (e) => { char.currentHp = parseInt(e.target.value) || 0; save(); updateCombat(); });
  document.getElementById('hp-max').addEventListener('change', (e) => { char.maxHp = parseInt(e.target.value) || 0; save(); updateCombat(); });
  document.getElementById('hp-minus').addEventListener('click', () => { char.currentHp = Math.max(0, char.currentHp - 1); save(); updateCombat(); flashHp('damage'); });
  document.getElementById('hp-plus').addEventListener('click', () => { char.currentHp = Math.min(char.maxHp, char.currentHp + 1); save(); updateCombat(); flashHp('heal'); });
  document.getElementById('temp-hp').addEventListener('change', (e) => { char.tempHp = Math.max(0, parseInt(e.target.value) || 0); save(); });

  // Hit dice add
  document.getElementById('add-hit-die').addEventListener('click', () => { char.hitDice.push({ type: 8, total: 1, used: 0 }); save(); renderHitDice(); });

  // Weapons add
  document.getElementById('add-weapon').addEventListener('click', () => {
    char.weapons.push({ name: '', ability: 'str', proficient: true, manualOverride: false, attackBonus: '', damageDice: '1d8', damageModifier: '', damageType: 'Slashing', properties: [] });
    save(); renderWeapons();
  });

  // Spellcasting
  document.getElementById('spell-ability').addEventListener('change', (e) => { char.spellcastingAbility = e.target.value; save(); updateCalculated(); });
  document.getElementById('add-spell').addEventListener('click', () => {
    char.spells.push({ name: '', level: 0, school: '', prepared: false, concentration: false, notes: '' });
    save(); renderSpells();
  });

  // Equipment
  document.getElementById('add-equip').addEventListener('click', () => {
    char.equipment.push({ name: '', quantity: 1, weight: 0, notes: '' });
    save(); renderEquipment();
  });

  // Delegated setup
  setupFeatureTabs();
  setupDetails();
  setupManagement();
  setupDiceTray();
  setupRestButtons();
}

function initUI() {
  populateFields();
  renderAbilities();
  renderHitDice();
  renderDeathSaves();
  renderSpellSlots();
  renderSpells();
  renderCurrency();
  renderEquipment();
  renderRollLog();
  renderConditionsBar();
  renderClassResources();
  updateCalculated(); // renders saves, skills, passives, weapons, carry capacity
  updateCombat();
}

function init() {
  load();
  loadRollHistory();
  setupHeaderCombos();
  setupEvents();
  initUI();
}

document.addEventListener('DOMContentLoaded', init);
