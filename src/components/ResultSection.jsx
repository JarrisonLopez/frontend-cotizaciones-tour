import React from "react";

import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import { currency } from "../utils/currency";

export default function ResultSection({ resultado }) {
  const moneda = resultado.input?.moneda || "COP";

  const totals =
    moneda === "USD"
      ? resultado.totalsUSD
      : resultado.totals;

  const formatter = new Intl.NumberFormat(
    moneda === "USD" ? "en-US" : "es-CO",
    {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }
  );

  function formatMoney(value) {
    return formatter.format(Number(value || 0));
  }

  function convertDetailValue(value) {
    if (moneda === "COP") return value;

    const rate = resultado.exchange?.rate || 0;

    if (!rate) return value;

    return Number(value || 0) / rate;
  }

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
            {formatMoney(totals?.costoTotal)}
          </strong>
        </div>

        <div>
          <span>Precio venta total</span>

          <strong>
            {formatMoney(totals?.precioVentaTotal)}
          </strong>
        </div>

        <div>
          <span>Precio por persona</span>

          <strong>
            {formatMoney(totals?.precioVentaPersona)}
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
            {formatMoney(totals?.subtotal)}
          </strong>
        </div>

        <div className="summary-card">
          <span>Costos variables</span>

          <strong>
            {formatMoney(totals?.costosVariables)}
          </strong>
        </div>

        <div className="summary-card">
          <span>Costos fijos</span>

          <strong>
            {formatMoney(totals?.costosFijos)}
          </strong>
        </div>

        <div className="summary-card">
          <span>Utilidad operativa</span>

          <strong>
            {formatMoney(totals?.utilidadOperativa)}
          </strong>
        </div>

        <div className="summary-card">
          <span>MC Unitario</span>

          <strong>
            {formatMoney(totals?.margenContribucionUnitario)}
          </strong>
        </div>
      </div>

      <div className="messages">
        <p className="note">
          {resultado.messages?.viabilidad}
        </p>

        {resultado.messages?.reglaStaff && (
          <p className="note">
            {resultado.messages.reglaStaff}
          </p>
        )}

        {resultado.exchange && (
          <p className="note">
            Moneda seleccionada: {moneda}.{" "}
            Tasa utilizada: 1 USD ={" "}
            {currency.format(resultado.exchange.rate)} COP.
          </p>
        )}

        {resultado.exchange?.warning && (
          <p className="note">
            {resultado.exchange.warning}
          </p>
        )}
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
                      {formatMoney(convertDetailValue(item.unitPrice))}
                    </td>

                    <td>{item.quantity ?? "-"}</td>

                    <td>
                      {formatMoney(convertDetailValue(item.total))}
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