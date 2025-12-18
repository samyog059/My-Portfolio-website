# SQL Server Setup Guide for Portfolio

## Your Server Details
- **Server Name**: DESKTOP-067BAGA\SQLEXPRESS
- **Connection Type**: Windows Authentication (Integrated) or SQL Authentication

## To Find Your SQL Server Credentials

### Option 1: If Using Default SQL Server Admin (SA)
1. Open **SQL Server Management Studio (SSMS)**
2. Connect with:
   - Server: `DESKTOP-067BAGA\SQLEXPRESS`
   - Authentication: Windows Authentication (or SQL Server Authentication with `sa`)
   - Login: `sa`
   - Password: (the password you set during SQL Server installation)

### Option 2: Check if Database Already Exists
1. In SSMS, expand **Databases** folder
2. Look for existing databases
3. Create a new database if needed: Right-click → New Database → Name it `portfolio`

## Steps to Complete Setup

1. **Open SQL Server Management Studio (SSMS)**
2. **Connect to your server**: `DESKTOP-067BAGA\SQLEXPRESS`
3. **Create a new database** (if you don't have one):
   - Right-click on "Databases"
   - Select "New Database"
   - Name: `portfolio`
   - Click OK

4. **Tell me these details**:
   - Database name (e.g., `portfolio`)
   - Username (e.g., `sa`)
   - Password (your SQL Server password)

Then I'll update your `.env` file and test the connection!

## Quick Test in SSMS

Once connected, run this query to verify the database:
```sql
SELECT * FROM sys.databases WHERE name = 'portfolio';
```

If you see `portfolio` listed, you're all set!
