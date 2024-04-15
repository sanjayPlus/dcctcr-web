importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBX8IZXm3C08lZN_T9AOLP9R3Ag_1gvzXE",
  authDomain: "dcc-thiruvanathapuram.firebaseapp.com",
  databaseURL: "https://dcc-thiruvanathapuram-default-rtdb.firebaseio.com",
  projectId: "dcc-thiruvanathapuram",
  storageBucket: "dcc-thiruvanathapuram.appspot.com",
  messagingSenderId: "696455065803",
  appId: "1:696455065803:web:82595bc9d1037143012b4e",
  measurementId: "G-D99YR4ME5Q"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data: payload.data,
    actions: [
      { action: 'open_url', title: 'Open URL' },
    ],
    // Add your properties here
    icon: './images/logo.png', // Replace 'icon-url' with the URL of your icon
    badge: './images/logo.png', // Replace 'badge-url' with the URL of your badge
    vibrate: [200, 100, 200], // Vibration pattern: wait 200ms, vibrate 100ms, then wait 200ms
    sound: './sounds/iphone_notification.mp3', // Replace 'sound-url' with the URL of your sound
  };

  // If payload.notification.image exists, add it as the image in the notification
  if (payload.notification.image) {
    notificationOptions.image = payload.notification.image;
  }

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
// Add notification click event functionality
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const clickedNotification = event.notification;
  const action = event.action;

  // Handle action click
  if (action === 'open_url') {
    if(clickedNotification.data && clickedNotification.data.url !== "") {
      // Open the clicked URL
      clients.openWindow(clickedNotification.data.url);
    } else {
      // Open the root of the current website
      clients.openWindow('/');
    }
  }
});

