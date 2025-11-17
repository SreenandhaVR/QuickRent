import clientPromise from '../../../lib/mongodb';

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db('quickrent');
    
    // Create collections with sample data
    await db.collection('users').insertOne({
      email: 'test@example.com',
      name: 'Test User',
      createdAt: new Date()
    });
    
    await db.collection('rentals').insertOne({
      title: 'Sample Rental',
      description: 'Test rental item',
      price: 100,
      createdAt: new Date()
    });
    
    return Response.json({ message: 'Database initialized successfully!' });
  } catch (error) {
    return Response.json({ error: 'Failed to initialize database' }, { status: 500 });
  }
}