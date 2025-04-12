// controllers/busController.js

// Dummy function to get bus info (you can later replace this with actual logic)
export const getBusInfo = (req, res) => {
    res.json({
      message: "Bus info retrieved successfully",
      buses: [
        { busNumber: "RJ14PE4874", route: "Jaipur to Tonk" },
        { busNumber: "RJ14PE4674", route: "Jaipur to Kota" },
      ],
    });
  };
  
  // Dummy function to get bus routes
  export const getBusRoutes = (req, res) => {
    res.json({
      message: "Bus routes retrieved successfully",
      routes: [
        { routeId: 1, start: "Jaipur", end: "Tonk" },
        { routeId: 2, start: "Jaipur", end: "Kota" },
      ],
    });
  };
  