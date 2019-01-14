export function get_random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}