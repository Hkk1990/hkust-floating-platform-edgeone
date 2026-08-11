(() => {
  const systems = [
    {
      id: 'energy',
      title: '能源管理与配电子系统',
      shortTitle: '能源管理',
      file: 'ibms-energy.webp',
      summary: '覆盖光伏发电、储能状态、配电回路与岸电交互，实现能源状态实时监测与智能调度',
      groups: [
        ['光伏与储能', '实时功率与累计电量', 'SOC / SOH / 温度', '峰谷充放电策略'],
        ['配电监测', '回路电压、电流与功率', '分合闸状态与故障报警', '灯光与窗帘联动'],
        ['岸电交互', '并网 / 离网功率', '双向电量计量', '溢流保护']
      ]
    },
    {
      id: 'research',
      title: '科研教学展示与运维系统',
      shortTitle: '科研与运维',
      file: 'ibms-research.webp',
      summary: '汇聚运营、数字孪生、水环境监测与无源信息感知，形成面向科研、教学和运维的一体化界面',
      groups: [
        ['运维系统', '多媒体联动展示', '客房实时状态', '办公预约记录'],
        ['数字孪生', '水上水下巡游', '浮体内部巡游', '周边水域流场可视化'],
        ['水环境监测', 'CO₂与pH值', '水温监测', '叶绿素含量'],
        ['无源信息感知', '智能地垫', '动能开关', '智能浮标']
      ]
    },
    {
      id: 'water',
      title: '水资源循环管理子系统',
      shortTitle: '水资源循环',
      file: 'ibms-water.webp',
      summary: '对供水、雨水回收、中水回用与消防给水进行持续监测，支持用水分析与运行优化',
      groups: [
        ['供水监测', '实时压力与流量', '用水模式分析', '优化用水建议'],
        ['雨水与中水', '调蓄池实时液位', '高低位报警', '累计与瞬时回用流量'],
        ['消防给水', '消防供水系统压力', '关键状态监测', '异常信息提示']
      ]
    }
  ];

  const details = {
    'platform-aerial.webp': ['项目整体鸟瞰', 'PROJECT OVERVIEW', '平台布置于校园一期与二期交界处的开放水域，以引桥连接岸线，在校园景观、科研设施和水域运行之间形成新的公共节点'],
    'meeting-kickoff.webp': ['施工启动及协调会', '广州 · 2026.08.06', '校方相关部门与施工、监理等单位代表参会，共同部署施工阶段重点工作，标志着项目正式进入建设阶段'],
    'platform-front.webp': ['浮式科研平台', 'RESEARCH PLATFORM', '正八边形浮体基座承托球形科研空间，并通过系泊系统和2米宽引桥与岸线连接。平台同时预留无人机、水下机器人及多类科研设备接口'],
    'bipv-glass.webp': ['光伏建筑一体化', 'BIPV · ENERGY SELF-SUFFICIENCY', '球体表皮、开窗位置、浮体外围和玻璃栏杆共同参与光伏发电。方案测算光伏发电玻璃面积约640平方米，全年发电量约61,000千瓦时，能源自持率约90.82%', [['光伏发电玻璃面积', '640㎡'], ['全年发电量', '61,000kWh'], ['能源自持率', '90.82%']]],
    'meeting-research.webp': ['建设与跨学科科研融合推进会', '2026.01.22 · 约50人参会', '校内多个学域的教授、博士、科研团队及职能部门代表参会，建设团队汇报施工图初步成果，并逐项回应科研需求'],
    'exchange-01.webp': ['跨学科方案交流', '多方协同', '围绕项目功能、科研接口与建设条件开展集中汇报和专业交流'],
    'exchange-02.webp': ['设计成果汇报', '方案深化', '通过可视化方案讲解，逐项回应科研需求并推进设计成果深化'],
    'exchange-03.webp': ['建设协调研讨', '实施准备', '校方、科研团队及建设参与方共同研判重点问题，为工程实施完善条件'],
    'platform-side.webp': ['轻盈、稳固、可连接', '平台侧视', '正八边形浮体基座承托球形建筑主体，并通过系泊与引桥系统实现稳定运行和便捷通行'],
    'campus-aerial.webp': ['校园中的水上科研节点', '校园关系鸟瞰', '项目以较小尺度嵌入校园水系，串联科研、教学、展示与未来水上人居技术验证'],
    'interior-lobby.webp': ['接待大厅', '一层 · 展示交流', '设置大屏展示与互动设备，面向科研交流、绿色建筑科普和公众参观'],
    'interior-living.webp': ['餐客厅', '二层 · 复合空间', '兼顾讨论、体验与日常使用，形成开放的学术交流和人居体验场景'],
    'interior-room.webp': ['试验住房', '二层 · 人居验证', '用于验证净水、照明、通风与智能环境调节等可持续水上居住方案'],
    'interior-cafe.webp': ['咖啡厅', '二层 · 生活功能', '将咖啡、休闲和交流功能与绿色回收系统结合，构成自循环生活微场景'],
    'interior-stair.webp': ['旋转楼梯', '垂直交通 · 空间串联', '串联展示、科研与生活空间，强化球形建筑内部连续、通透的空间体验'],
    'interior-meeting.webp': ['会客室', '二层 · 学术交流', '面向学术交流与公众接待，结合落地景观窗和灵活会客设施形成开放空间']
  };

  function filename(src) {
    try {
      return new URL(src, document.baseURI).pathname.split('/').pop();
    } catch {
      return src.split('/').pop();
    }
  }

  function installSystems() {
    const tabs = document.querySelector('.system-tabs');
    const panel = document.querySelector('.system-active');
    if (!tabs || !panel) return;
    const buttons = [...tabs.querySelectorAll('button')];
    const buttonById = new Map(buttons.map(button => {
      const file = filename(button.querySelector('img')?.src || '');
      const system = systems.find(item => item.file === file);
      return [system?.id, button];
    }).filter(([id]) => id));

    systems.forEach(system => {
      const button = buttonById.get(system.id);
      if (!button) return;
      button.dataset.systemId = system.id;
      button.querySelector('span').textContent = system.shortTitle;
      tabs.appendChild(button);
    });

    const screen = panel.querySelector('.console-screen img');
    const heading = panel.querySelector('.system-info h3');
    const summary = panel.querySelector('.system-info > p:not(.system-kicker)');
    const metrics = panel.querySelector('.system-metrics');

    function selectSystem(id, focus = false) {
      const system = systems.find(item => item.id === id) || systems[0];
      tabs.querySelectorAll('button').forEach(button => {
        const selected = button.dataset.systemId === system.id;
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
        if (selected && focus) button.focus();
      });
      const activeButton = buttonById.get(system.id);
      const source = activeButton?.querySelector('img')?.src;
      if (screen && source) {
        screen.src = source;
        screen.alt = `${system.title}界面`;
      }
      if (heading) heading.textContent = system.title;
      if (summary) summary.textContent = system.summary;
      if (metrics) {
        metrics.replaceChildren(...system.groups.map(([title, ...items]) => {
          const section = document.createElement('section');
          const strong = document.createElement('strong');
          strong.textContent = title;
          section.append(strong, ...items.map(item => {
            const span = document.createElement('span');
            span.textContent = item;
            return span;
          }));
          return section;
        }));
      }
    }

    tabs.addEventListener('click', event => {
      const button = event.target.closest('button[data-system-id]');
      if (button) selectSystem(button.dataset.systemId);
    });
    tabs.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const ordered = systems.map(item => item.id);
      const current = ordered.indexOf(document.activeElement?.dataset.systemId);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? ordered.length - 1 :
        (current + (event.key === 'ArrowRight' ? 1 : -1) + ordered.length) % ordered.length;
      selectSystem(ordered[next], true);
    });
    selectSystem('energy');
  }

  function openLightbox(button) {
    if (document.querySelector('.lightbox')) return;
    const sourceImage = button.querySelector('img');
    if (!sourceImage) return;
    const file = filename(sourceImage.src);
    const fallbackTitle = sourceImage.alt || button.getAttribute('aria-label') || '项目图片';
    const [title, eyebrow, text, stats] = details[file] || [fallbackTitle, 'PROJECT DETAIL', '点击图片可查看项目相关视觉资料与空间信息'];
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title);

    const close = document.createElement('button');
    close.className = 'lightbox-close';
    close.type = 'button';
    close.setAttribute('aria-label', '关闭图片介绍');
    close.textContent = '×';

    const panel = document.createElement('div');
    panel.className = 'lightbox-panel';
    const imageWrap = document.createElement('div');
    imageWrap.className = 'lightbox-image';
    const image = document.createElement('img');
    image.src = sourceImage.src;
    image.alt = title;
    imageWrap.appendChild(image);

    const copy = document.createElement('div');
    copy.className = 'lightbox-copy';
    const kicker = document.createElement('p');
    kicker.className = 'section-index';
    kicker.textContent = eyebrow;
    const heading = document.createElement('h2');
    heading.textContent = title;
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    copy.append(kicker, heading, paragraph);

    if (stats) {
      const statsBox = document.createElement('div');
      statsBox.className = 'lightbox-stats';
      stats.forEach(([label, value]) => {
        const item = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = value;
        const span = document.createElement('span');
        span.textContent = label;
        item.append(strong, span);
        statsBox.appendChild(item);
      });
      copy.appendChild(statsBox);
    }

    const back = document.createElement('button');
    back.type = 'button';
    back.textContent = '返回页面';
    copy.appendChild(back);
    panel.append(imageWrap, copy);
    overlay.append(close, panel);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const closeLightbox = () => {
      overlay.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
      button.focus({ preventScroll: true });
    };
    const onKeydown = event => {
      if (event.key === 'Escape') closeLightbox();
    };
    close.addEventListener('click', closeLightbox);
    back.addEventListener('click', closeLightbox);
    overlay.addEventListener('mousedown', event => {
      if (event.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', onKeydown);
    close.focus();
  }

  function installLightboxes() {
    document.querySelectorAll('.media-button').forEach(button => {
      if (button.dataset.lightboxFallback === 'true') return;
      button.dataset.lightboxFallback = 'true';
      button.addEventListener('click', () => {
        // Let the hydrated React handler render its richer dialog first. The
        // standalone fallback only runs when that handler is unavailable.
        window.setTimeout(() => {
          if (!document.querySelector('.lightbox')) openLightbox(button);
        }, 0);
      });
    });
  }

  function install() {
    installSystems();
    installLightboxes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
