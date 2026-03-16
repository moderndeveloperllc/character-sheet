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
    dmgInput.addEventListener('change', () => { spell.damage = dmgInput.value; save(); });

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
      const castBtn = el('button', { className: 'roll-atk-btn cast-btn', textContent: 'Cast', title: 'Cast spell (use slot)' });
      castBtn.addEventListener('click', () => castSpell(spell));
      actionChildren.push(castBtn);
    }

    const removeBtn = el('button', { className: 'remove-btn', textContent: '\u00d7' });
    removeBtn.addEventListener('click', () => { char.spells.splice(i, 1); save(); renderSpells(); });
    actionChildren.push(removeBtn);

    const actionDiv = el('div', { style: 'display:flex;gap:3px;align-items:center;justify-content:flex-end' }, actionChildren);

    list.appendChild(el('div', { className: 'spell-row' }, [
      prepCb, nameCombo, levelSelect, schoolSelect, concEl, dmgInput, actionDiv
    ]));
  });
}
