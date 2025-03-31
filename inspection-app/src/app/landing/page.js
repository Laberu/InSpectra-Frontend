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
      <div id="hero" className="hero-section">
        <div className="hero-content">
          <h1>Elevate Asset Management with AI-Powered Inspections</h1>
          <p>
            InSpectra’s cloud-based inspection portal ties building owners and
            engineers closer with accurate, real-time data and insights that
            identify critical areas of concern. With AI Defect Detection
            capabilities, you can streamline reporting, reduce exterior damage
            faster, and see more accurately than traditional methods.
          </p>
          <button className="hero-cta" onClick={() => router.push("/register")}>
            Get Started
          </button>
        </div>
        <div className="hero-image-container">
          <img src="/bridge.png" alt="Bridge" className="hero-image" />
        </div>
      </div>
      <div id="partners" className="key-partners-section">
        <KeyPartners />
      </div>
      <div id="features" className="features-section">
        <div className="features-content">
          <h2>Powerful AI inspection</h2>
          <p>
          High-resolution orthomosaic maps using drone technology
          </p>
        </div>
        <div className="features-image-container">
          <img src="/inspection.png" alt="Feature showcase" className="features-image" />
        </div>
      </div>
      <div className="features-section reverse">
        <div className="features-image-container">
          <img src="/inspection2.png" alt="AI Inspection" className="features-image" />
        </div>
        <div className="features-content">
          <h2>3D Modeling and Data Analysis</h2>
          <p>
            High-resolution orthomosaic maps using drone technology, delivering accurate
          </p>
        </div>
        
        <div id="usecases" className="usecase-section">

        <div className="usecase-container">
          <h2 className="usecase-title">USE CASE</h2>
          <p className="usecase-subtitle">
            Trusted by key partners, we help protect their structures with innovative solutions and reliable support.
          </p>

          <div className="usecase-grid">
            {[
              { img: "/Building image.png", label: "Building" },
              { img: "/Bridge image.png", label: "Bridge" },
              { img: "/Dam image.png", label: "Dam" },
              { img: "/Footing image.png", label: "Footing" },
              { img: "/Stupa image.png", label: "Stupa" },
              { img: "/Special Building image.png", label: "Special Building" },
              { img: "/Factory image.png", label: "Factory" },
              { img: "/Dam Hazardous Area image.png", label: "Dam (Hazardous Area)" },
            ].map((item, i) => (
              <div key={i} className="usecase-card">
                <img src={item.img} alt={item.label} className="usecase-image" />
                <p className="usecase-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      </div>
      <div id="footer" className="footer-section">
        <Footer />
      </div>
    </>
  );
}
