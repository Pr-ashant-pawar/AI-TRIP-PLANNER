import { Link } from 'react-router-dom'
import { Sparkles, MapPin, Calendar, Compass, Wallet, ArrowRight, Star, Users, Code, Heart } from 'lucide-react'

// Destination data with Unsplash images
const DESTINATIONS = [
    { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop', tag: 'Pink City' },
    { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop', tag: 'Beaches' },
    { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=300&fit=crop', tag: 'Backwaters' },
    { name: 'Varanasi', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop', tag: 'Spiritual' },
    { name: 'Udaipur', image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=400&h=300&fit=crop', tag: 'Lakes' },
    { name: 'Ladakh', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&h=300&fit=crop', tag: 'Adventure' }
]

const FEATURES = [
    { icon: Sparkles, title: 'AI-Powered', desc: 'Smart itineraries crafted by AI' },
    { icon: MapPin, title: '100+ Destinations', desc: 'Explore all of India' },
    { icon: Calendar, title: 'Day-by-Day Plans', desc: 'Detailed daily schedules' },
    { icon: Wallet, title: 'Budget Friendly', desc: 'Options for every budget' }
]

const STEPS = [
    { num: '01', title: 'Choose Destination', desc: 'Select from popular Indian destinations or enter your own' },
    { num: '02', title: 'Set Preferences', desc: 'Tell us your travel style, budget, and trip duration' },
    { num: '03', title: 'Get Your Plan', desc: 'Receive a complete AI-generated itinerary instantly' }
]

// Team members who built this project
const TEAM = [
    { name: 'Prashant Pawar', role: 'Lead Developer' },
    { name: 'Nitish Yadav', role: 'Developer' },
    { name: 'Akshay Gholve', role: 'Developer' },
    { name: 'Atharva Badgu', role: 'Developer' },
    { name: 'Shantanu Kalhapure', role: 'Developer' },
    { name: 'Omkar Sase', role: 'Developer' }
]

function Hero() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6 fade-in">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-medium">AI-Powered Travel Planning</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight fade-in">
                            Discover{' '}
                            <span className="gradient-text">Incredible India</span>
                            <br />
                            <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-400">Your Perfect Trip Awaits</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto fade-in">
                            Plan your dream vacation with our AI-powered trip planner. Get personalized itineraries,
                            hotel recommendations, and local insights for any destination in India.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 fade-in">
                            <Link
                                to="/signup"
                                className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                            >
                                <span>Start Planning</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                to="/create-trip"
                                className="px-8 py-4 rounded-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/5 transition-colors w-full sm:w-auto text-center"
                            >
                                Try Without Account
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-8 sm:gap-12 text-center fade-in">
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                                <div className="text-sm text-gray-500">Trips Planned</div>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
                                <div className="text-sm text-gray-500">Destinations</div>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-amber-500 fill-current" />
                                <span className="text-2xl sm:text-3xl font-bold text-white">4.9</span>
                                <span className="text-sm text-gray-500 ml-1">Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-dark-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                            Popular Destinations
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Explore the most beautiful places in India
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {DESTINATIONS.map((dest, index) => (
                            <Link
                                key={index}
                                to="/create-trip"
                                className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-hover"
                            >
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                    <span className="inline-block px-2 py-1 rounded-full bg-orange-500/80 text-white text-xs mb-2">
                                        {dest.tag}
                                    </span>
                                    <h3 className="text-lg sm:text-xl font-bold text-white">{dest.name}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                            Why Choose Us
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Everything you need for a perfect trip
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURES.map((feature, index) => (
                            <div
                                key={index}
                                className="glass rounded-2xl p-6 border border-white/10 text-center card-hover"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-7 h-7 text-orange-500" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-200/50 to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Plan your trip in 3 simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {STEPS.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="glass rounded-2xl p-8 border border-white/10">
                                    <div className="text-5xl font-bold text-orange-500/20 mb-4">{step.num}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-400">{step.desc}</p>
                                </div>
                                {index < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                            <Code className="w-4 h-4 text-orange-500" />
                            <span className="text-orange-400 text-sm font-medium">Meet The Team</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                            Built With <Heart className="inline w-8 h-8 text-red-500 fill-current" /> By
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {TEAM.map((member, index) => (
                            <div
                                key={index}
                                className="glass rounded-xl p-4 border border-white/10 text-center card-hover"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-xl font-bold text-white">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-white text-sm mb-1">{member.name}</h3>
                                <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="glass rounded-3xl p-8 sm:p-12 border border-white/10 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10"></div>
                        <div className="relative">
                            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                Create your personalized travel itinerary in minutes with our AI-powered planner.
                            </p>
                            <Link
                                to="/create-trip"
                                className="btn-primary px-8 py-4 rounded-xl text-white font-semibold text-lg inline-flex items-center gap-2"
                            >
                                <Compass className="w-5 h-5" />
                                <span>Plan My Trip Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-500 text-sm">
                        © 2025 IndiaTrip. Made with ❤️ in India.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Hero
