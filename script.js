const eras = [
  {
    id: "1900-1920",
    label: "1900–1920",
    title: "Industrial agriculture expands",
    summary: "Mechanized agriculture, railways, logging, mining, and colonial plantation systems intensify forest clearing worldwide.",
    tags: ["industrialization", "agriculture", "colonialism"]
  },
  {
    id: "1920s-1930s",
    label: "1920s–1930s",
    title: "Colonial extraction and settler farming",
    summary: "Tropical forests are increasingly tied to export crops, mineral extraction, and imperial infrastructure.",
    tags: ["plantations", "settler farming", "timber"]
  },
  {
    id: "1940s-1950s",
    label: "1940s–1950s",
    title: "Postwar reconstruction and development",
    summary: "Postwar growth drives road building, dam projects, timber demand, and state-led frontier expansion.",
    tags: ["development", "roads", "dams"]
  },
  {
    id: "1960s",
    label: "1960s",
    title: "The tropical deforestation era begins",
    summary: "The geographical center of deforestation shifts toward tropical Latin America, Southeast Asia, and parts of Africa.",
    tags: ["tropics", "logging", "frontier"]
  },
  {
    id: "1970s",
    label: "1970s",
    title: "Amazon frontier expansion",
    summary: "Roads, colonization schemes, ranching, and mining dramatically increase pressure on the Amazon.",
    tags: ["Amazon", "cattle", "roads"]
  },
  {
    id: "1980s",
    label: "1980s",
    title: "Debt crisis and logging booms",
    summary: "Debt pressure, structural adjustment, and export-led extraction intensify logging, cattle expansion, and commodity-led forest loss.",
    tags: ["debt", "exports", "activism"]
  },
  {
    id: "1990s",
    label: "1990s",
    title: "Satellite monitoring reveals the scale",
    summary: "Remote sensing makes global forest loss easier to measure and turns deforestation into a planetary issue.",
    tags: ["satellites", "data", "policy"]
  },
  {
    id: "1997-1998",
    label: "1997–1998",
    title: "Southeast Asian peat and fire crisis",
    summary: "El Niño, peat drainage, logging, and plantation expansion trigger catastrophic fires and haze.",
    tags: ["fire", "peat", "palm oil"]
  },
  {
    id: "2000-2004",
    label: "2000–2004",
    title: "Peak Amazon destruction",
    summary: "Soy, cattle, timber, and road expansion drive very high annual deforestation rates in the Brazilian Amazon.",
    tags: ["Amazon", "soy", "beef"]
  },
  {
    id: "2004-2012",
    label: "2004–2012",
    title: "Conservation policies show results",
    summary: "Monitoring, protected areas, enforcement, and supply-chain agreements help reduce clearing, especially in the Brazilian Amazon.",
    tags: ["policy", "monitoring", "protected areas"]
  },
  {
    id: "2010s",
    label: "2010s",
    title: "Commodity chains go global",
    summary: "Beef, soy, palm oil, cocoa, pulpwood, mining, and infrastructure increasingly shape the global geography of forest loss.",
    tags: ["commodities", "supply chains", "consumption"]
  },
  {
    id: "2019-2022",
    label: "2019–2022",
    title: "Amazon loss rises again",
    summary: "Weak enforcement, fires, land grabbing, and mining contribute to renewed forest loss and degradation in the Amazon.",
    tags: ["Amazon", "illegal mining", "fires"]
  },
  {
    id: "2023",
    label: "2023",
    title: "Tropical primary forest loss remains high",
    summary: "Despite pledges and stronger visibility, tropical primary forest loss remains severe across multiple regions.",
    tags: ["primary forest", "pledges", "tropics"]
  },
  {
    id: "2024",
    label: "2024",
    title: "Fire-driven forest loss breaks records",
    summary: "Extreme fires, drought, and climate stress worsen global forest loss and highlight climate feedback loops.",
    tags: ["fire", "climate", "drought"]
  },
  {
    id: "2025-2026",
    label: "2025–2026",
    title: "Degradation becomes the hidden crisis",
    summary: "Even when clear-cutting slows in some places, forests remain under pressure from fragmentation, drought, logging, mining, and fire.",
    tags: ["degradation", "climate feedback", "rights"]
  }
];

const hotspotsByEra = {
  "1900-1920": [
    createHotspot("Eastern North America", 40, -78, 2, ["logging", "agriculture", "railways"], "Industrial logging and agricultural expansion continue reshaping temperate forests.", "Large-scale extraction fed urbanization, rail expansion, and industrial growth.", "Much forest loss was normalized as progress, with little attention to ecological cost."),
    createHotspot("Colonial India", 22, 78, 2, ["railways", "timber", "colonialism"], "Forests are tied to colonial timber extraction and infrastructure projects.", "Railway sleepers, state forest regimes, and imperial extraction transformed forest governance.", "Colonial control often dispossessed local communities and undermined customary rights."),
    createHotspot("Central Africa", 0, 21, 1, ["colonialism", "timber", "rubber"], "Colonial extraction pressures forests through rubber, timber, and coercive systems.", "Extraction economies push forests into imperial market networks.", "Violence and forced labor were integral to how some forest commodities were produced.")
  ],
  "1920s-1930s": [
    createHotspot("West Africa", 7, -2, 2, ["cocoa", "plantations", "colonialism"], "Forest conversion expands through export agriculture.", "Colonial trade systems intensified agricultural transformation.", "Forest loss often benefited external markets while local populations absorbed ecological damage."),
    createHotspot("Southeast Asia", 4, 102, 2, ["rubber", "timber", "plantations"], "Plantation economies and timber extraction reshape lowland tropical forests.", "Colonial and commercial interests expanded rubber and plantation frontiers.", "Monoculture landscapes replaced more diverse ecosystems and livelihoods."),
    createHotspot("Latin America", -12, -65, 1, ["settler farming", "timber", "exports"], "Forest frontiers expand under land settlement and export pressures.", "Agricultural colonization and export orientation deepen land conversion.", "Settler expansion frequently erased existing Indigenous territorial realities.")
  ],
  "1940s-1950s": [
    createHotspot("Amazon Basin", -5, -62, 2, ["development", "roads", "settlement"], "The Amazon faces growing pressure from state-led development ambitions.", "Forests are reframed as territories to occupy and modernize.", "Development discourse often treated forested regions as empty or underused."),
    createHotspot("Congo Basin", 0.5, 17, 2, ["logging", "infrastructure", "colonial extraction"], "Logging and colonial-state development affect Central African forests.", "Transport links and extraction intensified access to forest resources.", "Benefits flowed unevenly, while forest communities had little control."),
    createHotspot("Siberian / Boreal Forests", 61, 100, 1, ["timber", "industrialization"], "Boreal forest extraction grows with industrial development and state planning.", "Large forest reserves become important to industrial economies.", "Even where forest cover remained high, extraction regimes could be disruptive.")
  ],
  "1960s": [
    createHotspot("Amazon Basin", -6, -60, 3, ["logging", "roads", "agriculture"], "The Amazon enters a stronger phase of forest frontier expansion.", "Transport access and national integration projects accelerate clearing.", "The logic of frontier development often obscured Indigenous land rights."),
    createHotspot("Southeast Asia", 2, 113, 3, ["logging", "plantations", "exports"], "Commercial logging and export agriculture accelerate tropical forest loss.", "Tropical timber and plantations are integrated into world markets.", "The benefits of extraction were highly uneven socially and geographically."),
    createHotspot("West & Central Africa", 2, 15, 2, ["logging", "agriculture", "development"], "Forest pressure increases with population growth, roads, and commodity production.", "The tropics emerge as the central geography of global forest loss.", "Global narratives often blamed local populations while minimizing structural drivers.")
  ],
  "1970s": [
    createHotspot("Brazilian Amazon", -8, -55, 4, ["cattle", "roads", "colonization", "mining"], "Roads and ranching turn the Amazon into a major global deforestation hotspot.", "State-backed colonization and infrastructure projects opened the forest to large-scale clearing.", "Indigenous territories were invaded and ecological complexity was reduced to a frontier logic."),
    createHotspot("Indonesia", -2, 118, 3, ["logging", "timber", "plantations"], "Logging concessions expand rapidly across forested islands.", "Timber extraction becomes a major economic force.", "Forest exploitation was often justified as national development while local costs were externalized."),
    createHotspot("Central America", 14, -85, 3, ["cattle", "agriculture", "settlement"], "Cattle-led clearing and land pressure intensify across the region.", "Beef and land conversion reshape landscapes.", "Land concentration and export-led agriculture deepened rural inequalities.")
  ],
  "1980s": [
    createHotspot("Amazon Basin", -7, -59, 4, ["cattle", "logging", "debt", "exports"], "Debt pressures and export-led growth intensify tropical forest destruction.", "Forest lands become sites of rapid speculative and extractive expansion.", "The burden of adjustment often fell on rural populations and ecologies."),
    createHotspot("Borneo", 0.5, 114, 4, ["logging", "timber", "plantations"], "Industrial logging becomes intense in one of the world's richest forest ecosystems.", "Timber booms connect Borneo to international construction and paper markets.", "Primary forests were liquidated quickly for short-term profit."),
    createHotspot("Congo Basin", 1, 19, 2, ["logging", "roads", "exports"], "Commercial logging expands while forest governance remains uneven.", "Timber concessions and transport access increase pressure.", "Extraction often proceeded without strong local accountability.")
  ],
  "1990s": [
    createHotspot("Amazon Basin", -6, -58, 4, ["cattle", "soy", "logging"], "Global monitoring reveals the scale of Amazon clearing more clearly.", "Satellite data helps transform deforestation into an internationally visible issue.", "Better visibility did not automatically mean stronger justice for forest communities."),
    createHotspot("Southeast Asia", 3, 110, 4, ["logging", "palm oil", "fires"], "Industrial logging and plantation development reshape regional forests.", "Data reveals the speed of tropical forest conversion.", "Forest loss became easier to measure, but difficult to stop."),
    createHotspot("West Africa", 7, -1, 3, ["cocoa", "agriculture", "fuelwood"], "Forest remnants remain under strong pressure from agriculture and resource demand.", "Many forests are already fragmented by this point.", "Deforestation in Africa is often narrated simplistically, overlooking trade and inequality.")
  ],
  "1997-1998": [
    createHotspot("Indonesia / Sumatra / Kalimantan", -1, 114, 4, ["fire", "peat", "palm oil", "logging"], "Drained peatlands and land clearing contribute to catastrophic fires and haze.", "This crisis showed how deforestation, smoke, carbon emissions, and public health are linked.", "Many fires were treated as isolated events rather than symptoms of a political-economic land-use model."),
    createHotspot("Malaysia & regional haze zone", 3.5, 102, 3, ["fire", "peat", "plantations"], "Haze spreads across borders, making forest destruction a regional health crisis.", "The impacts extend far beyond the immediate burn zones.", "The smoke crisis revealed how forest damage can become transnational.")
  ],
  "2000-2004": [
    createHotspot("Brazilian Amazon", -9, -54, 4, ["soy", "beef", "logging", "roads"], "The early 2000s mark one of the highest recent peaks of Amazon deforestation.", "Commodity expansion and frontier speculation intensify land clearing.", "Forest destruction is embedded in global food systems and profit chains."),
    createHotspot("Bolivia lowlands", -16, -63, 3, ["soy", "cattle", "settlement"], "Agricultural frontier pressures grow in neighboring forest zones.", "Regional deforestation dynamics extend beyond Brazil.", "Policies in one country can displace pressures into another."),
    createHotspot("Congo Basin", 0, 20, 2, ["logging", "roads", "mining"], "Central African forests remain under pressure as global attention focuses on the Amazon.", "The basin becomes increasingly important in climate politics.", "Some regions remain underrepresented despite their global ecological significance.")
  ],
  "2004-2012": [
    createHotspot("Brazilian Amazon", -8, -56, 2, ["policy", "monitoring", "protected areas"], "Monitoring and stronger policies help reduce clearing rates.", "This era demonstrates that policy intervention can matter substantially.", "Reductions are real, but fragile and politically reversible."),
    createHotspot("Indonesia", -1, 116, 3, ["palm oil", "logging", "peat"], "Forest pressure remains high due to plantations and peatland transformation.", "While Amazon governance improves, other tropical fronts stay highly threatened.", "Global success stories can obscure continuing losses elsewhere.")
  ],
  "2010s": [
    createHotspot("Amazon Basin", -6, -60, 3, ["beef", "soy", "mining", "roads"], "The Amazon remains central to global commodity-linked forest loss.", "Supply chains become a key lens for understanding deforestation.", "Consumers are connected to forest destruction through everyday products."),
    createHotspot("Indonesia & Malaysia", 1, 114, 4, ["palm oil", "pulpwood", "fire"], "Palm oil and pulpwood are major drivers of continuing forest change.", "Plantation capitalism strongly shapes the region's forest future.", "Corporate pledges often coexist with continued ecological harm."),
    createHotspot("West Africa cocoa belt", 6.5, -5, 3, ["cocoa", "agriculture"], "Cocoa expansion puts pressure on remaining forests.", "Chocolate supply chains become part of the deforestation conversation.", "The value chain is global, but the environmental burden is localized."),
    createHotspot("Congo Basin", 0, 18, 3, ["logging", "mining", "roads"], "The Congo Basin emerges more clearly as a globally significant forest frontier.", "Its importance for climate stability becomes more widely recognized.", "Recognition does not always translate into adequate protection.")
  ],
  "2019-2022": [
    createHotspot("Amazon Basin", -7, -58, 4, ["fires", "land grabbing", "mining", "cattle"], "Deforestation and degradation rise again in the Amazon.", "Regulatory weakening and political conflict contribute to renewed destruction.", "Progress can unravel quickly when protections and rights are attacked."),
    createHotspot("Indigenous territories in Amazonia", -4, -63, 4, ["illegal mining", "invasions", "logging"], "Protected and Indigenous areas face intensified pressure.", "Territorial defense becomes central to the forest struggle.", "The crisis is also about sovereignty, violence, and rights.")
  ],
  "2023": [
    createHotspot("Amazon Basin", -6, -60, 3, ["beef", "mining", "degradation"], "Primary tropical forest loss remains high despite stronger scrutiny.", "Structural economic pressures remain powerful.", "Political promises often move faster than material changes on the ground."),
    createHotspot("Congo Basin", 0, 18, 3, ["logging", "small-scale agriculture", "roads"], "The Congo Basin continues to face cumulative pressure.", "Its role in global climate regulation is increasingly emphasized.", "Climate significance should not eclipse local social realities."),
    createHotspot("Southeast Asia", 2, 113, 3, ["plantations", "peat", "degradation"], "Forest pressure persists even where direct clearing rates fluctuate.", "Loss is not only about clear cuts, but also ecosystem degradation.", "A standing forest can still be ecologically damaged.")
  ],
  "2024": [
    createHotspot("Amazon fire zone", -8, -60, 4, ["fire", "drought", "climate"], "Extreme drought and fire amplify forest vulnerability.", "Climate stress and forest loss increasingly reinforce one another.", "The distinction between natural disaster and political land-use crisis becomes blurred."),
    createHotspot("Canadian boreal forests", 56, -106, 4, ["fire", "climate"], "Boreal fire activity becomes a major part of the global forest loss story.", "The deforestation conversation widens to include climate-driven forest disruption beyond the tropics.", "Warming transforms forests from carbon sinks into potential emission sources."),
    createHotspot("Siberian boreal zone", 62, 105, 3, ["fire", "warming"], "Large northern forests face increasing climate-related stress.", "Fire and heat alter forests not usually central in earlier deforestation narratives.", "Forest crisis is becoming global in a deeper climatic sense.")
  ],
  "2025-2026": [
    createHotspot("Amazon degradation front", -6, -57, 4, ["degradation", "logging", "fire", "drought"], "Even where clear-cutting fluctuates, degradation becomes a central threat.", "Canopy thinning, fragmentation, and recurrent fire undermine forest resilience.", "Forest politics must confront invisible or slow violence, not just visible clearings."),
    createHotspot("Congo Basin", 0, 18, 3, ["degradation", "mining", "roads"], "Pressure builds through overlapping forms of extraction and infrastructure.", "Standing forests may remain vulnerable even without dramatic headline deforestation rates.", "Protection must include community control, not only mapping and finance."),
    createHotspot("Global forest governance", 20, 0, 2, ["carbon markets", "policy", "finance"], "Forests become increasingly entangled in carbon markets and green finance.", "Climate policy now directly shapes how forests are valued and governed.", "Financial solutions can help, but may also create new forms of enclosure or inequity.")
  ]
};

function createHotspot(name, lat, lng, intensity, drivers, short, context, critical) {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    lat,
    lng,
    intensity,
    drivers,
    short,
    context,
    critical
  };
}

let currentEraIndex = 0;
let currentDriver = "all";
let selectedHotspotId = null;
let currentMarkers = [];

const map = L.map("map", {
  worldCopyJump: true,
  zoomControl: true
}).setView([18, 10], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
}).addTo(map);

const timelineButtonsEl = document.getElementById("timelineButtons");
const driverFiltersEl = document.getElementById("driverFilters");
const eraTitleEl = document.getElementById("eraTitle");
const eraSummaryEl = document.getElementById("eraSummary");
const eraMetaEl = document.getElementById("eraMeta");
const hotspotListEl = document.getElementById("hotspotList");

const selectedTitleEl = document.getElementById("selectedTitle");
const selectedSummaryEl = document.getElementById("selectedSummary");
const selectedDriversEl = document.getElementById("selectedDrivers");
const selectedContextEl = document.getElementById("selectedContext");
const selectedCriticalEl = document.getElementById("selectedCritical");

function getIntensityColor(intensity) {
  if (intensity <= 1) return "#39d98a";
  if (intensity === 2) return "#ffd166";
  if (intensity === 3) return "#ff9f43";
  return "#ff5d5d";
}

function getIntensityRadius(intensity) {
  if (intensity <= 1) return 10;
  if (intensity === 2) return 16;
  if (intensity === 3) return 22;
  return 28;
}

function renderTimelineButtons() {
  timelineButtonsEl.innerHTML = "";

  eras.forEach((era, index) => {
    const btn = document.createElement("button");
    btn.className = "timeline-btn" + (index === currentEraIndex ? " active" : "");
    btn.textContent = era.label;

    btn.addEventListener("click", () => {
      currentEraIndex = index;
      selectedHotspotId = null;
      renderAll();
    });

    timelineButtonsEl.appendChild(btn);
  });
}

function renderDriverFilters() {
  driverFiltersEl.innerHTML = "";

  const usefulDrivers = [
    "all",
    "cattle",
    "soy",
    "palm oil",
    "logging",
    "plantations",
    "mining",
    "fire",
    "climate",
    "policy",
    "degradation"
  ];

  usefulDrivers.forEach(driver => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (driver === currentDriver ? " active" : "");
    btn.textContent = driver === "all" ? "All" : driver;

    btn.addEventListener("click", () => {
      currentDriver = driver;
      selectedHotspotId = null;
      renderAll();
    });

    driverFiltersEl.appendChild(btn);
  });
}

function getCurrentEra() {
  return eras[currentEraIndex];
}

function getCurrentHotspots() {
  const era = getCurrentEra();
  let hotspots = hotspotsByEra[era.id] || [];

  if (currentDriver !== "all") {
    hotspots = hotspots.filter(h => h.drivers.includes(currentDriver));
  }

  return hotspots;
}

function renderEraInfo() {
  const era = getCurrentEra();

  eraTitleEl.textContent = `${era.label} · ${era.title}`;
  eraSummaryEl.textContent = era.summary;
  eraMetaEl.innerHTML = era.tags.map(tag => `<span class="chip">${tag}</span>`).join("");
}

function clearMarkers() {
  currentMarkers.forEach(marker => map.removeLayer(marker));
  currentMarkers = [];
}

function renderMapMarkers() {
  clearMarkers();

  const hotspots = getCurrentHotspots();

  hotspots.forEach(hotspot => {
    const marker = L.circleMarker([hotspot.lat, hotspot.lng], {
      radius: getIntensityRadius(hotspot.intensity),
      color: getIntensityColor(hotspot.intensity),
      fillColor: getIntensityColor(hotspot.intensity),
      fillOpacity: 0.4,
      weight: 2
    }).addTo(map);

    marker.bindPopup(`
      <div class="popup-title">${hotspot.name}</div>
      <div class="popup-meta">${getCurrentEra().label} · Drivers: ${hotspot.drivers.join(", ")}</div>
      <div class="popup-text">${hotspot.short}</div>
    `);

    marker.on("click", () => {
      selectedHotspotId = hotspot.id;
      renderSelectedHotspot();
      renderHotspotList();
    });

    currentMarkers.push(marker);
  });

  if (hotspots.length > 0) {
    const bounds = L.latLngBounds(hotspots.map(h => [h.lat, h.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });

    if (hotspots.length === 1) {
      map.setZoom(4);
    }
  } else {
    map.setView([18, 10], 2);
  }
}

function renderHotspotList() {
  const hotspots = getCurrentHotspots();
  hotspotListEl.innerHTML = "";

  if (!hotspots.length) {
    hotspotListEl.innerHTML = `
      <div class="hotspot-card">
        <div class="hotspot-card-text">No hotspots match this driver filter in the selected era.</div>
      </div>
    `;
    return;
  }

  hotspots.forEach(hotspot => {
    const card = document.createElement("div");
    card.className = "hotspot-card" + (selectedHotspotId === hotspot.id ? " active" : "");

    card.innerHTML = `
      <div class="hotspot-card-title">${hotspot.name}</div>
      <div class="hotspot-card-text">${hotspot.short}</div>
    `;

    card.addEventListener("click", () => {
      selectedHotspotId = hotspot.id;
      renderSelectedHotspot();
      renderHotspotList();

      const markerIndex = hotspots.findIndex(h => h.id === hotspot.id);
      if (currentMarkers[markerIndex]) {
        currentMarkers[markerIndex].openPopup();
        map.flyTo([hotspot.lat, hotspot.lng], Math.max(map.getZoom(), 4), {
          duration: 0.9
        });
      }
    });

    hotspotListEl.appendChild(card);
  });
}

function renderSelectedHotspot() {
  const hotspots = getCurrentHotspots();
  let hotspot = hotspots.find(h => h.id === selectedHotspotId);

  if (!hotspot && hotspots.length) {
    hotspot = hotspots[0];
    selectedHotspotId = hotspot.id;
  }

  if (!hotspot) {
    selectedTitleEl.textContent = "No hotspot selected";
    selectedSummaryEl.textContent = "Try another era or driver filter.";
    selectedDriversEl.textContent = "—";
    selectedContextEl.textContent = "—";
    selectedCriticalEl.textContent = "—";
    return;
  }

  selectedTitleEl.textContent = hotspot.name;
  selectedSummaryEl.textContent = hotspot.short;
  selectedDriversEl.textContent = hotspot.drivers.join(", ");
  selectedContextEl.textContent = hotspot.context;
  selectedCriticalEl.textContent = hotspot.critical;
}

function renderAll() {
  renderTimelineButtons();
  renderDriverFilters();
  renderEraInfo();
  renderMapMarkers();
  renderHotspotList();
  renderSelectedHotspot();
}

renderAll();
