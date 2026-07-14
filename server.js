const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const MAUTIC_URL = process.env.MAUTIC_URL || 'https://mautic.cubixmedia.fr';
const MAUTIC_USER = process.env.MAUTIC_USER;
const MAUTIC_PASSWORD = process.env.MAUTIC_PASSWORD;

app.post('/api/subscribe', async (req, res) => {
  const { email, firstname, lastname, company } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email requis' });
  }

  try {
    const contactData = {
      email,
      firstname: firstname || '',
      lastname: lastname || '',
      company: company || '',
      tags: 'plaquette-demandee'
    };

    const response = await axios.post(
      `${MAUTIC_URL}/api/contacts/new`,
      contactData,
      {
        auth: {
          username: MAUTIC_USER,
          password: MAUTIC_PASSWORD
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return res.json({ success: true, contact: response.data.contact });
  } catch (error) {
    console.error('Erreur Mautic:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'enregistrement du contact'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
