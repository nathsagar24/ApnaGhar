import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateProperty = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Property validation will be handled by Zod in the controller
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid property data' });
  }
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    // User validation will be handled by Zod in the controller
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid user data' });
  }
};