@echo off
REM Quick start script for Portfolio Backend

echo.
echo ========================================
echo   Portfolio Website Backend Setup
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Setup complete!
echo.

echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Make sure MongoDB is running:
echo    - Local: mongod
echo    - Cloud: Use MongoDB Atlas
echo.
echo 2. Update .env file with your MongoDB connection string (if using cloud)
echo.
echo 3. Start the server:
echo    npm start
echo.
echo 4. Server will run on: http://localhost:5000
echo.
echo ========================================
echo.
pause
