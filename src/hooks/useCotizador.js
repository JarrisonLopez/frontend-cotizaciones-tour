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

  const totalPax = useMemo(() => {
    return Number(form.adultos || 0) + Number(form.ninos || 0);
  }, [form.adultos, form.ninos]);

  const puedeIncluirStaff = useMemo(() => {
    return totalPax >= 4;
  }, [totalPax]);

  function updateField(name, value) {
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      const nuevoTotalPax =
        Number(updated.adultos || 0) + Number(updated.ninos || 0);

      if (nuevoTotalPax < 4) {
        updated.incluirTourLider = false;
        updated.incluirStaff = false;
      }

      return updated;
    });
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
      const payload = {
        ...form,
        margen: 0.25,
        incluirComision: true,
      };

      const data = await cotizarTour(payload);
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
      const payload = {
        ...form,
        margen: 0.25,
        incluirComision: true,
      };

      const blob = await descargarCotizacionPDF(payload);
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
    totalPax,
    puedeIncluirStaff,
    updateField,
    updateNested,
    aplicarPaquete,
    limpiar,
    cotizar,
    descargarPDF,
  };
}