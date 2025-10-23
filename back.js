<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
        // Initialize map
        const map = L.map('map', {
            attributionControl: false
        }).setView([20.5937, 78.9629], 5); // Centered on India

        // Dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors & CartoDB',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Custom attribution
        L.control.attribution({
            prefix: '<span style="color: #00FF00;">© OpenStreetMap contributors</span>'
        }).addTo(map);

        // Vehicles data
        const vehicles = {
            bus1: { lat: 28.7041, lng: 77.1025, marker: null }, // Delhi
            bus2: { lat: 19.0760, lng: 72.8777, marker: null }, // Mumbai
            bus3: { lat: 12.9716, lng: 77.5946, marker: null }  // Bangalore
        };

        // Custom bus icon
        const busIcon = L.divIcon({
            className: 'bus-icon',
            html: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="6" width="16" height="12" rx="2" fill="#00FF00"/><circle cx="8" cy="18" r="2" fill="#000"/><circle cx="16" cy="18" r="2" fill="#000"/></svg>',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });

        // Login state
        let isLoggedIn = false;

        // Add markers (initially hidden)
        for (let id in vehicles) {
            const v = vehicles[id];
            v.marker = L.marker([v.lat, v.lng], { icon: busIcon })
                .bindPopup(`<b style="color: #00FF00;">${id.toUpperCase()}</b><br>Lat: ${v.lat.toFixed(4)}, Lng: ${v.lng.toFixed(4)}<br><small>Tracking in real-time</small>`);
            // Don't add to map until logged in
        }

        // Toggle login state
        function toggleLogin() {
            isLoggedIn = !isLoggedIn;
            const loginButton = document.getElementById('loginButton');
            loginButton.textContent = isLoggedIn ? 'Logout' : 'Login';
            document.getElementById('vehicleSelect').disabled = !isLoggedIn;

            if (isLoggedIn) {
                // Add all markers to map
                for (let id in vehicles) {
                    vehicles[id].marker.addTo(map);
                }
            } else {
                // Remove all markers from map
                for (let id in vehicles) {
                    map.removeLayer(vehicles[id].marker);
                }
                document.getElementById('vehicleSelect').value = ''; // Reset dropdown
            }
        }

        // Center map on selected vehicle
        function centerOnVehicle() {
            const vehicleId = document.getElementById('vehicleSelect').value;
            if (isLoggedIn && vehicleId && vehicles[vehicleId]) {
                const v = vehicles[vehicleId];
                map.flyTo([v.lat, v.lng], 12, { duration: 1 }); // Smooth zoom to vehicle
                v.marker.openPopup(); // Show popup
            }
        }

        // Simulate movement every 2 seconds
        setInterval(() => {
            if (!isLoggedIn) return; // Skip if not logged in
            for (let id in vehicles) {
                const v = vehicles[id];
                const newLat = v.lat + (Math.random() - 0.5) * 0.02;
                const newLng = v.lng + (Math.random() - 0.5) * 0.02;
                v.lat = newLat;
                v.lng = newLng;
                v.marker.setLatLng([newLat, newLng]);
                v.marker.setPopupContent(`<b style="color: #00FF00;">${id.toUpperCase()}</b><br>Lat: ${v.lat.toFixed(4)}, Lng: ${v.lng.toFixed(4)}<br><small>Tracking in real-time</small>`);
            }
        }, 2000);

        // Initialize zoom control
        map.zoomControl.setPosition('bottomright');
    </script>
