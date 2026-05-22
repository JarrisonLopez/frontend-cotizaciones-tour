import React from "react";

import { Calculator } from "lucide-react";
import Panel from "./Panel";

export default function BasicDataForm({ form, updateField }) {
  return (
    <Panel title="Datos básicos" icon={<Calculator size={20} />}>
      <div className="form-grid">
        <label>
          Adultos
          <input
            type="number"
            min="0"
            value={form.adultos}
            onChange={(e) => updateField("adultos", Number(e.target.value))}
          />
        </label>

        <label>
          Niños 5 a 12 años
          <input
            type="number"
            min="0"
            value={form.ninos}
            onChange={(e) => updateField("ninos", Number(e.target.value))}
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
            onChange={(e) => updateField("margen", Number(e.target.value))}
          >
            <option value={0.25}>25%</option>
            <option value={0.3}>30%</option>
            <option value={0.35}>35%</option>
            <option value={0.4}>40%</option>
            <option value={0.45}>45%</option>
          </select>
        </label>
      </div>
    </Panel>
  );
}