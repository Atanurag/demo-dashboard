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
        const registration = await navigator.serviceWorker.register('/sw.js');
        await navigator.serviceWorker.ready;
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            alert('Notification permission denied.');
            return;
        }

        const vapidPublicKey = "BIx81DMQTEbGb4tSfPczDObe1FSllyt0htZp0TtgDRTbsbgufCC9GM536RMrT0LOucT3R2VXYTqo0XEx5x1C8YE";

        const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey
        });
// http://127.0.0.1:8000/api/health/
// https://spotter-weather-routing-be.onrender.com/api/health/
// http://127.0.0.1:8000/api/save-subscription/
        const response = await fetch('https://spotter-weather-routing-be.onrender.com/api/save-subscription/', {
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
        alert('Subscription failed. console ');
    }
}












// {
//     "endpoint": "https://fcm.googleapis.com/fcm/send/dtOiyh2uykI:APA91bEK1gx8Jd_ms1lhLsBGNIz8iabYdNZrKhU7Zzu1T85IBlYWxerR3YgcwlsR7uVaeZu8tkujuxcWMAohX5FPrkBbLwn_fdnGhqwiNG7XufL45uxxX_SymWJOSerGNJ0B0qzySlVY",
//     "expirationTime": null,
//     "keys": {
//         "p256dh": "BJtmurnfxyAp4eSRF2hx7U8XhIVQLK2MWn0_NhNjaP1gPh1fR0UHYECJ9cp8xVx-Rmenku9DQAhMtWdnDCROl6I",
//         "auth": "MEbIqLQbeMvka0rdhyvERg"
//     }
// }