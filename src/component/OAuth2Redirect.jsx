import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"; // axios import

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();

    useEffect(() => {
        const OAuth2JwtHeaderFetch = async () => {
            try {
                // POST 요청을 axios로 대체
                const response = await axios.post("http://localhost:8080/oauth2-jwt-header", {}, {
                    withCredentials: true, // credentials: "include"와 동일
                });
                
                // GET 요청을 axios로 대체
                const response2 = await axios.get("http://localhost:8080/test", {
                    withCredentials: true,
                });
                console.log(response2);
                console.log(response);

                if (response.status === 200) {
                    // 로컬 스토리지에 access 토큰 저장
                    const accessToken = response.headers["access"]; // axios는 헤더를 객체로 관리
                    if (accessToken) {
                        window.localStorage.setItem("accessToken", accessToken);
                    } else {
                        throw new Error("Failed to fetch JWT");
                    }

                    // 홈 페이지로 리다이렉트
                    navigate("/", { replace: true });
                } else {
                    alert('접근할 수 없는 페이지입니다.');
                    navigate("/login", { replace: true });
                }
            } catch (error) {
                console.error("JWT 요청 중 오류 발생:", error);
                navigate("/login", { replace: true });
            }
        };

        OAuth2JwtHeaderFetch();
    }, [navigate, queryParams]);

    return <div>안녕하세요!!!</div>;
};

export default OAuth2Redirect;
