type validateDataToCreateTaskInputType = {
    name: string,
    price: number,
    expireIn: string
}

export function validateDataToCreateTask({ name, price, expireIn }: validateDataToCreateTaskInputType) {
    if (name.length <= 3) {
        return {
            field: 'name',
            message: 'No mínimo 3 caracteris'
        };
    }

    if (name.length > 80) {
        return {
            field: 'name',
            message: 'No máximo 80 caracteris'
        }
    }

    if (price < 0.01) {
        return {
            field: 'price',
            message: 'No minimo 1 centavo'
        }
    }

    if (expireIn.length < 1) {
        return {
            field: 'expireIn',
            message: 'Seleciona a data e hora de expiração'
        }
    }

    const expireAtConverted: Date = new Date(expireIn);
    const currentDate = new Date();

    if (expireAtConverted <= currentDate) {
        return {
            field: 'expireIn',
            message: 'Precisa ser uma data futura'
        }
    }
}