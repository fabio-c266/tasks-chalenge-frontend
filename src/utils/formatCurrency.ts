export function formatCurrency(value: string) {
    const onlyNumericCaracteris = value.replace(/[^\d]/g, '');
    const numericValue = parseInt(onlyNumericCaracteris, 10) / 100;
    const formatted = numericValue.toFixed(2);

    return formatted == 'NaN' ? '' : formatted;
}