import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/api/user/profile`, {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default UserProtectWrapper;
