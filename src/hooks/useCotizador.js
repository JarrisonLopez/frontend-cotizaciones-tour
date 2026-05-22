import { useMemo, useState } from "react";
import {
  actividades,
  initialForm,
  paquetesPorNoches,
} from "../constants/cotizadorData";
import {
  cotizarTour,
  descargarCotizacionPDF,
} from "../api/cotizadorApi";

export function useCotizador() {
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
      const data = await cotizarTour(form);
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
      const blob = await descargarCotizacionPDF(form);
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

  return {
    form,
    resultado,
    loading,
    error,
    noches,
    updateField,
    updateNested,
    aplicarPaquete,
    limpiar,
    cotizar,
    descargarPDF,
  };
}