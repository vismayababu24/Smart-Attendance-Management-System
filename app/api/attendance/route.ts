import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/lib/models/Attendance';

export async function GET(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const query = date ? { date: new Date(date) } : {};
  const attendance = await Attendance.find(query);
  return NextResponse.json(attendance);
}

export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const attendance = new Attendance(body);
  await attendance.save();
  return NextResponse.json(attendance);
}