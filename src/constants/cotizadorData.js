const hospedajes = [
  { value: "sencilla", label: "Habitación sencilla" },
  { value: "doble", label: "Habitación doble" },
  { value: "triple", label: "Habitación triple" },
  { value: "cuadruple", label: "Habitación cuádruple" },
  { value: "hamaca", label: "Hamaca" },
  { value: "camping", label: "Camping" },
];

const transportes = [
  { key: "tiquetesStaff", label: "Tiquetes staff" },
  { key: "comida", label: "Comida staff" },
  { key: "taxisAeropuerto", label: "Taxis aeropuerto" },
  { key: "camioneta4x4", label: "Camionetas 4x4" },
];

const actividades = [
  { key: "safariDiaCompleto", label: "Safari Jeep día completo" },
  { key: "safariMedioDia", label: "Safari Jeep medio día" },
  { key: "cabalgata", label: "Cabalgata" },
  { key: "amanecer", label: "Amanecer" },
  { key: "avistamientoRio", label: "Avistamiento río" },
  { key: "caminataDiurna", label: "Caminata diurna" },
  { key: "caminataNocturna", label: "Caminata nocturna" },
];

const paquetesPorNoches = {
  5: [
    "safariDiaCompleto",
    "cabalgata",
    "amanecer",
    "avistamientoRio",
    "caminataDiurna",
    "caminataNocturna",
  ],

  4: [
    "safariDiaCompleto",
    "cabalgata",
    "amanecer",
    "avistamientoRio",
    "caminataDiurna",
  ],

  3: [
    "safariDiaCompleto",
    "cabalgata",
    "avistamientoRio",
    "caminataDiurna",
  ],

  2: [
    "safariDiaCompleto",
    "cabalgata",
    "avistamientoRio",
    "caminataDiurna",
  ],
};

function emptyFlags(items) {
  return items.reduce((acc, item) => {
    acc[item.key] = false;
    return acc;
  }, {});
}

const initialForm = {
  adultos: 2,
  ninos: 0,
  dias: 3,

  hospedajeAdulto: "doble",
  hospedajeNino: "doble",

  incluirAlimentacion: true,

  margen: 0.35,

  incluirTourLider: false,
  incluirHonorariosStaff: false,
  incluirComision: true,

  transporte: emptyFlags(transportes),
  actividades: emptyFlags(actividades),
};

export {
  hospedajes,
  transportes,
  actividades,
  paquetesPorNoches,
  initialForm,
  emptyFlags,
};