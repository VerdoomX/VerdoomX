// Main Application File for HugMeNow
// Initializes and coordinates all modules

class HugMeNowApp {
    constructor() {
        this.mapManager = null;
        this.matchingEngine = null;
        this.questionnaireManager = null;
        this.currentFilter = 'all';
        this.init();
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize matching engine
        this.matchingEngine = new MatchingEngine(CONFIG.matching);

        // Initialize map
        this.mapManager = new MapManager('map', CONFIG.map);
        this.mapManager.init();

        // Initialize questionnaire
        this.questionnaireManager = new QuestionnaireManager('questionnaireContent', CONFIG.questionnaire);

        // Try to load saved questionnaire
        this.questionnaireManager.loadSaved();

        // Set up event listeners
        this.setupEventListeners();

        // Initial data load
        this.loadInitialData();

        // Make app globally accessible for debugging and modal interactions
        window.app = this;
    }

    /**
     * Set up all event listeners
     */
    setupEventListeners() {
        // Navigation
        this.setupNavigation();

        // Hero CTA buttons
        document.getElementById('startQuestionnaireBtn')?.addEventListener('click', () => {
            this.showQuestionnaire();
        });

        document.getElementById('exploreMapBtn')?.addEventListener('click', () => {
            document.querySelector('[href="#map-section"]')?.click();
        });

        // Map controls
        document.getElementById('myLocationBtn')?.addEventListener('click', () => {
            this.mapManager.centerOnUser();
        });

        document.getElementById('refreshMapBtn')?.addEventListener('click', () => {
            this.refreshMap();
        });

        // Match filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.refreshMatches();
            });
        });

        // Questionnaire navigation
        document.getElementById('nextBtn')?.addEventListener('click', () => {
            this.questionnaireManager.next();
        });

        document.getElementById('prevBtn')?.addEventListener('click', () => {
            this.questionnaireManager.prev();
        });

        // Modal close buttons
        document.getElementById('modalClose')?.addEventListener('click', () => {
            document.getElementById('profileModal').classList.remove('active');
        });

        document.getElementById('modalOverlay')?.addEventListener('click', () => {
            document.getElementById('profileModal').classList.remove('active');
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = document.querySelector('#themeToggle i');
            if (document.body.classList.contains('light-theme')) {
                icon.className = 'fas fa-sun';
                localStorage.setItem('hugmenow_theme', 'light');
            } else {
                icon.className = 'fas fa-moon';
                localStorage.setItem('hugmenow_theme', 'dark');
            }
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('hugmenow_theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            const icon = document.querySelector('#themeToggle i');
            if (icon) icon.className = 'fas fa-sun';
        }

        // Settings modal
        document.getElementById('settingsBtn')?.addEventListener('click', () => {
            document.getElementById('settingsModal').classList.add('active');
        });

        document.getElementById('settingsModalClose')?.addEventListener('click', () => {
            document.getElementById('settingsModal').classList.remove('active');
        });

        document.getElementById('settingsModalOverlay')?.addEventListener('click', () => {
            document.getElementById('settingsModal').classList.remove('active');
        });

        // Settings controls
        document.getElementById('maxDistanceRange')?.addEventListener('input', (e) => {
            document.getElementById('maxDistanceValue').textContent = `${e.target.value} km`;
        });

        // Profile button
        document.getElementById('profileBtn')?.addEventListener('click', () => {
            if (CURRENT_USER.questionnaire) {
                Components.openProfileModal(CURRENT_USER, 1, 0);
            } else {
                Components.showToast('Wypełnij ankietę, aby utworzyć profil', 'info');
                this.showQuestionnaire();
            }
        });

        // Navbar scroll effect and scroll indicator
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update scroll indicator
            const scrollIndicator = document.getElementById('scrollIndicatorBar');
            if (scrollIndicator) {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY;
                const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
                scrollIndicator.style.width = `${scrollPercent}%`;
            }
        });

        // Mobile menu toggle
        document.getElementById('mobileMenuToggle')?.addEventListener('click', () => {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        });
    }

    /**
     * Set up smooth navigation
     */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    // Smooth scroll
                    target.scrollIntoView({ behavior: 'smooth' });

                    // Close mobile menu if open
                    const navMenu = document.getElementById('navMenu');
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                    }
                }
            });
        });
    }

    /**
     * Load initial data and populate UI
     */
    loadInitialData() {
        // Add user markers to map
        this.mapManager.addUserMarkers(MOCK_USERS, this.matchingEngine);

        // Refresh matches
        this.refreshMatches();

        // Welcome message
        setTimeout(() => {
            if (!CURRENT_USER.questionnaire) {
                Components.showToast('Witaj! Wypełnij ankietę, aby znaleźć dopasowania', 'info');
            } else {
                Components.showToast('Witaj ponownie! Znaleziono nowe profile', 'success');
            }
        }, 1000);
    }

    /**
     * Refresh matches grid
     */
    refreshMatches() {
        const matchesGrid = document.getElementById('matchesGrid');
        if (!matchesGrid) return;

        // Clear existing matches
        matchesGrid.innerHTML = '';

        // Check if user has completed questionnaire
        if (!CURRENT_USER.questionnaire) {
            matchesGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-heart-crack" style="font-size: 4rem; color: var(--text-tertiary); margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 1rem;">Wypełnij ankietę</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                        Aby zobaczyć dopasowane profile, musisz najpierw wypełnić ankietę.
                    </p>
                    <button class="btn-primary" onclick="app.showQuestionnaire()">
                        <i class="fas fa-clipboard-list"></i>
                        Rozpocznij ankietę
                    </button>
                </div>
            `;
            return;
        }

        // Get matches
        let matches = this.matchingEngine.getMatches(CURRENT_USER, MOCK_USERS);

        // Apply filter
        if (this.currentFilter === 'high') {
            matches = matches.filter(m => m.matchScore >= 0.8);
        } else if (this.currentFilter === 'nearby') {
            matches = matches.filter(m => m.distance < 5000); // < 5km
        } else if (this.currentFilter === 'new') {
            // Simulate new users (just shuffle for demo)
            matches = matches.sort(() => Math.random() - 0.5);
        }

        // Display matches
        if (matches.length === 0) {
            matchesGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                    <i class="fas fa-magnifying-glass" style="font-size: 4rem; color: var(--text-tertiary); margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 1rem;">Brak dopasowań</h3>
                    <p style="color: var(--text-secondary);">
                        Nie znaleziono użytkowników spełniających wybrane kryteria.
                    </p>
                </div>
            `;
        } else {
            matches.forEach(match => {
                const card = Components.createMatchCard(match, match.matchScore, match.distance);
                matchesGrid.appendChild(card);
            });
        }
    }

    /**
     * Refresh map markers
     */
    refreshMap() {
        Components.setLoading(true);

        setTimeout(() => {
            this.mapManager.addUserMarkers(MOCK_USERS, this.matchingEngine);
            this.mapManager.refresh();
            Components.setLoading(false);
            Components.showToast('Mapa odświeżona', 'success');
        }, 500);
    }

    /**
     * Show questionnaire section
     */
    showQuestionnaire() {
        const questionnaireSection = document.getElementById('questionnaire-section');
        questionnaireSection.classList.remove('hidden');

        // Scroll to questionnaire
        questionnaireSection.scrollIntoView({ behavior: 'smooth' });

        // Start or restart questionnaire
        this.questionnaireManager.start();
        this.questionnaireManager.updateNavigationButtons();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new HugMeNowApp();
});
