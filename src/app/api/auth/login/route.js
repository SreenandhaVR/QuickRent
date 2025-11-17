import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('quickrent');
    
    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return Response.json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email 
      }
    });
    
  } catch (error) {
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}