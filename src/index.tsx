import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./index.css";  // Bunu şimdilik kapattım, hata veriyorsa açılmasın.

console.log("Uygulama başlatılıyor..."); // Konsola log atarak çalıştığını görelim

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root elementi bulunamadı!");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  // StrictMode'u kaldırdım, eski kütüphanelerle daha iyi çalışır
  <>
    <App />
  </>
);
