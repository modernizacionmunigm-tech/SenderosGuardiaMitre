/**
 * Funciones principales para la plataforma de senderos de Guardia Mitre
 * Mobile-first y optimizado para QR
 */

// Configuración global
const CONFIG = {
    // Opción B (simple): Google Form escribe en Sheet; el sitio lee CSV publicado
    // Ejemplo CSV publicado:
    // https://docs.google.com/spreadsheets/d/e/<SHEET_PUBLISHED_ID>/pub?gid=0&single=true&output=csv
    GOOGLE_SHEETS_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwrJ2oWFuHV3HvqmX304q75q_T_7babaMlA6Crgfazai0awP9tP1WDUj9DAT0ukOq1U6bzxwAN6qXA/pub?gid=391867222&single=true&output=csv',
    GOOGLE_FORMS_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSfzRfc2f-i8xmBMGfVbhDz4Nnxlt5hOfpK3Y4p3AE8D_iw0Pw/viewform',
    MUNI_WEB_URL: 'https://guardiamitre.gob.ar',
    MAP_CENTER: [-40.4221, -63.6695], // Centrado en las coordenadas reales del sendero
    MAP_ZOOM: 15,
    SENDEROS: [
        {
            id: 'monte-mitre-baja',
            nombre: 'Monte Mitre (Baja dificultad)',
            distancia: 1.58,
            dificultad: 'baja',
            tiempoEstimado: 12,
            descripcion: 'Recorrido de baja dificultad del proyecto Monte Mitre. Ideal para principiantes, familias o un paseo rápido. Apto para trekking y bicicleta.',
            coordenadas: [],
            checkpoints: [
                { nombre: 'Inicio', lat: -40.4242, lng: -63.6655 },
                { nombre: 'Punto de Retorno', lat: -40.4182, lng: -63.6709 }
            ]
        },
        {
            id: 'monte-mitre-alta',
            nombre: 'Monte Mitre (Alta dificultad)',
            distancia: 2.8,
            dificultad: 'alta',
            tiempoEstimado: 19,
            descripcion: 'Recorrido de alta dificultad del proyecto Monte Mitre. Exigente y con terrenos variados. Apto para trekking y bicicleta.',
            coordenadas: [
                [-40.4242735, -63.6655044], [-40.4239958, -63.6657726], [-40.4238406, -63.6656761], [-40.4236773, -63.6653113],
                [-40.4235711, -63.6649251], [-40.4235139, -63.6648178], [-40.4232362, -63.6650109], [-40.4228197, -63.6652147],
                [-40.4226727, -63.6654722], [-40.4224358, -63.6656654], [-40.4221418, -63.6657619], [-40.4221173, -63.6659765],
                [-40.4217824, -63.6663949], [-40.4215374, -63.6662554], [-40.421178, -63.6666309], [-40.4208676, -63.6670065],
                [-40.4205245, -63.667382], [-40.4203612, -63.6679184], [-40.4202264, -63.6680901], [-40.4200365, -63.6681437],
                [-40.4199589, -63.6683395], [-40.4197976, -63.6684334], [-40.4196955, -63.66853], [-40.4195423, -63.6686721],
                [-40.4194668, -63.668707], [-40.4193014, -63.6688786], [-40.4191115, -63.6690235], [-40.4189073, -63.6691174],
                [-40.4187929, -63.669163], [-40.4186316, -63.669222], [-40.4184968, -63.6693614], [-40.4183478, -63.6694473],
                [-40.4181599, -63.6696109], [-40.4180864, -63.6697799], [-40.4182477, -63.6702466], [-40.4182804, -63.6703565],
                [-40.4182191, -63.670716], [-40.4182722, -63.6709949], [-40.4184825, -63.6709922], [-40.4185132, -63.6713141],
                [-40.4182906, -63.6714992], [-40.4181864, -63.6716064], [-40.4182742, -63.6725479], [-40.4185397, -63.6726766],
                [-40.418844, -63.6730119], [-40.4190441, -63.6733365], [-40.4193606, -63.6734464], [-40.419477, -63.6732587],
                [-40.4196587, -63.6730495], [-40.4199528, -63.6731004], [-40.4201652, -63.6731997], [-40.4202428, -63.6731997],
                [-40.4203265, -63.6730146], [-40.4203408, -63.6728966], [-40.4205858, -63.6728], [-40.4206624, -63.6727786],
                [-40.4206981, -63.6726391], [-40.4206471, -63.6725104], [-40.4204715, -63.6723119], [-40.4203612, -63.672049],
                [-40.420366, -63.6718939], [-40.4204984, -63.6717763], [-40.4206148, -63.6716046], [-40.4208108, -63.6714651],
                [-40.4209538, -63.6713364], [-40.4210109, -63.6710521], [-40.4209374, -63.6708643], [-40.4208598, -63.6705961],
                [-40.4207986, -63.6703171], [-40.4207822, -63.6701187], [-40.4208741, -63.6699846], [-40.4210518, -63.6698799],
                [-40.4213091, -63.6697458], [-40.4214357, -63.6697056], [-40.4215418, -63.6696573], [-40.4216664, -63.6694857],
                [-40.4219849, -63.6695152], [-40.422181, -63.6694481], [-40.4223198, -63.6695259], [-40.422428, -63.6697136],
                [-40.4224873, -63.6697995], [-40.4225914, -63.6697727], [-40.422718, -63.6696573], [-40.422818, -63.6695071],
                [-40.4229181, -63.6692684], [-40.4229487, -63.6691504], [-40.4230222, -63.6689787], [-40.4230815, -63.6687883],
                [-40.4232203, -63.6685898], [-40.4233796, -63.6683833], [-40.4235307, -63.6683243], [-40.4236164, -63.668335],
                [-40.4237328, -63.6685496], [-40.4238696, -63.6687159], [-40.4239881, -63.6688124], [-40.423986, -63.6686247],
                [-40.4240371, -63.668394], [-40.4241004, -63.6682358], [-40.4241494, -63.6681338], [-40.4242984, -63.6681231],
                [-40.4244107, -63.668056], [-40.4244659, -63.6677986], [-40.4243515, -63.6669402], [-40.42428, -63.6664628],
                [-40.4243699, -63.6658271], [-40.4243372, -63.6656179], [-40.4243025, -63.665516]
            ],
            checkpoints: [
                { nombre: 'La subida al cielo', lat: -40.4221, lng: -63.6657 },
                { nombre: 'El desierto desesperante', lat: -40.4205, lng: -63.6673 },
                { nombre: 'El cañón de la tortura', lat: -40.4182, lng: -63.6703 },
                { nombre: 'No te preocupes no es tan dificil', lat: -40.4188, lng: -63.6730 },
                { nombre: 'La quebrada oscura', lat: -40.4206, lng: -63.6727 },
                { nombre: 'El salto al vacío', lat: -40.4215, lng: -63.6696 },
                { nombre: 'El empuje final', lat: -40.4243, lng: -63.6664 }
            ]
        }
    ]
};

/**
 * CSV (Google Sheets publicado) -> objetos
 * Nota: Google Sheets exporta CSV con comillas; este parser soporta comillas dobles y saltos de línea.
 */
function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i + 1];

        if (inQuotes) {
            if (c === '"' && next === '"') {
                field += '"';
                i++;
                continue;
            }
            if (c === '"') {
                inQuotes = false;
                continue;
            }
            field += c;
            continue;
        }

        if (c === '"') {
            inQuotes = true;
            continue;
        }

        if (c === ',') {
            row.push(field);
            field = '';
            continue;
        }

        if (c === '\r') {
            continue;
        }

        if (c === '\n') {
            row.push(field);
            field = '';
            if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
                rows.push(row);
            }
            row = [];
            continue;
        }

        field += c;
    }

    row.push(field);
    if (row.length > 1 || (row.length === 1 && row[0] !== '')) {
        rows.push(row);
    }

    return rows;
}

function normalizeHeader(h) {
    return String(h || '')
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function pickColumnIndex(headers, candidates) {
    const normalized = headers.map(normalizeHeader);
    for (const cand of candidates) {
        const idx = normalized.indexOf(normalizeHeader(cand));
        if (idx !== -1) return idx;
    }
    return -1;
}

function parseTiempoToMinutes(value) {
    const v = String(value || '').trim();
    if (!v) return null;
    const n = Number(v.replace(',', '.'));
    if (!Number.isFinite(n) || n <= 0) return null;
    return Math.round(n);
}

function parseDateIso(value) {
    const v = String(value || '').trim();
    if (!v) return null;
    // Si ya viene YYYY-MM-DD lo devolvemos.
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    // Intentar parsear (Google Forms suele exportar timestamp + fecha separada según form)
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) {
        return d.toISOString().slice(0, 10);
    }
    return null;
}

/** Texto del Form de Google -> id interno usado en ranking/tiempos */
function normalizeSenderoFromSheet(raw) {
    const s = String(raw || '').trim();
    if (!s) return '';
    const lower = s.toLowerCase();
    if (lower.includes('dificultad baja') || s === 'monte-mitre-baja') return 'monte-mitre-baja';
    if (lower.includes('dificultad alta') || s === 'monte-mitre-alta') return 'monte-mitre-alta';
    return s;
}

/**
 * Lee tiempos desde una Google Sheet publicada como CSV.
 * Requiere que la hoja tenga columnas con encabezados compatibles:
 * - nombre: "Nombre" / "Nombre o apodo"
 * - sendero: "Sendero" / "Sendero realizado"
 * - tiempo: "Tiempo" / "Tiempo (minutos)" / "Tiempo total (minutos)"
 * - fecha: "Fecha" / "Fecha del recorrido" (opcional)
 */
const SheetsCsv = {
    async getTiempos() {
        if (!CONFIG.GOOGLE_SHEETS_CSV_URL) {
            return [];
        }

        const res = await fetch(CONFIG.GOOGLE_SHEETS_CSV_URL, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`No se pudo leer el CSV (${res.status})`);
        }
        const text = await res.text();
        const rows = parseCsv(text);
        if (rows.length < 2) return [];

        const headers = rows[0];
        const idxNombre = pickColumnIndex(headers, ['nombre', 'nombre o apodo', 'tu nombre o apodo']);
        const idxSendero = pickColumnIndex(headers, ['sendero', 'sendero realizado']);
        const idxTiempo = pickColumnIndex(headers, [
            'tiempo',
            'tiempo (minutos)',
            'tiempo total (minutos)',
            'tiempo total',
            'tiempo total (minutos) numero',
            'tiempo total (minutos) número'
        ]);
        const idxFecha = pickColumnIndex(headers, ['fecha', 'fecha del recorrido']);
        const idxTimestamp = pickColumnIndex(headers, ['timestamp', 'marca temporal']);

        const tiempos = [];
        for (let r = 1; r < rows.length; r++) {
            const row = rows[r];
            const nombre = (row[idxNombre] || '').trim();
            const sendero = (row[idxSendero] || '').trim();
            const tiempo = parseTiempoToMinutes(row[idxTiempo]);
            const fecha = idxFecha !== -1 ? parseDateIso(row[idxFecha]) : null;
            const timestamp = idxTimestamp !== -1 ? row[idxTimestamp] : null;

            if (!nombre || !sendero || tiempo == null) continue;
            const senderoId = normalizeSenderoFromSheet(sendero);
            tiempos.push({
                id: `${r}-${timestamp || ''}`.trim(),
                nombre,
                sendero: senderoId,
                tiempo,
                fecha: fecha || null
            });
        }

        return tiempos.sort((a, b) => a.tiempo - b.tiempo);
    }
};

/**
 * Utilidades generales
 */
const Utils = {
    // Detectar si es dispositivo móvil
    isMobile: function() {
        return window.innerWidth <= 768;
    },

    // Mostrar notificaciones toast
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-fadeIn`;
        
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            info: 'bg-blue-500 text-white'
        };
        
        toast.className += ` ${colors[type] || colors.info}`;
        toast.innerHTML = `
            <div class="flex items-center">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    },

    // Obtener clima actual
    getWeather: async function() {
        const [lat, lng] = CONFIG.MAP_CENTER;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al obtener clima');
            const data = await response.json();
            return data.current_weather;
        } catch (error) {
            console.error('Error clima:', error);
            return null;
        }
    },

    // Formatear tiempo
    formatTime: function(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
        }
    },

    // Formatear distancia
    formatDistance: function(km) {
        if (km < 1) {
            return `${Math.round(km * 1000)}m`;
        } else {
            return `${km.toFixed(1)}km`;
        }
    },

    // Obtener fecha actual en formato YYYY-MM-DD
    getCurrentDate: function() {
        return new Date().toISOString().split('T')[0];
    },

    // Generar ID único
    generateId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

/**
 * Gestión de datos locales (Cache)
 */
const LocalData = {
    // Guardar en localStorage
    save: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            return false;
        }
    },

    // Obtener de localStorage
    get: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return null;
        }
    },

    // Eliminar de localStorage
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
            return false;
        }
    }
};

/**
 * Funciones de mapa (placeholder para integración con Leaflet)
 */
const Mapa = {
    // Inicializar mapa
    init: function(mapId, options = {}) {
        // Esta función se implementará en mapa/index.html con Leaflet
        console.log('Inicializando mapa en:', mapId, 'con opciones:', options);
    },

    // Agregar marcador
    addMarker: function(lat, lng, popupContent, options = {}) {
        // Esta función se implementará en mapa/index.html con Leaflet
        console.log('Agregando marcador en:', lat, lng, 'con popup:', popupContent);
    },

    // Dibujar sendero
    drawSendero: function(coordinates, options = {}) {
        // Esta función se implementará en mapa/index.html con Leaflet
        console.log('Dibujando sendero con coordenadas:', coordinates);
    }
};

/**
 * Funciones de QR y compartir
 */
const QR = {
    // Generar código QR (placeholder)
    generate: function(text) {
        console.log('Generando QR para:', text);
        // En producción usar librería como qrcode.js
        return 'qr-placeholder.png';
    },

    // Compartir en redes sociales
    share: function(platform, data) {
        const urls = {
            whatsapp: `https://wa.me/?text=${encodeURIComponent(data.text)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.text)}&url=${encodeURIComponent(data.url)}`
        };
        
        if (urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
        }
    }
};

/**
 * Funciones de flora y fauna
 */
const FloraFauna = {
    // Datos de ejemplo - en producción vendrían de Google Sheets o API
    getEspecies: function() {
        return [
            {
                id: 1,
                nombreComun: 'Arrayán',
                nombreCientifico: 'Luma apiculata',
                tipo: 'flora',
                descripcion: 'Árbol nativo de la región patagónica con flores blancas aromáticas.',
                esNativa: true,
                imagen: '🌳',
                estacion: 'Primavera-Verano'
            },
            {
                id: 2,
                nombreComun: 'Cóndor Andino',
                nombreCientifico: 'Vultur gryphus',
                tipo: 'fauna',
                descripcion: 'Ave rapaz emblemática de los Andes, en peligro de extinción.',
                esNativa: true,
                imagen: '🦅',
                estacion: 'Todo el año'
            },
            {
                id: 3,
                nombreComun: 'Chilco',
                nombreCientifico: 'Fuchsia magellanica',
                tipo: 'flora',
                descripcion: 'Arbusto con flores colgantes de color rojo intenso.',
                esNativa: true,
                imagen: '🌺',
                estacion: 'Verano-Otoño'
            },
            {
                id: 4,
                nombreComun: 'Zorro Gris',
                nombreCientifico: 'Lycalopex griseus',
                tipo: 'fauna',
                descripcion: 'Mamífero carnívoro de tamaño mediano, muy adaptable.',
                esNativa: true,
                imagen: '🦊',
                estacion: 'Todo el año'
            }
        ];
    },

    // Buscar especies
    searchEspecies: function(query) {
        const especies = this.getEspecies();
        const q = query.toLowerCase();
        
        return especies.filter(e => 
            e.nombreComun.toLowerCase().includes(q) ||
            e.nombreCientifico.toLowerCase().includes(q) ||
            e.descripcion.toLowerCase().includes(q)
        );
    },

    // Obtener especie por ID
    getEspecieById: function(id) {
        const especies = this.getEspecies();
        return especies.find(e => e.id === parseInt(id));
    }
};

/**
 * Rutas normalizadas para marcar el ítem activo del menú
 */
function normalizePathname(pathname) {
    let p = pathname.replace(/\/$/, '') || '/';
    if (p.endsWith('/index.html')) {
        p = p.slice(0, -'/index.html'.length) || '/';
    } else if (/index\.html$/i.test(p)) {
        p = p.replace(/\/?index\.html$/i, '') || '/';
    }
    return p;
}

function initNavActiveLink() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const current = normalizePathname(new URL(window.location.href).pathname);
    nav.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        let resolved;
        try {
            resolved = normalizePathname(new URL(href, window.location.href).pathname);
        } catch (e) {
            return;
        }
        if (resolved === current) {
            link.classList.add('active');
        }
    });
}

/**
 * Menú hamburguesa responsive (header unificado)
 */
function initSiteHeader() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    const iconOpen = toggle.querySelector('.menu-icon-open');
    const iconClose = toggle.querySelector('.menu-icon-close');

    function isDesktop() {
        return window.matchMedia('(min-width: 1024px)').matches;
    }

    function syncIcons(openMobile) {
        if (!iconOpen || !iconClose) return;
        if (openMobile) {
            iconOpen.classList.add('hidden');
            iconClose.classList.remove('hidden');
        } else {
            iconOpen.classList.remove('hidden');
            iconClose.classList.add('hidden');
        }
    }

    function applyLayout() {
        if (isDesktop()) {
            nav.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            syncIcons(false);
        } else {
            nav.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            syncIcons(false);
        }
    }

    toggle.addEventListener('click', function() {
        if (isDesktop()) return;
        const willOpen = nav.classList.contains('hidden');
        nav.classList.toggle('hidden', !willOpen);
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        syncIcons(willOpen);
    });

    nav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() {
            if (!isDesktop()) {
                nav.classList.add('hidden');
                toggle.setAttribute('aria-expanded', 'false');
                syncIcons(false);
            }
        });
    });

    window.addEventListener('resize', applyLayout);
    applyLayout();
}

/**
 * Inicialización general
 */
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador de visitas
    const visitas = LocalData.get('visitas') || 0;
    LocalData.save('visitas', visitas + 1);

    initSiteHeader();
    initNavActiveLink();
    
    // Agregar clase de animación a elementos
    const animatedElements = document.querySelectorAll('.card, .btn, .sendero-card');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.classList.add('animate-fadeIn');
    });
    
    console.log('Senderos Guardia Mitre - Plataforma iniciada');
    
    // Registro de Service Worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registrado con éxito:', registration.scope);
                })
                .catch(error => {
                    console.log('Fallo en el registro del Service Worker:', error);
                });
        });
    }
});

// Exportar funciones globales
window.SenderosApp = {
    Utils,
    LocalData,
    SheetsCsv,
    Mapa,
    QR,
    FloraFauna,
    CONFIG
};