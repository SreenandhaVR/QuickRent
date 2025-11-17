import clientPromise from '../../../../lib/mongodb';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userType, location, interests, profilePhoto } = await request.json();
    
    const client = await clientPromise;
    const db = client.db('quickrent');
    
    // Update user with onboarding data
    await db.collection('users').updateOne(
      { _id: decoded.userId },
      {
        $set: {
          userType,
          location,
          interests,
          profilePhoto,
          onboardingCompleted: true,
          updatedAt: new Date()
        }
      }
    );
    
    return Response.json({ message: 'Onboarding completed successfully' });
    
  } catch (error) {
    return Response.json({ error: 'Onboarding failed' }, { status: 500 });
  }
}