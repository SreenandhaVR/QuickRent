import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('quickrent');
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email address' }, { status: 401 });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return NextResponse.json({
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
    return NextResponse.json({ error: 'Login failed: ' + error.message }, { status: 500 });
  }
}