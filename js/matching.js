// Matching Algorithm for HugMeNow
// Calculates compatibility scores based on intimate questionnaire responses

class MatchingEngine {
    constructor(config) {
        this.config = config || CONFIG.matching;
    }

    /**
     * Calculate compatibility score between two users
     * @param {Object} user1 - First user with questionnaire
     * @param {Object} user2 - Second user with questionnaire
     * @returns {number} - Compatibility score (0-1)
     */
    calculateCompatibility(user1, user2) {
        if (!user1.questionnaire || !user2.questionnaire) {
            return 0;
        }

        const scores = {
            sexualCompatibility: this.calculateSexualCompatibility(user1, user2),
            personality: this.calculatePersonalityMatch(user1, user2),
            interests: this.calculateInterestsMatch(user1, user2),
            lifestyle: this.calculateLifestyleMatch(user1, user2),
            distance: this.calculateDistanceScore(user1, user2)
        };

        // Weighted average
        let totalScore = 0;
        for (const [key, score] of Object.entries(scores)) {
            totalScore += score * this.config.weights[key];
        }

        return Math.round(totalScore * 100) / 100;
    }

    /**
     * Calculate sexual compatibility (most important for this app)
     */
    calculateSexualCompatibility(user1, user2) {
        const q1 = user1.questionnaire.sexualPreferences;
        const q2 = user2.questionnaire.sexualPreferences;
        const i1 = user1.questionnaire.intimacy;
        const i2 = user2.questionnaire.intimacy;

        let score = 0;
        let factors = 0;

        // Orientation compatibility
        if (this.areOrientationsCompatible(user1.gender, user2.gender, q1.orientation, q2.orientation)) {
            score += 1;
        }
        factors++;

        // Experience level compatibility (prefer similar levels)
        const experienceLevels = { beginner: 1, exploring: 2, moderate: 3, experienced: 4, very_experienced: 5 };
        const expDiff = Math.abs(experienceLevels[q1.experience] - experienceLevels[q2.experience]);
        score += Math.max(0, 1 - expDiff / 4);
        factors++;

        // Openness compatibility (closer is better)
        const opennessDiff = Math.abs(q1.openness - q2.openness);
        score += Math.max(0, 1 - opennessDiff / 10);
        factors++;

        // Frequency compatibility
        const frequencyLevels = { rarely: 1, moderate: 2, high: 3, very_high: 4 };
        const freqDiff = Math.abs(frequencyLevels[q1.frequency] - frequencyLevels[q2.frequency]);
        score += Math.max(0, 1 - freqDiff / 3);
        factors++;

        // Kinks/interests overlap
        const kinksOverlap = this.calculateArrayOverlap(q1.kinks || [], q2.kinks || []);
        score += kinksOverlap;
        factors++;

        // Communication style compatibility
        score += this.calculateCommunicationCompatibility(i1.communicationStyle, i2.communicationStyle);
        factors++;

        // Emotional vs physical balance
        const emotionalDiff = Math.abs(i1.emotionalConnection - i2.emotionalConnection);
        const physicalDiff = Math.abs(i1.physicalTouch - i2.physicalTouch);
        score += Math.max(0, 1 - (emotionalDiff + physicalDiff) / 20);
        factors++;

        // Romantic level compatibility
        const romanticDiff = Math.abs(i1.romanticLevel - i2.romanticLevel);
        score += Math.max(0, 1 - romanticDiff / 10);
        factors++;

        return score / factors;
    }

    /**
     * Calculate personality match
     */
    calculatePersonalityMatch(user1, user2) {
        const p1 = user1.questionnaire.personality;
        const p2 = user2.questionnaire.personality;

        let score = 0;
        let factors = 0;

        // Introvert/Extrovert - both similar and complementary work
        const ieDiff = Math.abs(p1.introvert_extrovert - p2.introvert_extrovert);
        score += Math.max(0, 1 - ieDiff / 10);
        factors++;

        // Spontaneous/Planned - moderate difference is okay
        const spDiff = Math.abs(p1.spontaneous_planned - p2.spontaneous_planned);
        score += Math.max(0, 1 - spDiff / 10);
        factors++;

        // Dominant/Submissive - complementary is good (not too similar)
        const dsDiff = Math.abs(p1.dominant_submissive - p2.dominant_submissive);
        // Sweet spot is around 3-5 difference
        if (dsDiff >= 3 && dsDiff <= 5) {
            score += 1;
        } else if (dsDiff < 3) {
            score += 0.7; // Too similar might cause issues
        } else {
            score += Math.max(0, 1 - (dsDiff - 5) / 5);
        }
        factors++;

        // Adventurous - similar levels preferred
        const advDiff = Math.abs(p1.adventurous - p2.adventurous);
        score += Math.max(0, 1 - advDiff / 10);
        factors++;

        return score / factors;
    }

    /**
     * Calculate interests match (based on kinks and preferences)
     */
    calculateInterestsMatch(user1, user2) {
        const kinks1 = user1.questionnaire.sexualPreferences.kinks || [];
        const kinks2 = user2.questionnaire.sexualPreferences.kinks || [];

        return this.calculateArrayOverlap(kinks1, kinks2);
    }

    /**
     * Calculate lifestyle compatibility
     */
    calculateLifestyleMatch(user1, user2) {
        const l1 = user1.questionnaire.lifestyle;
        const l2 = user2.questionnaire.lifestyle;

        let score = 0;
        let factors = 0;

        // Relationship type compatibility
        const relationshipCompatibility = {
            hookup: { hookup: 1, casual: 0.7, flexible: 0.5, serious: 0.2, open: 0.8 },
            casual: { hookup: 0.7, casual: 1, flexible: 0.9, serious: 0.5, open: 0.8 },
            flexible: { hookup: 0.5, casual: 0.9, flexible: 1, serious: 0.8, open: 0.9 },
            serious: { hookup: 0.2, casual: 0.5, flexible: 0.8, serious: 1, open: 0.3 },
            open: { hookup: 0.8, casual: 0.8, flexible: 0.9, serious: 0.3, open: 1 }
        };
        score += relationshipCompatibility[l1.relationshipType]?.[l2.relationshipType] || 0.5;
        factors++;

        // Availability compatibility
        const availabilityLevels = { rare: 1, moderate: 2, flexible: 3, very_flexible: 4 };
        const availDiff = Math.abs(availabilityLevels[l1.availability] - availabilityLevels[l2.availability]);
        score += Math.max(0, 1 - availDiff / 3);
        factors++;

        // Drinking compatibility (less important if both are moderate)
        const drinkingLevels = { no: 0, occasionally: 1, socially: 2, regularly: 3 };
        const drinkDiff = Math.abs(drinkingLevels[l1.drinking] - drinkingLevels[l2.drinking]);
        score += Math.max(0, 1 - drinkDiff / 3);
        factors++;

        // Smoking compatibility
        const smokingLevels = { no: 0, occasionally: 1, socially: 2, regularly: 3 };
        const smokeDiff = Math.abs(smokingLevels[l1.smoking] - smokingLevels[l2.smoking]);
        score += Math.max(0, 1 - smokeDiff / 3);
        factors++;

        return score / factors;
    }

    /**
     * Calculate distance score
     */
    calculateDistanceScore(user1, user2) {
        const distance = this.calculateDistance(user1.location, user2.location);
        const maxDistance = user1.questionnaire.preferences.maxDistance * 1000; // Convert to meters

        if (distance > maxDistance) {
            return 0;
        }

        // Closer is better, but not linear
        return Math.max(0, 1 - (distance / maxDistance) * 0.5);
    }

    /**
     * Check if orientations are compatible
     */
    areOrientationsCompatible(gender1, gender2, orientation1, orientation2) {
        // Simplified compatibility check
        if (orientation1 === 'bisexual' || orientation1 === 'pansexual' ||
            orientation2 === 'bisexual' || orientation2 === 'pansexual') {
            return true;
        }

        if (orientation1 === 'heterosexual' && orientation2 === 'heterosexual') {
            return gender1 !== gender2;
        }

        if (orientation1 === 'homosexual' && orientation2 === 'homosexual') {
            return gender1 === gender2;
        }

        return false;
    }

    /**
     * Calculate overlap between two arrays
     */
    calculateArrayOverlap(arr1, arr2) {
        if (arr1.length === 0 && arr2.length === 0) return 1;
        if (arr1.length === 0 || arr2.length === 0) return 0;

        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        const union = new Set([...set1, ...set2]);

        return intersection.size / union.size;
    }

    /**
     * Communication style compatibility
     */
    calculateCommunicationCompatibility(style1, style2) {
        const compatibility = {
            shy: { shy: 0.6, thoughtful: 0.8, open: 0.7, direct: 0.5, assertive: 0.4, playful: 0.6 },
            thoughtful: { shy: 0.8, thoughtful: 0.9, open: 0.9, direct: 0.7, assertive: 0.6, playful: 0.7 },
            open: { shy: 0.7, thoughtful: 0.9, open: 1, direct: 0.9, assertive: 0.8, playful: 0.9 },
            direct: { shy: 0.5, thoughtful: 0.7, open: 0.9, direct: 0.8, assertive: 0.9, playful: 0.7 },
            assertive: { shy: 0.4, thoughtful: 0.6, open: 0.8, direct: 0.9, assertive: 0.8, playful: 0.7 },
            playful: { shy: 0.6, thoughtful: 0.7, open: 0.9, direct: 0.7, assertive: 0.7, playful: 1 }
        };

        return compatibility[style1]?.[style2] || 0.5;
    }

    /**
     * Calculate distance between two coordinates (Haversine formula)
     */
    calculateDistance(loc1, loc2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = loc1.lat * Math.PI / 180;
        const φ2 = loc2.lat * Math.PI / 180;
        const Δφ = (loc2.lat - loc1.lat) * Math.PI / 180;
        const Δλ = (loc2.lng - loc1.lng) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    }

    /**
     * Get all matches for a user, sorted by compatibility
     */
    getMatches(currentUser, allUsers) {
        if (!currentUser.questionnaire) {
            return [];
        }

        const matches = allUsers
            .filter(user => user.id !== currentUser.id && user.active)
            .map(user => {
                const score = this.calculateCompatibility(currentUser, user);
                const distance = this.calculateDistance(currentUser.location, user.location);

                return {
                    ...user,
                    matchScore: score,
                    distance: Math.round(distance)
                };
            })
            .filter(match => match.matchScore >= this.config.minMatchScore)
            .sort((a, b) => b.matchScore - a.matchScore);

        return matches;
    }

    /**
     * Categorize match quality
     */
    getMatchCategory(score) {
        if (score >= 0.8) return 'high';
        if (score >= 0.6) return 'medium';
        return 'low';
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MatchingEngine;
}
