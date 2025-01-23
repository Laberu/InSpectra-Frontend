// src/components/HeroSection.js
export default function HeroSection() {
    return (
      <section style={styles.heroSection}>
        <div style={styles.content}>
          <div style={styles.logoAndText}>
            <div style={styles.logoContainer}>
              <img src="/assets/logo.png" alt="IIMRaS Logo" style={styles.logo} />
            </div>
            <div style={styles.textContainer}>
              <h1 style={styles.title}>IIMRaS</h1>
              <p style={styles.subtitle1}>
                Research Unit of Infrastructure Inspection,<br />Monitoring, Repair and Strengthening
              </p>
              <p style={styles.subtitle2}>
                หน่วยวิจัยการตรวจสอบ การซ่อมแซมและเสริมสร้างโครงสร้างพื้นฐาน
              </p>
              <p style={styles.subtitle1}>
                ตรวจสอบโครงสร้างแบบครบวงจร
              </p>
              <p style={styles.description}>
                 IIMRaS ที่ให้บริการด้านงานตรวจสอบโครงสร้างที่ครอบคลุมทุกด้าน...
              </p>
            </div>
          </div>
          <button style={styles.learnMoreButton}>Learn More →</button>
        </div>
      </section>
    );
  }
  
  const styles = {
    heroSection: {
      height: '1080px', // Set height to 1080px
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '60px 20px',
      backgroundColor: '#1C1C1E',
      fontFamily: "'Inter', sans-serif",
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '1400px',
      textAlign: 'center',
    },
    logoAndText: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    },
    logoContainer: {
      flex: '1 1 350px',
      display: 'flex',
      justifyContent: 'center',
    },
    logo: {
      width: '100%',
      maxWidth: '350px',
    },
    textContainer: {
      flex: '1 1 600px',
      color: '#D1D1D1',
      textAlign: 'left', // Align text to the left side of the container
      marginBottom: '90px',
    },
    title: {
      fontSize: '72px',
      fontWeight: '700',
      color: '#E63946', // Red color for "IIMRaS"
    },
    subtitle1: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#FFFFFF', // White
      lineHeight: '30px',


    },
    subtitle2: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#FFB400', // Yellow for emphasis
        marginTop: '10px',
      },
    description: {
      fontSize: '16px',
      color: '#A9A9A9',
      lineHeight: '1.6',
      marginTop: '10px',
    },
    learnMoreButton: {
      marginTop: '50px', // Add space between text and button
      backgroundColor: '#E63946',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
      alignSelf: 'center', // Center the button horizontally
    },
  };
  