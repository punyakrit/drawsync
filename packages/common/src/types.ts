import {z} from 'zod';

export const userZod = z.object({
    username: z.string().min(1, 'Username is required'),
    password : z.string().min(1, 'Password is required'),
    name: z.string().min(1, 'Name is required'),
})

export const SignInZod = z.object({ 
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

export const createRoomZod = z.object({
    roomName: z.string().min(1, 'Room name is required'),
})