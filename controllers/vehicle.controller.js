import * as Vehicle from '../models/vehicle.js';

export const getAll = async(req, res) => {
  try {
    const record = await Vehicle.getAll();
    res.json(record)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getById = async(req, res) => {
  try {
    const record = await Vehicle.getById(req.params.id);

    if(!record)
    {
      return res.status(404).json({ error: 'Record not found'})
    }

    res.json(record); 
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}

export const create = async (req, res) => {
    try {
      const record = await Vehicle.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const update = async(req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const affectedRows = await Vehicle.update(id, updateData);

    if(affectedRows === 0)
    {
      return res.status(404).json({ message: 'Record not found or nothing changed' });
    }

    res.json({ message: 'Record updated successfully' });
  } catch (error) {
    res.status(500).json({ error: `Failed to update Record ${error}` });
  }
}

export const deleteById = async(req, res) => {
  const userId = req.params.id;

  try {
    const affectedRows = await Vehicle.deleteById(userId);

    if(affectedRows === 0)
    {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: `Failed to delete Record: ${error.message}` });
  }
}