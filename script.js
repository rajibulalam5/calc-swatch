// ---- CALCULATOR ----
let expr = '';
let lastResult = null;
let fresh = true;

const exprEl = document.getElementById('calcExpr');
const valEl  = document.getElementById('calcVal');

function safeEval(e) {
  return Function('"use strict"; return (' + e + ')')();
}

function ca(v) {
  if (fresh) {
    if (['+','-','*','/'].includes(v)) {
      expr = (lastResult !== null ? String(lastResult) : '0') + v;
    } else {
      expr = v;
    }
    fresh = false;
  } else {
    expr += v;
  }
  valEl.textContent = expr;
  exprEl.textContent = '';
}

function cc() {
  expr = '';
  fresh = true;
  lastResult = null;
  valEl.textContent = '0';
  exprEl.textContent = '';
}

function ce() {
  if (!expr) return;
  try {
    let r = safeEval(expr);
    exprEl.textContent = expr + ' =';
    lastResult = parseFloat(r.toFixed(10));
    expr = String(lastResult);
    valEl.textContent = lastResult;
    fresh = true;
  } catch {
    valEl.textContent = 'Error';
    expr = '';
    fresh = true;
  }
}

function csq() {
  try {
    let base = expr ? safeEval(expr) : 0;
    let r = Math.sqrt(base);
    expr = String(r);
    valEl.textContent = expr;
    fresh = true;
  } catch {}
}

function ctoggleSign() {
  try {
    let v = safeEval(expr || '0');
    expr = String(-v);
    valEl.textContent = expr;
  } catch {}
}

function cpct() {
  try {
    let v = safeEval(expr || '0');
    expr = String(v / 100);
    valEl.textContent = expr;
  } catch {}
}

// ---- STOPWATCH ----
let ms = 0, sec = 0, min = 0, hr = 0, iv = null;
let laps = [];
let lapBase = 0;

const td = document.getElementById('timerDisplay');
const lapList = document.getElementById('lapList');

function pad(n) { return String(n).padStart(2,'0'); }

function tick() {
  ms += 10;
  if (ms >= 1000) { ms = 0; sec++; }
  if (sec >= 60) { sec = 0; min++; }
  if (min >= 60) { min = 0; hr++; }

  td.textContent = `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(ms/10)}`;
}

function ts() {
  if (!iv) iv = setInterval(tick, 10);
}

function tp() {
  clearInterval(iv);
  iv = null;
}

function tr() {
  tp();
  ms = sec = min = hr = 0;
  laps = [];
  lapBase = 0;
  td.textContent = '00:00:00:00';
  lapList.innerHTML = '';
}

function tl() {
  let now = hr*3600000 + min*60000 + sec*1000 + ms;
  let delta = now - lapBase;
  lapBase = now;

  laps.push(delta);

  let div = document.createElement('div');
  div.textContent = `+ ${delta} ms`;
  lapList.prepend(div);
}
