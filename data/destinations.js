// Destination-specific packages data
const destinationsData = {
    Paris: {
        name: "Paris, France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920",
        description: "The City of Light awaits you with its iconic Eiffel Tower, world-class museums, and charming streets.",
        basePrice: 800,
        accommodation: [
            { name: "Budget Hostel in Montmartre", price: 60, description: "Shared rooms, basic amenities, great location" },
            { name: "3-Star Hotel near Champs-Élysées", price: 180, description: "Comfortable rooms, breakfast included, city center" },
            { name: "5-Star Luxury Hotel with Eiffel Tower View", price: 450, description: "Premium amenities, spa access, iconic views" }
        ],
        travel: [
            { name: "Economy Flight", price: 500, description: "Standard seating, meals included" },
            { name: "Business Class Flight", price: 1200, description: "Extra legroom, priority boarding" },
            { name: "First Class Flight", price: 2500, description: "Luxury seating, premium service" },
            { name: "Eurostar Train from London", price: 150, description: "High-speed train, scenic journey" }
        ],
        food: [
            { name: "French Bistro Tour", price: 120, description: "3-hour guided tour, 5+ authentic French dishes" },
            { name: "Michelin-Starred Restaurant Experience", price: 350, description: "5-course meal at Le Jules Verne" },
            { name: "Parisian Street Food Adventure", price: 80, description: "Local markets, crepes, pastries" },
            { name: "Wine Tasting & Cheese Pairing", price: 200, description: "French wines and artisanal cheeses" },
            { name: "Daily Breakfast at Hotel", price: 100, description: "Continental breakfast, 7 days" }
        ],
        activities: [
            { name: "Louvre Museum Skip-the-Line Tour", price: 150, description: "Guided tour, all major artworks" },
            { name: "Eiffel Tower & Seine River Cruise", price: 180, description: "Tower access + 1-hour cruise" },
            { name: "Versailles Palace Day Trip", price: 220, description: "Full-day tour, gardens included" },
            { name: "Montmartre Art & Culture Walk", price: 90, description: "Sacre-Coeur, artists' square" },
            { name: "Paris Night Tour with Dinner", price: 250, description: "Evening tour, fine dining experience" }
        ]
    },
    Tokyo: {
        name: "Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920",
        description: "A mesmerizing blend of ancient traditions and cutting-edge technology.",
        basePrice: 1200,
        accommodation: [
            { name: "Capsule Hotel Experience", price: 50, description: "Unique Japanese capsule hotel, central location" },
            { name: "Traditional Ryokan", price: 200, description: "Authentic Japanese inn, tatami rooms, onsen" },
            { name: "5-Star Modern Hotel in Shibuya", price: 400, description: "Luxury amenities, city views, premium service" }
        ],
        travel: [
            { name: "Economy Flight", price: 800, description: "Standard seating, meals included" },
            { name: "Business Class Flight", price: 1800, description: "Extra legroom, premium meals" },
            { name: "First Class Flight", price: 3500, description: "Luxury seating, private suites" },
            { name: "Japan Rail Pass (7 days)", price: 300, description: "Unlimited train travel across Japan" }
        ],
        food: [
            { name: "Sushi Making Class & Tsukiji Market Tour", price: 180, description: "Learn to make sushi, visit famous market" },
            { name: "Kaiseki Fine Dining Experience", price: 400, description: "Traditional multi-course Japanese meal" },
            { name: "Ramen & Street Food Tour", price: 100, description: "Best ramen shops, local street food" },
            { name: "Sake Tasting Experience", price: 150, description: "Premium sake tasting, 10+ varieties" },
            { name: "Daily Japanese Breakfast", price: 120, description: "Traditional breakfast, 7 days" }
        ],
        activities: [
            { name: "Tokyo City Highlights Tour", price: 200, description: "Shibuya, Harajuku, Asakusa, Meiji Shrine" },
            { name: "Mt. Fuji Day Trip", price: 280, description: "Full-day tour, 5th station, hot springs" },
            { name: "Traditional Tea Ceremony & Kimono Experience", price: 150, description: "Authentic tea ceremony, wear kimono" },
            { name: "Tokyo Skytree & Sumo Wrestling Show", price: 220, description: "Observation deck + sumo experience" },
            { name: "Cherry Blossom Viewing Tour (Seasonal)", price: 180, description: "Best sakura spots, hanami picnic" }
        ]
    },
    Rome: {
        name: "Rome, Italy",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=1920",
        description: "Step into history as you wander through ancient ruins, magnificent churches, and piazzas.",
        basePrice: 900,
        accommodation: [
            { name: "Budget Hostel near Termini", price: 70, description: "Basic amenities, great transport links" },
            { name: "Boutique Hotel in Trastevere", price: 200, description: "Charming neighborhood, authentic atmosphere" },
            { name: "5-Star Luxury Hotel near Spanish Steps", price: 500, description: "Historic building, rooftop terrace, spa" }
        ],
        travel: [
            { name: "Economy Flight", price: 600, description: "Standard seating, meals included" },
            { name: "Business Class Flight", price: 1400, description: "Extra legroom, premium service" },
            { name: "First Class Flight", price: 2800, description: "Luxury seating, fine dining" },
            { name: "High-Speed Train from Milan", price: 80, description: "Comfortable journey, scenic views" }
        ],
        food: [
            { name: "Authentic Italian Cooking Class", price: 150, description: "Learn to make pasta, pizza, tiramisu" },
            { name: "Michelin-Starred Roman Cuisine", price: 300, description: "Fine dining, traditional recipes" },
            { name: "Trastevere Food & Wine Tour", price: 120, description: "Local trattorias, wine tastings" },
            { name: "Gelato & Coffee Tasting Tour", price: 80, description: "Best gelaterias, espresso bars" },
            { name: "Daily Italian Breakfast", price: 90, description: "Cappuccino, pastries, 7 days" }
        ],
        activities: [
            { name: "Colosseum & Ancient Rome Tour", price: 180, description: "Skip-the-line, guided tour, Forum included" },
            { name: "Vatican City & Sistine Chapel", price: 200, description: "Museums, St. Peter's Basilica" },
            { name: "Roman Catacombs & Appian Way", price: 150, description: "Underground tour, ancient road" },
            { name: "Tivoli Gardens Day Trip", price: 220, description: "Villa d'Este, Hadrian's Villa" },
            { name: "Rome by Night Tour with Dinner", price: 250, description: "Evening walk, traditional dinner" }
        ]
    },
    Bali: {
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920",
        description: "Tropical paradise with stunning beaches, lush rice terraces, and rich cultural heritage.",
        basePrice: 600,
        accommodation: [
            { name: "Beachside Bungalow", price: 80, description: "Simple bungalow, beach access, basic amenities" },
            { name: "4-Star Resort in Ubud", price: 180, description: "Pool, spa, rice terrace views" },
            { name: "5-Star Luxury Beachfront Villa", price: 400, description: "Private pool, butler service, ocean views" }
        ],
        travel: [
            { name: "Economy Flight", price: 700, description: "Standard seating, meals included" },
            { name: "Business Class Flight", price: 1600, description: "Extra legroom, premium service" },
            { name: "First Class Flight", price: 3200, description: "Luxury seating, lie-flat beds" },
            { name: "Domestic Flight + Transfer", price: 150, description: "Airport transfers, local flights" }
        ],
        food: [
            { name: "Balinese Cooking Class", price: 100, description: "Learn traditional recipes, market visit" },
            { name: "Beachfront Seafood Dinner", price: 180, description: "Fresh seafood, sunset views" },
            { name: "Warung Food Tour", price: 70, description: "Local warungs, authentic flavors" },
            { name: "Organic Farm to Table Experience", price: 120, description: "Farm visit, organic meal" },
            { name: "Daily Breakfast Buffet", price: 80, description: "Tropical fruits, local dishes, 7 days" }
        ],
        activities: [
            { name: "Ubud Rice Terraces & Monkey Forest", price: 120, description: "Tegalalang terraces, monkey sanctuary" },
            { name: "Water Sports Package", price: 200, description: "Snorkeling, surfing, jet skiing" },
            { name: "Temple Tour & Traditional Dance", price: 150, description: "Tanah Lot, Uluwatu, Kecak dance" },
            { name: "Volcano Sunrise Trekking", price: 180, description: "Mount Batur, sunrise views" },
            { name: "Spa & Wellness Retreat Day", price: 250, description: "Full-day spa, yoga, meditation" }
        ]
    },
    Santorini: {
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920",
        description: "White-washed buildings perched on cliffs overlooking the azure Aegean Sea.",
        basePrice: 1000,
        accommodation: [
            { name: "Budget Hotel in Fira", price: 100, description: "Basic rooms, central location" },
            { name: "Cave Hotel in Oia", price: 300, description: "Traditional cave rooms, sunset views" },
            { name: "5-Star Luxury Cliffside Resort", price: 600, description: "Infinity pool, private terrace, butler service" }
        ],
        travel: [
            { name: "Economy Flight", price: 650, description: "Standard seating, meals included" },
            { name: "Business Class Flight", price: 1500, description: "Extra legroom, premium service" },
            { name: "First Class Flight", price: 3000, description: "Luxury seating, fine dining" },
            { name: "Ferry from Athens", price: 100, description: "Scenic ferry ride, 5 hours" }
        ],
        food: [
            { name: "Greek Cooking Class", price: 140, description: "Learn moussaka, souvlaki, baklava" },
            { name: "Sunset Dinner in Oia", price: 280, description: "Fine dining, world's best sunset views" },
            { name: "Local Taverna Food Tour", price: 100, description: "Traditional Greek dishes, wine" },
            { name: "Wine Tasting Tour", price: 150, description: "Santorini wines, volcanic soil vineyards" },
            { name: "Daily Greek Breakfast", price: 110, description: "Yogurt, honey, olives, 7 days" }
        ],
        activities: [
            { name: "Santorini Highlights Tour", price: 180, description: "Oia, Fira, Red Beach, Akrotiri" },
            { name: "Sunset Catamaran Cruise", price: 220, description: "5-hour cruise, swimming, dinner" },
            { name: "Ancient Akrotiri Excavation Site", price: 120, description: "Minoan ruins, guided tour" },
            { name: "Wine Tasting & Vineyard Tour", price: 150, description: "3 wineries, local wines" },
            { name: "Volcano & Hot Springs Tour", price: 200, description: "Boat tour, hot springs swim" }
        ]
    },
    Dubai: {
        name: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920",
        description: "A futuristic city where luxury meets innovation in the heart of the desert.",
        basePrice: 1100,
        accommodation: [
            { name: "Budget Hotel in Deira", price: 120, description: "Basic amenities, old Dubai location" },
            { name: "4-Star Hotel in Downtown", price: 250, description: "Burj Khalifa views, modern amenities" },
            { name: "7-Star Burj Al Arab Experience", price: 800, description: "Ultra-luxury, iconic sail-shaped hotel" }
        ],
        travel: [
            { name: "Economy Flight", price: 750, description: "Standard seating, meals included" },
            { name: "Business Class Flight", price: 1800, description: "Extra legroom, premium service" },
            { name: "First Class Flight", price: 3500, description: "Private suites, shower spa, fine dining" },
            { name: "Luxury Airport Transfer", price: 200, description: "Limousine service, VIP lounge" }
        ],
        food: [
            { name: "Desert Dinner Experience", price: 250, description: "BBQ dinner, camel rides, belly dancing" },
            { name: "Burj Al Arab Afternoon Tea", price: 400, description: "Luxury afternoon tea, 7-star hotel" },
            { name: "Dubai Food Tour", price: 150, description: "Emirati cuisine, Middle Eastern flavors" },
            { name: "Dhow Cruise Dinner", price: 180, description: "Traditional boat, buffet dinner, views" },
            { name: "Daily Breakfast Buffet", price: 130, description: "International buffet, 7 days" }
        ],
        activities: [
            { name: "Burj Khalifa & Dubai Mall", price: 200, description: "At the Top, aquarium, shopping" },
            { name: "Desert Safari Adventure", price: 180, description: "Dune bashing, camel rides, BBQ" },
            { name: "Palm Jumeirah & Atlantis", price: 250, description: "Aquaventure waterpark, Lost Chambers" },
            { name: "Dubai Marina Yacht Tour", price: 300, description: "2-hour yacht cruise, luxury experience" },
            { name: "Gold Souk & Spice Souk Tour", price: 100, description: "Traditional markets, cultural experience" }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = destinationsData;
}

