// src/components/DeliverSection.js
export default function DeliverSection() {
    const items = [
      {
        icon: '/icons/document.png',
        title: 'Document',
        description: 'รายงานเกี่ยวกับผลการตรวจสอบข้อมูลการตรวจสอบในรูปแบบของเอกสารที่ให้ข้อมูลอย่างละเอียด',
      },
      {
        icon: '/icons/image.png',
        title: 'Image',
        description: 'รูปภาพที่เกี่ยวข้องเพื่อแสดงตำแหน่งและรายละเอียดในการเก็บรวบรวมข้อมูลการตรวจสอบ',
      },
      {
        icon: '/icons/3d_model.png',
        title: '3D Model',
        description: 'ข้อมูลเกี่ยวกับรูปทรงของแบบจำลองสามมิติสำหรับการเก็บบันทึกข้อมูลที่ครอบคลุม',
      },
      {
        icon: '/icons/vr_ar.png',
        title: 'VR/AR',
        description: 'การใช้เทคโนโลยี VR หรือ AR เพื่อลูกค้าในการดูและวิเคราะห์ข้อมูลแบบสมจริงเพื่อการตรวจสอบที่มีประสิทธิภาพ',
      },
      {
        icon: '/icons/application.png',
        title: 'Standalone Application',
        description: 'แอปพลิเคชันที่ไม่ต้องพึ่งพาเครือข่ายเพื่อการทำงานแบบอิสระในการตรวจสอบข้อมูลและรายงาน',
      },
      {
        icon: '/icons/crack_detection.png',
        title: 'Crack Detection',
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        icon: '/icons/stand_alone_app.png',
        title: 'Standalone App',
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        icon: '/icons/lorem_ipsum.png',
        title: 'Lorem Ipsum',
        description: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ];
  
    return (
      <section style={styles.section}>
        <div style={styles.content}>
          <h2 style={styles.title}>Deliver</h2>
          <p style={styles.subtitle}>Lorem Ipsum is simply dummy text of the printing</p>
          <div style={styles.separator}></div>
          <div style={styles.gridContainer}>
            {items.map((item, index) => (
              <div key={index} style={styles.card}>
                <img src={item.icon} alt={item.title} style={styles.icon} />
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.description}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  const styles = {
    section: {
    //   width: '100%',
      backgroundColor: '#1C1C1E', // Full background color
      padding: '80px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#FFFFFF',
    },
    content: {
      width: '100%',
      maxWidth: '1200px', // Center and contain the content
      textAlign: 'center',
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: '16px',
      color: '#888888',
      marginTop: '10px',
    },
    separator: {
      width: '80px',
      height: '3px',
      backgroundColor: '#FF6B6B',
      margin: '20px auto',
    },
    gridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center', // Center the items, even on the last row
      gap: '20px',
      marginTop: '40px',
    },
    card: {
      backgroundColor: '#2E2E2E',
      borderRadius: '12px',
      padding: '30px',
      width: '100%',
      maxWidth: '300px', // Limit card width to ensure consistent sizing
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      flex: '1 1 calc(33.33% - 20px)', // Ensure three items per row with spacing
    },
    icon: {
      width: '50px',
      height: '50px',
      marginBottom: '20px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: '10px',
    },
    description: {
      fontSize: '14px',
      color: '#CCCCCC',
    },
  };
  