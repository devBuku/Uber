import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/userContext";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { user, setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = { email: email, password: password };
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/user/login`,
            userData,
            { withCredentials: true },
        );
        if (response.status === 200) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem("token", data.token);
            navigate("/home");
        }
        setEmail("");
        setPassword("");
    };
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt=""
                />
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h3 className="text-base font-medium mb-2">
                        Email address
                    </h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        required
                        placeholder="email@example.com"
                    />
                    <h3 className="text-base font-medium mb-2">Password</h3>
                    <input
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        required
                        placeholder="Enter your password"
                    />
                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
                        Sign In
                    </button>
                    <p className="text-center">
                        New to Uber?{" "}
                        <Link to="/signup" className="text-blue-600">
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link
                    to="/captain-login"
                    className="bg-[green] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
