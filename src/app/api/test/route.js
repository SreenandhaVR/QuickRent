export async function GET() {
  return Response.json({
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'Missing',
    jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Missing',
    nodeEnv: process.env.NODE_ENV
  });
}