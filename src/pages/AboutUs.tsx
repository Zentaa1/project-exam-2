import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-primary">
        <Helmet>
            <title>About Us - StayNest</title>
            <meta name="description" content="About us at staynest"/>
        </Helmet>
    <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Stayest</h1>
        <p className="text-lg mb-6 text-gray-700">
            Stayest is your go-to platform for booking unique, beautiful, and affordable homes and experiences around the world.
        </p>
    </div>

    <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center mx-auto max-w-2xl">
            At Stayest, our mission is to connect travelers with hosts offering unique stays. Whether you're looking for a cozy apartment in the city or a tranquil getaway in the countryside, we have something for everyone. We believe that every journey should be memorable, and it all starts with the perfect place to stay.
        </p>
    </section>

    <section className="bg-gray-100 py-8 mb-12">
        <h2 className="text-3xl font-semibold text-center mb-4">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-2">Find Your Perfect Stay</h3>
                <p className="text-center text-gray-700 mb-4">
                    Browse through thousands of listings, filter by location, price, and amenities, and find the perfect home that suits your needs.
                </p>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-2">Book with Confidence</h3>
                <p className="text-center text-gray-700 mb-4">
                    Once you've found your ideal stay, simply book it with just a few clicks. Our platform ensures that all transactions are secure, so you can relax and focus on your trip.
                </p>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold mb-2">Enjoy Your Stay</h3>
                <p className="text-center text-gray-700 mb-4">
                    When you arrive, you’ll experience the magic of your destination, knowing that Stayest has your back with 24/7 support should you need it.
                </p>
            </div>
        </div>
    </section>

    <section>
        <h2 className="text-3xl font-semibold text-center mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">Trust</h3>
                <p className="text-lg text-gray-700">
                    We value the trust of our users. Every host is carefully vetted to ensure a safe and reliable experience for travelers.
                </p>
            </div>
            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">Community</h3>
                <p className="text-lg text-gray-700">
                    Stayest is built on the foundation of community. We want to connect people from all over the world, creating memorable experiences through shared spaces.
                </p>
            </div>
            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">Quality</h3>
                <p className="text-lg text-gray-700">
                    We believe in offering only the best experiences. Our hosts are dedicated to providing quality stays with comfort and care.
                </p>
            </div>
        </div>
    </section>

    <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Stayest Community</h2>
        <p className="text-lg text-gray-700 mb-6">
            Whether you’re a traveler looking for your next adventure or a host with a unique property to share, Stayest is the place for you.
        </p>
        <Link to='/register' className="bg-customOrange text-primary font-bold py-2 px-6 rounded-md">
            Join Us Today
        </Link>
    </section>
</div>
  )
}

export default AboutUs