/* ═══════════════════════════════════════════════════
   DEFAULT CHARACTER STATE
   ═══════════════════════════════════════════════════ */
function createDefaultCharacter() {
  const c = {
    name: '', charClass: '', subclass: '', level: 1,
    race: '', background: '', alignment: '', xp: 0,
    abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
    saveProficiencies: {},
    skillProficiencies: {},
    skillExpertise: {},
    ac: 10, acOverride: false, initiative: 0, initiativeOverride: false, speed: 30,
    maxHp: 10, currentHp: 10, tempHp: 0,
    hitDice: [{ type: 8, total: 1, used: 0 }],
    deathSaves: { successes: 0, failures: 0 },
    weapons: [],
    racialTraits: '', classFeatures: '', feats: '',
    spellcastingAbility: 'int',
    spellSlots: {},
    spells: [],
    currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
    equipment: [],
    personalityTraits: '', ideals: '', bonds: '', flaws: '',
    appearance: '', backstory: '',
    activeConditions: [],
    classResources: [],
  };
  ABILITIES.forEach(a => c.saveProficiencies[a] = false);
  SKILLS.forEach(s => { c.skillProficiencies[s.key] = false; c.skillExpertise[s.key] = false; });
  for (let i = 1; i <= 9; i++) c.spellSlots[i] = { max: 0, used: 0 };
  return c;
}

/* ═══════════════════════════════════════════════════
   GLOBAL STATE
   ═══════════════════════════════════════════════════ */
let char = createDefaultCharacter();
let rollHistory = [];
let advantageMode = 'normal';

/* ═══════════════════════════════════════════════════
   PERSISTENCE
   ═══════════════════════════════════════════════════ */
let _saveTimer = null;
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(char)); } catch (e) { /* */ }
}
function saveDebounced() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(save, 300);
}

function mergeCharacterData(parsed) {
  const defaults = createDefaultCharacter();
  char = { ...defaults, ...parsed };
  char.abilities = { ...defaults.abilities, ...parsed.abilities };
  char.saveProficiencies = { ...defaults.saveProficiencies, ...parsed.saveProficiencies };
  char.skillProficiencies = { ...defaults.skillProficiencies, ...parsed.skillProficiencies };
  char.skillExpertise = { ...defaults.skillExpertise, ...parsed.skillExpertise };
  char.currency = { ...defaults.currency, ...parsed.currency };
  char.spellSlots = { ...defaults.spellSlots, ...parsed.spellSlots };
  char.deathSaves = { ...defaults.deathSaves, ...parsed.deathSaves };
  if (parsed.hitDice) char.hitDice = parsed.hitDice;
  if (parsed.weapons) char.weapons = parsed.weapons.map(w => ({
    ability: 'str', proficient: true, manualOverride: !!(w.attackBonus || w.damageModifier), properties: [], ...w
  }));
  if (parsed.spells) char.spells = parsed.spells;
  if (parsed.equipment) char.equipment = parsed.equipment;
  if (!char.activeConditions) char.activeConditions = [];
  if (!char.classResources) char.classResources = [];
}

function load() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) mergeCharacterData(JSON.parse(data));
  } catch (e) { char = createDefaultCharacter(); }
}

function loadRollHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY + '_rolls');
    if (data) rollHistory = JSON.parse(data);
  } catch (e) { rollHistory = []; }
}

function saveRollHistory() {
  try { localStorage.setItem(STORAGE_KEY + '_rolls', JSON.stringify(rollHistory.slice(-20))); } catch (e) { /* */ }
}
