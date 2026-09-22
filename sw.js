const CACHE_NAME = 'troctan-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  // laisse passer toutes les requetes normalement (pas de mode hors-ligne pour l'instant,
  // ce fichier sert surtout a rendre l'appli installable et prepare le terrain pour les notifications)
});
