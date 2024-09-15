import React from 'react';

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '250px',
    padding: '10px 20px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
};

const HomePage = ({ userName, onLogout }) => {
    return (
        <div>
            <h1>홈</h1>
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
                <h2>환영합니다, {userName}님!</h2>
                <button onClick={onLogout} style={buttonStyle}>로그아웃</button>
            </div>
        </div>
    );
};

export default HomePage;
