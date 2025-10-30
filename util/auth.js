import jwt from 'jsonwebtoken';

// Function to check if the request is from an admin
export const isAdminRequest = (req) => {
  // Check for admin token in cookies or authorization header
  const token = req.cookies.token || 
                (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  
  if (!token) {
    return false;
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
};