// src/app/api/register/route.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prismaClient';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { email, password } = await request.json();

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
  }

  // Hash the password and create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT and set it as an HTTP-only cookie
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return new Response(JSON.stringify({ message: 'User registered successfully' }), {
    status: 201,
    headers: { 'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600` },
  });
}
