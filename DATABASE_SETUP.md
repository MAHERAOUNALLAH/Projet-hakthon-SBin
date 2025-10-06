# Database Setup Guide

## Prerequisites
1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in Supabase
3. Get your database connection string from Supabase settings

## Setup Steps

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Clerk Authentication (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Zmx5aW5nLW11c3RhbmctNTQuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_gc3nT4wJ0o83lYZGT56e0LiLHN5HvaRQeaDtJWNY95

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

Replace `[YOUR-PASSWORD]` and `[YOUR-PROJECT-REF]` with your actual Supabase credentials.

### 2. Run Database Migrations
After setting up the environment variables, run:

```bash
npx prisma db push
```

This will create the `users` table in your Supabase database.

### 3. Create Admin User (Optional)
To create an admin user, you can either:
- Use the admin panel after creating a regular user and changing their role
- Or manually insert an admin user in the Supabase dashboard

## User Roles

The system supports three user roles:

1. **USER** - Regular users who can report issues and view nearby bins
2. **SANITATION_WORKER** - Workers who manage collection routes and tasks
3. **ADMIN** - Administrators who can manage users and system settings

## Features by Role

### Regular User
- View nearby bins
- Report bin issues
- Track collection schedules
- View contribution score

### Sanitation Worker
- Manage assigned routes
- Update bin status
- Track daily tasks
- View efficiency metrics

### Administrator
- Manage all users
- Change user roles
- View system statistics
- Access admin panel

## API Endpoints

- `GET /api/user/profile` - Get current user profile
- `POST /api/user/profile` - Create user profile (role selection)
- `GET /api/admin/users` - Get all users (admin only)
- `PATCH /api/admin/users` - Update user role (admin only)

## Testing the Flow

1. Sign up with Clerk
2. Select your role (User or Sanitation Worker)
3. Access your role-specific dashboard
4. If you're an admin, you'll see an "Admin Panel" button
5. Use the admin panel to manage user roles

## Troubleshooting

- Make sure your `DATABASE_URL` is correct
- Ensure Prisma client is generated: `npx prisma generate`
- Check that migrations are applied: `npx prisma db push`
- Verify environment variables are loaded correctly
