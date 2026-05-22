import React from "react";

import { Plane } from "lucide-react";
import Panel from "./Panel";
import { transportes } from "../constants/cotizadorData";

export default function TransportSection({ form, updateNested }) {
  return (
    <Panel title="Transporte" icon={<Plane size={20} />}>
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
    </Panel>
  );
}