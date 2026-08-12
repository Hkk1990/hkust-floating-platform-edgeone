import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const capabilities = [
  {
    slug: "interdisciplinary-research",
    no: "01",
    title: "跨学科科研",
    eyebrow: "INTERDISCIPLINARY RESEARCH",
    lead: "平台面向海洋工程、能源、环境、材料、人工智能和未来人居等方向，为校内科研课题提供真实水域中的试验与验证条件。",
    points: ["支持机器人、海洋观测和结构监测", "支持能源、材料和水资源研究", "促进不同课题共享空间、设备与数据"],
    noteLabel: "代表内容",
    note: "已汇集浮式结构、机器人、微电网、生态观测等多类科研项目。",
    image: "meeting-research.webp",
    imageAlt: "建设与跨学科科研融合推进会现场"
  },
  {
    slug: "solar-energy",
    no: "02",
    title: "光伏与能源",
    eyebrow: "SOLAR & ENERGY",
    lead: "平台将光伏发电、储能、配电和用能管理结合起来，探索浮式建筑的清洁能源利用方式。",
    points: ["建筑表皮集成多种光伏材料", "储能系统调节发电与用电", "智慧系统监测能源运行状态"],
    noteLabel: "设计测算",
    note: "光伏发电玻璃面积约640㎡，能源自持率约90.82%。",
    image: "bipv-glass.webp",
    imageAlt: "光伏发电玻璃分布效果图"
  },
  {
    slug: "water-cycle",
    no: "03",
    title: "水资源循环",
    eyebrow: "WATER CYCLE",
    lead: "平台通过雨水收集、灰水处理和中水回用，减少日常运行对外部水资源的依赖。",
    points: ["收集屋面雨水", "处理生活灰水", "回用于冲厕和清洁"],
    noteLabel: "设计工况",
    note: "最高日用水量约4m³，其中约2m³可通过中水回用满足。",
    image: "ibms-water.webp",
    imageAlt: "水资源循环管理系统界面"
  },
  {
    slug: "structural-sensing",
    no: "04",
    title: "结构感知",
    eyebrow: "STRUCTURAL SENSING",
    lead: "平台通过传感器持续监测浮体、上部建筑、锚泊系统及周边水环境的运行状态。",
    points: ["监测位移、姿态和振动", "监测风、水位和波浪", "对异常状态进行分级预警"],
    noteLabel: "科研价值",
    note: "将设计计算与实际监测数据结合，为浮式结构安全研究提供依据。",
    image: "platform-top.webp",
    imageAlt: "浮式微平台顶视效果图"
  },
  {
    slug: "digital-twin",
    no: "05",
    title: "数字孪生",
    eyebrow: "DIGITAL TWIN",
    lead: "数字孪生把真实平台及其设备映射到数字空间，集中呈现结构、能源、水资源和环境信息。",
    points: ["查看平台和设备状态", "查询实时及历史数据", "支持异常分析和运维决策"],
    noteLabel: "展示原则",
    note: "明确区分设计值、调试值和正式运行数据。",
    image: "ibms-research.webp",
    imageAlt: "科研教学展示与运维系统界面"
  },
  {
    slug: "teaching-display",
    no: "06",
    title: "教学与展示",
    eyebrow: "TEACHING & EXHIBITION",
    lead: "平台把科研试验转化为可参与、可观察、可传播的教学与科普内容。",
    points: ["支持跨学科课程实践", "展示科研设备和阶段成果", "面向公众开展科普交流"],
    noteLabel: "代表内容",
    note: "机器人、光伏能源、结构监测、水资源循环和海洋生态观测。",
    image: "interior-meeting.webp",
    imageAlt: "浮式微平台内部交流空间效果图"
  }
];

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function renderPage(item, index, assetVersion) {
  const previous = capabilities[(index + capabilities.length - 1) % capabilities.length];
  const next = capabilities[(index + 1) % capabilities.length];
  const cards = capabilities.map(capability => `
    <a class="capability-mini${capability.slug === item.slug ? " is-current" : ""}" href="./${capability.slug}.html">
      <span>${capability.no}</span><strong>${escapeHtml(capability.title)}</strong>
    </a>`).join("");
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${escapeHtml(item.title)}｜香港科技大学（广州）浮式微平台</title>
  <meta name="description" content="${escapeHtml(item.lead)}"/>
  <link rel="icon" href="../favicon.svg"/>
  <link rel="stylesheet" href="../capability-page.css?v=${assetVersion}"/>
</head>
<body>
  <header class="detail-topbar">
    <a class="detail-brand" href="../index.html#top" aria-label="返回网站首页">
      <span>FP</span><strong>FLOATING PLATFORM<small>HKUST(GZ) · CAMPUS RESEARCH</small></strong>
    </a>
    <nav aria-label="二级页面导航"><a href="../index.html#capabilities">六大科研能力</a><a href="../index.html#systems">智慧系统</a><a href="../index.html#interiors">空间体验</a></nav>
    <span class="detail-status"><i></i>施工建设中</span>
  </header>
  <main>
    <section class="detail-hero">
      <div class="detail-copy">
        <a class="back-link" href="../index.html#capabilities">← 返回六大科研能力</a>
        <p class="detail-index">${item.no} / ${item.eyebrow}</p>
        <h1>${escapeHtml(item.title)}</h1>
        <p class="detail-lead">${escapeHtml(item.lead)}</p>
        <ul>${item.points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      </div>
      <figure class="detail-media"><img src="../media/${item.image}" alt="${escapeHtml(item.imageAlt)}"/><figcaption>${item.no} · ${escapeHtml(item.title)}</figcaption></figure>
    </section>
    <section class="detail-note"><p>${escapeHtml(item.noteLabel)}</p><strong>${escapeHtml(item.note)}</strong></section>
    <section class="capability-directory" aria-label="六大科研能力目录">${cards}</section>
    <nav class="page-step" aria-label="上一项与下一项">
      <a href="./${previous.slug}.html"><small>上一项</small><strong>${previous.no} ${escapeHtml(previous.title)}</strong></a>
      <a href="./${next.slug}.html"><small>下一项</small><strong>${next.no} ${escapeHtml(next.title)}</strong></a>
    </nav>
  </main>
  <footer><p>香港科技大学（广州）校园浮式多功能试验及环境可持续微平台</p><a href="../index.html">返回首页 ↑</a></footer>
</body>
</html>`;
}

export function buildCapabilityPages(output, assetVersion) {
  const target = resolve(output, "capabilities");
  mkdirSync(target, { recursive: true });
  capabilities.forEach((item, index) => {
    writeFileSync(resolve(target, `${item.slug}.html`), renderPage(item, index, assetVersion), "utf8");
  });
}
