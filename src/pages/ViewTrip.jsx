import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    MapPin, Calendar, Users, Wallet, Star, Clock, Ticket,
    Lightbulb, UtensilsCrossed, ChevronLeft, Share2, Download,
    Hotel, Navigation
} from 'lucide-react'

function ViewTrip() {
    const navigate = useNavigate()
    const [tripData, setTripData] = useState(null)

    useEffect(() => {
        const storedTrip = localStorage.getItem('currentTrip')
        if (storedTrip) {
            setTripData(JSON.parse(storedTrip))
        } else {
            navigate('/create-trip')
        }
    }, [navigate])

    if (!tripData) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="loader w-12 h-12"></div>
            </div>
        )
    }

    const { destination, summary, bestTimeToVisit, hotels, itinerary, localFood, travelTips, userInput } = tripData

    return (
        <div className="min-h-screen pt-20 pb-12">
            {/* Hero Banner */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-amber-600/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link
                            to="/create-trip"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Back to Planning</span>
                        </Link>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-3">
                            {destination || userInput?.destination}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                <span>{userInput?.days} Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-orange-500" />
                                <span>{userInput?.traveler?.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-orange-500" />
                                <span>{userInput?.budget?.title} Budget</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Summary */}
                {summary && (
                    <div className="glass rounded-2xl p-6 border border-white/10 mb-8 fade-in">
                        <p className="text-gray-300 text-lg leading-relaxed">{summary}</p>
                        {bestTimeToVisit && (
                            <p className="text-orange-500 font-medium mt-3">
                                🌤️ Best time to visit: {bestTimeToVisit}
                            </p>
                        )}
                    </div>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Hotels */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                                    <Hotel className="w-5 h-5 text-orange-500" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-white">Recommended Hotels</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {hotels?.map((hotel, index) => (
                                    <div
                                        key={index}
                                        className="glass rounded-xl p-5 border border-white/10 card-hover"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-white text-lg">{hotel.name}</h3>
                                            <div className="flex items-center gap-1 text-amber-400">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm">{hotel.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{hotel.address}</p>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{hotel.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-orange-500 font-bold text-lg">{hotel.pricePerNight}</span>
                                            <span className="text-gray-500 text-sm">/night</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Day-by-Day Itinerary */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                                    <Navigation className="w-5 h-5 text-orange-500" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-white">Day-by-Day Itinerary</h2>
                            </div>

                            <div className="space-y-6">
                                {itinerary?.map((day, dayIndex) => (
                                    <div key={dayIndex} className="fade-in" style={{ animationDelay: `${dayIndex * 0.1}s` }}>
                                        {/* Day Header */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                                                Day {day.day}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">{day.theme}</h3>
                                            </div>
                                        </div>

                                        {/* Places */}
                                        <div className="ml-7 pl-7 border-l-2 border-white/10 space-y-4">
                                            {day.places?.map((place, placeIndex) => (
                                                <div
                                                    key={placeIndex}
                                                    className="glass rounded-xl p-5 border border-white/10 card-hover relative"
                                                >
                                                    {/* Timeline Dot */}
                                                    <div className="absolute -left-[33px] top-6 w-3 h-3 rounded-full bg-orange-500"></div>

                                                    <div className="flex justify-between items-start mb-3">
                                                        <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-orange-500" />
                                                            {place.name}
                                                        </h4>
                                                        {place.rating && (
                                                            <div className="flex items-center gap-1 text-amber-400">
                                                                <Star className="w-4 h-4 fill-current" />
                                                                <span className="text-sm">{place.rating}</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <p className="text-gray-400 mb-4">{place.description}</p>

                                                    <div className="flex flex-wrap gap-3">
                                                        {place.bestTime && (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300">
                                                                <Clock className="w-3.5 h-3.5 text-orange-500" />
                                                                {place.bestTime}
                                                            </span>
                                                        )}
                                                        {place.duration && (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300">
                                                                ⏱️ {place.duration}
                                                            </span>
                                                        )}
                                                        {place.ticketPrice && (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300">
                                                                <Ticket className="w-3.5 h-3.5 text-orange-500" />
                                                                {place.ticketPrice}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {place.tips && (
                                                        <div className="mt-4 pt-4 border-t border-white/5">
                                                            <p className="text-sm text-gray-500 flex items-start gap-2">
                                                                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                                                {place.tips}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Actions */}
                        <div className="glass rounded-xl p-5 border border-white/10">
                            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    Share Trip
                                </button>
                                <button className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium flex items-center justify-center gap-2 transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                            </div>
                        </div>

                        {/* Local Food */}
                        {localFood && localFood.length > 0 && (
                            <div className="glass rounded-xl p-5 border border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <UtensilsCrossed className="w-5 h-5 text-orange-500" />
                                    <h3 className="font-semibold text-white">Must-Try Food</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {localFood.map((food, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm"
                                        >
                                            {food}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Travel Tips */}
                        {travelTips && travelTips.length > 0 && (
                            <div className="glass rounded-xl p-5 border border-white/10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Lightbulb className="w-5 h-5 text-amber-500" />
                                    <h3 className="font-semibold text-white">Travel Tips</h3>
                                </div>
                                <ul className="space-y-3">
                                    {travelTips.map((tip, index) => (
                                        <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                                            <span className="text-orange-500 mt-1">•</span>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* New Trip Button */}
                        <Link
                            to="/create-trip"
                            className="btn-primary w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                        >
                            Plan Another Trip
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTrip
