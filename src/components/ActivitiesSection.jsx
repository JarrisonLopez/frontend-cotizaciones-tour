import React from "react";

import { Map } from "lucide-react";
import Panel from "./Panel";
import { actividades } from "../constants/cotizadorData";

export default function ActivitiesSection({
  form,
  updateNested,
  aplicarPaquete,
}) {
  return (
    <Panel>
      <div className="panel-title-row">
        <h2>
          <Map size={20} />
          Actividades
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
    </Panel>
  );
}