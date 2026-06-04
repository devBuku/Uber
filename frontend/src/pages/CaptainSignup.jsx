import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
          <h3 className="text-base font-medium mb-2">Full name</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              required
              placeholder="Firstname"
            />

            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              placeholder="Lastname"
            />
          </div>
          <h3 className="text-base font-medium mb-2">Email address</h3>
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
          <h3 className="text-base font-medium mb-2">Vehicle details</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value);
              }}
              type="text"
              className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              required
              placeholder="Vehicle color"
            />
            <input
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value);
              }}
              type="text"
              className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              required
              placeholder="License plate"
            />
          </div>
          <div className="flex gap-4 mb-5">
            <input
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value);
              }}
              type="number"
              className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              required
              placeholder="Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}
              className="bg-[#eee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              required
            >
              <option value="" disabled>
                Vehicle type
              </option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Create Account
          </button>
          <p className="text-center">
            Already a captain?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Sign In
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] text-gray-700">
          By continuing, you agree to Uber's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
