/* ═══════════════════════════════════════════════════
   DOM HELPERS
   ═══════════════════════════════════════════════════ */
function escHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className') node.className = v;
      else if (k === 'textContent') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k.startsWith('data')) node.setAttribute(k.replace(/([A-Z])/g, '-$1').toLowerCase(), v);
      else node.setAttribute(k, v);
    }
  }
  if (children) {
    if (typeof children === 'string') node.textContent = children;
    else if (Array.isArray(children)) children.forEach(c => { if (c) node.appendChild(c); });
    else node.appendChild(children);
  }
  return node;
}

function clearChildren(parent) {
  while (parent.firstChild) parent.removeChild(parent.firstChild);
}

/* ═══════════════════════════════════════════════════
   SHARED UI HELPERS
   ═══════════════════════════════════════════════════ */
function createSelect(options, currentValue, onChange) {
  const select = document.createElement('select');
  options.forEach(o => {
    const opt = document.createElement('option');
    const val = typeof o === 'string' ? o : o.value;
    const label = typeof o === 'string' ? o : o.label;
    opt.value = val; opt.textContent = label;
    if (String(val) === String(currentValue)) opt.selected = true;
    select.appendChild(opt);
  });
  if (onChange) select.addEventListener('change', () => onChange(select.value));
  return select;
}

function bindTextareas(selector) {
  document.querySelectorAll(selector).forEach(ta => {
    ta.addEventListener('input', () => { char[ta.dataset.field] = ta.value; saveDebounced(); });
  });
}

/* ═══════════════════════════════════════════════════
   COMBO BOX COMPONENT
   ═══════════════════════════════════════════════════ */
function createComboBox(config) {
  const { options, value, placeholder, onChange, onSelect, allowCustom, groupBy, className } = {
    allowCustom: true, groupBy: null, className: '', ...config
  };

  const wrapper = el('div', { className: 'combo-wrapper ' + className });
  const input = el('input', { type: 'text', className: 'combo-input', name: config.name || '', placeholder: placeholder || '', value: value || '' });
  const arrow = el('span', { className: 'combo-arrow', textContent: '\u25be' });
  const dropdown = el('div', { className: 'combo-dropdown' });

  wrapper.appendChild(input);
  wrapper.appendChild(arrow);
  wrapper.appendChild(dropdown);

  let highlighted = -1;
  let currentOptions = options || [];
  let isOpen = false;

  function buildDropdown(filter) {
    clearChildren(dropdown);
    const term = (filter || '').toLowerCase();
    let filtered = currentOptions.filter(o => {
      const label = typeof o === 'string' ? o : o.label;
      return label.toLowerCase().includes(term);
    });
    if (filtered.length === 0) { close(); return; }
    if (groupBy) {
      const groups = {};
      filtered.forEach(o => {
        const g = groupBy(o) || '';
        if (!groups[g]) groups[g] = [];
        groups[g].push(o);
      });
      Object.entries(groups).forEach(([gName, items]) => {
        if (gName) dropdown.appendChild(el('div', { className: 'combo-group-header', textContent: gName }));
        items.forEach(o => appendOption(o));
      });
    } else {
      filtered.forEach(o => appendOption(o));
    }
    highlighted = -1;
    open();
  }

  function appendOption(o) {
    const label = typeof o === 'string' ? o : o.label;
    const opt = el('div', { className: 'combo-option', textContent: label });
    opt.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input.value = label;
      if (onSelect) onSelect(typeof o === 'string' ? o : o.value, o);
      if (onChange) onChange(label);
      close();
    });
    dropdown.appendChild(opt);
  }

  function open() {
    if (isOpen) return;
    dropdown.classList.add('open');
    isOpen = true;
    requestAnimationFrame(() => {
      const rect = dropdown.getBoundingClientRect();
      if (rect.bottom > window.innerHeight - 60) {
        dropdown.style.bottom = '100%'; dropdown.style.top = 'auto';
      } else {
        dropdown.style.top = '100%'; dropdown.style.bottom = 'auto';
      }
    });
  }

  function close() {
    dropdown.classList.remove('open');
    dropdown.style.top = ''; dropdown.style.bottom = '';
    isOpen = false; highlighted = -1;
  }

  function highlightAt(idx) {
    const opts = dropdown.querySelectorAll('.combo-option');
    opts.forEach(o => o.classList.remove('highlighted'));
    if (idx >= 0 && idx < opts.length) {
      opts[idx].classList.add('highlighted');
      opts[idx].scrollIntoView({ block: 'nearest' });
    }
    highlighted = idx;
  }

  input.addEventListener('focus', () => buildDropdown(input.value));
  input.addEventListener('input', () => { buildDropdown(input.value); if (onChange) onChange(input.value); });
  input.addEventListener('blur', () => close());
  arrow.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (isOpen) close(); else { input.focus(); buildDropdown(''); }
  });

  input.addEventListener('keydown', (e) => {
    const opts = dropdown.querySelectorAll('.combo-option');
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen) { buildDropdown(input.value); return; } highlightAt(Math.min(highlighted + 1, opts.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); highlightAt(Math.max(highlighted - 1, 0)); }
    else if (e.key === 'Enter' && highlighted >= 0 && opts[highlighted]) { e.preventDefault(); opts[highlighted].dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); }
    else if (e.key === 'Escape') close();
  });

  wrapper.setValue = (v) => { input.value = v || ''; };
  wrapper.setOptions = (newOpts) => { currentOptions = newOpts; };
  wrapper.getValue = () => input.value;
  return wrapper;
}
