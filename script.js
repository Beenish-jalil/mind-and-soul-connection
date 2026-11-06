const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(expanded));
  menu.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', expanded);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.click(); menu.focus();
  }
});

const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function activateTab(tab) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  }
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); activateTab(tabs[next]); tabs[next].focus(); }
  });
});

document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Website inquiry: ${data.get('reason')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nReason: ${data.get('reason')}\n\n${data.get('message')}`;
  window.location.href = `mailto:mindandsoulcommunityconnection@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Please send the draft from your email app. If no draft opens, use the Email link on this page.';
});

// Events are managed in a Google Sheet ("Mind and Soul – Website Events").
// Columns: Title | Date | Time | Location | Note. Future dates show under
// Upcoming Events, past dates under Recent Events. If the sheet can't be
// loaded, the page keeps the events written in the HTML.
const EVENTS_SHEET_ID = '1WRlj1d_b8PLBX-mJ6-vYEjBKtfZutCYFgVf7KDtyyms';
const RECENT_EVENTS_LIMIT = 3;

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function parseEventDate(value) {
  const text = value.trim();
  let m = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], m[2] - 1, +m[3]);
  m = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(+m[3], m[1] - 1, +m[2]);
  const d = new Date(text);
  return isNaN(d) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function renderEvent(event, className = '') {
  const article = document.createElement('article');
  if (className) article.className = className;
  const title = document.createElement('h3');
  title.textContent = event.title;
  const p = document.createElement('p');
  const add = (label, value, node) => {
    if (!value) return;
    if (p.childNodes.length) p.append(document.createElement('br'));
    if (label) { const strong = document.createElement('strong'); strong.textContent = `${label}:`; p.append(strong, ' '); }
    p.append(node || value);
  };
  const time = document.createElement('time');
  const d = event.date;
  time.dateTime = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  time.textContent = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  add('', event.note);
  add('Date', true, time);
  add('Time', event.time);
  add('Location', event.location);
  article.append(title, p);
  return article;
}

async function loadEvents() {
  const upcomingList = document.querySelector('[data-events="upcoming"]');
  const recentList = document.querySelector('[data-events="recent"]');
  if (!upcomingList || !recentList) return;
  try {
    const url = `https://docs.google.com/spreadsheets/d/${EVENTS_SHEET_ID}/gviz/tq?tqx=out:csv&headers=1`;
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Events sheet returned ${response.status}`);
    const [header, ...rows] = parseCsv(await response.text());
    const col = name => header.findIndex(h => h.trim().toLowerCase() === name);
    const idx = { title: col('title'), date: col('date'), time: col('time'), location: col('location'), note: col('note') };
    if (idx.title < 0 || idx.date < 0) throw new Error('Events sheet is missing the Title or Date column');
    const cell = (row, key) => (idx[key] >= 0 ? (row[idx[key]] || '').trim() : '');
    const events = rows
      .map(row => ({ title: cell(row, 'title'), date: parseEventDate(cell(row, 'date')), time: cell(row, 'time'), location: cell(row, 'location'), note: cell(row, 'note') }))
      .filter(event => event.title && event.date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date - b.date);
    const recent = events.filter(e => e.date < today).sort((a, b) => b.date - a.date).slice(0, RECENT_EVENTS_LIMIT);
    upcomingList.replaceChildren(...upcoming.map(e => renderEvent(e)));
    document.getElementById('upcoming-events').hidden = upcoming.length === 0;
    recentList.replaceChildren(...recent.map(e => renderEvent(e, 'card')));
    document.getElementById('recent-events').hidden = recent.length === 0;
  } catch (error) {
    console.warn('Could not load events from Google Sheets; showing built-in events.', error);
  }
}
loadEvents();
