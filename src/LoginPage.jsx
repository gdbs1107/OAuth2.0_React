
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

const LoginPage = () => {
    const onSocialLogin = (provider) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div>
            <h1>소셜 로그인</h1>
            <button onClick={() => onSocialLogin('naver')} style={{...buttonStyle, backgroundColor: '#1EC800', color: 'white'}}>
                네이버 로그인
            </button>
            <button onClick={() => onSocialLogin('google')} style={{...buttonStyle, backgroundColor: '#4285F4', color: 'white'}}>
                구글 로그인
            </button>
            <button onClick={() => onSocialLogin('kakao')} style={{...buttonStyle, backgroundColor: '#FEE500', color: 'black'}}>
                카카오 로그인
            </button>
        </div>
    );
};

export default LoginPage;
