// src/app/api/me/route.js
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request) {
  const token = request.headers.get('cookie')?.split('token=')[1];

  if (!token) {
    return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { email: decoded.email } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ email: user.email }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
}
