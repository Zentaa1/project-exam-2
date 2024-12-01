export const load = (key: string) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error loading key "${key}" from localStorage:`, error);
        return null;
    }
};
