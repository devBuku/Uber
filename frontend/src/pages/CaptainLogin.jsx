import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { useContext } from "react";

const CaptainLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { captain, setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = { email: email, password: password };
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/captain/login`,
            captain,
            { withCredentials: true },
        );
        if (response.status === 200) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem("token", data.token);
            navigate("/captain-home");
        }
        setEmail("");
        setPassword("");
    };
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-2"
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
                        <Link to="/captain-signup" className="text-blue-600">
                            Register as a Captain
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link
                    to="/login"
                    className="bg-[orange] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
