import { useMemo, useState } from "react";
import {
  Download,
  Calculator,
  RefreshCcw,
  Plane,
  BedDouble,
  Utensils,
  Map,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { API_URL } from "./config";

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

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

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const noches = useMemo(() => {
    return Math.max(Number(form.dias || 0) - 1, 0);
  }, [form.dias]);

  function updateField(name, value) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function updateNested(group, key, checked) {
    setForm((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: checked,
      },
    }));
  }

  function aplicarPaquete() {
    const seleccionadas = paquetesPorNoches[noches] || [];

    const nuevaSeleccion = actividades.reduce((acc, item) => {
      acc[item.key] = seleccionadas.includes(item.key);
      return acc;
    }, {});

    setForm((prev) => ({
      ...prev,
      actividades: nuevaSeleccion,
    }));
  }

  function limpiar() {
    setResultado(null);
    setError("");
    setForm(initialForm);
  }

  async function cotizar() {
    setLoading(true);
    setError("");
    setResultado(null);

    try {
      const response = await fetch(`${API_URL}/api/cotizar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo calcular la cotización");
      }

      console.log("RESPUESTA BACKEND:", data);
      setResultado(data);
    } catch (err) {
      setError(err.message || "Error conectando con el backend");
    } finally {
      setLoading(false);
    }
  }

  async function descargarPDF() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/cotizar/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("No se pudo generar el PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `cotizacion-colombia-inspira-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Error descargando PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">Colombia Inspira</p>
          <h1>Cotizador de tours</h1>
          <p className="subtitle">
            Selecciona participantes, días, transporte, hospedaje, alimentación
            y actividades. El sistema calcula el precio y permite descargar PDF.
          </p>
        </div>

        <div className="hero-card">
          <span>Días</span>
          <strong>{form.dias}</strong>
          <small>{noches} noche(s)</small>
        </div>
      </section>

      <section className="grid">
        <div className="panel">
          <h2>
            <Calculator size={20} /> Datos básicos
          </h2>

          <div className="form-grid">
            <label>
              Adultos
              <input
                type="number"
                min="0"
                value={form.adultos}
                onChange={(e) =>
                  updateField("adultos", Number(e.target.value))
                }
              />
            </label>

            <label>
              Niños 5 a 12 años
              <input
                type="number"
                min="0"
                value={form.ninos}
                onChange={(e) =>
                  updateField("ninos", Number(e.target.value))
                }
              />
            </label>

            <label>
              Días
              <input
                type="number"
                min="1"
                value={form.dias}
                onChange={(e) => updateField("dias", Number(e.target.value))}
              />
            </label>

            <label>
              Margen objetivo
              <select
                value={form.margen}
                onChange={(e) =>
                  updateField("margen", Number(e.target.value))
                }
              >
                <option value={0.25}>25%</option>
                <option value={0.3}>30%</option>
                <option value={0.35}>35%</option>
                <option value={0.4}>40%</option>
                <option value={0.45}>45%</option>
              </select>
            </label>
          </div>
        </div>

        <div className="panel">
          <h2>
            <BedDouble size={20} /> Hospedaje
          </h2>

          <div className="form-grid">
            <label>
              Adultos
              <select
                value={form.hospedajeAdulto}
                onChange={(e) =>
                  updateField("hospedajeAdulto", e.target.value)
                }
              >
                {hospedajes.map((h) => (
                  <option key={h.value} value={h.value}>
                    {h.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Niños
              <select
                value={form.hospedajeNino}
                onChange={(e) =>
                  updateField("hospedajeNino", e.target.value)
                }
              >
                {hospedajes.map((h) => (
                  <option key={h.value} value={h.value}>
                    {h.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.incluirAlimentacion}
              onChange={(e) =>
                updateField("incluirAlimentacion", e.target.checked)
              }
            />
            <Utensils size={18} /> Incluir alimentación completa
          </label>
        </div>

        <div className="panel">
          <h2>
            <Plane size={20} /> Transporte
          </h2>

          <div className="check-grid">
            {transportes.map((item) => (
              <label className="check-card" key={item.key}>
                <input
                  type="checkbox"
                  checked={form.transporte[item.key]}
                  onChange={(e) =>
                    updateNested("transporte", item.key, e.target.checked)
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title-row">
            <h2>
              <Map size={20} /> Actividades
            </h2>

            <button className="ghost" type="button" onClick={aplicarPaquete}>
              Paquete por noches
            </button>
          </div>

          <div className="check-grid">
            {actividades.map((item) => (
              <label className="check-card" key={item.key}>
                <input
                  type="checkbox"
                  checked={form.actividades[item.key]}
                  onChange={(e) =>
                    updateNested("actividades", item.key, e.target.checked)
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Varios</h2>

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.incluirTourLider}
              onChange={(e) =>
                updateField("incluirTourLider", e.target.checked)
              }
            />
            Incluir tour líder
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.incluirHonorariosStaff}
              onChange={(e) =>
                updateField("incluirHonorariosStaff", e.target.checked)
              }
            />
            Incluir honorarios staff
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={form.incluirComision}
              onChange={(e) =>
                updateField("incluirComision", e.target.checked)
              }
            />
            Incluir comisión de venta 2%
          </label>
        </div>

        <div className="panel actions-panel">
          <button className="primary" onClick={cotizar} disabled={loading}>
            {loading ? "Procesando..." : "Calcular cotización"}
          </button>

          <button className="secondary" onClick={descargarPDF} disabled={loading}>
            <Download size={18} /> Descargar PDF
          </button>

          <button className="ghost wide" onClick={limpiar}>
            <RefreshCcw size={18} /> Limpiar
          </button>

          {error && <p className="error">{error}</p>}
        </div>
      </section>

      {resultado && (
        <section className="resultado">
          <div className="result-header">
            <h2>Resultado de la cotización</h2>

            <div
              className={resultado.totals?.viable ? "status ok" : "status bad"}
            >
              {resultado.totals?.viable ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertTriangle size={18} />
              )}

              {resultado.totals?.viable ? "Viable" : "Revisar viabilidad"}
            </div>
          </div>

          <div className="cards">
            <div>
              <span>Costo total</span>
              <strong>
                {currency.format(resultado.totals?.costoTotal || 0)}
              </strong>
            </div>

            <div>
              <span>Precio venta total</span>
              <strong>
                {currency.format(resultado.totals?.precioVentaTotal || 0)}
              </strong>
            </div>

            <div>
              <span>Precio por persona</span>
              <strong>
                {currency.format(resultado.totals?.precioVentaPersona || 0)}
              </strong>
            </div>

            <div>
              <span>Punto equilibrio</span>
              <strong>
                {resultado.totals?.puntoEquilibrio ?? "N/A"} pax
              </strong>
            </div>
          </div>

          <div className="financial-summary">
            <div className="summary-card">
              <span>Subtotal</span>
              <strong>
                {currency.format(resultado.totals?.subtotal || 0)}
              </strong>
            </div>

            <div className="summary-card">
              <span>Comisión</span>
              <strong>
                {currency.format(resultado.totals?.comision || 0)}
              </strong>
            </div>

            <div className="summary-card">
              <span>Costos variables</span>
              <strong>
                {currency.format(resultado.totals?.costosVariables || 0)}
              </strong>
            </div>

            <div className="summary-card">
              <span>Costos fijos</span>
              <strong>
                {currency.format(resultado.totals?.costosFijos || 0)}
              </strong>
            </div>

            <div className="summary-card">
              <span>Utilidad operativa</span>
              <strong>
                {currency.format(resultado.totals?.utilidadOperativa || 0)}
              </strong>
            </div>

            <div className="summary-card">
              <span>MC Unitario</span>
              <strong>
                {currency.format(
                  resultado.totals?.margenContribucionUnitario || 0
                )}
              </strong>
            </div>
          </div>

          <div className="messages">
            <p className="note">{resultado.messages?.viabilidad}</p>
            <p className="note">{resultado.messages?.margen}</p>
          </div>

          {Array.isArray(resultado.detail) && resultado.detail.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Item</th>
                    <th>Valor unitario</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {resultado.detail.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.category}</td>
                      <td>{item.item}</td>
                      <td>{currency.format(item.unitPrice || 0)}</td>
                      <td>{item.quantity ?? "-"}</td>
                      <td>{currency.format(item.total || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </main>
  );
}