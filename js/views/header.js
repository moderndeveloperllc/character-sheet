/* ═══════════════════════════════════════════════════
   HEADER: Combo-boxes + Auto-population
   ═══════════════════════════════════════════════════ */
let subclassCombo = null;

function setupHeaderCombos() {
  // Class combo
  const classEl = document.getElementById('char-class');
  const classCombo = createComboBox({
    options: Object.values(CLASS_DATA).map(c => ({ value: c.name.toLowerCase(), label: c.name })),
    value: char.charClass, placeholder: 'Class', name: 'charClass', id: 'char-class',
    onChange: (val) => { char.charClass = val; save(); },
    onSelect: (val, o) => {
      char.charClass = o.label;
      char.subclass = '';
      applyClassDefaults(val);
      const data = CLASS_DATA[val];
      if (data && subclassCombo) {
        subclassCombo.setOptions(data.subclasses.map(s => ({ value: s, label: s })));
        subclassCombo.setValue('');
      }
    }
  });
  classEl.parentNode.replaceChild(classCombo, classEl);

  // Subclass combo
  const subEl = document.getElementById('char-subclass');
  const currentClassData = CLASS_DATA[char.charClass.toLowerCase()];
  const subOpts = currentClassData ? currentClassData.subclasses.map(s => ({ value: s, label: s })) : [];
  subclassCombo = createComboBox({
    options: subOpts, value: char.subclass, placeholder: 'Subclass', name: 'subclass', id: 'char-subclass',
    onChange: (val) => { char.subclass = val; save(); },
    onSelect: (val) => { char.subclass = val; save(); }
  });
  subEl.parentNode.replaceChild(subclassCombo, subEl);

  // Race combo
  const raceEl = document.getElementById('char-race');
  const raceCombo = createComboBox({
    options: Object.values(RACE_DATA).map(r => ({ value: r.name.toLowerCase(), label: r.name })),
    value: char.race, placeholder: 'Race', name: 'race', id: 'char-race',
    onChange: (val) => { char.race = val; save(); },
    onSelect: (val, o) => { char.race = o.label; applyRaceDefaults(val); }
  });
  raceEl.parentNode.replaceChild(raceCombo, raceEl);

  // Background combo
  const bgEl = document.getElementById('char-background');
  const bgCombo = createComboBox({
    options: Object.values(BACKGROUND_DATA).map(b => ({ value: b.name.toLowerCase(), label: b.name })),
    value: char.background, placeholder: 'Background', name: 'background', id: 'char-background',
    onChange: (val) => { char.background = val; save(); },
    onSelect: (val, o) => { char.background = o.label; applyBackgroundDefaults(val); }
  });
  bgEl.parentNode.replaceChild(bgCombo, bgEl);
}

function applyClassDefaults(classKey) {
  const data = CLASS_DATA[classKey];
  if (!data) return;

  if (char.hitDice.length > 0) {
    char.hitDice[0].type = data.hitDie;
    char.hitDice[0].total = char.level;
  }

  const anySavesSet = ABILITIES.some(a => char.saveProficiencies[a]);
  if (!anySavesSet || confirm('Apply ' + data.name + ' saving throw proficiencies (' + data.saves.map(s => ABILITY_SHORT[s]).join(', ') + ')?')) {
    ABILITIES.forEach(a => char.saveProficiencies[a] = false);
    data.saves.forEach(a => char.saveProficiencies[a] = true);
  }

  if (data.spellcasting) {
    char.spellcastingAbility = data.spellcasting;
    document.getElementById('spell-ability').value = data.spellcasting;
  }

  // Auto-fill spell slots based on class and level
  const slots = getSpellSlotsForClass(classKey, char.level);
  if (slots) {
    for (var i = 0; i < 9; i++) {
      char.spellSlots[i + 1].max = slots[i];
      char.spellSlots[i + 1].used = 0;
    }
  }

  if (!char.classFeatures || confirm('Replace class features text with ' + data.name + ' defaults?')) {
    char.classFeatures = data.features;
  }

  // Apply class resources
  if (data.resources && data.resources.length > 0) {
    char.classResources = data.resources.map(r => ({
      name: r.name,
      maxFormula: r.maxFormula,
      restoreOn: r.restoreOn,
      current: getResourceMax(r),
    }));
  } else {
    char.classResources = [];
  }

  save();
  renderHitDice(); renderClassResources(); updateCalculated(); populateFields();
}

function applyRaceDefaults(raceKey) {
  const data = RACE_DATA[raceKey];
  if (!data) return;
  char.speed = data.speed;
  document.getElementById('combat-speed').value = data.speed;
  if (!char.racialTraits || confirm('Replace racial traits with ' + data.name + ' defaults?')) {
    char.racialTraits = data.traits;
  }
  save(); populateFields();
}

function applyBackgroundDefaults(bgKey) {
  const data = BACKGROUND_DATA[bgKey];
  if (!data) return;
  const anySkillsSet = SKILLS.some(s => char.skillProficiencies[s.key]);
  if (!anySkillsSet || confirm('Apply ' + data.name + ' skill proficiencies (' + data.skills.join(', ') + ')?')) {
    data.skills.forEach(sk => char.skillProficiencies[sk] = true);
  }
  save(); updateCalculated();
}
