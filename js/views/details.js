/* ═══════════════════════════════════════════════════
   CHARACTER DETAILS
   ═══════════════════════════════════════════════════ */
function setupDetails() {
  bindTextareas('#details-panel textarea');

  document.getElementById('backstory-toggle').addEventListener('click', () => {
    document.getElementById('backstory-wrapper').classList.toggle('open');
    document.querySelector('#backstory-toggle .arrow').classList.toggle('open');
  });
}
