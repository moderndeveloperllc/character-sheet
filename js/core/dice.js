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
  if (entry.isCrit) node.classList.add('crit');
  if (entry.isFumble) node.classList.add('fumble');
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
    subtitle.textContent = '';
    duration = 900;
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
