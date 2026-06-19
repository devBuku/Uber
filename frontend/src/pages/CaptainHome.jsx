const CaptainHome = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <i className="ri-taxi-line text-6xl text-gray-400 mb-4 block"></i>
                <h2 className="text-xl font-semibold text-gray-700">
                    Captain Dashboard
                </h2>
                <p className="text-gray-500 mt-1">Waiting for ride requests...</p>
            </div>
        </div>
    );
};

export default CaptainHome;
