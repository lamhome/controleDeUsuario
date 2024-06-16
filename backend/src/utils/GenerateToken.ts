import { v4 as uuidv4 } from 'uuid';

export function generateToken(): string {
    const uuidPart = uuidv4();
    const timestamp = Math.floor(Date.now() / 1000);
    const combined = `${uuidPart}-${timestamp}`;

    return combined;
}