/* ═══════════════════════════════════════════════════
   SPELLCASTING
   ═══════════════════════════════════════════════════ */
function renderSpellSlots() {
  const grid = document.getElementById('spell-slots-grid');
  clearChildren(grid);
  for (let level = 1; level <= 9; level++) {
    const slot = char.spellSlots[level];
    const available = slot.max - slot.used;

    const pipsDiv = el('div', { className: 'slot-pips' });
    for (let i = 0; i < slot.max; i++) {
      const pip = el('button', { className: 'slot-pip' + (i < available ? ' filled' : '') });
      const idx = i;
      pip.addEventListener('click', () => {
        if (idx < (slot.max - slot.used)) slot.used = slot.max - idx;
        else slot.used = slot.max - idx - 1;
        save(); renderSpellSlots();
      });
      pipsDiv.appendChild(pip);
    }

    const maxInput = el('input', { type: 'number', className: 'slot-max-input', name: 'slot-max-' + level, value: String(slot.max), min: '0', max: '9', title: 'Max slots' });
    const lv = level;
    maxInput.addEventListener('change', () => {
      char.spellSlots[lv].max = Math.max(0, parseInt(maxInput.value) || 0);
      char.spellSlots[lv].used = Math.min(char.spellSlots[lv].used, char.spellSlots[lv].max);
      save(); renderSpellSlots();
    });

    grid.appendChild(el('div', { className: 'slot-level' }, [
      el('div', { className: 'slot-level-num', textContent: String(level) }),
      pipsDiv, maxInput
    ]));
  }
}

var _spellOpts = null;
function getSpellOpts() {
  if (!_spellOpts) {
    _spellOpts = Object.values(SPELL_DATA).map(s => ({
      value: s.name, label: s.name, data: s
    }));
  }
  return _spellOpts;
}

function getMaxSpellLevel() {
  for (let i = 9; i >= 1; i--) {
    if (char.spellSlots[i] && char.spellSlots[i].max > 0) return i;
  }
  return 0; // cantrips only
}

function getFilteredSpellOpts() {
  const classKey = char.charClass.toLowerCase();
  const all = getSpellOpts();
  const maxLevel = getMaxSpellLevel();
  return all.filter(o => {
    // Filter by level: cantrips always available, leveled spells up to max slot
    if (o.data.level > 0 && o.data.level > maxLevel) return false;
    // Filter by class if one is selected
    if (classKey && CLASS_DATA[classKey]) return o.data.classes.includes(classKey);
    return true;
  });
}

function getSpellSummary(spell) {
  var parts = [];
  parts.push(spell.level === 0 ? 'Cantrip' : 'Level ' + spell.level);
  if (spell.school) parts.push(spell.school);
  if (spell.concentration) parts.push('Concentration');
  if (spell.attack) parts.push(spell.attack.charAt(0).toUpperCase() + spell.attack.slice(1) + ' spell attack');
  if (spell.save) parts.push(spell.save.toUpperCase() + ' save');
  if (spell.damage) {
    var dmgStr = spell.damage;
    if (spell.damageType) dmgStr += ' ' + spell.damageType.toLowerCase();
    parts.push(dmgStr + ' damage');
  }
  if (spell.missiles) parts.push(spell.missiles + ' missiles');
  // Look up classes from SRD data
  var srdKey = Object.keys(SPELL_DATA).find(function(k) { return SPELL_DATA[k].name === spell.name; });
  if (srdKey && SPELL_DATA[srdKey].classes) {
    parts.push(SPELL_DATA[srdKey].classes.map(function(c) { return c.charAt(0).toUpperCase() + c.slice(1); }).join(', '));
  }
  return parts.join(' \u2022 ');
}

var activeSpellInfo = null;

function showSpellInfo(btn, spell) {
  // Dismiss if clicking same button
  if (activeSpellInfo) { activeSpellInfo.remove(); activeSpellInfo = null; if (btn._infoOpen) { btn._infoOpen = false; return; } }
  var popup = el('div', { className: 'spell-info-popup' }, [
    el('div', { className: 'spell-info-text', textContent: getSpellSummary(spell) })
  ]);
  btn.parentNode.appendChild(popup);
  activeSpellInfo = popup;
  btn._infoOpen = true;
  // Dismiss on click outside
  function dismiss(e) { if (!popup.contains(e.target) && e.target !== btn) { popup.remove(); activeSpellInfo = null; btn._infoOpen = false; document.removeEventListener('click', dismiss, true); } }
  setTimeout(function() { document.addEventListener('click', dismiss, true); }, 0);
}

function renderSpells() {
  const list = document.getElementById('spells-list');
  clearChildren(list);
  const spellOpts = getFilteredSpellOpts();

  char.spells.forEach((spell, i) => {
    const prepCb = el('input', { type: 'checkbox', className: 'custom-check spell-prepared', name: 'spell-prep-' + i, title: 'Prepared' });
    prepCb.checked = spell.prepared;
    prepCb.addEventListener('change', () => { spell.prepared = prepCb.checked; save(); });

    const nameCombo = createComboBox({
      options: spellOpts,
      value: spell.name,
      placeholder: 'Spell name', name: 'spell-name-' + i,
      groupBy: (o) => o.data.level === 0 ? 'Cantrips' : 'Level ' + o.data.level,
      onChange: (val) => { spell.name = val; save(); },
      onSelect: (val, o) => {
        const sd = o.data;
        spell.name = sd.name;
        spell.level = sd.level;
        spell.school = sd.school;
        spell.concentration = sd.concentration;
        spell.damage = sd.damage || '';
        spell.damageType = sd.damageType || '';
        spell.attack = sd.attack || '';
        spell.save = sd.save || '';
        spell.missiles = sd.missiles || 0;
        save(); renderSpells();
      },
    });

    const infoBtn = el('button', { className: 'spell-info-btn', textContent: '\u2139', title: 'Spell info' });
    infoBtn.addEventListener('click', (e) => { e.stopPropagation(); showSpellInfo(infoBtn, spell); });
    const nameCell = el('div', { className: 'spell-name-cell' }, [nameCombo, infoBtn]);

    const levelSelect = document.createElement('select');
    levelSelect.name = 'spell-level-' + i;
    const cantripOpt = document.createElement('option');
    cantripOpt.value = '0'; cantripOpt.textContent = 'C';
    if (spell.level === 0) cantripOpt.selected = true;
    levelSelect.appendChild(cantripOpt);
    for (let l = 1; l <= 9; l++) {
      const opt = document.createElement('option');
      opt.value = String(l); opt.textContent = String(l);
      if (spell.level === l) opt.selected = true;
      levelSelect.appendChild(opt);
    }
    levelSelect.addEventListener('change', () => { spell.level = parseInt(levelSelect.value); save(); });

    const schoolSelect = document.createElement('select');
    schoolSelect.name = 'spell-school-' + i;
    schoolSelect.appendChild(el('option', { value: '', textContent: '\u2014' }));
    SPELL_SCHOOLS.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s; opt.textContent = s;
      if (spell.school === s) opt.selected = true;
      schoolSelect.appendChild(opt);
    });
    schoolSelect.addEventListener('change', () => { spell.school = schoolSelect.value; save(); });

    const concEl = el('span', { className: 'conc-indicator' + (spell.concentration ? ' active' : ''), textContent: 'C', title: 'Toggle concentration' });
    concEl.addEventListener('click', () => { spell.concentration = !spell.concentration; save(); renderSpells(); });

    const dmgInput = el('input', { type: 'text', name: 'spell-dmg-' + i, value: spell.damage || '', placeholder: '\u2014', title: 'Damage dice' });
    dmgInput.addEventListener('change', () => { spell.damage = dmgInput.value; save(); renderSpells(); });

    const actionChildren = [];
    if (spell.attack) {
      const atkBtn = el('button', { className: 'roll-atk-btn', textContent: 'Atk', title: 'Roll spell attack' });
      atkBtn.addEventListener('click', () => rollSpellAttack(spell));
      actionChildren.push(atkBtn);
    }
    if (spell.damage) {
      const dmgBtn = el('button', { className: 'roll-dmg-btn', textContent: 'Dmg', title: 'Roll damage' });
      dmgBtn.addEventListener('click', () => rollSpellDamage(spell));
      actionChildren.push(dmgBtn);
    }
    if (!spell.attack && !spell.damage) {
      const castBtn = el('button', { className: 'cast-btn', textContent: 'Cast', title: 'Cast spell (use slot)' });
      castBtn.addEventListener('click', () => castSpell(spell));
      actionChildren.push(castBtn);
    }

    const removeBtn = el('button', { className: 'remove-btn', textContent: '\u00d7' });
    removeBtn.addEventListener('click', () => { char.spells.splice(i, 1); save(); renderSpells(); });
    actionChildren.push(removeBtn);

    const actionDiv = el('div', { className: 'spell-actions' }, actionChildren);

    list.appendChild(el('div', { className: 'spell-row' }, [
      prepCb, nameCell, levelSelect, schoolSelect, concEl, dmgInput, actionDiv
    ]));
  });
}
