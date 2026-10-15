const CACHE_NAME = 'troctan-v1';
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  // pas de mode hors-ligne : toutes les requetes passent normalement
});

// Notifications push
self.addEventListener('push', (e) => {
  let d = {};
  try{ d = e.data ? e.data.json() : {}; }catch(err){ d = {body: e.data ? e.data.text() : ''}; }
  e.waitUntil(self.registration.showNotification(d.title || 'Troctan', {
    body: d.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || '/' }
  }));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(list => {
    for(const c of list){ if('focus' in c) return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
