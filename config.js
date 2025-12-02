// HugMeNow Configuration
const CONFIG = {
    // Map settings
    map: {
        defaultCenter: [52.2297, 21.0122], // Warsaw, Poland - default
        defaultZoom: 13,
        maxZoom: 18,
        minZoom: 10,
        tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },

    // Privacy and safety
    privacy: {
        // Radius in meters for location fuzzing (500-750m as per user request)
        locationFuzzRadius: 625, // Average of 500-750m
        minFuzzRadius: 500,
        maxFuzzRadius: 750
    },

    // Matching algorithm weights
    matching: {
        weights: {
            sexualCompatibility: 0.40,  // Highest weight for intimate matching
            personality: 0.20,
            interests: 0.15,
            lifestyle: 0.15,
            distance: 0.10
        },
        minMatchScore: 0.50, // Minimum 50% compatibility to show
        maxDistance: 10000 // 10km default max distance in meters
    },

    // Questionnaire settings
    questionnaire: {
        totalSteps: 6,
        categories: [
            'basics',
            'sexual_preferences',
            'intimacy',
            'personality',
            'lifestyle',
            'preferences'
        ]
    },

    // UI settings
    ui: {
        animationDuration: 300,
        toastDuration: 3000,
        mapMarkerColors: {
            high: '#FF006E',      // High match - hot pink
            medium: '#8338EC',    // Medium match - purple
            low: '#3A86FF',       // Low match - blue
            default: '#8B8B8B'    // No questionnaire completed - gray
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
