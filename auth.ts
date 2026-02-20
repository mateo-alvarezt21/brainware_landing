
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Simple check against environment variables
          // In a real database scenario, you would query the user table here
          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (email === adminEmail && password === adminPassword) {
            return {
                id: '1',
                name: 'Admin User',
                email: adminEmail
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
