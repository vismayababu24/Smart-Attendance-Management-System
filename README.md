# Smart Attendance Management System

A modern attendance management system built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

## Features

- Student registration and management
- Daily attendance marking
- Visual attendance analytics with charts
- Responsive design with Tailwind CSS
- MongoDB database integration
- NextAuth authentication

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/attendance
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

3. Start MongoDB locally or use MongoDB Atlas

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Default Login
- Username: admin
- Password: admin

## Tech Stack

- **Frontend**: React, Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Deployment**: Vercel ready