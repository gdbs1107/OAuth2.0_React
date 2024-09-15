import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import { useNavigate, useLocation } from 'react-router-dom';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [currentPage, setCurrentPage] = useState('login');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchJwtAndRedirect = async () => {
            const queryParams = new URLSearchParams(location.search);
            const name = queryParams.get('name');

            if (name) {
                // OAuth2 JWT Header API 호출
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
                        } else {
                            throw new Error('Failed to fetch access token');
                        }
                    } else {
                        throw new Error('Failed to fetch JWT');
                    }
                } catch (error) {
                    console.error("JWT 요청 중 오류 발생:", error);
                }
            } else {
                // 토큰이 없으면 로그인 페이지로 이동
                const token = localStorage.getItem('accessToken');
                const storedName = localStorage.getItem('name');

                if (token && storedName) {
                    setIsLoggedIn(true);
                    setUserName(storedName);
                } else {
                }
            }
        };

        fetchJwtAndRedirect();
    }, [location.search]);

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setUserName("");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('name');

        // 백엔드 로그아웃 API 호출
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
