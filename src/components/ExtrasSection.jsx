import React from "react";

import { UsersRound } from "lucide-react";
import Panel from "./Panel";

export default function ExtrasSection({
  form,
  updateField,
  puedeIncluirStaff,
  totalPax,
}) {
  return (
    <Panel title="Varios" icon={<UsersRound size={20} />}>
      <label
        className={
          puedeIncluirStaff ? "check-row" : "check-row disabled-row"
        }
      >
        <input
          type="checkbox"
          checked={form.incluirTourLider}
          disabled={!puedeIncluirStaff}
          onChange={(e) =>
            updateField("incluirTourLider", e.target.checked)
          }
        />

        Incluir tour líder
      </label>

      <label
        className={
          puedeIncluirStaff ? "check-row" : "check-row disabled-row"
        }
      >
        <input
          type="checkbox"
          checked={form.incluirStaff}
          disabled={!puedeIncluirStaff}
          onChange={(e) =>
            updateField("incluirStaff", e.target.checked)
          }
        />

        Incluir staff completo
        <small className="help-text">
          Tiquetes staff + comida staff + honorarios staff
        </small>
      </label>

      {!puedeIncluirStaff && (
        <p className="warning-text">
          Para grupos menores a 4 personas no se puede incluir tour líder ni
          staff. Grupo actual: {totalPax} pax.
        </p>
      )}
    </Panel>
  );
}