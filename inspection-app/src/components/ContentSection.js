// src/components/ContentSection.js
export default function ContentSection() {
    return (
      <section style={styles.section}>
        <div style={styles.contentContainer}>
          <div style={styles.header}>
            <h2 style={styles.title}>สร้างแบบจำลอง 3 มิติ ด้วยเทคนิคการประมวลผลข้อมูลที่มีความแม่นยำที่สุด</h2>
            <div style={styles.separator}></div>
          </div>
          <div style={styles.content}>
            <div style={styles.imagePlaceholder}>
              <img src="/images/placeholder.png" alt="Data collection" style={styles.image} />
            </div>
            <div style={styles.textContent}>
              <h3 style={styles.subTitle}>Data collection and 3D modeling</h3>
              <p style={styles.description}>
                “IIMRaS เป็นผู้นำด้านการสำรวจจากภาพถ่ายในประเทศไทย สร้างแบบจำลอง 3 มิติ ด้วยเทคนิคการประมวลผลข้อมูลที่มีความแม่นยำที่สุด
                พร้อมทั้งช่วยลดต้นทุนและเวลาในการสำรวจ ช่วยให้วางแผนและออกแบบโครงร่างได้อย่างมีประสิทธิภาพ”
              </p>
              <h4 style={styles.bulletTitle}>ผู้นำด้านการสำรวจโครงสร้างจากภาพถ่าย</h4>
              <ul style={styles.bulletPoints}>
                <li>IIMRaS เป็นทีมที่มีความเชี่ยวชาญในการสำรวจข้อมูลจากภาพถ่าย</li>
                <li>ใช้เทคนิคการประมวลผลข้อมูลที่มีความแม่นยำสูงเพื่อสร้างโมเดลสามมิติ</li>
                <li>กระบวนการช่วยลดค่าใช้จ่ายและระยะเวลาในการดำเนินการสำรวจ</li>
                <li>เทคโนโลยีช่วยให้การวางแผนและออกแบบโครงร่างมีประสิทธิภาพมากขึ้น</li>
              </ul>
              <button style={styles.button}>See more</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  const styles = {
    section: {
    //   width: '100vw', // Full width of the viewport
      backgroundColor: '#F5F5F5',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      justifyContent: 'center',
    },
    contentContainer: {
      width: '100%',
      maxWidth: '1400px', // Limit the maximum width
      padding: '60px 20px', // Add padding
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#E63946',
      textAlign: 'center',
    },
    separator: {
      height: '3px',
      width: '100px',
      backgroundColor: '#FFB400',
      margin: '10px auto',
    },
    content: {
      display: 'flex',
      gap: '30px',
      alignItems: 'flex-start',
    },
    imagePlaceholder: {
      flex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EDEDED',
      borderRadius: '8px',
      padding: '20px',
      height: '300px',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
    },
    textContent: {
      flex: '2',
      color: '#4A4A4A',
    },
    subTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '10px',
    },
    description: {
      fontSize: '16px',
      color: '#6C6C6C',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    bulletTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#E63946',
      marginTop: '20px',
      marginBottom: '10px',
    },
    bulletPoints: {
      paddingLeft: '20px',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#E63946',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '8px',
      cursor: 'pointer',
    },
  };
  