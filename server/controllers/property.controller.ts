import { Request, Response } from 'express';
import { z } from 'zod';
import db from '../db/database.js';

const propertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  location: z.string(),
  type: z.enum(['Apartment', 'House', 'Villa']),
  beds: z.number().int().positive(),
  baths: z.number().int().positive(),
  area: z.number().positive(),
  amenities: z.array(z.string()),
  images: z.array(z.string().url())
});

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = db.prepare('SELECT * FROM properties ORDER BY created_at DESC').all();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    const property = propertySchema.parse(req.body);
    const result = db.prepare(`
      INSERT INTO properties (title, description, price, location, type, beds, baths, area, amenities, images)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      property.title,
      property.description,
      property.price,
      property.location,
      property.type,
      property.beds,
      property.baths,
      property.area,
      JSON.stringify(property.amenities),
      JSON.stringify(property.images)
    );
    
    res.status(201).json({ id: result.lastInsertRowid, ...property });
  } catch (error) {
    res.status(400).json({ error: 'Invalid property data' });
  }
};

export const searchProperties = async (req: Request, res: Response) => {
  try {
    const { query, type, minPrice, maxPrice } = req.query;
    let sql = 'SELECT * FROM properties WHERE 1=1';
    const params: any[] = [];

    if (query) {
      sql += ' AND (title LIKE ? OR location LIKE ?)';
      params.push(`%${query}%`, `%${query}%`);
    }

    if (type) {
      sql += ' AND type = ?';
      params.push(type);
    }

    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(maxPrice);
    }

    const properties = db.prepare(sql).all(...params);
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search properties' });
  }
};