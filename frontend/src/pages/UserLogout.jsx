import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/user/logout`,
                    { withCredentials: true },
                );
            } finally {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };
        logout();
    }, []);

    return <div>Logging out...</div>;
};

export default UserLogout;
