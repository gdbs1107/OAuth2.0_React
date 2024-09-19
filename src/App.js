import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { useNavigate, useLocation } from 'react-router-dom';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [currentPage, setCurrentPage] = useState('login'); // 초기 페이지 설정
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('accessToken');
            const storedName = localStorage.getItem('name');
            
            if (token && storedName) {
                setIsLoggedIn(true);
                setUserName(storedName);
                setCurrentPage('home'); // 로그인 상태일 때 홈 페이지로 설정
            } else if (location.search.includes('name=')) {
                // OAuth2 리다이렉트 처리
                const queryParams = new URLSearchParams(location.search);
                const name = queryParams.get('name');
                
                if (name) {
                    try {
                        const response = await fetch("http://localhost:8080/oauth2-jwt-header", {
                            method: 'POST',
                            credentials: 'include'
                        });
                        
                        if (response.ok) {
                            const accessToken = response.headers.get('access');
                            
                            if (accessToken) {
                                localStorage.setItem('accessToken', accessToken);
                                localStorage.setItem('name', name);
                                setIsLoggedIn(true);
                                setUserName(name);
                                setCurrentPage('home'); // 로그인 후 홈 페이지로 설정
                            } else {
                                throw new Error('Failed to fetch access token');
                            }
                        } else {
                            throw new Error('Failed to fetch JWT');
                        }
                    } catch (error) {
                        console.error("JWT 요청 중 오류 발생:", error);
                        setCurrentPage('login'); // 오류 발생 시 로그인 페이지로 설정
                    }
                }
            } else {
                setCurrentPage('login'); // 이름이 없거나 토큰이 없는 경우 로그인 페이지로 설정
            }
        };

        checkAuthStatus();
    }, [location.search]);

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setUserName("");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('name');
        setCurrentPage('login'); // 로그아웃 후 로그인 페이지로 설정

        try {
            await fetch("http://localhost:8080/logout", {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("로그아웃 중 오류 발생:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {currentPage === 'login' && <LoginPage />}
            {currentPage === 'home' && <HomePage userName={userName} onLogout={handleLogout} />}
        </div>
    );
};

export default App;