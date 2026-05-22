import React from "react";

import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { currency } from "../utils/currency";

export default function ResultSection({ resultado }) {
  return (
    <section className="resultado">
      <div className="result-header">
        <h2>Resultado de la cotización</h2>

        <div
          className={resultado.totals?.viable ? "status ok" : "status bad"}
        >
          {resultado.totals?.viable ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertTriangle size={18} />
          )}

          {resultado.totals?.viable
            ? "Viable"
            : "Revisar viabilidad"}
        </div>
      </div>

      <div className="cards">
        <div>
          <span>Costo total</span>

          <strong>
            {currency.format(resultado.totals?.costoTotal || 0)}
          </strong>
        </div>

        <div>
          <span>Precio venta total</span>

          <strong>
            {currency.format(
              resultado.totals?.precioVentaTotal || 0
            )}
          </strong>
        </div>

        <div>
          <span>Precio por persona</span>

          <strong>
            {currency.format(
              resultado.totals?.precioVentaPersona || 0
            )}
          </strong>
        </div>

        <div>
          <span>Punto equilibrio</span>

          <strong>
            {resultado.totals?.puntoEquilibrio ?? "N/A"} pax
          </strong>
        </div>
      </div>

      <div className="financial-summary">
        <div className="summary-card">
          <span>Subtotal</span>

          <strong>
            {currency.format(resultado.totals?.subtotal || 0)}
          </strong>
        </div>

        <div className="summary-card">
          <span>Comisión</span>

          <strong>
            {currency.format(resultado.totals?.comision || 0)}
          </strong>
        </div>

        <div className="summary-card">
          <span>Costos variables</span>

          <strong>
            {currency.format(
              resultado.totals?.costosVariables || 0
            )}
          </strong>
        </div>

        <div className="summary-card">
          <span>Costos fijos</span>

          <strong>
            {currency.format(
              resultado.totals?.costosFijos || 0
            )}
          </strong>
        </div>

        <div className="summary-card">
          <span>Utilidad operativa</span>

          <strong>
            {currency.format(
              resultado.totals?.utilidadOperativa || 0
            )}
          </strong>
        </div>

        <div className="summary-card">
          <span>MC Unitario</span>

          <strong>
            {currency.format(
              resultado.totals?.margenContribucionUnitario || 0
            )}
          </strong>
        </div>
      </div>

      <div className="messages">
        <p className="note">
          {resultado.messages?.viabilidad}
        </p>

        <p className="note">
          {resultado.messages?.margen}
        </p>
      </div>

      {Array.isArray(resultado.detail) &&
        resultado.detail.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Item</th>
                  <th>Valor unitario</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {resultado.detail.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.category}</td>

                    <td>{item.item}</td>

                    <td>
                      {currency.format(item.unitPrice || 0)}
                    </td>

                    <td>{item.quantity ?? "-"}</td>

                    <td>
                      {currency.format(item.total || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </section>
  );
}