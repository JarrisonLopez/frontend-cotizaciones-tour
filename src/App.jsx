import React from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExperienceSection from "./components/ExperienceSection";
import BasicDataForm from "./components/BasicDataForm";
import LodgingForm from "./components/LodgingForm";
import TransportSection from "./components/TransportSection";
import ActivitiesSection from "./components/ActivitiesSection";
import ExtrasSection from "./components/ExtrasSection";
import ActionButtons from "./components/ActionButtons";
import ResultSection from "./components/ResultSection";
import Footer from "./components/Footer";

import { useCotizador } from "./hooks/useCotizador";

export default function App() {
  const cotizador = useCotizador();

  return (
    <>
      <Navbar />

      <main className="app">
        <Hero form={cotizador.form} noches={cotizador.noches} />

        <ExperienceSection />

        <section className="section-heading">
          <p className="eyebrow dark">Cotizador inteligente</p>

          <h2>Configura tu experiencia</h2>

          <p>
            Ajusta los detalles del viaje y calcula una propuesta clara,
            rentable y lista para presentar.
          </p>
        </section>

        <section id="cotizador" className="grid">
          <BasicDataForm
            form={cotizador.form}
            updateField={cotizador.updateField}
          />

          <LodgingForm
            form={cotizador.form}
            updateField={cotizador.updateField}
          />

          <TransportSection
            form={cotizador.form}
            updateNested={cotizador.updateNested}
          />

          <ActivitiesSection
            form={cotizador.form}
            updateNested={cotizador.updateNested}
            aplicarPaquete={cotizador.aplicarPaquete}
          />

          <ExtrasSection
            form={cotizador.form}
            updateField={cotizador.updateField}
            puedeIncluirStaff={cotizador.puedeIncluirStaff}
            totalPax={cotizador.totalPax}
          />

          <ActionButtons
            loading={cotizador.loading}
            error={cotizador.error}
            cotizar={cotizador.cotizar}
            descargarPDF={cotizador.descargarPDF}
            limpiar={cotizador.limpiar}
          />
        </section>

        {cotizador.resultado && (
          <section id="resultado">
            <ResultSection resultado={cotizador.resultado} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}