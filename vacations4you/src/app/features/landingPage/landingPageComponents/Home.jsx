import BookingSteps from "./BookingSteps"
import HeroSection from "./HeroSection"
import Services from "./Services"
import Testimonials from "./Testimonials"
import TopDestination from "./TopDestination"

const Home = () => {
    return (
        <>
            <HeroSection />
            <Services />
            <TopDestination />
            <BookingSteps />
            <Testimonials />
        </>
    )
}

export default Home