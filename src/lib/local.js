import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Get the full path to the ~/.data directory. If it doesn't exist, create it.
 */
function getDataDirectory(subdir) {
  const dataDir = path.join(os.homedir(), '.data', subdir);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  return dataDir;
}

/**
 * Write data to a JSON file in ~/.data/<key>.json.
 */
export function writeJson(key, subdir, data) {
  try {
    const dataDir = getDataDirectory(subdir);
    const filePath = path.join(dataDir, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing JSON:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Read and parse JSON data from ~/.data/<key>.json.
 */
export function readJson(key, subdir) {
  try {
    const dataDir = getDataDirectory(subdir);
    const filePath = path.join(dataDir, `${key}.json`);
    if (!fs.existsSync(filePath)) {
      // If file doesn't exist, return null or an empty object
      return null;
    }
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error reading JSON:', error);
    return null;
  }
}

/**
 * Get all filenames in a specific subdirectory of ~/.data.
 * @param {string} subdir - The subdirectory under ~/.data (e.g., 'candidates').
 * @returns {string[]} - List of filenames (excluding extensions).
 */
export function listJsonFiles(subdir) {
  try {
    const dataDir = getDataDirectory(subdir);

    if (!fs.existsSync(dataDir)) {
      return []; // Return an empty list if the directory doesn't exist
    }

    const files = fs.readdirSync(dataDir);
    return files
      .filter((file) => file.endsWith('.json')) // Only include .json files
      .map((file) => path.parse(file).name); // Remove extensions from filenames
  } catch (error) {
    console.error('Error listing JSON files:', error);
    return [];
  }
}