# Landing page - Plaquette Cubix Media

Landing page simple qui collecte les emails et crée automatiquement un contact dans Mautic.

## Déploiement sur Coolify

1. Créer un nouveau **Docker Compose Service** dans Coolify
2. Choisir le repository Git contenant ces fichiers
3. Configurer les variables d'environnement :
   - `MAUTIC_URL` : URL de ton Mautic (ex: `https://mautic.cubixmedia.fr`)
   - `MAUTIC_USER` : nom d'utilisateur API Mautic
   - `MAUTIC_PASSWORD` : mot de passe API Mautic
4. Déployer
5. Configurer le domaine dans Coolify

## Test local

```bash
npm install
MAUTIC_URL=https://mautic.cubixmedia.fr MAUTIC_USER=admin MAUTIC_PASSWORD=... npm start
```

Ouvrir http://localhost:3000
