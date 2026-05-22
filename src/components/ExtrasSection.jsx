import React from "react";

import Panel from "./Panel";

export default function ExtrasSection({ form, updateField }) {
  return (
    <Panel title="Varios">
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
    </Panel>
  );
}