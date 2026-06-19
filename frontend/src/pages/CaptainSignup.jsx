import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType,
            },
        };

        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/captain/register`,
            captainData,
            { withCredentials: true },
        );

        if (response.status === 201) {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem("token", data.token);
            navigate("/captain-home");
        }

        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity("");
        setVehicleType("");
    };
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img
                    className="w-16 mb-10"
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt=""
                />
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                >
                    <h3 className="text-base font-medium mb-2">
                        Captain's Name
                    </h3>
                    <div className="flex gap-4 mb-5">
                        <input
                            required
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <input
                            required
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </div>

                    <h3 className="text-base font-medium mb-2">
                        Email Address
                    </h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        type="email"
                        placeholder="email@example.com"
                    />

                    <h3 className="text-base font-medium mb-2">Password</h3>

                    <input
                        className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                        type="password"
                        placeholder="Enter your password"
                    />

                    <h3 className="text-base font-medium mb-2">
                        Vehicle Information
                    </h3>
                    <div className="flex gap-4 mb-5">
                        <input
                            required
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => {
                                setVehicleColor(e.target.value);
                            }}
                        />
                        <input
                            required
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Vehicle Plate"
                            value={vehiclePlate}
                            onChange={(e) => {
                                setVehiclePlate(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex gap-4 mb-5">
                        <input
                            required
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="number"
                            placeholder="Vehicle Capacity"
                            value={vehicleCapacity}
                            onChange={(e) => {
                                setVehicleCapacity(e.target.value);
                            }}
                        />
                        <select
                            required
                            className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            value={vehicleType}
                            onChange={(e) => {
                                setVehicleType(e.target.value);
                            }}
                        >
                            <option value="" disabled>
                                Select Vehicle Type
                            </option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>

                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
                        Create Captain Account
                    </button>
                </form>
                <p className="text-center">
                    Already have an account?{" "}
                    <Link to="/captain-login" className="text-blue-600">
                        Login here
                    </Link>
                </p>
            </div>
            <div>
              <p className="text-xs text-gray-700">
                By continuing, you agree to Uber's Terms of Service and
                Privacy Policy.
              </p>
            </div>
        </div>
    );
};

export default CaptainSignup;
