"use client";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import KeyPartners from "../../components/KeyPartners";
import Footer from "../../components/Footer";
import "./landing.css";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Elevate Asset Management with AI-Powered Inspections</h1>
          <p>
            InSpectra’s cloud-based inspection portal ties building owners and
            engineers closer with accurate, real-time data and insights that
            identify critical areas of concern. With AI Defect Detection
            capabilities, you can streamline reporting, reduce exterior damage
            faster, and see more accurately than traditional methods.
          </p>
          <button className="hero-cta" onClick={() => router.push("/login")}>
            Demo
          </button>
        </div>
        <div className="hero-image-container">
          <img src="/bridge.png" alt="Bridge" className="hero-image" />
        </div>
      </div>
      <div className="key-partners-section">
        <KeyPartners />
      </div>
      <Footer />
    </>
  );
}
