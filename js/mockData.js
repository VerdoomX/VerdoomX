// Mock Data for HugMeNow
// User profiles will be loaded from backend API

const MOCK_USERS = []; // Empty - profiles loaded from API

// Current user profile (example)
const CURRENT_USER = {
    id: 999,
    name: 'Użytkownik',
    age: 28,
    gender: 'male',
    location: { lat: 52.2297, lng: 21.0122 },
    questionnaire: null // Will be filled after completing questionnaire
};

// Questionnaire structure
const QUESTIONNAIRE_STEPS = [
    {
        id: 1,
        category: 'basics',
        title: 'Podstawowe informacje',
        description: 'Opowiedz nam trochę o sobie',
        questions: [
            {
                id: 'age',
                text: 'Ile masz lat?',
                type: 'number',
                required: true
            },
            {
                id: 'gender',
                text: 'Płeć',
                type: 'radio',
                required: true,
                options: [
                    { value: 'male', label: 'Mężczyzna' },
                    { value: 'female', label: 'Kobieta' },
                    { value: 'non_binary', label: 'Niebinarna' }
                ]
            },
            {
                id: 'bio',
                text: 'Napisz coś o sobie',
                type: 'textarea',
                required: true,
                placeholder: 'Opisz się w kilku zdaniach...'
            }
        ]
    },
    {
        id: 2,
        category: 'sexual_preferences',
        title: 'Preferencje seksualne',
        description: 'Bądź szczery/a - to pomoże AI znaleźć idealnego partnera',
        questions: [
            {
                id: 'orientation',
                text: 'Twoja orientacja seksualna',
                type: 'radio',
                required: true,
                options: [
                    { value: 'heterosexual', label: 'Heteroseksualny/a' },
                    { value: 'homosexual', label: 'Homoseksualny/a' },
                    { value: 'bisexual', label: 'Biseksualny/a' },
                    { value: 'pansexual', label: 'Panseksualny/a' },
                    { value: 'other', label: 'Inna' }
                ]
            },
            {
                id: 'experience',
                text: 'Poziom doświadczenia seksualnego',
                type: 'radio',
                required: true,
                options: [
                    { value: 'beginner', label: 'Początkujący/a' },
                    { value: 'exploring', label: 'Odkrywam swoją seksualność' },
                    { value: 'moderate', label: 'Umiarkowane doświadczenie' },
                    { value: 'experienced', label: 'Doświadczony/a' },
                    { value: 'very_experienced', label: 'Bardzo doświadczony/a' }
                ]
            },
            {
                id: 'openness',
                text: 'Jak otwarty/a jesteś na nowe doświadczenia? (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Konserwatywny/a', 'Bardzo otwarty/a']
            },
            {
                id: 'frequency',
                text: 'Jak często uprawiasz seks?',
                type: 'radio',
                required: true,
                options: [
                    { value: 'rarely', label: 'Rzadko' },
                    { value: 'moderate', label: 'Co jakiś czas' },
                    { value: 'high', label: 'Często' },
                    { value: 'very_high', label: 'Bardzo często' }
                ]
            },
            {
                id: 'kinks',
                text: 'Które cechy opisują Twoje preferencje? (wybierz wszystkie)',
                type: 'checkbox',
                required: false,
                options: [
                    { value: 'romantic', label: '❤️ Romantyczne' },
                    { value: 'sensual', label: '🔥 Zmysłowe' },
                    { value: 'passionate', label: '💋 Namiętne' },
                    { value: 'playful', label: '😈 Figlarny' },
                    { value: 'adventurous', label: '🎢 Awanturnicze' },
                    { value: 'experimental', label: '🧪 Eksperymentalne' },
                    { value: 'spontaneous', label: '⚡ Spontaniczne' },
                    { value: 'intimate', label: '🫂 Intymne' },
                    { value: 'confident', label: '💪 Pewne siebie' },
                    { value: 'curious', label: '🔍 Ciekawskie' }
                ]
            }
        ]
    },
    {
        id: 3,
        category: 'intimacy',
        title: 'Intymność i komunikacja',
        description: 'Jak budujesz bliskość z partnerem?',
        questions: [
            {
                id: 'communicationStyle',
                text: 'Jaki jest Twój styl komunikacji o seksie?',
                type: 'radio',
                required: true,
                options: [
                    { value: 'shy', label: 'Wstydliwy/a' },
                    { value: 'thoughtful', label: 'Przemyślany/a' },
                    { value: 'open', label: 'Otwarty/a' },
                    { value: 'direct', label: 'Bezpośredni/a' },
                    { value: 'assertive', label: 'Asertywny/a' },
                    { value: 'playful', label: 'Figlarny/a' }
                ]
            },
            {
                id: 'emotionalConnection',
                text: 'Jak ważna jest dla Ciebie emocjonalna więź? (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Nieważna', 'Kluczowa']
            },
            {
                id: 'physicalTouch',
                text: 'Jak ważny jest dla Ciebie fizyczny kontakt? (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Nieważny', 'Kluczowy']
            },
            {
                id: 'romanticLevel',
                text: 'Poziom romantyzmu (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Czysto fizycznie', 'Bardzo romantycznie']
            }
        ]
    },
    {
        id: 4,
        category: 'personality',
        title: 'Osobowość',
        description: 'Jakim jesteś człowiekiem?',
        questions: [
            {
                id: 'introvert_extrovert',
                text: 'Introwertyk czy ekstrawertyk? (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Introwertyk', 'Ekstrawertyk']
            },
            {
                id: 'spontaneous_planned',
                text: 'Spontaniczny czy planujący? (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Planujący', 'Spontaniczny']
            },
            {
                id: 'dominant_submissive',
                text: 'W relacji wolisz być... (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Submisywny/a', 'Dominujący/a']
            },
            {
                id: 'adventurous',
                text: 'Jak bardzo jesteś awanturniczy/a? (1-10)',
                type: 'range',
                required: true,
                min: 1,
                max: 10,
                labels: ['Bezpieczny/a', 'Bardzo awanturniczy/a']
            }
        ]
    },
    {
        id: 5,
        category: 'lifestyle',
        title: 'Styl życia',
        description: 'Czego szukasz?',
        questions: [
            {
                id: 'relationshipType',
                text: 'Jakiego typu relacji szukasz?',
                type: 'radio',
                required: true,
                options: [
                    { value: 'hookup', label: 'Przelotny związek' },
                    { value: 'casual', label: 'Swobodna relacja' },
                    { value: 'flexible', label: 'Elastyczna (zobaczymy co z tego wyjdzie)' },
                    { value: 'serious', label: 'Poważny związek' },
                    { value: 'open', label: 'Otwarta relacja' }
                ]
            },
            {
                id: 'availability',
                text: 'Jak często jesteś dostępny/a?',
                type: 'radio',
                required: true,
                options: [
                    { value: 'rare', label: 'Rzadko' },
                    { value: 'moderate', label: 'Umiarkowanie' },
                    { value: 'flexible', label: 'Elastycznie' },
                    { value: 'very_flexible', label: 'Bardzo elastycznie' }
                ]
            },
            {
                id: 'drinking',
                text: 'Picie alkoholu',
                type: 'radio',
                required: true,
                options: [
                    { value: 'no', label: 'Nie piję' },
                    { value: 'occasionally', label: 'Okazjonalnie' },
                    { value: 'socially', label: 'Towarzysko' },
                    { value: 'regularly', label: 'Regularnie' }
                ]
            },
            {
                id: 'smoking',
                text: 'Palenie',
                type: 'radio',
                required: true,
                options: [
                    { value: 'no', label: 'Nie palę' },
                    { value: 'occasionally', label: 'Okazjonalnie' },
                    { value: 'socially', label: 'Towarzysko' },
                    { value: 'regularly', label: 'Regularnie' }
                ]
            }
        ]
    },
    {
        id: 6,
        category: 'preferences',
        title: 'Twoje preferencje',
        description: 'Kogo szukasz?',
        questions: [
            {
                id: 'ageRangeMin',
                text: 'Minimalny wiek partnera',
                type: 'number',
                required: true,
                min: 18,
                max: 100
            },
            {
                id: 'ageRangeMax',
                text: 'Maksymalny wiek partnera',
                type: 'number',
                required: true,
                min: 18,
                max: 100
            },
            {
                id: 'maxDistance',
                text: 'Maksymalny dystans (km)',
                type: 'range',
                required: true,
                min: 1,
                max: 50,
                labels: ['1 km', '50 km']
            },
            {
                id: 'dealbreakers',
                text: 'Co jest dla Ciebie niedopuszczalne? (wybierz wszystkie)',
                type: 'checkbox',
                required: false,
                options: [
                    { value: 'dishonesty', label: 'Nieuczciwość' },
                    { value: 'disrespect', label: 'Brak szacunku' },
                    { value: 'jealousy', label: 'Zazdrość' },
                    { value: 'clingy', label: 'Przesadna zależność' },
                    { value: 'games', label: 'Granie w gry psychiczne' },
                    { value: 'aggression', label: 'Agresja' },
                    { value: 'judgment', label: 'Osądzanie' },
                    { value: 'closed_mindedness', label: 'Zamknięty umysł' },
                    { value: 'drama', label: 'Drama' },
                    { value: 'immaturity', label: 'Niedojrzałość' },
                    { value: 'boring', label: 'Nuda' },
                    { value: 'possessive', label: 'Własność' },
                    { value: 'superficiality', label: 'Powierzchowność' },
                    { value: 'insecurity', label: 'Brak pewności siebie' },
                    { value: 'passivity', label: 'Bierność' }
                ]
            }
        ]
    }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOCK_USERS, CURRENT_USER, QUESTIONNAIRE_STEPS };
}
