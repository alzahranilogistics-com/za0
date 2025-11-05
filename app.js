// إعداد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "ضع هنا apiKey",
  authDomain: "ضع هنا authDomain",
  projectId: "ضع هنا projectId",
  storageBucket: "ضع هنا storageBucket",
  messagingSenderId: "ضع هنا senderId",
  appId: "ضع هنا appId"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

document.getElementById("savePhone").addEventListener("click", async () => {
  const phone = document.getElementById("phone").value.trim();
  if (!phone) return alert("أدخل رقم الجوال");

  const token = await getToken(messaging, {
    vapidKey: "ضع هنا VAPID KEY"
  });

  await fetch("https://firestore.googleapis.com/v1/projects/ضع_اسم_مشروعك/databases/(default)/documents/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      fields: {
        phone: { stringValue: phone },
        token: { stringValue: token }
      }
    })
  });

  document.getElementById("status").innerText = "تم حفظ الرقم بنجاح ✅";
});

onMessage(messaging, (payload) => {
  alert(`📩 إشعار جديد: ${payload.notification.title}\n${payload.notification.body}`);
});
