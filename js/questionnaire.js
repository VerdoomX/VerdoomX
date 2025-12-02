// Questionnaire Manager for HugMeNow
// Handles the intimate questionnaire flow

class QuestionnaireManager {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.steps = QUESTIONNAIRE_STEPS;
        this.currentStep = 0;
        this.responses = {};
        this.config = config || CONFIG.questionnaire;
    }

    /**
     * Start the questionnaire
     */
    start() {
        this.currentStep = 0;
        this.responses = {};
        this.renderStep();
        this.updateProgress();
    }

    /**
     * Render current step
     */
    renderStep() {
        const step = this.steps[this.currentStep];
        if (!step) return;

        const questionsHTML = step.questions.map(q => this.renderQuestion(q)).join('');

        this.container.innerHTML = `
            <div class="question-step">
                <h3 class="question-title">${step.title}</h3>
                <p class="question-description">${step.description}</p>
                <div class="question-options">
                    ${questionsHTML}
                </div>
            </div>
        `;

        // Add event listeners
        this.attachEventListeners();

        // Restore previous answers if any
        this.restoreAnswers(step);
    }

    /**
     * Render a single question based on type
     */
    renderQuestion(question) {
        switch (question.type) {
            case 'radio':
                return this.renderRadioQuestion(question);
            case 'checkbox':
                return this.renderCheckboxQuestion(question);
            case 'range':
                return this.renderRangeQuestion(question);
            case 'number':
                return this.renderNumberQuestion(question);
            case 'textarea':
                return this.renderTextareaQuestion(question);
            case 'text':
                return this.renderTextQuestion(question);
            default:
                return '';
        }
    }

    /**
     * Render radio button question
     */
    renderRadioQuestion(question) {
        const optionsHTML = question.options.map(opt => `
            <div class="option-card" data-value="${opt.value}">
                <label class="option-radio">
                    <input type="radio" name="${question.id}" value="${opt.value}" ${question.required ? 'required' : ''}>
                    <span class="option-label">${opt.label}</span>
                </label>
            </div>
        `).join('');

        return `
            <div class="question-group" data-question-id="${question.id}">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${question.text}</h4>
                ${optionsHTML}
            </div>
        `;
    }

    /**
     * Render checkbox question
     */
    renderCheckboxQuestion(question) {
        const optionsHTML = question.options.map(opt => `
            <div class="option-card" data-value="${opt.value}">
                <label class="option-radio">
                    <input type="checkbox" name="${question.id}" value="${opt.value}">
                    <span class="option-label">${opt.label}</span>
                </label>
            </div>
        `).join('');

        return `
            <div class="question-group" data-question-id="${question.id}">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${question.text}</h4>
                ${optionsHTML}
            </div>
        `;
    }

    /**
     * Render range question
     */
    renderRangeQuestion(question) {
        const mid = Math.round((question.min + question.max) / 2);
        return `
            <div class="question-group" data-question-id="${question.id}">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${question.text}</h4>
                <div class="range-input-container">
                    <input type="range" 
                           class="range-input" 
                           name="${question.id}" 
                           min="${question.min}" 
                           max="${question.max}" 
                           value="${mid}"
                           ${question.required ? 'required' : ''}>
                    <div class="range-labels">
                        <span>${question.labels[0]}</span>
                        <span id="${question.id}-value">${mid}</span>
                        <span>${question.labels[1]}</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render number input question
     */
    renderNumberQuestion(question) {
        return `
            <div class="question-group" data-question-id="${question.id}">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${question.text}</h4>
                <input type="number" 
                       class="text-input" 
                       name="${question.id}" 
                       min="${question.min || 18}" 
                       max="${question.max || 100}"
                       placeholder="${question.placeholder || ''}"
                       ${question.required ? 'required' : ''}>
            </div>
        `;
    }

    /**
     * Render text input question
     */
    renderTextQuestion(question) {
        return `
            <div class="question-group" data-question-id="${question.id}">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${question.text}</h4>
                <input type="text" 
                       class="text-input" 
                       name="${question.id}" 
                       placeholder="${question.placeholder || ''}"
                       ${question.required ? 'required' : ''}>
            </div>
        `;
    }

    /**
     * Render textarea question
     */
    renderTextareaQuestion(question) {
        return `
            <div class="question-group" data-question-id="${question.id}">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">${question.text}</h4>
                <textarea class="textarea-input" 
                          name="${question.id}" 
                          placeholder="${question.placeholder || ''}"
                          ${question.required ? 'required' : ''}></textarea>
            </div>
        `;
    }

    /**
     * Attach event listeners to form elements
     */
    attachEventListeners() {
        // Option card selection
        const optionCards = this.container.querySelectorAll('.option-card');
        optionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const input = card.querySelector('input');
                if (input.type === 'radio') {
                    // Deselect all others in group
                    const group = card.closest('.question-group');
                    group.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    input.checked = true;
                } else if (input.type === 'checkbox') {
                    card.classList.toggle('selected');
                    input.checked = !input.checked;
                }
            });
        });

        // Range input value display
        const rangeInputs = this.container.querySelectorAll('.range-input');
        rangeInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const valueDisplay = document.getElementById(`${input.name}-value`);
                if (valueDisplay) {
                    valueDisplay.textContent = e.target.value;
                }
            });
        });
    }

    /**
     * Restore previous answers
     */
    restoreAnswers(step) {
        const stepCategory = step.category;
        if (!this.responses[stepCategory]) return;

        step.questions.forEach(question => {
            const value = this.responses[stepCategory][question.id];
            if (value === undefined) return;

            const input = this.container.querySelector(`[name="${question.id}"]`);
            if (!input) return;

            if (question.type === 'radio') {
                const radioInput = this.container.querySelector(`[name="${question.id}"][value="${value}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                    radioInput.closest('.option-card')?.classList.add('selected');
                }
            } else if (question.type === 'checkbox') {
                value.forEach(val => {
                    const checkboxInput = this.container.querySelector(`[name="${question.id}"][value="${val}"]`);
                    if (checkboxInput) {
                        checkboxInput.checked = true;
                        checkboxInput.closest('.option-card')?.classList.add('selected');
                    }
                });
            } else if (question.type === 'range') {
                input.value = value;
                const valueDisplay = document.getElementById(`${question.id}-value`);
                if (valueDisplay) valueDisplay.textContent = value;
            } else {
                input.value = value;
            }
        });
    }

    /**
     * Save current step responses
     */
    saveCurrentStep() {
        const step = this.steps[this.currentStep];
        if (!step) return false;

        const stepResponses = {};
        let isValid = true;

        step.questions.forEach(question => {
            const inputs = this.container.querySelectorAll(`[name="${question.id}"]`);

            if (question.type === 'checkbox') {
                const values = Array.from(inputs)
                    .filter(input => input.checked)
                    .map(input => input.value);
                stepResponses[question.id] = values;
            } else if (question.type === 'radio') {
                const checkedInput = Array.from(inputs).find(input => input.checked);
                if (checkedInput) {
                    stepResponses[question.id] = checkedInput.value;
                } else if (question.required) {
                    isValid = false;
                }
            } else {
                const input = inputs[0];
                if (input) {
                    if (question.required && !input.value) {
                        isValid = false;
                    } else {
                        stepResponses[question.id] = question.type === 'number' || question.type === 'range'
                            ? parseInt(input.value)
                            : input.value;
                    }
                }
            }
        });

        if (!isValid) {
            Components.showToast('Proszę odpowiedzieć na wszystkie wymagane pytania', 'error');
            return false;
        }

        this.responses[step.category] = stepResponses;
        return true;
    }

    /**
     * Go to next step
     */
    next() {
        if (!this.saveCurrentStep()) return;

        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.renderStep();
            this.updateProgress();
            this.updateNavigationButtons();
        } else {
            this.finish();
        }
    }

    /**
     * Go to previous step
     */
    prev() {
        this.saveCurrentStep();

        if (this.currentStep > 0) {
            this.currentStep--;
            this.renderStep();
            this.updateProgress();
            this.updateNavigationButtons();
        }
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        const progress = ((this.currentStep + 1) / this.steps.length) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `Krok ${this.currentStep + 1} z ${this.steps.length}`;
    }

    /**
     * Update navigation buttons
     */
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.currentStep === 0;
        }

        if (nextBtn) {
            if (this.currentStep === this.steps.length - 1) {
                nextBtn.innerHTML = '<i class="fas fa-check"></i> Zakończ';
            } else {
                nextBtn.innerHTML = 'Dalej <i class="fas fa-arrow-right"></i>';
            }
        }
    }

    /**
     * Finish questionnaire and process results
     */
    finish() {
        // Convert responses to questionnaire format
        const questionnaire = {
            sexualPreferences: this.responses.sexual_preferences,
            intimacy: this.responses.intimacy,
            personality: this.responses.personality,
            lifestyle: this.responses.lifestyle,
            preferences: {
                ageRange: [
                    this.responses.preferences.ageRangeMin,
                    this.responses.preferences.ageRangeMax
                ],
                maxDistance: this.responses.preferences.maxDistance,
                dealbreakers: this.responses.preferences.dealbreakers || []
            }
        };

        // Update current user
        CURRENT_USER.questionnaire = questionnaire;
        CURRENT_USER.name = 'Ty'; // Can be customized
        CURRENT_USER.age = this.responses.basics.age;
        CURRENT_USER.gender = this.responses.basics.gender;
        CURRENT_USER.bio = this.responses.basics.bio;

        // Save to localStorage
        localStorage.setItem('hugmenow_user', JSON.stringify(CURRENT_USER));
        localStorage.setItem('hugmenow_questionnaire', JSON.stringify(questionnaire));

        Components.showToast('Ankieta ukończona! Szukamy dopasowań...', 'success');

        // Hide questionnaire, show matches
        setTimeout(() => {
            document.getElementById('questionnaire-section').classList.add('hidden');
            document.querySelector('[href="#matches-section"]').click();

            // Trigger matches refresh
            if (window.app) {
                window.app.refreshMatches();
            }
        }, 1500);
    }

    /**
     * Load questionnaire from localStorage
     */
    loadSaved() {
        const saved = localStorage.getItem('hugmenow_questionnaire');
        if (saved) {
            try {
                const questionnaire = JSON.parse(saved);
                CURRENT_USER.questionnaire = questionnaire;
                return true;
            } catch (e) {
                console.error('Error loading saved questionnaire:', e);
            }
        }
        return false;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionnaireManager;
}
