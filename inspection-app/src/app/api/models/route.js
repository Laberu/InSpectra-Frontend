// src/app/api/models/route.js
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const token = request.headers.get('cookie')?.split('token=')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }

  try {
    // Verify the token and get the user's email
    const decoded = jwt.verify(token, JWT_SECRET);
    const userEmail = decoded.email;

    // Find the user by email and fetch their models
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        models: {
          include: {
            textureSets: {
              include: {
                textures: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Return the user's models and related data
    return new Response(JSON.stringify(user.models), { status: 200 });
  } catch (error) {
    console.error("Error verifying token or fetching models:", error);
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
}
