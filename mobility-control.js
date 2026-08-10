(() => {
  const MOBILE_QUERY = '(max-width: 680px)';
  let activeStage = null;
  let activeRender = null;

  function installManualControl() {
    const stage = document.querySelector('.mobility-stage');
    if (!stage) return false;
    if (stage.dataset.manualReady === 'true' && stage.querySelector('.mobility-slider')) {
      if (activeStage === stage && activeRender) activeRender();
      return true;
    }
    if (stage.dataset.manualReady === 'true') delete stage.dataset.manualReady;

    const switchHost = stage.querySelector('.mode-switch');
    const status = stage.querySelector('.hud-status strong');
    const readout = stage.querySelector('.hud-readout strong');
    const model = stage.querySelector('.moving-complex');
    const bridge = stage.querySelector('.bridge-unit');
    const anchorPoints = {
      left: stage.querySelector('.anchor-left'),
      right: stage.querySelector('.anchor-right'),
      bottom: stage.querySelector('.anchor-bottom')
    };
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

    function setText(element, text) {
      if (element && element.textContent !== text) element.textContent = text;
    }

    function connectChain(element, anchor, targetX, targetY, stageRect) {
      if (!element || !anchor) return;
      const anchorRect = anchor.getBoundingClientRect();
      const originX = anchorRect.left + anchorRect.width / 2 - stageRect.left;
      const originY = anchorRect.top + anchorRect.height / 2 - stageRect.top;
      const deltaX = targetX - originX;
      const deltaY = targetY - originY;
      element.style.left = `${originX.toFixed(2)}px`;
      element.style.top = `${originY.toFixed(2)}px`;
      element.style.width = `${Math.hypot(deltaX, deltaY).toFixed(2)}px`;
      element.style.transform = `rotate(${(Math.atan2(deltaY, deltaX) * 180 / Math.PI).toFixed(2)}deg)`;
    }

    function render(rawValue) {
      const value = Math.max(0, Math.min(100, Number(rawValue) || 0));
      const progress = value / 100;
      const isMobile = mobileMedia.matches;
      const stageRect = stage.getBoundingClientRect();
      const stageWidth = stage.clientWidth;
      const stageHeight = stage.clientHeight;
      const modelSize = stageWidth * (isMobile ? 0.44 : 0.26);
      const centerX = stageWidth * (isMobile ? 0.58 : 0.50) + stageWidth * (isMobile ? -0.34 : -0.27) * progress;
      const centerY = stageHeight * (isMobile ? 0.42 : 0.44) + stageWidth * (isMobile ? 0.387 : 0.169) * progress;
      stage.classList.remove('is-flood');

      // Desktop target: 23% / 74%. Mobile target: 24% / 71%, leaving the complete model visible.
      const deltaX = (isMobile ? -34 : -27) * progress;
      const deltaY = (isMobile ? 38.7 : 16.9) * progress;
      stage.style.setProperty('--move-x', `${deltaX.toFixed(3)}cqw`);
      stage.style.setProperty('--move-y', `${deltaY.toFixed(3)}cqw`);
      stage.style.setProperty('--ghost-opacity', '0');
      stage.style.setProperty('--detach-opacity', String(Math.max(0, (progress - 0.55) / 0.45).toFixed(3)));
      slider.style.setProperty('--slider-fill', `${value}%`);
      slider.setAttribute('aria-valuetext', value === 0 ? '常态泊位' : value === 100 ? '行洪临时锚位' : `已移动百分之${value}`);
      setText(valueLabel, `${value}%`);

      connectChain(chains.left, anchorPoints.left, centerX - modelSize * 0.43, centerY - modelSize * 0.12, stageRect);
      connectChain(chains.right, anchorPoints.right, centerX + modelSize * 0.43, centerY - modelSize * 0.13, stageRect);
      connectChain(chains.bottom, anchorPoints.bottom, centerX - modelSize * 0.08, centerY + modelSize * 0.36, stageRect);

      if (bridge) {
        const pivotX = stageWidth * (isMobile ? 0.72 : 0.59);
        const pivotY = stageHeight * (isMobile ? 0.985 : 0.975);
        const jointX = stageWidth * (isMobile ? 0.58 : 0.50) + modelSize * 0.18;
        const jointY = stageHeight * (isMobile ? 0.42 : 0.44) + modelSize * 0.37;
        const bridgeDeltaX = jointX - pivotX;
        const bridgeDeltaY = jointY - pivotY;
        const bridgeLength = Math.hypot(bridgeDeltaX, bridgeDeltaY);
        const connectedAngle = Math.atan2(bridgeDeltaX, -bridgeDeltaY) * 180 / Math.PI;
        const bridgeProgress = 1 - Math.pow(1 - progress, 2.4);
        const bridgeAngle = connectedAngle - 80 * bridgeProgress;
        bridge.style.setProperty('height', `${bridgeLength.toFixed(2)}px`, 'important');
        stage.style.setProperty('--bridge-angle', `${bridgeAngle.toFixed(2)}deg`);
      }

      if (value === 0) {
        setText(status, '常态运营');
        setText(readout, '引桥连接 · 稳定系泊');
      } else if (value === 100) {
        setText(status, '行洪避让');
        setText(readout, '临时锚位 · 3条锚链受力');
      } else {
        setText(status, '人工拖移中');
        setText(readout, `整体浮体移动 ${value}%`);
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
    activeStage = stage;
    activeRender = () => render(slider.value);
    render(0);
    return true;
  }

  function boot(attempt = 0) {
    if (installManualControl()) return;
    if (attempt < 40) window.setTimeout(() => boot(attempt + 1), 100);
  }

  function start() {
    document.querySelectorAll('[data-reveal]').forEach(element => {
      element.classList.add('is-visible');
    });

    window.setTimeout(boot, 650);
    window.addEventListener('load', () => window.setTimeout(boot, 150), { once: true });

    // React may finish hydration after this script. Reinstall once if that render replaces the control.
    let recoveryTimer = 0;
    const observer = new MutationObserver(() => {
      window.clearTimeout(recoveryTimer);
      recoveryTimer = window.setTimeout(() => {
        const stage = document.querySelector('.mobility-stage');
        if (!stage) return;
        if (!stage.querySelector('.mobility-slider')) installManualControl();
        else if (activeStage === stage && activeRender) activeRender();
      }, 80);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
