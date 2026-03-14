/* ═══════════════════════════════════════════════════
   ABILITY SCORES
   ═══════════════════════════════════════════════════ */
function renderAbilities() {
  const grid = document.getElementById('abilities-grid');
  clearChildren(grid);
  ABILITIES.forEach(a => {
    const score = char.abilities[a];
    const mod = getMod(score);

    const scoreInput = el('input', {
      type: 'number', className: 'ability-score-input',
      value: String(score), min: '1', max: '30'
    });
    scoreInput.addEventListener('change', () => {
      char.abilities[a] = parseInt(scoreInput.value) || 10;
      modDiv.textContent = formatMod(getMod(char.abilities[a]));
      save(); updateCalculated();
    });
    scoreInput.addEventListener('click', (e) => e.stopPropagation());

    const modDiv = el('div', { className: 'ability-modifier', textContent: formatMod(mod) });
    const block = el('div', { className: 'ability-block', title: 'Click to roll ' + ABILITY_NAMES[a] + ' check' }, [
      el('div', { className: 'ability-label', textContent: ABILITY_SHORT[a] }),
      modDiv,
      scoreInput
    ]);
    block.addEventListener('click', () => rollCheck(getMod(char.abilities[a]), ABILITY_NAMES[a], { ability: a }));
    grid.appendChild(block);
  });
}
