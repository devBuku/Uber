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

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <i className="ri-loader-4-line text-4xl text-gray-500 animate-spin mb-4 block"></i>
                <p className="text-gray-600">Logging out...</p>
            </div>
        </div>
    );
};

export default CaptainLogout;
