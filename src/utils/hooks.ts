export const generateId = (length: number) => {
    const symbols = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.apply(null, Array(length)).map(() => symbols.charAt(Math.floor(Math.random() * symbols.length))).join('');
}