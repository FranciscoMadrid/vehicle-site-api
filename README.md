# Flow Drive API 🚀

**Backend for the Flow Drive Fleet Management System.** This Node.js/Express API handles all CRUD operations, data persistence, and filtering logic for vehicles and their movement logs.

---

### 🏗 Backend Tech Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** Relational Database (MySQL/PostgreSQL)
---

### 📊 Database Schema (Normalized)

The database is designed with the following tables: 
#### 1. Brand
* `id` (PK)
* `brand` (Name of the manufacturer)

#### 2. Model
* `id` (PK)
* `model` (Name of the specific model)
* `fk_brand_id` (FK referencing Brand)

#### 3. Vehicle
* `id` (PK)
* `fk_model_id` (FK referencing Model)
* `plate` (Unique license plate)
* `created_at` (Timestamp)

#### 4. Log (Entries & Exits)
* `id` (PK)
* `fk_vehicle_id` (FK referencing Vehicle)
* `type` (Entry or Exit)
* `drivername` (String)
* `mileage` (Numeric value)
* `date` (Datetime of movement)
* `created_at` (Timestamp)

---

### 🔑 Configuration (Environment Variables)

Create a `.env` file in the server root directory with the following variables:

```env
PORT=5000
DB_HOST=your_host_address
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
