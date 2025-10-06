# Smart Bin - Role-Based Dashboard Setup

## 🚀 Quick Setup Guide

### 1. Environment Variables Setup

Add these environment variables to your `.env.local` file:

```env
# Clerk Authentication (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Zmx5aW5nLW11c3RhbmctNTQuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_gc3nT4wJ0o83lYZGT56e0LiLHN5HvaRQeaDtJWNY95

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase Configuration (provided)
NEXT_PUBLIC_SUPABASE_URL=https://prlsgxukwtahbbcrpyar.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybHNneHVrd3RhaGJiY3JweWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDIxOTQsImV4cCI6MjA3NTE3ODE5NH0.tcGlxZulWGZDxGgBF-cAPZcfyXxf9ewQRfoHUQ_Tj8E

# Database URL for Prisma (GET THIS FROM SUPABASE)
# Go to Supabase Dashboard > Settings > Database > Connection string
# Copy the PostgreSQL connection string and replace [YOUR-PASSWORD] with your actual password
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.prlsgxukwtahbbcrpyar.supabase.co:5432/postgres"
```

### 2. Get Database Connection String

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `prlsgxukwtahbbcrpyar`
3. Navigate to **Settings** > **Database**
4. Scroll down to **Connection string**
5. Copy the **URI** connection string
6. Replace `[YOUR-PASSWORD]` with your actual database password
7. Add it to your `.env.local` file as `DATABASE_URL`

### 3. Create Database Tables

After setting up the `DATABASE_URL`, run:

```bash
npx prisma db push
```

This will create the `users` table in your Supabase database.

### 4. Test the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Test the flow:
   - Sign up with Clerk
   - Select your role (User or Sanitation Worker)
   - Access your role-specific dashboard
   - If you're an admin, you'll see an "Admin Panel" button

## 🎯 Features Implemented

### Role-Based Dashboards
- **Regular Users**: View nearby bins, make reports, track contribution score
- **Sanitation Workers**: Manage routes, track tasks, view efficiency metrics
- **Administrators**: System stats, user management, admin panel

### Authentication Flow
- Clerk authentication
- Role selection after sign-up
- Automatic redirects based on role
- Loading states to prevent hydration issues

### Admin Panel
- User management interface
- Role change functionality
- Admin-only access control
- Real-time user list updates

## 🔧 API Endpoints

- `GET /api/user/profile` - Get current user profile
- `POST /api/user/profile` - Create user profile (role selection)
- `GET /api/admin/users` - Get all users (admin only)
- `PATCH /api/admin/users` - Update user role (admin only)

## 🚨 Troubleshooting

### Database Connection Issues
- Verify your `DATABASE_URL` is correct
- Check that your Supabase project is active
- Ensure your database password is correct

### Authentication Issues
- Verify Clerk keys are correct
- Check that environment variables are loaded
- Ensure proper redirect URLs are set

### Role Selection Issues
- Make sure database tables are created (`npx prisma db push`)
- Check that user profile creation is working
- Verify role enum values match database

## 📱 User Experience Flow

1. **Landing Page** → Sign up/Sign in
2. **Clerk Authentication** → Email verification
3. **Role Selection** → Choose User or Sanitation Worker
4. **Dashboard** → Role-specific interface
5. **Admin Panel** → User management (admin only)

## 🎨 UI Features

- Modern glassmorphism design
- Responsive layout for all devices
- Dark/light mode support
- Smooth animations with Framer Motion
- Material Design icons
- Role-based color coding

The system is now ready for testing! 🎉
