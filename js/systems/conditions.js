/* ═══════════════════════════════════════════════════
   CONDITIONS SYSTEM
   ═══════════════════════════════════════════════════ */
const CONDITION_DEFS = {
  raging: {
    name: 'Raging',
    category: 'class',
    description: 'Advantage on STR checks/saves, bonus melee damage, resistance to B/P/S',
    advantage: { checks: ['str'], saves: ['str'] },
    weaponDamageBonus: function(w) {
      const abil = resolveWeaponAbility(w);
      return (abil === 'str') ? { flat: getRageBonusDamage(), extraDice: [], source: 'Rage' } : { flat: 0, extraDice: [], source: '' };
    },
    damageResistance: ['Bludgeoning', 'Piercing', 'Slashing'],
  },
  blessed: {
    name: 'Blessed',
    category: 'spell',
    description: '+1d4 to attack rolls and saving throws',
    attackBonus: { count: 1, sides: 4, source: 'Bless' },
    saveBonus: { count: 1, sides: 4, source: 'Bless' },
  },
  hexed: {
    name: 'Hex',
    category: 'spell',
    description: '+1d6 necrotic damage on weapon hits, disadvantage on chosen ability checks',
    weaponDamageBonus: function() {
      return { flat: 0, extraDice: [{ count: 1, sides: 6, source: 'Hex' }], source: 'Hex' };
    },
  },
  huntersMark: {
    name: "Hunter's Mark",
    category: 'spell',
    description: '+1d6 damage on weapon hits against marked target',
    weaponDamageBonus: function() {
      return { flat: 0, extraDice: [{ count: 1, sides: 6, source: "Hunter's Mark" }], source: "HM" };
    },
  },
  concentrating: {
    name: 'Concentrating',
    category: 'status',
    description: 'Maintaining concentration on a spell',
  },
  dodging: {
    name: 'Dodging',
    category: 'action',
    description: 'Advantage on DEX saves, attacks against you have disadvantage',
    advantage: { saves: ['dex'] },
  },
  frightened: {
    name: 'Frightened',
    category: 'condition',
    description: 'Disadvantage on ability checks and attack rolls',
    disadvantage: { checks: ABILITIES, attacks: true },
  },
  poisoned: {
    name: 'Poisoned',
    category: 'condition',
    description: 'Disadvantage on ability checks and attack rolls',
    disadvantage: { checks: ABILITIES, attacks: true },
  },
  prone: {
    name: 'Prone',
    category: 'condition',
    description: 'Disadvantage on attack rolls',
    disadvantage: { attacks: true },
  },
  invisible: {
    name: 'Invisible',
    category: 'condition',
    description: 'Advantage on attack rolls, attacks against you have disadvantage',
    advantage: { attacks: true },
  },
  hasted: {
    name: 'Hasted',
    category: 'spell',
    description: '+2 AC, advantage on DEX saves, double speed, extra action',
    advantage: { saves: ['dex'] },
  },
  restrained: {
    name: 'Restrained',
    category: 'condition',
    description: 'Disadvantage on DEX saves and attack rolls, speed 0',
    disadvantage: { saves: ['dex'], attacks: true },
  },
};

/* ═══════════════════════════════════════════════════
   CONDITION FUNCTIONS
   ═══════════════════════════════════════════════════ */
function isConditionActive(key) {
  return char.activeConditions.includes(key);
}

function toggleCondition(key) {
  const idx = char.activeConditions.indexOf(key);
  if (idx === -1) char.activeConditions.push(key);
  else char.activeConditions.splice(idx, 1);
  save();
  renderConditionsBar();
  renderWeapons();
}

function clearAllConditions() {
  char.activeConditions = [];
  save();
  renderConditionsBar();
  renderWeapons();
}

function getConditionAdvantage(rollType, ability) {
  let hasAdv = false, hasDis = false;

  char.activeConditions.forEach(key => {
    const def = CONDITION_DEFS[key];
    if (!def) return;

    if (def.advantage) {
      if (rollType === 'attack' && def.advantage.attacks) hasAdv = true;
      if (rollType === 'check' && ability && def.advantage.checks && def.advantage.checks.includes(ability)) hasAdv = true;
      if (rollType === 'save' && ability && def.advantage.saves && def.advantage.saves.includes(ability)) hasAdv = true;
    }

    if (def.disadvantage) {
      if (rollType === 'attack' && def.disadvantage.attacks) hasDis = true;
      if (rollType === 'check' && ability && def.disadvantage.checks && def.disadvantage.checks.includes(ability)) hasDis = true;
      if (rollType === 'save' && ability && def.disadvantage.saves && def.disadvantage.saves.includes(ability)) hasDis = true;
    }
  });

  if (hasAdv && hasDis) return null; // cancel out
  if (hasAdv) return 'advantage';
  if (hasDis) return 'disadvantage';
  return null;
}

function getConditionBonusDice(bonusKey) {
  const mods = [];
  char.activeConditions.forEach(key => {
    const def = CONDITION_DEFS[key];
    if (def && def[bonusKey]) mods.push(def[bonusKey]);
  });
  return mods;
}

function getConditionAttackMods() { return getConditionBonusDice('attackBonus'); }
function getConditionSaveMods() { return getConditionBonusDice('saveBonus'); }

function getConditionDamageBonus(weapon) {
  let flat = 0;
  const extraDice = [];

  char.activeConditions.forEach(key => {
    const def = CONDITION_DEFS[key];
    if (def && def.weaponDamageBonus) {
      const bonus = def.weaponDamageBonus(weapon);
      flat += bonus.flat || 0;
      if (bonus.extraDice) extraDice.push(...bonus.extraDice);
    }
  });

  return { flat, extraDice };
}

function getActiveDamageResistances() {
  const resistances = [];
  char.activeConditions.forEach(key => {
    const def = CONDITION_DEFS[key];
    if (def && def.damageResistance) resistances.push(...def.damageResistance);
  });
  return [...new Set(resistances)];
}

/* ═══════════════════════════════════════════════════
   CONDITIONS BAR RENDER
   ═══════════════════════════════════════════════════ */
function renderConditionsBar() {
  const container = document.getElementById('conditions-bar');
  if (!container) return;
  clearChildren(container);

  Object.entries(CONDITION_DEFS).forEach(([key, def]) => {
    const active = isConditionActive(key);
    const isNegative = def.category === 'condition';
    const btn = el('button', {
      className: 'condition-btn' + (active ? ' active' : '') + (isNegative ? ' negative' : ''),
      textContent: def.name,
      title: def.description
    });
    btn.addEventListener('click', () => toggleCondition(key));
    container.appendChild(btn);
  });

  // Show active effects summary
  renderConditionIndicators();
}

function renderConditionIndicators() {
  const container = document.getElementById('condition-effects');
  if (!container) return;
  clearChildren(container);

  // Resistance is shown in the HP section via updateCombat()
  char.activeConditions.forEach(key => {
    const def = CONDITION_DEFS[key];
    if (def && def.weaponDamageBonus) {
      const sample = def.weaponDamageBonus({ability: 'str'});
      if (sample.flat > 0) {
        container.appendChild(el('span', { className: 'condition-indicator bonus', textContent: '+' + sample.flat + ' melee dmg (' + def.name + ')' }));
      }
      sample.extraDice.forEach(ed => {
        container.appendChild(el('span', { className: 'condition-indicator bonus', textContent: '+' + ed.count + 'd' + ed.sides + ' dmg (' + ed.source + ')' }));
      });
    }
  });
}
