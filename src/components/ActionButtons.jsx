import React from "react";

import { Download, RefreshCcw } from "lucide-react";
import Panel from "./Panel";

export default function ActionButtons({
  loading,
  error,
  cotizar,
  descargarPDF,
  limpiar,
}) {
  return (
    <Panel className="actions-panel">
      <button className="primary" onClick={cotizar} disabled={loading}>
        {loading ? "Procesando..." : "Calcular cotización"}
      </button>

      <button className="secondary" onClick={descargarPDF} disabled={loading}>
        <Download size={18} />
        Descargar PDF
      </button>

      <button className="ghost wide" onClick={limpiar}>
        <RefreshCcw size={18} />
        Limpiar
      </button>

      {error && <p className="error">{error}</p>}
    </Panel>
  );
}