// src/utils/push.js
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function subscribeUser() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        alert('Push messaging is not supported in this browser.');
        return;
    }

    try {
        // 1. Register Service Worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        await navigator.serviceWorker.ready;

        // 2. Request Notification Permission
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            alert('Notification permission denied.');
            return;
        }

        // 3. Paste your VAPID Public Key generated from Django backend here
        const vapidPublicKey = "BIx81DMQTEbGb4tSfPczDObe1FSllyt0htZp0TtgDRTbsbgufCC9GM536RMrT0LOucT3R2VXYTqo0XEx5x1C8YE";

        const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

        // 4. Subscribe
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey
        });
// http://127.0.0.1:8000/api/health/
        // 5. Send to Django backend (hardcoded user_1 context on server)
        const response = await fetch('http://127.0.0.1:8000/api/save-subscription/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
        });

        const data = await response.json();
        console.log('Backend response:', data);
        alert('Successfully subscribed to push notifications!');
    } catch (error) {
        console.error('Failed to subscribe the user: ', error);
        alert('Subscription failed. Check console for details.');
    }
}