const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="w-[93%] p-1 text-center absolute top-0"
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="mb-2 flex w-full items-center justify-between p-3 border-2 active:border-black rounded-xl"
      >
        <img
          className="h-10"
          alt=""
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            UberGo
            <span className="ml-2">
              <i className="ri-user-fill"></i> 4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs.193.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="mb-2 flex w-full items-center justify-between p-3 border-2 active:border-black rounded-xl"
      >
        <img
          className="h-10"
          alt=""
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            Moto
            <span className="ml-2">
              <i className="ri-user-fill"></i> 1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs.45.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="mb-2 flex w-full items-center justify-between p-3 border-2 active:border-black rounded-xl"
      >
        <img
          className="h-10"
          alt=""
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=0/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy80ZTcxOGQ1Yy1lNDMxLTU5YzUtYWNiNS1hYzQwYzI2YzI0ZGYud2VicA=="
        />
        <div className="w-1/2 ml-2">
          <h4 className="font-medium text-base">
            Auto
            <span className="ml-2">
              <i className="ri-user-fill"></i> 3
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">Rs.118.20</h2>
      </div>
    </div>
  );
};
export default VehiclePanel;
