import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/captain/logout`,
                    { withCredentials: true },
                );
            } finally {
                localStorage.removeItem("token");
                navigate("/captain-login");
            }
        };
        logout();
    }, []);

    return <div>Logging out...</div>;
};

export default CaptainLogout;
