// Map integration for HugMeNow
// Uses Leaflet.js with location fuzzing for privacy

class MapManager {
    constructor(mapElementId, config) {
        this.mapElement = document.getElementById(mapElementId);
        this.config = config || CONFIG.map;
        this.privacyConfig = CONFIG.privacy;
        this.map = null;
        this.markers = [];
        this.userMarker = null;
        this.markerCluster = null;
    }

    /**
     * Initialize the map
     */
    init() {
        // Create map
        this.map = L.map(this.mapElement).setView(
            this.config.defaultCenter,
            this.config.defaultZoom
        );

        // Add tile layer
        L.tileLayer(this.config.tileLayer, {
            attribution: this.config.attribution,
            maxZoom: this.config.maxZoom,
            minZoom: this.config.minZoom
        }).addTo(this.map);

        // Initialize marker cluster
        this.markerCluster = L.markerClusterGroup({
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
        });
        this.map.addLayer(this.markerCluster);

        // Try to get user's location
        this.getUserLocation();
    }

    /**
     * Get user's current location
     */
    getUserLocation() {
        if ('geolocation' in navigator) {
            Components.setLoading(true);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    // Fuzz location for privacy
                    const fuzzedLocation = this.fuzzLocation(userLocation);

                    // Update current user location
                    CURRENT_USER.location = fuzzedLocation;

                    // Center map on user
                    this.map.setView([fuzzedLocation.lat, fuzzedLocation.lng], this.config.defaultZoom);

                    // Add user marker
                    this.addUserMarker(fuzzedLocation);

                    Components.setLoading(false);
                    Components.showToast('Lokalizacja zaktualizowana', 'success');
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    Components.setLoading(false);
                    Components.showToast('Nie można pobrać lokalizacji. Używam domyślnej.', 'info');
                }
            );
        } else {
            Components.showToast('Geolokalizacja nie jest dostępna', 'error');
        }
    }

    /**
     * Fuzz location for privacy (500-750m radius)
     */
    fuzzLocation(location) {
        // Random angle
        const angle = Math.random() * 2 * Math.PI;

        // Random distance between min and max fuzz radius
        const distance = this.privacyConfig.minFuzzRadius +
            Math.random() * (this.privacyConfig.maxFuzzRadius - this.privacyConfig.minFuzzRadius);

        // Convert distance to degrees (approximate)
        const deltaLat = (distance / 111320) * Math.cos(angle);
        const deltaLng = (distance / (111320 * Math.cos(location.lat * Math.PI / 180))) * Math.sin(angle);

        return {
            lat: location.lat + deltaLat,
            lng: location.lng + deltaLng
        };
    }

    /**
     * Add user's location marker
     */
    addUserMarker(location) {
        if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
        }

        // Custom icon for user
        const userIcon = L.divIcon({
            className: 'user-marker',
            html: '<div style="background: linear-gradient(135deg, #FF006E, #8338EC); width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-user" style="color: white; font-size: 14px;"></i></div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        this.userMarker = L.marker([location.lat, location.lng], { icon: userIcon })
            .addTo(this.map)
            .bindPopup('<strong>Twoja lokalizacja</strong><br><small>Przybliżona dla bezpieczeństwa</small>');

        // Add privacy radius circle
        L.circle([location.lat, location.lng], {
            color: '#FF006E',
            fillColor: '#FF006E',
            fillOpacity: 0.1,
            radius: this.privacyConfig.locationFuzzRadius,
            dashArray: '5, 5'
        }).addTo(this.map);
    }

    /**
     * Add user markers to map
     */
    addUserMarkers(users, matchingEngine) {
        // Clear existing markers
        this.clearUserMarkers();

        users.forEach(user => {
            if (!user.location || !user.active) return;

            // Calculate match score if current user has questionnaire
            let matchScore = 0;
            let matchCategory = 'default';

            if (CURRENT_USER.questionnaire && user.questionnaire) {
                matchScore = matchingEngine.calculateCompatibility(CURRENT_USER, user);
                matchCategory = matchingEngine.getMatchCategory(matchScore);
            }

            // Fuzz user location for privacy
            const fuzzedLocation = this.fuzzLocation(user.location);

            // Create custom marker
            const markerColor = CONFIG.ui.mapMarkerColors[matchCategory];
            const markerIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="position:relative; width:30px; height:30px; border-radius:50%; border:3px solid ${markerColor}; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.3);"><img src="${user.avatar}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2230%22 height=%2230%22><circle fill=%22%23${Components.getColorForUser(user.id)}%22 cx=%2215%22 cy=%2215%22 r=%2215%22/></svg>'"></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                popupAnchor: [0, -15]
            });

            const marker = L.marker([fuzzedLocation.lat, fuzzedLocation.lng], {
                icon: markerIcon,
                userData: user,
                matchScore: matchScore
            });

            // Create popup
            const distance = matchingEngine.calculateDistance(CURRENT_USER.location, user.location);
            const popupContent = this.createPopupContent(user, matchScore, distance);
            marker.bindPopup(popupContent);

            // Add click handler
            marker.on('click', () => {
                Components.openProfileModal(user, matchScore, distance);
            });

            this.markerCluster.addLayer(marker);
            this.markers.push(marker);
        });
    }

    /**
     * Create popup content for marker
     */
    createPopupContent(user, matchScore, distance) {
        const scorePercent = Math.round(matchScore * 100);
        const kinks = user.questionnaire?.sexualPreferences?.kinks || [];
        const kinksText = kinks.slice(0, 2).map(k => Components.translateKink(k)).join(', ');

        return `
            <div style="min-width: 200px; text-align: center;">
                <img src="${user.avatar}" 
                     style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 0.5rem;"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><circle fill=%22%23${Components.getColorForUser(user.id)}%22 cx=%2240%22 cy=%2240%22 r=%2240%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22>${user.name.charAt(0)}</text></svg>'">
                <h4 style="margin: 0 0 0.25rem 0; color: #0A0E27;">${user.name}, ${user.age}</h4>
                ${matchScore > 0 ? `<div style="color: #FF006E; font-weight: 600; margin-bottom: 0.5rem;">${scorePercent}% zgodności</div>` : ''}
                <p style="font-size: 0.85rem; color: #666; margin: 0 0 0.5rem 0;">${Components.formatDistance(distance)}</p>
                ${kinksText ? `<p style="font-size: 0.8rem; color: #888; margin: 0;">${kinksText}</p>` : ''}
                <button onclick="event.stopPropagation();" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: linear-gradient(135deg, #FF006E, #8338EC); color: white; border: none; border-radius: 20px; cursor: pointer; font-weight: 600;">
                    Zobacz profil
                </button>
            </div>
        `;
    }

    /**
     * Clear all user markers
     */
    clearUserMarkers() {
        this.markerCluster.clearLayers();
        this.markers = [];
    }

    /**
     * Center map on user's location
     */
    centerOnUser() {
        if (CURRENT_USER.location) {
            this.map.setView([CURRENT_USER.location.lat, CURRENT_USER.location.lng], this.config.defaultZoom);
        }
    }

    /**
     * Refresh map
     */
    refresh() {
        this.map.invalidateSize();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapManager;
}
