import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, password } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('quickrent');
    
    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const result = await db.collection('users').insertOne({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date()
    });
    
    // Generate JWT
    const token = jwt.sign(
      { userId: result.insertedId, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return Response.json({
      message: 'User created successfully',
      token,
      user: { id: result.insertedId, firstName, lastName, email }
    });
    
  } catch (error) {
    return Response.json({ error: 'Registration failed' }, { status: 500 });
  }
}