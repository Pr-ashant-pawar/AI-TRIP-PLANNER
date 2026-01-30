// Popular Indian Destinations
export const DESTINATIONS = [
    "Jaipur, Rajasthan",
    "Goa",
    "Agra, Uttar Pradesh",
    "Varanasi, Uttar Pradesh",
    "Udaipur, Rajasthan",
    "Mumbai, Maharashtra",
    "Delhi",
    "Rishikesh, Uttarakhand",
    "Manali, Himachal Pradesh",
    "Shimla, Himachal Pradesh",
    "Kerala Backwaters",
    "Darjeeling, West Bengal",
    "Mysore, Karnataka",
    "Hampi, Karnataka",
    "Amritsar, Punjab",
    "Jodhpur, Rajasthan",
    "Jaisalmer, Rajasthan",
    "Leh Ladakh",
    "Ooty, Tamil Nadu",
    "Pondicherry",
    "Khajuraho, Madhya Pradesh",
    "Ranthambore, Rajasthan",
    "Coorg, Karnataka",
    "Andaman Islands",
    "Mount Abu, Rajasthan"
]

// Traveler Options  
export const TRAVELERS = [
    {
        id: 'solo',
        title: 'Solo',
        desc: 'Traveling alone',
        icon: '🎒',
        people: '1 person'
    },
    {
        id: 'couple',
        title: 'Couple',
        desc: 'Romantic getaway',
        icon: '💑',
        people: '2 people'
    },
    {
        id: 'family',
        title: 'Family',
        desc: 'Fun with family',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5 people'
    },
    {
        id: 'friends',
        title: 'Friends',
        desc: 'Adventure squad',
        icon: '👯',
        people: '5-10 people'
    }
]

// Budget Options
export const BUDGETS = [
    {
        id: 'budget',
        title: 'Budget',
        desc: 'Cost-conscious',
        icon: '💵',
        range: '₹1,000-3,000/day'
    },
    {
        id: 'moderate',
        title: 'Moderate',
        desc: 'Balanced spending',
        icon: '💰',
        range: '₹3,000-8,000/day'
    },
    {
        id: 'luxury',
        title: 'Luxury',
        desc: 'Premium experience',
        icon: '💎',
        range: '₹8,000+/day'
    }
]

// AI Prompt Template
export const AI_PROMPT = `Generate a comprehensive travel plan for Location: {destination}, India
for {days} Days for {traveler} with a {budget} budget.

You MUST respond with ONLY valid JSON in this exact format:
{
  "destination": "City Name",
  "summary": "Brief 2-3 sentence overview of the destination",
  "bestTimeToVisit": "Best months to visit",
  "hotels": [
    {
      "name": "Hotel Name",
      "address": "Full address",
      "pricePerNight": "₹2000-4000",
      "rating": 4.5,
      "description": "Brief hotel description",
      "imageUrl": "placeholder"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "theme": "Theme for the day",
      "places": [
        {
          "name": "Place Name",
          "description": "Detailed description (2-3 sentences)",
          "bestTime": "Morning/Afternoon/Evening",
          "duration": "2-3 hours",
          "ticketPrice": "₹50 or Free",
          "rating": 4.7,
          "imageUrl": "placeholder",
          "tips": "Useful tip for visitors"
        }
      ]
    }
  ],
  "localFood": ["List of must-try local dishes"],
  "travelTips": ["List of important travel tips"]
}

Requirements:
1. Include 3-4 hotel options suitable for {budget} budget
2. Create detailed itinerary for all {days} days
3. Each day should have 3-4 places to visit
4. Include real, famous tourist attractions
5. All prices in Indian Rupees (₹)
6. Make it specific to Indian culture

Return ONLY valid JSON, no markdown.`
