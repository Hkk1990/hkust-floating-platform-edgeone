(() => {
  const MOBILE_QUERY = '(max-width: 680px)';

  function installManualControl() {
    const stage = document.querySelector('.mobility-stage');
    if (!stage) return false;
    if (stage.dataset.manualReady === 'true' && stage.querySelector('.mobility-slider')) return true;
    if (stage.dataset.manualReady === 'true') delete stage.dataset.manualReady;

    const switchHost = stage.querySelector('.mode-switch');
    const status = stage.querySelector('.hud-status strong');
    const readout = stage.querySelector('.hud-readout strong');
    const model = stage.querySelector('.moving-complex');
    const chains = {
      left: stage.querySelector('.chain-left'),
      right: stage.querySelector('.chain-right'),
      bottom: stage.querySelector('.chain-bottom')
    };
    if (!switchHost || !model) return false;

    stage.dataset.manualReady = 'true';
    stage.classList.remove('is-flood');
    switchHost.setAttribute('aria-label', '手动拖动浮体位置');

    const control = document.createElement('label');
    control.className = 'mobility-slider-wrap';
    control.innerHTML = [
      '<span>常态泊位</span>',
      '<input class="mobility-slider" type="range" min="0" max="100" value="0" step="1" aria-label="拖动整个浮体至行洪临时锚位">',
      '<strong aria-hidden="true">0%</strong>'
    ].join('');
    switchHost.appendChild(control);

    const slider = control.querySelector('.mobility-slider');
    const valueLabel = control.querySelector('strong');
    const mobileMedia = window.matchMedia(MOBILE_QUERY);
    let pendingValue = 0;
    let frame = 0;

    function setChainTransform(element, width, startScale, endScale, startAngle, endAngle, progress) {
      if (!element) return;
      const scale = startScale + (endScale - startScale) * progress;
      const angle = startAngle + (endAngle - startAngle) * progress;
      element.style.width = width;
      element.style.transform = `rotate(${angle.toFixed(2)}deg) scaleX(${scale.toFixed(3)})`;
    }

    function render(rawValue) {
      const value = Math.max(0, Math.min(100, Number(rawValue) || 0));
      const progress = value / 100;
      const isMobile = mobileMedia.matches;

      // Desktop target: 23% / 74%. Mobile target: 24% / 71%, leaving the complete model visible.
      const deltaX = (isMobile ? -34 : -27) * progress;
      const deltaY = (isMobile ? 38.7 : 16.9) * progress;
      stage.style.setProperty('--move-x', `${deltaX.toFixed(3)}cqw`);
      stage.style.setProperty('--move-y', `${deltaY.toFixed(3)}cqw`);
      stage.style.setProperty('--bridge-angle', `${(-10 + 87 * progress).toFixed(2)}deg`);
      stage.style.setProperty('--bridge-shift', `${(16 * progress).toFixed(2)}px`);
      stage.style.setProperty('--ghost-opacity', String((progress * 0.88).toFixed(3)));
      stage.style.setProperty('--detach-opacity', String(Math.max(0, (progress - 0.55) / 0.45).toFixed(3)));
      slider.style.setProperty('--slider-fill', `${value}%`);
      slider.setAttribute('aria-valuetext', value === 0 ? '常态泊位' : value === 100 ? '行洪临时锚位' : `已移动百分之${value}`);
      valueLabel.textContent = `${value}%`;

      if (isMobile) {
        setChainTransform(chains.left, '55%', 1, 0.80, 12, 62, progress);
        setChainTransform(chains.right, '88%', 0.432, 1, 162, 151, progress);
        setChainTransform(chains.bottom, '55%', 1, 0.873, -92, -151, progress);
      } else {
        setChainTransform(chains.left, '40%', 1, 0.70, 12, 65, progress);
        setChainTransform(chains.right, '68%', 0.529, 1, 163, 156, progress);
        setChainTransform(chains.bottom, '33%', 0.909, 1, -96, -158, progress);
      }

      if (value === 0) {
        if (status) status.textContent = '常态运营';
        if (readout) readout.textContent = '引桥连接 · 稳定系泊';
      } else if (value === 100) {
        if (status) status.textContent = '行洪避让';
        if (readout) readout.textContent = '临时锚位 · 3条锚链受力';
      } else {
        if (status) status.textContent = '人工拖移中';
        if (readout) readout.textContent = `整体浮体移动 ${value}%`;
      }
    }

    function scheduleRender(value) {
      pendingValue = value;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        render(pendingValue);
      });
    }

    slider.addEventListener('input', event => scheduleRender(event.currentTarget.value), { passive: true });
    slider.addEventListener('change', event => render(event.currentTarget.value));
    mobileMedia.addEventListener?.('change', () => render(slider.value));
    render(0);
    return true;
  }

  function boot(attempt = 0) {
    if (installManualControl()) return;
    if (attempt < 40) window.setTimeout(() => boot(attempt + 1), 100);
  }

  function start() {
    window.setTimeout(boot, 650);
    window.addEventListener('load', () => window.setTimeout(boot, 150), { once: true });

    // React may finish hydration after this script. Reinstall once if that render replaces the control.
    let recoveryTimer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(recoveryTimer);
      recoveryTimer = window.setTimeout(() => {
        const stage = document.querySelector('.mobility-stage');
        if (stage && !stage.querySelector('.mobility-slider')) installManualControl();
      }, 80);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 12000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
