const { useState, useEffect, useRef, useLayoutEffect } = React;

/* ──────────────────────────────────────────────────────────────────
   Icon helper — wraps Lucide UMD <i data-lucide="...">
   ────────────────────────────────────────────────────────────────── */
function Icon({ name, size = 18, strokeWidth = 1.5, className = "", style }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current || !window.lucide) return;
    ref.current.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    ref.current.appendChild(i);
    window.lucide.createIcons({
      attrs: { width: size, height: size, "stroke-width": strokeWidth },
      nameAttr: "data-lucide"
    });
  }, [name, size, strokeWidth]);
  return (
    <span
      ref={ref}
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size, lineHeight: 0, ...style }}
      aria-hidden="true" />);


}

/* ──────────────────────────────────────────────────────────────────
   Custom icons — for project cards that need a bespoke visual
   ────────────────────────────────────────────────────────────────── */
function HistopathIcon({ size = 20, strokeWidth = 1.5, style, className = "" }) {
  // Tissue/specimen circle with cells + AI detection brackets around an anomaly
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true">
      
      {/* Specimen field */}
      <circle cx="12" cy="12" r="9" />
      {/* Healthy cells */}
      <circle cx="8" cy="8.6" r="1.35" />
      <circle cx="14.4" cy="8" r="1.05" />
      <circle cx="8" cy="14.6" r="1.05" />
      {/* Anomalous cell (slightly larger) */}
      <circle cx="15" cy="14.6" r="1.8" />
      {/* AI detection brackets around the anomalous cell */}
      <path d="M12.6 12.7 L12.6 12.1 L13.2 12.1" />
      <path d="M17.4 12.7 L17.4 12.1 L16.8 12.1" />
      <path d="M12.6 16.5 L12.6 17.1 L13.2 17.1" />
      <path d="M17.4 16.5 L17.4 17.1 L16.8 17.1" />
    </svg>);

}

function ProjectIcon({ name, size = 20, strokeWidth = 1.5, style }) {
  if (name === "histopath") {
    return <HistopathIcon size={size} strokeWidth={strokeWidth} style={style} />;
  }
  return <Icon name={name} size={size} strokeWidth={strokeWidth} style={style} />;
}

/* ──────────────────────────────────────────────────────────────────
   Store icons (App Store / Google Play) — monochrome, line-art style
   ────────────────────────────────────────────────────────────────── */
function AppleIcon({ size = 16, className = "", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
    </svg>
  );
}
function PlayStoreIcon({ size = 16, className = "", style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
      <path d="M4.5 2.5v19c0 .55.6.9 1.07.61l15.06-9.5c.44-.27.44-.95 0-1.22L5.57 1.89C5.1 1.6 4.5 1.95 4.5 2.5z"/>
    </svg>
  );
}

function StoreButtons({ store, size = "sm" }) {
  if (!store || (!store.ios && !store.android)) return null;
  const isLg = size === "lg";
  const px = isLg ? "px-4" : "px-3";
  const py = isLg ? "py-2.5" : "py-2";
  const labelSize = isLg ? "text-[14px]" : "text-[12.5px]";
  const eyebrowSize = isLg ? "text-[10px]" : "text-[9px]";
  const iconSize = isLg ? 18 : 15;
  return (
    <div className="flex flex-wrap gap-2">
      {store.ios && (
        <a
          href={store.ios}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`store-btn ${px} ${py}`}
          aria-label="Pruébala en App Store"
        >
          <AppleIcon size={iconSize} />
          <span className="flex flex-col leading-tight items-start">
            <span className={`${eyebrowSize} font-mono uppercase tracking-[0.1em] opacity-60`}>Pruébala en</span>
            <span className={`${labelSize} font-medium tracking-[-0.01em]`}>App Store</span>
          </span>
        </a>
      )}
      {store.android && (
        <a
          href={store.android}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`store-btn ${px} ${py}`}
          aria-label="Pruébala en Google Play"
        >
          <PlayStoreIcon size={iconSize} />
          <span className="flex flex-col leading-tight items-start">
            <span className={`${eyebrowSize} font-mono uppercase tracking-[0.1em] opacity-60`}>Pruébala en</span>
            <span className={`${labelSize} font-medium tracking-[-0.01em]`}>Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}


const ACCENTS = {
  peach: { name: "Peach", color: "#F2A56B", soft: "#FFE3CD" },
  apricot: { name: "Apricot", color: "#F4B988", soft: "#FFE8D4" },
  coral: { name: "Coral", color: "#E89272", soft: "#FFDCC9" },
  sand: { name: "Sand", color: "#D8B98A", soft: "#F2E5CC" },
  ink: { name: "Ink", color: "#1F2024", soft: "#ECEAE3" }
};

/* ──────────────────────────────────────────────────────────────────
   Tweakable defaults
   ────────────────────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "peach",
  "density": "comfortable",
  "showAvailability": true,
  "monoCaptions": true,
  "headline": "machines",
  "projectsLayout": "grid",
  "motion": true,
  "blobFloat": true,
  "parallax": true,
  "mouseReact": false,
  "scrollReveal": true,
  "motionSpeed": "normal"
} /*EDITMODE-END*/;

/* Velocidad → duración base (s) y multiplicador de magnitud */
const SPEED_PRESETS = {
  slow: { dur: 36, magnitude: 0.55 },
  normal: { dur: 22, magnitude: 1.0 },
  fast: { dur: 12, magnitude: 1.6 }
};

/* Opciones de titular del hero */
const HEADLINES = {
  machines: { line1: "Investigo cómo", line2: "piensan las máquinas." },
  researcher: { line1: "Ingeniero con mentalidad", line2: "de investigador." },
  systems: { line1: "Sistemas que aprenden.", line2: "Código que dura." },
  craft: { line1: "Donde la investigación", line2: "se vuelve software." }
};

/* ──────────────────────────────────────────────────────────────────
   Data
   ────────────────────────────────────────────────────────────────── */
const PROJECTS = [
{
  icon: "histopath",
  eyebrow: "CNN desde scratch · 2026",
  title: "Clasificación Médica con CNNs",
  desc: "Red convolucional para clasificación de tejido histopatológico de colon. Construida con una CNN desde cero en TensorFlow/Keras, sin transfer learning.",
  tags: ["Python", "TensorFlow", "Keras"],
  details: {
    summary:
    "Modelo de clasificación de tejido histopatológico de colon en 4 categorías (Normal, Low Grade, High Grade, Adenocarcinoma), construido con una CNN desde cero en TensorFlow/Keras — sin transfer learning.",
    metrics: [
    { value: "91.67%", label: "Precisión global en test" },
    { value: "100%", label: "Recall en tejido patológico" }],

    sections: [
    {
      heading: "El desafío",
      body:
      "Dataset fuertemente desbalanceado: 780 muestras de Adenocarcinoma frente a solo 61 de tejido Normal. Un modelo entrenado sin precaución colapsa hacia la clase mayoritaria y se vuelve clínicamente inútil."
    },
    {
      heading: "El enfoque",
      items: [
      "Oversampling de clases minoritarias",
      "Data augmentation específica para imágenes histológicas (simulando variaciones de tinción H&E)",
      "Focal Loss para priorizar ejemplos difíciles",
      "Test-Time Augmentation con 8 transformaciones geométricas"]

    },
    {
      heading: "Resultados",
      body:
      "Precisión global del 91,67% en el set de test, con un 100% de recall en la detección de tejido patológico — ningún caso de cáncer fue clasificado como sano."
    },
    {
      heading: "Interpretabilidad",
      body:
      "Implementé Grad-CAM para visualizar qué regiones del tejido activa la red al tomar cada decisión, aportando trazabilidad clínica al modelo.",
      media: {
        src: "assets/gradcam.png",
        alt: "Grad-CAM por clase — mapa de calor sobre tejido histopatológico de colon",
        caption: "Grad-CAM por clase · imagen original, mapa de activación y superposición"
      }
    }]

  }
},
{
  icon: "scan-eye",
  eyebrow: "Visión por computador · 2024",
  title: "Sistema de Visión Artificial",
  desc: "PadelTracker es un pipeline modular de visión por computadora que analiza vídeos de pádel detectando pelota, rastreando jugadores y generando estadísticas tácticas.",
  tags: ["Python", "OpenCV", "YOLOv8"],
  details: {
    summary:
    "PadelTracker es un sistema de analítica deportiva automatizada para partidos de pádel. Transforma vídeo broadcast en métricas tácticas y biomecánicas mediante un pipeline modular, con un fine-tuning propio de YOLOv8n entrenado por menos de 2 USD.",
    video: "media/padeltracker-demo.mp4",
    videoCaption: "Demo · Vídeo procesado por el pipeline de PadelTracker",
    metrics: [
    { value: "0.9103", label: "mAP@0.50 en detección de pelota" },
    { value: "<2 USD", label: "Coste de entrenamiento en GPU" }],

    sections: [
    {
      heading: "El desafío",
      body:
      "El modelo base de YOLOv8 entrenado en COCO no detecta pelotas de pádel — mAP prácticamente nulo. Sin una red especializada, ninguna métrica posterior (impactos, trayectorias, ritmo) puede calcularse de forma fiable."
    },
    {
      heading: "El enfoque",
      items: [
      "Construcción de PadelTracker100, dataset propio anotado de pelota en contexto de pádel",
      "Fine-tuning de YOLOv8n sobre el dataset, con coste de cómputo inferior a 2 USD en GPU alquilada",
      "Pipeline modular de 7 etapas, ejecutable en CPU local o en GPU en la nube (Colab / RunPod)",
      "Diseño orientado a reproducibilidad: cada etapa exporta artefactos intermedios verificables"]

    },
    {
      heading: "Pipeline",
      items: [
      "1 — Mapeo de la pista por homografía",
      "2 — Detección y rastreo de los 4 jugadores",
      "3 — Estimación de pose de cada jugador",
      "4 — Rastreo de la pelota con el modelo afinado",
      "5 — Detección de impactos y golpes mediante heurísticas",
      "6 — Generación de estadísticas tácticas y biomecánicas",
      "7 — Anotación y renderizado del vídeo final"]

    },
    {
      heading: "Resultados",
      body:
      "El sistema produce heatmaps individuales por jugador, distancias recorridas, distribución de golpes y un mapa de impactos sobre la pista. El fine-tuning lleva la detección de pelota de mAP nulo a 0.9103 con un coste de entrenamiento marginal."
    },
    {
      heading: "Entregables",
      body:
      "El proyecto incluye un paper técnico en formato IEEE describiendo arquitectura, dataset y evaluación, así como un pipeline ejecutable end-to-end en local o en la nube."
    }],

    links: [
    { label: "Repositorio en GitHub", url: "https://github.com/HugoFernandezz/PadelTracker", icon: "github" },
    { label: "Paper técnico (Zenodo)", url: "https://zenodo.org/records/19661898", icon: "file-text" }]

  }
},
{
  icon: "clapperboard",
  eyebrow: "Harness engineering · 2026",
  title: "Editor agéntico",
  desc: "Das una idea y una cadena de 7 agentes te devuelve un vídeo educativo de Manim — narrado con mi voz clonada en ElevenLabs y montado de principio a fin. Mi parte favorita: el harness que sostiene todo eso.",
  tags: ["Python", "FastAPI", "Next.js", "Claude Code"],
  details: {
    summary:
      "Quería ver hasta dónde podía empujar a un agente de IA antes de que se rompiera. ManimEditorAgent es lo que apareció: das una idea, una cadena de agentes la convierte en un vídeo educativo de Manim — narrado con mi voz clonada en ElevenLabs, montado y listo para subir.",
    video: "media/manimeditoragent-demo.mp4",
    videoCaption: "Demo · Pipeline end-to-end: idea → vídeo narrado con mi voz clonada",
    metrics: null,
    sections: [
      {
        heading: "El origen",
        body:
          "Producir un vídeo educativo con Manim a mano es tedioso: escribes la narrativa, programas cada escena, persigues errores de render, sincronizas audio y editas. Quise saber si podía delegar todo eso en agentes y quedarme sólo con la parte de decidir.",
      },
      {
        heading: "Lo que más me importó: el harness",
        body:
          "Encadenar llamadas a un LLM y rezar no funciona — cualquier escena fallida te bloquea el resto del vídeo. Pasé la mayor parte del proyecto construyendo el harness alrededor de los agentes: la capa que valida cada paso antes de avanzar, reintenta con contexto del error anterior, aísla escenas en paralelo y registra cada decisión para poder depurarla. Es la diferencia entre un demo que cae y un sistema que llega al final sin supervisión.",
      },
      {
        heading: "Mi voz, automatizada",
        body:
          "Clone mi propia voz en ElevenLabs y la enchufé al pipeline como narrador por defecto. El resultado son vídeos que parecen doblados por mí — sin grabar ni una toma. Si no quieres pagar la API, hay un modo gratuito con gTTS que sigue funcionando.",
      },
      {
        heading: "Los 7 agentes",
        items: [
          "Researcher — averigua qué plugins de Manim hacen falta para la idea",
          "Planner — propone el outline de escenas",
          "Beat Writer — sincroniza narración y animación beat a beat",
          "Coder — escribe el código Manim de cada escena con el audio ya embebido",
          "Visual QA — mira frames del render y propone correcciones",
          "Editor — concatena escenas con ffmpeg en el vídeo final",
          "Curator — extrae aprendizajes y actualiza la skill para la próxima ejecución",
        ],
      },
      {
        heading: "El sistema se autodocumenta",
        body:
          "El Curator escribe sobre la propia skill de Manim: reglas, atajos, errores comunes que ya conoce. Cada ejecución deja al siguiente agente un poco más informado. Me gustó la idea de que el sistema no sólo entregue vídeos, sino que aprenda mientras los entrega.",
      },
      {
        heading: "Cómo se usa",
        body:
          "Una interfaz web donde escribes la idea, apruebas los plugins propuestos, revisas cada escena y descargas el MP4. Soporta YouTube (16:9) y TikTok (9:16) con narrativas adaptadas — más analítica en YouTube, hook en los primeros 3s para TikTok.",
      },
    ],
    links: [
      { label: "Repositorio en GitHub", url: "https://github.com/HugoFernandezz/ManimEditorAgent", icon: "github" },
    ],
  },
},
{
  icon: "party-popper",
  eyebrow: "App nativa · React Native · 2025",
  title: "App nativa móvil",
  desc: "Brindis! — app para descubrir la vida nocturna de Murcia. Un bot scrapea varias webs cada noche, normaliza los eventos a un único formato, los sube a Firebase y la app los pinta — con caché inteligente y modo offline.",
  tags: ["React Native", "Expo", "TypeScript", "Firebase", "Python"],
  store: {
    ios: "https://apps.apple.com/es/app/brindis-fiesta-en-murcia/id6757165849",
    android: "https://play.google.com/store/apps/details?id=com.jaleo.app&hl=es",
  },
  details: {
    summary:
      "Llevaba tiempo queriendo un producto pequeño punta a punta: scraping, backend, datos, app y publicación. Brindis! salió de ahí — descubres qué se cuece esta noche en Murcia sin abrir cinco Instagrams distintos.",
    video: "media/brindis-demo.mp4",
    videoCaption: "Demo · Recorrido por la app: agenda, filtro por sala y detalle de evento",
    sections: [
      {
        heading: "El flujo de datos",
        items: [
          "01 — Un bot en Python rasca a diario las webs y redes de las salas de Murcia",
          "02 — Normaliza cada evento al mismo formato: fecha, sala, precio, estado de entradas, transporte",
          "03 — Lo sube a Firebase como un único JSON canónico",
          "04 — La app descarga ese JSON, lo cachea, y lo pinta en una agenda agrupada por fechas",
          "05 — A las 20:30h hora de Madrid, el ciclo se repite. Si no hay cambios, no consume datos del usuario",
        ],
      },
      {
        heading: "La app",
        body:
          "Agenda de eventos por fecha con headers sticky, filtro horizontal por discoteca, y tarjetas por entrada con estados visuales — disponible, últimas, agotado. Los eventos con bus incluido tienen su propio badge. Todo navega de la home al detalle con animaciones nativas.",
      },
      {
        heading: "Detalles que me importaron",
        items: [
          "Caché por encima de Firebase — la app abre instantánea aunque estés sin red",
          "Memory leaks rastreados con calma — useMemo, useCallback y dependencias de useEffect bien puestas",
          "Sin librerías de UI: cada componente está escrito a mano para que el look-and-feel sea consistente",
          "Estados de error visibles: si una URL de compra rompe, la app lo dice en vez de fallar en silencio",
        ],
      },
      {
        heading: "Stack",
        body:
          "React Native + Expo + TypeScript en el cliente. Python para el scraper. Firebase como capa de datos. El backend cabe en una función serverless que dispara el bot a su hora.",
      },
    ],
  },
}];


const CERTS = [
{
  icon: "award",
  title: "Oracle Certified Associate · Java SE 7 Programmer",
  issuer: "Oracle Academy · Universidad Católica de Murcia",
  date: "Nov 2025",
  hours: "25 h",
  tags: ["Java SE 7", "POO", "JDK 7", "Genéricos"],
  file: "media/certs/oracle-java-se7.pdf"
},
{
  icon: "terminal",
  title: "NDG Linux Essentials",
  issuer: "Cisco Networking Academy · Linux Professional Institute",
  date: "Nov 2025",
  hours: null,
  tags: ["Línea de comandos", "Permisos", "Sistema de ficheros", "Shell"],
  file: "media/certs/ndg-linux-essentials.pdf"
}];

const STACK = [
{ group: "Lenguajes", items: ["Python", "Java", "TypeScript", "C"] },
{ group: "IA / Data", items: ["PyTorch", "Scikit-learn", "Pandas"] },
{ group: "Móvil", items: ["React Native", "Expo", "Swift básico"] },
{ group: "Sistemas", items: ["Linux", "Docker", "Git", "Bash"] }];


/* ──────────────────────────────────────────────────────────────────
/* ──────────────────────────────────────────────────────────────────
   Motion context — provee scroll, mouse, toggles a Blob & secciones
   ────────────────────────────────────────────────────────────────── */
const MotionContext = React.createContext({
  scrollY: 0,
  mouse: { x: 0, y: 0 },
  motion: true,
  blobFloat: true,
  parallax: true,
  mouseReact: true,
  scrollReveal: true,
  speed: SPEED_PRESETS.normal
});

function MotionProvider({ tweaks, children }) {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const speed = SPEED_PRESETS[tweaks.motionSpeed] || SPEED_PRESETS.normal;
  const motionOn = !!tweaks.motion;

  useEffect(() => {
    if (!motionOn || !tweaks.parallax) {setScrollY(0);return;}
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY || 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [motionOn, tweaks.parallax]);

  useEffect(() => {
    if (!motionOn || !tweaks.mouseReact) {setMouse({ x: 0, y: 0 });return;}
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5
        });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [motionOn, tweaks.mouseReact]);

  const value = {
    scrollY,
    mouse,
    motion: motionOn,
    blobFloat: !!tweaks.blobFloat,
    parallax: !!tweaks.parallax,
    mouseReact: !!tweaks.mouseReact,
    scrollReveal: !!tweaks.scrollReveal,
    speed
  };
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

/* Hook: marca elementos visibles al hacer scroll */
function useRevealOnScroll(enabled) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!enabled) {
      ref.current.classList.add("in-view");
      return;
    }
    ref.current.classList.remove("in-view");
    const el = ref.current;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("in-view");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);
  return ref;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ctx = React.useContext(MotionContext);
  const ref = useRevealOnScroll(ctx.motion && ctx.scrollReveal);
  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`}
      style={{ transitionDelay: `${delay}s` }}>
      
      {children}
    </div>);

}

/* ──────────────────────────────────────────────────────────────────
   Blob — forma sólida naranja, posicionada absolute dentro de la sección
   ────────────────────────────────────────────────────────────────── */
function Blob({ top, left, right, bottom, size = 320, color = "#FFC097", shape = 0, opacity = 1, parallaxFactor = 0.18, mouseFactor = 14 }) {
  const ctx = React.useContext(MotionContext);
  const shapes = [
  "42% 58% 38% 62% / 52% 40% 60% 48%",
  "60% 40% 55% 45% / 45% 55% 45% 55%",
  "38% 62% 65% 35% / 60% 35% 65% 40%",
  "55% 45% 38% 62% / 35% 60% 40% 65%",
  "50% 50% 30% 70% / 60% 50% 50% 40%"];

  const w = typeof size === "number" ? size : size[0];
  const h = typeof size === "number" ? size : size[1];

  const mag = ctx.speed.magnitude;
  const py = ctx.motion && ctx.parallax ? -ctx.scrollY * parallaxFactor * mag : 0;
  const mx = ctx.motion && ctx.mouseReact ? ctx.mouse.x * mouseFactor * mag : 0;
  const my = ctx.motion && ctx.mouseReact ? ctx.mouse.y * mouseFactor * mag : 0;

  const useFloat = ctx.motion && ctx.blobFloat;
  const a = shapes[shape % shapes.length];
  const b = shapes[(shape + 1) % shapes.length];

  return (
    <div
      className={`blob ${useFloat ? "blob-float" : ""}`}
      style={{
        top, left, right, bottom,
        width: w,
        height: h,
        opacity,
        transform: `translate3d(${mx.toFixed(2)}px, ${(py + my).toFixed(2)}px, 0)`,
        transition: ctx.mouseReact ? "transform 0.18s cubic-bezier(.22,.61,.36,1)" : "none",
        "--blob-shape-a": a,
        "--blob-shape-b": b,
        "--blob-dur": `${ctx.speed.dur + shape * 2}s`,
        "--blob-delay": `${shape * 0.7 % 4}s`,
        "--drift-name": `blob-drift-${shape % 5}`,
        "--drift-dur": `${ctx.speed.dur * 3 + shape * 4}s`,
        "--drift-delay": `${shape * 1.7 % 5}s`
      }}
      aria-hidden="true">

      <div className="blob-drift">
        <div
          className="blob-inner"
          style={{
            background: color,
            borderRadius: a
          }} />
      </div>
    </div>);

}

/* ──────────────────────────────────────────────────────────────────
   Page sections
   ────────────────────────────────────────────────────────────────── */
function TopNav({ accent }) {
  return (
    <nav className="w-full relative z-20">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-8 md:pt-10 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-110"
            style={{ background: ACCENTS[accent].color }} />
          
          <span className="font-medium tracking-tight text-[15px]">Hugo Fernández Gil</span>
        </a>
        <div className="hidden md:flex items-center gap-7 text-[14px]" style={{ color: "var(--ink-2)" }}>
          <a href="#about" className="link-quiet">Sobre mí</a>
          <a href="#projects" className="link-quiet">Proyectos</a>
          <a href="#skills" className="link-quiet">Formación</a>
          <a href="#contact" className="link-quiet">Contacto</a>
        </div>
        <a
          href="#contact"
          className="md:hidden text-[13px] font-medium link-quiet">
          
          Contacto
        </a>
      </div>
    </nav>);

}

function Hero({ tweaks }) {
  const accent = ACCENTS[tweaks.accent];
  return (
    <section id="top" className="relative">
      {/* Una mancha por sección */}
      <Blob top={-80} right={-180} size={[520, 480]} color="#FFB378" shape={0} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 pt-20 md:pt-32 pb-20 md:pb-28">
        {/* Eyebrow row */}
        <div
          className="reveal flex items-center gap-3 mb-10 md:mb-14"
          style={{ animationDelay: "0.05s", color: "var(--ink-3)" }}>
          
          {tweaks.showAvailability &&
          <span className="inline-flex items-center gap-2">
              <span className="dot" style={{ background: accent.color, boxShadow: `0 0 0 4px ${accent.soft}` }} />
              <span className={`text-[12px] tracking-wide uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`}>
                Abierto a colaborar
              </span>
            </span>
          }
          <span className="w-px h-3" style={{ background: "var(--line-2)" }} />
          <span className={`inline-flex items-center gap-1.5 text-[12px] tracking-wide uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`}>
            <Icon name="map-pin" size={12} strokeWidth={1.75} />
            Murcia · España
          </span>
          <span className="w-px h-3" style={{ background: "var(--line-2)" }} />
          <span className={`text-[12px] tracking-wide uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`}>
            3.º Ingeniería Informática
          </span>
        </div>

        {/* Greeting */}
        <p
          className="reveal text-[15px] md:text-[16px] mb-5"
          style={{ animationDelay: "0.12s", color: "var(--ink-2)" }}>
          
          Hola, soy Hugo Fernández Gil.
        </p>

        {/* Headline */}
        <h1
          className="reveal text-[44px] leading-[1.05] md:text-[80px] md:leading-[0.98] font-medium tracking-[-0.025em]"
          style={{ animationDelay: "0.2s" }}>
          
          {HEADLINES[tweaks.headline]?.line1 || HEADLINES.machines.line1}
          <br />
          <span style={{ color: "var(--accent-deep, #D77A3A)" }}>
            {HEADLINES[tweaks.headline]?.line2 || HEADLINES.machines.line2}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="reveal mt-8 md:mt-10 max-w-[640px] text-[17px] md:text-[19px] leading-[1.55]"
          style={{ animationDelay: "0.3s", color: "var(--ink-2)" }}>
          
          Apasionado por la{" "}
          <span style={{ color: "var(--ink)" }}>Inteligencia Artificial</span> y la{" "}
          <span style={{ color: "var(--ink)" }}>investigación</span>.
        </p>

        {/* CTAs */}
        <div
          className="reveal mt-10 md:mt-14 flex items-center gap-3"
          style={{ animationDelay: "0.4s" }}>
          
          <a
            href="#projects"
            className="btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium">
            
            Ver proyectos
            <Icon name="arrow-right" size={16} strokeWidth={1.75} />
          </a>
          <a
            href="#contact"
            className="btn-ghost inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-[14px] font-medium">
            
            Contacto
          </a>
        </div>

        {/* Footnote / signature row */}
        <div
          className="reveal mt-20 md:mt-28 flex items-end justify-between"
          style={{ animationDelay: "0.5s" }}>
          
          <div className={`text-[11px] tracking-[0.14em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
            <div>Portfolio · 2026</div>
            <div className="mt-1.5">v1.0 — en construcción</div>
          </div>
          <a href="#about" className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-wide uppercase link-quiet" style={{ color: "var(--ink-3)" }}>
            <span className={tweaks.monoCaptions ? "font-mono" : ""}>Sigue bajando</span>
            <Icon name="arrow-down" size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>);

}

function About({ tweaks }) {
  return (
    <section id="about" className="relative">
      <Blob top={120} left={-200} size={[360, 340]} color="#FFC79A" shape={1} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-3" style={{ width: "232px" }}>
            <div className={`text-[11px] tracking-[0.16em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
              01 — Sobre mí
            </div>
          </div>
          <div className="md:col-span-9 max-w-[680px]">
            <p className="text-[22px] md:text-[28px] leading-[1.35] tracking-[-0.01em] font-medium">
              Investigo, prototipo y construyo.
            </p>
            <p className="mt-5 text-[16px] md:text-[17px] leading-[1.65]" style={{ color: "var(--ink-2)" }}>
              Me interesa la frontera entre la IA y los sistemas que la sostienen: leer papers, replicar experimentos y traducirlos en código mantenible. Busco claridad sobre velocidad y profundidad sobre síntomas.
            </p>
            <p className="mt-4 text-[16px] md:text-[17px] leading-[1.65]" style={{ color: "var(--ink-2)" }}>
              Aprendo rápido y me adapto a las circunstancias — entrar en un dominio nuevo, y aprender una nueva tecnologia, es parte de lo que más disfruto.
            </p>

            {/* Tiny meta strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8" style={{ borderTop: "1px solid var(--line)" }}>
              {[
                { k: "Estudios", v: "Ingeniería Informática" },
                { k: "Curso", v: "3.º año" },
                { k: "Enfoque", v: "IA & sistemas" },
                { k: "Base", v: "Murcia, ES" }].
                map((m) =>
                <div key={m.k}>
                  <div className={`text-[11px] tracking-[0.14em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                    {m.k}
                  </div>
                  <div className="mt-1.5 text-[14px]" style={{ color: "var(--ink)" }}>{m.v}</div>
                </div>
                )}
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>);

}

function ProjectCard({ p, i, total, tweaks, onOpen, variant = "default" }) {
  const isList = variant === "list";
  const onActivate = () => onOpen && onOpen(p);

  if (isList) {
    return (
      <article
        className="card rounded-[28px] p-6 md:p-7 group flex flex-col md:flex-row md:items-center md:gap-7"
        role="button"
        tabIndex={0}
        onClick={onActivate}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && onOpen) { e.preventDefault(); onActivate(); }
        }}
      >
        <div className="flex items-center gap-5 md:flex-shrink-0 md:w-[280px]">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-soft)", border: "1px solid rgba(242,165,107,0.25)" }}
          >
            <ProjectIcon name={p.icon} size={22} strokeWidth={1.5} style={{ color: "var(--accent-deep, #D77A3A)" }} />
          </div>
          <div className="min-w-0">
            <div className={`text-[10.5px] tracking-[0.14em] uppercase mb-1 ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
              {p.eyebrow}
            </div>
            <h3 className="text-[18px] md:text-[19px] font-medium tracking-[-0.01em] leading-snug">
              {p.title}
            </h3>
          </div>
        </div>

        <p className="mt-4 md:mt-0 text-[14px] leading-[1.55] md:flex-grow md:max-w-[420px]" style={{ color: "var(--ink-2)" }}>
          {p.desc}
        </p>

        <div className="mt-5 md:mt-0 flex flex-wrap gap-1.5 md:flex-shrink-0 md:max-w-[200px] md:justify-end">
          {p.tags.slice(0, 3).map((t) =>
            <span key={t} className={`chip inline-flex items-center px-3 py-1 rounded-full text-[11.5px] tracking-wide ${tweaks.monoCaptions ? "font-mono" : ""}`}>{t}</span>
          )}
        </div>

        <div className="hidden md:flex w-9 h-9 rounded-full items-center justify-center flex-shrink-0 transition-colors group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent-deep,#D77A3A)]" style={{ color: "var(--ink-3)" }}>
          <Icon name="arrow-up-right" size={16} strokeWidth={1.5} />
        </div>
      </article>
    );
  }

  return (
    <article
      className="card rounded-[28px] p-6 md:p-7 flex flex-col group h-full"
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onOpen) { e.preventDefault(); onActivate(); }
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-7 transition-colors"
        style={{ background: "var(--accent-soft)", border: "1px solid rgba(242,165,107,0.25)" }}
      >
        <ProjectIcon name={p.icon} size={20} strokeWidth={1.5} style={{ color: "var(--accent-deep, #D77A3A)" }} />
      </div>

      <div className={`text-[11px] tracking-[0.14em] uppercase mb-2 ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
        {p.eyebrow}
      </div>

      <h3 className="text-[18px] md:text-[19px] font-medium tracking-[-0.01em] leading-snug mb-2.5">
        {p.title}
      </h3>

      <p className="text-[14px] leading-[1.55] mb-7 flex-grow" style={{ color: "var(--ink-2)" }}>
        {p.desc}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {p.tags.map((t) =>
          <span key={t} className={`chip inline-flex items-center px-3 py-1 rounded-full text-[11.5px] tracking-wide ${tweaks.monoCaptions ? "font-mono" : ""}`}>{t}</span>
        )}
      </div>

      <div className="pt-5 flex items-center justify-between text-[13px]" style={{ borderTop: "1px solid var(--line)", color: "var(--ink-3)" }}>
        <span className={`${tweaks.monoCaptions ? "font-mono" : ""} text-[11px] tracking-[0.14em] uppercase`}>
          0{i + 1} / 0{total}
        </span>
        <span className="inline-flex items-center gap-1 transition-colors group-hover:text-[var(--ink)]">
          Ver detalles
          <span className="card-cta-arrow">
            <Icon name="arrow-up-right" size={14} strokeWidth={1.5} />
          </span>
        </span>
      </div>
    </article>
  );
}

function ProjectsCarousel({ tweaks, onOpen }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollByCards = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".carousel-item");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          paddingBottom: "8px",
          margin: "0 -24px",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            className="carousel-item"
            style={{
              flex: "0 0 calc((100% - 48px) / 3)",
              minWidth: "260px",
              scrollSnapAlign: "start",
            }}
          >
            <ProjectCard p={p} i={i} total={PROJECTS.length} tweaks={tweaks} onOpen={onOpen} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className={`text-[11px] tracking-[0.14em] uppercase font-mono`} style={{ color: "var(--ink-3)" }}>
          Desliza para más proyectos
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
            className="carousel-btn"
          >
            <Icon name="arrow-left" size={16} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Siguiente"
            className="carousel-btn"
          >
            <Icon name="arrow-right" size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Projects({ tweaks, onOpen }) {
  const layout = tweaks.projectsLayout || "grid";

  return (
    <section id="projects" className="relative">
      <Blob bottom={80} right={-180} size={[320, 300]} color="#FFB87A" shape={2} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
        {/* Section header */}
        <Reveal>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <div className={`text-[11px] tracking-[0.16em] uppercase mb-3 ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                02 — Selección
              </div>
              <h2 className="text-[32px] md:text-[44px] tracking-[-0.02em] font-medium leading-[1.1]">
                Proyectos recientes.
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 text-[13px] link-quiet"
              style={{ color: "var(--ink-2)" }}
            >
              Pídeme detalles
              <Icon name="arrow-up-right" size={14} strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>

        {layout === "carousel" && <ProjectsCarousel tweaks={tweaks} onOpen={onOpen} />}

        {layout === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PROJECTS.map((p, i) =>
              <Reveal key={p.title} delay={i * 0.08}>
                <ProjectCard p={p} i={i} total={PROJECTS.length} tweaks={tweaks} onOpen={onOpen} />
              </Reveal>
            )}
          </div>
        )}

        {layout === "mosaic" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mosaic-grid">
            {PROJECTS.map((p, i) =>
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
              >
                <ProjectCard p={p} i={i} total={PROJECTS.length} tweaks={tweaks} onOpen={onOpen} />
              </Reveal>
            )}
          </div>
        )}

        {layout === "list" && (
          <div className="flex flex-col gap-4 md:gap-5">
            {PROJECTS.map((p, i) =>
              <Reveal key={p.title} delay={i * 0.06}>
                <ProjectCard p={p} i={i} total={PROJECTS.length} tweaks={tweaks} onOpen={onOpen} variant="list" />
              </Reveal>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   VideoPlayer — reproductor minimalista para casos de estudio
   ────────────────────────────────────────────────────────────────── */
function VideoPlayer({ src, caption }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [volScrubbing, setVolScrubbing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const fmt = (s) => {
    if (!isFinite(s) || s < 0) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setHasStarted(true);
    } else {
      v.pause();
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    // If the video is muted, unmute and restore audible volume (≥0.1)
    if (v.muted) {
      v.muted = false;
      setMuted(false);
      if (v.volume < 0.05) {
        v.volume = 0.6;
        setVolume(0.6);
      }
    } else {
      v.muted = true;
      setMuted(true);
    }
  };

  const setVolumeFromEvent = (e) => {
    const v = videoRef.current;
    if (!v) return;
    const track = e.currentTarget.closest(".video-vol-track") || e.currentTarget;
    const rect = track.getBoundingClientRect();
    const inner = rect.width - 8; // matches left/right: 4px in CSS
    const raw = (e.clientX - rect.left - 4) / inner;
    const ratio = Math.max(0, Math.min(1, raw));
    v.volume = ratio;
    v.muted = ratio === 0;
    setVolume(ratio);
    setMuted(ratio === 0);
  };

  const onVolMouseDown = (e) => {
    e.stopPropagation();
    setVolScrubbing(true);
    setVolumeFromEvent(e);
  };

  useEffect(() => {
    if (!volScrubbing) return;
    const onMove = (e) => {
      const v = videoRef.current;
      if (!v) return;
      const track = containerRef.current?.querySelector(".video-vol-track");
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const inner = rect.width - 8;
      const raw = (e.clientX - rect.left - 4) / inner;
      const ratio = Math.max(0, Math.min(1, raw));
      v.volume = ratio;
      v.muted = ratio === 0;
      setVolume(ratio);
      setMuted(ratio === 0);
    };
    const onUp = () => setVolScrubbing(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [volScrubbing]);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFsChange = () => {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(fsEl === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, []);

  // Bloquea scroll del body durante el pseudo-fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (fsEl) return; // API nativa ya bloquea por su cuenta
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [isFullscreen]);

  // ESC sale del pseudo-fullscreen (cuando no usamos la API nativa)
  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
        if (fsEl) {
          (document.exitFullscreen || document.webkitExitFullscreen)?.call(document);
        } else {
          setIsFullscreen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen]);

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const el = containerRef.current;
    if (!el) return;

    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;

    if (fsEl) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
      setIsFullscreen(false);
      return;
    }

    // Si estamos en pseudo-fullscreen (sin API nativa), salir
    if (isFullscreen) {
      setIsFullscreen(false);
      return;
    }

    const req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) {
      try {
        const p = req.call(el);
        if (p && typeof p.then === "function") {
          p.catch(() => setIsFullscreen(true)); // fallback si la promesa rechaza
        }
      } catch {
        setIsFullscreen(true);
      }
    } else {
      // navegador sin API → pseudo-fullscreen via CSS
      setIsFullscreen(true);
    }
  };

  const seekFromEvent = (e) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const track = e.currentTarget.closest(".video-track") || e.currentTarget;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
  };

  const onTrackMouseDown = (e) => {
    setScrubbing(true);
    seekFromEvent(e);
  };

  useEffect(() => {
    if (!scrubbing) return;
    const onMove = (e) => {
      const v = videoRef.current;
      if (!v || !v.duration) return;
      const track = containerRef.current?.querySelector(".video-track");
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      v.currentTime = ratio * v.duration;
      setProgress(ratio);
    };
    const onUp = () => setScrubbing(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [scrubbing]);

  const showControls = hovering || !isPlaying || scrubbing;

  const playerNode = (
    <div
      ref={containerRef}
      className={`video-player ${isFullscreen ? "is-pseudo-fullscreen" : ""}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>

      <video
        ref={videoRef}
        src={src}
        playsInline
        muted
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          if (scrubbing) return;
          const t = e.currentTarget.currentTime;
          const d = e.currentTarget.duration || 1;
          setCurrent(t);
          setProgress(t / d);
        }}
        onEnded={() => setIsPlaying(false)} />


      {/* Big play button when paused */}
      {!isPlaying &&
      <button
        className="video-play-big"
        onClick={togglePlay}
        aria-label="Reproducir vídeo">

          <Icon name="play" size={26} strokeWidth={1.5} />
        </button>
      }

      {/* Controls */}
      <div className={`video-controls ${showControls ? "visible" : ""}`}>
        <button onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
          <Icon name={isPlaying ? "pause" : "play"} size={15} strokeWidth={1.75} />
        </button>
        <div className="video-time font-mono">{fmt(current)}</div>
        <div className="video-track" onMouseDown={onTrackMouseDown}>
          <div className="video-track-bg" />
          <div className="video-track-fill" style={{ width: `${progress * 100}%` }} />
          <div className="video-track-thumb" style={{ left: `${progress * 100}%` }} />
        </div>
        <div className="video-time video-time-total font-mono">{fmt(duration)}</div>
        <div className="video-vol-group">
          <button onClick={toggleMute} aria-label={muted ? "Activar sonido" : "Silenciar"}>
            <Icon name={muted || volume === 0 ? "volume-x" : volume < 0.5 ? "volume-1" : "volume-2"} size={15} strokeWidth={1.5} />
          </button>
          <div
            className={`video-vol-track ${volScrubbing ? "dragging" : ""}`}
            onMouseDown={onVolMouseDown}
            role="slider"
            aria-label="Volumen"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((muted ? 0 : volume) * 100)}>
            <div className="video-vol-bg" />
            <div className="video-vol-fill" style={{ width: `calc(${(muted ? 0 : volume) * 100}% - ${(muted ? 0 : volume) * 8}px)` }} />
            <div className="video-vol-thumb" style={{ left: `calc(${(muted ? 0 : volume) * 100}% - ${((muted ? 0 : volume) - 0.5) * 8}px)` }} />
          </div>
        </div>
        <button onClick={toggleFullscreen} aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}>
          <Icon name={isFullscreen ? "minimize-2" : "maximize-2"} size={14} strokeWidth={1.5} />
        </button>
      </div>
    </div>);

  const nativeFs = typeof document !== "undefined" && (document.fullscreenElement || document.webkitFullscreenElement);
  // Cuando estamos en pseudo-fullscreen (no API nativa), portamos a <body>
  // para escapar de ancestors con `transform`/`overflow` que rompen `position: fixed`.
  // Usamos ReactDOM.createPortal para conservar la delegación de eventos de React.
  const usePortal = isFullscreen && !nativeFs && typeof ReactDOM !== "undefined" && ReactDOM.createPortal;

  return (
    <figure className="video-figure">
      {usePortal ? ReactDOM.createPortal(playerNode, document.body) : playerNode}
      {caption &&
      <figcaption className="video-caption font-mono">{caption}</figcaption>
      }
    </figure>);

}

/* ──────────────────────────────────────────────────────────────────
   ProjectModal — detalle expandido al hacer click en una tarjeta
   ────────────────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    document.body.classList.add("modal-open");
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;
  const d = project.details;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {if (e.target === e.currentTarget) onClose();}}
      role="dialog"
      aria-modal="true">
      
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <Icon name="x" size={18} strokeWidth={1.75} />
        </button>

        <div className="flex items-start gap-4 mb-7">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-soft)", border: "1px solid rgba(242,165,107,0.25)" }}>
            
            <ProjectIcon name={project.icon} size={24} strokeWidth={1.5} style={{ color: "var(--accent-deep, #D77A3A)" }} />
          </div>
          <div className="min-w-0 pt-1">
            <div className="text-[11px] tracking-[0.16em] uppercase font-mono mb-1.5" style={{ color: "var(--ink-3)" }}>
              {project.eyebrow}
            </div>
            <h3 className="text-[26px] md:text-[32px] font-medium tracking-[-0.02em] leading-[1.1]">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {project.tags.map((t) =>
          <span key={t} className="chip inline-flex items-center px-3 py-1 rounded-full text-[11.5px] tracking-wide font-mono">
              {t}
            </span>
          )}
        </div>

        {d ?
        <div>
            {d.video &&
          <div className="mb-8">
                <VideoPlayer
              src={d.video}
              caption={d.videoCaption || "Demo"} />
            
              </div>
          }
            {d.summary &&
          <p className="text-[17px] md:text-[19px] leading-[1.55] tracking-[-0.005em]" style={{ color: "var(--ink)" }}>
                {d.summary}
              </p>
          }

            {d.metrics && d.metrics.length > 0 &&
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {d.metrics.map((m) =>
            <div key={m.label} className="metric-card">
                    <div className="text-[28px] md:text-[32px] font-medium tracking-[-0.02em] leading-none" style={{ color: "var(--accent-deep, #D77A3A)" }}>
                      {m.value}
                    </div>
                    <div className="mt-2 text-[12.5px] leading-[1.4]" style={{ color: "var(--ink-2)" }}>
                      {m.label}
                    </div>
                  </div>
            )}
              </div>
          }

            {d.sections && d.sections.length > 0 &&
          <div className="mt-10 space-y-7">
                {d.sections.map((s) =>
            <div key={s.heading}>
                    <div className="text-[11px] tracking-[0.18em] uppercase font-mono mb-3" style={{ color: "var(--ink-3)" }}>
                      {s.heading}
                    </div>
                    {s.body &&
              <p className="text-[15px] md:text-[16px] leading-[1.65]" style={{ color: "var(--ink-2)" }}>
                        {s.body}
                      </p>
              }
                    {s.items &&
              <ul className="mt-1 space-y-2.5">
                        {s.items.map((it) =>
                <li key={it} className="flex items-start gap-3 text-[15px] md:text-[16px] leading-[1.55]" style={{ color: "var(--ink-2)" }}>
                            <span
                    className="inline-block flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent-deep, #D77A3A)" }} />
                  
                            <span>{it}</span>
                          </li>
                )}
                      </ul>
              }
                    {s.media &&
              <figure className="mt-5">
                        <div
                  className="rounded-[22px] p-4 md:p-5"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, var(--accent-soft) 100%)",
                    border: "1px solid var(--line)"
                  }}>
                  
                          <img
                    src={s.media.src}
                    alt={s.media.alt || ""}
                    loading="lazy"
                    className="w-full h-auto block"
                    style={{ borderRadius: "14px", width: "737px", height: "904px" }} />
                  
                        </div>
                        {s.media.caption &&
                <figcaption
                  className="mt-3 text-[11.5px] font-mono tracking-[0.06em]"
                  style={{ color: "var(--ink-3)" }}>
                  
                            {s.media.caption}
                          </figcaption>
                }
                      </figure>
              }
                  </div>
            )}
              </div>
          }

            {project.details.links && project.details.links.length > 0 &&
          <div className="mt-12 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
                <div className={`text-[11px] font-mono tracking-[0.14em] uppercase mb-4`} style={{ color: "var(--ink-3)" }}>
                  Enlaces
                </div>
                <div className="flex flex-col gap-2">
                  {project.details.links.map((l) =>
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  border: "1px solid var(--line)",
                  color: "var(--ink)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(242,165,107,0.45)";
                  e.currentTarget.style.background = "var(--accent-soft)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--line)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.55)";
                }}>
                
                      <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent-soft)", border: "1px solid rgba(242,165,107,0.25)", color: "var(--accent-deep, #D77A3A)" }}>
                  
                        <Icon name={l.icon || "link"} size={16} strokeWidth={1.5} />
                      </span>
                      <span className="flex-grow text-[14px] font-medium">{l.label}</span>
                      <span style={{ color: "var(--ink-3)" }}>
                        <Icon name="arrow-up-right" size={15} strokeWidth={1.5} />
                      </span>
                    </a>
              )}
                </div>
              </div>
          }

            {project.store && (
              <div className="mt-12 pt-6" style={{ borderTop: "1px solid var(--line)" }}>
                <div className="text-[11px] font-mono tracking-[0.14em] uppercase mb-4" style={{ color: "var(--ink-3)" }}>
                  Disponible en
                </div>
                <StoreButtons store={project.store} size="lg" />
              </div>
            )}

            <div className="mt-10 pt-6 text-[12px] font-mono tracking-[0.14em] uppercase" style={{ color: "var(--ink-3)", borderTop: "1px solid var(--line)" }}>
              Caso de estudio
            </div>
          </div> :

        <div>
            <p className="text-[16px] md:text-[17px] leading-[1.6]" style={{ color: "var(--ink-2)" }}>
              {project.desc}
            </p>
            <div className="mt-10 pt-6 text-[13px] font-mono tracking-[0.14em] uppercase" style={{ color: "var(--ink-3)", borderTop: "1px solid var(--line)" }}>
              Detalles próximamente
            </div>
          </div>
        }
      </div>
    </div>);

}

// Espera a que pdf.js esté disponible (cargado vía <script type="module"> en index.html)
function waitForPdfjs() {
  if (window.pdfjs) return Promise.resolve(window.pdfjs);
  return new Promise((resolve) => {
    const check = () => {
      if (window.pdfjs) resolve(window.pdfjs);
      else setTimeout(check, 50);
    };
    window.addEventListener("pdfjs-ready", () => resolve(window.pdfjs), { once: true });
    check();
  });
}

function CertModal({ cert, onClose }) {
  const containerRef = useRef(null);
  const [state, setState] = useState("idle"); // idle | loading | done | error

  useEffect(() => {
    if (!cert) { setState("idle"); return; }
    let cancelled = false;
    setState("loading");

    (async () => {
      try {
        const pdfjs = await waitForPdfjs();
        const r = await fetch(cert.file);
        const buf = new Uint8Array(await r.arrayBuffer());
        if (cancelled) return;
        const doc = await pdfjs.getDocument({ data: buf }).promise;
        if (cancelled) return;
        const container = containerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const containerWidth = container.clientWidth || 760;

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          if (cancelled) return;
          const baseVp = page.getViewport({ scale: 1 });
          const scale = Math.min(2.0, (containerWidth - 24) / baseVp.width * 2);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = (viewport.width / 2) + "px";
          canvas.style.maxWidth = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.margin = i === 1 ? "0 auto" : "16px auto 0";
          canvas.style.borderRadius = "12px";
          canvas.style.boxShadow = "0 8px 24px -12px rgba(31,32,36,0.18)";
          canvas.style.background = "#fff";
          container.appendChild(canvas);

          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, viewport.width, viewport.height);
          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
        }
        if (!cancelled) setState("done");
      } catch (e) {
        console.error("CertModal render error", e);
        if (!cancelled) setState("error");
      }
    })();

    return () => { cancelled = true; };
  }, [cert]);

  useEffect(() => {
    if (!cert) return;
    document.body.classList.add("modal-open");
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true">
      <div className="modal-card" style={{ maxWidth: "920px" }}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          <Icon name="x" size={18} strokeWidth={1.75} />
        </button>

        <div className="flex items-start gap-4 mb-6 pr-12">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent-soft)", border: "1px solid rgba(242,165,107,0.25)" }}>
            <Icon name={cert.icon} size={24} strokeWidth={1.5} style={{ color: "var(--accent-deep, #D77A3A)" }} />
          </div>
          <div className="min-w-0 pt-1">
            <div className="text-[11px] tracking-[0.16em] uppercase font-mono mb-1.5" style={{ color: "var(--ink-3)" }}>
              Diploma · {cert.date}{cert.hours ? " · " + cert.hours : ""}
            </div>
            <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.02em] leading-[1.15]">
              {cert.title}
            </h3>
            <div className="mt-1.5 text-[13px]" style={{ color: "var(--ink-2)" }}>
              {cert.issuer}
            </div>
          </div>
        </div>

        <div
          className="rounded-[20px] relative overflow-auto"
          style={{ border: "1px solid var(--line)", background: "#F7F4EE", maxHeight: "min(70vh, 720px)", padding: "14px" }}>
          <div ref={containerRef} style={{ minHeight: state === "done" ? 0 : "320px" }} />
          {(state === "loading" || state === "idle") &&
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ color: "var(--ink-3)" }}>
            <div className="flex items-center gap-2 text-[12.5px] tracking-[0.14em] uppercase font-mono">
              <span className="cert-spinner" />
              Cargando diploma…
            </div>
          </div>
          }
          {state === "error" &&
          <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--ink-3)" }}>
            <div className="flex flex-col items-center gap-3 text-center text-[13px]" style={{ color: "var(--ink-2)" }}>
              <Icon name="alert-circle" size={20} strokeWidth={1.5} />
              <div>No se pudo previsualizar. Descarga el PDF abajo.</div>
            </div>
          </div>
          }
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {cert.tags.map((t) =>
            <span key={t} className="chip inline-flex items-center px-3 py-1 rounded-full text-[11.5px] tracking-wide font-mono">
              {t}
            </span>
            )}
          </div>
          <a
            href={cert.file}
            download
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] btn-primary"
            style={{ textDecoration: "none" }}>
            <Icon name="download" size={14} strokeWidth={1.75} />
            Descargar PDF
          </a>
        </div>
      </div>
    </div>);
}

function Skills({ tweaks, onOpenCert }) {
  return (
    <section id="skills" className="relative">
      <Blob top={80} right={-200} size={[340, 320]} color="#FFC79A" shape={3} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <Reveal className="md:col-span-3">
            <div className={`text-[11px] tracking-[0.16em] uppercase mb-3 ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
              03 — Formación
            </div>
            <h2 className="text-[28px] md:text-[36px] tracking-[-0.02em] font-medium leading-[1.1]">
              Lo que respalda<br/>lo que sé hacer.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.6]" style={{ color: "var(--ink-2)" }}>
              Diplomas que voy reuniendo a lo largo de la carrera, junto con el stack que toco a diario.
            </p>
          </Reveal>

          <div className="md:col-span-9 space-y-14">
            {/* Diplomas */}
            <div>
              <div className="flex items-baseline justify-between mb-5">
                <div className={`text-[11px] tracking-[0.14em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                  Diplomas
                </div>
                <div className={`text-[11px] tracking-[0.14em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                  - hasta la fecha
                </div>
              </div>
              <div className="space-y-3">
                {CERTS.map((c, i) =>
                <Reveal key={c.title} delay={0.05 + i * 0.08}>
                  <button
                    type="button"
                    onClick={() => onOpenCert && onOpenCert(c)}
                    className="card group rounded-[24px] p-5 md:p-6 flex items-start gap-5 md:gap-6 w-full text-left"
                    style={{ color: "inherit", textDecoration: "none", background: "var(--bg-elev)" }}>
                  
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "var(--accent-soft)", border: "1px solid rgba(242,165,107,0.25)" }}>
                    
                      <Icon name={c.icon} size={18} strokeWidth={1.5} style={{ color: "var(--accent-deep, #D77A3A)" }} />
                    </div>

                    <div className="min-w-0 flex-grow">
                      <div className="text-[15.5px] md:text-[16.5px] font-medium tracking-[-0.005em] leading-snug">
                        {c.title}
                      </div>
                      <div className={`mt-1 text-[12.5px] ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                        {c.issuer}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.tags.map((t) =>
                        <span
                          key={t}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] ${tweaks.monoCaptions ? "font-mono" : ""}`}
                          style={{
                            background: "rgba(255,255,255,0.6)",
                            border: "1px solid var(--line)",
                            color: "var(--ink-2)"
                          }}>
                          {t}
                        </span>
                        )}
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0 text-right pt-1">
                      <div className={`text-[11px] tracking-[0.14em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                        {c.date}
                      </div>
                      {c.hours &&
                      <div className="text-[12.5px]" style={{ color: "var(--ink-2)" }}>{c.hours}</div>
                      }
                      <div
                        className="mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:bg-[var(--accent-soft)]"
                        style={{ color: "var(--ink-3)" }}>
                        <Icon name="arrow-up-right" size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </button>
                </Reveal>
                )}
              </div>
            </div>

            {/* Stack habitual */}
            <div>
              <div className={`text-[11px] tracking-[0.14em] uppercase mb-5 ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
                Stack habitual
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
                {STACK.map((g, i) =>
                <Reveal key={g.group} delay={0.05 + i * 0.06}>
                  <div>
                    <div className="text-[13.5px] font-medium mb-2.5" style={{ color: "var(--ink)" }}>
                      {g.group}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((it) =>
                      <span
                        key={it}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] ${tweaks.monoCaptions ? "font-mono" : ""}`}
                        style={{
                          background: "rgba(255,255,255,0.6)",
                          border: "1px solid var(--line)",
                          color: "var(--ink-2)"
                        }}>
                        {it}
                      </span>
                      )}
                    </div>
                  </div>
                </Reveal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function Footer({ tweaks }) {
  const accent = ACCENTS[tweaks.accent];
  return (
    <footer id="contact" className="relative">
      <Blob bottom={-80} right={-200} size={[480, 440]} color="#FFB87A" shape={4} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-12">
        <Reveal>
        <div className={`text-[11px] tracking-[0.16em] uppercase mb-3 ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
          04 — Contacto
        </div>

        <h2 className="text-[36px] md:text-[64px] leading-[1.02] tracking-[-0.02em] font-medium max-w-[820px]">
          Aún estoy empezando.
          <br className="hidden md:block" /> <span style={{ color: "var(--ink-2)" }}>Si crees que podemos cruzarnos en algo, escríbeme.</span>
        </h2>

        <a
            href="mailto:hugofernandezgil17@gmail.com"
            className="inline-flex items-center gap-2 mt-8 md:mt-10 text-[18px] md:text-[20px] link-quiet"
            style={{ color: "var(--ink)" }}>
          
          Hugofernandezgil17@gmail.com
          <Icon name="arrow-up-right" size={18} strokeWidth={1.5} />
        </a>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-24 md:mt-32 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: accent.color }} />
            
            <span className={`text-[12px] tracking-[0.12em] uppercase ${tweaks.monoCaptions ? "font-mono" : ""}`} style={{ color: "var(--ink-3)" }}>
              Hugo Fernández Gil · MMXXVI
            </span>
          </div>

          <div className="flex items-center gap-1">
            {[
            { name: "github", label: "GitHub", href: "https://github.com/HugoFernandezz" },
            { name: "mail", label: "Correo", href: "mailto:hugofernandezgil17@gmail.com" }].
            map((l) =>
            <a
              key={l.label}
              href={l.href}
              target={l.name === "github" ? "_blank" : undefined}
              rel={l.name === "github" ? "noopener noreferrer" : undefined}
              aria-label={l.label}
              className="w-11 h-11 rounded-full inline-flex items-center justify-center transition-colors"
              style={{ color: "var(--ink-3)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--ink-3)"}>
              
                <Icon name={l.name} size={18} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>);

}

/* ──────────────────────────────────────────────────────────────────
   Tweaks panel
   ────────────────────────────────────────────────────────────────── */
function TweaksUI({ tweaks, setTweak }) {
  const TP = window.TweaksPanel;
  const TS = window.TweakSection;
  const TC = window.TweakColor;
  const TR = window.TweakRadio;
  const TT = window.TweakToggle;
  const TSel = window.TweakSelect;
  if (!TP) return null;

  return (
    <TP title="Tweaks">
      <TS label="Titular del hero">
        <TSel
          value={tweaks.headline}
          options={[
          { value: "machines", label: "Investigo cómo piensan las máquinas" },
          { value: "researcher", label: "Ingeniero con mentalidad de investigador" },
          { value: "systems", label: "Sistemas que aprenden. Código que dura" },
          { value: "craft", label: "Donde la investigación se vuelve software" }]
          }
          onChange={(v) => setTweak("headline", v)} />
      </TS>
      <TS label="Disposición de proyectos">
        <TSel
          value={tweaks.projectsLayout}
          options={[
            { value: "grid",     label: "Cuadrícula clásica (3 columnas)" },
            { value: "carousel", label: "Carrusel con scroll horizontal" },
            { value: "mosaic",   label: "Mosaico (1 destacado + resto)" },
            { value: "list",     label: "Lista horizontal" },
          ]}
          onChange={(v) => setTweak("projectsLayout", v)} />
      </TS>
      <TS label="Acento">
        <TC
          value={ACCENTS[tweaks.accent].color}
          options={Object.values(ACCENTS).map((a) => a.color)}
          onChange={(c) => {
            const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].color === c);
            if (key) setTweak("accent", key);
          }} />
        
      </TS>
      <TS label="Densidad">
        <TR
          value={tweaks.density}
          options={[
          { value: "compact", label: "Compacta" },
          { value: "comfortable", label: "Cómoda" }]
          }
          onChange={(v) => setTweak("density", v)} />
        
      </TS>
      <TS label="Disponibilidad">
        <TT
          value={tweaks.showAvailability}
          onChange={(v) => setTweak("showAvailability", v)} />
        
      </TS>
      <TS label="Captions en mono">
        <TT
          value={tweaks.monoCaptions}
          onChange={(v) => setTweak("monoCaptions", v)} />
        
      </TS>

      <TS label="Movimiento">
        <TT
          value={tweaks.motion}
          onChange={(v) => setTweak("motion", v)} />
      </TS>
      <TS label="Velocidad">
        <TR
          value={tweaks.motionSpeed}
          options={[
          { value: "slow", label: "Lenta" },
          { value: "normal", label: "Normal" },
          { value: "fast", label: "Rápida" }]
          }
          onChange={(v) => setTweak("motionSpeed", v)} />
      </TS>
      <TS label="Manchas flotan">
        <TT
          value={tweaks.blobFloat}
          onChange={(v) => setTweak("blobFloat", v)} />
      </TS>
      <TS label="Parallax al scrollear">
        <TT
          value={tweaks.parallax}
          onChange={(v) => setTweak("parallax", v)} />
      </TS>
      <TS label="Reacción al ratón">
        <TT
          value={tweaks.mouseReact}
          onChange={(v) => setTweak("mouseReact", v)} />
      </TS>
      <TS label="Aparición al hacer scroll">
        <TT
          value={tweaks.scrollReveal}
          onChange={(v) => setTweak("scrollReveal", v)} />
      </TS>
    </TP>);

}

/* ──────────────────────────────────────────────────────────────────
   App
   ────────────────────────────────────────────────────────────────── */
function App() {
  const useTweaks = window.useTweaks;
  const [tweaks, setTweak] = useTweaks ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [openProject, setOpenProject] = useState(null);
  const [openCert, setOpenCert] = useState(null);

  // Push accent vars to :root
  useEffect(() => {
    const a = ACCENTS[tweaks.accent] || ACCENTS.sage;
    document.documentElement.style.setProperty("--accent", a.color);
    document.documentElement.style.setProperty("--accent-soft", a.soft);
  }, [tweaks.accent]);

  // Smooth in-page anchor scroll — rápido pero con easing orgánico
  useEffect(() => {
    const onClick = (e) => {
      // Solo intercepta clicks "normales" sobre <a href="#...">
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = href === "#top" ? document.documentElement : document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const startY = window.scrollY || window.pageYOffset;
      const targetY = href === "#top"
        ? 0
        : target.getBoundingClientRect().top + startY - 8; // pequeño respiro arriba
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;

      // Duración proporcional a la distancia, acotada. Rápido pero no instantáneo.
      const duration = Math.min(900, Math.max(420, Math.abs(distance) * 0.45));
      const startT = performance.now();
      // ease-out cubic — entra rápido y se asienta
      const ease = (t) => 1 - Math.pow(1 - t, 3);

      const step = (now) => {
        const p = Math.min(1, (now - startT) / duration);
        window.scrollTo(0, startY + distance * ease(p));
        if (p < 1) requestAnimationFrame(step);
        else if (history.replaceState) history.replaceState(null, "", href);
      };
      requestAnimationFrame(step);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const dense = tweaks.density === "compact";

  return (
    <MotionProvider tweaks={tweaks}>
      <div className={dense ? "density-compact" : "density-comfortable"}>
        <TopNav accent={tweaks.accent} />
        <Hero tweaks={tweaks} />
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10"><div className="rule" /></div>
        <About tweaks={tweaks} />
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10"><div className="rule" /></div>
        <Projects tweaks={tweaks} onOpen={setOpenProject} />
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10"><div className="rule" /></div>
        <Skills tweaks={tweaks} onOpenCert={setOpenCert} />
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 relative z-10"><div className="rule" /></div>
        <Footer tweaks={tweaks} />
        <TweaksUI tweaks={tweaks} setTweak={setTweak} />
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        <CertModal cert={openCert} onClose={() => setOpenCert(null)} />
      </div>
    </MotionProvider>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);