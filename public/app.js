document.getElementById('leadForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = e.target.querySelector('button[type="submit"]');
  const messageEl = document.getElementById('message');

  const data = {
    firstname: document.getElementById('firstname').value.trim(),
    lastname: document.getElementById('lastname').value.trim(),
    company: document.getElementById('company').value.trim(),
    email: document.getElementById('email').value.trim()
  };

  btn.disabled = true;
  btn.textContent = 'Envoi en cours...';
  messageEl.className = 'message hidden';

  try {
    const response = await fetch('https://n8n.cubixmedia.fr/webhook/landing-plaquette', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      messageEl.textContent = 'Merci ! Votre demande a bien été enregistrée. Vous recevrez la plaquette prochainement.';
      messageEl.className = 'message success';
      e.target.reset();
    } else {
      const result = await response.json().catch(() => ({}));
      messageEl.textContent = result.error || 'Une erreur est survenue. Veuillez réessayer.';
      messageEl.className = 'message error';
    }
  } catch (error) {
    messageEl.textContent = 'Une erreur réseau est survenue. Veuillez réessayer.';
    messageEl.className = 'message error';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Recevoir la plaquette';
  }
});
