/* QRTX Control Center | DREAM_WAS */

(function () {
  'use strict';

  const STICKER_FILES = [
    'assets/stickers/CAACAgEAAxUAAWp0IZRBsmUzzoOjtuArUo9rUYOYAAKuBgACD0GBRAgxUwv4_vWnPQQ.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZRJ6od8DyK2gpVqlTfwoWVWAAKUDwAC-8h4RLu4RX_Xdqg4PQQ.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZRLLmFS7PW_-VdBnyrfVSkFAAJcBgACtwQ5RfBKzubJKefXPQQ.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZRQz-X5LBvoD0D70FR3zRLWAAKhDAACo3F5RFcokV1z_SpcPQQ.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZR5FQm_NQeoI3GEqqq1JgrPAAKTBwACvFw5Red8LTXEM2BjPQQ.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZQ8XaLw5eFK4miVY5ppdyD7AALMBgACT7cwRaposfehCzsNPQQ.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZQQLP7MjLJ8GJRtfYgB-yaGAAMIAAKJPHhE6Q0aVUfRFEc9BA.webm',
    'assets/stickers/CAACAgEAAxUAAWp0IZQ1AAE1dswgDOFZEpQ-Kn0AAR4AArwHAAICyIFENyiqE3wJIfw9BA.webm'
  ];

  // Mode → sticker index
  const MODE_STICKER = {
    lite: 0,
    performance: 1,
    auto: 2,
    battery: 3
  };

  const I18N = {
    en: {
      subtitle: 'Control Center',
      active_mode: 'Active Mode',
      live: 'Live',
      perf_mode: 'Performance Mode',
      mode_lite: 'Lite', mode_lite_desc: 'Power efficient',
      mode_perf: 'Performance', mode_perf_desc: 'Maximum speed',
      mode_auto: 'Auto', mode_auto_desc: 'Smart balancing',
      mode_batt: 'Battery', mode_batt_desc: 'Deep saver',
      quick_actions: 'Quick Actions',
      telegram: 'Telegram', refresh: 'Refresh',
      about_desc: 'Pure AMOLED performance dashboard. Optimized for Magisk, KernelSU, APatch, SukiSU & more.',
      crafted: 'Crafted by <b>DREAM_WAS</b>',
      settings: 'Settings', text_theme: 'Text Theme', language: 'Language', about: 'About',
      about_full: 'Premium Pure AMOLED WebUI performance module by DREAM_WAS. Supports Magisk, Magisk Delta, KernelSU, KernelSU Next, APatch, SukiSU and more.',
      mode_activated: 'mode activated',
      refreshed: 'Status refreshed',
      theme_applied: 'Theme applied'
    },
    zh: {
      subtitle: '控制中心',
      active_mode: '当前模式',
      live: '在线',
      perf_mode: '性能模式',
      mode_lite: '轻量', mode_lite_desc: '省电高效',
      mode_perf: '性能', mode_perf_desc: '极致速度',
      mode_auto: '自动', mode_auto_desc: '智能平衡',
      mode_batt: '电池', mode_batt_desc: '深度省电',
      quick_actions: '快捷操作',
      telegram: 'Telegram', refresh: '刷新',
      about_desc: '纯 AMOLED 性能控制面板。支持 Magisk、KernelSU、APatch、SukiSU 等。',
      crafted: '由 <b>DREAM_WAS</b> 制作',
      settings: '设置', text_theme: '文字主题色', language: '语言', about: '关于',
      about_full: 'DREAM_WAS 出品的高级纯 AMOLED WebUI 性能模块。支持 Magisk、Magisk Delta、KernelSU、KernelSU Next、APatch、SukiSU 等。',
      mode_activated: '模式已启用',
      refreshed: '状态已刷新',
      theme_applied: '主题已应用'
    },
    ru: {
      subtitle: 'Центр управления',
      active_mode: 'Активный режим',
      live: 'Онлайн',
      perf_mode: 'Режим производительности',
      mode_lite: 'Лайт', mode_lite_desc: 'Энергосбережение',
      mode_perf: 'Производительность', mode_perf_desc: 'Макс. скорость',
      mode_auto: 'Авто', mode_auto_desc: 'Умный баланс',
      mode_batt: 'Батарея', mode_batt_desc: 'Глубокое сбережение',
      quick_actions: 'Быстрые действия',
      telegram: 'Telegram', refresh: 'Обновить',
      about_desc: 'Панель управления с чистым AMOLED. Поддержка Magisk, KernelSU, APatch, SukiSU и др.',
      crafted: 'Создано <b>DREAM_WAS</b>',
      settings: 'Настройки', text_theme: 'Цвет темы', language: 'Язык', about: 'О модуле',
      about_full: 'Премиум AMOLED WebUI модуль от DREAM_WAS. Поддерживает Magisk, Magisk Delta, KernelSU, KernelSU Next, APatch, SukiSU и другие.',
      mode_activated: 'режим активирован',
      refreshed: 'Статус обновлён',
      theme_applied: 'Тема применена'
    },
    ja: {
      subtitle: 'コントロールセンター',
      active_mode: 'アクティブモード',
      live: 'ライブ',
      perf_mode: 'パフォーマンスモード',
      mode_lite: 'ライト', mode_lite_desc: '省電力',
      mode_perf: 'パフォーマンス', mode_perf_desc: '最高速度',
      mode_auto: 'オート', mode_auto_desc: 'スマートバランス',
      mode_batt: 'バッテリー', mode_batt_desc: 'ディープセーバー',
      quick_actions: 'クイックアクション',
      telegram: 'Telegram', refresh: '更新',
      about_desc: 'Pure AMOLED パフォーマンスダッシュボード。Magisk、KernelSU、APatch、SukiSU などに対応。',
      crafted: '<b>DREAM_WAS</b> 制作',
      settings: '設定', text_theme: 'テキストテーマ', language: '言語', about: '情報',
      about_full: 'DREAM_WAS によるプレミアム Pure AMOLED WebUI パフォーマンスモジュール。Magisk、Magisk Delta、KernelSU、KernelSU Next、APatch、SukiSU などをサポート。',
      mode_activated: 'モードが有効になりました',
      refreshed: 'ステータスを更新しました',
      theme_applied: 'テーマを適用しました'
    },
    pt: {
      subtitle: 'Centro de Controle',
      active_mode: 'Modo Ativo',
      live: 'Ao vivo',
      perf_mode: 'Modo de Desempenho',
      mode_lite: 'Lite', mode_lite_desc: 'Eficiente',
      mode_perf: 'Desempenho', mode_perf_desc: 'Velocidade máxima',
      mode_auto: 'Auto', mode_auto_desc: 'Equilíbrio inteligente',
      mode_batt: 'Bateria', mode_batt_desc: 'Economia profunda',
      quick_actions: 'Ações Rápidas',
      telegram: 'Telegram', refresh: 'Atualizar',
      about_desc: 'Painel de desempenho Pure AMOLED. Otimizado para Magisk, KernelSU, APatch, SukiSU e mais.',
      crafted: 'Criado por <b>DREAM_WAS</b>',
      settings: 'Configurações', text_theme: 'Tema de Texto', language: 'Idioma', about: 'Sobre',
      about_full: 'Módulo de desempenho Premium Pure AMOLED WebUI por DREAM_WAS. Suporta Magisk, Magisk Delta, KernelSU, KernelSU Next, APatch, SukiSU e mais.',
      mode_activated: 'modo ativado',
      refreshed: 'Status atualizado',
      theme_applied: 'Tema aplicado'
    }
  };

  const MODE_NAMES = {
    en: { lite: 'Lite', performance: 'Performance', auto: 'Auto', battery: 'Battery' },
    zh: { lite: '轻量', performance: '性能', auto: '自动', battery: '电池' },
    ru: { lite: 'Лайт', performance: 'Производительность', auto: 'Авто', battery: 'Батарея' },
    ja: { lite: 'ライト', performance: 'パフォーマンス', auto: 'オート', battery: 'バッテリー' },
    pt: { lite: 'Lite', performance: 'Desempenho', auto: 'Auto', battery: 'Bateria' }
  };

  // State
  let currentMode = localStorage.getItem('qrtx_mode') || 'auto';
  let currentLang = localStorage.getItem('qrtx_lang') || 'en';
  let currentAccent = localStorage.getItem('qrtx_accent') || '#a78bfa';
  let toastTimer = null;

  // DOM
  const modeGrid = document.getElementById('modeGrid');
  const modeNameEl = document.getElementById('modeName');
  const modeSticker = document.getElementById('modeSticker');
  const ringFill = document.getElementById('ringFill');
  const batPctEl = document.getElementById('batPct');
  const toastEl = document.getElementById('toast');
  const settingsOverlay = document.getElementById('settingsOverlay');

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.en[key] || key;
  }

  function applyI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val && val.includes('<b>')) {
        el.innerHTML = val;
      } else if (val) {
        el.textContent = val;
      }
    });
    // Update mode name from language
    if (modeNameEl && MODE_NAMES[currentLang]) {
      modeNameEl.textContent = MODE_NAMES[currentLang][currentMode] || currentMode;
    }
  }

  function setAccent(color) {
    currentAccent = color;
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--accent-soft', color + '26');
    document.documentElement.style.setProperty('--accent-glow', color + '73');
    localStorage.setItem('qrtx_accent', color);

    document.querySelectorAll('.color-swatch').forEach(s => {
      s.classList.toggle('active', s.dataset.color === color);
    });
  }

  function toast(msg, ms = 2200) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }

  function openTelegram() {
    const url = 'https://t.me/uwEspresso';
    try {
      if (typeof ksu !== 'undefined' && ksu.exec) {
        ksu.exec('am start -a android.intent.action.VIEW -d "' + url + '"');
      } else {
        window.open(url, '_blank');
      }
    } catch (_) {
      window.open(url, '_blank');
    }
  }

  function loadModeStickers() {
    // Mode cards
    document.querySelectorAll('.mode-vid').forEach(vid => {
      const idx = parseInt(vid.dataset.sticker, 10);
      if (STICKER_FILES[idx]) {
        vid.src = STICKER_FILES[idx];
      }
    });
  }

  function setMode(mode, persist) {
    if (MODE_STICKER[mode] === undefined) mode = 'auto';
    currentMode = mode;

    document.querySelectorAll('.mode').forEach(btn => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Hero sticker + name
    const idx = MODE_STICKER[mode];
    if (modeSticker && STICKER_FILES[idx]) {
      modeSticker.src = STICKER_FILES[idx];
    }
    if (modeNameEl) {
      modeNameEl.textContent = (MODE_NAMES[currentLang] && MODE_NAMES[currentLang][mode]) || mode;
    }

    if (persist !== false) {
      localStorage.setItem('qrtx_mode', mode);
      const name = (MODE_NAMES[currentLang] && MODE_NAMES[currentLang][mode]) || mode;
      toast(name + ' ' + t('mode_activated'));
    }
  }

  function updateBattery() {
    const set = function (level) {
      const pct = Math.round(level * 100);
      if (batPctEl) batPctEl.textContent = pct + '%';
      if (ringFill) {
        const circ = 2 * Math.PI * 40;
        ringFill.style.strokeDashoffset = circ - (pct / 100) * circ;
      }
    };
    if (navigator.getBattery) {
      navigator.getBattery().then(function (bat) {
        set(bat.level);
        bat.addEventListener('levelchange', function () { set(bat.level); });
      }).catch(function () { set(0.78); });
    } else {
      set(0.78);
    }
  }

  function openSettings() {
    if (settingsOverlay) {
      settingsOverlay.hidden = false;
      if (window.lucide) lucide.createIcons();
    }
  }

  function closeSettings() {
    if (settingsOverlay) settingsOverlay.hidden = true;
  }

  function bindEvents() {
    if (modeGrid) {
      modeGrid.addEventListener('click', function (e) {
        const btn = e.target.closest('.mode');
        if (btn) setMode(btn.dataset.mode);
      });
    }

    ['tgBtn', 'openChannel', 'channelLink', 'settingsTg'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', function (e) {
        e.preventDefault();
        openTelegram();
      });
    });

    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function () {
        updateBattery();
        toast(t('refreshed'));
      });
    }

    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);

    const closeBtn = document.getElementById('closeSettings');
    if (closeBtn) closeBtn.addEventListener('click', closeSettings);

    if (settingsOverlay) {
      settingsOverlay.addEventListener('click', function (e) {
        if (e.target === settingsOverlay) closeSettings();
      });
    }

    // Color swatches
    document.querySelectorAll('.color-swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        setAccent(sw.dataset.color);
        toast(t('theme_applied'));
      });
    });

    // Language
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentLang = btn.dataset.lang;
        localStorage.setItem('qrtx_lang', currentLang);
        document.querySelectorAll('.lang-btn').forEach(function (b) {
          b.classList.toggle('active', b.dataset.lang === currentLang);
        });
        applyI18n();
        setMode(currentMode, false);
        toast(btn.textContent.trim());
      });
    });
  }

  function init() {
    if (window.lucide) lucide.createIcons();

    setAccent(currentAccent);
    loadModeStickers();
    setMode(currentMode, false);
    applyI18n();

    // Mark language active
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === currentLang);
    });

    updateBattery();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
