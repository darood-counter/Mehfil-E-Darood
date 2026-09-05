importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB3PjjiQM2IqKmIQJ4d4YOwcc10RiG47FI",
  authDomain: "mehfil-e-darood.firebaseapp.com",
  databaseURL: "https://mehfil-e-darood-default-rtdb.firebaseio.com",
  projectId: "mehfil-e-darood",
  storageBucket: "mehfil-e-darood.firebasestorage.app",
  messagingSenderId: "876052619750",
  appId: "1:876052619750:web:889b37737240756ba5f627"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || {};
  const data = payload.data || {};

  const title = notification.title || "🌿 محفلِ درود — یاد دہانی";

  const options = {
    body: notification.body || "آئیے آج مزید درود شریف پڑھتے ہیں۔",
    tag: data.tag || "darood-reminder",
    data: {
      url: data.url || "/"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification?.data?.url || "/";

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
