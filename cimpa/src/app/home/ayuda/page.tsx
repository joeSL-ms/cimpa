// src/app/help/page.tsx

import React from "react";

function ContactCard() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1.5rem",
        marginTop: "2rem",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: "400px",
      }}
    >
      <h3 style={{ marginBottom: "0.5rem", color: "#0070f3" }}>
        Contacto Empresarial
      </h3>
      <p style={{ marginBottom: "0.25rem" }}>
        📞 Teléfono: <a href="tel:+34624567890" style={{ color: "#0070f3" }}>+34 624567890</a>
      </p>
      <p>
        📧 Email:{" "}
        <a
          href="mailto:soporte@cimpa.com"
          style={{ color: "#0070f3" }}
        >
          mailto:soporte@cimpa.com
        </a>
      </p>
    </div>
  );
}

export default function HelpPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <h1 style={{ color: "#111", marginBottom: "1rem" }}>
        Bienvenido a la sección de Ayuda
      </h1>
      <p>
        Esta web está diseñada para ofrecerte una experiencia completa y personalizada.
        A continuación, te presentamos una breve guía sobre las principales secciones:
      </p>

      <section>
        <h2>Inicio (Home)</h2>
        <p>
          Aquí verás un apartado global que cambia según el usuario que haya iniciado sesión.
          Encontrarás información relevante y actualizada adaptada a ti.
        </p>
      </section>

      <section>
        <h2>Usuario</h2>
        <p>
          En esta sección puedes gestionar tu perfil, actualizar datos personales y ajustar configuraciones relacionadas con tu cuenta.
        </p>
      </section>

      <section>
        <h2>Cartera Digital</h2>
        <p>
          Aquí puedes visualizar y administrar tus activos digitales, movimientos y balances.
          Todo lo que necesitas para gestionar tus recursos digitales de forma segura y sencilla.
        </p>
      </section>

      <section>
        <h2>Misiones</h2>
        <p>
          En este apartado encontrarás las tareas o retos disponibles para ti. Cumplir misiones puede ayudarte a ganar recompensas y mejorar tu experiencia.
        </p>
      </section>

      <ContactCard />

      <footer
        style={{
          marginTop: "3rem",
          fontStyle: "italic",
          color: "#555",
          textAlign: "center",
        }}
      >
        Si tienes alguna duda, no dudes en contactarnos a través del soporte.
      </footer>
    </main>
  );
}
