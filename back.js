
// Initialize map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '©️ OpenStreetMap contributors'
}).addTo(map);

// Vehicles data
const vehicles = {
    bus1: { lat: 28.7041, lng: 77.1025, marker: null }, // Delhi
    bus2: { lat: 19.0760, lng: 72.8777, marker: null }, // Mumbai
    bus3: { lat: 12.9716, lng: 77.5946, marker: null }  // Bangalore
};

// Add markers
for (let id in vehicles) {
    const v = vehicles[id];
    v.marker = L.marker([v.lat, v.lng]).addTo(map)
        .bindPopup(`<b>${id}</b><br>Lat: ${v.lat}, Lng: ${v.lng}`);
}

// Simulate movement every 2 seconds
setInterval(() => {
    for (let id in vehicles) {
        const v = vehicles[id];
        v.lat += (Math.random() - 0.5) * 0.02; // random move
        v.lng += (Math.random() - 0.5) * 0.02;
        v.marker.setLatLng([v.lat, v.lng])
            .setPopupContent(`<b>${id}</b><br>Lat: ${v.lat.toFixed(4)}, Lng: ${v.lng.toFixed(4)}`);
    }
}, 2000);
