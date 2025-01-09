import { Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import db from '../db/database.js';

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

const hashPassword = (password: string) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = userSchema.parse(req.body);
    const hashedPassword = hashPassword(user.password);
    
    const result = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    ).run(user.name, user.email, hashedPassword);
    
    res.status(201).json({ 
      id: result.lastInsertRowid,
      name: user.name,
      email: user.email 
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid user data' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    
    const user = db.prepare(
      'SELECT id, name, email FROM users WHERE email = ? AND password = ?'
    ).get(email, hashedPassword);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};