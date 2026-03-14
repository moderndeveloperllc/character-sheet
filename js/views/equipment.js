/* ═══════════════════════════════════════════════════
   EQUIPMENT & CURRENCY
   ═══════════════════════════════════════════════════ */
function renderCurrency() {
  const row = document.getElementById('currency-row');
  clearChildren(row);
  CURRENCIES.forEach(c => {
    const input = el('input', { type: 'number', value: String(char.currency[c.key]), min: '0' });
    input.addEventListener('change', () => { char.currency[c.key] = parseInt(input.value) || 0; save(); });
    row.appendChild(el('div', { className: 'currency-field' }, [
      el('label', { textContent: c.label }), input
    ]));
  });
}

function renderEquipment() {
  const list = document.getElementById('equip-list');
  clearChildren(list);
  char.equipment.forEach((item, i) => {
    const nameInput = el('input', { type: 'text', value: item.name, placeholder: 'Item name' });
    const qtyInput = el('input', { type: 'number', value: String(item.quantity), min: '0' });
    const weightInput = el('input', { type: 'number', value: String(item.weight), min: '0', step: '0.1' });
    const notesInput = el('input', { type: 'text', value: item.notes, placeholder: 'Notes' });

    [nameInput, qtyInput, weightInput, notesInput].forEach(inp => {
      inp.addEventListener('change', () => {
        item.name = nameInput.value;
        item.quantity = parseFloat(qtyInput.value) || 0;
        item.weight = parseFloat(weightInput.value) || 0;
        item.notes = notesInput.value;
        save(); updateCarryCapacity();
      });
    });

    const removeBtn = el('button', { className: 'remove-btn', textContent: '\u00d7' });
    removeBtn.addEventListener('click', () => { char.equipment.splice(i, 1); save(); renderEquipment(); });

    list.appendChild(el('div', { className: 'equip-row' }, [nameInput, qtyInput, weightInput, notesInput, removeBtn]));
  });
  updateCarryCapacity();
}

function updateCarryCapacity() {
  const container = document.getElementById('carry-capacity');
  clearChildren(container);
  const capacity = getCarryCapacity();
  const weight = getTotalWeight();
  const isOver = weight > capacity;
  container.appendChild(document.createTextNode('Carrying: '));
  container.appendChild(el('span', { className: 'capacity-value' + (isOver ? ' over-capacity' : ''), textContent: weight.toFixed(1) }));
  container.appendChild(document.createTextNode(' / '));
  container.appendChild(el('span', { className: 'capacity-value', textContent: String(capacity) }));
  container.appendChild(document.createTextNode(' lbs'));
}
