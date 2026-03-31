require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // futur OTP WhatsApp

const app = express();
app.use(cors());
app.use(express.json());

// Stockage temporaire en mémoire (ou Firebase plus tard)
let militants = [];

// Ajouter un militant
app.post("/militant", (req, res) => {
  const { nom, prenom, telephone } = req.body;

  if (!nom || !prenom || !telephone)
    return res.status(400).json({ message: "Tous les champs sont requis !" });

  // Vérifier doublons
  const existe = militants.find(m => m.telephone === telephone);
  if (existe) return res.status(400).json({ message: "Numéro déjà enregistré !" });

  militants.push({ nom, prenom, telephone, date: new Date() });
  res.json({ message: "Militant ajouté avec succès !" });
});

// Vérifier un numéro
app.post("/verifier", (req, res) => {
  const { telephone } = req.body;
  const existe = militants.find(m => m.telephone === telephone);
  res.json({ existe: !!existe });
});

// Test serveur
app.get("/", (req, res) => {
  res.send("Backend Node.js Render fonctionne !");
});

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur Node.js Render démarré sur port ${PORT}`));
