import express from 'express';

// Create an Express router
const router = express.Router();

// Define a sample route (you can replace this with your actual bus routes)
router.get('/info', (req, res) => {
  res.json({
    message: 'Bus info retrieved successfully',
    buses: [
      { busNumber: 'RJ14PE4874', route: 'Jaipur to Tonk' },
      { busNumber: 'RJ14PE4674', route: 'Jaipur to Kota' },
    ],
  });
});

// Export the router as the default export
export default router;
