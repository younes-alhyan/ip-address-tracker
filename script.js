document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map and set its view to your chosen geographical coordinates and zoom level
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Define the custom icon using your SVG
    var svgIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
        <path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z" />
    </svg>`,
        className: 'custom-div-icon',
        iconSize: [46, 56],
        iconAnchor: [23, 56]
    });

    // Add a marker with the custom icon to the map
    var marker = L.marker([51.5, -0.09], { icon: svgIcon }).addTo(map);

    const apiKey = 'at_8atGm2SZhb76nVxBE7cherNLiMSCV';

    const inputButton = document.getElementById('input-button');
    const IPinput = document.getElementById('ip-input');

    const ipAddress = document.getElementById('ip-address');
    const location = document.getElementById('location');
    const timeZone = document.getElementById('time-zone');
    const ISP = document.getElementById('ISP');

    async function fetchData(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    function updateData(data) {
        ipAddress.textContent = data.ip || '';
        const loc = data.location || {};
        location.textContent = `${loc.city || ''}, ${loc.region || ''} ${loc.postal || ''}`;
        timeZone.textContent = loc.timezone || '';
        ISP.textContent = data.isp || '';

        if (loc.lat && loc.lng) {
            // Update the marker position and map view
            marker.setLatLng([loc.lat, loc.lng]);
            map.setView([loc.lat, loc.lng], 13);
        }
    }

    inputButton.addEventListener('click', async () => {
        const ipAddress = IPinput.value;
        // Construct the API URL
        const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;

        try {
            const data = await fetchData(apiUrl);
            // Handle the data here
            updateData(data);
            console.log(data);
        } catch (error) {
            // Handle errors from fetchData
            console.error('Error:', error);
        }
    });
});
