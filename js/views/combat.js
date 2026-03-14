/* ═══════════════════════════════════════════════════
   COMBAT: Saves, Skills, Passives, HP, Hit Dice,
           Death Saves, Class Resources
   ═══════════════════════════════════════════════════ */

function renderSaves() {
  const list = document.getElementById('saves-list');
  clearChildren(list);
  ABILITIES.forEach(a => {
    const bonus = getSaveBonus(a);
    const cb = el('input', { type: 'checkbox', className: 'custom-check' });
    cb.checked = char.saveProficiencies[a];
    cb.addEventListener('change', () => { char.saveProficiencies[a] = cb.checked; save(); updateCalculated(); });
    cb.addEventListener('click', (e) => e.stopPropagation());

    const row = el('div', { className: 'save-row' }, [
      cb,
      el('span', { className: 'save-bonus', textContent: formatMod(bonus) }),
      el('span', { className: 'save-name', textContent: ABILITY_NAMES[a] }),
    ]);
    row.addEventListener('click', () => rollCheck(getSaveBonus(a), ABILITY_NAMES[a] + ' Save', { isSave: true, ability: a }));
    list.appendChild(row);
  });
}

function renderSkills() {
  const list = document.getElementById('skills-list');
  clearChildren(list);
  SKILLS.forEach(skill => {
    const bonus = getSkillBonus(skill);
    const profCb = el('input', { type: 'checkbox', className: 'custom-check', title: 'Proficient' });
    profCb.checked = char.skillProficiencies[skill.key];
    profCb.addEventListener('change', () => { char.skillProficiencies[skill.key] = profCb.checked; save(); updateCalculated(); });
    profCb.addEventListener('click', (e) => e.stopPropagation());

    const expertCb = el('input', { type: 'checkbox', className: 'custom-check expertise-check', title: 'Expertise' });
    expertCb.checked = char.skillExpertise[skill.key];
    expertCb.addEventListener('change', () => { char.skillExpertise[skill.key] = expertCb.checked; save(); updateCalculated(); });
    expertCb.addEventListener('click', (e) => e.stopPropagation());

    const row = el('div', { className: 'skill-row' }, [
      profCb, expertCb,
      el('span', { className: 'skill-bonus', textContent: formatMod(bonus) }),
      el('span', { className: 'skill-name', textContent: skill.name }),
      el('span', { className: 'skill-ability', textContent: ABILITY_SHORT[skill.ability] }),
    ]);
    row.addEventListener('click', () => rollCheck(getSkillBonus(skill), skill.name, { ability: skill.ability }));
    list.appendChild(row);
  });
}

function renderPassives() {
  const list = document.getElementById('passives-list');
  clearChildren(list);
  [
    { name: 'Passive Perception', key: 'perception' },
    { name: 'Passive Insight', key: 'insight' },
    { name: 'Passive Investigation', key: 'investigation' },
  ].forEach(p => {
    list.appendChild(el('div', { className: 'passive-row' }, [
      el('span', { className: 'passive-name', textContent: p.name }),
      el('span', { className: 'passive-value', textContent: String(getPassive(p.key)) }),
    ]));
  });
}

function renderHitDice() {
  const list = document.getElementById('hit-dice-list');
  clearChildren(list);
  char.hitDice.forEach((hd, i) => {
    const typeSelect = document.createElement('select');
    [6, 8, 10, 12].forEach(d => {
      const opt = document.createElement('option');
      opt.value = String(d); opt.textContent = 'd' + d;
      if (hd.type === d) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', () => { hd.type = parseInt(typeSelect.value); save(); });

    const remaining = hd.total - hd.used;
    const remInput = el('input', { type: 'number', value: String(remaining), min: '0', max: String(hd.total) });
    remInput.addEventListener('change', () => { hd.used = Math.max(0, hd.total - (parseInt(remInput.value) || 0)); save(); renderHitDice(); });

    const totalInput = el('input', { type: 'number', value: String(hd.total), min: '0' });
    totalInput.addEventListener('change', () => { hd.total = parseInt(totalInput.value) || 0; hd.used = Math.min(hd.used, hd.total); save(); renderHitDice(); });

    const useBtn = el('button', { className: 'hd-use-btn', textContent: 'Use', title: 'Use hit die' });
    useBtn.addEventListener('click', () => {
      if (hd.used < hd.total) {
        hd.used++;
        const conMod = getMod(char.abilities.con);
        const results = rollDice(1, hd.type);
        const heal = Math.max(1, results[0] + conMod);
        addToLog({ label: 'Hit Die (d' + hd.type + ')', detail: 'd' + hd.type + '(' + results[0] + ') ' + formatMod(conMod) + ' CON', total: heal, isCrit: false, isFumble: false });
        char.currentHp = Math.min(char.maxHp, char.currentHp + heal);
        save(); renderHitDice(); updateCombat();
      }
    });

    const removeBtn = el('button', { className: 'hd-remove-btn', textContent: '\u00d7', title: 'Remove' });
    removeBtn.addEventListener('click', () => { if (char.hitDice.length > 1) { char.hitDice.splice(i, 1); save(); renderHitDice(); } });

    list.appendChild(el('div', { className: 'hit-dice-row' }, [
      typeSelect,
      el('span', { style: 'color:var(--text-dim);font-size:0.8rem', textContent: 'Rem:' }),
      remInput,
      el('span', { style: 'color:var(--text-dim);font-size:0.8rem', textContent: '/' }),
      totalInput,
      useBtn, removeBtn
    ]));
  });
}

function renderDeathSaves() {
  const container = document.getElementById('death-saves');
  clearChildren(container);

  const successGroup = el('div', { className: 'death-save-group' }, [el('span', { textContent: 'Success' })]);
  for (let i = 0; i < 3; i++) {
    const pip = el('button', { className: 'death-pip success-pip' + (i < char.deathSaves.successes ? ' filled' : '') });
    const idx = i;
    pip.addEventListener('click', () => {
      char.deathSaves.successes = idx < char.deathSaves.successes ? idx : idx + 1;
      save(); renderDeathSaves();
    });
    successGroup.appendChild(pip);
  }

  const failGroup = el('div', { className: 'death-save-group' }, [el('span', { textContent: 'Failure' })]);
  for (let i = 0; i < 3; i++) {
    const pip = el('button', { className: 'death-pip failure-pip' + (i < char.deathSaves.failures ? ' filled' : '') });
    const idx = i;
    pip.addEventListener('click', () => {
      char.deathSaves.failures = idx < char.deathSaves.failures ? idx : idx + 1;
      save(); renderDeathSaves();
    });
    failGroup.appendChild(pip);
  }

  const resetBtn = el('button', { className: 'btn btn-small', textContent: 'Reset', style: 'margin-left:auto' });
  resetBtn.addEventListener('click', () => { char.deathSaves = { successes: 0, failures: 0 }; save(); renderDeathSaves(); });

  container.appendChild(successGroup);
  container.appendChild(failGroup);
  container.appendChild(resetBtn);
}

function renderClassResources() {
  const container = document.getElementById('class-resources');
  if (!container) return;
  clearChildren(container);

  if (char.classResources.length === 0) {
    container.style.display = 'none';
    return;
  }
  container.style.display = '';

  char.classResources.forEach((r, ri) => {
    const max = getResourceMax(r);
    const pipsDiv = el('div', { className: 'resource-pips' });
    for (let i = 0; i < max; i++) {
      const pip = el('button', { className: 'slot-pip' + (i < r.current ? ' filled' : '') });
      const idx = i;
      pip.addEventListener('click', () => {
        if (idx < r.current) r.current = idx;
        else r.current = idx + 1;
        save(); renderClassResources();
      });
      pipsDiv.appendChild(pip);
    }

    const restLabel = el('span', { className: 'resource-rest-label', textContent: r.restoreOn === 'short' ? '(SR)' : '(LR)' });
    const tracker = el('div', { className: 'resource-tracker' }, [
      el('div', { className: 'resource-name' }, [
        document.createTextNode(r.name + ' '),
        restLabel
      ]),
      pipsDiv
    ]);
    container.appendChild(tracker);
  });
}

function updateCombat() {
  const hpEl = document.getElementById('hp-current');
  hpEl.value = char.currentHp;
  hpEl.classList.remove('damaged', 'healthy');
  if (char.maxHp > 0) {
    const ratio = char.currentHp / char.maxHp;
    if (ratio <= 0.25) hpEl.classList.add('damaged');
    else if (ratio >= 1) hpEl.classList.add('healthy');
  }

  // Show damage resistance indicator
  const resistEl = document.getElementById('resistance-indicator');
  if (resistEl) {
    const resistances = getActiveDamageResistances();
    if (resistances.length > 0) {
      resistEl.textContent = 'Resist: ' + resistances.join(', ');
      resistEl.style.display = '';
    } else {
      resistEl.style.display = 'none';
    }
  }
}

function flashHp(type) {
  const section = document.querySelector('.hp-section');
  section.classList.remove('hp-flash-damage', 'hp-flash-heal');
  void section.offsetHeight;
  section.classList.add(type === 'damage' ? 'hp-flash-damage' : 'hp-flash-heal');
}
