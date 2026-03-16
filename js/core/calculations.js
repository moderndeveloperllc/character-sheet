/* ═══════════════════════════════════════════════════
   CALCULATIONS
   ═══════════════════════════════════════════════════ */
function getMod(score) { return Math.floor((score - 10) / 2); }
function formatMod(mod) { return mod >= 0 ? '+' + mod : String(mod); }
function getProfBonus() { return Math.ceil(char.level / 4) + 1; }

function getSkillBonus(skill) {
  const mod = getMod(char.abilities[skill.ability]);
  const profBonus = getProfBonus();
  let prof = 0;
  if (char.skillExpertise[skill.key]) prof = profBonus * 2;
  else if (char.skillProficiencies[skill.key]) prof = profBonus;
  return mod + prof;
}

function getSaveBonus(ability) {
  return getMod(char.abilities[ability]) + (char.saveProficiencies[ability] ? getProfBonus() : 0);
}

function getPassive(skillKey) {
  const skill = SKILLS.find(s => s.key === skillKey);
  return 10 + getSkillBonus(skill);
}

function getSpellDC() { return 8 + getProfBonus() + getMod(char.abilities[char.spellcastingAbility]); }
function getSpellAttack() { return getProfBonus() + getMod(char.abilities[char.spellcastingAbility]); }

function resolveWeaponAbility(w) {
  if (w.ability === 'finesse') return getMod(char.abilities.str) >= getMod(char.abilities.dex) ? 'str' : 'dex';
  return w.ability || 'str';
}

function getWeaponAttackBonus(w) {
  if (w.manualOverride) return parseInt(w.attackBonus) || 0;
  const mod = getMod(char.abilities[resolveWeaponAbility(w)]);
  return mod + (w.proficient !== false ? getProfBonus() : 0);
}

function getWeaponDamageModifier(w) {
  if (w.manualOverride) return parseInt(w.damageModifier) || 0;
  return getMod(char.abilities[resolveWeaponAbility(w)]);
}

function getCarryCapacity() { return char.abilities.str * 15; }
function getTotalWeight() { return char.equipment.reduce((sum, item) => sum + (item.quantity || 0) * (item.weight || 0), 0); }

/* Class resource max calculation */
function getResourceMax(resource) {
  const formula = resource.maxFormula;
  if (typeof formula === 'number') return formula;
  switch (formula) {
    case 'level': return char.level;
    case 'profBonus': return getProfBonus();
    case 'chaMod': return Math.max(1, getMod(char.abilities.cha));
    case 'wisMod': return Math.max(1, getMod(char.abilities.wis));
    case 'layOnHands': return char.level * 5;
    case 'rageUses':
      if (char.level >= 17) return 6;
      if (char.level >= 12) return 5;
      if (char.level >= 6) return 4;
      if (char.level >= 3) return 3;
      return 2;
    default: return parseInt(formula) || 1;
  }
}

function getRageBonusDamage() {
  if (char.level >= 16) return 4;
  if (char.level >= 9) return 3;
  return 2;
}

/* Spell slot calculation based on class and level */
function getSpellSlotsForClass(classKey, level) {
  const data = CLASS_DATA[classKey];
  if (!data || !data.casterType) return null;

  if (data.casterType === 'full') {
    return SPELL_SLOT_TABLE[level] || null;
  }
  if (data.casterType === 'half') {
    // Half-casters get slots at effective caster level = floor(level/2)
    const casterLevel = Math.max(1, Math.floor(level / 2));
    return level >= 2 ? SPELL_SLOT_TABLE[casterLevel] : null;
  }
  if (data.casterType === 'pact') {
    // Warlock pact magic: all slots are the same level
    const pact = PACT_MAGIC_TABLE[level];
    if (!pact) return null;
    const slots = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    slots[pact[1] - 1] = pact[0];
    return slots;
  }
  return null;
}

/* AC auto-calculation */
function getBaseAC() {
  const dexMod = getMod(char.abilities.dex);
  const classKey = char.charClass.toLowerCase();
  const data = CLASS_DATA[classKey];

  // Class-specific unarmored defense
  if (data && data.unarmoredAC) {
    return 10 + data.unarmoredAC.reduce(function(sum, ab) { return sum + getMod(char.abilities[ab]); }, 0);
  }

  // Standard: 10 + DEX
  return 10 + dexMod;
}
