import DB_Query from "../helper/database_query.js"

const table = 'vehicle';
const primaryKey = 'id'

export const getAll = async (filters = {}) => {
  const {
    id,
    brand,
    model,
    plate,
    startDate,
    endDate
  } = filters;
  let sql = `SELECT * FROM ${table} WHERE 1 = 1`;
  const params = [];

  if(id){
    sql += ` AND id = ?`;
    params.push(id)
  }
  if(brand){
    sql += ` AND brand = ?`;
    params.push(brand)
  }
  if(model){
    sql += ` AND model LIKE ?`;
    params.push(`${model}%`)
  }
  if(plate){
    sql += ` AND plate LIKE ?`;
    params.push(`${plate}%`)
  }
  if (startDate) {
    sql += ` AND L.created_at >= ?`;
    params.push(startDate);
  }
  if (endDate) {
    sql += ` AND L.created_at <= ?`;
    params.push(endDate);
  }
  return await DB_Query.query(sql, params);
}

export const getById = async (id) => {
  const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
  return await DB_Query.query(sql, [id])
  .then(rows => rows[0])
}

export const create = async (fields) =>{
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  if (keys.length === 0) {
      throw new Error('No fields provided to create');
  }

  const columns = keys.join(', ');
  const placeholders = keys.map(() => '?').join(', ');

  const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

  const result = await DB_Query.query(sql, values);

  return { message: 'Record has been successfully created.', id: result.insertId };
}

export const update = async(id, updatedFields) => {
  const fields = [];
  const values = [];

  for(const [key, value] of Object.entries(updatedFields)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if(fields.length === 0)
  {
      throw new Error('No fields provided to update');
  }

  const sql = `UPDATE ${table} SET ${fields.join(', ')} WHERE ${primaryKey} = ?`;
  values.push(id);

  const result = await DB_Query.query(sql, values);

  return result.affectedRows;
}

export const deleteById = async(id) => {
  const sql = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
  const result = await DB_Query.query(sql, id);

  return result.affectedRows
}