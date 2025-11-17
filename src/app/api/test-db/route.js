import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('quickrent');
    
    // Test connection
    const collections = await db.listCollections().toArray();
    
    return Response.json({ 
      message: 'Connected to MongoDB successfully!',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    return Response.json({ error: 'Failed to connect to MongoDB' }, { status: 500 });
  }
}