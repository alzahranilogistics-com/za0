// ✅ Firebase Messaging Service Worker

// تحميل مكتبات Firebase المطلوبة
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.5.0/firebase-messaging-compat.js");

// ✅ إعداد Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAgSfZgX13q4tK92T5_6hDR5pNKkhw8YeI",
  authDomain: "za122-789c0.firebaseapp.com",
  projectId: "za122-789c0",
  storageBucket: "za122-789c0.firebasestorage.app",
  messagingSenderId: "139885324329",
  appId: "1:139885324329:web:2b8128ba318ef4da93d438"
});

// ✅ تهيئة خدمة Firebase Messaging
const messaging = firebase.messaging();

// ✅ استقبال التنبيهات في الخلفية (Background)
messaging.onBackgroundMessage(function(payload) {
  console.log("📩 رسالة جديدة في الخلفية:", payload);

  // تخصيص بيانات الإشعار
  const notificationTitle = payload.notification.title || "🚨 تنبيه جديد";
  const notificationOptions = {
    body: payload.notification.body || "لديك إشعار من نظام الطوارئ الزهراني",
    icon: "/icon.png", // يمكنك تغيير الأيقونة لاحقًا
    badge: "/badge.png",
    sound: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
    vibrate: [500, 200, 500, 200, 500],
    requireInteraction: true, // الإشعار لا يُغلق حتى يضغط عليه المستخدم
  };

  // عرض الإشعار
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ التعامل مع النقر على الإشعار
self.addEventListener("notificationclick", function(event) {
  console.log("👆 تم النقر على الإشعار");
  event.notification.close();

  // فتح الموقع أو التركيز على نافذة مفتوحة مسبقًا
  event.waitUntil(
    clients.matchAll({ type: "window" }).then(function(clientList) {
      for (let client of clientList) {
        if (client.url === "/" && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
