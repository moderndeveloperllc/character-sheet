/* ═══════════════════════════════════════════════════
   ATTACKS & WEAPONS
   ═══════════════════════════════════════════════════ */
var _weaponOpts = null;
function getWeaponOpts() {
  if (!_weaponOpts) _weaponOpts = Object.values(WEAPON_DATA).map(wd => ({ value: wd.name.toLowerCase(), label: wd.name, data: wd }));
  return _weaponOpts;
}

function renderWeapons() {
  const list = document.getElementById('weapons-list');
  clearChildren(list);
  const weaponOpts = getWeaponOpts();

  char.weapons.forEach((w, i) => {
    const nameCombo = createComboBox({
      options: weaponOpts,
      value: w.name,
      placeholder: 'Weapon name', name: 'weapon-name-' + i,
      groupBy: (o) => o.data.category,
      onChange: (val) => { w.name = val; save(); },
      onSelect: (val, o) => {
        const wd = o.data;
        w.name = wd.name; w.damageDice = wd.damageDice; w.damageType = wd.damageType;
        w.ability = wd.ability; w.properties = wd.properties || [];
        w.manualOverride = false; w.proficient = true;
        save(); renderWeapons();
      },
      className: 'weapon-name-combo'
    });

    const abilSelect = document.createElement('select');
    abilSelect.name = 'weapon-ability-' + i;
    abilSelect.style.cssText = 'font-size:0.8rem';
    ['str', 'dex', 'finesse'].forEach(a => {
      const opt = document.createElement('option');
      opt.value = a; opt.textContent = a === 'finesse' ? 'FIN' : ABILITY_SHORT[a];
      if (w.ability === a) opt.selected = true;
      abilSelect.appendChild(opt);
    });
    abilSelect.addEventListener('change', () => { w.ability = abilSelect.value; save(); renderWeapons(); });

    const atkBonus = getWeaponAttackBonus(w);
    const condDmg = getConditionDamageBonus(w);
    let atkEl;
    if (w.manualOverride) {
      atkEl = el('input', { type: 'text', name: 'weapon-atk-' + i, value: w.attackBonus, placeholder: '+0', style: 'text-align:center' });
      atkEl.addEventListener('change', () => { w.attackBonus = atkEl.value; save(); });
    } else {
      atkEl = el('span', { className: 'auto-calculated', style: 'text-align:center;display:block;padding:4px', textContent: formatMod(atkBonus) });
    }

    const dmgInput = el('input', { type: 'text', name: 'weapon-dmg-' + i, value: w.damageDice, placeholder: '1d8' });
    dmgInput.addEventListener('change', () => { w.damageDice = dmgInput.value; save(); });

    const dmgMod = getWeaponDamageModifier(w);
    const totalDmgMod = dmgMod + condDmg.flat;
    let modEl;
    if (w.manualOverride) {
      modEl = el('input', { type: 'text', name: 'weapon-mod-' + i, value: w.damageModifier, placeholder: '+0', style: 'text-align:center' });
      modEl.addEventListener('change', () => { w.damageModifier = modEl.value; save(); });
    } else {
      let modText = formatMod(totalDmgMod);
      if (condDmg.extraDice.length > 0) {
        modText += '+' + condDmg.extraDice.map(d => d.count + 'd' + d.sides).join('+');
      }
      modEl = el('span', { className: 'auto-calculated', style: 'text-align:center;display:block;padding:4px;font-size:0.8rem', textContent: modText });
    }

    const typeSelect = document.createElement('select');
    typeSelect.name = 'weapon-type-' + i;
    DAMAGE_TYPES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t;
      if (w.damageType === t) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener('change', () => { w.damageType = typeSelect.value; save(); });

    const manualCb = el('input', { type: 'checkbox', className: 'custom-check expertise-check', name: 'weapon-manual-' + i, title: 'Manual override' });
    manualCb.checked = w.manualOverride;
    manualCb.addEventListener('change', () => { w.manualOverride = manualCb.checked; save(); renderWeapons(); });

    const atkBtn = el('button', { className: 'roll-atk-btn', textContent: 'Atk', title: 'Roll attack' });
    atkBtn.addEventListener('click', () => rollCheck(getWeaponAttackBonus(w), (w.name || 'Attack') + ' Atk', { isAttack: true }));

    const dmgBtn = el('button', { className: 'roll-dmg-btn', textContent: 'Dmg', title: 'Roll damage' });
    dmgBtn.addEventListener('click', () => rollWeaponDamage(w, (w.name || 'Damage') + ' Dmg'));

    const removeBtn = el('button', { className: 'remove-btn', textContent: '\u00d7', title: 'Remove' });
    removeBtn.addEventListener('click', () => { char.weapons.splice(i, 1); save(); renderWeapons(); });

    const actionDiv = el('div', { style: 'display:flex;gap:3px;align-items:center' }, [manualCb, atkBtn, dmgBtn, removeBtn]);
    const row = el('div', { className: 'weapon-row' }, [nameCombo, abilSelect, atkEl, dmgInput, modEl, typeSelect, actionDiv]);
    list.appendChild(row);
  });
}
