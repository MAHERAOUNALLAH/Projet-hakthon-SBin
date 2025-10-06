-- Create UserRole enum
CREATE TYPE "UserRole" AS ENUM ('USER', 'SANITATION_WORKER', 'ADMIN');

-- Create users table
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- Create unique indexes
CREATE UNIQUE INDEX "users_clerkId_key" ON "users"("clerkId");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- Enable Row Level Security
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Create policies (basic - you can customize these later)
CREATE POLICY "Users can view their own data" ON "users"
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own data" ON "users"
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own data" ON "users"
    FOR UPDATE USING (true);
