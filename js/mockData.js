// Mock Data for HugMeNow
// Intimate questionnaire responses and user profiles

const MOCK_USERS = [
    {
        id: 1,
        name: 'Karolina',
        age: 28,
        gender: 'female',
        location: { lat: 52.2297, lng: 21.0122 }, // Warsaw
        avatar: 'assets/images/user1.jpg',
        bio: 'Szukam kogoś otwartego na nowe doświadczenia. Lubię szczerość i głębokie rozmowy o pragnieniach.',
        active: true,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h temu
        online: false,
        verified: true,
        joinDate: new Date('2024-01-15').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'experienced',
                openness: 9,
                kinks: ['sensual', 'romantic', 'adventurous'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'direct',
                emotionalConnection: 8,
                physicalTouch: 9,
                romanticLevel: 7
            },
            personality: {
                introvert_extrovert: 6,
                spontaneous_planned: 7,
                dominant_submissive: 5,
                adventurous: 8
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'flexible',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [25, 35],
                maxDistance: 15,
                dealbreakers: ['dishonesty', 'disrespect']
            }
        }
    },
    {
        id: 2,
        name: 'Michał',
        age: 32,
        gender: 'male',
        location: { lat: 52.2319, lng: 21.0056 },
        avatar: 'assets/images/user2.jpg',
        bio: 'Otwarty umysł, szukam prawdziwej chemii. Życie jest za krótkie na nudę.',
        active: true,
        lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30min temu
        online: true,
        verified: true,
        joinDate: new Date('2023-11-20').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'very_experienced',
                openness: 10,
                kinks: ['adventurous', 'playful', 'spontaneous'],
                frequency: 'very_high'
            },
            intimacy: {
                communicationStyle: 'open',
                emotionalConnection: 6,
                physicalTouch: 10,
                romanticLevel: 5
            },
            personality: {
                introvert_extrovert: 8,
                spontaneous_planned: 9,
                dominant_submissive: 7,
                adventurous: 9
            },
            lifestyle: {
                relationshipType: 'open',
                availability: 'very_flexible',
                drinking: 'regularly',
                smoking: 'occasionally'
            },
            preferences: {
                ageRange: [23, 38],
                maxDistance: 20,
                dealbreakers: ['jealousy', 'clingy']
            }
        }
    },
    {
        id: 3,
        name: 'Anna',
        age: 26,
        gender: 'female',
        location: { lat: 52.2265, lng: 21.0188 },
        avatar: 'assets/images/user3.jpg',
        bio: 'Czuła, romantyczna, ale z pazurem. Szukam kogoś, kto potrafi mnie zaskoczyć.',
        active: true,
        lastActive: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5h temu
        online: false,
        verified: true,
        joinDate: new Date('2024-02-10').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'bisexual',
                experience: 'experienced',
                openness: 8,
                kinks: ['sensual', 'romantic', 'experimental'],
                frequency: 'moderate'
            },
            intimacy: {
                communicationStyle: 'thoughtful',
                emotionalConnection: 9,
                physicalTouch: 8,
                romanticLevel: 9
            },
            personality: {
                introvert_extrovert: 5,
                spontaneous_planned: 4,
                dominant_submissive: 4,
                adventurous: 7
            },
            lifestyle: {
                relationshipType: 'serious',
                availability: 'moderate',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [24, 33],
                maxDistance: 10,
                dealbreakers: ['dishonesty', 'aggression']
            }
        }
    },
    {
        id: 4,
        name: 'Jakub',
        age: 29,
        gender: 'male',
        location: { lat: 52.2340, lng: 21.0155 },
        avatar: 'assets/images/user4.jpg',
        bio: 'Bezpośredni i szczery. Wiem czego chcę i nie boję się o tym mówić.',
        active: true,
        lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1h temu
        online: false,
        verified: false,
        joinDate: new Date('2024-03-05').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'experienced',
                openness: 7,
                kinks: ['passionate', 'sensual'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'direct',
                emotionalConnection: 7,
                physicalTouch: 9,
                romanticLevel: 6
            },
            personality: {
                introvert_extrovert: 7,
                spontaneous_planned: 6,
                dominant_submissive: 6,
                adventurous: 7
            },
            lifestyle: {
                relationshipType: 'flexible',
                availability: 'moderate',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [23, 32],
                maxDistance: 12,
                dealbreakers: ['games', 'dishonesty']
            }
        }
    },
    {
        id: 5,
        name: 'Natalia',
        age: 31,
        gender: 'female',
        location: { lat: 52.2280, lng: 21.0085 },
        avatar: 'assets/images/user5.jpg',
        bio: 'Pewna siebie i zmysłowa. Cenię autentyczność i pasję.',
        active: true,
        lastActive: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15min temu
        online: true,
        verified: true,
        joinDate: new Date('2023-12-18').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'very_experienced',
                openness: 9,
                kinks: ['passionate', 'adventurous', 'confident'],
                frequency: 'very_high'
            },
            intimacy: {
                communicationStyle: 'assertive',
                emotionalConnection: 7,
                physicalTouch: 10,
                romanticLevel: 6
            },
            personality: {
                introvert_extrovert: 8,
                spontaneous_planned: 7,
                dominant_submissive: 7,
                adventurous: 9
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'flexible',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [27, 38],
                maxDistance: 15,
                dealbreakers: ['insecurity', 'passivity']
            }
        }
    },
    {
        id: 6,
        name: 'Piotr',
        age: 27,
        gender: 'male',
        location: { lat: 52.2305, lng: 21.0200 },
        avatar: 'assets/images/user6.jpg',
        bio: 'Romantyk z duszą awanturnika. Lubię długie rozmowy i krótkie noce.',
        active: true,
        lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h temu
        online: false,
        verified: true,
        joinDate: new Date('2024-01-28').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'moderate',
                openness: 6,
                kinks: ['romantic', 'sensual', 'playful'],
                frequency: 'moderate'
            },
            intimacy: {
                communicationStyle: 'thoughtful',
                emotionalConnection: 8,
                physicalTouch: 7,
                romanticLevel: 9
            },
            personality: {
                introvert_extrovert: 5,
                spontaneous_planned: 5,
                dominant_submissive: 4,
                adventurous: 6
            },
            lifestyle: {
                relationshipType: 'serious',
                availability: 'moderate',
                drinking: 'occasionally',
                smoking: 'no'
            },
            preferences: {
                ageRange: [22, 30],
                maxDistance: 10,
                dealbreakers: ['superficiality', 'dishonesty']
            }
        }
    },
    {
        id: 7,
        name: 'Weronika',
        age: 25,
        gender: 'female',
        location: { lat: 52.2245, lng: 21.0140 },
        avatar: 'assets/images/user7.jpg',
        bio: 'Młoda, ciekawska i bardzo otwarta. Szukam kogoś do eksperymentowania.',
        active: true,
        lastActive: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45min temu
        online: false,
        verified: false,
        joinDate: new Date('2024-02-25').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'bisexual',
                experience: 'exploring',
                openness: 8,
                kinks: ['experimental', 'playful', 'curious'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'open',
                emotionalConnection: 6,
                physicalTouch: 8,
                romanticLevel: 5
            },
            personality: {
                introvert_extrovert: 7,
                spontaneous_planned: 8,
                dominant_submissive: 5,
                adventurous: 9
            },
            lifestyle: {
                relationshipType: 'open',
                availability: 'very_flexible',
                drinking: 'socially',
                smoking: 'occasionally'
            },
            preferences: {
                ageRange: [23, 32],
                maxDistance: 18,
                dealbreakers: ['judgment', 'closed_mindedness']
            }
        }
    },
    {
        id: 8,
        name: 'Tomasz',
        age: 35,
        gender: 'male',
        location: { lat: 52.2330, lng: 21.0095 },
        avatar: 'assets/images/user8.jpg',
        bio: 'Dojrzały, doświadczony i pewny siebie. Wiem jak sprawić przyjemność.',
        active: true,
        lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6h temu
        online: false,
        verified: true,
        joinDate: new Date('2023-10-12').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'very_experienced',
                openness: 8,
                kinks: ['confident', 'sensual', 'passionate'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'assertive',
                emotionalConnection: 6,
                physicalTouch: 9,
                romanticLevel: 5
            },
            personality: {
                introvert_extrovert: 6,
                spontaneous_planned: 5,
                dominant_submissive: 7,
                adventurous: 7
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'moderate',
                drinking: 'regularly',
                smoking: 'no'
            },
            preferences: {
                ageRange: [24, 35],
                maxDistance: 20,
                dealbreakers: ['drama', 'immaturity']
            }
        }
    },
    {
        id: 9,
        name: 'Magdalena',
        age: 30,
        gender: 'female',
        location: { lat: 52.2270, lng: 21.0110 },
        avatar: 'assets/images/user9.jpg',
        bio: 'Spontaniczna i pełna energii. Życie jest zbyt krótkie na rutynę.',
        active: true,
        lastActive: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20min temu
        online: true,
        verified: true,
        joinDate: new Date('2024-01-08').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'experienced',
                openness: 9,
                kinks: ['spontaneous', 'adventurous', 'playful'],
                frequency: 'very_high'
            },
            intimacy: {
                communicationStyle: 'playful',
                emotionalConnection: 6,
                physicalTouch: 9,
                romanticLevel: 4
            },
            personality: {
                introvert_extrovert: 9,
                spontaneous_planned: 9,
                dominant_submissive: 6,
                adventurous: 10
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'very_flexible',
                drinking: 'socially',
                smoking: 'occasionally'
            },
            preferences: {
                ageRange: [26, 38],
                maxDistance: 25,
                dealbreakers: ['boring', 'possessive']
            }
        }
    },
    {
        id: 10,
        name: 'Adam',
        age: 33,
        gender: 'male',
        location: { lat: 52.2288, lng: 21.0175 },
        avatar: 'assets/images/user10.jpg',
        bio: 'Szukam głębokiego połączenia, zarówno fizycznego jak i emocjonalnego.',
        active: true,
        lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h temu
        online: false,
        verified: true,
        joinDate: new Date('2023-11-30').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'experienced',
                openness: 7,
                kinks: ['sensual', 'intimate', 'romantic'],
                frequency: 'moderate'
            },
            intimacy: {
                communicationStyle: 'thoughtful',
                emotionalConnection: 9,
                physicalTouch: 8,
                romanticLevel: 8
            },
            personality: {
                introvert_extrovert: 4,
                spontaneous_planned: 4,
                dominant_submissive: 5,
                adventurous: 6
            },
            lifestyle: {
                relationshipType: 'serious',
                availability: 'moderate',
                drinking: 'occasionally',
                smoking: 'no'
            },
            preferences: {
                ageRange: [26, 35],
                maxDistance: 12,
                dealbreakers: ['superficiality', 'dishonesty']
            }
        }
    },
    {
        id: 11,
        name: 'Katarzyna',
        age: 29,
        gender: 'female',
        location: { lat: 52.2320, lng: 21.0100 },
        avatar: 'assets/images/user1.jpg',
        bio: 'Profesjonalistka w dzień, zmysłowa kobieta w nocy. Szukam kogoś, kto doceni obie strony.',
        active: true,
        lastActive: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10min temu
        online: true,
        verified: true,
        joinDate: new Date('2024-02-14').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'very_experienced',
                openness: 9,
                kinks: ['confident', 'passionate', 'adventurous'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'assertive',
                emotionalConnection: 7,
                physicalTouch: 9,
                romanticLevel: 6
            },
            personality: {
                introvert_extrovert: 7,
                spontaneous_planned: 6,
                dominant_submissive: 7,
                adventurous: 8
            },
            lifestyle: {
                relationshipType: 'flexible',
                availability: 'moderate',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [27, 36],
                maxDistance: 15,
                dealbreakers: ['immaturity', 'passivity']
            }
        }
    },
    {
        id: 12,
        name: 'Łukasz',
        age: 31,
        gender: 'male',
        location: { lat: 52.2250, lng: 21.0160 },
        avatar: 'assets/images/user2.jpg',
        bio: 'Fitness enthusiast, który wie jak dbać o ciało i umysł. Szukam partnerki do wspólnych aktywności.',
        active: true,
        lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1h temu
        online: false,
        verified: true,
        joinDate: new Date('2023-12-05').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'experienced',
                openness: 8,
                kinks: ['adventurous', 'playful', 'spontaneous'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'direct',
                emotionalConnection: 6,
                physicalTouch: 9,
                romanticLevel: 5
            },
            personality: {
                introvert_extrovert: 8,
                spontaneous_planned: 8,
                dominant_submissive: 6,
                adventurous: 9
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'flexible',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [24, 32],
                maxDistance: 18,
                dealbreakers: ['boring', 'closed_mindedness']
            }
        }
    },
    {
        id: 13,
        name: 'Zuzanna',
        age: 27,
        gender: 'female',
        location: { lat: 52.2300, lng: 21.0130 },
        avatar: 'assets/images/user3.jpg',
        bio: 'Artystyczna dusza z pasją do życia. Lubię spontaniczne wyjazdy i głębokie rozmowy.',
        active: true,
        lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3h temu
        online: false,
        verified: false,
        joinDate: new Date('2024-03-01').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'bisexual',
                experience: 'moderate',
                openness: 7,
                kinks: ['romantic', 'sensual', 'experimental'],
                frequency: 'moderate'
            },
            intimacy: {
                communicationStyle: 'thoughtful',
                emotionalConnection: 8,
                physicalTouch: 7,
                romanticLevel: 8
            },
            personality: {
                introvert_extrovert: 5,
                spontaneous_planned: 8,
                dominant_submissive: 4,
                adventurous: 8
            },
            lifestyle: {
                relationshipType: 'flexible',
                availability: 'moderate',
                drinking: 'socially',
                smoking: 'occasionally'
            },
            preferences: {
                ageRange: [23, 31],
                maxDistance: 12,
                dealbreakers: ['judgment', 'aggression']
            }
        }
    },
    {
        id: 14,
        name: 'Marcin',
        age: 34,
        gender: 'male',
        location: { lat: 52.2275, lng: 21.0090 },
        avatar: 'assets/images/user4.jpg',
        bio: 'Dojrzały mężczyzna, który wie czego chce. Szukam kobiety z klasą i pasją.',
        active: true,
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h temu
        online: false,
        verified: true,
        joinDate: new Date('2023-11-15').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'very_experienced',
                openness: 8,
                kinks: ['confident', 'sensual', 'passionate'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'assertive',
                emotionalConnection: 7,
                physicalTouch: 9,
                romanticLevel: 7
            },
            personality: {
                introvert_extrovert: 6,
                spontaneous_planned: 5,
                dominant_submissive: 7,
                adventurous: 7
            },
            lifestyle: {
                relationshipType: 'serious',
                availability: 'moderate',
                drinking: 'regularly',
                smoking: 'no'
            },
            preferences: {
                ageRange: [26, 35],
                maxDistance: 20,
                dealbreakers: ['drama', 'insecurity']
            }
        }
    },
    {
        id: 15,
        name: 'Aleksandra',
        age: 25,
        gender: 'female',
        location: { lat: 52.2335, lng: 21.0145 },
        avatar: 'assets/images/user5.jpg',
        bio: 'Młoda, pełna energii i ciekawa świata. Eksperymentuję i odkrywam siebie.',
        active: true,
        lastActive: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25min temu
        online: true,
        verified: false,
        joinDate: new Date('2024-02-20').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'bisexual',
                experience: 'exploring',
                openness: 9,
                kinks: ['experimental', 'curious', 'playful'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'open',
                emotionalConnection: 6,
                physicalTouch: 8,
                romanticLevel: 5
            },
            personality: {
                introvert_extrovert: 7,
                spontaneous_planned: 9,
                dominant_submissive: 5,
                adventurous: 9
            },
            lifestyle: {
                relationshipType: 'open',
                availability: 'very_flexible',
                drinking: 'socially',
                smoking: 'occasionally'
            },
            preferences: {
                ageRange: [22, 30],
                maxDistance: 25,
                dealbreakers: ['judgment', 'closed_mindedness']
            }
        }
    },
    {
        id: 16,
        name: 'Krzysztof',
        age: 28,
        gender: 'male',
        location: { lat: 52.2240, lng: 21.0115 },
        avatar: 'assets/images/user6.jpg',
        bio: 'Programista z duszą romantyka. Szukam kogoś, kto zrozumie moje pasje i pragnienia.',
        active: true,
        lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4h temu
        online: false,
        verified: true,
        joinDate: new Date('2024-01-22').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'moderate',
                openness: 6,
                kinks: ['romantic', 'intimate', 'thoughtful'],
                frequency: 'moderate'
            },
            intimacy: {
                communicationStyle: 'thoughtful',
                emotionalConnection: 9,
                physicalTouch: 7,
                romanticLevel: 9
            },
            personality: {
                introvert_extrovert: 4,
                spontaneous_planned: 3,
                dominant_submissive: 4,
                adventurous: 5
            },
            lifestyle: {
                relationshipType: 'serious',
                availability: 'moderate',
                drinking: 'occasionally',
                smoking: 'no'
            },
            preferences: {
                ageRange: [24, 30],
                maxDistance: 10,
                dealbreakers: ['superficiality', 'dishonesty']
            }
        }
    },
    {
        id: 17,
        name: 'Martyna',
        age: 30,
        gender: 'female',
        location: { lat: 52.2290, lng: 21.0075 },
        avatar: 'assets/images/user7.jpg',
        bio: 'Niezależna i pewna siebie. Wiem czego chcę i nie boję się o to walczyć.',
        active: true,
        lastActive: new Date(Date.now() - 50 * 60 * 1000).toISOString(), // 50min temu
        online: false,
        verified: true,
        joinDate: new Date('2023-12-28').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'experienced',
                openness: 8,
                kinks: ['confident', 'adventurous', 'spontaneous'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'assertive',
                emotionalConnection: 6,
                physicalTouch: 9,
                romanticLevel: 5
            },
            personality: {
                introvert_extrovert: 8,
                spontaneous_planned: 7,
                dominant_submissive: 7,
                adventurous: 8
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'flexible',
                drinking: 'regularly',
                smoking: 'no'
            },
            preferences: {
                ageRange: [26, 36],
                maxDistance: 18,
                dealbreakers: ['possessive', 'jealousy']
            }
        }
    },
    {
        id: 18,
        name: 'Paweł',
        age: 26,
        gender: 'male',
        location: { lat: 52.2310, lng: 21.0190 },
        avatar: 'assets/images/user8.jpg',
        bio: 'Student medycyny z pasją do życia. Szukam równowagi między nauką a przyjemnością.',
        active: true,
        lastActive: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7h temu
        online: false,
        verified: false,
        joinDate: new Date('2024-02-08').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'moderate',
                openness: 7,
                kinks: ['playful', 'romantic', 'sensual'],
                frequency: 'moderate'
            },
            intimacy: {
                communicationStyle: 'open',
                emotionalConnection: 7,
                physicalTouch: 8,
                romanticLevel: 7
            },
            personality: {
                introvert_extrovert: 6,
                spontaneous_planned: 5,
                dominant_submissive: 5,
                adventurous: 7
            },
            lifestyle: {
                relationshipType: 'flexible',
                availability: 'moderate',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [22, 29],
                maxDistance: 15,
                dealbreakers: ['drama', 'immaturity']
            }
        }
    },
    {
        id: 19,
        name: 'Julia',
        age: 32,
        gender: 'female',
        location: { lat: 52.2260, lng: 21.0125 },
        avatar: 'assets/images/user9.jpg',
        bio: 'Dojrzała kobieta, która wie jak cieszyć się życiem. Szukam partnera do wspólnych przygód.',
        active: true,
        lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1h temu
        online: false,
        verified: true,
        joinDate: new Date('2023-11-08').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'heterosexual',
                experience: 'very_experienced',
                openness: 9,
                kinks: ['passionate', 'confident', 'adventurous'],
                frequency: 'very_high'
            },
            intimacy: {
                communicationStyle: 'direct',
                emotionalConnection: 7,
                physicalTouch: 10,
                romanticLevel: 6
            },
            personality: {
                introvert_extrovert: 7,
                spontaneous_planned: 6,
                dominant_submissive: 6,
                adventurous: 8
            },
            lifestyle: {
                relationshipType: 'casual',
                availability: 'flexible',
                drinking: 'socially',
                smoking: 'no'
            },
            preferences: {
                ageRange: [28, 38],
                maxDistance: 20,
                dealbreakers: ['boring', 'passivity']
            }
        }
    },
    {
        id: 20,
        name: 'Dawid',
        age: 29,
        gender: 'male',
        location: { lat: 52.2285, lng: 21.0155 },
        avatar: 'assets/images/user10.jpg',
        bio: 'Muzyk i artysta. Szukam kogoś, kto podzieli moją pasję do sztuki i życia.',
        active: true,
        lastActive: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35min temu
        online: false,
        verified: true,
        joinDate: new Date('2024-01-30').toISOString(),
        questionnaire: {
            sexualPreferences: {
                orientation: 'bisexual',
                experience: 'experienced',
                openness: 9,
                kinks: ['experimental', 'playful', 'spontaneous'],
                frequency: 'high'
            },
            intimacy: {
                communicationStyle: 'playful',
                emotionalConnection: 7,
                physicalTouch: 8,
                romanticLevel: 6
            },
            personality: {
                introvert_extrovert: 7,
                spontaneous_planned: 9,
                dominant_submissive: 5,
                adventurous: 9
            },
            lifestyle: {
                relationshipType: 'open',
                availability: 'very_flexible',
                drinking: 'regularly',
                smoking: 'occasionally'
            },
            preferences: {
                ageRange: [24, 34],
                maxDistance: 25,
                dealbreakers: ['judgment', 'closed_mindedness']
            }
        }
    }
];

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
        description: 'Bądź szczery/a - to pomoże nam znaleźć idealnego partnera',
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
