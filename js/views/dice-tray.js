/* ═══════════════════════════════════════════════════
   DICE TRAY (fixed bottom panel)
   ═══════════════════════════════════════════════════ */
function renderRollLog() {
  const log = document.getElementById('roll-log');
  clearChildren(log);
  rollHistory.forEach(entry => {
    const totalClass = 'roll-total' + (entry.isCrit ? ' crit' : '') + (entry.isFumble ? ' fumble' : '');
    const totalEl = el('span', { className: totalClass, textContent: String(entry.total) });
    const dmgColor = entry.damageType ? getDamageTypeColor(entry.damageType) : null;
    if (dmgColor && !entry.isCrit && !entry.isFumble) {
      totalEl.style.color = dmgColor;
      totalEl.style.textShadow = '0 0 8px ' + dmgColor + '66';
    }
    log.appendChild(el('div', { className: 'roll-entry' }, [
      el('span', { className: 'roll-label', textContent: String(entry.label) }),
      el('span', { className: 'roll-detail', textContent: String(entry.detail) }),
      totalEl,
    ]));
  });
}

function rollManual() {
  const input = document.getElementById('dice-manual-input');
  const expr = input.value.trim();
  if (!expr) return;
  const parsed = parseFullDiceExpr(expr);
  if (!parsed) {
    addToLog({ label: 'Error', detail: 'Invalid: ' + expr, total: '\u2014', isCrit: false, isFumble: false });
    return;
  }
  const results = rollDice(parsed.count, parsed.sides);
  const diceTotal = results.reduce((a, b) => a + b, 0);
  const total = diceTotal + parsed.modifier;
  const modStr = parsed.modifier !== 0 ? ' ' + formatMod(parsed.modifier) : '';
  addToLog({ label: expr, detail: parsed.count + 'd' + parsed.sides + '(' + results.join(', ') + ')' + modStr, total: total, isCrit: false, isFumble: false });
  input.value = '';
}

function setupDiceTray() {
  document.getElementById('dice-toggle').addEventListener('click', () => {
    const expanded = document.getElementById('dice-expanded');
    const toggle = document.getElementById('dice-toggle');
    expanded.classList.toggle('open');
    toggle.textContent = expanded.classList.contains('open') ? '\u25bc' : '\u25b6';
  });

  document.querySelectorAll('.dice-btn[data-die]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sides = parseInt(btn.dataset.die);
      if (sides === 20) { rollCheck(0, 'd20'); }
      else {
        const results = rollDice(1, sides);
        addToLog({ label: 'd' + sides, detail: 'd' + sides + '(' + results[0] + ')', total: results[0], isCrit: false, isFumble: false });
      }
    });
  });

  document.querySelectorAll('.adv-btn[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.adv-btn[data-mode]').forEach(b => b.className = 'adv-btn');
      advantageMode = btn.dataset.mode;
      const classMap = { normal: 'active-normal', advantage: 'active-adv', disadvantage: 'active-dis' };
      btn.classList.add(classMap[advantageMode]);
    });
  });

  // Crit rule toggle
  document.querySelectorAll('.adv-btn[data-crit]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.adv-btn[data-crit]').forEach(b => b.className = 'adv-btn');
      critRule = btn.dataset.crit;
      btn.classList.add('active-normal');
    });
  });

  document.getElementById('dice-manual-roll').addEventListener('click', rollManual);
  document.getElementById('dice-manual-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') rollManual(); });
}
