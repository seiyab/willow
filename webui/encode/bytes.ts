export const bytes = (xs: number[]): string => '0x' + xs.map(hexByte).join('');

const hexByte= (x: number) =>  `${digits[Math.floor(x/16) % 16]}${digits[x%16]}`
const digits = '0123456789abcdef';
