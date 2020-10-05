export function asPercentage(number: number): string {
    const num = number.toFixed(2);

    if (number > 0) {
        return `+${num}%`;
    } else if (number < 0) {
        return `${num}%`;
    }

    return '0.00%';
}
