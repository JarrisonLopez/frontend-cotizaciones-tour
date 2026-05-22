import React from "react";
import { ArrowRight, CalendarDays, Users, MapPinned } from "lucide-react";

export default function Hero({ form, noches }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Colombia Inspira</p>

        <h1>Diseña experiencias únicas en Colombia</h1>

        <p className="subtitle">
          Cotiza viajes a la medida combinando hospedaje, transporte,
          alimentación y actividades para crear propuestas memorables.
        </p>

        <div className="hero-actions">
          <a href="#cotizador" className="hero-button">
            Empezar cotización
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="hero-stats">
          <span>
            <Users size={18} />
            {form.adultos + form.ninos} viajeros
          </span>

          <span>
            <CalendarDays size={18} />
            {form.dias} días
          </span>

          <span>
            <MapPinned size={18} />
            Experiencia a medida
          </span>
        </div>
      </div>

      <div className="hero-card">
        <span>Días</span>
        <strong>{form.dias}</strong>
        <small>{noches} noche(s)</small>
      </div>
    </section>
  );
}