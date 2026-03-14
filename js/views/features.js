/* ═══════════════════════════════════════════════════
   FEATURES & TRAITS
   ═══════════════════════════════════════════════════ */
function setupFeatureTabs() {
  document.querySelectorAll('.feature-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.feature-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.feature-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector('.feature-content[data-content="' + tab.dataset.tab + '"]').classList.add('active');
    });
  });

  bindTextareas('.feature-textarea');
}
