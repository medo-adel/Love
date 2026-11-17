/* ==========================================================================
   حكايتنا | صانع موقع الحب والصداقة - JAVASCRIPT
   Modes (Love & Friendship), Canvas Particles, Uploads, Love/Friends Counter,
   3D Envelope, URL Link Generator & Standalone HTML Exporter
   ========================================================================== */

// --- Global State ---
const state = {
  mode: 'love', // 'love' | 'friends'
  person1Name: 'محمد',
  person2Name: 'نور',
  anniversaryDate: '',
  loveNickname: 'نصفي الثاني وروح قلبي',
  loveLetter: '',
  theme: 'theme-rose',
  musicType: 'piano',
  customAudioUrl: null,
  boyPhotos: ['images/boy.jpg'],      // Default to repo images
  girlPhotos: ['images/girl.jpg', 'images/girl2.jpg', 'images/girl3.jpg', 'images/girl4.jpg'], // Default to repo images
  togetherPhotos: [], 
  counterInterval: null,
  isAudioPlaying: false
};

// --- Presets for Love & Friendship Letters ---
const letterPresets = {
  love_1: `حبيبتي ونور عيني،
منذ أن دخلتِ حياتي، وأنا أشعر بأن الله قد عوضني عن كل شيء مر بي في هذه الدنيا. أنتِ لستِ مجرد فتاة أحبها، أنتِ الوطن والملجأ والسكينة التي لطالما بحثت عنها. كل ثانية أقضيها معكِ تساوي عمراً كاملاً من السعادة.
أعشق تفاصيلكِ الصغيرة، ضحكتكِ التي ترد روحي، وطيبة قلبكِ التي تجعل العالم مكاناً أجمل. أعدكِ أن أظل أحبكِ وأحافظ على قلبكِ النقي طالما حييت.`,

  love_2: `إلى أميرتي وشريكة روحي،
أكتب لكِ هذه الكلمات لأعاهدكِ عهداً أبدياً: سأكون دائماً السند الذي لا يميل، والأمان الذي تستندين عليه متى مالت الأيام. سأبني معكِ بيتاً يملؤه الدفء، وسأكون لكِ الحبيب والصديق والأب والأخ.
لن أسمح لحزن أن يمس عينيكِ الجميلتين، وسأفعل كل ما بوسعي لأرى ابتسامتكِ تضيء وجهكِ كل صباح. بحبكِ حتى آخر نفس.`,

  love_3: `إلى أرق وأجمل فتاة في الكون،
شكراً لوجودكِ في حياتي، شكراً لأنكِ اخترتِ أن تكوني جزءاً من تفاصيلي. لم أعرف معنى الحب الحقيقي إلا عندما رأيت انعكاس صورتي في عينيكِ.
أنتِ هديتي من السماء، وأجمل ما حظيت به في عمري كله. كل يوم يمر بجانبكِ هو مكسب جديد وسعادة لا توصف. دمتِ لي نبضاً لا يتوقف، وحباً لا ينتهي أبداً.`,

  friends_1: `يا أجدع وأغلى صاحب وأخ في الدنيا،
الصحاب كتير، بس اللي زيك عملة نادرة في الزمن ده. عِشرة سنين ومواقف ياما مرت علينا، وفي كل مرة كنت بلاقيك في ضهري راجل وجدع وسند حقيقي.
شكراً على كل وقفة وقفتها جنبي، وعلى كل مرة كنت مهموم وضحكتني من قلبي. أنت مش مجرد صاحب، أنت أخ السنين اللي ميتعوضش بكنوز الدنيا. ربنا يديم عِشرتنا وأخوتنا لآخر العمر!`,

  friends_2: `شريك المصايب وأحلى أيام العمر،
فاكر كل خروجة ومغامرة وكل ضحكة ضحكناها لحد ما دمعنا؟ الأيام والشهور بتعدي بسرعة، بس الذكريات اللي عملناها سوا دي هي اللي هتفضل محفورة في القلب طول العمر.
معاك بحس إني على طبيعتي من غير أي تظاهر، وعارف إن سري في بير وضهري محمي. يا رب نفضل سوا لحد ما نكبر ونعجز ونقعد نحكي لعيالنا عن أيام الشقاوة والجدعنة!`,

  friends_3: `إلى أخي الذي لم تلده أمي،
بيقولوا الصاحب ساحب، وأنت سحبتني دايماً للخير وللجدعنة. وجودك في حياتي نعمة كبيرة وفخر أتشرف بيه قدام أي حد.
في وقت الضيقة كنت أول واحد بيسأل، وفي وقت الفرح كنت أول واحد بيفرحلي من قلبه. ربنا يديم المحبة والجدعنة والأخوة الصافية ما بيننا، وأوعدك إني هفضل في ضهرك وسندك في أي وقت وأي مكان.`
};

// --- Reasons Lists ---
const reasonsData = {
  love: [
    "لأن ضحكتكِ قادرة على أن تمحو أي تعب في روحي، وتبدل حزني لفرح في ثانية واحدة.",
    "لأنكِ لستِ فقط حبيبتي، بل أنتِ أماني وراحتي وسندي الذي ألوذ به من قسوة العالم.",
    "لأن لمعة عينيكِ حين ترينني تختصر كل معاني الحياة والجمال في هذا الكون.",
    "لأن تفاصيلكِ الصغيرة، وصوتكِ الهادئ، وطريقة نطقكِ لاسمي، تجعل قلبي يدق كأول لقاء.",
    "لأنكِ أجمل صدفة غيرت مسار عمري كله وجعلت للحياة طعماً وسكينة.",
    "لأن وجودكِ في يومي يجعل المستحيل ممكناً، ويعطيني القوة لمواجهة أي ظرف.",
    "لأن قلبكِ الأبيض النقي لا يشبه أحداً، وأنتِ أرق مخلوق رأته عيناي.",
    "لأنني معكِ أكون نفسي تماماً بكل عفوية وحب، دون أي خوف أو تردد.",
    "لأن حبكِ هو الحقيقة الوحيدة الثابتة في قلبي والتي ستظل تنبض للأبد."
  ],
  friends: [
    "لأنك الصاحب اللي لو الدنيا كلها مالت، بيفضل واقف في ضهري راجل وسند ميميلش.",
    "لأن مكالمة واحدة معاك بتمسح كل ضغط اليوم، وبنفضل نضحك من قلبنا على أبسط تفصيلة.",
    "لأنك بتفهمني من نظرة عين من غير ما أتكلم نص كلمة، وعارف كل أسراري.",
    "لأن ما بيننا عِشرة ومواقف حقيقية أثبتت إنك أخ مش مجرد صاحب عادي.",
    "لأنك بتفرح لنجاحي كأنه نجاحك بالظبط، وقلبك أبيض ميعرفش غير الخير.",
    "لأن كل مصيبة وكل هبل عملناه سوا اتحول لأحلى ذكريات بنضحك عليها كل ما نتقابل.",
    "لأنك الصاحب اللي لو غبت عنه شهور ورجعت، بنبدأ كلامنا كأننا كنا مع بعض إمبارح.",
    "لأن الجدعنة مش كلام بنقوله، الجدعنة دي صفة متفصلة عليك أنت يا صاحبي."
  ]
};

let currentReasonIndex = 0;

// Default Placeholders (pointing to repo real images)
const defaultBoyPlaceholder = 'images/boy.jpg';
const defaultGirlPlaceholder = 'images/girl.jpg';


// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  setupUploadZones();
  setupEventListeners();

  // Render initial photo previews
  renderPreviews(state.boyPhotos, document.getElementById('boyPreviews'));
  renderPreviews(state.girlPhotos, document.getElementById('girlPreviews'));

  // Check URL parameters for direct share link
  const loadedFromUrl = checkUrlParams();

  if (!loadedFromUrl) {
    setMode('love'); // Default mode
    const defaultDate = new Date();
    defaultDate.setMonth(defaultDate.getMonth() - 6);
    document.getElementById('anniversaryDate').value = defaultDate.toISOString().split('T')[0];
  }
});


// ==========================================================================
// MODE SWITCHER (LOVE vs FRIENDS)
// ==========================================================================
window.setMode = function(newMode) {
  state.mode = newMode;

  const tabLove = document.getElementById('tabLove');
  const tabFriends = document.getElementById('tabFriends');
  const presetsLove = document.getElementById('presetsLoveContainer');
  const presetsFriends = document.getElementById('presetsFriendsContainer');

  if (newMode === 'love') {
    tabLove.classList.add('active');
    tabFriends.classList.remove('active');
    presetsLove.style.display = 'flex';
    presetsFriends.style.display = 'none';

    // UI Titles & Labels
    document.getElementById('logoIcon').className = 'fa-solid fa-heart-pulse heartbeat-icon';
    document.getElementById('logoText').textContent = 'LoveStory Maker • قصة حبنا';
    document.getElementById('pageMainTitle').innerHTML = 'اصنع موقعاً رومانسياً لحبيبتك 💖';
    document.getElementById('pageMainSubtitle').innerHTML = 'اكتب اسمك واسمها، ارفع صوركم الجميلة، وبضغطة زر واحدة على <span class="highlight-tag">Extract</span> هيتحول كل ده لموقع رومانسي أسطوري يخلد حبكم ويعبر عن كل مشاعرك!';
    document.getElementById('demoBtnText').textContent = 'تجربة فورية بنموذج رومانسي تجريبي ✨';

    document.getElementById('step1Title').textContent = 'بيانات العاشقين 💑';
    document.getElementById('labelPerson1').innerHTML = '<i class="fa-solid fa-mars"></i> اسم الشاب (أنت يا بطل)';
    document.getElementById('person1Name').placeholder = 'مثال: محمد، أحمد، فادي...';
    document.getElementById('labelPerson2').innerHTML = '<i class="fa-solid fa-venus"></i> اسم البنت (حبيبتك وأميرتك)';
    document.getElementById('person2Name').placeholder = 'مثال: سارة، نور، مريم...';
    document.getElementById('person2Name').value = state.person2Name === 'أحمد (صاحبي الجدع)' ? 'نور' : (state.person2Name || 'نور');
    document.getElementById('labelDate').innerHTML = '<i class="fa-solid fa-calendar-heart"></i> تاريخ بداية حكايتكم أو أول لقاء';
    document.getElementById('helperDate').textContent = 'هيتم حساب عداد حب مباشر بالثواني والدقائق والأيام!';
    document.getElementById('labelNickname').innerHTML = '<i class="fa-solid fa-quote-right"></i> لقبها المفضل أو جملة خاصة بيكم';
    document.getElementById('loveNickname').placeholder = 'مثال: قمري، وتيني، أجمل صدفة في عمري';
    document.getElementById('loveNickname').value = 'نصفي الثاني وروح قلبي';

    document.getElementById('badgePerson1').innerHTML = '<i class="fa-solid fa-user"></i> صور الشاب';
    document.getElementById('badgePerson2').innerHTML = '<i class="fa-solid fa-heart"></i> صور البنت';
    document.getElementById('badgePerson2Hint').textContent = 'اختار أجمل لقطات بتعشق ضحكتها فيها ✨';

    document.getElementById('step3Title').textContent = 'جواب الحب السري والكلام الرومانسي 💌';
    document.getElementById('labelLetterText').innerHTML = '<i class="fa-solid fa-envelope-open-text"></i> رسالتك إليها (هتظهر جوه جواب تفاعلي سحري يتفتح بالضغط عليه):';

    document.getElementById('themeSelect').value = 'theme-rose';
    document.body.className = 'theme-rose';

    applyLetterPreset('love_1');
  } else {
    // FRIENDS MODE
    tabLove.classList.remove('active');
    tabFriends.classList.add('active');
    presetsLove.style.display = 'none';
    presetsFriends.style.display = 'flex';

    // UI Titles & Labels
    document.getElementById('logoIcon').className = 'fa-solid fa-user-group';
    document.getElementById('logoText').textContent = 'BFF Maker • أجدع صحاب';
    document.getElementById('pageMainTitle').innerHTML = 'اصنع موقعاً فخماً لصاحبك وأخوك 👊';
    document.getElementById('pageMainSubtitle').innerHTML = 'اكتب اسمك واسم صاحبك الجدع، ارفع صور ذكرياتكم وهبلكم سوا، وبضغطة واحدة على <span class="highlight-tag">Extract</span> هيتحول لموقع فخم يشهد على عِشرة العمر والأخوة!';
    document.getElementById('demoBtnText').textContent = 'تجربة فورية بنموذج صحاب وجدعنة 👊';

    document.getElementById('step1Title').textContent = 'بيانات الصحاب الجدعان 👊';
    document.getElementById('labelPerson1').innerHTML = '<i class="fa-solid fa-user"></i> اسمك أنت يا بطل';
    document.getElementById('person1Name').placeholder = 'اسمك (مثال: محمد)';
    document.getElementById('labelPerson2').innerHTML = '<i class="fa-solid fa-user-check"></i> اسم صاحبك / صاحبتك (البيست فريند)';
    document.getElementById('person2Name').placeholder = 'اسم صاحبك (مثال: أحمد، عمر، ياسمين...)';
    document.getElementById('person2Name').value = state.person2Name === 'أميرتي' ? 'أحمد (صاحبي الجدع)' : (state.person2Name || 'أحمد (صاحبي الجدع)');
    document.getElementById('labelDate').innerHTML = '<i class="fa-solid fa-calendar-check"></i> تاريخ بداية معرفتكم وصداقتكم';
    document.getElementById('helperDate').textContent = 'هيتم حساب عداد عِشرة وصداقة مباشر بالأيام والسنين!';
    document.getElementById('labelNickname').innerHTML = '<i class="fa-solid fa-handshake"></i> لقب صاحبك أو إفيه مشهور بينكم';
    document.getElementById('loveNickname').placeholder = 'مثال: أخويا وسندي، شريك المصايب، أجدع راجل';
    document.getElementById('loveNickname').value = 'أخويا وسندي وشريك المغامرات';

    document.getElementById('badgePerson1').innerHTML = '<i class="fa-solid fa-user"></i> صورك أنت';
    document.getElementById('badgePerson2').innerHTML = '<i class="fa-solid fa-user-group"></i> صور صاحبك / صاحبتك';
    document.getElementById('badgePerson2Hint').textContent = 'اختار صور الضحك والروقان والذكريات الحلوة 📸';

    document.getElementById('step3Title').textContent = 'رسالة عِشرة وجدعنة من القلب لصاحبك 📜';
    document.getElementById('labelLetterText').innerHTML = '<i class="fa-solid fa-envelope-open-text"></i> رسالتك لصاحبك (هتظهر جوه مظروف تفاعلي بكلماتك من القلب):';

    document.getElementById('themeSelect').value = 'theme-friends-cyan';
    document.body.className = 'theme-friends-cyan';

    applyLetterPreset('friends_1');
  }
};


// ==========================================================================
// BACKGROUND PARTICLES CANVAS
// ==========================================================================
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleTypes = ['heart', 'petal', 'sparkle'];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 14 + 8;
      this.speedY = Math.random() * 1.5 + 0.6;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.04;
      this.opacity = Math.random() * 0.5 + 0.3;
      // Adjust hue based on mode
      this.hue = state.mode === 'love' ? (Math.random() * 40 + 330) : (Math.random() * 40 + 185); // Pink vs Cyan
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.8 + this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y < -30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.opacity})`;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
        ctx.bezierCurveTo(0, this.size, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.closePath();
        ctx.fill();
      } else if (this.type === 'petal') {
        ctx.fillStyle = `hsla(${this.hue}, 80%, 75%, ${this.opacity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = state.mode === 'love' ? '#fff9d6' : '#cce3de';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const particleCount = Math.min(Math.floor(width / 35), 45);
  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.4) return;
    const p = new Particle();
    p.x = e.clientX + (Math.random() - 0.5) * 15;
    p.y = e.clientY + (Math.random() - 0.5) * 15;
    p.speedY = Math.random() * 2 + 1;
    p.opacity = 0.9;
    p.size = Math.random() * 10 + 6;
    particles.push(p);
    if (particles.length > 70) particles.shift();
  });
}


// ==========================================================================
// UPLOAD ZONES & DRAG-AND-DROP
// ==========================================================================
function setupUploadZones() {
  setupSingleDropZone('boyDropZone', 'boyImagesInput', 'boyPreviews', state.boyPhotos);
  setupSingleDropZone('girlDropZone', 'girlImagesInput', 'girlPreviews', state.girlPhotos);
  setupSingleDropZone('togetherDropZone', 'togetherImagesInput', 'togetherPreviews', state.togetherPhotos);
}

function setupSingleDropZone(dropZoneId, inputId, previewId, storageArray) {
  const dropZone = document.getElementById(dropZoneId);
  const input = document.getElementById(inputId);
  const previews = document.getElementById(previewId);

  dropZone.addEventListener('click', (e) => {
    if (e.target.closest('.remove-thumb-btn')) return;
    input.click();
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
    });
  });

  dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    handleImageFiles(files, storageArray, previews);
  });

  input.addEventListener('change', () => {
    handleImageFiles(input.files, storageArray, previews);
    input.value = '';
  });
}

function handleImageFiles(files, storageArray, previewContainer) {
  if (!files || files.length === 0) return;

  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      storageArray.push(e.target.result);
      renderPreviews(storageArray, previewContainer);
    };
    reader.readAsDataURL(file);
  });
}

function renderPreviews(storageArray, container) {
  container.innerHTML = '';
  storageArray.forEach((dataUrl, idx) => {
    const thumb = document.createElement('div');
    thumb.className = 'preview-thumb';
    thumb.innerHTML = `
      <img src="${dataUrl}" alt="صورة ${idx + 1}">
      <button class="remove-thumb-btn" type="button" title="حذف الصورة" onclick="removeImage(${idx}, this)">&times;</button>
    `;
    container.appendChild(thumb);
  });
}

window.removeImage = function(index, btnElement) {
  const previewContainer = btnElement.closest('.previews-container');
  if (previewContainer.id === 'boyPreviews') {
    state.boyPhotos.splice(index, 1);
    renderPreviews(state.boyPhotos, previewContainer);
  } else if (previewContainer.id === 'girlPreviews') {
    state.girlPhotos.splice(index, 1);
    renderPreviews(state.girlPhotos, previewContainer);
  } else if (previewContainer.id === 'togetherPreviews') {
    state.togetherPhotos.splice(index, 1);
    renderPreviews(state.togetherPhotos, previewContainer);
  }
};


// ==========================================================================
// PRESETS HANDLERS
// ==========================================================================
window.applyLetterPreset = function(presetKey) {
  const textarea = document.getElementById('loveLetterText');
  if (letterPresets[presetKey]) {
    textarea.value = letterPresets[presetKey];
    textarea.classList.add('flash-effect');
    setTimeout(() => textarea.classList.remove('flash-effect'), 500);
  }
};


// ==========================================================================
// EVENT LISTENERS
// ==========================================================================
function setupEventListeners() {
  document.getElementById('themeSelect').addEventListener('change', (e) => {
    state.theme = e.target.value;
    document.body.className = state.theme;
  });

  const bgMusicSelect = document.getElementById('bgMusicSelect');
  const customAudioInput = document.getElementById('customAudioInput');
  bgMusicSelect.addEventListener('change', (e) => {
    state.musicType = e.target.value;
    if (state.musicType === 'custom') {
      customAudioInput.click();
    }
  });

  customAudioInput.addEventListener('change', () => {
    const file = customAudioInput.files[0];
    if (file) {
      state.customAudioUrl = URL.createObjectURL(file);
    }
  });

  document.getElementById('extractBtn').addEventListener('click', handleExtract);
  document.getElementById('loadDemoBtn').addEventListener('click', loadDemoData);

  document.getElementById('backToStudioBtn').addEventListener('click', () => {
    document.getElementById('romanticExperience').classList.remove('active-view');
    document.getElementById('creatorStudio').classList.add('active-view');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('toggleMusicBtn').addEventListener('click', toggleAudio);
  document.getElementById('showerHeartsBtn').addEventListener('click', triggerHeartShower);
  document.getElementById('exportBtn').addEventListener('click', exportStandaloneSite);
}


// ==========================================================================
// DEMO DATA LOADER
// ==========================================================================
function loadDemoData() {
  if (state.mode === 'love') {
    document.getElementById('person1Name').value = 'محمد';
    document.getElementById('person2Name').value = 'سارة';
    document.getElementById('loveNickname').value = 'أميرة قلبي ووتيني';

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    oneYearAgo.setMonth(oneYearAgo.getMonth() - 2);
    document.getElementById('anniversaryDate').value = oneYearAgo.toISOString().split('T')[0];

    applyLetterPreset('love_1');
  } else {
    document.getElementById('person1Name').value = 'محمد';
    document.getElementById('person2Name').value = 'أحمد';
    document.getElementById('loveNickname').value = 'أخويا وسندي وشريك المغامرات';

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    document.getElementById('anniversaryDate').value = twoYearsAgo.toISOString().split('T')[0];

    applyLetterPreset('friends_1');
  }

  state.boyPhotos = [
    defaultBoyPlaceholder,
    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%231e3d59"/><circle cx="200" cy="160" r="65" fill="%23f5f0e1"/><path d="M120,330 C120,250 280,250 280,330 Z" fill="%23f5f0e1"/><text x="200" y="375" font-family="sans-serif" font-size="22" fill="%23f5f0e1" text-anchor="middle">أول يوم تقابلنا ☕</text></svg>`
  ];

  state.girlPhotos = [
    defaultGirlPlaceholder,
    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="%23ff6e7f"/><circle cx="200" cy="160" r="65" fill="%23bfe9ff"/><path d="M120,330 C120,250 280,250 280,330 Z" fill="%23bfe9ff"/><text x="200" y="375" font-family="sans-serif" font-size="22" fill="%23ffffff" text-anchor="middle">أحلى لقطة 📸</text></svg>`
  ];

  state.togetherPhotos = [
    `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ff758c"/><stop offset="100%" stop-color="%23ff7eb3"/></linearGradient></defs><rect width="400" height="400" fill="url(%23g)"/><path d="M200,280 L180,260 C100,180 140,110 200,160 C260,110 300,180 220,260 Z" fill="%23ffffff"/><text x="200" y="360" font-family="sans-serif" font-size="26" fill="%23ffffff" text-anchor="middle">أحلى ذكرى سوا 💫</text></svg>`
  ];

  renderPreviews(state.boyPhotos, document.getElementById('boyPreviews'));
  renderPreviews(state.girlPhotos, document.getElementById('girlPreviews'));
  renderPreviews(state.togetherPhotos, document.getElementById('togetherPreviews'));

  playMagicalChime();
  triggerHeartShower();

  const btnText = document.getElementById('demoBtnText');
  const old = btnText.textContent;
  btnText.textContent = 'تم تحميل النموذج بنجاح! اضغط Extract للرؤية 💖';
  setTimeout(() => { btnText.textContent = old; }, 2500);
}


// ==========================================================================
// EXTRACT ACTION
// ==========================================================================
function handleExtract() {
  state.person1Name = document.getElementById('person1Name').value.trim() || 'محمد';
  state.person2Name = document.getElementById('person2Name').value.trim() || (state.mode === 'love' ? 'أميرتي' : 'أحمد');
  state.anniversaryDate = document.getElementById('anniversaryDate').value;
  state.loveNickname = document.getElementById('loveNickname').value.trim() || (state.mode === 'love' ? 'نصفي الثاني وروح قلبي' : 'أخويا وسندي');
  state.loveLetter = document.getElementById('loveLetterText').value.trim() || (state.mode === 'love' ? letterPresets.love_1 : letterPresets.friends_1);
  state.theme = document.getElementById('themeSelect').value;

  // Add Direct Image URLs if entered
  const boyUrl = document.getElementById('boyUrlInput') ? document.getElementById('boyUrlInput').value.trim() : '';
  if (boyUrl && !state.boyPhotos.includes(boyUrl)) {
    state.boyPhotos.unshift(boyUrl);
  }

  const girlUrl = document.getElementById('girlUrlInput') ? document.getElementById('girlUrlInput').value.trim() : '';
  if (girlUrl && !state.girlPhotos.includes(girlUrl)) {
    state.girlPhotos.unshift(girlUrl);
  }

  document.body.className = state.theme;

  playMagicalChime();
  triggerHeartShower();

  populateRomanticExperience();

  document.getElementById('creatorStudio').classList.remove('active-view');
  document.getElementById('romanticExperience').classList.add('active-view');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  startRomanticMusic();
}


// ==========================================================================
// POPULATE THE EXPERIENCE VIEW
// ==========================================================================
function populateRomanticExperience() {
  const isLove = (state.mode === 'love');

  // Hero Titles
  document.getElementById('displayBoyName').textContent = state.person1Name;
  document.getElementById('displayGirlName').textContent = state.person2Name;
  document.getElementById('displayLoveNickname').textContent = state.loveNickname;

  if (isLove) {
    document.getElementById('heroSparklesTop').textContent = '✨ ❤️ ✨';
    document.getElementById('heroCenterIcon').innerHTML = '<i class="fa-solid fa-infinity"></i><i class="fa-solid fa-heart inner-heart"></i>';
    document.getElementById('displaySubtitle').textContent = `"${state.person1Name} & ${state.person2Name}.. كل ثانية معاكي هي أجمل قصة اتكتبت في حياتي"`;
    document.getElementById('scrollDownText').textContent = 'انزلي وشوفي حكايتنا';

    // Counter
    document.getElementById('counterBadgeIcon').className = 'fa-solid fa-stopwatch';
    document.getElementById('counterBadgeText').textContent = 'نبضات قلوبنا مع بعض';
    document.getElementById('counterHeading').textContent = 'عداد الحب والذكريات الجميلة ⏳';
    document.getElementById('counterSub').textContent = 'منذ اللحظة الأولى التي أضاءت فيها حياتي بوجودك، وكل ثانية بتمر وأنا بحبك أكتر:';
    document.getElementById('counterFooterQuote').textContent = '"وما زلتِ يا كل أمنياتي، أجمل ما حدث في تاريخي."';

    // Souls
    document.getElementById('soulsBadgeIcon').className = 'fa-solid fa-user-group';
    document.getElementById('soulsBadgeText').textContent = 'روحين التقوا في جسد واحد';
    document.getElementById('soulsHeading').textContent = 'حكاية قمر ونجمته 🌟';
    document.getElementById('tagPerson1').textContent = 'هو • فارس قلبها';
    document.getElementById('tagPerson2').textContent = 'هي • أميرة قلبه وملاكه';
    document.getElementById('boySoulCaption').textContent = '"وعدت نفسي أن أكون سندكِ، أمانكِ، والكتف الذي لا يميل أبداً."';
    document.getElementById('girlSoulCaption').textContent = '"في عيونكِ أرى موطني وراحتي، وضحكتكِ هي النور الذي يبهج كل أيامي."';
    document.getElementById('bridgeCenterCircle').innerHTML = '<i class="fa-solid fa-heart heartbeat-infinite"></i>';

    // Gallery
    document.getElementById('galleryHeading').textContent = 'معرض حكاياتنا المصورة 📸';
    document.getElementById('gallerySub').textContent = 'كل صورة هنا ليها دقة قلب وذكرى لا يمكن أن تُنسى:';

    // Letter
    document.getElementById('letterBadgeIcon').className = 'fa-solid fa-envelope';
    document.getElementById('letterBadgeText').textContent = 'سر مكتوب بمداد القلب';
    document.getElementById('letterSectionHeading').textContent = 'جواب غرامي إلى أجمل فتاة في الكون 💌';
    document.getElementById('letterSectionSub').textContent = 'اضغطي على المظروف لفك الختم وقراءة الرسالة التي كتبها قلبي لكِ:';
    document.getElementById('letterDisplayDate').textContent = `إلى أميرتي الغالية ${state.person2Name}`;
    document.getElementById('letterSignatureLabel').textContent = 'المخلص لقلبكِ دائماً وأبداً،';
    document.getElementById('displaySignatureName').textContent = state.person1Name;
    document.getElementById('envelopeStampIcon').className = 'fa-solid fa-heart';

    // Reasons
    document.getElementById('reasonsBadgeIcon').className = 'fa-solid fa-wand-magic';
    document.getElementById('reasonsBadgeText').textContent = 'أسرار عشقي لكي';
    document.getElementById('reasonsHeading').textContent = 'ليه قلبي اختاركِ أنتي بالذات؟ 💖';
    document.getElementById('reasonsSub').textContent = 'اضغطي على الزر وشوفي كل مرة سبب من ألوف الأسباب اللي بتخليني أعشقك:';
    document.getElementById('nextReasonBtnText').textContent = 'اضغطي هنا وشوفي سبب جديد ✨';

    // Footer
    document.getElementById('footerMainIcon').className = 'fa-solid fa-heart heartbeat-huge';
    document.getElementById('footerVowTitle').textContent = 'وعدٌ أزلي بقلبٍ لا يخون';
    document.getElementById('footerVowText').textContent = '"أعدكِ أمام الله، أن أظل سندكِ الذي لا ينكسر، ومأواكِ الدافئ حين يقسو العالم، وأن أحبكِ في كل يوم كأنني أراكِ لأول مرة."';
    document.getElementById('footerCoupleNames').textContent = `${state.person1Name} ❤️ ${state.person2Name}`;
    document.getElementById('footerSubText').textContent = 'معاً إلى الأبد • Forever & Always';
    document.getElementById('footerActionText').textContent = 'أمطرنا بقلوب الحب! 💖';
    document.getElementById('footerActionIcon').className = 'fa-solid fa-heart';
  } else {
    // FRIENDS EXPERIENCE
    document.getElementById('heroSparklesTop').textContent = '⚡ 👊 ⚡';
    document.getElementById('heroCenterIcon').innerHTML = '<i class="fa-solid fa-handshake-simple" style="color:var(--accent-gold);"></i>';
    document.getElementById('displaySubtitle').textContent = `"${state.person1Name} & ${state.person2Name}.. أجدع صحاب وعِشرة عمر متتعوضش"`;
    document.getElementById('scrollDownText').textContent = 'انزل وشوف حكاية الصحاب';

    // Counter
    document.getElementById('counterBadgeIcon').className = 'fa-solid fa-calendar-check';
    document.getElementById('counterBadgeText').textContent = 'عداد العِشرة والأخوة والجدعنة';
    document.getElementById('counterHeading').textContent = 'كم يوم عِشرة وأخوة جمعتنا؟ ⏳';
    document.getElementById('counterSub').textContent = 'من أول يوم عرفتك فيه، وكل ثانية بتعدي بتثبت إنك مش مجرد صاحب، أنت أخ وسند:';
    document.getElementById('counterFooterQuote').textContent = '"رب أخٍ لم تلده أمك، كان هو السند في كل شدة."';

    // Souls
    document.getElementById('soulsBadgeIcon').className = 'fa-solid fa-shield-halved';
    document.getElementById('soulsBadgeText').textContent = 'إيد واحدة وسند لبعض';
    document.getElementById('soulsHeading').textContent = 'الأخوة اللي متهزهاش ريح 👊';
    document.getElementById('tagPerson1').textContent = 'أنا • السند والكتف';
    document.getElementById('tagPerson2').textContent = 'هو • أجدع بيست فريند وأخويا';
    document.getElementById('boySoulCaption').textContent = '"في ضهرك في أي وقت وأي مكان، والكتف اللي تسند عليه وقت الشدة."';
    document.getElementById('girlSoulCaption').textContent = '"أجدع صاحب في الدنيا، شريك الضحك والمغامرات والمواقف الرجولية."';
    document.getElementById('bridgeCenterCircle').innerHTML = '<i class="fa-solid fa-handshake-angle heartbeat-infinite"></i>';

    // Gallery
    document.getElementById('galleryHeading').textContent = 'ألبوم الذكريات والهبل والخروجات 📸';
    document.getElementById('gallerySub').textContent = 'كل لقطة هنا ليها قصة ومصيبة ضحكنا عليها من قلبنا:';

    // Letter
    document.getElementById('letterBadgeIcon').className = 'fa-solid fa-scroll';
    document.getElementById('letterBadgeText').textContent = 'رسالة عِشرة وجدعنة';
    document.getElementById('letterSectionHeading').textContent = 'رسالة إخلاص إلى أجدع صاحب في الدنيا 📜';
    document.getElementById('letterSectionSub').textContent = 'اضغط على المظروف لفتحه وقراءة ما كتبه القلب لك:';
    document.getElementById('letterDisplayDate').textContent = `إلى أخي الغالي ${state.person2Name}`;
    document.getElementById('letterSignatureLabel').textContent = 'أخوك وصاحبك وسندك دائماً،';
    document.getElementById('displaySignatureName').textContent = state.person1Name;
    document.getElementById('envelopeStampIcon').className = 'fa-solid fa-handshake';

    // Reasons
    document.getElementById('reasonsBadgeIcon').className = 'fa-solid fa-medal';
    document.getElementById('reasonsBadgeText').textContent = 'أسباب الأخوة الحقيقية';
    document.getElementById('reasonsHeading').textContent = 'ليه أنت أجدع وأغلى صاحب في حياتي؟ 👊';
    document.getElementById('reasonsSub').textContent = 'اضغط على الزر وشوف كل مرة سبب من أسباب اعتزازي بوجودك:';
    document.getElementById('nextReasonBtnText').textContent = 'اضغط هنا وشوف سبب جديد ⚡';

    // Footer
    document.getElementById('footerMainIcon').className = 'fa-solid fa-award heartbeat-huge';
    document.getElementById('footerVowTitle').textContent = 'عهد الأخوة والجدعنة للأبد';
    document.getElementById('footerVowText').textContent = '"أعاهدك أن أظل في ضهرك، وألا تفرق بيننا الأيام، وأن نبقى كما كنا.. إيد واحدة وسند لا ينكسر."';
    document.getElementById('footerCoupleNames').textContent = `${state.person1Name} 🤝 ${state.person2Name}`;
    document.getElementById('footerSubText').textContent = 'صحاب وأخوات مدى الحياة • Brothers Forever';
    document.getElementById('footerActionText').textContent = 'احتفال الصحاب الجدعان! 💥';
    document.getElementById('footerActionIcon').className = 'fa-solid fa-bolt';
  }

  // Souls Card Names & Images
  document.getElementById('boySoulName').textContent = state.person1Name;
  document.getElementById('girlSoulName').textContent = state.person2Name;

  const boyHeroImg = state.boyPhotos[0] || defaultBoyPlaceholder;
  const girlHeroImg = state.girlPhotos[0] || defaultGirlPlaceholder;

  document.getElementById('boyFeaturedImg').src = boyHeroImg;
  document.getElementById('girlFeaturedImg').src = girlHeroImg;

  renderMiniThumbnails('boyMiniGallery', state.boyPhotos, 'boyFeaturedImg');
  renderMiniThumbnails('girlMiniGallery', state.girlPhotos, 'girlFeaturedImg');

  // Build Gallery
  buildMemoriesGallery();

  // Secret Letter Body
  document.getElementById('displayLetterBody').textContent = state.loveLetter;

  // Set initial reason
  const reasonsList = reasonsData[state.mode] || reasonsData.love;
  currentReasonIndex = 0;
  document.getElementById('currentReasonText').textContent = `"${reasonsList[0]}"`;

  // Start Live Counter
  startLiveLoveCounter();
}

function renderMiniThumbnails(containerId, photosArray, targetImgId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if (!photosArray || photosArray.length <= 1) return;

  photosArray.forEach((photo, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `mini-thumb ${idx === 0 ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${photo}" alt="صورة ${idx + 1}">`;
    thumb.addEventListener('click', () => {
      document.getElementById(targetImgId).src = photo;
      container.querySelectorAll('.mini-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    container.appendChild(thumb);
  });
}


// ==========================================================================
// POLAROID GALLERY
// ==========================================================================
const captionsLove = [
  "ضحكتكِ أمان لقلبي 💖",
  "معاكي حتى آخر العمر ✨",
  "أجمل يوم وأعذب ذكرى 🌸",
  "في عينيكِ أرى أمني وموطني 🌹",
  "كل ثانية جنبك بتسوى سنين 💍",
  "جمالك يسرق الأنفاس 💕",
  "القلب اللي نبض ليكي وحدك ❤️",
  "أغلى ما أملك في الوجود 🌟"
];

const captionsFriends = [
  "أجدع خروجة وضحك للصبح 😂",
  "شريك المصايب والشقاوة 👊",
  "عِشرة سنين لا تقدر بثمن 👑",
  "الأخ اللي ميتعوضش ⚡",
  "يوم للتاريخ عمره ما يتنسي 📸",
  "السند اللي في الضهر دايماً 🛡️",
  "أحلى لقطة وأصفى قلوب 🌟",
  "معاً حتى نعجز سوا 🤝"
];

function buildMemoriesGallery() {
  const grid = document.getElementById('romanticGalleryGrid');
  grid.innerHTML = '';

  const isLove = (state.mode === 'love');
  const captionsList = isLove ? captionsLove : captionsFriends;

  let allGalleryPhotos = [];
  state.girlPhotos.forEach((img, i) => allGalleryPhotos.push({ img, label: `${state.person2Name}` }));
  state.boyPhotos.forEach((img, i) => allGalleryPhotos.push({ img, label: `${state.person1Name}` }));
  state.togetherPhotos.forEach((img, i) => allGalleryPhotos.push({ img, label: `ذكرياتنا سوا` }));

  if (allGalleryPhotos.length === 0) {
    allGalleryPhotos = [
      { img: defaultGirlPlaceholder, label: state.person2Name },
      { img: defaultBoyPlaceholder, label: state.person1Name },
      { img: defaultGirlPlaceholder, label: "أجمل الذكريات" },
      { img: defaultBoyPlaceholder, label: "معاً دائماً" }
    ];
  }

  allGalleryPhotos.forEach((item, index) => {
    const caption = captionsList[index % captionsList.length];
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.innerHTML = `
      <div class="polaroid-img-wrap">
        <img src="${item.img}" alt="${item.label}" loading="lazy">
      </div>
      <div class="polaroid-caption">${caption}</div>
    `;

    card.addEventListener('click', () => {
      openLightbox(item.img, caption);
    });

    grid.appendChild(card);
  });
}


// ==========================================================================
// LIVE COUNTER
// ==========================================================================
function startLiveLoveCounter() {
  if (state.counterInterval) clearInterval(state.counterInterval);

  let startDate = state.anniversaryDate ? new Date(state.anniversaryDate) : new Date(Date.now() - 150 * 24 * 3600 * 1000);

  function update() {
    const now = new Date();
    let diff = now - startDate;
    if (diff < 0) diff = 0;

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById('countDays').textContent = days;
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('countSeconds').textContent = String(seconds).padStart(2, '0');
  }

  update();
  state.counterInterval = setInterval(update, 1000);
}


// ==========================================================================
// 3D ENVELOPE TOGGLE
// ==========================================================================
window.toggleLoveLetter = function() {
  const envelope = document.getElementById('envelopeBox');
  const isOpen = envelope.classList.toggle('open-envelope');
  
  if (isOpen) {
    playMagicalChime();
    triggerHeartShower();
  }
};


// ==========================================================================
// REASONS DECK
// ==========================================================================
window.showNextReason = function() {
  const reasonsList = reasonsData[state.mode] || reasonsData.love;
  currentReasonIndex = (currentReasonIndex + 1) % reasonsList.length;
  const reasonTextElem = document.getElementById('currentReasonText');

  reasonTextElem.style.opacity = '0';
  setTimeout(() => {
    reasonTextElem.textContent = `"${reasonsList[currentReasonIndex]}"`;
    reasonTextElem.style.opacity = '1';
    playSoftHarp();
  }, 250);
};


// ==========================================================================
// AUDIO ENGINE (Web Audio API Synthesizer)
// ==========================================================================
let audioCtx = null;
let synthInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playMagicalChime() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
    });
  } catch (err) {}
}

function playSoftHarp() {
  try {
    const ctx = getAudioContext();
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.06 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 1.0);
    });
  } catch (e) {}
}

function startRomanticMusic() {
  const audioPlayer = document.getElementById('romanticAudioPlayer');
  
  if (state.musicType === 'custom' && state.customAudioUrl) {
    audioPlayer.src = state.customAudioUrl;
    audioPlayer.play().catch(e => console.log('Autoplay blocked', e));
    state.isAudioPlaying = true;
    updateAudioBtnUI(true);
    return;
  }

  startPianoSynthLoop();
  state.isAudioPlaying = true;
  updateAudioBtnUI(true);
}

function startPianoSynthLoop() {
  stopPianoSynthLoop();
  const ctx = getAudioContext();

  const chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj9
    [220.00, 261.63, 329.63, 392.00], // Am9
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // Gsus4
  ];

  let chordIndex = 0;

  function playChord() {
    if (!state.isAudioPlaying) return;
    const currentChord = chords[chordIndex % chords.length];
    chordIndex++;

    currentChord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + i * 0.12 + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 3.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 4.0);
    });
  }

  playChord();
  synthInterval = setInterval(playChord, 3800);
}

function stopPianoSynthLoop() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
  const audioPlayer = document.getElementById('romanticAudioPlayer');
  audioPlayer.pause();
}

function toggleAudio() {
  state.isAudioPlaying = !state.isAudioPlaying;
  if (state.isAudioPlaying) {
    startRomanticMusic();
  } else {
    stopPianoSynthLoop();
  }
  updateAudioBtnUI(state.isAudioPlaying);
}

function updateAudioBtnUI(isPlaying) {
  const btn = document.getElementById('toggleMusicBtn');
  if (isPlaying) {
    btn.classList.remove('music-paused');
  } else {
    btn.classList.add('music-paused');
  }
}


// ==========================================================================
// HEART / CELEBRATION SHOWER
// ==========================================================================
window.triggerHeartShower = function() {
  if (typeof confetti === 'function') {
    const isLove = (state.mode === 'love');
    const colors = isLove ? ['#ff007f', '#ff5400', '#ffd166', '#ff4d6d', '#ffffff'] : ['#00b4d8', '#48cae4', '#90e0ef', '#ffd166', '#ffffff'];

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.2, y: 0.65 },
      colors: colors
    });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.8, y: 0.65 },
      colors: colors
    });

    confetti({
      particleCount: 70,
      spread: 100,
      origin: { x: 0.5, y: 0.4 },
      colors: colors
    });
  }
};


// ==========================================================================
// LIGHTBOX FULLSCREEN MODAL
// ==========================================================================
function openLightbox(src, caption) {
  const modal = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  img.src = src;
  cap.textContent = caption || '';
  modal.classList.add('active');
}

window.closeLightbox = function(event) {
  if (event.target.id === 'imageLightbox' || event.target.className === 'lightbox-close') {
    document.getElementById('imageLightbox').classList.remove('active');
  }
};


// ==========================================================================
// SHARE LIVE ONLINE MODAL & URL GENERATOR
// ==========================================================================
window.openShareModal = function() {
  const modal = document.getElementById('shareModal');
  const input = document.getElementById('shareLiveUrlInput');

  // Base URL (GitHub Pages or current host)
  const ghPagesBase = 'https://medo-adel.github.io/Love/';
  const currentBase = (window.location.protocol.startsWith('http')) 
    ? (window.location.origin + window.location.pathname) 
    : ghPagesBase;

  // Encode state into query params
  const params = new URLSearchParams();
  params.set('mode', state.mode);
  params.set('p1', state.person1Name);
  params.set('p2', state.person2Name);
  params.set('date', state.anniversaryDate || '');
  params.set('nick', state.loveNickname);
  params.set('theme', state.theme);
  params.set('msg', state.loveLetter);

  // If photos have web URLs or images/ paths, include them!
  const boyImg = state.boyPhotos.find(p => p.startsWith('http') || p.startsWith('images/')) 
    || (document.getElementById('boyUrlInput') ? document.getElementById('boyUrlInput').value.trim() : '');
  const girlImg = state.girlPhotos.find(p => p.startsWith('http') || p.startsWith('images/')) 
    || (document.getElementById('girlUrlInput') ? document.getElementById('girlUrlInput').value.trim() : '');

  if (boyImg) params.set('bimg', boyImg);
  if (girlImg) params.set('gimg', girlImg);

  const fullShareUrl = `${currentBase}?${params.toString()}`;
  input.value = fullShareUrl;

  modal.classList.add('active');
};

window.closeShareModal = function(event) {
  const modal = document.getElementById('shareModal');
  modal.classList.remove('active');
};

window.copyShareUrl = function() {
  const input = document.getElementById('shareLiveUrlInput');
  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    const btnText = document.getElementById('copyBtnText');
    btnText.textContent = 'تم النسخ بنجاح! ✔️';
    setTimeout(() => { btnText.textContent = 'نسخ الرابط'; }, 2000);
  });
};

window.shareOnWhatsApp = function() {
  const input = document.getElementById('shareLiveUrlInput');
  const title = (state.mode === 'love') ? `موقع رومانسي خاص ومفاجأة ليكي 💖` : `موقع لأجدع وأغلى صاحب في الدنيا 👊`;
  const text = `${title}\n${input.value}`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
};

window.shareOnTelegram = function() {
  const input = document.getElementById('shareLiveUrlInput');
  const title = (state.mode === 'love') ? `موقع خاص ليكي 💖` : `موقع لأجدع صاحب 👊`;
  window.open(`https://t.me/share/url?url=${encodeURIComponent(input.value)}&text=${encodeURIComponent(title)}`, '_blank');
};

// Check if user came from a shared URL link
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has('p1') && !urlParams.has('p2')) return false;

  const mode = urlParams.get('mode') || 'love';
  setMode(mode);

  state.person1Name = urlParams.get('p1') || (mode === 'love' ? 'محمد' : 'محمد');
  state.person2Name = urlParams.get('p2') || (mode === 'love' ? 'أميرتي' : 'أحمد');
  state.anniversaryDate = urlParams.get('date') || '';
  state.loveNickname = urlParams.get('nick') || '';
  state.theme = urlParams.get('theme') || (mode === 'love' ? 'theme-rose' : 'theme-friends-cyan');
  state.loveLetter = urlParams.get('msg') || (mode === 'love' ? letterPresets.love_1 : letterPresets.friends_1);

  document.getElementById('person1Name').value = state.person1Name;
  document.getElementById('person2Name').value = state.person2Name;
  document.getElementById('anniversaryDate').value = state.anniversaryDate;
  document.getElementById('loveNickname').value = state.loveNickname;
  document.getElementById('loveLetterText').value = state.loveLetter;
  document.getElementById('themeSelect').value = state.theme;
  document.body.className = state.theme;

  // Read images from URL if passed
  if (urlParams.has('bimg')) {
    state.boyPhotos = [urlParams.get('bimg')];
  }
  if (urlParams.has('gimg')) {
    state.girlPhotos = [urlParams.get('gimg')];
  }

  // Auto extract immediately for the viewer!
  populateRomanticExperience();
  document.getElementById('creatorStudio').classList.remove('active-view');
  document.getElementById('romanticExperience').classList.add('active-view');
  startRomanticMusic();
  return true;
}


// ==========================================================================
// EXPORT STANDALONE HTML WEBSITE (Gift File)
// ==========================================================================
window.exportStandaloneSite = async function() {
  const romanticContent = document.getElementById('romanticExperience').innerHTML;
  const currentTheme = state.theme || 'theme-rose';

  let cssContent = '';
  try {
    const res = await fetch('style.css');
    if (res.ok) {
      cssContent = await res.text();
    }
  } catch (err) {}

  if (!cssContent) {
    try {
      for (let sheet of document.styleSheets) {
        if (!sheet.href || sheet.href.includes('style.css')) {
          for (let rule of sheet.cssRules) {
            cssContent += rule.cssText + '\n';
          }
        }
      }
    } catch (e) {}
  }

  const reasonsList = reasonsData[state.mode] || reasonsData.love;

  const standaloneHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${state.person1Name} & ${state.person2Name} | حكايتنا 💖</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cairo:wght@300;400;600;700;900&family=Great+Vibes&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"><\/script>
  <style>
${cssContent}
  #romanticExperience { display: block !important; }
  #backToStudioBtn { display: none !important; }
  </style>
</head>
<body class="${currentTheme}">
  <canvas id="particleCanvas"></canvas>
  <div id="romanticExperience" class="app-view active-view">
    ${romanticContent}
  </div>

  <div id="imageLightbox" class="lightbox-modal" onclick="closeLightbox(event)">
    <span class="lightbox-close">&times;</span>
    <img id="lightboxImg" src="" alt="صورة مكبرة">
    <p id="lightboxCaption" class="lightbox-caption"></p>
  </div>

  <script>
    const startDate = "${state.anniversaryDate}";
    const reasons = ${JSON.stringify(reasonsList)};
    let reasonIndex = 0;

    // Canvas
    ${initParticleCanvas.toString()}
    initParticleCanvas();

    // Love Counter
    function startLiveLoveCounter() {
      let stDate = startDate ? new Date(startDate) : new Date(Date.now() - 150 * 24 * 3600 * 1000);
      function update() {
        const now = new Date();
        let diff = now - stDate;
        if (diff < 0) diff = 0;
        document.getElementById('countDays').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('countHours').textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        document.getElementById('countMinutes').textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        document.getElementById('countSeconds').textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
      }
      update();
      setInterval(update, 1000);
    }
    startLiveLoveCounter();

    ${window.toggleLoveLetter.toString()}
    ${window.triggerHeartShower.toString()}
    ${window.showNextReason.toString()}
    ${openLightbox.toString()}
    ${window.closeLightbox.toString()}

    document.querySelectorAll('.polaroid-card').forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img').src;
        const cap = card.querySelector('.polaroid-caption').textContent;
        openLightbox(img, cap);
      });
    });

    window.addEventListener('load', () => {
      triggerHeartShower();
    });
  <\/script>
</body>
</html>`;

  const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `حكايتنا_${state.person1Name}_و_${state.person2Name}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
