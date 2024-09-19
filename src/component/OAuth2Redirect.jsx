import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OAuth2Redirect = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const [isNewUser, setIsNewUser] = useState(false);

    useEffect(() => {
        const OAuth2JwtHeaderFetch = async () => {
            try {
                console.log("리다이렉트를 시작합니다");

                const response = await axios.post("http://localhost:8080/oauth2-jwt-header", {}, {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const accessToken = response.headers["access"];
                    if (accessToken) {
                        window.localStorage.setItem("accessToken", accessToken);
                    } else {
                        throw new Error("Failed to fetch JWT");
                    }

                    // 신규 회원 여부 확인
                    const newUserParam = queryParams.get('newUser');
                    if (newUserParam === 'true') {
                        setIsNewUser(true); // 신규 회원이라면 상태 업데이트
                    } else {
                        // 홈 페이지로 리다이렉트
                        navigate("/", { replace: true });
                    }
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

    if (isNewUser) {
        return <UserInfoForm />; // 신규 유저의 경우 추가 정보 입력 폼을 표시
    }

    return <div>안녕하세요!!!</div>;
};

export default OAuth2Redirect;
