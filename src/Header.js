import React from 'react';
import userAvatar from './assets/images/user_avatar.png'; // Ensure the path is correct

const Header = () => {
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>Training Dashboard</h1>
      <div style={styles.userInfo}>
        <img src={userAvatar} alt="User Avatar" style={styles.avatar} />
        <span style={styles.userName}>Lukas</span>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    position: 'sticky', // Make the header sticky
    top: 0, // Stick to the top of the viewport
    zIndex: 1000, // Ensure it stays above other content
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover', // Ensures the image is not distorted
    marginRight: '10px',
    border: '1px solid #ddd',
  },
  userName: {
    fontSize: '16px',
    fontWeight: 'bold', // Make the user's name bold
    color: '#333',
  },
};

export default Header;





