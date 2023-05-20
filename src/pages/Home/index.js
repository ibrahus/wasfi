import { useState } from 'react'
import Nav from "../../components/Nav"
import Main from "../../components/Main"
import Generating from "../../components/Generating"
import Pricing from "../../components/Pricing"
import Footer from "../../components/Footer"
import Features from "../../components/Features"


export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <Nav />
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <Main />
                <div id="Generating">
                    <Generating />
                </div>
                <div id="Features">
                    <Features />
                </div>
                <div id="Pricing">
                    <Pricing />
                </div>
            </div>
            <Footer />
        </div>
    )
}

