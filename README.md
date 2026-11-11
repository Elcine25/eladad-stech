# Eladad's Tech — site vitrine

React 19 + TypeScript + Vite, animations Framer Motion.

```bash
npm install
npm run dev      # développement
npm run build    # production (dossier dist/)
```

## À personnaliser avant la mise en ligne

Tout est dans `src/config.ts` : e-mail, numéro WhatsApp, téléphone, liens des réseaux sociaux,
et `formEndpoint` (ex. Formspree) si vous voulez que le formulaire envoie un e-mail.
Sans endpoint, le formulaire ouvre WhatsApp avec le message pré-rempli.

## Déploiement

Vercel : importer le dépôt, préréglage « Vite ». `vercel.json` est déjà fourni.
