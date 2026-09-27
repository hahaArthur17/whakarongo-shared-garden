'use strict';
/* Shared Garden · Hauora Whānau — V3 prototype
   Flow: Home → How to move → Song → Move (with word cards) → Celebrate → Our Garden
   Design rules: no ranking or individual scores, seated equals standing, camera optional and detection-only. */

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

// ---------- Content ----------
const SONGS = [
  {id: 'tutira', title: 'Tūtira Mai Ngā Iwi', note: 'Stand together', src: 'assets/audio/tutira-mai-nga-iwi.mp3', seconds: 76},
  {id: 'po-atarau', title: 'Pō Atarau', note: 'Now is the Hour', src: 'assets/audio/po-atarau.mp3', seconds: 120},
  {id: 'blue-smoke', title: 'Blue Smoke', note: 'Kohu Auwahi', src: 'assets/audio/blue-smoke.mp3', seconds: 146},
  {id: 'pokarekare', title: 'Pōkarekare Ana', note: 'A love song', src: 'assets/audio/pokarekare-ana.mp3', seconds: 160}
];

// Token bands from the report (Table 4): up to 2:30 → 1, 2:30–3:15 → 2, over 3:15 → 3.
const tokensForSong = seconds => seconds <= 150 ? 1 : seconds <= 195 ? 2 : 3;

const IMG = name => `assets/instructor/${name}.jpg`;
const MOVES = [
  {
    id: 'tui', name: 'Tūī Wing Reach', word: 'Tūī', meaning: 'a native songbird with a white throat tuft',
    instruction: {seated: 'Open your arms out wide like wings, then bring them back in.', standing: 'Open your arms out wide like wings, then bring them back in.', arms: 'Open your arms and hands out to the sides, then bring them back in.'},
    seated: ['seated-rest', 'seated-wide'], standing: ['standing-heart', 'standing-share'],
    reward: 'kowhai', rewardText: 'Kōwhai blossom opened'
  },
  {
    id: 'kowhai', name: 'Kōwhai Sky Reach', word: 'Kōwhai', meaning: 'a native tree with bright yellow flowers',
    instruction: {seated: 'Reach both arms forward, then draw them gently back to you.', standing: 'Reach both arms forward, then draw them gently back to you.', arms: 'Reach both hands forward, then draw them gently back to you.'},
    seated: ['seated-rest', 'seated-reach'], standing: ['standing-heart', 'standing-receive'],
    reward: 'tui', rewardText: 'A tūī came to visit'
  },
  {
    id: 'piwakawaka', name: 'Pīwakawaka Tap & Turn', word: 'Pīwakawaka', meaning: 'the fantail, a small friendly bird',
    instruction: {seated: 'Hand on your heart, then reach out to one side. Turn gently, then the other side.', standing: 'Hand on your heart, then reach out and turn gently to one side, then the other.', arms: 'Hand on your heart, then reach one hand out to the side. Then the other side.'},
    seated: ['seated-heart-reach', 'seated-rest'], standing: ['standing-step-left', 'standing-transition'],
    reward: 'piwakawaka', rewardText: 'A pīwakawaka came to visit'
  },
  {
    id: 'ponga', name: 'Ponga Rest & Breathe', word: 'Ponga', meaning: 'the silver fern',
    instruction: {seated: 'Rest your hands. Breathe in slowly… and breathe out.', standing: 'Hands on your heart. Breathe in slowly… and breathe out.', arms: 'Rest your hands. Breathe in slowly… and breathe out.'},
    seated: ['seated-rest', 'seated-rest'], standing: ['standing-heart', 'standing-heart'],
    reward: 'birdbath', rewardText: 'Fresh water in the birdbath'
  }
];
// Held open for Rauawaawa: shown, never playable (report §4.1–4.2).
const DRAFT_MOVES = [
  {name: 'Waiata Hands', note: 'Awaiting Rauawaawa review'},
  {name: 'Poi Pathways', note: 'Awaiting Rauawaawa review'}
];

// Garden: six beds, three growth stages each → 18 growth steps (a finite, shared goal).
const SPRITE_COLS = 4, SPRITE_ROWS = 3;
const BEDS = [
  {id: 'kowhai', label: 'Kōwhai', cell: [1, 1], x: 30, y: 57, season: 'winter'},
  {id: 'pohutukawa', label: 'Pōhutukawa', cell: [2, 1], x: 50, y: 55, season: 'summer'},
  {id: 'kumara', label: 'Kūmara', cell: [0, 0], x: 70, y: 57},
  {id: 'flowers', label: 'Wildflowers', cell: [1, 2], x: 24, y: 80},
  {id: 'herbs', label: 'Herbs', cell: [0, 1], x: 50, y: 82},
  {id: 'sunflower', label: 'Sunflower', cell: [3, 0], x: 76, y: 80}
];
const STAGES = 3, MAX_GROWTH = BEDS.length * STAGES;

// ---------- Storage (shared garden is simulated locally in this prototype) ----------
const STORE_KEY = 'sharedGardenV3';
const today = () => new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD, so "first today" follows the NZ day
function loadGarden() {
  const seed = {growth: 7, rewards: {kowhai: 1, tui: 2, piwakawaka: 0, birdbath: 0}, songsShared: 23, lastDay: null};
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    return saved ? {...seed, ...saved, rewards: {...seed.rewards, ...saved.rewards}} : seed;
  } catch { return seed; }
}
function saveGarden() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(garden)); } catch { /* storage unavailable: keep in memory */ }
}
let garden = loadGarden();

// ---------- Navigation ----------
const state = {screen: 'home', way: 'seated', history: []};
const backButton = $('#backButton'), helpButton = $('#helpButton');

function showScreen(name, push = true) {
  if (name === state.screen) return;
  if (state.screen === 'session' && name !== 'session' && name !== 'help') endCamera();
  if (push) state.history.push(state.screen);
  state.screen = name;
  $$('.screen').forEach(screen => screen.classList.toggle('active', screen.dataset.screen === name));
  backButton.hidden = ['home', 'session', 'celebrate'].includes(name);
  helpButton.hidden = name === 'help';
  if (name === 'song') renderSongs();
  if (name === 'garden') renderGarden();
  if (name === 'help') renderHelp();
  window.scrollTo(0, 0);
}
function goBack() {
  let previous = state.history.pop();
  while (previous === 'celebrate' || (previous === 'session' && !session.active)) previous = state.history.pop();
  showScreen(previous || 'home', false);
  // Back from Help during a song: the pause card is waiting to continue.
  if (previous === 'session') $('#pauseLayer').hidden = false;
}
document.addEventListener('click', event => {
  const go = event.target.closest('[data-go]');
  if (!go) return;
  event.preventDefault();
  if (go.dataset.go === 'home') {
    state.history = [];
    if (session.active) abandonSession();
  }
  showScreen(go.dataset.go);
});
backButton.addEventListener('click', goBack);
helpButton.addEventListener('click', () => {
  if (session.active && !session.paused) pauseSession();
  showScreen('help');
});

const toastEl = $('#toast');
function toast(message) {
  toastEl.textContent = message; toastEl.hidden = false;
  clearTimeout(toast.timer); toast.timer = setTimeout(() => { toastEl.hidden = true; }, 3200);
}
const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;

// ---------- Step 1: how to move ----------
$$('[data-way]').forEach(button => button.addEventListener('click', () => {
  state.way = button.dataset.way;
  showScreen('song');
}));

// ---------- Step 2: choose a song ----------
const firstToday = () => garden.lastDay !== today();
function renderSongs() {
  $('#songGrid').innerHTML = SONGS.map(song => {
    const tokens = tokensForSong(song.seconds);
    return `<button class="song-card" data-song="${song.id}">
      <span class="song-play" aria-hidden="true">▶</span>
      <span class="song-text"><b>${song.title}</b><small>${song.note} · ${clock(song.seconds)}</small></span>
      <span class="song-tokens" aria-label="${tokens} garden token${tokens > 1 ? 's' : ''}">${'🌱'.repeat(tokens)}<small>${tokens} token${tokens > 1 ? 's' : ''}</small></span>
    </button>`;
  }).join('');
  $('#bonusLine').textContent = firstToday() ? '🌱 Your first song today adds 1 extra token, whichever song you choose.' : '';
}
$('#songGrid').addEventListener('click', event => {
  const card = event.target.closest('[data-song]');
  if (card) startSession(SONGS.find(song => song.id === card.dataset.song));
});

// ---------- Step 3: move ----------
const INTRO = 5, WORD_CARD_SECONDS = 4, POSE_SECONDS = 2.4;
const session = {active: false, paused: false, song: null, audio: null, duration: 0, round: -1, clock: 0, poseTimer: 0, poseFlip: false, completed: []};
const demoImgs = {seated: [$('#seatedA'), $('#seatedB')], standing: [$('#standingA'), $('#standingB')]};

function roundBounds(index) {
  const length = (session.duration - INTRO) / MOVES.length;
  return {start: INTRO + index * length, end: INTRO + (index + 1) * length};
}
function roundAt(time) {
  if (time < INTRO) return -1;
  return Math.min(MOVES.length - 1, Math.floor((time - INTRO) / ((session.duration - INTRO) / MOVES.length)));
}

function startSession(song) {
  stopAudio();
  const audio = new Audio(song.src);
  audio.preload = 'auto';
  Object.assign(session, {active: true, paused: false, song, audio, duration: song.seconds, round: -2, completed: []});
  $('#sessionSong').textContent = `${song.title} · ${clock(song.seconds)}`;
  $('#roundDots').innerHTML = MOVES.map(move => `<li><span aria-hidden="true"></span>${move.word}</li>`).join('');
  $('#progressFill').style.width = '0%';
  $('#pauseLayer').hidden = true;
  $('.session-screen').dataset.way = state.way;
  audio.addEventListener('loadedmetadata', () => { if (Number.isFinite(audio.duration)) session.duration = audio.duration; });
  audio.addEventListener('ended', () => finishSession(false));
  showScreen('session');
  setRound(-1);
  audio.play().catch(() => { pauseSession(); toast('Tap Continue to start the song.'); });
  startPoseLoop();
  // A timer (not requestAnimationFrame) keeps rounds moving even when the tab is in the background.
  clearInterval(session.clock);
  session.clock = setInterval(tick, 200);
}

function tick() {
  if (!session.active) return;
  const time = session.audio.currentTime;
  $('#progressFill').style.width = `${Math.min(100, time / session.duration * 100)}%`;
  const round = roundAt(time);
  if (round !== session.round) setRound(round);
  if (round >= 0) $('#wordCard').hidden = time - roundBounds(round).start > WORD_CARD_SECONDS;
}

function setRound(round) {
  if (round > session.round && session.round >= 0) markComplete(session.round);
  session.round = round;
  const move = MOVES[round];
  $('#roundLabel').textContent = move ? `Movement ${round + 1} of ${MOVES.length}` : 'Get ready · Kia rite';
  $('#moveTitle').textContent = move ? move.name : 'Find a comfortable position';
  $('#moveInstruction').textContent = move ? move.instruction[state.way] : (state.way === 'standing' ? 'Stand beside a sturdy chair you can hold.' : 'Sit tall and relaxed, feet flat if you can.');
  $$('#roundDots li').forEach((dot, index) => {
    dot.classList.toggle('current', index === round);
    dot.classList.toggle('done', session.completed.includes(index));
  });
  if (move) {
    $('#wordMaori').textContent = move.word;
    $('#wordMeaning').textContent = move.meaning;
    $('#wordCard').hidden = false;
  } else $('#wordCard').hidden = true;
  showPoses(move);
}
function markComplete(round) {
  if (!session.completed.includes(round)) session.completed.push(round);
}

function showPoses(move) {
  const seated = move ? move.seated : ['seated-rest', 'seated-rest'];
  const standing = move ? move.standing : ['standing-heart', 'standing-heart'];
  demoImgs.seated.forEach((img, i) => { img.src = IMG(seated[i]); });
  demoImgs.standing.forEach((img, i) => { img.src = IMG(standing[i]); });
}
function startPoseLoop() {
  clearInterval(session.poseTimer);
  session.poseTimer = setInterval(() => {
    if (session.paused) return;
    session.poseFlip = !session.poseFlip;
    $('#demoStage').classList.toggle('flip', session.poseFlip);
  }, POSE_SECONDS * 1000);
}

function pauseSession() {
  if (!session.active) return;
  session.paused = true;
  session.audio.pause();
  $('#pauseLayer').hidden = false;
  $('#resumeButton').focus();
}
function resumeSession() {
  session.paused = false;
  $('#pauseLayer').hidden = true;
  if (state.screen !== 'session') showScreen('session', false);
  session.audio.play().catch(() => toast('The song could not start. Please try again.'));
}
function repeatRound() {
  if (!session.active) return;
  const round = Math.max(0, session.round);
  session.audio.currentTime = session.round < 0 ? 0 : roundBounds(round).start;
  session.round = -2;
  toast('Repeating this movement · Anō');
}
$('#pauseButton').addEventListener('click', pauseSession);
$('#resumeButton').addEventListener('click', resumeSession);
$('#repeatButton').addEventListener('click', repeatRound);
$('#stopButton').addEventListener('click', () => finishSession(true));
$('#pauseStopButton').addEventListener('click', () => finishSession(true));

function stopAudio() {
  if (session.audio) { session.audio.pause(); session.audio.removeAttribute('src'); session.audio.load(); }
  clearInterval(session.clock);
  clearInterval(session.poseTimer);
}
function abandonSession() {
  session.active = false;
  stopAudio();
  endCamera();
}

// ---------- Finish & rewards ----------
function bedStage(index, growth = garden.growth) {
  if (growth <= index) return 0;
  return Math.min(STAGES, Math.floor((growth - index - 1) / BEDS.length) + 1);
}
function finishSession(stoppedEarly) {
  if (!session.active) return;
  const time = session.audio.currentTime;
  const finishedSong = !stoppedEarly || time >= session.duration - 1;
  if (finishedSong) MOVES.forEach((_, index) => markComplete(index));
  // "Stop & save" keeps the movement in progress once it has really begun (past its word card).
  else if (session.round >= 0 && time - roundBounds(session.round).start > WORD_CARD_SECONDS) markComplete(session.round);
  session.active = false;
  stopAudio();
  endCamera();

  const moved = session.completed.length > 0;
  const bonus = moved && firstToday() ? 1 : 0;
  const songTokens = finishedSong ? tokensForSong(session.duration) : 0;
  const tokens = songTokens + bonus;
  const before = BEDS.map((_, index) => bedStage(index));
  garden.growth = Math.min(MAX_GROWTH, garden.growth + tokens);
  session.completed.forEach(index => { garden.rewards[MOVES[index].reward] = (garden.rewards[MOVES[index].reward] || 0) + 1; });
  if (moved) { garden.songsShared += 1; garden.lastDay = today(); }
  saveGarden();

  const grew = BEDS.filter((_, index) => bedStage(index) > before[index])
    .map(bed => `${bed.label} ${bedStage(BEDS.indexOf(bed)) === 1 ? 'was planted' : bedStage(BEDS.indexOf(bed)) === STAGES ? 'is in full flower' : 'grew taller'}`);
  renderCelebrate({tokens, songTokens, bonus, grew, stoppedEarly: !finishedSong});
  state.history = ['home'];
  showScreen('celebrate');
}

function renderCelebrate({tokens, songTokens, bonus, grew, stoppedEarly}) {
  const moved = session.completed.length > 0;
  $('#celebrateTitle').textContent = moved ? 'Ka pai! The garden grew.' : 'Thank you for joining in.';
  $('#celebrateLead').textContent = stoppedEarly
    ? (moved ? 'You stopped when it felt right. Everything you did is saved.' : 'Come back whenever you are ready. The garden will be here.')
    : `You moved all the way through ${session.song.title}.`;
  const chips = [];
  if (songTokens) chips.push(`<span class="token-chip">${'🌱'.repeat(songTokens)} Song · ${songTokens}</span>`);
  if (bonus) chips.push(`<span class="token-chip">🌱 First today · 1</span>`);
  $('#tokenRow').innerHTML = tokens ? `<b>+${tokens} token${tokens > 1 ? 's' : ''} for our garden</b>${chips.join('')}` : '';
  const items = [...new Set(session.completed.map(index => MOVES[index].rewardText))].concat(grew).slice(0, 4);
  $('#rewardList').innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

// ---------- Camera: detects that you are moving, never how well (on-device only) ----------
const camera = {stream: null, timer: 0, previous: null, level: 0};
const cameraVideo = $('#cameraVideo'), cameraToggle = $('#cameraToggle');
const probe = document.createElement('canvas'); probe.width = 48; probe.height = 36;
const probeContext = probe.getContext('2d', {willReadFrequently: true});

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) { toast('This device has no camera access. You can keep moving without it.'); return; }
  try {
    camera.stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'user', width: {ideal: 320}, height: {ideal: 240}}, audio: false});
  } catch {
    toast('The camera is off. You can keep moving without it.'); return;
  }
  cameraVideo.srcObject = camera.stream; cameraVideo.hidden = false; cameraVideo.play();
  $('#motionMeter').hidden = false;
  cameraToggle.setAttribute('aria-pressed', 'true'); $('#cameraLabel').textContent = 'Camera on';
  camera.previous = null; camera.level = 0;
  camera.timer = setInterval(senseMotion, 200);
  $('#cameraText').textContent = 'Stays on this device. Nothing is recorded or sent.';
}
function senseMotion() {
  if (cameraVideo.readyState < 2) return;
  probeContext.drawImage(cameraVideo, 0, 0, probe.width, probe.height);
  const pixels = probeContext.getImageData(0, 0, probe.width, probe.height).data;
  const gray = new Float32Array(pixels.length / 4);
  for (let i = 0; i < gray.length; i++) gray[i] = pixels[i * 4] * .3 + pixels[i * 4 + 1] * .59 + pixels[i * 4 + 2] * .11;
  if (camera.previous) {
    let change = 0;
    for (let i = 0; i < gray.length; i++) change += Math.abs(gray[i] - camera.previous[i]);
    camera.level = camera.level * .6 + (change / gray.length) * .4;
    const moving = camera.level > 3.5;
    $('#motionFill').style.width = `${Math.min(100, camera.level / 12 * 100)}%`;
    $('.camera-status').classList.toggle('moving', moving);
    $('#cameraText').textContent = moving ? 'Moving ✓ · Kei te neke' : 'Ready when you are.';
  }
  camera.previous = gray;
}
function endCamera() {
  clearInterval(camera.timer);
  camera.stream?.getTracks().forEach(track => track.stop());
  camera.stream = null;
  cameraVideo.srcObject = null; cameraVideo.hidden = true;
  $('#motionMeter').hidden = true;
  $('.camera-status').classList.remove('moving');
  cameraToggle.setAttribute('aria-pressed', 'false'); $('#cameraLabel').textContent = 'Camera off';
  $('#cameraText').textContent = 'No camera needed. Turn it on to see your movement counted.';
}
cameraToggle.addEventListener('click', () => camera.stream ? endCamera() : startCamera());

// ---------- Our garden ----------
const currentSeason = () => { const month = new Date().getMonth(); return month >= 3 && month <= 8 ? 'winter' : 'summer'; };
let viewSeason = currentSeason();

function spriteStyle([col, row]) {
  return `background-position:${col / (SPRITE_COLS - 1) * 100}% ${row / (SPRITE_ROWS - 1) * 100}%`;
}
const TUI_SVG = `<svg viewBox="0 0 60 44" aria-hidden="true"><path d="M8 30c6-14 22-20 34-14l12-6-5 9c3 4 2 10-3 14-9 7-27 6-38-3z" fill="#1f2d3a"/><path d="M42 16c4-2 8-1 10 1" stroke="#3d5a73" stroke-width="3" fill="none"/><circle cx="44" cy="20" r="1.8" fill="#fff"/><circle cx="36" cy="27" r="3.2" fill="#f4f1e8"/><circle cx="39.5" cy="28" r="2.6" fill="#f4f1e8"/><path d="M6 30 0 38l10-4z" fill="#1f2d3a"/><path d="M18 40v4M26 41v3" stroke="#6b4b2a" stroke-width="2"/></svg>`;
const FANTAIL_SVG = `<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M22 26 2 10l4 22 4-4 2 8 5-6z" fill="#6f5b48"/><path d="M4 12l16 14M6 30l14-4" stroke="#f4f1e8" stroke-width="1.6"/><ellipse cx="34" cy="24" rx="13" ry="9" fill="#6f5b48"/><ellipse cx="36" cy="28" rx="9" ry="5" fill="#e3b77e"/><circle cx="46" cy="16" r="7" fill="#4f4035"/><path d="M42 12h7" stroke="#f4f1e8" stroke-width="1.6"/><circle cx="48" cy="16" r="1.5" fill="#fff"/><path d="M53 17l4 1-4 1z" fill="#333"/><path d="M32 33v6M37 33v6" stroke="#4f4035" stroke-width="2"/></svg>`;

function renderGarden() {
  const scene = $('#gardenScene');
  scene.dataset.season = viewSeason;
  $$('[data-season]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.season === viewSeason)));
  $('#gardenSeasonText').textContent = viewSeason === 'summer'
    ? 'Summer · Raumati — pōhutukawa in flower. Grown together by everyone who moves.'
    : 'Winter · Hōtoke — kōwhai in flower. Grown together by everyone who moves.';

  $('#gardenBeds').innerHTML = BEDS.map((bed, index) => {
    const stage = bedStage(index);
    const inSeason = bed.season ? (bed.season === viewSeason ? ' in-season' : ' out-season') : '';
    const blossom = bed.id === 'kowhai' && garden.rewards.kowhai > 0 && stage > 0 ? '<span class="blossom" aria-hidden="true"></span>' : '';
    return `<div class="bed stage-${stage}${inSeason}" style="left:${bed.x}%;top:${bed.y}%">
      <span class="soil"></span>
      ${stage ? `<span class="plant" style="${spriteStyle(bed.cell)}"></span>` : ''}${blossom}
      <span class="bed-label">${bed.label}${stage ? '' : ' · ready'}</span>
    </div>`;
  }).join('');

  const visitors = [];
  if (garden.rewards.tui > 0) visitors.push(`<span class="visitor tui" title="Tūī">${TUI_SVG}</span>`);
  if (garden.rewards.piwakawaka > 0) visitors.push(`<span class="visitor fantail" title="Pīwakawaka">${FANTAIL_SVG}</span>`);
  if (garden.rewards.birdbath > 0) visitors.push(`<span class="birdbath" style="${spriteStyle([2, 2])}"></span>`);
  $('#gardenVisitors').innerHTML = visitors.join('');

  const growing = BEDS.filter((_, index) => bedStage(index) > 0).length;
  const birds = (garden.rewards.tui || 0) + (garden.rewards.piwakawaka || 0);
  const full = garden.growth >= MAX_GROWTH;
  $('#gardenStats').innerHTML = `
    <div class="stat stat-wide"><b>${full ? 'Full bloom!' : `${garden.growth} of ${MAX_GROWTH}`}</b><span>${full ? 'Thank you, everyone' : 'growth steps together'}</span><div class="stat-bar"><i style="width:${garden.growth / MAX_GROWTH * 100}%"></i></div></div>
    <div class="stat"><b>${growing} of ${BEDS.length}</b><span>beds growing</span></div>
    <div class="stat"><b>${birds}</b><span>bird visits</span></div>
    <div class="stat"><b>${garden.songsShared}</b><span>songs shared</span></div>`;
}
$$('[data-season]').forEach(button => button.addEventListener('click', () => { viewSeason = button.dataset.season; renderGarden(); }));

// ---------- Help ----------
function renderHelp() {
  $('#moveCards').innerHTML = MOVES.map(move => `
    <div class="move-card-mini"><img src="${IMG(move.seated[1])}" alt=""><b>${move.name}</b><small>Grows: ${move.rewardText.toLowerCase()}</small></div>`).join('') +
    DRAFT_MOVES.map(move => `<div class="move-card-mini draft" aria-disabled="true"><span class="draft-tag">Draft</span><b>${move.name}</b><small>${move.note}</small></div>`).join('');
}
