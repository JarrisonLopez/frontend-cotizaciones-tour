import React from "react";
import {
  Instagram,
  Youtube,
  Globe2,
  MessageCircle,
  Binoculars,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#" className="nav-logo">
        <strong>COLOMBIA</strong>
        <span>INSPIRA</span>
      </a>

      <nav className="nav-links">
        <a href="#">Inicio</a>
        <a href="#experiencia">Experiencias</a>
        <a href="#cotizador">Cotizador</a>
        <a href="#resultado">Resultado</a>
      </nav>

      <div className="nav-socials">
        <a
          href="https://www.tripadvisor.co/Attraction_Review-g297478-d18383902-Reviews-Colombia_Inspira_SAS-Medellin_Antioquia_Department.html"
          target="_blank"
          rel="noreferrer"
          aria-label="TripAdvisor"
        >
          <Binoculars size={20} />
        </a>

        <a
          href="https://www.youtube.com/@ColombiaInspira"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          <Youtube size={20} />
        </a>

        <a
          href="https://www.instagram.com/colombiainspira/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>

        <span className="nav-language">
          <Globe2 size={21} />
          English
        </span>
      </div>

      <a
        className="nav-button"
        href="https://api.whatsapp.com/send?phone=573157178001"
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={18} />
        HABLEMOS
      </a>
    </header>
  );
}