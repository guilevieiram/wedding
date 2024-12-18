// Import the AWS SDK for JavaScript
import AWS from 'aws-sdk';

// Configure AWS S3
AWS.config.update({
  region: 'sa-east-1'
});

const s3 = new AWS.S3({
  params: { Bucket: 'buegui' },
  signatureVersion: 'v4'
});

/**
 * Write a JSON file to the S3 bucket
 * @param {string} key - The path and name of the file in the bucket (e.g., 'folder/filename.json').
 * @param {Object} data - The JSON data to be written to the file.
 * @return {Promise} - A promise that resolves when the file is successfully written.
 */
export const writeJsonToS3 = async (key, data) => {
  try {
    const params = {
      Bucket: 'buegui',
      Key: key,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
      ACL: 'public-read' // Ensures the file is publicly accessible
    };
    
    const result = await s3.putObject(params).promise();
    console.log('Successfully wrote JSON to S3:', result);
    return result;
  } catch (error) {
    console.error('Error writing JSON to S3:', error);
    throw error;
  }
};

/**
 * Read a JSON file from the S3 bucket
 * @param {string} key - The path and name of the file in the bucket (e.g., 'folder/filename.json').
 * @return {Promise<Object>} - A promise that resolves to the parsed JSON data from the file.
 */
export const readJsonFromS3 = async (key) => {
  try {
    const params = {
      Bucket: 'buegui',
      Key: key
    };
    
    const result = await s3.getObject(params).promise();
    const jsonData = JSON.parse(result.Body.toString('utf-8'));
    console.log('Successfully read JSON from S3:', jsonData);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON from S3:', error);
    throw error;
  }
};

/**
 * List all files in a specific folder in the S3 bucket
 * @param {string} folderPath - The path of the folder (e.g., 'folder/').
 * @return {Promise<Array>} - A promise that resolves to an array of file keys in the folder.
 */
export const listFilesInS3Folder = async (folderPath) => {
  try {
    const params = {
      Bucket: 'buegui',
      Prefix: folderPath
    };
    
    const result = await s3.listObjectsV2(params).promise();
    const fileKeys = result.Contents.map(file => file.Key);
    console.log('Successfully listed files in S3 folder:', fileKeys);
    return fileKeys;
  } catch (error) {
    console.error('Error listing files in S3 folder:', error);
    throw error;
  }
};
