import React from "react";

import { BedDouble, Utensils } from "lucide-react";
import Panel from "./Panel";
import { hospedajes } from "../constants/cotizadorData";

export default function LodgingForm({ form, updateField }) {
  return (
    <Panel title="Hospedaje" icon={<BedDouble size={20} />}>
      <div className="form-grid">
        <label>
          Adultos
          <select
            value={form.hospedajeAdulto}
            onChange={(e) =>
              updateField("hospedajeAdulto", e.target.value)
            }
          >
            {hospedajes.map((hospedaje) => (
              <option key={hospedaje.value} value={hospedaje.value}>
                {hospedaje.label}
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
            {hospedajes.map((hospedaje) => (
              <option key={hospedaje.value} value={hospedaje.value}>
                {hospedaje.label}
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

        <Utensils size={18} />

        Incluir alimentación completa
      </label>
    </Panel>
  );
}