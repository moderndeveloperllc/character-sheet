/* ═══════════════════════════════════════════════════
   CHARACTER MANAGEMENT (Import/Export/New)
   ═══════════════════════════════════════════════════ */
function exportCharacter() {
  const dataStr = JSON.stringify(char, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (char.name || 'character') + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importCharacter(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      mergeCharacterData(JSON.parse(ev.target.result));
      save(); initUI();
    } catch (err) {
      alert('Failed to import character: invalid JSON file.');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function setupManagement() {
  document.getElementById('export-btn').addEventListener('click', exportCharacter);
  document.getElementById('import-btn').addEventListener('click', () => document.getElementById('import-input').click());
  document.getElementById('import-input').addEventListener('change', importCharacter);
  document.getElementById('new-char-btn').addEventListener('click', () => {
    if (confirm('Create a new character? This will clear the current character data.')) {
      char = createDefaultCharacter(); save(); initUI();
    }
  });
}
