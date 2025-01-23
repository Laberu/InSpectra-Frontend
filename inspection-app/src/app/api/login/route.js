// src/app/api/login/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { email, password } = await request.json();

  // Find the user in the database
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  // Check the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: 'Invalid email or password' }), { status: 400 });
  }

  // Generate JWT and set it as an HTTP-only cookie
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return new Response(JSON.stringify({ message: 'Login successful' }), {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600` },
  });
}
