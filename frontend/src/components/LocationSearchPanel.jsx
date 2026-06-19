const LocationSearchPanel = (props) => {
  const locations = [
    "24B, Near Kapoor's cafe, Bhopal",
    "22B, Near Buku's cafe, Rabindranagar, Bhopal",
    "15A, MP Nagar, Zone 2, Bhopal",
    "7C, New Market, Bhopal",
  ];

  return (
    <div>
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanelOpen(true);
              props.setPanelOpen(false);
            }}
            className="border-2 p-3 rounded-xl flex items-center my-2 border-white active:border-black justify-start gap-4"
          >
            <h2 className="bg-[#eee] p-2 rounded-full h-8 w-12 flex items-center justify-center">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
