// UI Components for HugMeNow

class Components {
    /**
     * Create a match card element
     */
    static createMatchCard(user, matchScore, distance) {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.dataset.userId = user.id;

        const scorePercent = Math.round(matchScore * 100);
        const matchCategory = scorePercent >= 80 ? 'high' : scorePercent >= 60 ? 'medium' : 'low';

        // Create tags from kinks
        const kinks = user.questionnaire?.sexualPreferences?.kinks || [];
        const tagsHTML = kinks.slice(0, 3).map(kink =>
            `<span class="tag">${this.translateKink(kink)}</span>`
        ).join('');

        // Status online/ostatnia aktywność
        const onlineStatus = user.online 
            ? '<span style="color: var(--accent-success);"><i class="fas fa-circle" style="font-size: 0.6rem;"></i> Online</span>'
            : user.lastActive 
                ? `<span style="color: var(--text-tertiary); font-size: 0.85rem;"><i class="fas fa-clock"></i> ${this.formatLastActive(user.lastActive)}</span>`
                : '';

        // Verified badge
        const verifiedBadge = user.verified 
            ? '<span style="color: var(--accent-tertiary); margin-left: 0.5rem;" title="Zweryfikowany profil"><i class="fas fa-check-circle"></i></span>'
            : '';

        card.innerHTML = `
            <div class="match-card-image-container" style="position: relative;">
                <img src="${user.avatar}" alt="${user.name}" class="match-card-image" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22250%22><rect fill=%22%23${this.getColorForUser(user.id)}%22 width=%22300%22 height=%22250%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2260%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22>${user.name.charAt(0)}</text></svg>'">
                ${user.online ? '<div style="position: absolute; top: 0.5rem; left: 0.5rem; width: 12px; height: 12px; background: var(--accent-success); border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>' : ''}
                <div class="match-card-badge">
                    <i class="fas fa-heart"></i>
                    ${scorePercent}%
                </div>
            </div>
            <div class="match-card-body">
                <div class="match-card-header">
                    <div>
                        <div class="match-card-name">
                            ${user.name}, ${user.age}
                            ${verifiedBadge}
                        </div>
                        <div class="match-card-info">
                            <i class="fas fa-location-dot"></i>
                            ${this.formatDistance(distance)}
                            ${onlineStatus ? ` • ${onlineStatus}` : ''}
                        </div>
                    </div>
                </div>
                <p class="match-card-bio">${user.bio}</p>
                <div class="match-card-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;

        // Add click handler to open profile
        card.addEventListener('click', () => {
            this.openProfileModal(user, matchScore, distance);
        });

        return card;
    }

    /**
     * Open profile modal with detailed information
     */
    static openProfileModal(user, matchScore, distance) {
        const modal = document.getElementById('profileModal');
        const modalBody = document.getElementById('profileModalBody');

        const scorePercent = Math.round(matchScore * 100);
        const q = user.questionnaire;

        modalBody.innerHTML = `
            <div class="profile-detail">
                <div class="profile-header">
                    <img src="${user.avatar}" alt="${user.name}" 
                         style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; display: block;"
                         onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%22150%22><circle fill=%22%23${this.getColorForUser(user.id)}%22 cx=%2275%22 cy=%2275%22 r=%2275%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2260%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22>${user.name.charAt(0)}</text></svg>'">
                    <h2 style="text-align: center; margin-bottom: 0.5rem;">${user.name}, ${user.age}</h2>
                    <div style="text-align: center; color: var(--text-secondary); margin-bottom: 1rem;">
                        <i class="fas fa-location-dot"></i> ${this.formatDistance(distance)}
                    </div>
                    <div style="text-align: center; font-size: 2rem; margin-bottom: 1rem;">
                        <span class="match-score">${scorePercent}% zgodności</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem;">O mnie</h3>
                    <p style="color: var(--text-secondary);">${user.bio}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem;">Preferencje</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${(q?.sexualPreferences?.kinks || []).map(kink =>
            `<span class="tag">${this.translateKink(kink)}</span>`
        ).join('')}
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem;">
                        <div>
                            <strong>Doświadczenie:</strong><br>
                            <span style="color: var(--text-secondary);">${this.translateExperience(q?.sexualPreferences?.experience)}</span>
                        </div>
                        <div>
                            <strong>Otwartość:</strong><br>
                            <span style="color: var(--text-secondary);">${q?.sexualPreferences?.openness}/10</span>
                        </div>
                        <div>
                            <strong>Typ relacji:</strong><br>
                            <span style="color: var(--text-secondary);">${this.translateRelationType(q?.lifestyle?.relationshipType)}</span>
                        </div>
                        <div>
                            <strong>Komunikacja:</strong><br>
                            <span style="color: var(--text-secondary);">${this.translateCommunication(q?.intimacy?.communicationStyle)}</span>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <button class="btn-primary" style="flex: 1;" onclick="alert('Funkcja czatu będzie wkrótce dostępna!')">
                        <i class="fas fa-comment"></i> Wyślij wiadomość
                    </button>
                    <button class="btn-secondary" style="flex: 1;" onclick="alert('Dodano do ulubionych!')">
                        <i class="fas fa-heart"></i> Polub
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    /**
     * Create a toast notification
     */
    static showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: 'fa-circle-check',
            error: 'fa-circle-xmark',
            info: 'fa-circle-info'
        };

        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon"></i>
            <span class="toast-message">${message}</span>
        `;

        container.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, CONFIG.ui.toastDuration);
    }

    /**
     * Show/hide loading overlay
     */
    static setLoading(isLoading) {
        const overlay = document.getElementById('loadingOverlay');
        if (isLoading) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }

    /**
     * Format distance in meters to human-readable string
     */
    static formatDistance(meters) {
        if (meters < 1000) {
            return `${Math.round(meters)}m stąd`;
        } else {
            return `${(meters / 1000).toFixed(1)}km stąd`;
        }
    }

    /**
     * Format last active time to human-readable string
     */
    static formatLastActive(lastActiveISO) {
        if (!lastActiveISO) return '';
        
        const now = new Date();
        const lastActive = new Date(lastActiveISO);
        const diffMs = now - lastActive;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Teraz';
        if (diffMins < 60) return `${diffMins}min temu`;
        if (diffHours < 24) return `${diffHours}h temu`;
        if (diffDays < 7) return `${diffDays}d temu`;
        return `${Math.floor(diffDays / 7)}tyg temu`;
    }

    /**
     * Get color for user (for placeholder avatars)
     */
    static getColorForUser(userId) {
        const colors = ['FF006E', '8338EC', '3A86FF', '06FFA5', 'FFB800'];
        return colors[userId % colors.length];
    }

    /**
     * Translation helpers
     */
    static translateKink(kink) {
        const translations = {
            romantic: '❤️ Romantyczne',
            sensual: '🔥 Zmysłowe',
            passionate: '💋 Namiętne',
            playful: '😈 Figlarny',
            adventurous: '🎢 Awanturnicze',
            experimental: '🧪 Eksperymentalne',
            spontaneous: '⚡ Spontaniczne',
            intimate: '🫂 Intymne',
            confident: '💪 Pewne siebie',
            curious: '🔍 Ciekawskie'
        };
        return translations[kink] || kink;
    }

    static translateExperience(exp) {
        const translations = {
            beginner: 'Początkujący',
            exploring: 'Odkrywam',
            moderate: 'Umiarkowane',
            experienced: 'Doświadczony',
            very_experienced: 'Bardzo doświadczony'
        };
        return translations[exp] || exp;
    }

    static translateRelationType(type) {
        const translations = {
            hookup: 'Przelotny',
            casual: 'Swobodny',
            flexible: 'Elastyczny',
            serious: 'Poważny',
            open: 'Otwarty'
        };
        return translations[type] || type;
    }

    static translateCommunication(style) {
        const translations = {
            shy: 'Wstydliwy',
            thoughtful: 'Przemyślany',
            open: 'Otwarty',
            direct: 'Bezpośredni',
            assertive: 'Asertywny',
            playful: 'Figlarny'
        };
        return translations[style] || style;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Components;
}
