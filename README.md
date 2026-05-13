# CryptoWallet
![image alt](https://github.com/NeKsiKZ/CryptoWallet/blob/main/ReadMeSS/swagger.png?raw=true)
![image alt](https://github.com/NeKsiKZ/CryptoWallet/blob/main/ReadMeSS/front.png?raw=true)

## API Integration
To fetch real-time cryptocurrency prices and calculate portfolio value, the application integrates with the public Binance API.

* **Endpoint:** `GET /api/v3/ticker/price?symbol={SYMBOL}USDT`
* **Official Documentation:** [Binance Spot API Docs - Symbol Price Ticker](https://developers.binance.com/docs/binance-spot-api-docs/testnet/rest-api/market-data-endpoints#symbol-price-ticker)

## Run Local
### 1. Prerequisites
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js](https://nodejs.org/)

### 2. Clone Repository
```bash
git clone https://github.com/NeKsiKZ/CryptoWallet.git
```
### 3. Run the Backend
```bash
cd /CryptoWallet/CryptoWallet

dotnet run
```
* API Documentation: `https://localhost:7080/swagger`

### 4. Run the Frontend
```bash
cd /CryptoWallet/frontend

npm install 

npm start
```
* Frontend: `http://localhost:4200`
