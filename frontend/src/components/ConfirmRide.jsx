const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        className="w-[93%] p-1 text-center absolute top-0"
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm your ride</h3>
      <div className="gap-2 flex flex-col justify-between items-center">
        <img
          className="h-20"
          alt=""
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
        />
      </div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-sm -mt-1 text-gray-600">
              Sarojini Nagar, New Delhi
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-square-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-sm -mt-1 text-gray-600">India Gate, New Delhi</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="text-lg ri-bank-card-line"></i>
          <div>
            <h3 className="text-lg font-medium">Rs. 193.20</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false);
        }}
        className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRide;
