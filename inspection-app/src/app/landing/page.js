// src/app/landing/page.js
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from '../../components/HeroSection';
import CardSection from '../../components/CardSection';
import ContentSection from '../../components/ContentSection';
import DeliverSection from '@/components/DeliverSection';
import TeamSection from '@/components/TeamSection';

export default function Landing() {
  return (
    <div className="full-screen-wrapper">
        <Navbar />
        <main>
            <HeroSection />
            <CardSection />
            <ContentSection />
            <ContentSection />
            <ContentSection />
            <DeliverSection />
            <TeamSection />
        </main>
        <Footer />
    </div>
  );
}
