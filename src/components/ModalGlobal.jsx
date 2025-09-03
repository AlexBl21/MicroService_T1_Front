import React from "react";

const ModalGlobal = ({ mostrar, titulo, mensaje, onClose, onConfirm }) => {
  if (!mostrar) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "90%",
          textAlign: "center"
        }}
      >
        <h3>{titulo}</h3>
        <p>{mensaje}</p>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
          {onConfirm && (
            <button
              onClick={onConfirm}
              style={{
                background: "red",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px"
              }}
            >
              Confirmar
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: "#3498db",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px"
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGlobal;
