(() => {
  const capabilityDetails = [
    { eyebrow: '01 / INTERDISCIPLINARY RESEARCH', title: '跨学科科研', lead: '平台面向海洋工程、能源、环境、材料、人工智能和未来人居等方向，为校内科研课题提供真实水域中的试验与验证条件。', points: ['支持机器人、海洋观测和结构监测', '支持能源、材料和水资源研究', '促进不同课题共享空间、设备与数据'], note: '代表内容：已汇集浮式结构、机器人、微电网、生态观测等多类科研项目。' },
    { eyebrow: '02 / SOLAR & ENERGY', title: '光伏与能源', lead: '平台将光伏发电、储能、配电和用能管理结合起来，探索浮式建筑的清洁能源利用方式。', points: ['建筑表皮集成多种光伏材料', '储能系统调节发电与用电', '智慧系统监测能源运行状态'], note: '设计测算：光伏发电玻璃面积约640㎡，能源自持率约90.82%。' },
    { eyebrow: '03 / WATER CYCLE', title: '水资源循环', lead: '平台通过雨水收集、灰水处理和中水回用，减少日常运行对外部水资源的依赖。', points: ['收集屋面雨水', '处理生活灰水', '回用于冲厕和清洁'], note: '设计工况：最高日用水量约4m³，其中约2m³可通过中水回用满足。' },
    { eyebrow: '04 / STRUCTURAL SENSING', title: '结构感知', lead: '平台通过传感器持续监测浮体、上部建筑、锚泊系统及周边水环境的运行状态。', points: ['监测位移、姿态和振动', '监测风、水位和波浪', '对异常状态进行分级预警'], note: '科研价值：将设计计算与实际监测数据结合，为浮式结构安全研究提供依据。' },
    { eyebrow: '05 / DIGITAL TWIN', title: '数字孪生', lead: '数字孪生把真实平台及其设备映射到数字空间，集中呈现结构、能源、水资源和环境信息。', points: ['查看平台和设备状态', '查询实时及历史数据', '支持异常分析和运维决策'], note: '展示原则：明确区分设计值、调试值和正式运行数据。' },
    { eyebrow: '06 / TEACHING & EXHIBITION', title: '教学与展示', lead: '平台把科研试验转化为可参与、可观察、可传播的教学与科普内容。', points: ['支持跨学科课程实践', '展示科研设备和阶段成果', '面向公众开展科普交流'], note: '代表内容：机器人、光伏能源、结构监测、水资源循环和海洋生态观测。' }
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
    toggle.innerHTML = '<span class="menu-toggle-icon" aria-hidden="true"><i></i><i></i><i></i></span><b>目录</b>';
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
    const projectName = heroContent.querySelector('.eyebrow span');
    if (projectName) projectName.textContent = 'FLOATING PLATFORM';
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
      <div class="highlight-heading highlight-heading-static">
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

  function openCapabilityDialog(card, detail, index) {
    if (document.querySelector('.lightbox')) return;
    const overlay = document.createElement('div');
    overlay.className = 'lightbox capability-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', detail.title);
    overlay.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="关闭能力介绍">×</button>
      <div class="lightbox-panel capability-dialog-panel">
        <div class="capability-dialog-visual" aria-hidden="true"><span>${String(index + 1).padStart(2, '0')}</span><strong>${detail.title}</strong><i></i><i></i><i></i></div>
        <div class="lightbox-copy capability-dialog-copy">
          <p class="section-index">${detail.eyebrow}</p><h2>${detail.title}</h2><p>${detail.lead}</p>
          <ul>${detail.points.map(point => `<li>${point}</li>`).join('')}</ul><aside>${detail.note}</aside>
          <button type="button">返回页面</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    const closeButton = overlay.querySelector('.lightbox-close');
    const backButton = overlay.querySelector('.lightbox-copy > button');
    const close = () => { overlay.remove(); document.body.style.overflow = ''; document.removeEventListener('keydown', onKeydown); card.focus({ preventScroll: true }); };
    const onKeydown = event => { if (event.key === 'Escape') close(); };
    closeButton.addEventListener('click', close);
    backButton.addEventListener('click', close);
    overlay.addEventListener('mousedown', event => { if (event.target === overlay) close(); });
    document.addEventListener('keydown', onKeydown);
    closeButton.focus();
  }

  function installCapabilityDialogs() {
    const section = document.querySelector('.capabilities');
    if (!section) return;
    section.id = 'capabilities';
    [...section.querySelectorAll('.capability-card')].forEach((card, index) => {
      if (card.dataset.dialogReady === 'true' || !capabilityDetails[index]) return;
      card.dataset.dialogReady = 'true';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `查看${capabilityDetails[index].title}介绍`);
      const action = document.createElement('b');
      action.className = 'capability-action';
      action.textContent = '点击查看详情 ↗︎';
      card.appendChild(action);
      card.addEventListener('click', () => openCapabilityDialog(card, capabilityDetails[index], index));
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCapabilityDialog(card, capabilityDetails[index], index); }
      });
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

  function addProjectCredits() {
    const shell = document.querySelector('.site-shell');
    const footer = shell?.querySelector(':scope > footer');
    if (!shell || !footer || shell.querySelector(':scope > .project-credits')) return;

    const section = document.createElement('section');
    section.className = 'project-credits';
    section.setAttribute('aria-label', '\u9879\u76ee\u53c2\u5efa\u5355\u4f4d');
    section.innerHTML = `
      <div class="project-credit-list">
        <article class="project-credit-item">
          <span class="project-credit-logo project-credit-logo-hkust" aria-hidden="true">
            <img src="./media/partner-hkust.png" alt=""/>
          </span>
          <div class="project-credit-copy">
            <p><strong>\u9879\u76ee\u4e1a\u4e3b</strong><span>PROJECT CLIENT</span></p>
            <h2>\u9999\u6e2f\u79d1\u6280\u5927\u5b66\uff08\u5e7f\u5dde\uff09</h2>
          </div>
        </article>
        <article class="project-credit-item">
          <span class="project-credit-logo project-credit-logo-epc" aria-hidden="true">
            <img src="./media/partner-fhd.png" alt=""/>
          </span>
          <div class="project-credit-copy">
            <p><strong>\u5de5\u7a0b\u603b\u627f\u5305</strong><span>EPC CONTRACTOR</span></p>
            <h2>\u4e2d\u4ea4\u7b2c\u56db\u822a\u52a1\u5de5\u7a0b\u52d8\u5bdf\u8bbe\u8ba1\u9662\u6709\u9650\u516c\u53f8</h2>
          </div>
        </article>
        <article class="project-credit-item">
          <span class="project-credit-logo project-credit-logo-construction" aria-hidden="true">
            <img src="./media/partner-crec.png" alt=""/>
          </span>
          <div class="project-credit-copy">
            <p><strong>\u65bd\u5de5\u627f\u5efa</strong><span>CONSTRUCTION CONTRACTOR</span></p>
            <h2>\u4e2d\u94c1\u5e7f\u5dde\u5de5\u7a0b\u5c40\u96c6\u56e2\u6709\u9650\u516c\u53f8</h2>
          </div>
        </article>
      </div>`;
    shell.insertBefore(section, footer);
  }

  function install() {
    enhanceNavigation();
    enhanceHero();
    addHighlights();
    updatePlatformCopy();
    installCapabilityDialogs();
    prioritizeEnergySystem();
    ensureSectionIds();
    reorderStory();
    addProjectCredits();
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
