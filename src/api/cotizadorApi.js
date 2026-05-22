import { API_URL } from "../config";

export async function cotizarTour(formulario) {
  const response = await fetch(`${API_URL}/api/cotizar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formulario),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "No se pudo calcular la cotización");
  }

  return data;
}

export async function descargarCotizacionPDF(formulario) {
  const response = await fetch(`${API_URL}/api/cotizar/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formulario),
  });

  if (!response.ok) {
    throw new Error("No se pudo generar el PDF");
  }

  return await response.blob();
}