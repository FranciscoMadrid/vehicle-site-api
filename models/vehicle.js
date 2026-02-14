import DB_Query from "../helper/database_query.js"

const table = 'vehicle';
const primaryKey = 'id'

const BASE_SELECT = `
  SELECT V.id, V.plate, B.brand, M.model, V.created_at
  FROM vehicle AS V 
  INNER JOIN model AS M ON V.fk_model_id = M.id
  INNER JOIN brand AS B ON M.fk_brand_id = B.id`;

const filterDefinitions = {
  id: 'AND V.id = ?',
  brand: 'AND B.brand LIKE ?',
  model: 'AND M.model LIKE ?',
  plate: 'AND V.plate = ?',
  startDate: 'AND V.created_at >= ?',
  endDate: 'AND V.created_at <= ?',
};

export const getAll = async (filters) => {
  let sql = `${BASE_SELECT} WHERE 1 = 1`
  const params = []
  Object.entries(filters).forEach(([key, value]) => {
    if(value !== undefined && value !== null && value !== '' && filterDefinitions[key]){
      sql += ` ${filterDefinitions[key]}`
      
      if(filterDefinitions[key].includes('LIKE')){
        params.push(`${value}%`);
      } else {
        params.push(value)
      }
    }
  })
  return await DB_Query.query(sql, params);
}

export const getById = async (id) => {
  const sql = `${BASE_SELECT} WHERE V.id = ?`;
  return await DB_Query.query(sql, [id])
    .then(rows => rows[0]);
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