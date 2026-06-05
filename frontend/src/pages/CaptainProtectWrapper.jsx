import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useState } from "react";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/captain-login");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("token");
                navigate("/captain-login");
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectWrapper;
