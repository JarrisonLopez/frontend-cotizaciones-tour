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
          Moneda
          <select
            value={form.moneda}
            onChange={(e) => updateField("moneda", e.target.value)}
          >
            <option value="COP">Pesos colombianos (COP)</option>
            <option value="USD">Dólares americanos (USD)</option>
          </select>
        </label>


      </div>
    </Panel>
  );
}