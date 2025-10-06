export enum UserRole {
  USER = 'USER',
  SANITATION_WORKER = 'SANITATION_WORKER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string
  clerkId: string
  email: string
  firstName: string | null
  lastName: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
