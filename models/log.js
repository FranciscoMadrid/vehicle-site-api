import DB_Query from "../helper/database_query.js"

const table = 'log';
const primaryKey = 'id'

const BASE_SELECT = `
  SELECT L.id, L.type, L.driver_name, L.mileage, V.brand, V.model, V.plate, L.created_at 
  FROM log as L 
  INNER JOIN vehicle AS V ON L.fk_vehicle_id = V.id`;

export const getAll = async (filters = {}) => {
  const {
    vehicleId, 
    brand,
    model,
    plate, 
    mileageMin, 
    mileageMax, 
    startDate, 
    endDate, 
    driver_name
  } = filters
  let sql = `${BASE_SELECT} WHERE 1 = 1`;
  const params = [];

  if(vehicleId) {
    sql += ` AND L.fk_vehicle_id = ?`
    params.push(vehicleId)
  }
  if(brand) {
    sql += ` AND V.brand = ?`;
    params.push(brand)
  }
  if(model) {
    sql += ` AND V.model = ?`
    params.push(model)
  }
  if(plate) {
    sql += ` AND V.plate LIKE ?`
    params.push(`${plate}%`)
  }
  if(mileageMin){
    sql += ` AND L.mileage >= ?`
    params.push(mileageMin)
  }
  if(mileageMax){
    sql += ` AND L.mileage <= ?`
    params.push(mileageMax)
  }
  if (startDate) {
    sql += ` AND L.created_at >= ?`;
    params.push(startDate);
  }
  if (endDate) {
    sql += ` AND L.created_at <= ?`;
    params.push(endDate);
  }
  if(driver_name){
    sql += ` AND L.driver_name LIKE ?`;
    params.push(`${driver_name}%`)
  }

  sql += ` ORDER BY L.created_at DESC`
  return await DB_Query.query(sql, params);
}

export const getById = async (id) => {
  const sql = `${BASE_SELECT} WHERE L.id = ?`;
  return await DB_Query.query(sql, [id])
    .then(rows => rows[0]);
}

export const getByVehicleId = async (vehicleId) => {
  const sql = `${BASE_SELECT} WHERE L.fk_vehicle_id = ? ORDER BY L.created_at DESC`;
  return await DB_Query.query(sql, [vehicleId]);
}

export const create = async (fields) =>{
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) throw new Error('No fields provided to create');

  const columns = keys.join(', ');
  const placeholders = keys.map(() => '?').join(', ');

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
  const result = await DB_Query.query(sql, values);

  return { message: 'Record has been successfully created.', id: result.insertId };
}

export const update = async(id, updatedFields) => {
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`);
  const values = [...Object.values(updatedFields), id];

  if(fields.length === 0) throw new Error('No fields provided to update');

  const sql = `UPDATE ${table} SET ${fields.join(', ')} WHERE ${primaryKey} = ?`;
  const result = await DB_Query.query(sql, values);

  return result.affectedRows;
}

export const deleteById = async(id) => {
  const sql = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
  const result = await DB_Query.query(sql, [id]);

  return result.affectedRows
}