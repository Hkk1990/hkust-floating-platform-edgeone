(() => {
  const capabilityPages = [
    'interdisciplinary-research',
    'solar-energy',
    'water-cycle',
    'structural-sensing',
    'digital-twin',
    'teaching-display'
  ];

  function enhanceNavigation() {
    const topbar = document.querySelector('.topbar');
    const nav = topbar?.querySelector('nav');
    if (!topbar || !nav || topbar.dataset.enhanced === 'true') return;
    topbar.dataset.enhanced = 'true';
    nav.innerHTML = `
      <a href="#overview">项目概览</a>
      <a href="#platform">平台结构</a>
      <a href="#systems">智慧系统</a>
      <a href="#mobility">动态锚泊</a>
      <a href="#journey">建设历程</a>
      <a href="#interiors">空间体验</a>`;
    nav.id = 'site-navigation';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开网站目录');
    toggle.innerHTML = '<span></span><span></span><span></span><b>目录</b>';
    const status = topbar.querySelector('.topbar-status');
    topbar.insertBefore(toggle, status);
    const closeMenu = () => {
      topbar.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', '打开网站目录');
    };
    toggle.addEventListener('click', () => {
      const open = topbar.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭网站目录' : '打开网站目录');
    });
    nav.addEventListener('click', closeMenu);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  function enhanceHero() {
    const heroContent = document.querySelector('.hero-content');
    const intro = heroContent?.querySelector('.hero-intro');
    if (!heroContent || !intro || heroContent.querySelector('.project-full-name')) return;
    intro.textContent = '香港科技大学（广州）校园浮式多功能试验及环境可持续微平台';
    intro.classList.add('project-full-name');
    const positioning = document.createElement('p');
    positioning.className = 'hero-positioning';
    positioning.textContent = '面向未来水上人居的校园浮式科研示范平台 · 施工建设阶段';
    intro.after(positioning);
    const heroLink = heroContent.querySelector('.primary-link');
    if (heroLink) heroLink.childNodes[0].textContent = '了解项目 ';
  }

  function addHighlights() {
    const overview = document.querySelector('.overview');
    if (!overview || document.querySelector('.project-highlights')) return;
    const highlights = document.createElement('section');
    highlights.className = 'project-highlights';
    highlights.id = 'highlights';
    highlights.innerHTML = `
      <div class="highlight-heading" data-reveal="true">
        <p class="section-index">CORE HIGHLIGHTS</p>
        <h2>让真实水域成为<br/><em>科研验证现场</em></h2>
      </div>
      <div class="highlight-grid">
        <article><span>01</span><strong>浮式科研平台</strong><p>面向真实工程条件的水上试验与验证载体</p></article>
        <article><span>02</span><strong>未来水上人居</strong><p>连接科研创新、教学实践与人居技术探索</p></article>
        <article><span>03</span><strong>智慧运维与数据感知</strong><p>持续感知结构、能源、水资源及环境状态</p></article>
        <article><span>04</span><strong>能源自持与水资源循环</strong><p>集成光伏、储能、雨水收集与中水回用</p></article>
      </div>`;
    overview.after(highlights);
  }

  function updatePlatformCopy() {
    const heading = document.querySelector('.platform-copy h2');
    if (heading) heading.innerHTML = '不止于建筑<br/><em>更是一座面向未来水上人居的科研验证平台</em>';
    const hint = document.querySelector('.platform-visual .media-hint');
    if (hint) hint.textContent = '探索平台结构 ↗︎';
    const overviewHint = document.querySelector('.overview-media .media-hint');
    if (overviewHint) overviewHint.textContent = '了解项目 ↗︎';
  }

  function linkCapabilityCards() {
    const section = document.querySelector('.capabilities');
    if (!section) return;
    section.id = 'capabilities';
    [...section.querySelectorAll('.capability-card')].forEach((card, index) => {
      if (card.tagName === 'A') return;
      const link = document.createElement('a');
      [...card.attributes].forEach(attribute => link.setAttribute(attribute.name, attribute.value));
      link.href = `./capabilities/${capabilityPages[index]}.html`;
      link.setAttribute('aria-label', `查看${card.querySelector('h3')?.textContent || ''}详情`);
      link.innerHTML = card.innerHTML;
      const action = document.createElement('b');
      action.className = 'capability-action';
      action.textContent = '查看能力详情 ↗︎';
      link.appendChild(action);
      card.replaceWith(link);
    });
  }

  function prioritizeEnergySystem() {
    const tabs = document.querySelector('.system-tabs');
    const panel = document.querySelector('.system-active');
    if (!tabs || !panel || tabs.dataset.energyPrioritized === 'true') return;
    tabs.dataset.energyPrioritized = 'true';
    const buttons = [...tabs.querySelectorAll('button')];
    const energy = buttons.find(button => button.querySelector('span')?.textContent.trim() === '能源管理');
    if (!energy) return;
    tabs.prepend(energy);
    buttons.forEach(button => {
      const selected = button === energy;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    const screen = panel.querySelector('.console-screen img');
    const heading = panel.querySelector('.system-info h3');
    const summary = panel.querySelector('.system-info > p:not(.system-kicker)');
    const metrics = panel.querySelector('.system-metrics');
    if (screen) {
      screen.src = './media/ibms-energy.webp';
      screen.alt = '能源管理与配电子系统界面';
    }
    if (heading) heading.textContent = '能源管理与配电子系统';
    if (summary) summary.textContent = '覆盖光伏发电、储能状态、配电回路与岸电交互，实现能源状态实时监测与智能调度';
    if (metrics) metrics.innerHTML = `
      <section><strong>光伏与储能</strong><span>实时功率与累计电量</span><span>SOC / SOH / 温度</span><span>峰谷充放电策略</span></section>
      <section><strong>配电监测</strong><span>回路电压、电流与功率</span><span>分合闸状态与故障报警</span><span>灯光与窗帘联动</span></section>
      <section><strong>岸电交互</strong><span>并网 / 离网功率</span><span>双向电量计量</span><span>溢流保护</span></section>`;
  }

  function reorderStory() {
    const shell = document.querySelector('.site-shell');
    const footer = shell?.querySelector(':scope > footer');
    if (!shell || !footer || shell.dataset.storyOrdered === 'true') return;
    shell.dataset.storyOrdered = 'true';
    const selectors = [
      '.overview', '.project-highlights', '.platform-story', '.capabilities', '.mobility', '.systems',
      '.bipv-feature', '.opening', '.journey', '.collaboration', '.exchange-gallery', '.perspectives',
      '.interiors', '.future'
    ];
    selectors.forEach(selector => {
      const section = shell.querySelector(`:scope > ${selector}`);
      if (section) shell.insertBefore(section, footer);
    });
  }

  function ensureSectionIds() {
    document.querySelector('.platform-story')?.setAttribute('id', 'platform');
    document.querySelector('.interiors')?.setAttribute('id', 'interiors');
  }

  function install() {
    enhanceNavigation();
    enhanceHero();
    addHighlights();
    updatePlatformCopy();
    linkCapabilityCards();
    prioritizeEnergySystem();
    ensureSectionIds();
    reorderStory();
  }

  // The exported page hydrates asynchronously. Apply enhancements after React
  // has claimed the server markup so the framework cannot replace our nodes.
  const scheduleInstall = () => {
    window.setTimeout(install, 700);
    window.setTimeout(install, 1800);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInstall, { once: true });
  } else {
    scheduleInstall();
  }
})();
