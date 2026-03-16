/* ═══════════════════════════════════════════════════
   DICE ROLLING ENGINE
   ═══════════════════════════════════════════════════ */
function rollDice(count, sides) {
  const results = [];
  for (let i = 0; i < count; i++) results.push(Math.floor(Math.random() * sides) + 1);
  return results;
}

function rollCheck(modifier, label, options) {
  options = options || {};
  const isAttack = options.isAttack || false;
  const isSave = options.isSave || false;
  const ability = options.ability || null;

  // Determine advantage from manual toggle + conditions
  let mode = advantageMode;
  const condAdv = getConditionAdvantage(isAttack ? 'attack' : isSave ? 'save' : 'check', ability);
  if (condAdv === 'advantage' && mode !== 'disadvantage') mode = 'advantage';
  else if (condAdv === 'disadvantage' && mode !== 'advantage') mode = 'disadvantage';
  else if (condAdv === 'advantage' && mode === 'disadvantage') mode = 'normal'; // cancel out
  else if (condAdv === 'disadvantage' && mode === 'advantage') mode = 'normal';

  let rolls, chosen;
  if (mode === 'advantage' || mode === 'disadvantage') {
    rolls = rollDice(2, 20);
    chosen = mode === 'advantage' ? Math.max(...rolls) : Math.min(...rolls);
  } else {
    rolls = rollDice(1, 20);
    chosen = rolls[0];
  }

  let total = chosen + modifier;
  const modeLabel = mode === 'advantage' ? ' (Adv)' : mode === 'disadvantage' ? ' (Dis)' : '';
  let detail = rolls.length > 1
    ? 'd20(' + rolls.join(', ') + ') \u2192 ' + chosen + ' ' + formatMod(modifier)
    : 'd20(' + chosen + ') ' + formatMod(modifier);

  // Condition bonuses (e.g., Bless +1d4)
  const condMods = isAttack ? getConditionAttackMods() : isSave ? getConditionSaveMods() : [];
  condMods.forEach(cm => {
    const bonusRolls = rollDice(cm.count, cm.sides);
    const bonusTotal = bonusRolls.reduce((a, b) => a + b, 0);
    total += bonusTotal;
    detail += ' +' + cm.count + 'd' + cm.sides + '(' + bonusRolls.join(',') + ') ' + cm.source;
  });

  const wasCrit = chosen === 20;
  if (isAttack) lastAttackWasCrit = wasCrit;

  addToLog({ label: label + modeLabel, detail: detail, total: total, isCrit: wasCrit, isFumble: chosen === 1 });
  return total;
}

// Crit tracking: last attack crit status, and crit rule setting
var lastAttackWasCrit = false;
// 'double-dice' = RAW (roll twice the dice), 'double-total' = house rule (double the rolled total)
var critRule = 'double-dice';

function rollWeaponDamage(weapon, label, forceCrit) {
  const isCrit = forceCrit || lastAttackWasCrit;
  lastAttackWasCrit = false; // consume the crit

  const diceExpr = weapon.damageDice || '1d4';
  const parsed = parseDiceExpr(diceExpr);
  if (!parsed) return;

  const baseMod = getWeaponDamageModifier(weapon);
  const condBonus = getConditionDamageBonus(weapon);
  const totalMod = baseMod + condBonus.flat;

  let results, diceTotal, detail;
  const diceCount = parsed.count;
  const diceSides = parsed.sides;

  if (isCrit && critRule === 'double-dice') {
    // RAW: roll double the number of dice
    results = rollDice(diceCount * 2, diceSides);
    diceTotal = results.reduce((a, b) => a + b, 0);
    detail = (diceCount * 2) + 'd' + diceSides + '(' + results.join(', ') + ') ' + formatMod(totalMod) + ' [CRIT]';
  } else {
    results = rollDice(diceCount, diceSides);
    diceTotal = results.reduce((a, b) => a + b, 0);
    if (isCrit && critRule === 'double-total') {
      // House rule: double the dice total (not the modifier)
      detail = diceCount + 'd' + diceSides + '(' + results.join(', ') + ')x2=' + (diceTotal * 2) + ' ' + formatMod(totalMod) + ' [CRIT]';
      diceTotal = diceTotal * 2;
    } else {
      detail = diceCount + 'd' + diceSides + '(' + results.join(', ') + ') ' + formatMod(totalMod);
    }
  }

  let total = diceTotal + totalMod;

  // Extra dice from conditions (e.g., Hex 1d6) — also doubled on crit per RAW
  condBonus.extraDice.forEach(ed => {
    const edCount = isCrit && critRule === 'double-dice' ? ed.count * 2 : ed.count;
    const extraRolls = rollDice(edCount, ed.sides);
    let extraTotal = extraRolls.reduce((a, b) => a + b, 0);
    if (isCrit && critRule === 'double-total') extraTotal = extraTotal * 2;
    total += extraTotal;
    detail += ' +' + edCount + 'd' + ed.sides + '(' + extraRolls.join(',') + ') ' + ed.source;
  });

  const critLabel = isCrit ? ' (CRIT)' : '';
  addToLog({ label: label + critLabel, detail: detail, total: total, isCrit: isCrit });
  return total;
}

var DAMAGE_TYPE_COLORS = {
  'Acid': '#68d468',
  'Cold': '#6ec4e8',
  'Fire': '#e87040',
  'Lightning': '#b898ff',
  'Necrotic': '#a8a8a8',
  'Poison': '#58c058',
  'Psychic': '#e070c0',
  'Radiant': '#f0d860',
  'Thunder': '#80b0e0',
  'Bludgeoning': null,
  'Piercing': null,
  'Slashing': null,
  'Force': null
};

function getDamageTypeColor(damageType) {
  if (!damageType) return null;
  return DAMAGE_TYPE_COLORS[damageType] || null;
}

function getCantripDiceCount(baseDice) {
  var parsed = parseDiceExpr(baseDice);
  if (!parsed) return baseDice;
  var scale = 1;
  if (char.level >= 17) scale = 4;
  else if (char.level >= 11) scale = 3;
  else if (char.level >= 5) scale = 2;
  return (parsed.count * scale) + 'd' + parsed.sides + (parsed.modifier ? (parsed.modifier > 0 ? '+' : '') + parsed.modifier : '');
}

function useSpellSlot(spell) {
  if (spell.level < 1) return;
  var slot = char.spellSlots[spell.level];
  if (slot && slot.used < slot.max) {
    slot.used++;
    save();
    renderSpellSlots();
  }
}

function castSpell(spell) {
  useSpellSlot(spell);
  addToLog({ label: (spell.name || 'Spell') + ' Cast', detail: spell.level > 0 ? 'Level ' + spell.level : 'Cantrip', total: '\u2714', isCrit: false, isFumble: false });
}

function rollSpellAttack(spell) {
  useSpellSlot(spell);
  rollCheck(getSpellAttack(), (spell.name || 'Spell') + ' Atk', { isAttack: true });
}

function rollSpellDamage(spell) {
  var diceExpr = spell.damage;
  if (!diceExpr) return;
  var saveTag = spell.save ? ' [' + spell.save.toUpperCase() + ' save]' : '';
  var label = (spell.name || 'Spell') + ' Dmg' + saveTag;
  var isCantrip = spell.level === 0;

  // Cantrip scaling
  if (isCantrip) diceExpr = getCantripDiceCount(diceExpr);

  // Magic Missile special handling: roll each missile separately
  if (spell.missiles) {
    var missileCount = spell.missiles;
    var missileResults = [];
    var grandTotal = 0;
    for (var m = 0; m < missileCount; m++) {
      var mp = parseDiceExpr(diceExpr);
      if (!mp) return;
      var rolls = rollDice(mp.count, mp.sides);
      var mTotal = rolls.reduce(function(a, b) { return a + b; }, 0) + mp.modifier;
      missileResults.push(mTotal);
      grandTotal += mTotal;
    }
    addToLog({
      label: label,
      detail: missileCount + ' missiles: ' + missileResults.join(' + ') + ' (' + diceExpr + ' each)',
      total: grandTotal,
      damageType: spell.damageType || ''
    });
    // Consume slot for non-cantrip if not already consumed via ATK
    if (!isCantrip && !spell.attack) useSpellSlot(spell);
    return grandTotal;
  }

  var parsed = parseDiceExpr(diceExpr);
  if (!parsed) return;

  var isCrit = lastAttackWasCrit;
  lastAttackWasCrit = false;

  var diceCount = parsed.count;
  var diceSides = parsed.sides;
  var baseMod = parsed.modifier;
  var results, diceTotal, detail;

  if (isCrit && critRule === 'double-dice') {
    results = rollDice(diceCount * 2, diceSides);
    diceTotal = results.reduce(function(a, b) { return a + b; }, 0);
    detail = (diceCount * 2) + 'd' + diceSides + '(' + results.join(', ') + ') ' + formatMod(baseMod) + ' [CRIT]';
  } else {
    results = rollDice(diceCount, diceSides);
    diceTotal = results.reduce(function(a, b) { return a + b; }, 0);
    if (isCrit && critRule === 'double-total') {
      detail = diceCount + 'd' + diceSides + '(' + results.join(', ') + ')x2=' + (diceTotal * 2) + ' ' + formatMod(baseMod) + ' [CRIT]';
      diceTotal = diceTotal * 2;
    } else {
      detail = diceCount + 'd' + diceSides + '(' + results.join(', ') + ')' + (baseMod ? ' ' + formatMod(baseMod) : '');
    }
  }

  var total = diceTotal + baseMod;
  if (spell.damageType) detail += ' ' + spell.damageType.toLowerCase();

  var critLabel = isCrit ? ' (CRIT)' : '';
  addToLog({ label: label + critLabel, detail: detail, total: total, isCrit: isCrit, damageType: spell.damageType || '' });

  // Consume slot for save-based spells (no attack roll)
  if (!isCantrip && !spell.attack) useSpellSlot(spell);
  return total;
}

function parseDiceExpr(expr) {
  if (!expr) return null;
  const match = String(expr).trim().match(/^(\d+)?d(\d+)\s*([+-]\s*\d+)?$/i);
  if (!match) return null;
  return {
    count: parseInt(match[1] || '1'),
    sides: parseInt(match[2]),
    modifier: match[3] ? parseInt(match[3].replace(/\s/g, '')) : 0
  };
}
var parseFullDiceExpr = parseDiceExpr;

function addToLog(entry) {
  entry.timestamp = Date.now();
  if (entry.isCrit === undefined) entry.isCrit = false;
  if (entry.isFumble === undefined) entry.isFumble = false;
  rollHistory.push(entry);
  if (rollHistory.length > 20) rollHistory = rollHistory.slice(-20);
  saveRollHistory();
  renderRollLog();
  showLastResult(entry);
}

function showLastResult(entry) {
  const node = document.getElementById('last-roll-result');
  node.textContent = entry.total;
  node.className = 'last-roll-result';
  node.style.color = '';
  node.style.textShadow = '';
  if (entry.isCrit) node.classList.add('crit');
  else if (entry.isFumble) node.classList.add('fumble');
  else {
    var dmgColor = entry.damageType ? getDamageTypeColor(entry.damageType) : null;
    if (dmgColor) {
      node.style.color = dmgColor;
      node.style.textShadow = '0 0 8px ' + dmgColor + '66';
    }
  }
  node.style.animation = 'none';
  void node.offsetHeight;
  node.style.animation = '';
  showRollOverlay(entry);
}

let overlayTimer = null;
let overlayFadeTimer = null;

function showRollOverlay(entry) {
  const overlay = document.getElementById('roll-overlay');
  const result = document.getElementById('roll-overlay-result');
  const label = document.getElementById('roll-overlay-label');
  const subtitle = document.getElementById('roll-overlay-subtitle');

  clearTimeout(overlayTimer);
  clearTimeout(overlayFadeTimer);

  // Step 1: Reset everything to clean state
  overlay.className = '';
  overlay.style.opacity = '0';
  result.style.cssText = '';
  label.style.cssText = '';
  subtitle.style.cssText = '';

  // Step 2: Set content
  result.textContent = entry.total;
  label.textContent = entry.label || '';

  let duration, overlayType;
  if (entry.isCrit) {
    overlayType = 'crit-overlay';
    subtitle.textContent = 'NATURAL 20';
    duration = 2400;
  } else if (entry.isFumble) {
    overlayType = 'fumble-overlay';
    subtitle.textContent = 'NATURAL 1';
    duration = 2000;
  } else {
    overlayType = 'normal-overlay';
    subtitle.textContent = entry.damageType || '';
    duration = 4000;
    // Apply damage type color to the result number
    var dmgColor = entry.damageType ? getDamageTypeColor(entry.damageType) : null;
    if (dmgColor) {
      result.style.color = dmgColor;
      result.style.textShadow = '0 0 30px ' + dmgColor + 'cc, 0 0 60px ' + dmgColor + '66, 0 2px 4px rgba(0,0,0,0.5)';
    }
  }

  // Step 3: Force reflow, then activate on next frame so animations trigger fresh
  void overlay.offsetHeight;
  requestAnimationFrame(function() {
    overlay.style.opacity = '';
    overlay.classList.add('active', overlayType);
  });

  overlayTimer = setTimeout(() => {
    overlay.classList.add('fading');
    overlayFadeTimer = setTimeout(() => { overlay.className = ''; }, 500);
  }, duration);
}
