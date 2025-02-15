// src/components/Footer.js
export default function Footer() {
    return (
      <footer style={styles.footerContainer}>
        <div style={styles.footerContent}>
          <h2 style={styles.footerTitle}>Footer</h2>
          <hr style={styles.divider} />
  
          <div style={styles.columns}>
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Lorem Ipsum</h3>
              <p style={styles.columnText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text of the printing and typesetting industry.
              </p>
              <h4 style={styles.subColumnTitle}>Contact</h4>
              <ul style={styles.contactList}>
                <li style={styles.contactItem}>Lorem Ipsum Lorem Ipsum</li>
                <li style={styles.contactItem}>Lorem Ipsum Lorem Ipsum</li>
                <li style={styles.contactItem}>Lorem Ipsum Lorem Ipsum</li>
              </ul>
            </div>
  
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Lorem Ipsum</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Lorem Ipsum</li>
                <li style={styles.listItem}>Lorem Ipsum</li>
                <li style={styles.listItem}>Lorem Ipsum</li>
                <li style={styles.listItem}>Lorem Ipsum</li>
              </ul>
            </div>
  
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Lorem Ipsum</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>Lorem Ipsum</li>
                <li style={styles.listItem}>Lorem Ipsum</li>
                <li style={styles.listItem}>Lorem Ipsum</li>
                <li style={styles.listItem}>Lorem Ipsum</li>
              </ul>
            </div>
          </div>
  
          <div style={styles.bottomSection}>
            <p style={styles.copyright}>&copy;2024 - Lorem Ipsum, Inc.</p>
            <div style={styles.iconContainer}>
              <div style={styles.icon}>
                <img src="/assets/icon1.png" alt="icon1" style={styles.iconImage} />
              </div>
              <div style={styles.icon}>
                <img src="/assets/icon2.png" alt="icon2" style={styles.iconImage} />
              </div>
              <div style={styles.icon}>
                <img src="/assets/icon3.png" alt="icon3" style={styles.iconImage} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  const styles = {
    footerContainer: {
      backgroundColor: '#1C1C1E',
      color: '#D1D1D1',
      padding: '40px',
      fontFamily: "'Inter', sans-serif",
    },
    footerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    footerTitle: {
      fontSize: '32px',
      fontWeight: '600',
      color: 'white',
    },
    divider: {
      width: '100px', // Extended the line width
      height: '4px',
      backgroundColor: '#FFB400',
      margin: '10px 0 20px 0',
      border: 'none',
    },
    columns: {
      display: 'flex',
      gap: '40px',
      flexWrap: 'wrap',
    },
    column: {
      flex: '1 1 300px',
    },
    columnTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '10px',
    },
    subColumnTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#FFB400',
      margin: '20px 0 10px 0',
    },
    columnText: {
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#A9A9A9',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      fontSize: '14px',
      color: '#A9A9A9',
      marginBottom: '8px',
    },
    contactList: {
      listStyleType: 'none',
      padding: 0,
      marginLeft: '20px',
    },
    contactItem: {
      fontSize: '14px',
      color: '#A9A9A9',
      borderLeft: '2px solid #FF4C4C',
      paddingLeft: '10px',
      marginBottom: '8px',
    },
    bottomSection: {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid #333',
      paddingTop: '20px',
    },
    copyright: {
      fontSize: '14px',
      color: '#A9A9A9',
    },
    iconContainer: {
      display: 'flex',
      gap: '10px',
    },
    icon: {
      backgroundColor: '#2C2C2E',
      borderRadius: '8px',
      padding: '10px',
    },
    iconImage: {
      width: '24px',
      height: '24px',
    },
  };
  