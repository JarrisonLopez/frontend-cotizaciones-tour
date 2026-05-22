import React from "react";
import { Leaf, Mountain, Compass } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section id="experiencia" className="experience-section">
      <div className="experience-text">
        <p className="eyebrow dark">Experiencias conscientes</p>
        <h2>Viajes diseñados para conectar con Colombia</h2>
        <p>
          Creamos propuestas a la medida combinando naturaleza, cultura,
          aventura y logística para que cada cotización se convierta en una
          experiencia memorable.
        </p>
      </div>

      <div className="experience-cards">
        <article>
          <Leaf size={26} />
          <h3>Naturaleza</h3>
          <p>Actividades pensadas para descubrir paisajes vivos y auténticos.</p>
        </article>

        <article>
          <Mountain size={26} />
          <h3>Aventura</h3>
          <p>Rutas, safaris, caminatas y momentos únicos en territorio.</p>
        </article>

        <article>
          <Compass size={26} />
          <h3>A medida</h3>
          <p>Cada viaje se calcula según días, personas, margen y servicios.</p>
        </article>
      </div>
    </section>
  );
}