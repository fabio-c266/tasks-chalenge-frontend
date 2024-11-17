import { TaskModel } from "../models/TaskModel";

export function getTaskBorderColor({ price, expire_at: expireAt }: TaskModel) {
    const borders = {
        'default': 'border-transparent',
        'highPrice': 'border-yellow-600',
        'expired': 'border-red-600'
    }

    if (price >= 1000) return borders['highPrice'];

    const currentDate = new Date();
    const expireAtConverted = new Date(expireAt);

    if (currentDate > expireAtConverted) {
        return borders['expired']
    }

    return borders['default'];
}