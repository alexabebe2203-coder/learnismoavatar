"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const state = {
  profile: {
    identity: "",
    name: "",
    age: "",
    grade: "",
    nationality: ""
  },
  selectedPreferences: [],
  suggestions: [],
  plan: [],
  sound: false,
  avatarAccent: "#20f6ff",
  avatarSignature: ""
};

const countries = [
  ["Mexico", "🇲🇽", "contexto mexicano, cultura local y retos de comunidad"],
  ["Estados Unidos", "🇺🇸", "contexto bilingue, STEAM y ciudadania digital"],
  ["Colombia", "🇨🇴", "contexto latinoamericano, biodiversidad e innovacion social"],
  ["Argentina", "🇦🇷", "contexto argentino, pensamiento critico y creatividad"],
  ["Chile", "🇨🇱", "contexto chileno, ciencia aplicada y sostenibilidad"],
  ["Peru", "🇵🇪", "contexto peruano, patrimonio, tecnologia y ambiente"],
  ["Espana", "🇪🇸", "contexto europeo, competencias digitales y cultura"],
  ["Brasil", "🇧🇷", "contexto brasileño, ciencia, creatividad y comunidad"],
  ["Canada", "🇨🇦", "contexto multicultural, STEM y bienestar"],
  ["Otro pais", "🌐", "contexto internacional y aprendizaje global"]
];

const gradeGroups = [
  ["primaria-1", "🧩 Primaria 1°", "Primaria", 1, "#20f6ff"],
  ["primaria-2", "🎯 Primaria 2°", "Primaria", 2, "#38ffb5"],
  ["primaria-3", "🚀 Primaria 3°", "Primaria", 3, "#baff2e"],
  ["primaria-4", "⚡ Primaria 4°", "Primaria", 4, "#24a4ff"],
  ["primaria-5", "🛡️ Primaria 5°", "Primaria", 5, "#ff3cf4"],
  ["primaria-6", "🌌 Primaria 6°", "Primaria", 6, "#8e6bff"],
  ["secundaria-1", "🤖 Secundaria 1°", "Secundaria", 1, "#20f6ff"],
  ["secundaria-2", "🧠 Secundaria 2°", "Secundaria", 2, "#baff2e"],
  ["secundaria-3", "🎮 Secundaria 3°", "Secundaria", 3, "#ff3cf4"],
  ["preparatoria-1", "🔬 Preparatoria 1°", "Preparatoria", 1, "#2478ff"],
  ["preparatoria-2", "🛰️ Preparatoria 2°", "Preparatoria", 2, "#20f6ff"],
  ["preparatoria-3", "💎 Preparatoria 3°", "Preparatoria", 3, "#ff3cf4"],
  ["universidad-1", "🧬 Universidad 1°", "Universidad", 1, "#baff2e"],
  ["universidad-2", "🧪 Universidad 2°", "Universidad", 2, "#20f6ff"],
  ["universidad-3", "🧭 Universidad 3°", "Universidad", 3, "#2478ff"],
  ["universidad-4", "🏆 Universidad 4°", "Universidad", 4, "#ff3cf4"],
  ["universidad-5", "🚀 Universidad 5°", "Universidad", 5, "#baff2e"]
];

const blockedTerms = [
  "violencia", "arma", "armas", "droga", "drogas", "apuesta", "apuestas",
  "odio", "hackear", "hackeo malicioso", "contenido adulto", "autolesion"
];

const baseIdeas = {
  primaria: [
    ["Matematicas con misiones", "Numeros, operaciones y problemas cotidianos con retos tipo juego.", "🧮"],
    ["Ciencia exploradora", "Experimentos seguros, observacion y explicacion de fenomenos cercanos.", "🔬"],
    ["Lectura creativa", "Comprension, vocabulario y narracion usando mundos imaginativos.", "📚"],
    ["Razonamiento logico", "Patrones, secuencias, acertijos y toma de decisiones.", "🧩"],
    ["Arte digital inicial", "Color, formas, historias visuales y expresion con tecnologia.", "🎨"],
    ["Bienestar y habitos", "Organizacion, autoestima, colaboracion y metas pequeñas.", "🌱"],
    ["IA para aprender jugando", "Uso responsable de asistentes IA para preguntar, repasar y crear.", "🤖", true],
    ["Robotica y sensores", "Ideas de maquinas, instrucciones, causas y efectos.", "🦾", true],
    ["Ciudadania digital segura", "Privacidad, respeto online y busqueda confiable.", "🛡️", true],
    ["Naturaleza y planeta", "Ambiente, animales, agua, energia y acciones locales.", "🌎"]
  ],
  secundaria: [
    ["Algebra aplicada", "Variables, ecuaciones y modelos conectados con deportes y videojuegos.", "📐"],
    ["Biologia y salud", "Celulas, sistemas, nutricion y decisiones informadas.", "🧬"],
    ["Fisica cotidiana", "Movimiento, energia, fuerzas y tecnologia cercana.", "⚙️"],
    ["Escritura persuasiva", "Argumentos, evidencias, debates y comunicacion clara.", "✍️"],
    ["Pensamiento computacional", "Algoritmos, patrones, datos y resolucion de problemas.", "💻"],
    ["Proyecto creativo multimedia", "Video, audio, storytelling y diseno responsable.", "🎬"],
    ["IA generativa segura", "Prompts, verificacion, sesgos y uso etico de herramientas.", "🤖", true],
    ["Programacion visual y apps", "Logica, prototipos, interfaces y pruebas.", "📱", true],
    ["Ciberseguridad ciudadana", "Contraseñas, phishing, identidad digital y autocuidado.", "🛡️", true],
    ["Liderazgo y metas", "Gestion del tiempo, trabajo en equipo y resiliencia.", "🏆"]
  ],
  preparatoria: [
    ["Matematicas para decisiones", "Funciones, estadistica y modelos para analizar escenarios reales.", "📊"],
    ["Quimica y materiales", "Estructura de la materia, reacciones y soluciones sostenibles.", "🧪"],
    ["Fisica e ingenieria", "Energia, ondas, electricidad y prototipos.", "🛰️"],
    ["Lectura critica avanzada", "Analisis de fuentes, ensayo, argumentacion y pensamiento propio.", "📖"],
    ["Emprendimiento creativo", "Problemas reales, propuesta de valor y prototipo.", "💡"],
    ["Finanzas personales", "Presupuesto, ahorro, interes, consumo responsable.", "💳"],
    ["IA aplicada a proyectos", "Automatizacion, prompts, datos y criterios eticos.", "🤖", true],
    ["Desarrollo web moderno", "HTML, CSS, JavaScript, UX y publicacion segura.", "🌐", true],
    ["Datos y visualizacion", "Tablas, graficas, indicadores e historias con datos.", "📈", true],
    ["Bienestar de alto rendimiento", "Sueño, foco, habitos y preparacion academica.", "⚡"]
  ],
  universidad: [
    ["Investigacion aplicada", "Preguntas, metodologia, fuentes, analisis y comunicacion academica.", "🧭"],
    ["Analitica cuantitativa", "Estadistica, modelos, incertidumbre y toma de decisiones.", "📊"],
    ["Innovacion y producto", "Descubrimiento de usuarios, prototipos, validacion y mejora.", "💎"],
    ["Comunicacion profesional", "Presentaciones, escritura tecnica, negociacion y liderazgo.", "🎙️"],
    ["Etica y sociedad", "Impacto tecnologico, inclusion, seguridad y responsabilidad.", "⚖️"],
    ["Gestion de proyectos", "Objetivos, sprints, riesgos, metricas y retrospectivas.", "🗂️"],
    ["IA como copiloto profesional", "Flujos de trabajo, agentes, verificacion y productividad.", "🤖", true],
    ["Automatizacion no-code y APIs", "Integraciones, datos, servicios y prototipos escalables.", "🔌", true],
    ["Ciencia de datos moderna", "Limpieza, visualizacion, ML responsable y dashboards.", "🧠", true],
    ["Marca personal y portafolio", "Evidencias, casos, networking y carrera.", "🚀"]
  ]
};

const topicVisuals = ["🧠", "🚀", "🔬", "🎮", "🧩", "🌐", "🛡️", "💎"];
const topicColors = [
  ["rgba(32,246,255,.55)", "rgba(255,60,244,.38)"],
  ["rgba(186,255,46,.46)", "rgba(36,120,255,.36)"],
  ["rgba(255,60,244,.48)", "rgba(32,246,255,.35)"],
  ["rgba(36,120,255,.5)", "rgba(186,255,46,.32)"],
  ["rgba(32,246,255,.42)", "rgba(186,255,46,.34)"],
  ["rgba(255,60,244,.44)", "rgba(36,120,255,.34)"],
  ["rgba(186,255,46,.5)", "rgba(255,60,244,.3)"],
  ["rgba(32,246,255,.5)", "rgba(255,255,255,.18)"]
];

let scene;
let camera;
let renderer;
let avatarGroup;
let mouseX = 0;
let mouseY = 0;
let audioCtx;
let lastPointerTime = 0;
let lastAvatarFrame = 0;
let lastParticleFrame = 0;
let updateTimer = 0;
let avatarImageTimer = 0;
let avatarImageSignature = "";

document.addEventListener("DOMContentLoaded", () => {
  populateSelects();
  restoreState();
  bindEvents();
  clearParticleCanvas();
  updateAll();
});

function populateSelects() {
  const age = $("#age");
  for (let i = 5; i <= 25; i += 1) {
    age.insertAdjacentHTML("beforeend", `<option value="${i}">${i} años</option>`);
  }

  const grade = $("#grade");
  gradeGroups.forEach(([value, label, group]) => {
    grade.insertAdjacentHTML("beforeend", `<option value="${value}" data-group="${group}">${label}</option>`);
  });

  const nationality = $("#nationality");
  countries.forEach(([name, flag]) => {
    nationality.insertAdjacentHTML("beforeend", `<option value="${name}">${flag} ${name}</option>`);
  });
}

function bindEvents() {
  ["identity", "avatarName", "age", "grade", "nationality"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      readProfile();
      scheduleUpdateAll();
      saveState();
    });
  });

  $("#addPreferenceBtn").addEventListener("click", addManualPreference);
  $("#manualPreference").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addManualPreference();
    }
  });

  $("#createAvatarBtn").addEventListener("click", createAvatarAndPlan);
  $("#downloadPdfBtn").addEventListener("click", downloadPdf);
  $("#soundToggle").addEventListener("click", toggleSound);

  window.addEventListener("pointermove", (event) => {
    const now = performance.now();
    if (now - lastPointerTime < 48) return;
    lastPointerTime = now;
    mouseX = (event.clientX / window.innerWidth - .5) * 2;
    mouseY = (event.clientY / window.innerHeight - .5) * 2;
  }, { passive: true });

  window.addEventListener("resize", resizeAvatarRenderer);
}

function readProfile() {
  state.profile.identity = $("#identity").value;
  state.profile.name = $("#avatarName").value.trim();
  state.profile.age = $("#age").value;
  state.profile.grade = $("#grade").value;
  state.profile.nationality = $("#nationality").value;
}

function restoreState() {
  const saved = JSON.parse(localStorage.getItem("learnismoAvatarState") || "{}");
  if (saved.profile) {
    $("#identity").value = saved.profile.identity || "";
    $("#avatarName").value = saved.profile.name || "";
    $("#age").value = saved.profile.age || "";
    $("#grade").value = saved.profile.grade || "";
    $("#nationality").value = saved.profile.nationality || "";
  }
  state.selectedPreferences = Array.isArray(saved.selectedPreferences) ? saved.selectedPreferences : [];
  readProfile();
}

function saveState() {
  localStorage.setItem("learnismoAvatarState", JSON.stringify({
    profile: state.profile,
    selectedPreferences: state.selectedPreferences
  }));
}

function updateAll() {
  updateFlag();
  if (isProfileReadyForPreferences()) {
    generateSuggestions();
  } else {
    state.suggestions = [];
    state.selectedPreferences = state.selectedPreferences.filter((pref) => pref.startsWith("Custom: "));
  }
  renderPreferences();
  updateSelectedPreferenceBar();
  updateAvatarProfile();
  updateTerminal();
}

function scheduleUpdateAll() {
  clearTimeout(updateTimer);
  updateTimer = setTimeout(updateAll, 80);
}

function isProfileReadyForPreferences() {
  return Boolean(
    state.profile.identity &&
    state.profile.name &&
    state.profile.age &&
    state.profile.grade &&
    state.profile.nationality
  );
}

function updateFlag() {
  const country = getCountry();
  $("#flagPreview").textContent = country?.[1] || "🌐";
}

function getGradeData() {
  return gradeGroups.find(([value]) => value === state.profile.grade) || null;
}

function getCountry() {
  return countries.find(([name]) => name === state.profile.nationality) || null;
}

function getAcademicBand() {
  const grade = getGradeData();
  if (!grade) return "primaria";
  const group = grade[2].toLowerCase();
  if (group.includes("secundaria")) return "secundaria";
  if (group.includes("preparatoria")) return "preparatoria";
  if (group.includes("universidad")) return "universidad";
  return "primaria";
}

function generateSuggestions() {
  const band = getAcademicBand();
  const age = Number(state.profile.age || 0);
  const country = getCountry();
  const context = country?.[2] || "contexto global";
  state.suggestions = baseIdeas[band].map((item, index) => ({
    id: `${band}-${index}-${item[0].toLowerCase().replace(/\s+/g, "-")}`,
    title: item[0],
    description: adaptPreferenceDescription(item[1], age, context),
    icon: item[2],
    trending: Boolean(item[3])
  }));

  state.selectedPreferences = state.selectedPreferences.filter((pref) =>
    state.suggestions.some((suggestion) => suggestion.title === pref) || pref.startsWith("Custom: ")
  );
}

function adaptPreferenceDescription(description, age, context) {
  const ageText = age ? ` Ajustado para ${age} años` : " Ajustado a la edad seleccionada";
  return `${description}${ageText}, con ${context}.`;
}

function renderPreferences() {
  const grid = $("#preferenceGrid");
  grid.innerHTML = "";

  const ready = isProfileReadyForPreferences();
  $("#manualPreference").disabled = !ready;
  $("#addPreferenceBtn").disabled = !ready;

  if (!ready) {
    grid.innerHTML = `
      <div class="preference-locked">
        <span class="pref-lock-icon">AI</span>
        <h3>Preferencias bloqueadas</h3>
        <p>Completa identidad, nombre del avatar, edad, escolaridad y nacionalidad. Despues la IA generara 10 rutas reales para ese perfil.</p>
      </div>
    `;
    return;
  }

  state.suggestions.forEach((pref) => {
    const selected = state.selectedPreferences.includes(pref.title);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `preference-card${pref.trending ? " trending" : ""}${selected ? " selected" : ""}`;
    button.dataset.preference = pref.title;
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = `
      ${pref.trending ? '<span class="badge">TRENDING</span>' : ""}
      <span class="pref-icon">${pref.icon}</span>
      <h3>${escapeHtml(pref.title)}</h3>
      <p>${escapeHtml(pref.description)}</p>
    `;
    button.addEventListener("click", () => togglePreference(pref.title, button));
    grid.appendChild(button);
  });

  state.selectedPreferences
    .filter((pref) => pref.startsWith("Custom: "))
    .forEach((pref) => {
      const clean = pref.replace("Custom: ", "");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "preference-card selected";
      button.setAttribute("aria-pressed", "true");
      button.innerHTML = `
        <span class="pref-icon">✨</span>
        <h3>${escapeHtml(clean)}</h3>
        <p>Preferencia personalizada agregada por el usuario, validada para una ruta educativa segura.</p>
      `;
      button.addEventListener("click", () => togglePreference(pref, button));
      grid.appendChild(button);
    });
  updateSelectedPreferenceBar();
}

function togglePreference(title, card) {
  if (state.selectedPreferences.includes(title)) {
    state.selectedPreferences = state.selectedPreferences.filter((item) => item !== title);
    card?.classList.remove("selected");
    card?.setAttribute("aria-pressed", "false");
  } else {
    state.selectedPreferences.push(title);
    card?.classList.add("selected");
    card?.setAttribute("aria-pressed", "true");
  }
  saveState();
  updateSelectedPreferenceBar();
  updateAvatarProfile(false);
  scheduleAvatarImageGeneration();
  updateTerminal();
  showMessage(`${state.selectedPreferences.length} preferencias activas para el plan IA.`, "ok");
}

function updateSelectedPreferenceBar() {
  const bar = $("#selectedPreferenceBar");
  if (!bar) return;
  if (!isProfileReadyForPreferences()) {
    bar.innerHTML = "<strong>Esperando perfil completo</strong><span>Las 10 preferencias se crearan hasta tener todos los datos necesarios.</span>";
    return;
  }
  const count = state.selectedPreferences.length;
  const clean = state.selectedPreferences.map((pref) => pref.replace("Custom: ", ""));
  bar.innerHTML = count
    ? `<strong>${count} seleccionada${count === 1 ? "" : "s"}</strong><span>${escapeHtml(clean.slice(0, 5).join(" • "))}${count > 5 ? " • +" + (count - 5) : ""}</span>`
    : "<strong>0 seleccionadas</strong><span>Elige las rutas que activaran el avatar y el plan IA.</span>";
}

function addManualPreference() {
  if (!isProfileReadyForPreferences()) {
    showMessage("Completa primero toda la informacion principal para activar preferencias.", "error");
    return;
  }
  const input = $("#manualPreference");
  const value = input.value.trim();
  if (!value) return;
  if (containsBlockedContent(value)) {
    showMessage("Esa preferencia no es apta para un plan educativo seguro. Prueba con un tema academico, creativo o tecnologico.", "error");
    return;
  }
  const custom = `Custom: ${value}`;
  if (!state.selectedPreferences.includes(custom)) state.selectedPreferences.push(custom);
  input.value = "";
  saveState();
  renderPreferences();
  updateSelectedPreferenceBar();
  updateAvatarProfile(false);
  scheduleAvatarImageGeneration();
  showMessage("Preferencia agregada al nucleo del avatar.", "ok");
}

function tiltCard(event) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  card.style.transform = `translateY(-4px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
}

function resetTilt(event) {
  event.currentTarget.style.transform = "";
}

function updateAvatarProfile(rebuildVisual = true) {
  const grade = getGradeData();
  const name = state.profile.name || "Sincronizando...";
  const age = Number(state.profile.age || 0);
  const selected = state.selectedPreferences.join(" ").toLowerCase();
  const identity = state.profile.identity || "explorador";

  $("#sideAvatarName").textContent = name;
  $("#avatarMood").textContent = identity === "prefiero no decir" ? "Identidad privada" : `Modo ${identity}`;
  $("#avatarPower").textContent = `${state.selectedPreferences.length || 1} rutas activas`;

  const suit = grade?.[2] === "Universidad" ? "Quantum Scholar" :
    grade?.[2] === "Preparatoria" ? "Cyber Varsity" :
    grade?.[2] === "Secundaria" ? "Neon Striker" : "Explorer Rookie";
  const gadget = selected.includes("ia") ? "Nucleo IA generativa" :
    selected.includes("robot") || selected.includes("program") ? "Guante programable" :
    selected.includes("ciencia") || selected.includes("quim") ? "Lab holografico" : "Tutor IA orbital";
  const aura = age >= 18 ? "Azul electrico senior" : age >= 12 ? "Rosa-cyan competitivo" : "Lima creativo";

  $("#loadoutSuit").textContent = suit;
  $("#loadoutGadget").textContent = gadget;
  $("#loadoutAura").textContent = aura;

  state.avatarAccent = grade?.[4] || "#20f6ff";
  if (rebuildVisual) scheduleAvatarImageGeneration();
}

function updateTerminal() {
  const grade = getGradeData();
  const country = getCountry();
  const lines = [
    `> Avatar: ${state.profile.name || "pendiente"}`,
    `> Identidad: ${state.profile.identity || "pendiente"}`,
    `> Nivel: ${grade?.[1] || "pendiente"}`,
    `> Pais: ${country ? `${country[1]} ${country[0]}` : "pendiente"}`,
    `> Preferencias: ${state.selectedPreferences.length} seleccionadas`
  ];
  $("#miniTerminal").innerHTML = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
}

function validateProfile() {
  readProfile();
  const missing = [];
  if (!state.profile.identity) missing.push("identidad del avatar");
  if (!state.profile.name) missing.push("nombre del avatar");
  if (!state.profile.age) missing.push("edad");
  if (!state.profile.grade) missing.push("escolaridad");
  if (!state.profile.nationality) missing.push("nacionalidad");
  if (state.selectedPreferences.length === 0) missing.push("al menos una preferencia");

  if (missing.length) {
    return `Falta completar: ${missing.join(", ")}.`;
  }

  const joined = [state.profile.name, ...state.selectedPreferences].join(" ");
  if (containsBlockedContent(joined)) {
    return "Detecte contenido sensible o no apto para menores. Ajusta el nombre o preferencias para crear un plan seguro.";
  }

  return "";
}

function containsBlockedContent(text) {
  const lower = normalize(text);
  return blockedTerms.some((term) => lower.includes(normalize(term)));
}

function normalize(text) {
  return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function createAvatarAndPlan() {
  const error = validateProfile();
  if (error) {
    showMessage(error, "error");
    beep(180, .08);
    return;
  }

  showMessage("IA educativa activada. Construyendo experiencia...", "ok");
  generatePremiumAvatarImage(true);
  await runProgress();
  state.plan = generateStudyPlan();
  renderStudyPlan();
  saveState();
  $("#resultsZone").hidden = false;
  $("#resultsZone").scrollIntoView({ behavior: "smooth", block: "start" });
  beep(660, .11);
}

function runProgress() {
  return new Promise((resolve) => {
    const overlay = $("#progressOverlay");
    const fill = $("#progressFill");
    const percent = $("#progressPercent");
    const title = $("#progressTitle");
    const terminal = $("#progressTerminal");
    const steps = [
      "Analizando perfil...",
      "Generando habilidades...",
      "Creando avatar...",
      "Construyendo plan de aprendizaje...",
      "Integrando IA educativa...",
      "Optimizando misiones y recompensas..."
    ];
    let value = 0;
    let step = 0;
    terminal.innerHTML = "";
    overlay.hidden = false;
    beep(420, .05);

    const timer = setInterval(() => {
      value += Math.floor(Math.random() * 18) + 12;
      if (value > 100) value = 100;
      fill.style.width = `${value}%`;
      percent.textContent = `${value}%`;

      const nextStep = Math.min(steps.length - 1, Math.floor((value / 100) * steps.length));
      if (nextStep !== step || value === 100) {
        step = nextStep;
        title.textContent = steps[step];
        terminal.insertAdjacentHTML("beforeend", `<p>> ${steps[step]} modulo ${String(step + 1).padStart(2, "0")} OK</p>`);
        terminal.scrollTop = terminal.scrollHeight;
        beep(340 + step * 70, .04);
      }

      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          overlay.hidden = true;
          resolve();
        }, 260);
      }
    }, 95);
  });
}

function generateStudyPlan() {
  const band = getAcademicBand();
  const grade = getGradeData();
  const country = getCountry();
  const age = Number(state.profile.age);
  const prefs = state.selectedPreferences.map((pref) => pref.replace("Custom: ", ""));
  const context = country?.[2] || "contexto internacional";
  const levelName = grade ? grade[1].replace(/[^\w\s°]/g, "").trim() : "nivel seleccionado";
  const countryName = country?.[0] || "su pais";
  const difficulty = band === "primaria" ? "Progresiva y visual" :
    band === "secundaria" ? "Intermedia con retos" :
    band === "preparatoria" ? "Media-avanzada aplicada" : "Avanzada profesional";

  const focus = createPreferenceDrivenBlueprint(prefs, band, grade, age, countryName);
  return focus.slice(0, 8).map((item, index) => {
    const pref = item.preference || prefs[index % Math.max(prefs.length, 1)] || item.area;
    const practice = item.practice || [
      `Aplicar el tema en un reto breve relacionado con ${pref}`,
      "Crear una evidencia visual o escrita del aprendizaje",
      "Usar IA solo para recibir pistas, verificar pasos y mejorar la explicacion"
    ];
    return {
      title: item.title.replace("{pref}", pref),
      description: item.description,
      difficulty,
      benefit: item.benefit,
      objectives: item.objectives,
      selectedPreference: pref,
      subtopics: item.subtopics.map((subtopic) => simplifyPlanLine(subtopic)),
      practice: practice.map((activity) => simplifyPlanLine(activity)),
      assessment: item.assessment || "Evidencia: producto breve, explicacion del proceso y mini rubrica de comprension.",
      visual: topicVisuals[index],
      colors: topicColors[index]
    };
  });
}

function createPreferenceDrivenBlueprint(prefs, band, grade, age, countryName) {
  const cleanPrefs = prefs.length ? prefs : ["Aprendizaje personalizado"];
  const moduleGroups = cleanPrefs.map((pref) => buildPreferenceModules(pref, band, grade, age, countryName));
  const maxGroupLength = Math.max(...moduleGroups.map((group) => group.length));
  const perPreference = [];
  for (let i = 0; i < maxGroupLength; i += 1) {
    moduleGroups.forEach((group) => {
      if (group[i]) perPreference.push(group[i]);
    });
  }
  const selected = [];
  const seen = new Set();
  let cursor = 0;
  while (selected.length < 8 && cursor < perPreference.length * 3) {
    const item = perPreference[cursor % perPreference.length];
    const key = normalize(item.title);
    if (!seen.has(key)) {
      seen.add(key);
      selected.push(item);
    }
    cursor += 1;
  }

  while (selected.length < 8) {
    const pref = cleanPrefs[selected.length % cleanPrefs.length];
    selected.push(buildCapstoneModule(pref, band, grade, age, countryName, selected.length + 1));
  }
  return selected.slice(0, 8);
}

function buildPreferenceModules(pref, band, grade, age, countryName) {
  const intent = detectPreferenceIntent(pref);
  const level = levelDescriptor(band, grade, age);
  if (intent === "finance") return financeModules(pref, level, countryName);
  if (intent === "ai") return aiModules(pref, level, countryName);
  if (intent === "robotics") return roboticsModules(pref, level, countryName);
  if (intent === "technology") return technologyModules(pref, level, countryName);
  if (intent === "creativity") return creativityModules(pref, level, countryName);
  if (intent === "science") return scienceInterestModules(pref, level, countryName);
  if (intent === "math") return mathInterestModules(pref, level, countryName);
  if (intent === "wellbeing") return wellbeingModules(pref, level, countryName);
  return customInterestModules(pref, level, countryName);
}

function detectPreferenceIntent(pref) {
  const text = normalize(pref);
  if (/(finanza|dinero|ahorro|presupuesto|inversion|negocio|emprend|econom)/.test(text)) return "finance";
  if (/(ia|inteligencia artificial|prompt|chatbot|agente)/.test(text)) return "ai";
  if (/(robot|sensor|arduino|mecanica|drone)/.test(text)) return "robotics";
  if (/(tecnolog|program|app|web|videojuego|comput|codigo|software)/.test(text)) return "technology";
  if (/(arte|creativ|dibujo|musica|cuento|animacion|diseno|diseño|multimedia)/.test(text)) return "creativity";
  if (/(ciencia|biologia|fisica|quimica|astronomia|naturaleza|ecosistema)/.test(text)) return "science";
  if (/(matemat|logica|razonamiento|ajedrez|numer)/.test(text)) return "math";
  if (/(bienestar|habito|liderazgo|emocion|salud|deporte|metas)/.test(text)) return "wellbeing";
  return "custom";
}

function levelDescriptor(band, grade, age) {
  const gradeText = grade?.[1] || "nivel seleccionado";
  const simple = band === "primaria";
  const intermediate = band === "secundaria";
  return {
    band,
    gradeText,
    age,
    depth: simple ? "visual, concreto y con retos cortos" : intermediate ? "practico, comparativo y con explicaciones guiadas" : band === "preparatoria" ? "aplicado, analitico y con proyectos" : "profesional, investigativo y con entregables",
    math: simple ? "operaciones, fracciones/decimales, medidas, tablas y graficas del grado" : intermediate ? "proporciones, algebra, funciones iniciales, datos y modelos" : band === "preparatoria" ? "funciones, estadistica, modelos y decisiones cuantitativas" : "analitica, indicadores, datos y criterios de decision",
    writing: simple ? "explicaciones breves, bitacoras, vocabulario y presentaciones visuales" : intermediate ? "argumentos, fuentes, reportes y exposiciones" : band === "preparatoria" ? "ensayo, reporte tecnico y presentacion" : "documentacion profesional, investigacion y pitch"
  };
}

function financeModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Finanzas personales", source, `Dinero inteligente para ${level.gradeText}`, `Aprender que es el dinero, ingresos, gastos, necesidades, deseos y decisiones de compra con enfoque ${level.depth}.`, "Construye criterio financiero temprano sin temas de riesgo.", ["Distinguir ingreso, gasto, necesidad y deseo", "Registrar decisiones de compra", "Explicar consecuencias"], ["Concepto de dinero y valor", "Necesidades vs deseos", "Ingresos familiares o simulados", "Gastos fijos y variables", `Ejemplos seguros de ${countryName}`], ["Crear lista de compras priorizada", "Simular una semana de gastos", "Explicar una decision buena y una mala"], "Evidencia: tabla de ingresos/gastos simulados y reflexion de decisiones."),
    makePreferenceTopic(pref, "Presupuesto", source, "Presupuesto gamer: planear antes de gastar", "Convierte la preferencia de finanzas en un reto de planeacion con metas, limites y seguimiento.", "Mejora organizacion, autocontrol y pensamiento matematico aplicado.", ["Crear presupuesto simple", "Calcular saldos", "Ajustar gastos"], ["Presupuesto semanal o mensual", level.math, "Suma, resta y comparacion de cantidades", "Categorias de gasto", "Saldo final y toma de decisiones"], ["Disenar presupuesto para avatar/proyecto", "Comparar dos escenarios", "Usar grafica de barras para gastos"], "Evidencia: presupuesto completo, grafica y explicacion."),
    makePreferenceTopic(pref, "Ahorro", source, "Ahorro, metas y recompensas alcanzables", "Trabaja ahorro como proyecto motivador adaptado a edad y escolaridad.", "Desarrolla paciencia, planeacion y metas realistas.", ["Definir meta", "Calcular ahorro periodico", "Medir avance"], ["Meta SMART", "Cantidad objetivo", "Ahorro por semana", "Tiempo necesario", "Obstaculos y ajustes"], ["Plan de ahorro para una meta segura", "Barra de progreso", "Reflexion de sacrificios y beneficios"], "Evidencia: plan de ahorro visual con calculos."),
    makePreferenceTopic(pref, "Compras", source, "Compras inteligentes: precios, descuentos y comparacion", "Usa precios, unidades, descuentos y calidad para decidir mejor.", "Conecta matematicas escolares con vida diaria.", ["Comparar precios", "Calcular cambios o descuentos", "Justificar una compra"], ["Precio unitario", "Cambio y estimacion", "Descuentos seguros segun nivel", "Calidad vs precio", "Publicidad y consumo responsable"], ["Comparar tres productos", "Detectar una oferta engañosa simple", "Crear regla de compra inteligente"], "Evidencia: comparativa de productos y decision argumentada."),
    makePreferenceTopic(pref, "Datos financieros", source, "Graficas de gastos y decisiones con datos", "Convierte registros de gastos en tablas, graficas y conclusiones.", "Mejora lectura de datos y razonamiento.", ["Registrar datos", "Crear graficas", "Interpretar patrones"], ["Tabla de frecuencia", "Grafica de barras o pastel segun nivel", "Promedio o total", "Categorias de gasto", "Conclusiones"], ["Graficar gastos simulados", "Encontrar categoria mayor", "Proponer mejora"], "Evidencia: tabla, grafica y conclusion."),
    makePreferenceTopic(pref, "Emprendimiento seguro", source, "Mini negocio educativo sin riesgo", "Diseña un proyecto ficticio para entender costo, precio, ganancia y valor para otros.", "Introduce emprendimiento de forma segura y escolar.", ["Definir producto o servicio", "Calcular costos", "Presentar propuesta"], ["Costo de materiales", "Precio justo", "Ganancia simulada", "Cliente y necesidad", "Etica y seguridad"], ["Crear mini tienda escolar ficticia", "Calcular 5 ventas simuladas", "Pitch de 60 segundos"], "Evidencia: ficha de negocio, calculos y pitch."),
    makePreferenceTopic(pref, "Seguridad financiera", source, "Seguridad digital y dinero en internet", "Aprende cuidado de datos, compras online, publicidad, estafas y autorizacion adulta.", "Protege a menores y forma criterio digital.", ["Reconocer riesgos", "Proteger datos", "Pedir ayuda adulta"], ["Datos personales", "Compras en apps y videojuegos", "Publicidad e influenciadores", "Señales de estafa", "Reglas familiares de seguridad"], ["Checklist de compra segura", "Analizar anuncio ficticio", "Crear regla de proteccion"], "Evidencia: checklist y caso resuelto."),
    makePreferenceTopic(pref, "Proyecto final", source, "Mision final: plan financiero del avatar", "Integra presupuesto, ahorro, compras y datos en un proyecto final personalizado.", "Convierte la preferencia en aprendizaje visible.", ["Integrar aprendizajes", "Presentar plan", "Reflexionar mejora"], ["Meta del avatar", "Presupuesto", "Ahorro", "Comparacion de compras", "Grafica de avance"], ["Crear plan financiero del avatar", "Presentar en una pagina", "Autoevaluar decisiones"], "Evidencia: portafolio financiero completo.")
  ];
}

function aiModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "IA", source, "Prompts utiles para estudiar mejor", `Aprender a pedir ayuda a la IA con instrucciones claras y nivel ${level.depth}.`, "Mejora autonomia sin reemplazar el pensamiento propio.", ["Escribir prompts", "Pedir explicaciones", "Mejorar respuestas"], ["Rol, objetivo y contexto", "Preguntas paso a paso", "Ejemplos y contraejemplos", "Limites de la IA", "Privacidad"], ["Crear 5 prompts de estudio", "Comparar respuesta mala vs buena", "Mejorar un prompt"], "Evidencia: banco de prompts comentado."),
    makePreferenceTopic(pref, "IA segura", source, "Verificacion, errores y fuentes confiables", "Usa IA con pensamiento critico: revisar, contrastar y corregir.", "Evita dependencia y errores.", ["Detectar errores", "Contrastar fuentes", "Explicar con palabras propias"], ["Alucinaciones", "Fuentes confiables", "Sesgos", "Citas simples", "Revision humana"], ["Pedir a IA una respuesta y verificarla", "Marcar dudas", "Crear checklist de verificacion"], "Evidencia: respuesta auditada."),
    makePreferenceTopic(pref, "IA creativa", source, "Crear materiales de estudio con IA", "Genera tarjetas, quiz, historias o ejemplos adaptados al nivel.", "Hace el estudio mas activo.", ["Crear quiz", "Crear resumen", "Revisar dificultad"], ["Flashcards", "Preguntas de opcion multiple", "Resumen guiado", "Rubricas", "Retroalimentacion"], ["Crear quiz de 10 preguntas", "Pedir pistas graduadas", "Autoevaluarse"], "Evidencia: kit de estudio generado y corregido."),
    makePreferenceTopic(pref, "Proyecto IA", source, "Mini agente tutor del avatar", "Diseña el comportamiento de un tutor IA seguro para el avatar.", "Integra tecnologia, comunicacion y etica.", ["Definir reglas", "Diseñar flujo", "Probar utilidad"], ["Personalidad del tutor", "Reglas de seguridad", "Preguntas frecuentes", "Ruta de ayuda", "Evaluacion de respuesta"], ["Diseñar guion de tutor", "Probar 3 casos", "Mejorar reglas"], "Evidencia: ficha del tutor IA.")
  ];
}

function roboticsModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Robotica", source, "Robotica desde cero: sensores, ordenes y misiones", `Explora robots como sistemas que reciben informacion, deciden y actuan con enfoque ${level.depth}.`, "Desarrolla pensamiento computacional y resolucion de problemas.", ["Comprender entrada-proceso-salida", "Diseñar instrucciones", "Probar mejoras"], ["Sensores", "Actuadores", "Algoritmos", "Secuencias", "Depuracion"], ["Diseñar robot en papel", "Crear flujo de decisiones", "Probar ruta en cuadricula"], "Evidencia: diagrama de robot y algoritmo."),
    makePreferenceTopic(pref, "Programacion", source, "Algoritmos para controlar un robot", "Convierte misiones en pasos claros, condiciones y repeticiones.", "Mejora logica y precision.", ["Crear secuencias", "Usar condiciones", "Corregir errores"], ["Instrucciones", "Bucles", "Condicionales", "Eventos", "Pruebas"], ["Programar ruta sin codigo", "Detectar error", "Optimizar pasos"], "Evidencia: pseudocodigo o bloques."),
    makePreferenceTopic(pref, "Ingenieria", source, "Diseño de prototipo robotico", "Diseña una solucion robotica para escuela, casa o comunidad.", "Conecta creatividad con utilidad.", ["Detectar problema", "Diseñar prototipo", "Evaluar impacto"], ["Problema", "Usuario", "Materiales", "Funcion", "Mejora"], ["Boceto del prototipo", "Lista de piezas", "Pitch de solucion"], "Evidencia: ficha de prototipo.")
  ];
}

function technologyModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Tecnologia", source, `Proyecto digital basado en ${pref}`, "Aprende a convertir una idea tecnologica en flujo, interfaz o prototipo.", "Desarrolla habilidades digitales utiles.", ["Diseñar flujo", "Prototipar", "Probar con usuario"], ["Problema", "Pantallas o pasos", "Datos necesarios", "Seguridad", "Mejora"], ["Wireframe", "Prueba con familiar", "Iteracion"], "Evidencia: prototipo y explicacion."),
    makePreferenceTopic(pref, "Pensamiento computacional", source, "Resolver problemas como programador", "Divide problemas en pasos, patrones y reglas.", "Mejora logica transferible.", ["Descomponer", "Crear algoritmo", "Evaluar resultado"], ["Descomposicion", "Patrones", "Abstraccion", "Algoritmos", "Depuracion"], ["Mapa de problema", "Algoritmo de solucion", "Prueba"], "Evidencia: algoritmo probado."),
    makePreferenceTopic(pref, "Seguridad digital", source, "Tecnologia segura y responsable", "Aprende privacidad, contraseñas, huella digital y uso responsable.", "Protege al estudiante.", ["Cuidar datos", "Identificar riesgos", "Tomar decisiones"], ["Privacidad", "Contraseñas", "Phishing", "Tiempo de pantalla", "Respeto online"], ["Checklist de seguridad", "Caso de riesgo", "Regla familiar"], "Evidencia: checklist.")
  ];
}

function creativityModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Creatividad", source, `Proyecto creativo de ${pref}`, "Convierte la preferencia creativa en producto visual, narrativo o multimedia.", "Desarrolla expresion y comunicacion.", ["Idear", "Crear", "Mejorar"], ["Idea central", "Audiencia", "Estilo", "Boceto", "Version final"], ["Moodboard", "Boceto", "Presentacion"], "Evidencia: pieza creativa final."),
    makePreferenceTopic(pref, "Narrativa", source, "Storytelling para explicar ideas", "Usa historia, personajes, conflicto y solucion para comunicar.", "Mejora escritura y presentacion.", ["Crear estructura", "Usar detalles", "Revisar claridad"], ["Inicio", "Desarrollo", "Cierre", "Personaje", "Mensaje"], ["Guion breve", "Storyboard", "Lectura en voz alta"], "Evidencia: guion/storyboard."),
    makePreferenceTopic(pref, "Portafolio", source, "Portafolio visual de progreso", "Documenta avances y decisiones creativas.", "Hace visible el aprendizaje.", ["Registrar proceso", "Elegir evidencias", "Reflexionar"], ["Antes/despues", "Decisiones", "Errores", "Mejoras", "Presentacion"], ["Bitacora", "Galeria", "Autoevaluacion"], "Evidencia: portafolio.")
  ];
}

function scienceInterestModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Investigacion", source, `Exploracion cientifica de ${pref}`, "Transforma la curiosidad en preguntas, hipotesis y observaciones seguras.", "Desarrolla pensamiento cientifico.", ["Preguntar", "Observar", "Concluir"], ["Pregunta investigable", "Hipotesis", "Variables", "Registro", "Conclusion"], ["Bitacora", "Experimento seguro", "Infografia"], "Evidencia: reporte cientifico."),
    makePreferenceTopic(pref, "Modelo", source, "Modelo visual para comprender fenomenos", "Representa el tema con maqueta, diagrama o simulacion.", "Mejora comprension conceptual.", ["Modelar", "Explicar", "Relacionar"], ["Partes", "Relaciones", "Causa y efecto", "Escala", "Limitaciones"], ["Modelo o dibujo", "Explicacion oral", "Revision"], "Evidencia: modelo explicado."),
    makePreferenceTopic(pref, "Impacto", source, "Ciencia, ambiente y comunidad", "Relaciona la preferencia con problemas reales y acciones posibles.", "Conecta aprendizaje y responsabilidad.", ["Analizar impacto", "Proponer accion", "Evaluar consecuencias"], ["Contexto local", "Riesgos", "Beneficios", "Acciones", "Medicion"], ["Caso local", "Propuesta", "Indicador"], "Evidencia: propuesta.")
  ];
}

function mathInterestModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Razonamiento", source, `Retos matematicos de ${pref}`, "Usa la preferencia para resolver problemas numericos y logicos adaptados.", "Fortalece pensamiento abstracto.", ["Resolver", "Explicar", "Generalizar"], [level.math, "Patrones", "Estrategias", "Errores comunes", "Verificacion"], ["Reto semanal", "Explicacion paso a paso", "Correccion de error"], "Evidencia: problemario personalizado."),
    makePreferenceTopic(pref, "Datos", source, "Datos, graficas y predicciones", "Convierte la preferencia en datos para analizar.", "Mejora interpretacion.", ["Recolectar datos", "Graficar", "Concluir"], ["Tabla", "Grafica", "Promedio o tendencia", "Comparacion", "Decision"], ["Encuesta", "Grafica", "Conclusion"], "Evidencia: reporte de datos."),
    makePreferenceTopic(pref, "Logica", source, "Logica y estrategia", "Entrena decisiones con reglas, condiciones y consecuencias.", "Mejora planeacion.", ["Identificar reglas", "Comparar estrategias", "Optimizar"], ["Si-entonces", "Casos", "Arbol de decision", "Probabilidad simple", "Estrategia"], ["Juego de logica", "Arbol de decision", "Reflexion"], "Evidencia: estrategia explicada.")
  ];
}

function wellbeingModules(pref, level, countryName) {
  const source = `Preferencia del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Metas", source, `Plan personal de ${pref}`, "Convierte la preferencia en habitos, metas y seguimiento.", "Mejora constancia.", ["Definir meta", "Medir avance", "Ajustar"], ["Meta SMART", "Rutina", "Indicador", "Obstaculos", "Recompensa sana"], ["Plan semanal", "Registro", "Reflexion"], "Evidencia: tablero de progreso."),
    makePreferenceTopic(pref, "Autogestion", source, "Organizacion, energia y foco", "Aprende a estudiar sin saturarse.", "Sostiene aprendizaje.", ["Planear", "Priorizar", "Descansar"], ["Bloques de estudio", "Pausas", "Ambiente", "Motivacion", "Autoevaluacion"], ["Agenda", "Tecnica de enfoque", "Revision"], "Evidencia: rutina.")
  ];
}

function customInterestModules(pref, level, countryName) {
  const source = `Preferencia personalizada del usuario: ${pref}`;
  return [
    makePreferenceTopic(pref, "Exploracion", source, `Fundamentos de ${pref}`, `Construye una base clara sobre "${pref}" con dificultad ${level.depth}.`, "Convierte un gusto personal en ruta de aprendizaje real.", ["Comprender conceptos", "Crear vocabulario", "Explicar utilidad"], [`Que es ${pref}`, "Conceptos clave", "Vocabulario esencial", "Ejemplos seguros", "Errores o mitos comunes"], ["Mapa conceptual", "Glosario", "Explicacion breve"], "Evidencia: mapa y glosario."),
    makePreferenceTopic(pref, "Aplicacion", source, `${pref} aplicado a un proyecto realista`, "Lleva el tema a una actividad concreta y alcanzable.", "Hace el aprendizaje accionable.", ["Aplicar", "Crear", "Probar"], ["Problema", "Idea", "Materiales o recursos", "Proceso", "Resultado"], ["Mini proyecto", "Bitacora", "Mejora"], "Evidencia: proyecto terminado."),
    makePreferenceTopic(pref, "Investigacion", source, `Investigar ${pref} con fuentes confiables`, "Aprende a buscar informacion y distinguir calidad.", "Evita temarios superficiales.", ["Buscar", "Comparar", "Sintetizar"], ["Fuentes confiables", "Notas", "Comparacion", "Resumen", "Preguntas nuevas"], ["Ficha de investigacion", "Resumen", "Preguntas"], "Evidencia: ficha con fuentes."),
    makePreferenceTopic(pref, "Comunicacion", source, `Presentar ${pref} como experto principiante`, "Organiza lo aprendido para explicarlo a otra persona.", "Refuerza comprension.", ["Organizar", "Explicar", "Responder"], ["Estructura", "Ejemplos", "Visuales", "Preguntas", "Retroalimentacion"], ["Presentacion", "Infografia", "Preguntas"], "Evidencia: exposicion.")
  ];
}

function buildCapstoneModule(pref, band, grade, age, countryName, number) {
  const level = levelDescriptor(band, grade, age);
  return makePreferenceTopic(pref, "Proyecto integrador", `Preferencia del usuario: ${pref}`, `Proyecto ${number}: ${pref} en accion`, `Integra "${pref}" en una mision de aprendizaje adecuada para ${level.gradeText}.`, "Cierra la ruta con evidencia visible.", ["Integrar", "Crear", "Presentar"], ["Objetivo", "Plan", "Producto", "Revision", "Presentacion"], ["Crear producto final", "Explicar proceso", "Autoevaluar"], "Evidencia: producto final y reflexion.");
}

function makePreferenceTopic(preference, area, source, title, description, benefit, objectives, subtopics, practice, assessment) {
  return { preference, area, source, title, description, benefit, objectives, subtopics, practice, assessment };
}

function getCurriculumBlueprint(band, grade, countryName, prefs) {
  if (countryName === "Mexico" && grade?.[0] === "primaria-5") {
    return mexicoPrimaria5Blueprint();
  }
  if (countryName === "Mexico" && grade?.[2] === "Primaria") {
    return mexicoPrimaryGenericBlueprint(grade[3]);
  }
  return universalCurriculumBlueprint(band, grade, countryName);
}

function universalCurriculumBlueprint(band, grade, countryName) {
  const gradeNumber = grade?.[3] || 1;
  if (band === "primaria") return primaryBlueprint(gradeNumber, countryName);
  if (band === "secundaria") return secondaryBlueprint(gradeNumber, countryName);
  if (band === "preparatoria") return highSchoolBlueprint(gradeNumber, countryName);
  return universityBlueprint(gradeNumber, countryName);
}

function mexicoPrimaria5Blueprint() {
  const source = "SEP/CONALITEG Fase 5 y contenidos de 5° primaria";
  return [
    {
      area: "Matematicas",
      source,
      title: "Matematicas 5°: fracciones, decimales y problemas reales",
      description: "Consolida el pensamiento abstracto con operaciones de fracciones y numeros decimales, estimacion, comparacion y resolucion de problemas contextualizados.",
      benefit: "Da base solida para secundaria: calculo, razonamiento proporcional y explicacion de procedimientos.",
      objectives: ["Sumar, restar, multiplicar y dividir fracciones sencillas", "Comparar y ordenar numeros decimales", "Resolver problemas con varias operaciones"],
      subtopics: ["Fracciones equivalentes, simplificacion y comparacion", "Suma y resta de fracciones con igual y distinto denominador", "Multiplicacion y division con fracciones en problemas cotidianos", "Lectura, escritura y orden de numeros decimales", "Operaciones con decimales usando dinero, medidas y puntuaciones"],
      practice: ["Mision de tienda escolar: precios decimales, descuentos y cambio exacto", "Reto de recetas: ajustar porciones usando fracciones", "Verificacion con IA: explicar cada paso y detectar errores de calculo"],
      assessment: "Evidencia: 12 problemas graduados, 2 explicaciones escritas y una mini evaluacion de errores comunes."
    },
    {
      area: "Matematicas",
      source,
      title: "Geometria, medicion, areas, perimetros y datos",
      description: "Trabaja figuras, angulos, unidades de medida, area, perimetro, graficas y probabilidad basica con representaciones visuales.",
      benefit: "Mejora visualizacion espacial, medicion precisa y lectura de datos.",
      objectives: ["Calcular areas y perimetros", "Medir y clasificar angulos", "Interpretar graficas y eventos probables"],
      subtopics: ["Perimetro de poligonos y figuras compuestas", "Area de rectangulos, triangulos y figuras en cuadricula", "Uso de transportador y clasificacion de angulos", "Conversiones simples de longitud, masa y capacidad", "Graficas de barras, tablas de frecuencia y probabilidad basica"],
      practice: ["Disenar una arena gamer en cuadricula y calcular su area util", "Crear encuesta de gustos del grupo y graficar resultados", "Prediccion de eventos probables con ruletas o dados virtuales"],
      assessment: "Evidencia: plano con medidas, tabla de datos, grafica y explicacion de decisiones."
    },
    {
      area: "Lenguajes",
      source,
      title: "Español 5°: comprension lectora y analisis critico",
      description: "Fortalece lectura profunda, identificacion de ideas principales, inferencias, resumen, busqueda de informacion y comparacion de fuentes.",
      benefit: "Aumenta comprension, pensamiento critico y autonomia para estudiar cualquier materia.",
      objectives: ["Identificar tema, proposito e ideas principales", "Hacer inferencias con evidencia", "Comparar fuentes y detectar informacion confiable"],
      subtopics: ["Lectura de cuentos, textos informativos, poemas y noticias escolares", "Ideas principales, secundarias y resumen", "Inferencias, causa-consecuencia y opinion fundamentada", "Busqueda de informacion en fuentes impresas y digitales", "Fichas de lectura, notas y organizadores graficos"],
      practice: ["Laboratorio de lectura: subrayar, preguntar y resumir", "Comparar dos textos sobre ecosistemas o historia nacional", "Usar IA solo para generar preguntas de comprension, no para reemplazar la lectura"],
      assessment: "Evidencia: resumen de 120-160 palabras, mapa de ideas y 5 respuestas justificadas con evidencia."
    },
    {
      area: "Lenguajes",
      source,
      title: "Redaccion avanzada: textos formales, cuentos y poemas",
      description: "Desarrolla escritura planificada con borrador, revision, ortografia, puntuacion, tiempos verbales, adjetivos, pronombres y estilo.",
      benefit: "Convierte ideas en textos claros, creativos y presentables para escuela y proyectos.",
      objectives: ["Planear, redactar y revisar textos", "Aplicar acentuacion y puntuacion", "Usar gramatica para mejorar claridad"],
      subtopics: ["Estructura de parrafos: inicio, desarrollo y cierre", "Cartas formales, reportes breves y textos expositivos", "Cuento: personajes, ambiente, conflicto y desenlace", "Poema: imagenes sensoriales, ritmo y recursos expresivos", "Acentos, coma, punto, tiempos verbales, adjetivos y pronombres"],
      practice: ["Crear una bitacora del avatar con 3 entradas revisadas", "Escribir un cuento de ciencia con vocabulario nuevo", "Usar IA como corrector guiado: pedir sugerencias y decidir cuales aceptar"],
      assessment: "Evidencia: texto final con rubrica de coherencia, ortografia, vocabulario y revision."
    },
    {
      area: "Ciencias Naturales",
      source,
      title: "Ciencias 5°: celula, cuerpo humano y sistema nervioso",
      description: "Estudia niveles de organizacion de los seres vivos, celula, funciones del cuerpo humano, sistema nervioso y habitos saludables.",
      benefit: "Ayuda a comprender el propio cuerpo y tomar decisiones de salud con informacion segura.",
      objectives: ["Explicar que es una celula", "Relacionar organos y sistemas", "Reconocer habitos de cuidado personal"],
      subtopics: ["La celula como unidad basica de los seres vivos", "Organos y sistemas: digestivo, respiratorio, circulatorio y nervioso", "Sistema nervioso: sentidos, respuesta y cuidado", "Alimentacion, descanso, actividad fisica e higiene", "Prevencion y toma de decisiones responsables"],
      practice: ["Modelo 3D o dibujo de celula con partes principales", "Mapa del cuerpo humano conectando organos y funciones", "Diario de habitos saludables durante una semana"],
      assessment: "Evidencia: maqueta o infografia, explicacion oral y cuestionario de aplicacion."
    },
    {
      area: "Ciencias Naturales",
      source,
      title: "Ecosistemas, biodiversidad, materia y energia",
      description: "Integra ambiente, cadenas alimentarias, biodiversidad, aprovechamiento responsable, propiedades de la materia, estados fisicos y energia.",
      benefit: "Forma pensamiento cientifico y conciencia ambiental vinculada a la comunidad.",
      objectives: ["Describir componentes de un ecosistema", "Explicar cambios de estado de la materia", "Proponer acciones de cuidado ambiental"],
      subtopics: ["Ecosistemas: factores bioticos y abioticos", "Cadenas alimentarias y equilibrio ecologico", "Biodiversidad de Mexico y cuidado del ambiente", "Propiedades de la materia y estados fisicos", "Energia: fuentes, uso responsable y transformaciones simples"],
      practice: ["Investigar un ecosistema local y sus riesgos", "Experimento seguro sobre evaporacion, condensacion o mezclas", "Proyecto de ahorro de energia o agua en casa/escuela"],
      assessment: "Evidencia: reporte con hipotesis, observaciones, resultados y propuesta de mejora."
    },
    {
      area: "Geografia",
      source,
      title: "Geografia 5°: mapas, continentes, relieve y cambio climatico",
      description: "Desarrolla lectura de mapas, coordenadas, continentes, oceanos, placas tectonicas, regiones naturales, poblacion y cambio climatico.",
      benefit: "Permite comprender el mundo, ubicar fenomenos y analizar problemas ambientales actuales.",
      objectives: ["Leer mapas con simbologia y escala", "Ubicar continentes y regiones", "Explicar causas y efectos de fenomenos geograficos"],
      subtopics: ["Mapas: escala, simbologia, orientacion y coordenadas", "Continentes, oceanos y diversidad de paisajes", "Relieve, placas tectonicas, sismos y volcanes", "Climas, regiones naturales y recursos", "Cambio climatico: causas, efectos y acciones locales"],
      practice: ["Crear mapa de Mexico y mapa mundial con capas de informacion", "Simular placas tectonicas con materiales simples", "Investigar una noticia ambiental y ubicarla en mapa"],
      assessment: "Evidencia: mapa comentado, glosario geografico y explicacion de un fenomeno."
    },
    {
      area: "Historia y ciudadania",
      source,
      title: "Historia nacional: Independencia, Mexico moderno y ciudadania",
      description: "Organiza procesos historicos clave, causas, consecuencias, personajes, vida cotidiana, soberania, Mexico independiente y Mexico moderno.",
      benefit: "Construye identidad, memoria historica y capacidad de explicar cambios sociales.",
      objectives: ["Ordenar hechos en lineas del tiempo", "Distinguir causas y consecuencias", "Relacionar historia con vida actual"],
      subtopics: ["Independencia de Mexico: causas, etapas y personajes", "Mexico independiente y conflictos del siglo XIX", "Reforma, soberania y conformacion del Estado laico", "Mexico moderno: cambios sociales, economicos y culturales", "Derechos, convivencia, diversidad y participacion comunitaria"],
      practice: ["Linea del tiempo visual con 10 acontecimientos", "Entrevista familiar sobre cambios en la comunidad", "Debate guiado: como la historia influye en derechos actuales"],
      assessment: "Evidencia: linea del tiempo, texto explicativo y participacion en debate con argumentos."
    }
  ];
}

function mexicoPrimaryGenericBlueprint(gradeNumber) {
  const source = "SEP/CONALITEG primaria, ajustado por grado";
  return primaryBlueprint(gradeNumber, "Mexico", source);
}

function makeTopic(area, source, title, description, benefit, objectives, subtopics, practice, assessment) {
  return { area, source, title, description, benefit, objectives, subtopics, practice, assessment };
}

function primaryBlueprint(gradeNumber, countryName, source = "Curriculo internacional de primaria ajustado por grado") {
  const stage = gradeNumber <= 2 ? {
    math: ["Conteo, lectura y escritura de numeros", "Valor posicional con unidades y decenas", "Suma y resta con material concreto", "Figuras geometricas basicas", "Medicion con unidades no convencionales"],
    lang: ["Conciencia fonologica y fluidez lectora", "Comprension literal de cuentos e instrucciones", "Escritura de oraciones y parrafos breves", "Mayusculas, punto y vocabulario nuevo", "Expresion oral con turnos de participacion"],
    science: ["Seres vivos y no vivos", "Partes del cuerpo y habitos saludables", "Materiales y cambios observables", "Clima, agua y cuidado del entorno", "Observacion, dibujo y registro simple"],
    social: ["Familia, escuela y comunidad", "Normas de convivencia y derechos", "Mi localidad y mapas simples", "Celebraciones y memoria familiar", "Respeto, colaboracion y responsabilidad"]
  } : gradeNumber <= 4 ? {
    math: ["Valor posicional hasta millares o millones iniciales", "Multiplicacion, division y problemas de varios pasos", "Fracciones basicas y equivalencias visuales", "Perimetro, area inicial y cuerpos geometricos", "Tablas, graficas y lectura de datos"],
    lang: ["Comprension inferencial y resumen", "Textos narrativos, informativos y descriptivos", "Planeacion, borrador y revision", "Acentuacion inicial, puntuacion y conectores", "Exposiciones con apoyo visual"],
    science: ["Ecosistemas cercanos y cadenas alimentarias", "Cuerpo humano, nutricion y salud", "Materia, mezclas, fuerza y movimiento", "Ciclo del agua, energia y ambiente", "Experimentos seguros con registro de evidencias"],
    social: ["Mapas, regiones y recursos naturales", "Historia local y nacional inicial", "Instituciones, derechos y participacion", "Diversidad cultural de {country}", "Problemas de comunidad y soluciones"]
  } : {
    math: ["Fracciones, decimales, proporcionalidad y porcentajes iniciales", "Operaciones con numeros naturales, fracciones y decimales", "Area, perimetro, volumen inicial y angulos", "Graficas, promedio y probabilidad basica", "Problemas multietapa con argumentacion"],
    lang: ["Comprension critica e inferencias con evidencia", "Textos formales, narrativos, poeticos y expositivos", "Busqueda, seleccion y comparacion de fuentes", "Ortografia, puntuacion, tiempos verbales y cohesion", "Debate, exposicion y escritura revisada"],
    science: ["Celula, sistemas del cuerpo y salud", "Biodiversidad, ecosistemas y sustentabilidad", "Materia, energia, calor, luz o electricidad basica", "Tierra, clima y cambios ambientales", "Metodo cientifico con hipotesis y resultados"],
    social: ["Geografia mundial y nacional con mapas", "Historia nacional y procesos de cambio", "Ciudadania, derechos, diversidad e inclusion", "Economia, recursos y comunidad", "Proyecto de accion social segura"]
  };

  return [
    makeTopic("Matematicas", source, `Matematicas ${gradeNumber}°: numero, operaciones y problemas`, "Construye dominio numerico progresivo con problemas adecuados al grado y explicacion de estrategias.", "Fortalece razonamiento, precision y confianza al resolver ejercicios escolares.", ["Resolver operaciones del grado", "Explicar procedimientos", "Aplicar matematicas en situaciones reales"], stage.math, ["Reto de compras, medidas o puntuaciones", "Crear problemas propios con solucion explicada", "Usar IA para recibir pistas y revisar pasos"], "Evidencia: set de problemas graduados, correccion de errores y explicacion escrita."),
    makeTopic("Lenguajes", source, `Lenguajes ${gradeNumber}°: lectura, escritura y comunicacion`, "Desarrolla lectura, escritura, oralidad y revision de textos con exigencia acorde al grado.", "Mejora comprension, expresion y autonomia para estudiar.", ["Comprender textos", "Escribir con estructura", "Comunicar ideas con claridad"], stage.lang, ["Diario de lectura", "Texto revisado en dos versiones", "Exposicion breve con apoyo visual"], "Evidencia: texto final, rubrica de lectura y participacion oral."),
    makeTopic("Ciencias", source, `Ciencias ${gradeNumber}°: cuerpo, ambiente, materia y energia`, "Organiza fenomenos naturales con observacion, preguntas, explicaciones y experimentos seguros.", "Desarrolla pensamiento cientifico y cuidado del entorno.", ["Observar y registrar", "Explicar fenomenos", "Proponer acciones de cuidado"], stage.science, ["Experimento seguro con bitacora", "Infografia o maqueta", "Pregunta investigable con hipotesis"], "Evidencia: reporte con observaciones, resultados y conclusion."),
    makeTopic("Geografia e historia", source, `Sociedad ${gradeNumber}°: territorio, historia y comunidad`, "Relaciona espacio geografico, historia, cultura y convivencia con problemas reales del contexto.", "Construye identidad, ubicacion espacial y responsabilidad social.", ["Leer mapas o lineas del tiempo", "Explicar cambios sociales", "Participar con respeto"], stage.social.map((s) => s.replace("{country}", countryName)), ["Mapa, linea del tiempo o entrevista familiar", "Analisis de un problema de comunidad", "Propuesta de mejora segura"], "Evidencia: organizador visual, explicacion oral y accion comunitaria posible."),
    ...coreFutureTopics(source, "primaria")
  ].slice(0, 8);
}

function secondaryBlueprint(gradeNumber, countryName) {
  const source = `Curriculo base de secundaria ${gradeNumber}°, contextualizado para ${countryName}`;
  const math = gradeNumber === 1 ? ["Numeros enteros, fracciones y decimales", "Proporcionalidad directa", "Perimetro, area y volumen", "Ecuaciones lineales iniciales", "Tablas, graficas y estadistica descriptiva"] :
    gradeNumber === 2 ? ["Jerarquia de operaciones y expresiones algebraicas", "Ecuaciones lineales y sistemas simples", "Teorema de Pitagoras y semejanza", "Funciones lineales", "Probabilidad y analisis de datos"] :
    ["Funciones lineales y cuadraticas iniciales", "Ecuaciones y factorizacion basica", "Trigonometria inicial y geometria analitica", "Estadistica, dispersion y probabilidad", "Modelacion de problemas reales"];
  const science = gradeNumber === 1 ? ["Biologia celular", "Ecosistemas y biodiversidad", "Nutricion y salud", "Reproduccion y prevencion adecuada a la edad", "Metodo cientifico"] :
    gradeNumber === 2 ? ["Movimiento, fuerza y energia", "Calor, ondas, sonido y luz", "Electricidad basica", "Maquinas simples", "Medicion y experimentacion"] :
    ["Estructura de la materia", "Tabla periodica y enlaces", "Reacciones quimicas", "Mezclas y soluciones", "Impacto ambiental de materiales"];
  return [
    makeTopic("Matematicas", source, `Matematicas secundaria ${gradeNumber}°: algebra, geometria y datos`, "Desarrolla pensamiento abstracto con modelos, procedimientos y problemas de varias etapas.", "Prepara bases para bachillerato y razonamiento logico.", ["Modelar situaciones", "Resolver ejercicios formales", "Interpretar datos"], math, ["Resolver reto aplicado a tecnologia o deportes", "Graficar datos reales", "Explicar un error comun y corregirlo"], "Evidencia: problemario, grafica y explicacion de procedimiento."),
    makeTopic("Lengua y comunicacion", source, `Lengua secundaria ${gradeNumber}°: lectura critica y escritura argumentativa`, "Fortalece analisis de textos, investigacion, argumentacion y produccion de textos formales.", "Mejora pensamiento critico y comunicacion academica.", ["Analizar fuentes", "Argumentar con evidencias", "Escribir textos revisados"], ["Lectura critica de articulos, cuentos y ensayos", "Resumen, parafrasis y cita responsable", "Texto argumentativo", "Ortografia, conectores y coherencia", "Exposicion y debate"], ["Comparar dos fuentes", "Redactar ensayo breve", "Usar IA para generar preguntas y revisar claridad"], "Evidencia: ensayo, referencias basicas y debate con rubrica."),
    makeTopic("Ciencias", source, `Ciencias secundaria ${gradeNumber}°: investigacion y fenomenos naturales`, "Organiza contenidos cientificos con experimentacion, datos y explicaciones causales.", "Desarrolla pensamiento cientifico y toma de decisiones informadas.", ["Diseñar investigaciones", "Registrar datos", "Explicar fenomenos"], science, ["Experimento con variables", "Tabla de datos y grafica", "Infografia de aplicacion social"], "Evidencia: reporte cientifico, datos y conclusion."),
    makeTopic("Historia y geografia", source, `Sociedades secundaria ${gradeNumber}°: historia, territorio y ciudadania`, "Analiza procesos historicos, geograficos y civicos para comprender el presente.", "Fortalece identidad, criterio social y lectura del mundo.", ["Ubicar procesos", "Distinguir causas y consecuencias", "Proponer participacion ciudadana"], ["Historia nacional y mundial segun grado", "Mapas, poblacion, economia y ambiente", "Derechos humanos y convivencia", "Diversidad cultural de {country}", "Problemas sociales contemporaneos"], ["Linea del tiempo comparativa", "Mapa tematico", "Analisis de noticia con contexto historico"], "Evidencia: mapa, linea del tiempo y comentario argumentado."),
    ...coreFutureTopics(source, "secundaria")
  ].slice(0, 8);
}

function highSchoolBlueprint(gradeNumber, countryName) {
  const source = `Curriculo base de preparatoria ${gradeNumber}°, contextualizado para ${countryName}`;
  return [
    makeTopic("Matematicas", source, `Matematicas preparatoria ${gradeNumber}°: funciones, modelos y datos`, "Profundiza algebra, funciones, geometria analitica, estadistica y modelacion segun avance.", "Da herramientas para carreras STEM, economia y toma de decisiones.", ["Resolver modelos", "Interpretar funciones", "Argumentar resultados"], ["Algebra y ecuaciones", "Funciones lineales, cuadraticas o exponenciales segun grado", "Geometria analitica y trigonometria", "Estadistica y probabilidad", "Modelacion con datos reales"], ["Modelo de crecimiento o costos", "Dashboard simple de datos", "Revision de solucion con IA y criterio propio"], "Evidencia: problemario aplicado, grafica y reporte de interpretacion."),
    makeTopic("Comunicacion", source, `Comunicacion preparatoria ${gradeNumber}°: lectura academica y escritura formal`, "Trabaja comprension avanzada, ensayo, investigacion, exposicion y argumentacion.", "Mejora desempeño academico y preparacion universitaria.", ["Investigar", "Escribir ensayos", "Exponer con claridad"], ["Lectura critica de textos academicos", "Ensayo argumentativo", "Fuentes, citas y referencias", "Presentacion oral", "Revision de estilo y coherencia"], ["Ensayo sobre tema tecnologico o social", "Exposicion con diapositivas", "Uso de IA para retroalimentacion, no sustitucion"], "Evidencia: ensayo con fuentes, presentacion y rubrica."),
    makeTopic("Ciencias experimentales", source, `Ciencias preparatoria ${gradeNumber}°: biologia, fisica, quimica y tecnologia`, "Integra conceptos cientificos con laboratorio, medicion, analisis y aplicaciones actuales.", "Conecta ciencia escolar con salud, ambiente, energia y tecnologia.", ["Explicar conceptos", "Analizar datos", "Relacionar ciencia y sociedad"], ["Metodo experimental", "Biologia: celula, genetica, ecologia o salud", "Fisica: movimiento, energia, electricidad u ondas", "Quimica: materia, enlaces, reacciones y soluciones", "Impacto tecnologico y ambiental"], ["Practica de laboratorio segura", "Reporte con datos", "Infografia de aplicacion actual"], "Evidencia: reporte experimental y defensa breve."),
    makeTopic("Ciencias sociales", source, `Ciencias sociales preparatoria ${gradeNumber}°: historia, sociedad y economia`, "Analiza procesos historicos, estructuras sociales, economia, politica y ciudadania contemporanea.", "Forma criterio para comprender problemas publicos y participar responsablemente.", ["Analizar procesos", "Usar conceptos sociales", "Argumentar propuestas"], ["Historia nacional y global", "Estado, ciudadania y derechos", "Economia basica y desigualdad", "Cultura, identidad y globalizacion", "Problemas contemporaneos de {country}"], ["Analisis de caso", "Mapa causal de problema social", "Debate con evidencia"], "Evidencia: comentario critico, mapa causal y debate."),
    ...coreFutureTopics(source, "preparatoria")
  ].slice(0, 8);
}

function universityBlueprint(yearNumber, countryName) {
  const source = `Base universitaria general año ${yearNumber}, adaptable por carrera y contexto ${countryName}`;
  return [
    makeTopic("Pensamiento cuantitativo", source, `Universidad año ${yearNumber}: analisis cuantitativo y datos`, "Desarrolla estadistica, modelos, interpretacion de datos y toma de decisiones segun madurez universitaria.", "Mejora investigacion, resolucion de problemas y criterio profesional.", ["Analizar datos", "Modelar escenarios", "Comunicar hallazgos"], ["Estadistica descriptiva e inferencial segun nivel", "Visualizacion de datos", "Modelos y supuestos", "Lectura critica de indicadores", "Reporte tecnico"], ["Analizar dataset pequeño", "Crear grafica con interpretacion", "Validar conclusiones con criterios"], "Evidencia: reporte con datos, visualizaciones y conclusiones."),
    makeTopic("Investigacion y escritura academica", source, `Universidad año ${yearNumber}: investigacion, lectura y comunicacion academica`, "Organiza busqueda bibliografica, lectura critica, metodologia, escritura academica y presentacion.", "Fortalece autonomia intelectual y calidad profesional.", ["Plantear preguntas", "Usar fuentes", "Escribir con rigor"], ["Pregunta de investigacion", "Fuentes academicas y gestores", "Marco teorico inicial", "Metodologia y etica", "Articulo, poster o presentacion"], ["Matriz de fuentes", "Resumen critico", "Presentacion de avance"], "Evidencia: anteproyecto, bibliografia comentada y defensa breve."),
    makeTopic("Tecnologia profesional", source, `Universidad año ${yearNumber}: tecnologia, automatizacion e IA responsable`, "Integra herramientas digitales, IA, automatizacion, datos y criterios eticos en flujos profesionales.", "Aumenta productividad sin perder criterio, seguridad ni autoria.", ["Automatizar tareas", "Evaluar riesgos", "Diseñar soluciones"], ["IA generativa y verificacion", "Automatizacion con hojas, APIs o no-code", "Privacidad y seguridad de datos", "Prototipos digitales", "Medicion de impacto"], ["Crear flujo automatizado", "Auditar respuesta de IA", "Documentar riesgos y controles"], "Evidencia: prototipo funcional, bitacora y evaluacion etica."),
    makeTopic("Proyecto profesional", source, `Universidad año ${yearNumber}: proyecto aplicado y portafolio`, "Convierte conocimiento en proyecto, caso, producto o investigacion aplicada con evidencia profesional.", "Construye portafolio y empleabilidad.", ["Definir problema", "Prototipar solucion", "Presentar impacto"], ["Descubrimiento de usuarios o problema", "Objetivos, alcance y metricas", "Prototipo o intervencion", "Validacion y mejora", "Portafolio y storytelling profesional"], ["Caso de estudio", "Pitch de 5 minutos", "Retroalimentacion y mejora"], "Evidencia: caso documentado, demo o entregable profesional."),
    ...coreFutureTopics(source, "universidad")
  ].slice(0, 8);
}

function coreFutureTopics(source, band) {
  const level = band === "primaria" ? "seguro, visual y guiado" : band === "secundaria" ? "practico y critico" : band === "preparatoria" ? "aplicado y preprofesional" : "profesional y etico";
  return [
    makeTopic("IA y tecnologia", source, "IA educativa y tecnologia moderna aplicada al estudio", `Integra IA, busqueda confiable, verificacion y herramientas digitales con enfoque ${level}.`, "Mejora autonomia, productividad y seguridad digital.", ["Usar IA con criterio", "Verificar informacion", "Crear productos digitales"], ["Prompts por objetivo", "Verificacion con fuentes", "Privacidad y seguridad", "Herramientas digitales del nivel", "Limites, sesgos y autoria"], ["Crear guia de estudio con IA supervisada", "Comparar respuesta IA contra fuente confiable", "Checklist de seguridad digital"], "Evidencia: producto digital, reflexion etica y fuentes verificadas."),
    makeTopic("Creatividad y proyecto", source, "Proyecto creativo interdisciplinario", "Conecta contenidos escolares con creatividad, diseño, narrativa, arte, tecnologia o comunidad.", "Hace visible el aprendizaje y eleva motivacion.", ["Diseñar un producto", "Conectar materias", "Presentar resultados"], ["Ideacion", "Boceto o prototipo", "Narrativa visual", "Prueba con audiencia", "Mejora por retroalimentacion"], ["Crear prototipo o pieza multimedia", "Presentar antes/despues", "Recibir retroalimentacion"], "Evidencia: producto final, bitacora y presentacion."),
    makeTopic("Habitos y desarrollo", source, "Habitos de aprendizaje, bienestar y metas", "Construye organizacion, gestion del tiempo, bienestar, colaboracion y reflexion de progreso.", "Sostiene el aprendizaje sin saturacion.", ["Planear estudio", "Medir avance", "Regular emociones"], ["Rutina semanal", "Tecnicas de enfoque", "Metas SMART", "Colaboracion y comunicacion", "Reflexion de logros"], ["Plan de estudio semanal", "Tablero de progreso", "Autoevaluacion honesta"], "Evidencia: plan semanal, registro de avance y reflexion.")
  ];
}

function pickFocusSet(band, prefs) {
  const common = [
    {
      area: "Matematicas",
      title: "Matematicas inteligentes para resolver misiones reales",
      description: "Desarrolla calculo, logica y modelado con problemas cercanos al estudiante, evitando memorizacion vacia.",
      benefit: "Mejora precision, confianza numerica y pensamiento estructurado.",
      objectives: ["Resolver problemas paso a paso", "Explicar estrategias", "Aplicar matematicas a decisiones cotidianas"],
      subtopics: ["Numeros y operaciones del nivel", "Patrones, secuencias y logica", "Problemas de vida diaria", "Retos con puntuacion y insignias", "Uso responsable de IA para verificar pasos"]
    },
    {
      area: "Ciencia",
      title: "Laboratorio de ciencia aplicada y curiosidad segura",
      description: "Convierte ciencia en exploracion guiada mediante observacion, hipotesis, evidencia y experimentos seguros.",
      benefit: "Fortalece curiosidad, metodologia y comprension del mundo natural.",
      objectives: ["Formular preguntas investigables", "Registrar evidencias", "Conectar teoria con fenomenos reales"],
      subtopics: ["Metodo cientifico", "Materia, energia y sistemas vivos", "Experimentos caseros seguros", "Bitacora visual", "Ciencia local de {country}"]
    },
    {
      area: "Tecnologia",
      title: "Tecnologia moderna y pensamiento computacional",
      description: "Introduce logica digital, interfaces, algoritmos y resolucion de problemas con tecnologia actual.",
      benefit: "Prepara habilidades del futuro con enfoque creativo y responsable.",
      objectives: ["Diseñar soluciones simples", "Comprender algoritmos", "Evaluar seguridad y utilidad"],
      subtopics: ["Algoritmos como instrucciones", "Interfaces y experiencia de usuario", "Automatizacion basica", "Ciudadania digital", "Mini proyecto tecnologico"]
    },
    {
      area: "IA",
      title: "IA educativa segura como copiloto de aprendizaje",
      description: "Aprende a usar IA para preguntar mejor, contrastar informacion, crear borradores y estudiar con autonomia.",
      benefit: "Aumenta productividad sin perder pensamiento critico ni autoria.",
      objectives: ["Crear prompts claros", "Detectar errores o sesgos", "Usar IA con etica y privacidad"],
      subtopics: ["Prompts por objetivo", "Verificacion con fuentes confiables", "Sesgos y limites de la IA", "Privacidad de datos", "Rutina de estudio con asistente IA"]
    },
    {
      area: "Creatividad",
      title: "Creatividad multimedia y expresion con proposito",
      description: "Integra arte, narrativa, diseño y tecnologia para comunicar ideas con impacto.",
      benefit: "Eleva comunicacion, imaginacion y seguridad expresiva.",
      objectives: ["Crear una pieza digital", "Narrar con estructura", "Recibir y aplicar retroalimentacion"],
      subtopics: ["Storytelling visual", "Color y composicion", "Guion breve", "Presentacion digital", "Portafolio de avances"]
    },
    {
      area: "Razonamiento",
      title: "Razonamiento critico y decisiones inteligentes",
      description: "Entrena lectura de situaciones, evidencias, causa-efecto y argumentacion.",
      benefit: "Mejora autonomia, criterio y solucion de problemas complejos.",
      objectives: ["Distinguir dato y opinion", "Construir argumentos", "Elegir estrategias"],
      subtopics: ["Mapas de decision", "Falacias comunes adaptadas al nivel", "Comparacion de fuentes", "Debate respetuoso", "Diario de pensamiento"]
    },
    {
      area: "Innovacion",
      title: "Innovacion, proyectos y habilidades del futuro",
      description: "Transforma intereses en proyectos alcanzables con etapas, prototipos y mejora continua.",
      benefit: "Conecta escuela, vida real y mentalidad emprendedora.",
      objectives: ["Detectar un problema", "Prototipar una solucion", "Medir avances"],
      subtopics: ["Problemas de comunidad", "Ideacion rapida", "Prototipo de baja fidelidad", "Pruebas con usuarios", "Presentacion tipo pitch"]
    },
    {
      area: "Desarrollo personal",
      title: "Modo alto rendimiento: habitos, enfoque y bienestar",
      description: "Construye disciplina amable, organizacion, descanso y motivacion con dinamicas de juego.",
      benefit: "Sostiene el aprendizaje sin saturacion y con metas visibles.",
      objectives: ["Planear sesiones cortas", "Medir progreso", "Celebrar logros"],
      subtopics: ["Rutina semanal", "Tecnicas de enfoque", "Gestion emocional", "Sistema de recompensas", "Reflexion de progreso"]
    }
  ];

  if (band === "universidad") {
    common[0].title = "Analitica y modelos para decisiones profesionales";
    common[2].title = "Arquitectura digital, automatizacion y producto";
    common[6].title = "Innovacion aplicada con vision de mercado";
  }
  if (prefs.some((pref) => normalize(pref).includes("robot"))) {
    common[2].subtopics.push("Robotica educativa y sensores");
  }
  return common;
}

function simplifyPlanLine(text) {
  const clean = String(text)
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*$/, "")
    .trim();
  if (!clean) return "";
  const sentence = clean.length > 95 ? `${clean.slice(0, 92).trim()}...` : clean;
  return /[.!?]$/.test(sentence) ? sentence : `${sentence}.`;
}

function renderStudyPlan() {
  const grid = $("#studyPlanGrid");
  grid.innerHTML = "";
  state.plan.forEach((topic, index) => {
    const article = document.createElement("article");
    article.className = "topic-card";
    article.style.setProperty("--topic-a", topic.colors[0]);
    article.style.setProperty("--topic-b", topic.colors[1]);
    article.innerHTML = `
      <div class="topic-image" data-visual="${topic.visual}" role="img" aria-label="Imagen cinematica educativa del tema ${index + 1}"></div>
      <div class="topic-body">
        <div class="topic-meta">
          <span>Tema ${index + 1}</span>
          <span>${escapeHtml(topic.difficulty)}</span>
        </div>
        <h3>${escapeHtml(topic.title)}</h3>
        <p>${escapeHtml(topic.description)}</p>
        <h4>Subtemas</h4>
        <ul>${topic.subtopics.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <h4>Practicas guiadas</h4>
        <ul>${topic.practice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <h4>Beneficio</h4>
        <p>${escapeHtml(topic.benefit)}</p>
        <h4>Mini objetivos</h4>
        <ul>${topic.objectives.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <h4>Evaluacion sugerida</h4>
        <p>${escapeHtml(topic.assessment)}</p>
        <div class="topic-actions">
          <button class="copy-btn" type="button" data-index="${index}">COPIAR</button>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });

  $$(".copy-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      const topic = state.plan[Number(button.dataset.index)];
      const text = formatTopicForCopy(topic);
      await navigator.clipboard.writeText(text);
      button.textContent = "COPIADO";
      beep(720, .05);
      setTimeout(() => { button.textContent = "COPIAR"; }, 1200);
    });
  });
}

function formatTopicForCopy(topic) {
  return [
    `Tema: ${topic.title}`,
    `Descripcion: ${topic.description}`,
    `Dificultad: ${topic.difficulty}`,
    "Subtemas:",
    ...topic.subtopics.map((item) => `- ${item}`),
    "Practicas guiadas:",
    ...topic.practice.map((item) => `- ${item}`),
    `Beneficio: ${topic.benefit}`,
    "Mini objetivos:",
    ...topic.objectives.map((item) => `- ${item}`),
    `Evaluacion sugerida: ${topic.assessment}`
  ].join("\n");
}

function downloadPdf() {
  if (!state.plan.length) {
    showMessage("Primero crea el avatar y el plan de estudio.", "error");
    return;
  }
  const jspdf = window.jspdf;
  if (!jspdf?.jsPDF) {
    showMessage("No se pudo cargar jsPDF. Revisa la conexion e intenta de nuevo.", "error");
    return;
  }

  const doc = new jspdf.jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 44;
  let y = 52;

  drawPdfBackground(doc, pageWidth, pageHeight);
  doc.setTextColor(32, 246, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("LEARNISMO AVATAR", margin, y);
  doc.setTextColor(255, 60, 244);
  doc.setFontSize(13);
  doc.text("Aprendizaje Personalizado IA", margin, y + 22);

  y += 62;
  doc.setTextColor(245, 251, 255);
  doc.setFontSize(10);
  const country = getCountry();
  const grade = getGradeData();
  const profileLines = [
    `Avatar: ${state.profile.name}`,
    `Fecha: ${new Date().toLocaleDateString("es-MX")}`,
    `Identidad: ${state.profile.identity}`,
    `Edad: ${state.profile.age} años`,
    `Escolaridad: ${grade?.[1] || state.profile.grade}`,
    `Nacionalidad: ${country ? `${country[1]} ${country[0]}` : state.profile.nationality}`,
    `Preferencias: ${state.selectedPreferences.map((item) => item.replace("Custom: ", "")).join(", ")}`
  ];
  profileLines.forEach((line) => {
    doc.text(line, margin, y);
    y += 16;
  });

  y += 16;
  state.plan.forEach((topic, index) => {
    if (y > pageHeight - 150) {
      doc.addPage();
      drawPdfBackground(doc, pageWidth, pageHeight);
      y = 52;
    }
    doc.setDrawColor(32, 246, 255);
    doc.setFillColor(8, 16, 34);
    doc.roundedRect(margin - 8, y - 16, pageWidth - margin * 2 + 16, 34, 6, 6, "FD");
    doc.setTextColor(186, 255, 46);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Tema ${index + 1}: ${topic.title}`, margin, y + 5, { maxWidth: pageWidth - margin * 2 });
    y += 34;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(235, 242, 255);
    y = writeWrapped(doc, topic.description, margin, y, pageWidth - margin * 2, 11);
    doc.setTextColor(32, 246, 255);
    doc.text(`Dificultad: ${topic.difficulty}`, margin, y + 4);
    y += 20;
    doc.setTextColor(245, 251, 255);
    topic.subtopics.slice(0, 5).forEach((subtopic) => {
      y = writeWrapped(doc, `- ${subtopic}`, margin + 8, y, pageWidth - margin * 2 - 8, 11);
    });
    y += 14;
  });

  doc.save(`LEARNISMO_AVATAR_${state.profile.name.replace(/\s+/g, "_")}.pdf`);
  showMessage("PDF premium generado correctamente.", "ok");
  beep(780, .08);
}

function writeWrapped(doc, text, x, y, width, lineHeight) {
  const lines = doc.splitTextToSize(text, width);
  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

function drawPdfBackground(doc, width, height) {
  doc.setFillColor(2, 3, 10);
  doc.rect(0, 0, width, height, "F");
  doc.setDrawColor(32, 246, 255);
  doc.setLineWidth(.4);
  for (let x = 0; x < width; x += 36) doc.line(x, 0, x + 120, height);
  doc.setDrawColor(255, 60, 244);
  doc.roundedRect(24, 24, width - 48, height - 48, 8, 8);
}

function clearParticleCanvas() {
  const canvas = $("#particleCanvas");
  if (!canvas) return;
  canvas.width = 1;
  canvas.height = 1;
}

function scheduleAvatarImageGeneration() {
  clearTimeout(avatarImageTimer);
  avatarImageTimer = setTimeout(() => generatePremiumAvatarImage(false), 120);
}

function generatePremiumAvatarImage(force = false) {
  const img = $("#avatarImage");
  const placeholder = $("#avatarImagePlaceholder");
  const canvas = $("#avatarArtCanvas");
  if (!img || !canvas) return;

  if (!isProfileReadyForPreferences()) {
    img.classList.remove("ready");
    if (placeholder) placeholder.hidden = false;
    return;
  }

  const signature = [
    state.profile.identity,
    state.profile.name,
    state.profile.age,
    state.profile.grade,
    state.profile.nationality,
    state.selectedPreferences.join("|")
  ].join("::");
  if (!force && signature === avatarImageSignature) return;
  avatarImageSignature = signature;

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const grade = getGradeData();
  const country = getCountry();
  const band = getAcademicBand();
  const prefs = state.selectedPreferences.map((pref) => pref.replace("Custom: ", ""));
  const primaryPref = prefs[0] || "Aprendizaje IA";
  const secondPref = prefs[1] || "Tecnologia";
  const thirdPref = prefs[2] || "Creatividad";
  const accent = grade?.[4] || "#20f6ff";
  const palette = getAvatarPalette(accent, band, primaryPref);

  ctx.clearRect(0, 0, w, h);
  drawAvatarBackground(ctx, w, h, palette, country?.[0] || state.profile.nationality);
  drawPremiumCharacter(ctx, w, h, palette, state.profile.identity, Number(state.profile.age), band, prefs);
  drawAvatarHud(ctx, w, h, palette, {
    name: state.profile.name,
    age: state.profile.age,
    grade: grade?.[1] || state.profile.grade,
    country: country ? `${country[1]} ${country[0]}` : state.profile.nationality,
    prefs: [primaryPref, secondPref, thirdPref]
  });

  img.src = canvas.toDataURL("image/png", .96);
  img.classList.add("ready");
  if (placeholder) placeholder.hidden = true;
  localStorage.setItem("learnismoAvatarImage", img.src);
}

function getAvatarPalette(accent, band, pref) {
  const lower = normalize(pref);
  const base = lower.includes("ia") ? "#20f6ff" :
    lower.includes("robot") || lower.includes("program") ? "#baff2e" :
    lower.includes("arte") || lower.includes("creativ") ? "#ff3cf4" : accent;
  const level = band === "universidad" ? "#8d7dff" :
    band === "preparatoria" ? "#2478ff" :
    band === "secundaria" ? "#ff3cf4" : "#baff2e";
  return {
    main: base,
    level,
    cyan: "#20f6ff",
    pink: "#ff3cf4",
    lime: "#baff2e",
    blue: "#2478ff",
    dark: "#02030a",
    ink: "#071126"
  };
}

function drawAvatarBackground(ctx, w, h, palette, countryName) {
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#050817");
  bg.addColorStop(.45, "#071126");
  bg.addColorStop(1, "#02030a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  drawRadialGlow(ctx, w * .18, h * .18, w * .55, palette.pink, .36);
  drawRadialGlow(ctx, w * .82, h * .22, w * .52, palette.cyan, .32);
  drawRadialGlow(ctx, w * .5, h * .86, w * .58, palette.lime, .2);

  ctx.save();
  ctx.globalAlpha = .16;
  ctx.strokeStyle = palette.cyan;
  ctx.lineWidth = 2;
  for (let x = -w; x < w * 2; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + w * .72, h);
    ctx.stroke();
  }
  ctx.globalAlpha = .1;
  ctx.strokeStyle = palette.pink;
  for (let y = 60; y < h; y += 78) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + 18);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = .62;
  ctx.font = "900 34px Segoe UI, Arial";
  ctx.fillStyle = "rgba(244,251,255,.88)";
  ctx.fillText("LEARNISMO AVATAR", 56, 74);
  ctx.font = "800 18px Segoe UI, Arial";
  ctx.fillStyle = palette.lime;
  ctx.fillText(`AI PREMIUM PORTRAIT / ${countryName.toUpperCase()}`, 58, 104);
  ctx.restore();
}

function drawPremiumCharacter(ctx, w, h, palette, identity, age, band, prefs) {
  const cx = w / 2;
  const youthful = age <= 12;
  const bodyTop = h * .43;
  const skin = identity === "mujer" ? "#f4c7aa" : identity === "hombre" ? "#d9a47d" : "#e8bd98";
  const hair = identity === "mujer" ? "#16172c" : "#0a0f23";

  drawRadialGlow(ctx, cx, h * .52, w * .42, palette.main, .42);
  drawNeonRing(ctx, cx, h * .8, w * .34, 48, palette.cyan, .55);
  drawNeonRing(ctx, cx, h * .52, w * .31, 8, palette.pink, .32);

  ctx.save();
  ctx.shadowColor = palette.cyan;
  ctx.shadowBlur = 28;

  roundedRect(ctx, cx - 180, bodyTop, 360, 430, 52, palette.ink);
  roundedRect(ctx, cx - 150, bodyTop + 20, 300, 385, 42, palette.main);
  ctx.fillStyle = "rgba(2,3,10,.64)";
  ctx.fillRect(cx - 42, bodyTop + 20, 84, 385);
  roundedRect(ctx, cx - 82, bodyTop + 118, 164, 76, 20, "#101a34");
  drawNeonRing(ctx, cx, bodyTop + 156, 58, 8, palette.lime, .95);

  roundedRect(ctx, cx - 250, bodyTop + 44, 112, 290, 36, "#091225");
  roundedRect(ctx, cx + 138, bodyTop + 44, 112, 290, 36, "#091225");
  roundedRect(ctx, cx - 280, bodyTop + 288, 100, 70, 28, skin);
  roundedRect(ctx, cx + 180, bodyTop + 288, 100, 70, 28, skin);

  roundedRect(ctx, cx - 105, bodyTop + 395, 82, 210, 30, "#050816");
  roundedRect(ctx, cx + 23, bodyTop + 395, 82, 210, 30, "#050816");
  roundedRect(ctx, cx - 128, bodyTop + 580, 130, 54, 20, palette.main);
  roundedRect(ctx, cx - 2, bodyTop + 580, 130, 54, 20, palette.main);

  roundedRect(ctx, cx - 142, h * .18, 284, youthful ? 252 : 238, 76, skin);
  roundedRect(ctx, cx - 152, h * .15, 304, 72, 34, hair);
  roundedRect(ctx, cx - 118, h * .19, 236, 42, 18, hair);
  if (identity === "mujer") {
    roundedRect(ctx, cx - 176, h * .22, 56, 210, 28, hair);
    roundedRect(ctx, cx + 120, h * .22, 56, 210, 28, hair);
  }

  roundedRect(ctx, cx - 122, h * .32, 244, 38, 16, "#071126");
  ctx.fillStyle = palette.cyan;
  ctx.shadowColor = palette.cyan;
  ctx.shadowBlur = 24;
  ctx.fillRect(cx - 104, h * .333, 82, 10);
  ctx.fillRect(cx + 22, h * .333, 82, 10);
  ctx.fillStyle = "#f7fbff";
  roundedRect(ctx, cx - 78, h * .38, 46, 34, 12, "#f7fbff");
  roundedRect(ctx, cx + 32, h * .38, 46, 34, 12, "#f7fbff");
  roundedRect(ctx, cx - 60, h * .392, 16, 16, 8, "#050816");
  roundedRect(ctx, cx + 50, h * .392, 16, 16, 8, "#050816");
  roundedRect(ctx, cx - 54, h * .455, 108, 12, 8, palette.pink);

  const gadgetColor = prefs.join(" ").toLowerCase().includes("robot") ? palette.lime : palette.pink;
  drawFloatingGadget(ctx, cx + 245, h * .36, gadgetColor, "AI");
  drawFloatingGadget(ctx, cx - 245, h * .46, palette.cyan, band.toUpperCase().slice(0, 3));
  ctx.restore();
}

function drawAvatarHud(ctx, w, h, palette, data) {
  ctx.save();
  const cardY = h - 238;
  ctx.fillStyle = "rgba(2, 3, 10, .72)";
  ctx.strokeStyle = "rgba(32,246,255,.55)";
  ctx.lineWidth = 2;
  roundedRect(ctx, 56, cardY, w - 112, 170, 22, "rgba(2,3,10,.72)", true);
  ctx.stroke();

  ctx.font = "1000 52px Segoe UI, Arial";
  ctx.fillStyle = "#f4fbff";
  fitText(ctx, data.name.toUpperCase(), 88, cardY + 64, w - 176, 52);
  ctx.font = "800 21px Segoe UI, Arial";
  ctx.fillStyle = palette.cyan;
  ctx.fillText(`${data.grade} / ${data.age} anos / ${data.country}`, 90, cardY + 98);

  const chips = data.prefs.slice(0, 3);
  chips.forEach((chip, i) => {
    const x = 88 + i * 278;
    roundedRect(ctx, x, cardY + 120, 246, 38, 18, i === 0 ? palette.lime : i === 1 ? palette.cyan : palette.pink);
    ctx.fillStyle = "#04110a";
    ctx.font = "900 15px Segoe UI, Arial";
    fitText(ctx, chip.toUpperCase(), x + 16, cardY + 145, 214, 15);
  });
  ctx.restore();
}

function drawFloatingGadget(ctx, x, y, color, label) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 6; i += 1) {
    const angle = Math.PI / 3 * i - Math.PI / 6;
    const r = i % 2 ? 48 : 68;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#06101c";
  ctx.font = "1000 30px Segoe UI, Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 0, 3);
  ctx.restore();
}

function drawNeonRing(ctx, x, y, radiusX, lineWidth, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.ellipse(x, y, radiusX, radiusX * .18, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawRadialGlow(ctx, x, y, r, color, alpha) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, r);
  glow.addColorStop(0, hexToRgba(color, alpha));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function roundedRect(ctx, x, y, w, h, r, fill, keepPath = false) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (!keepPath) ctx.beginPath();
}

function fitText(ctx, text, x, y, maxWidth, size) {
  let fontSize = size;
  do {
    ctx.font = `1000 ${fontSize}px Segoe UI, Arial`;
    fontSize -= 2;
  } while (ctx.measureText(text).width > maxWidth && fontSize > 12);
  ctx.fillText(text, x, y);
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const value = parseInt(clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function setupAvatar3D() {
  const canvas = $("#avatarCanvas");
  if (!window.THREE) {
    $("#cssAvatarFallback").style.display = "grid";
    return;
  }

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
  camera.position.set(0, 1.15, 7.6);
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  const key = new THREE.PointLight(0x20f6ff, 3.6, 18);
  key.position.set(3, 4, 5);
  const rim = new THREE.PointLight(0xff3cf4, 3.1, 16);
  rim.position.set(-3, 3, 3);
  scene.add(ambient, key, rim);

  avatarGroup = new THREE.Group();
  scene.add(avatarGroup);
  buildAvatarMesh();
  resizeAvatarRenderer();
  animateAvatar();
}

function buildAvatarMesh() {
  avatarGroup.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose?.());
    } else {
      child.material?.dispose?.();
    }
  });
  avatarGroup.clear();
  const accent = new THREE.Color(state.avatarAccent);
  const identity = state.profile.identity;
  const age = Number(state.profile.age || 11);
  const selected = state.selectedPreferences.join(" ").toLowerCase();
  const skinColor = identity === "mujer" ? 0xf4c9aa : identity === "hombre" ? 0xd9a47d : 0xe8bd98;
  const scale = age >= 18 ? 1.05 : age >= 13 ? .98 : .9;

  const skin = new THREE.MeshStandardMaterial({ color: skinColor, roughness: .5, metalness: .03 });
  const jacket = new THREE.MeshStandardMaterial({ color: accent, roughness: .2, metalness: .58, emissive: accent, emissiveIntensity: .18 });
  const jacketDark = new THREE.MeshStandardMaterial({ color: 0x071126, roughness: .28, metalness: .5 });
  const black = new THREE.MeshStandardMaterial({ color: 0x020613, roughness: .38, metalness: .45 });
  const white = new THREE.MeshStandardMaterial({ color: 0xf6fbff, roughness: .3, metalness: .05 });
  const visorMat = new THREE.MeshStandardMaterial({ color: 0x111a2f, roughness: .14, metalness: .75, emissive: 0x20f6ff, emissiveIntensity: .65 });
  const limeGlow = new THREE.MeshStandardMaterial({ color: 0xbaff2e, emissive: 0xbaff2e, emissiveIntensity: 1.7, roughness: .12, metalness: .2 });
  const pinkGlow = new THREE.MeshStandardMaterial({ color: 0xff3cf4, emissive: 0xff3cf4, emissiveIntensity: 1.1, roughness: .16, metalness: .35 });

  const makeBox = (w, h, d, material, x, y, z, rx = 0, ry = 0, rz = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d, 1, 1, 1), material);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    avatarGroup.add(mesh);
    return mesh;
  };

  const head = new THREE.Mesh(new THREE.BoxGeometry(1.36, 1.18, 1.16, 2, 2, 2), skin);
  head.position.y = 1.78;
  avatarGroup.add(head);

  const hairTop = makeBox(1.48, .28, 1.22, black, 0, 2.42, -.02);
  const hairFront = makeBox(1.2, .22, .22, black, 0, 2.24, .55);
  hairFront.rotation.x = -.08;
  if (identity === "mujer") {
    makeBox(.24, .74, .24, black, -.72, 1.85, -.05);
    makeBox(.24, .74, .24, black, .72, 1.85, -.05);
  }

  const leftEye = makeBox(.18, .18, .04, white, -.28, 1.88, .6);
  const rightEye = makeBox(.18, .18, .04, white, .28, 1.88, .6);
  makeBox(.07, .07, .045, black, -.28, 1.88, .625);
  makeBox(.07, .07, .045, black, .28, 1.88, .625);
  makeBox(.46, .06, .045, pinkGlow, 0, 1.55, .62);

  const visor = makeBox(1.5, .18, .1, visorMat, 0, 2.03, .64);
  visor.scale.x = selected.includes("ia") ? 1.16 : 1;
  makeBox(.18, .48, .12, jacketDark, -.9, 1.98, .03);
  makeBox(.18, .48, .12, jacketDark, .9, 1.98, .03);

  makeBox(1.28, 1.42, .78, jacketDark, 0, .55, 0);
  makeBox(1.04, 1.18, .84, jacket, 0, .58, .04);
  makeBox(.15, 1.1, .9, limeGlow, 0, .58, .49);
  makeBox(.52, .18, .08, visorMat, 0, .98, .5);
  const core = new THREE.Mesh(new THREE.TorusGeometry(.25, .035, 8, 32), limeGlow);
  core.position.set(0, .56, .51);
  avatarGroup.add(core);

  makeBox(.48, .28, .82, jacket, -.92, 1.06, 0, 0, 0, -.16);
  makeBox(.48, .28, .82, jacket, .92, 1.06, 0, 0, 0, .16);
  makeBox(.36, 1.12, .42, jacketDark, -1.18, .38, 0, 0, 0, -.18);
  makeBox(.36, 1.12, .42, jacketDark, 1.18, .38, 0, 0, 0, .18);
  makeBox(.42, .32, .44, skin, -1.28, -.28, .03);
  makeBox(.42, .32, .44, skin, 1.28, -.28, .03);

  makeBox(.46, 1.05, .5, black, -.34, -.98, 0);
  makeBox(.46, 1.05, .5, black, .34, -.98, 0);
  makeBox(.62, .28, .78, jacket, -.34, -1.66, .1);
  makeBox(.62, .28, .78, jacket, .34, -1.66, .1);

  makeBox(1.22, .18, .28, pinkGlow, 0, -.18, .48);
  makeBox(.7, .95, .16, jacketDark, 0, .56, -.52);

  const ringMat = new THREE.MeshStandardMaterial({ color: 0x20f6ff, emissive: 0x20f6ff, emissiveIntensity: 1.25, transparent: true, opacity: .82 });
  const floorRing = new THREE.Mesh(new THREE.TorusGeometry(1.9, .018, 8, 64), ringMat);
  floorRing.rotation.x = Math.PI / 2;
  floorRing.position.y = -1.86;
  avatarGroup.add(floorRing);

  const backRing = new THREE.Mesh(new THREE.TorusGeometry(1.32, .014, 8, 48), ringMat);
  backRing.position.set(0, .72, -.72);
  backRing.rotation.y = Math.PI / 2;
  avatarGroup.add(backRing);

  const gadgetMat = selected.includes("robot") || selected.includes("program") ? limeGlow : pinkGlow;
  const gadgetGeo = selected.includes("ia") ? new THREE.IcosahedronGeometry(.24, 0) : new THREE.OctahedronGeometry(.27, 0);
  const gadget = new THREE.Mesh(gadgetGeo, gadgetMat);
  gadget.position.set(1.72, 1.28, .16);
  avatarGroup.add(gadget);

  const tablet = makeBox(.46, .62, .08, visorMat, -1.7, .78, .1, 0, .24, -.18);
  makeBox(.34, .04, .09, limeGlow, -1.7, .84, .15, 0, .24, -.18);
  makeBox(.28, .04, .09, pinkGlow, -1.7, .72, .15, 0, .24, -.18);

  avatarGroup.scale.setScalar(scale);
  avatarGroup.userData = { core, floorRing, backRing, gadget, tablet, leftEye, rightEye };
}

function updateThreeAvatarColors() {
  if (!avatarGroup || !window.THREE) return;
  const signature = [
    state.avatarAccent,
    state.profile.identity,
    state.profile.age,
    state.profile.grade,
  ].join("-");
  if (signature === state.avatarSignature) return;
  state.avatarSignature = signature;
  buildAvatarMesh();
}

function resizeAvatarRenderer() {
  if (!renderer || !camera) return;
  const frame = $(".avatar-canvas-frame");
  const rect = frame.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

function animateAvatar(time = 0) {
  if (!renderer || !scene || !camera || !avatarGroup) return;
  if (time - lastAvatarFrame < 33) {
    requestAnimationFrame(animateAvatar);
    return;
  }
  lastAvatarFrame = time;
  avatarGroup.rotation.y += ((mouseX * .38) - avatarGroup.rotation.y) * .04;
  avatarGroup.rotation.x += ((mouseY * .12) - avatarGroup.rotation.x) * .04;
  avatarGroup.position.y = Math.sin(time * .0018) * .08;
  if (avatarGroup.userData.core) avatarGroup.userData.core.rotation.z += .04;
  if (avatarGroup.userData.floorRing) avatarGroup.userData.floorRing.rotation.z += .012;
  if (avatarGroup.userData.backRing) avatarGroup.userData.backRing.rotation.x += .008;
  if (avatarGroup.userData.gadget) {
    avatarGroup.userData.gadget.rotation.x += .018;
    avatarGroup.userData.gadget.rotation.y += .025;
    avatarGroup.userData.gadget.position.y = 1.28 + Math.sin(time * .003) * .16;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animateAvatar);
}

function setupParticles() {
  const canvas = $("#particleCanvas");
  const ctx = canvas.getContext("2d");
  const particles = [];
  const count = Math.min(34, Math.floor(window.innerWidth / 34));

  function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function seed() {
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.8 + .6,
        c: ["#20f6ff", "#ff3cf4", "#baff2e", "#2478ff"][i % 4]
      });
    }
  }

  function draw() {
    const now = performance.now();
    if (now - lastParticleFrame < 50) {
      requestAnimationFrame(draw);
      return;
    }
    lastParticleFrame = now;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.shadowColor = p.c;
      ctx.shadowBlur = 8;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  seed();
  draw();
  window.addEventListener("resize", () => {
    resize();
    seed();
  });
}

function toggleSound() {
  state.sound = !state.sound;
  $("#soundToggle").classList.toggle("sound-on", state.sound);
  if (state.sound) beep(520, .08);
}

function beep(freq, duration) {
  if (!state.sound) return;
  audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.035, audioCtx.currentTime + .01);
  gain.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration + .02);
}

function showMessage(message, type = "") {
  const box = $("#messageBox");
  box.textContent = message;
  box.className = `message-box ${type}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
