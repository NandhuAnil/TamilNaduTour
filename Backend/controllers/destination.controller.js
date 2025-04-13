import fs from 'fs';
import path from 'path';

const dataPath = path.resolve('db/TNTourData.json');
const destinations = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

export const getAllDestinations = (req, res) => {
  res.json(destinations);
};

export const getDestinationsByCategory = (req, res) => {
  const { category } = req.params;

  const filtered = destinations.filter(
    (item) => item.Category.toLowerCase() === category.toLowerCase()
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'No destinations found in this category.' });
  }

  res.json(filtered);
};
