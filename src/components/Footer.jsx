import React from "react";
import { Instagram, Youtube, MessageCircle, Globe2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <h2>
          COLOMBIA
          <span>INSPIRA</span>
        </h2>

        <div className="footer-socials">
          <a
            href="https://www.tripadvisor.co/Attraction_Review-g297478-d18383902-Reviews-Colombia_Inspira_SAS-Medellin_Antioquia_Department.html"
            target="_blank"
            rel="noreferrer"
            aria-label="TripAdvisor"
          >
            <Globe2 size={18} />
          </a>

          <a
            href="https://www.youtube.com/@ColombiaInspira"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <Youtube size={18} />
          </a>

          <a
            href="https://www.youtube.com/@ColombiaInspira"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>

        <a
          className="footer-button"
          href="https://api.whatsapp.com/send?phone=573157178001"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          Más información
        </a>
      </div>

      <div className="footer-subscribe">
        <h3>Suscríbete</h3>

        <p>
          Regístrate con tu dirección de correo electrónico para recibir noticias
          y actualizaciones.
        </p>

        <form className="subscribe-form">
          <input type="email" placeholder="Email Address" />
          <button type="button">Suscribirse</button>
        </form>

        <small>Respetamos tu privacidad.</small>
      </div>
    </footer>
  );
}