// src/components/TeamSection.js

export default function TeamSection() {
    const teamMembers = [
      {
        name: 'Name Surname',
        position: 'Position',
        image: '/team/member1.png',
      },
      {
        name: 'Name Surname',
        position: 'Position',
        image: '/team/member2.png',
      },
      {
        name: 'Name Surname',
        position: 'Position',
        image: '/team/member3.png',
      },
      {
        name: 'Name Surname',
        position: 'Position',
        image: '/team/member4.png',
      },
      {
        name: 'Name Surname',
        position: 'Position',
        image: '/team/member5.png',
      },
    ];
  
    return (
      <section style={styles.section}>
        <div style={styles.content}>
          <h2 style={styles.title}>Team</h2>
          <p style={styles.subtitle}>Lorem Ipsum is simply dummy text of the printing</p>
          <div style={styles.separator}></div>
          <div style={styles.gridContainer}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.card}>
                <img src={member.image} alt={member.name} style={styles.image} />
                <h3 style={styles.cardTitle}>{member.name}</h3>
                <p style={styles.position}>{member.position}</p>
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
      backgroundColor: '#1C1C1E',
      padding: '80px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#FFFFFF',
    },
    content: {
      width: '100%',
      maxWidth: '1200px',
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
      justifyContent: 'center',
      gap: '20px',
      marginTop: '40px',
    },
    card: {
      backgroundColor: '#2E2E2E',
      borderRadius: '12px',
      padding: '20px',
      width: '100%',
      maxWidth: '300px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
      flex: '1 1 calc(33.33% - 20px)', // 3 items per row, with spacing
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '15px',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#FF6B6B',
      marginBottom: '5px',
    },
    position: {
      fontSize: '14px',
      color: '#CCCCCC',
    },
  };
  