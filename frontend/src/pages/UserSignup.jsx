import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = React.useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: { firstname: firstName, lastname: lastName },
            email: email,
            password: password,
        };
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/user/register`,
            newUser,
            { withCredentials: true },
        );
        if (response.status === 201) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem("token", data.token);
            navigate("/home");
        }
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
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
                    <h3 className="text-base font-medium mb-2">Full name</h3>
                    <div className="flex gap-4 mb-5">
                        <input
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            type="text"
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm"
                            required
                            placeholder="Firstname"
                        />

                        <input
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            type="text"
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm"
                            placeholder="Lastname"
                        />
                    </div>
                    <h3 className="text-base font-medium mb-2">
                        Email address
                    </h3>
                    <input
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="email"
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
                        Create Account
                    </button>
                    <p className="text-center">
                        Already a user?{" "}
                        <Link to="/login" className="text-blue-600">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <p className="text-[10px] text-gray-700">
                    By continuing, you agree to Uber's Terms of Service and
                    Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default UserSignup;
