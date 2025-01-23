// src/components/CardSection.js
export default function CardSection() {
    const cards = [
      {
        image: '/images/card1.jpg',
        title: 'สร้างแบบจำลอง 3 มิติ ด้วยเทคนิคการประมวลผลข้อมูลที่มีความแม่นยำที่สุด',
        buttonText: 'See more',
      },
      {
        image: '/images/card2.jpg',
        title: 'ตรวจสอบความเปลี่ยนแปลงด้วยเทคโนโลยี 3D อย่างแม่นยำ',
        buttonText: 'See more',
      },
      {
        image: '/images/card3.jpg',
        title: 'ตรวจหาความเสียหายบนโครงสร้างด้วยปัญญาประดิษฐ์ (AI)',
        buttonText: 'See more',
      },
      {
        image: '/images/card4.jpg',
        title: 'รายงานผลการตรวจสอบด้วยระบบสามมิติเสมือนจริง',
        buttonText: 'See more',
      },
    ];
  
    return (
      <section style={styles.cardSection}>
        <div style={styles.cardContainer}>
          {cards.map((card, index) => (
            <div key={index} style={styles.card}>
              <img src={card.image} alt={card.title} style={styles.image} />
              <div style={styles.overlay}>
                <h3 style={styles.title}>{card.title}</h3>
                <button style={styles.button}>{card.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  const styles = {
    cardSection: {
      padding: '60px 20px',
      backgroundColor: '#1C1C1E',
      display: 'flex',
      justifyContent: 'center',
    },
    cardContainer: {
      display: 'flex',
      gap: '20px',
      maxWidth: '1400px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    card: {
      position: 'relative',
      width: '320px',
      height: '400px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    overlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: 'white',
      textAlign: 'center',
    },
    title: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '20px',
      fontFamily: "'Inter', sans-serif",
    },
    button: {
      backgroundColor: '#E63946',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
      fontFamily: "'Inter', sans-serif",
    },
  };
  