// Bundled Natural Earth vector basemap. No Leaflet, external tiles, or API key.
const SW=1000, SH=520, NS="http://www.w3.org/2000/svg";
const mk=(tag,attrs={})=>{const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el};
const xy=(lat,lng)=>[(lng+180)*SW/360,(90-lat)*SH/180];
let zoom={s:1,x:0,y:0}, worldTransform,worldSVG, popupDiv,dragStart=null,dragMoved=false;
const vectorLayers=new Set();
function updateTransform(){if(!worldTransform)return;worldTransform.setAttribute('transform',`translate(${zoom.x} ${zoom.y}) scale(${zoom.s})`);for(const layer of vectorLayers){if(typeof layer.redraw==='function')layer.redraw();}}
function setViewCenter(lat,lng,s){const p=xy(lat,lng);zoom={s:Math.max(1,Math.min(12,s)),x:SW/2-p[0]*s,y:SH/2-p[1]*s};updateTransform()}
function fitPts(points){if(!points.length){setViewCenter(18,10,1);return}let xs=points.map(p=>xy(p[0],p[1])[0]),ys=points.map(p=>xy(p[0],p[1])[1]);const x1=Math.min(...xs),x2=Math.max(...xs),y1=Math.min(...ys),y2=Math.max(...ys),cx=(x1+x2)/2,cy=(y1+y2)/2;const s=Math.max(1,Math.min(6,Math.min(820/Math.max(35,x2-x1),390/Math.max(30,y2-y1))));zoom={s,x:SW/2-cx*s,y:SH/2-cy*s};updateTransform()}
function makeCountry(feature){const coords=feature.geometry.coordinates;const polys=feature.geometry.type==='Polygon'?[coords]:coords;let d='';for(const poly of polys){for(const ring of poly){d+=ring.map(([lon,lat],i)=>{const [x,y]=xy(lat,lon);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join('')+'Z'}}return mk('path',{d,class:'world-country'})}
function buildVector(){const el=document.getElementById('map');worldSVG=mk('svg',{viewBox:`0 0 ${SW} ${SH}`,preserveAspectRatio:'xMidYMid meet',class:'offline-svg',role:'img','aria-label':'Offline world map of historical deforestation'});const ocean=mk('rect',{width:SW,height:SH,fill:'#0a1521'});worldSVG.append(ocean);worldTransform=mk('g');const land=mk('g');WORLD_GEOJSON.features.forEach(f=>land.append(makeCountry(f)));worldTransform.append(land);worldSVG.append(worldTransform);el.append(worldSVG);popupDiv=document.createElement('div');popupDiv.className='vector-popup';popupDiv.hidden=true;el.append(popupDiv);const clickZoom=(factor,px=SW/2,py=SH/2)=>{const s=Math.max(1,Math.min(12,zoom.s*factor));const ratio=s/zoom.s;zoom.x=px-(px-zoom.x)*ratio;zoom.y=py-(py-zoom.y)*ratio;zoom.s=s;updateTransform()};document.getElementById('mapZoomIn').onclick=()=>clickZoom(1.4);document.getElementById('mapZoomOut').onclick=()=>clickZoom(1/1.4);document.getElementById('mapReset').onclick=()=>fitPts(getRegionsForEra().map(r=>[r.lat,r.lng]));const mousePos=e=>{const rect=worldSVG.getBoundingClientRect();return [(e.clientX-rect.left)*SW/rect.width,(e.clientY-rect.top)*SH/rect.height]};worldSVG.addEventListener('wheel',e=>{e.preventDefault();const p=mousePos(e);clickZoom(e.deltaY<0?1.17:1/1.17,...p)},{passive:false});worldSVG.addEventListener('pointerdown',e=>{if(e.target.closest('.region-clickable'))return;dragStart={x:e.clientX,y:e.clientY,ox:zoom.x,oy:zoom.y};worldSVG.setPointerCapture(e.pointerId)});worldSVG.addEventListener('pointermove',e=>{if(!dragStart)return;const r=worldSVG.getBoundingClientRect();zoom.x=dragStart.ox+(e.clientX-dragStart.x)*SW/r.width;zoom.y=dragStart.oy+(e.clientY-dragStart.y)*SH/r.height;updateTransform()});worldSVG.addEventListener('pointerup',()=>dragStart=null);window.addEventListener('keydown',e=>{if(e.key==='Escape')popupDiv.hidden=true});}

function regionLayer(kind, coords, opts) {
  const [x,y] = xy(...coords);
  const group = mk('g', {class: 'region-clickable ' + (kind==='halo'?'forest-comparison':'forest-location')});
  const outer = kind==='halo' ? mk('circle', {cx:x, cy:y, class:'forest-before'}) : null;
  const inner = kind==='halo' ? mk('circle', {cx:x, cy:y, class:'forest-after'}) : null;
  const point = kind==='marker' ? mk('circle', {cx:x, cy:y, class:'forest-location-dot'}) : null;
  if (outer) group.append(outer,inner); else group.append(point);
  worldTransform.append(group);
  const obj = {
    kind, el:group, coords, opts:{...opts}, radius:opts.radius||0, handlers:{}, popup:'',
    addTo(){return this}, getRadius(){return this.radius},
    setRadius(r){this.radius=r;this.redraw();return this},
    redraw(){
      if(kind==='halo') {
        const factor=SH/180/111/1000;
        const initialKm=this.opts.initialRadiusKm||this.radius/1000;
        const initialR=Math.max(3,initialKm*1000*factor);
        outer.setAttribute('r',String(initialR));
        inner.setAttribute('r',String(Math.max(0,this.radius*factor)));
        outer.setAttribute('stroke-width',String(1.6/zoom.s));
        inner.setAttribute('stroke-width',String(1.6/zoom.s));
      } else {
        point.setAttribute('r',String(4.7/zoom.s));
        point.setAttribute('stroke-width',String(1.5/zoom.s));
      }
    },
    setStyle(style){Object.assign(this.opts,style);
      if(kind==='halo'){
        outer.setAttribute('fill','#eb7552');outer.setAttribute('fill-opacity','0.28');
        outer.setAttribute('stroke','#ffb19b');outer.setAttribute('stroke-dasharray','5 4');
        inner.setAttribute('fill','#39d98a');inner.setAttribute('fill-opacity','0.70');
        inner.setAttribute('stroke','#c0ffd6');
      } else {point.setAttribute('fill','#f6f5d9');point.setAttribute('stroke','#0a1613');}
      this.redraw();return this;
    },
    bindPopup(value){this.popup=value;return this},
    openPopup(){popupDiv.innerHTML=this.popup;popupDiv.hidden=false;return this},
    on(event,handler){this.handlers[event]=handler;return this}
  };
  group.addEventListener('click',e=>{e.stopPropagation();obj.openPopup();obj.handlers.click?.()});
  obj.setStyle(opts);obj.setRadius(opts.radius||0);vectorLayers.add(obj);return obj;
}
const L=
{map:()=>({setView(latlng,z){setViewCenter(latlng[0],latlng[1],1);return this},removeLayer(layer){layer.el.remove();vectorLayers.delete(layer)},fitBounds(b){fitPts(b.pts);return this},flyTo(latlng,z){setViewCenter(latlng[0],latlng[1],Math.max(1,Math.min(7,z)));return this},getZoom(){return zoom.s}}),tileLayer:()=>({addTo(){return this}}),circle:(c,o)=>regionLayer('halo',c,o),circleMarker:(c,o)=>regionLayer('marker',c,o),latLngBounds:pts=>({pts,pad(){return this}})};

const eras = [
  { id: "1900-1920", label: "1900–1920", title: "Industrial agriculture expands", summary: "Industrial agriculture, railways, logging, mining, and colonial plantation systems intensify forest clearing worldwide.", tags: ["industrialization", "agriculture", "colonialism"] },
  { id: "1920s-1930s", label: "1920s–1930s", title: "Colonial extraction and settler farming", summary: "Tropical forests are increasingly tied to export crops, mineral extraction, and imperial infrastructure.", tags: ["plantations", "settler farming", "timber"] },
  { id: "1940s-1950s", label: "1940s–1950s", title: "Postwar reconstruction and development", summary: "Postwar growth drives road building, dam projects, timber demand, and state-led frontier expansion.", tags: ["development", "roads", "dams"] },
  { id: "1960s", label: "1960s", title: "The tropical deforestation era begins", summary: "The geographical center of deforestation shifts toward tropical Latin America, Southeast Asia, and parts of Africa.", tags: ["tropics", "logging", "frontier"] },
  { id: "1970s", label: "1970s", title: "Amazon frontier expansion", summary: "Roads, colonization schemes, ranching, and mining dramatically increase pressure on the Amazon.", tags: ["Amazon", "cattle", "roads"] },
  { id: "1980s", label: "1980s", title: "Debt crisis and logging booms", summary: "Debt pressure, structural adjustment, and export-led extraction intensify logging, cattle expansion, and commodity-led forest loss.", tags: ["debt", "exports", "activism"] },
  { id: "1990s", label: "1990s", title: "Satellite monitoring reveals the scale", summary: "Remote sensing makes global forest loss easier to measure and turns deforestation into a planetary issue.", tags: ["satellites", "data", "policy"] },
  { id: "1997-1998", label: "1997–1998", title: "Southeast Asian peat and fire crisis", summary: "El Niño, peat drainage, logging, and plantation expansion trigger catastrophic fires and haze.", tags: ["fire", "peat", "palm oil"] },
  { id: "2000-2004", label: "2000–2004", title: "Peak Amazon destruction", summary: "Soy, cattle, timber, and road expansion drive very high annual deforestation rates in the Brazilian Amazon.", tags: ["Amazon", "soy", "beef"] },
  { id: "2004-2012", label: "2004–2012", title: "Conservation policies show results", summary: "Monitoring, protected areas, enforcement, and supply-chain agreements help reduce clearing, especially in the Brazilian Amazon.", tags: ["policy", "monitoring", "protected areas"] },
  { id: "2010s", label: "2010s", title: "Commodity chains go global", summary: "Beef, soy, palm oil, cocoa, pulpwood, mining, and infrastructure increasingly shape the global geography of forest loss.", tags: ["commodities", "supply chains", "consumption"] },
  { id: "2019-2022", label: "2019–2022", title: "Amazon loss rises again", summary: "Weak enforcement, fires, land grabbing, and mining contribute to renewed forest loss and degradation in the Amazon.", tags: ["Amazon", "illegal mining", "fires"] },
  { id: "2023", label: "2023", title: "Tropical primary forest loss remains high", summary: "Despite pledges and stronger visibility, tropical primary forest loss remains severe across multiple regions.", tags: ["primary forest", "pledges", "tropics"] },
  { id: "2024", label: "2024", title: "Fire-driven forest loss breaks records", summary: "Extreme fires, drought, and climate stress worsen global forest loss and highlight climate feedback loops.", tags: ["fire", "climate", "drought"] },
  { id: "2025-2026", label: "2025–2026", title: "Degradation becomes the hidden crisis", summary: "Even when clear-cutting slows in some places, forests remain under pressure from fragmentation, drought, logging, mining, and fire.", tags: ["degradation", "climate feedback", "rights"] }
];

const regions = [
  {
    id: "eastern-north-america",
    name: "Eastern North America",
    lat: 40,
    lng: -78,
    series: {
      "1900-1920": data(680, 2, ["logging", "agriculture", "railways"], "Industrial logging and agriculture continue reshaping temperate forests.", "Large-scale extraction fed industrial growth and urbanization.", "Much forest loss was normalized as modernization."),
      "1920s-1930s": data(640, 2, ["logging", "agriculture"], "Temperate forest frontiers continue contracting under agriculture and timber demand.", "Industrial extraction remains the main background force.", "The region shows how deforestation was already deeply advanced before tropical hotspots took center stage."),
      "1940s-1950s": data(600, 2, ["timber", "development"], "Postwar construction and resource demand maintain strong pressure.", "Reconstruction economies keep forests tied to housing, paper, and infrastructure.", "Net forest change becomes more mixed in later decades, but old-growth loss remains historically significant.")
    }
  },
  {
    id: "west-africa",
    name: "West Africa",
    lat: 7,
    lng: -2,
    series: {
      "1920s-1930s": data(540, 2, ["plantations", "cocoa", "colonialism"], "Forest conversion expands through export agriculture.", "Colonial cash-crop systems intensify agricultural transformation.", "Forest loss often benefited distant markets while local communities absorbed ecological damage."),
      "1960s": data(500, 2, ["agriculture", "logging"], "Forest pressure rises through population growth and commodity farming.", "The tropics increasingly become the center of global forest loss.", "Local pressures were often overstated while trade structures were understated."),
      "1990s": data(410, 3, ["agriculture", "cocoa"], "Remaining forest fragments come under strong pressure.", "By this period, much original forest is already fragmented.", "Deforestation in Africa is often simplified, overlooking trade and structural inequality."),
      "2010s": data(360, 3, ["cocoa", "agriculture"], "Cocoa expansion puts continuing pressure on forest remnants.", "Global consumer chains connect chocolate demand to forest pressure.", "The value chain is global, but the ecological burden is local.")
    }
  },
  {
    id: "amazon-basin",
    name: "Amazon Basin",
    lat: -6,
    lng: -60,
    series: {
      "1940s-1950s": data(760, 2, ["development", "roads", "settlement"], "The Amazon faces growing pressure from state-led development ambitions.", "Forests are increasingly reframed as territory to occupy and modernize.", "Development discourse often treated forested regions as empty or underused."),
      "1960s": data(720, 3, ["logging", "roads", "agriculture"], "Road access and frontier expansion intensify Amazon clearing.", "National integration projects open forest frontiers.", "The frontier logic obscured Indigenous rights."),
      "1970s": data(660, 4, ["cattle", "roads", "mining"], "Roads and ranching turn the Amazon into a major global deforestation hotspot.", "State-backed colonization and infrastructure open the forest to large-scale clearing.", "Indigenous territories face invasion and violent pressure."),
      "1980s": data(600, 4, ["cattle", "logging", "debt", "exports"], "Debt pressure and export-led growth intensify tropical forest destruction.", "Forest lands become sites of rapid speculative and extractive expansion.", "The burden of adjustment falls on rural populations and ecologies."),
      "1990s": data(560, 4, ["cattle", "soy", "logging"], "Satellite monitoring reveals the scale of Amazon clearing more clearly.", "The Amazon becomes a planetary symbol of deforestation.", "Visibility does not automatically mean protection."),
      "2000-2004": data(500, 4, ["soy", "beef", "logging", "roads"], "The early 2000s mark one of the highest recent peaks of Amazon deforestation.", "Commodity expansion and frontier speculation intensify land clearing.", "Forest destruction is embedded in global food systems."),
      "2004-2012": data(470, 2, ["policy", "monitoring", "protected areas"], "Monitoring and stronger policies help reduce clearing rates.", "This era shows that deforestation can be reduced with political will.", "Reductions are real, but fragile and reversible."),
      "2010s": data(430, 3, ["beef", "soy", "mining", "roads"], "The Amazon remains central to global commodity-linked forest loss.", "Supply chains become a key lens for understanding deforestation.", "Consumption and forest loss remain tightly linked."),
      "2019-2022": data(390, 4, ["fires", "land grabbing", "mining", "cattle"], "Deforestation and degradation rise again in the Amazon.", "Regulatory weakening and political conflict contribute to renewed destruction.", "Progress can unravel quickly when protections and rights are attacked."),
      "2023": data(370, 3, ["beef", "mining", "degradation"], "Primary tropical forest loss remains high despite stronger scrutiny.", "Structural economic pressures remain powerful.", "Political promises often move faster than material change."),
      "2024": data(340, 4, ["fire", "climate", "drought"], "Extreme drought and fire amplify forest vulnerability.", "Forest loss and climate stress reinforce one another.", "The line between climate disaster and land-use crisis blurs."),
      "2025-2026": data(320, 4, ["degradation", "logging", "fire", "drought"], "Degradation becomes a central threat even where clear-cutting fluctuates.", "Canopy thinning, fragmentation, and recurrent fire undermine resilience.", "Forest politics must confront invisible or slow violence too.")
    }
  },
  {
    id: "congo-basin",
    name: "Congo Basin",
    lat: 0.5,
    lng: 18,
    series: {
      "1900-1920": data(640, 1, ["colonialism", "timber", "rubber"], "Colonial extraction pressures forests through rubber and timber.", "Extraction economies push forests into imperial market networks.", "Violence and coercion shaped how some forest commodities were produced."),
      "1940s-1950s": data(620, 2, ["logging", "infrastructure"], "Logging and colonial-state development affect Central African forests.", "Transport links intensify access to forest resources.", "Benefits flow unevenly while communities have little control."),
      "1960s": data(600, 2, ["logging", "agriculture", "development"], "Forest pressure increases with roads and commodity production.", "The tropics emerge more clearly as the central geography of global forest loss.", "Global narratives often misplace blame."),
      "1980s": data(570, 2, ["logging", "roads", "exports"], "Commercial logging expands while governance remains uneven.", "Timber concessions and transport access increase pressure.", "Extraction often proceeds without strong local accountability."),
      "2000-2004": data(540, 2, ["logging", "roads", "mining"], "Central African forests remain under pressure as global attention focuses elsewhere.", "The basin becomes increasingly important in climate politics.", "Some globally important forest regions remain underrepresented."),
      "2010s": data(500, 3, ["logging", "mining", "roads"], "The Congo Basin emerges more clearly as a major forest frontier.", "Its importance for climate stability becomes more widely recognized.", "Recognition does not always translate into protection."),
      "2023": data(470, 3, ["logging", "small-scale agriculture", "roads"], "The Congo Basin continues to face cumulative pressure.", "Its role in global climate regulation is increasingly emphasized.", "Climate significance should not erase local social realities."),
      "2025-2026": data(445, 3, ["degradation", "mining", "roads"], "Pressure builds through overlapping forms of extraction and infrastructure.", "Standing forests remain vulnerable even without dramatic headline rates.", "Protection must include community control, not only mapping and finance.")
    }
  },
  {
    id: "southeast-asia",
    name: "Southeast Asia",
    lat: 3,
    lng: 110,
    series: {
      "1920s-1930s": data(610, 2, ["rubber", "timber", "plantations"], "Plantation economies and timber extraction reshape lowland tropical forests.", "Colonial and commercial interests expand rubber and plantation frontiers.", "Monoculture landscapes replace more diverse ecosystems and livelihoods."),
      "1960s": data(570, 3, ["logging", "plantations", "exports"], "Commercial logging and export agriculture accelerate tropical forest loss.", "Tropical timber and plantations are integrated into world markets.", "The benefits of extraction are highly uneven."),
      "1970s": data(545, 3, ["logging", "timber", "plantations"], "Logging concessions expand rapidly across forested islands.", "Timber extraction becomes a major economic force.", "Forest exploitation is justified as development while costs are externalized."),
      "1980s": data(500, 4, ["logging", "timber", "plantations"], "Industrial logging becomes especially intense.", "Timber booms connect forest destruction to global markets.", "Primary forests are liquidated quickly for short-term profit."),
      "1990s": data(460, 4, ["logging", "palm oil", "fire"], "Industrial logging and plantation development reshape regional forests.", "Data reveal the speed of tropical forest conversion.", "Forest loss becomes easier to measure, but difficult to stop."),
      "1997-1998": data(430, 4, ["fire", "peat", "palm oil", "logging"], "Peat drainage and plantation clearing contribute to catastrophic fire crises.", "Deforestation, smoke, carbon emissions, and public health become visibly linked.", "Many fires are treated as isolated events rather than political-economic outcomes."),
      "2004-2012": data(400, 3, ["palm oil", "logging", "peat"], "Forest pressure remains high due to plantations and peatland transformation.", "While Amazon governance improves, Southeast Asian forest fronts remain threatened.", "Global success stories can obscure losses elsewhere."),
      "2010s": data(370, 4, ["palm oil", "pulpwood", "fire"], "Palm oil and pulpwood are major drivers of continuing forest change.", "Plantation capitalism strongly shapes the region's forest future.", "Corporate pledges often coexist with ecological harm."),
      "2023": data(345, 3, ["plantations", "peat", "degradation"], "Forest pressure persists even where direct clearing rates fluctuate.", "Loss is not only about clear cuts, but also degradation.", "A standing forest can still be ecologically damaged.")
    }
  },
  {
    id: "boreal-forests",
    name: "Boreal Forests",
    lat: 58,
    lng: 95,
    series: {
      "1940s-1950s": data(780, 1, ["timber", "industrialization"], "Boreal forest extraction grows with industrial development and state planning.", "Large forest reserves become important to industrial economies.", "Even where forest cover remains high, extraction regimes can still be disruptive."),
      "2024": data(720, 4, ["fire", "climate"], "Boreal fire activity becomes a major part of the global forest loss story.", "The forest crisis widens beyond tropical-only narratives.", "Warming can transform forests from carbon sinks into emission sources."),
      "2025-2026": data(700, 3, ["warming", "fire"], "Northern forest stress becomes part of a larger climate-driven forest crisis.", "Heat and fire alter vast forest systems.", "Forest crisis is increasingly global in a climatic sense.")
    }
  }
];

function data(forestRadiusKm, intensity, drivers, summary, context, critical) {
  return { forestRadiusKm, intensity, drivers, summary, context, critical };
}

const map = L.map("map", { worldCopyJump: true, zoomControl: true }).setView([18, 10], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
}).addTo(map);

let currentEraIndex = 0;
let currentDriver = "all";
let selectedRegionId = null;
let forestAreasVisible = true;
let animationEnabled = true;
let regionLayers = new Map();
let markerLayers = new Map();
let previousSnapshot = new Map();
let isPlaying = false;
let playInterval = null;

const timelineButtonsEl = document.getElementById("timelineButtons");
const driverFiltersEl = document.getElementById("driverFilters");
const playPauseBtn = document.getElementById("playPauseBtn");
const replayBtn = document.getElementById("replayBtn");
const toggleAreasBtn = document.getElementById("toggleAreasBtn");
const toggleAnimationBtn = document.getElementById("toggleAnimationBtn");

const eraTitleEl = document.getElementById("eraTitle");
const eraSummaryEl = document.getElementById("eraSummary");
const eraMetaEl = document.getElementById("eraMeta");
const regionListEl = document.getElementById("regionList");

const selectedTitleEl = document.getElementById("selectedTitle");
const selectedSummaryEl = document.getElementById("selectedSummary");
const selectedDriversEl = document.getElementById("selectedDrivers");
const selectedForestAreaEl = document.getElementById("selectedForestArea");
const selectedContextEl = document.getElementById("selectedContext");
const selectedCriticalEl = document.getElementById("selectedCritical");

function getCurrentEra() {
  return eras[currentEraIndex];
}

function getIntensityColor(intensity) {
  if (intensity <= 1) return "#39d98a";
  if (intensity === 2) return "#ffd166";
  if (intensity === 3) return "#ff9f43";
  return "#ff5d5d";
}
function getAccentColor(intensity) {
  if (intensity <= 1) return '#7dffae';
  if (intensity === 2) return '#ffe08a';
  if (intensity === 3) return '#ffb060';
  return '#ff786b';
}

function getMarkerRadius(intensity) {
  if (intensity <= 1) return 9;
  if (intensity === 2) return 12;
  if (intensity === 3) return 15;
  return 18;
}

function renderTimelineButtons() {
  timelineButtonsEl.innerHTML = "";
  eras.forEach((era, index) => {
    const btn = document.createElement("button");
    btn.className = "timeline-btn" + (index === currentEraIndex ? " active" : "");
    btn.textContent = era.label;
    btn.addEventListener("click", () => {
      stopPlaying();
      setEra(index, true);
    });
    timelineButtonsEl.appendChild(btn);
  });
}

function renderDriverFilters() {
  driverFiltersEl.innerHTML = "";
  const drivers = ["all", "logging", "agriculture", "cattle", "soy", "plantations", "palm oil", "mining", "fire", "climate", "policy", "degradation"];
  drivers.forEach(driver => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (driver === currentDriver ? " active" : "");
    btn.textContent = driver === "all" ? "All" : driver;
    btn.addEventListener("click", () => {
      currentDriver = driver;
      renderAll(true);
    });
    driverFiltersEl.appendChild(btn);
  });
}

function renderControls() {
  playPauseBtn.classList.toggle("active", isPlaying);
  playPauseBtn.textContent = isPlaying ? "Pause timeline" : "Play timeline";

  toggleAreasBtn.classList.toggle("active", forestAreasVisible);
  toggleAreasBtn.textContent = forestAreasVisible ? "Forest areas on" : "Forest areas off";

  toggleAnimationBtn.classList.toggle("active", animationEnabled);
  toggleAnimationBtn.textContent = animationEnabled ? "Animation on" : "Animation off";
}

function getRegionsForEra() {
  const eraId = getCurrentEra().id;
  let visible = regions
    .map(region => {
      const current = region.series[eraId];
      if (!current) return null;
      return { ...region, current };
    })
    .filter(Boolean);

  if (currentDriver !== "all") {
    visible = visible.filter(region => region.current.drivers.includes(currentDriver));
  }

  return visible;
}

function renderEraInfo() {
  const era = getCurrentEra();
  eraTitleEl.textContent = `${era.label} · ${era.title}`;
  eraSummaryEl.textContent = era.summary;
  eraMetaEl.innerHTML = era.tags.map(tag => `<span class="chip">${tag}</span>`).join("");
}

function animateCircleRadius(circle, fromRadius, toRadius, duration = 2400) {
  if (!animationEnabled) {
    circle.setRadius(toRadius);
    return;
  }

  const sequence = (circle.animationSequence || 0) + 1;
  circle.animationSequence = sequence;
  const start = performance.now();

  function step(now) {
    if (circle.animationSequence !== sequence) return;
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const radius = fromRadius + (toRadius - fromRadius) * eased;
    circle.setRadius(radius);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function createPopup(region) {
  return `
    <div class="popup-title">${region.name}</div>
    <div class="popup-meta">${getCurrentEra().label} · Pressure ${region.current.intensity}/4 · Drivers: ${region.current.drivers.join(', ')}</div>
    <div class="popup-text">${region.current.summary}</div>
  `;
}

function updateMapLayers(animate = true) {
  const visibleRegions = getRegionsForEra();
  const visibleIds = new Set(visibleRegions.map(r => r.id));

  for (const [id, circle] of regionLayers.entries()) {
    if (!visibleIds.has(id)) {
      map.removeLayer(circle);
      regionLayers.delete(id);
    }
  }

  for (const [id, marker] of markerLayers.entries()) {
    if (!visibleIds.has(id)) {
      map.removeLayer(marker);
      markerLayers.delete(id);
    }
  }

  visibleRegions.forEach(region => {
    const radiusMeters = region.current.forestRadiusKm * 1000;
    const initialRadiusKm = Math.max(...Object.values(region.series).map(v => v.forestRadiusKm));
    const existingCircle = regionLayers.get(region.id);
    const existingMarker = markerLayers.get(region.id);

    if (forestAreasVisible) {
      if (existingCircle) {
        const currentRadius = existingCircle.getRadius();
        existingCircle.setStyle({initialRadiusKm});
        existingCircle.bindPopup(createPopup(region));
        if (animate) {
          animateCircleRadius(existingCircle, currentRadius, radiusMeters);
        } else {
          existingCircle.setRadius(radiusMeters);
        }
      } else {
        const prevRadius = previousSnapshot.get(region.id) ?? radiusMeters;
        const circle = L.circle([region.lat, region.lng], {
          radius: prevRadius, initialRadiusKm
        }).addTo(map);

        circle.bindPopup(createPopup(region));
        circle.on("click", () => {
          selectedRegionId = region.id;
          renderSelectedRegion();
          renderRegionList();
        });

        regionLayers.set(region.id, circle);

        if (animate) {
          animateCircleRadius(circle, prevRadius, radiusMeters);
        } else {
          circle.setRadius(radiusMeters);
        }
      }
    } else if (existingCircle) {
      map.removeLayer(existingCircle);
      regionLayers.delete(region.id);
    }

    if (existingMarker) {
      existingMarker.setStyle({});
      existingMarker.bindPopup(createPopup(region));
    } else {
      const marker = L.circleMarker([region.lat, region.lng], {radius: 5}).addTo(map);

      marker.bindPopup(createPopup(region));
      marker.on("click", () => {
        selectedRegionId = region.id;
        renderSelectedRegion();
        renderRegionList();
      });

      markerLayers.set(region.id, marker);
    }

    previousSnapshot.set(region.id, radiusMeters);
  });

  const points = visibleRegions.map(r => [r.lat, r.lng]);
  if (points.length) {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds.pad(0.4), { padding: [50, 50] });
  } else {
    map.setView([18, 10], 2);
  }
}

function renderRegionList() {
  const visibleRegions = getRegionsForEra();
  regionListEl.innerHTML = "";

  if (!visibleRegions.length) {
    regionListEl.innerHTML = `<div class="region-card"><div class="region-card-text">No regions match this driver filter in the selected era.</div></div>`;
    return;
  }

  visibleRegions.forEach(region => {
    const card = document.createElement("div");
    card.className = "region-card" + (selectedRegionId === region.id ? " active" : "");
    card.innerHTML = `
      <div class="region-card-title">${region.name}</div>
      <div class="region-card-text">${region.current.summary}</div>
      <div class="region-card-meta">
        <span class="mini-chip">${region.current.forestRadiusKm} km halo</span>
        <span class="mini-chip">pressure ${region.current.intensity}/4</span>
      </div>
    `;

    card.addEventListener("click", () => {
      selectedRegionId = region.id;
      renderSelectedRegion();
      renderRegionList();
      map.flyTo([region.lat, region.lng], Math.max(map.getZoom(), 4), { duration: 0.9 });
      const marker = markerLayers.get(region.id);
      if (marker) marker.openPopup();
    });

    regionListEl.appendChild(card);
  });
}

function renderSelectedRegion() {
  const visibleRegions = getRegionsForEra();
  let region = visibleRegions.find(r => r.id === selectedRegionId);

  if (!region && visibleRegions.length) {
    region = visibleRegions[0];
    selectedRegionId = region.id;
  }

  if (!region) {
    selectedTitleEl.textContent = "No region selected";
    selectedSummaryEl.textContent = "Try another era or driver filter.";
    selectedDriversEl.textContent = "—";
    selectedForestAreaEl.textContent = "—";
    selectedContextEl.textContent = "—";
    selectedCriticalEl.textContent = "—";
    return;
  }

  selectedTitleEl.textContent = region.name;
  selectedSummaryEl.textContent = region.current.summary;
  selectedDriversEl.textContent = region.current.drivers.join(", ");
  selectedForestAreaEl.textContent = `Illustrative remaining-forest circle radius: ${region.current.forestRadiusKm} km`;
  selectedContextEl.textContent = region.current.context;
  selectedCriticalEl.textContent = region.current.critical;
}

function renderAll(animate = true) {
  renderTimelineButtons();
  renderDriverFilters();
  renderControls();
  renderEraInfo();
  updateMapLayers(animate);
  renderRegionList();
  renderSelectedRegion();
}

function setEra(index, animate = true) {
  currentEraIndex = index;
  renderAll(animate);
}

function stopPlaying() {
  isPlaying = false;
  if (playInterval) {
    clearInterval(playInterval);
    playInterval = null;
  }
  renderControls();
}

function startPlaying() {
  if (isPlaying) return;
  isPlaying = true;
  renderControls();

  playInterval = setInterval(() => {
    if (currentEraIndex >= eras.length - 1) {
      stopPlaying();
      return;
    }
    setEra(currentEraIndex + 1, true);
  }, 4200);
}

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) stopPlaying();
  else {
    if (currentEraIndex >= eras.length - 1) {
      currentEraIndex = 0;
    }
    startPlaying();
  }
});

replayBtn.addEventListener("click", () => {
  stopPlaying();
  const current = currentEraIndex;
  currentEraIndex = 0;
  renderAll(false);
  setTimeout(() => setEra(current, true), 80);
});

toggleAreasBtn.addEventListener("click", () => {
  forestAreasVisible = !forestAreasVisible;
  renderAll(false);
});

toggleAnimationBtn.addEventListener("click", () => {
  animationEnabled = !animationEnabled;
  renderAll(false);
});

buildVector();
renderAll(false);
