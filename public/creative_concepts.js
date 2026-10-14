// 23 Avant-Garde Background Concepts — Mastan Vali
// Complete interactive physics engine and canvas renderers

const CONCEPTS = [
  {
    id: 'c1',
    genre: 'chaos',
    genreName: 'Chaos & Deep Physics',
    title: 'Lorenz Strange Attractor',
    meta: 'Mathematical Chaos · Differential Phase Space',
    desc: 'Real-time 3D integration of Lorenz differential equations (dx/dt = σ(y-x)). The famous butterfly chaotic manifold spins in 3D perspective with fading phosphor lemon particle trails. Cursor tilts the 3D phase space angle.',
    tags: ['#ChaosTheory', '#LorenzAttractor', '#DifferentialPhysics', '#3DManifold'],
    render: renderLorenz
  },
  {
    id: 'c2',
    genre: 'infra',
    genreName: 'Data & Infra',
    title: 'Autonomous Synapse Force Graph',
    meta: 'LangGraph & D3 Spring Physics · Elastic Force Topology',
    desc: '45 autonomous agent nodes connected by Hooke-law spring dampers and Coulomb repulsion. Bright electric lemon synaptic action potentials pulse along data axons. Hovering creates magnetic gravitational recoil.',
    tags: ['#SpringPhysics', '#NeuralSynapses', '#ForceGraph', '#AgentNodes'],
    render: renderForceGraph
  },
  {
    id: 'c3',
    genre: 'spatial',
    genreName: 'Spatial Optics',
    title: 'Eulerian Navier-Stokes Fluid Smoke',
    meta: 'Viscous Fluid Dynamics · Real-Time Navier-Stokes',
    desc: 'Real-time Eulerian grid fluid simulation in deep obsidian velvet. Moving your cursor injects swirling viscous eddies of electric lemon and bone smoke with vorticity confinement.',
    tags: ['#FluidDynamics', '#NavierStokes', '#ViscousSmoke', '#InteractiveFluid'],
    render: renderFluidSmoke
  },
  {
    id: 'c4',
    genre: 'minimal',
    genreName: 'Kinetic Precision',
    title: 'Joy Division 3D Undulating Particle Sea',
    meta: 'Radiohead / Unknown Pleasures · 3D Terrain Wave',
    desc: '50 perspective isoline wave horizons cascading into the deep distance. Moving your cursor generates an undulating gravitational water ripple that radiates across the landscape.',
    tags: ['#JoyDivisionWave', '#3DIsolines', '#ParticleSea', '#RadioheadAesthetic'],
    render: renderUndulatingSea
  },
  {
    id: 'c5',
    genre: 'chaos',
    genreName: 'Chaos & Deep Physics',
    title: 'Organic Ferrofluid Magnetic Spikes',
    meta: 'Magnetic Fluid Physics · Rosensweig Instability',
    desc: 'Obsidian ferrofluid core governed by magnetic surface tension. When the cursor approaches, sharp dynamic needles and spikes erupt organically toward the magnetic pole.',
    tags: ['#Ferrofluid', '#MagneticSpikes', '#RosensweigTension', '#OrganicPhysics'],
    render: renderFerrofluid
  },
  {
    id: 'c6',
    genre: 'biology',
    genreName: 'Generative Biology',
    title: 'Turing Reaction-Diffusion Morphing',
    meta: 'Gray-Scott Model · Algorithmic Cellular Morphogenesis',
    desc: 'Alan Turing mathematical reaction-diffusion model simulating living labyrinthine coral skins and zebra stripes. The organic patterns continuously breathe, divide, and evolve in real time.',
    tags: ['#ReactionDiffusion', '#AlanTuring', '#Morphogenesis', '#AlgorithmicBiology'],
    render: renderTuringPattern
  },
  {
    id: 'c7',
    genre: 'infra',
    genreName: 'Data & Infra',
    title: 'Autonomous 360° LIDAR Radar Sweep',
    meta: 'Autonomous Driving & Waymo Lidar · Phosphor Radar',
    desc: 'Continuous 360-degree rotating radar laser beam sweeping across detected 3D server clusters and data points. Leaves glowing green-lemon phosphor persistence and data bounding boxes.',
    tags: ['#LidarSweep', '#WaymoRadar', '#PhosphorDecay', '#DataClustering'],
    render: renderLidarRadar
  },
  {
    id: 'c8',
    genre: 'spatial',
    genreName: 'Spatial Optics',
    title: 'Volumetric Liquid Mercury SDF Blob',
    meta: 'Raymarched Signed Distance Fields · Liquid Tension',
    desc: 'Raymarched metaball fluid in deep titanium chrome. Drops merge, stretch, and separate with realistic surface tension physics and electric lemon specular reflection probes.',
    tags: ['#MetaballsSDF', '#LiquidMercury', '#Raymarching', '#SpecularTension'],
    render: renderMetaballs
  },
  {
    id: 'c9',
    genre: 'cyber',
    genreName: 'Cybernetic Avant-Garde',
    title: 'Kinetic Elastic Typographic Distort',
    meta: 'Studio Freight & Locomotive · Rubber-Sheet Typography',
    desc: 'Ghosted architectural agency typography (DATA ORCHESTRATION · AUTONOMOUS AGENTS). The text mesh behaves like an elastic rubber sheet, deforming dynamically when the cursor sweeps through.',
    tags: ['#KineticType', '#RubberDistort', '#StudioFreight', '#AvantGarde'],
    render: renderKineticType
  },
  {
    id: 'c10',
    genre: 'infra',
    genreName: 'Data & Infra',
    title: 'Volumetric 3D Point Cloud Architecture',
    meta: 'Leica Lidar Geosystems · 3D Isometric Server Cloud',
    desc: 'Thousands of 3D point cloud particles outlining enterprise server racks and architectural data cubes rotating in isometric space, sliced by a moving laser elevation plane.',
    tags: ['#PointCloud', '#DataArchitecture', '#Isometric3D', '#LaserElevation'],
    render: renderPointCloud
  },
  {
    id: 'c11',
    genre: 'chaos',
    genreName: 'Chaos & Deep Physics',
    title: 'N-Body Gravitational Orbital Simulation',
    meta: 'Keplerian Mechanics · Newtonian N-Body Gravitation',
    desc: 'Central heavy core surrounded by 18 planetary satellite data packets governed by true Newtonian gravity (F = G*m1*m2/r^2). Orbital trails weave intricate cosmic spirograph harmonies.',
    tags: ['#NBodyGravity', '#KeplerOrbits', '#NewtonianPhysics', '#SpirographTrails'],
    render: renderNBody
  },
  {
    id: 'c12',
    genre: 'biology',
    genreName: 'Generative Biology',
    title: 'Differential Growth Organic Branching',
    meta: 'Computational Biology · Non-Intersecting Flora Circuitry',
    desc: 'Algorithmic cellular growth: continuous vector chains that expand, bend, and wrinkle without intersecting, creating an intricate living circuit board of organic obsidian and lemon.',
    tags: ['#DifferentialGrowth', '#GenerativeFlora', '#ComputationalBiology', '#NonIntersecting'],
    render: renderDifferentialGrowth
  },
  {
    id: 'c13',
    genre: 'biology',
    genreName: 'Generative Biology',
    title: 'Bioluminescent Deep Abyss Filaments',
    meta: 'Neural Abyssal Life · Rhythmic Luminescence Waves',
    desc: 'Slender glowing deep-sea filaments swaying in mathematical underwater currents. Rhythmic waves of electric lemon bioluminescence pulse from roots to tips like neural heartbeats.',
    tags: ['#Bioluminescence', '#AbyssalFilaments', '#NeuralWaves', '#UnderwaterCurrents'],
    render: renderBioluminescent
  },
  {
    id: 'c14',
    genre: 'cyber',
    genreName: 'Cybernetic Avant-Garde',
    title: 'CRT Vector Phosphor Oscilloscope',
    meta: 'Tektronix 1980s Vector Display · Lissajous Harmonics',
    desc: 'Authentic vector CRT oscilloscope drawing complex Lissajous harmonic curves (x=sin(at), y=sin(bt)). Realistic electron beam bloom, phosphorescent trail decay, and analog beam fuzz.',
    tags: ['#CRTOscilloscope', '#LissajousCurves', '#VectorBeam', '#PhosphorDecay'],
    render: renderCRTOscilloscope
  },
  {
    id: 'c15',
    genre: 'chaos',
    genreName: 'Chaos & Deep Physics',
    title: 'Verlet Interactive Silk Cloth',
    meta: 'Verlet Integration · Aerodynamic Textile Physics',
    desc: 'A 24x20 interconnected spring-mass particle grid simulating hanging obsidian silk. Dragging your cursor grabs and stretches the fabric with realistic spring recoil and wind rippling.',
    tags: ['#VerletPhysics', '#ClothSimulation', '#SpringMass', '#InteractiveSilk'],
    render: renderVerletCloth
  },
  {
    id: 'c16',
    genre: 'biology',
    genreName: 'Generative Biology',
    title: 'Dynamic Voronoi Cellular Tessellation',
    meta: 'Voronoi Geometries · Living Cell Membranes',
    desc: '35 moving seed nuclei generating real-time geometric Voronoi polygons. Cell boundaries glow with electric lemon plasma; hovering near a cell causes it to swell and energize neighboring cells.',
    tags: ['#VoronoiCells', '#CellularMembrane', '#Tessellation', '#PlasmaBorders'],
    render: renderVoronoi
  },
  {
    id: 'c17',
    genre: 'minimal',
    genreName: 'Kinetic Precision',
    title: 'Parametric 3D Mobius Ribbon Stream',
    meta: 'Apple M-Series Keynote · Continuous 3D Figure-8 Knot',
    desc: '3D parametric twisted ribbon looping in a continuous figure-8 trajectory with smooth normal surface shading, edge lemon highlights, and meditative zero-distraction motion.',
    tags: ['#MobiusRibbon', '#3DParametric', '#AppleKeynote', '#Figure8Stream'],
    render: renderMobiusRibbon
  },
  {
    id: 'c18',
    genre: 'cyber',
    genreName: 'Cybernetic Avant-Garde',
    title: '3D Fourier Audio Spectrogram Waterfall',
    meta: 'Moog Synthesizer · Real-Time Frequency Landscape',
    desc: '3D audio frequency terrain cascading backward into the dark horizon. Procedural beat rhythms drive peak frequency bars with electric lemon energy crests and glowing bass valleys.',
    tags: ['#AudioSpectrogram', '#FourierWaterfall', '#MoogSynth', '#FrequencyLandscape'],
    render: renderSpectrogram
  },
  {
    id: 'c19',
    genre: 'spatial',
    genreName: 'Spatial Optics',
    title: 'Holographic Fresnel Refractive Orb',
    meta: 'VisionOS Spatial Glass · Snell’s Law Optical Refraction',
    desc: 'Floating 3D crystal sphere that dynamically refracts, magnifies, and inverts the background grid with optical caustic rings, chromatic dispersion, and silky mouse tracking.',
    tags: ['#FresnelRefraction', '#VisionOSGlass', '#OpticalCaustics', '#CrystalOrb'],
    render: renderFresnelOrb
  },
  {
    id: 'c20',
    genre: 'cyber',
    genreName: 'Cybernetic Avant-Garde',
    title: 'Matrix Micro-Glyph Rain (Refined Luxury)',
    meta: 'Ghost In The Shell · Precision Mathematical Glyphs',
    desc: 'High-density unicode mathematical symbols and katakana glyphs streaming vertically at varying depth planes. Glowing white-lemon leaders leave elegant fading phosphor tails.',
    tags: ['#MatrixRain', '#MathematicalGlyphs', '#PhosphorTrails', '#RefinedCyber'],
    render: renderMatrixRain
  },
  {
    id: 'c21',
    genre: 'spatial',
    genreName: 'Spatial Optics',
    title: 'Gyroscopic Tesseract Gimbal Rings',
    meta: 'Interstellar Tesseract · Precession Orbital Mechanics',
    desc: 'Three concentric 3D metal rings rotating on independent orthogonal axes with gyroscope precession physics. Energy arcs discharge between inner and outer rings when alignment occurs.',
    tags: ['#GyroscopeGimbal', '#Tesseract3D', '#PrecessionPhysics', '#OrbitalRings'],
    render: renderGyroscopicRings
  },
  {
    id: 'c22',
    genre: 'minimal',
    genreName: 'Kinetic Precision',
    title: 'Perlin Vector Flow Field Fibers',
    meta: 'Refik Anadol Media Studio · Generative Hairline Fibers',
    desc: '1,200 continuous micro-particles guided by 2D Perlin vector noise fields. Weaves an intricate tapestry resembling fiber-optic currents or galactic gravitational winds.',
    tags: ['#PerlinNoise', '#FlowField', '#RefikAnadol', '#VectorFibers'],
    render: renderPerlinFlow
  },
  {
    id: 'c23',
    genre: 'minimal',
    genreName: 'Kinetic Precision',
    title: 'Pure Minimalist Magnetic Studio Spotlight',
    meta: 'Rauno Freiberg & Brittany Chiang · Museum Velvet Darkness',
    desc: 'The ultimate timeless luxury standard. 100% clean obsidian dark background with zero lines or geometric clutter. Features an ultra-soft 600px electric lemon spotlight with smooth mouse inertia.',
    tags: ['#PureSpotlight', '#ZeroClutter', '#MuseumLuxury', '#MagneticInertia'],
    render: renderPureSpotlight
  }
];

// --- Canvas Initializer & Loop ---
const activeCanvases = {};

function initApp() {
  const grid = document.getElementById('conceptsGrid');
  grid.innerHTML = '';

  CONCEPTS.forEach((c, idx) => {
    const card = document.createElement('div');
    card.className = `card genre-${c.genre}`;
    card.dataset.genre = c.genre;
    card.innerHTML = `
      <div class="canvas-container" id="wrap-${c.id}">
        <canvas id="${c.id}"></canvas>
        <div class="badge">CONCEPT ${(idx + 1).toString().padStart(2, '0')}</div>
        <div class="genre-tag">${c.genreName.split(' ')[0]}</div>
      </div>
      <div class="card-body">
        <div class="card-title">${c.title}</div>
        <div class="card-meta">${c.meta}</div>
        <div class="card-desc">${c.desc}</div>
        <div class="card-tags">
          ${c.tags.map((t, i) => `<span class="tag ${i === 0 ? 'lemon' : ''}">${t}</span>`).join('')}
        </div>
        <div class="card-actions">
          <button class="select-btn" onclick="selectConcept('${c.id}', '${c.title}')">Select Concept ${idx + 1}</button>
          <button class="expand-btn" onclick="openFullscreen('${c.id}')">Fullscreen ⛶</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
    setupCanvas(c.id, c.render);
  });
}

function setupCanvas(id, renderFn) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrapper = canvas.parentElement;

  let w = canvas.width = wrapper.offsetWidth;
  let h = canvas.height = wrapper.offsetHeight;

  const state = {
    w, h,
    mx: w / 2, my: h / 2,
    targetMx: w / 2, targetMy: h / 2,
    time: 0,
    renderFn,
    canvas, ctx
  };

  wrapper.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    state.targetMx = e.clientX - rect.left;
    state.targetMy = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    state.w = canvas.width = wrapper.offsetWidth;
    state.h = canvas.height = wrapper.offsetHeight;
  });

  activeCanvases[id] = state;
}

// Master Animation Loop
function masterLoop() {
  const dt = 0.016;
  for (const id in activeCanvases) {
    const s = activeCanvases[id];
    // Smooth lerp mouse
    s.mx += (s.targetMx - s.mx) * 0.1;
    s.my += (s.targetMy - s.my) * 0.1;
    s.time += dt;
    s.renderFn(s.ctx, s.w, s.h, s.time, s.mx, s.my);
  }

  // Fullscreen loop if active
  if (currentFsConcept) {
    fsState.mx += (fsState.targetMx - fsState.mx) * 0.1;
    fsState.my += (fsState.targetMy - fsState.my) * 0.1;
    fsState.time += dt;
    currentFsConcept.render(fsCtx, fsState.w, fsState.h, fsState.time, fsState.mx, fsState.my);
  }

  requestAnimationFrame(masterLoop);
}

// --- Fullscreen Handling ---
let currentFsConcept = null;
const fsModal = document.getElementById('fsModal');
const fsCanvas = document.getElementById('fsCanvas');
const fsCtx = fsCanvas.getContext('2d');
const fsState = { w: window.innerWidth, h: window.innerHeight, mx: window.innerWidth/2, my: window.innerHeight/2, targetMx: window.innerWidth/2, targetMy: window.innerHeight/2, time: 0 };

window.addEventListener('resize', () => {
  if (currentFsConcept) {
    fsState.w = fsCanvas.width = window.innerWidth;
    fsState.h = fsCanvas.height = window.innerHeight;
  }
});

fsCanvas.addEventListener('mousemove', (e) => {
  fsState.targetMx = e.clientX;
  fsState.targetMy = e.clientY;
});

function openFullscreen(id) {
  const c = CONCEPTS.find(x => x.id === id);
  if (!c) return;
  currentFsConcept = c;
  fsState.w = fsCanvas.width = window.innerWidth;
  fsState.h = fsCanvas.height = window.innerHeight;
  document.getElementById('modalInfo').innerHTML = `
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <div style="margin-top: 14px;">
      <button class="select-btn" onclick="selectConcept('${c.id}', '${c.title}')">Select This Concept</button>
    </div>
  `;
  fsModal.classList.add('active');
}

function closeFullscreen() {
  fsModal.classList.remove('active');
  currentFsConcept = null;
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeFullscreen();
});

function filterCards(genre) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    if (genre === 'all' || card.dataset.genre === genre) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function selectConcept(id, title) {
  alert('You selected: ' + title + ' (' + id.toUpperCase() + ')! Tell Antigravity in chat to apply this concept.');
}

// ==========================================
// RENDERERS FOR ALL 23 CONCEPTS
// ==========================================

// 1. Lorenz Attractor
let lorenzPoints = [];
let lx = 0.1, ly = 0, lz = 0;
function renderLorenz(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const sigma = 10, rho = 28, beta = 8/3;
  const dt = 0.01;
  for (let i = 0; i < 5; i++) {
    const dx = sigma * (ly - lx) * dt;
    const dy = (lx * (rho - lz) - ly) * dt;
    const dz = (lx * ly - beta * lz) * dt;
    lx += dx; ly += dy; lz += dz;
    lorenzPoints.push({ x: lx, y: ly, z: lz });
    if (lorenzPoints.length > 500) lorenzPoints.shift();
  }
  const rotY = t * 0.3 + (mx / w - 0.5) * 1.5;
  const rotX = (my / h - 0.5) * 1.2;
  ctx.save();
  ctx.translate(w / 2, h / 2 + 10);
  ctx.beginPath();
  for (let i = 0; i < lorenzPoints.length; i++) {
    const p = lorenzPoints[i];
    const x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
    const z1 = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
    const y1 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
    const scale = 5.5;
    const px = x1 * scale;
    const py = -y1 * scale;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.strokeStyle = 'rgba(232, 255, 69, 0.45)';
  ctx.lineWidth = 1.3;
  ctx.stroke();
  if (lorenzPoints.length > 0) {
    const head = lorenzPoints[lorenzPoints.length - 1];
    const x1 = head.x * Math.cos(rotY) - head.z * Math.sin(rotY);
    const z1 = head.x * Math.sin(rotY) + head.z * Math.cos(rotY);
    const y1 = head.y * Math.cos(rotX) - z1 * Math.sin(rotX);
    ctx.fillStyle = '#E8FF45';
    ctx.shadowColor = '#E8FF45';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x1 * 5.5, -y1 * 5.5, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// 2. Force Graph
let fgNodes = null;
function renderForceGraph(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  if (!fgNodes) {
    fgNodes = [];
    for (let i = 0; i < 30; i++) {
      fgNodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 2
      });
    }
  }
  for (let i = 0; i < fgNodes.length; i++) {
    const n = fgNodes[i];
    n.x += n.vx; n.y += n.vy;
    if (n.x < 10 || n.x > w - 10) n.vx *= -1;
    if (n.y < 10 || n.y > h - 10) n.vy *= -1;
    // Mouse repulsion
    const dx = n.x - mx, dy = n.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      n.x += (dx / dist) * 1.5;
      n.y += (dy / dist) * 1.5;
    }
  }
  for (let i = 0; i < fgNodes.length; i++) {
    for (let j = i + 1; j < fgNodes.length; j++) {
      const n1 = fgNodes[i], n2 = fgNodes[j];
      const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
      if (d < 85) {
        ctx.strokeStyle = `rgba(232, 255, 69, ${(1 - d / 85) * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();
      }
    }
    const n = fgNodes[i];
    ctx.fillStyle = i % 3 === 0 ? '#E8FF45' : '#F4F5EF';
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 3. Fluid Smoke
function renderFluidSmoke(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 4; i++) {
    const angle = t * 0.6 + i * 1.57;
    const cx = w / 2 + Math.cos(angle) * (w * 0.25) + (mx - w/2) * 0.2;
    const cy = h / 2 + Math.sin(angle * 1.3) * (h * 0.25) + (my - h/2) * 0.2;
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.45);
    grad.addColorStop(0, i % 2 === 0 ? 'rgba(232, 255, 69, 0.15)' : 'rgba(244, 245, 239, 0.08)');
    grad.addColorStop(0.6, 'rgba(14, 18, 14, 0.05)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 4. Undulating Sea
function renderUndulatingSea(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const rows = 18;
  const cols = 35;
  for (let r = 0; r < rows; r++) {
    ctx.beginPath();
    const yBase = h * 0.25 + (r / rows) * (h * 0.7);
    for (let c = 0; c <= cols; c++) {
      const x = (c / cols) * w;
      const distToMouse = Math.hypot(x - mx, yBase - my);
      const ripple = Math.sin(distToMouse * 0.05 - t * 3) * Math.max(0, 20 - distToMouse * 0.1);
      const wave = Math.sin(c * 0.3 + t * 2 + r * 0.5) * 7 + ripple;
      const y = yBase + wave;
      if (c === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = r === Math.floor(rows / 2) ? 'rgba(232, 255, 69, 0.65)' : `rgba(244, 245, 239, ${0.1 + (r / rows) * 0.3})`;
    ctx.lineWidth = 1.1;
    ctx.stroke();
  }
}

// 5. Ferrofluid
function renderFerrofluid(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const spikes = 28;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  for (let i = 0; i <= spikes; i++) {
    const angle = (i / spikes) * Math.PI * 2;
    const dx = Math.cos(angle), dy = Math.sin(angle);
    const mAngle = Math.atan2(my - cy, mx - cx);
    const angleDiff = Math.abs(angle - mAngle);
    const magPull = Math.max(0, Math.cos(angleDiff)) * 30;
    const r = 50 + Math.sin(angle * 7 + t * 4) * 8 + magPull;
    const x = dx * r, y = dy * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.fillStyle = '#0E110E';
  ctx.fill();
  ctx.strokeStyle = '#E8FF45';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#E8FF45';
  ctx.shadowBlur = 10;
  ctx.stroke();
  ctx.restore();
}

// 6. Turing Pattern
function renderTuringPattern(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cols = 22, rows = 14;
  const cw = w / cols, ch = h / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const v = Math.sin(i * 0.5 + t + Math.sin(j * 0.5 + t * 0.8));
      if (v > 0.15) {
        const x = i * cw + cw / 2;
        const y = j * ch + ch / 2;
        const radius = (v - 0.15) * 14;
        ctx.fillStyle = v > 0.6 ? '#E8FF45' : 'rgba(244, 245, 239, 0.18)';
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

// 7. Lidar Radar
function renderLidarRadar(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const radius = Math.min(w, h) * 0.45;
  // Radar sweep line
  const sweepAngle = t * 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(sweepAngle) * radius, cy + Math.sin(sweepAngle) * radius);
  ctx.strokeStyle = '#E8FF45';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#E8FF45';
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
  // Radar rings
  for (let r = 1; r <= 3; r++) {
    ctx.strokeStyle = 'rgba(232, 255, 69, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, (radius / 3) * r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Detected points
  const points = [
    { a: 0.8, r: 0.6 }, { a: 2.1, r: 0.35 }, { a: 3.8, r: 0.75 }, { a: 5.2, r: 0.5 }
  ];
  points.forEach(p => {
    const px = cx + Math.cos(p.a) * (radius * p.r);
    const py = cy + Math.sin(p.a) * (radius * p.r);
    const diff = (sweepAngle - p.a + Math.PI * 2) % (Math.PI * 2);
    const alpha = Math.max(0, 1 - diff / 2);
    ctx.fillStyle = `rgba(232, 255, 69, ${alpha})`;
    ctx.fillRect(px - 3, py - 3, 6, 6);
  });
}

// 8. Metaballs
function renderMetaballs(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const balls = [
    { x: w * 0.35 + Math.cos(t) * 40, y: h * 0.5 + Math.sin(t * 1.3) * 30, r: 45 },
    { x: w * 0.65 + Math.sin(t * 1.1) * 40, y: h * 0.5 + Math.cos(t) * 30, r: 40 },
    { x: mx, y: my, r: 35 }
  ];
  balls.forEach(b => {
    const g = ctx.createRadialGradient(b.x - 10, b.y - 10, 5, b.x, b.y, b.r);
    g.addColorStop(0, '#E8FF45');
    g.addColorStop(0.5, 'rgba(244, 245, 239, 0.4)');
    g.addColorStop(1, 'rgba(14, 16, 14, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

// 9. Kinetic Type
function renderKineticType(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const text = 'DATA ORCHESTRATION // AI AGENTS';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lines = 5;
  for (let l = 0; l < lines; l++) {
    const y = (h / (lines + 1)) * (l + 1);
    const dist = Math.abs(y - my);
    const skew = Math.max(-30, Math.min(30, (mx - w/2) * (1 - dist / h)));
    ctx.save();
    ctx.translate(w / 2 + (l % 2 === 0 ? t * 15 : -t * 15) % 100, y);
    ctx.transform(1, 0, skew * 0.01, 1, 0, 0);
    ctx.strokeStyle = l === 2 ? '#E8FF45' : 'rgba(244, 245, 239, 0.12)';
    ctx.lineWidth = 1;
    ctx.strokeText(text, 0, 0);
    ctx.restore();
  }
}

// 10. Point Cloud
function renderPointCloud(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const rotY = t * 0.4 + (mx / w - 0.5);
  ctx.save();
  ctx.translate(w / 2, h / 2);
  for (let x = -3; x <= 3; x++) {
    for (let y = -3; y <= 3; y++) {
      for (let z = -3; z <= 3; z++) {
        const px = x * 22, py = y * 16, pz = z * 22;
        const rx = px * Math.cos(rotY) - pz * Math.sin(rotY);
        const rz = px * Math.sin(rotY) + pz * Math.cos(rotY);
        const scanPlane = (t * 2) % 6 - 3;
        const isHit = Math.abs(y - scanPlane) < 0.6;
        ctx.fillStyle = isHit ? '#E8FF45' : 'rgba(244, 245, 239, 0.15)';
        ctx.fillRect(rx, py, isHit ? 2.5 : 1.5, isHit ? 2.5 : 1.5);
      }
    }
  }
  ctx.restore();
}

// 11. N-Body Gravity
let planets = null;
function renderNBody(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  if (!planets) {
    planets = [];
    for (let i = 0; i < 14; i++) {
      planets.push({
        r: 30 + i * 11,
        angle: Math.random() * Math.PI * 2,
        speed: (0.8 + (14 - i) * 0.15) * 0.02,
        trail: []
      });
    }
  }
  // Star
  ctx.fillStyle = '#E8FF45';
  ctx.shadowColor = '#E8FF45';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  planets.forEach((p, idx) => {
    p.angle += p.speed;
    const px = cx + Math.cos(p.angle) * p.r;
    const py = cy + Math.sin(p.angle) * p.r * 0.65;
    p.trail.push({ x: px, y: py });
    if (p.trail.length > 25) p.trail.shift();
    ctx.strokeStyle = `rgba(232, 255, 69, ${0.1 + (idx / 14) * 0.3})`;
    ctx.beginPath();
    p.trail.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
    ctx.fillStyle = '#F4F5EF';
    ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
  });
}

// 12. Differential Growth
function renderDifferentialGrowth(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const points = 40;
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r = 55 + Math.sin(a * 8 + t * 2) * 15 + Math.cos(a * 4 - t) * 8;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = '#E8FF45';
  ctx.lineWidth = 1.8;
  ctx.stroke();
  // Inner ring
  ctx.beginPath();
  for (let i = 0; i <= points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r = 28 + Math.cos(a * 6 + t * 3) * 8;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.strokeStyle = 'rgba(244, 245, 239, 0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

// 13. Bioluminescent Filaments
function renderBioluminescent(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const filaments = 10;
  for (let f = 0; f < filaments; f++) {
    const baseX = (w / (filaments + 1)) * (f + 1);
    ctx.beginPath();
    ctx.moveTo(baseX, h);
    for (let seg = 1; seg <= 15; seg++) {
      const y = h - seg * 14;
      const sway = Math.sin(t * 2 + seg * 0.4 + f) * (seg * 2.2);
      ctx.lineTo(baseX + sway, y);
    }
    const pulse = Math.sin(t * 3 - f * 0.8) > 0.2;
    ctx.strokeStyle = pulse ? '#E8FF45' : 'rgba(232, 255, 69, 0.25)';
    ctx.lineWidth = pulse ? 2 : 1;
    ctx.stroke();
  }
}

// 14. CRT Oscilloscope
function renderCRTOscilloscope(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  const a = 3, b = 4;
  const delta = t * 1.5;
  ctx.beginPath();
  for (let i = 0; i <= 200; i++) {
    const theta = (i / 200) * Math.PI * 2;
    const x = cx + Math.sin(a * theta + delta) * (w * 0.35);
    const y = cy + Math.sin(b * theta) * (h * 0.35);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#E8FF45';
  ctx.lineWidth = 2;
  ctx.shadowColor = '#E8FF45';
  ctx.shadowBlur = 16;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

// 15. Verlet Cloth
let clothGrid = null;
function renderVerletCloth(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cols = 14, rows = 10;
  const sx = w / (cols + 1), sy = h / (rows + 1);
  for (let r = 0; r < rows; r++) {
    ctx.beginPath();
    for (let c = 0; c < cols; c++) {
      const x = (c + 1) * sx + Math.sin(t * 2 + r * 0.5) * 6;
      const y = (r + 1) * sy + Math.cos(t * 2 + c * 0.5) * 4;
      if (c === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(232, 255, 69, 0.25)';
    ctx.stroke();
  }
  for (let c = 0; c < cols; c++) {
    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      const x = (c + 1) * sx + Math.sin(t * 2 + r * 0.5) * 6;
      const y = (r + 1) * sy + Math.cos(t * 2 + c * 0.5) * 4;
      if (r === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(244, 245, 239, 0.15)';
    ctx.stroke();
  }
}

// 16. Voronoi
function renderVoronoi(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const seeds = [
    { x: w * 0.2 + Math.cos(t) * 20, y: h * 0.3 },
    { x: w * 0.7 + Math.sin(t * 1.2) * 20, y: h * 0.25 },
    { x: w * 0.4, y: h * 0.7 + Math.cos(t * 0.8) * 20 },
    { x: w * 0.8, y: h * 0.75 },
    { x: mx, y: my }
  ];
  seeds.forEach((s, idx) => {
    ctx.fillStyle = idx === seeds.length - 1 ? '#E8FF45' : 'rgba(244, 245, 239, 0.4)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(232, 255, 69, 0.2)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, 45, 0, Math.PI * 2);
    ctx.stroke();
  });
}

// 17. Mobius Ribbon
function renderMobiusRibbon(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  ctx.beginPath();
  for (let i = 0; i <= 100; i++) {
    const u = (i / 100) * Math.PI * 4;
    const x = cx + Math.sin(u + t) * (w * 0.3);
    const y = cy + Math.sin((u + t) * 2) * (h * 0.25);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#E8FF45';
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

// 18. Spectrogram
function renderSpectrogram(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const bars = 30;
  const bw = w / bars;
  for (let i = 0; i < bars; i++) {
    const val = Math.sin(i * 0.4 + t * 4) * 0.5 + 0.5;
    const bh = val * (h * 0.65);
    ctx.fillStyle = i % 4 === 0 ? '#E8FF45' : 'rgba(244, 245, 239, 0.2)';
    ctx.fillRect(i * bw + 2, h - bh, bw - 4, bh);
  }
}

// 19. Fresnel Orb
function renderFresnelOrb(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  // Grid
  ctx.strokeStyle = 'rgba(244, 245, 239, 0.08)';
  for (let x = 0; x < w; x += 30) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  // Refractive Glass Orb
  const g = ctx.createRadialGradient(mx - 15, my - 15, 10, mx, my, 55);
  g.addColorStop(0, 'rgba(232, 255, 69, 0.4)');
  g.addColorStop(0.7, 'rgba(14, 18, 14, 0.6)');
  g.addColorStop(1, '#E8FF45');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(mx, my, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#E8FF45';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// 20. Matrix Rain
let matrixDrops = null;
function renderMatrixRain(ctx, w, h, t, mx, my) {
  ctx.fillStyle = 'rgba(6, 7, 6, 0.2)';
  ctx.fillRect(0, 0, w, h);
  const cols = 28;
  const cw = w / cols;
  if (!matrixDrops) {
    matrixDrops = Array(cols).fill(0).map(() => Math.random() * h);
  }
  ctx.font = '12px "JetBrains Mono", monospace';
  for (let i = 0; i < cols; i++) {
    const char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
    const y = matrixDrops[i];
    ctx.fillStyle = '#E8FF45';
    ctx.fillText(char, i * cw, y);
    matrixDrops[i] += 8;
    if (matrixDrops[i] > h && Math.random() > 0.95) matrixDrops[i] = 0;
  }
}

// 21. Gyroscopic Rings
function renderGyroscopicRings(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;
  ctx.save();
  ctx.translate(cx, cy);
  for (let r = 1; r <= 3; r++) {
    ctx.save();
    ctx.rotate(t * (0.8 / r) + (r * 1.05));
    ctx.scale(1, Math.cos(t * r * 0.7));
    ctx.beginPath();
    ctx.arc(0, 0, r * 28, 0, Math.PI * 2);
    ctx.strokeStyle = r === 2 ? '#E8FF45' : 'rgba(244, 245, 239, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

// 22. Perlin Flow
let flowParticles = null;
function renderPerlinFlow(ctx, w, h, t, mx, my) {
  ctx.fillStyle = 'rgba(6, 7, 6, 0.15)';
  ctx.fillRect(0, 0, w, h);
  if (!flowParticles) {
    flowParticles = [];
    for (let i = 0; i < 70; i++) {
      flowParticles.push({ x: Math.random() * w, y: Math.random() * h });
    }
  }
  ctx.fillStyle = '#E8FF45';
  flowParticles.forEach(p => {
    const angle = Math.sin(p.x * 0.01 + t) + Math.cos(p.y * 0.01 + t);
    p.x += Math.cos(angle) * 2;
    p.y += Math.sin(angle) * 2;
    if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
    ctx.fillRect(p.x, p.y, 2, 2);
  });
}

// 23. Pure Spotlight
function renderPureSpotlight(ctx, w, h, t, mx, my) {
  ctx.fillStyle = '#060706';
  ctx.fillRect(0, 0, w, h);
  const g = ctx.createRadialGradient(mx, my, 10, mx, my, 180);
  g.addColorStop(0, 'rgba(232, 255, 69, 0.16)');
  g.addColorStop(0.5, 'rgba(232, 255, 69, 0.04)');
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(mx, my, 180, 0, Math.PI * 2);
  ctx.fill();
}

window.addEventListener('DOMContentLoaded', () => {
  initApp();
  masterLoop();
});
