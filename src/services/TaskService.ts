import { baseUrl } from "../configs/api";
import { SaveTaskModel } from "../models/SaveTaskModel";
import { TaskModel } from "../models/TaskModel";
import { UpdateTaskModel } from "../models/UpdateTaskModel";
const defaultHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

export async function save({ name, price, expireAt }: SaveTaskModel): Promise<TaskModel> {
    try {
        const request = await fetch(`${baseUrl}/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                expire_at: expireAt
            }),
            headers: defaultHeader
        })

        const body = await request.json();

        if (request.status != 201) {
            throw new Error(body.message);
        }

        return body;
    } catch {
        throw new Error("Infelizmente ocorreu um erro durante a criação, tente novamente mais tarde.");
    }
}

export async function getAll(): Promise<TaskModel[]> {
    try {
        const request = await fetch(`${baseUrl}/tasks/all`);
        const body = await request.json();

        if (request.status != 200) {
            throw new Error(body.message);
        }

        return body;
    } catch {
        throw new Error("Infelizmente ocorreu um erro durante a busca, tente novamente mais tarde.");
    }
}

export async function update({ id, name, price, expireAt }: UpdateTaskModel) {
    const request = await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            price,
            expireAt
        }),
        headers: defaultHeader
    });

    const body = await request.json();

    if (request.status != 200) {
        throw new Error(body.message);
    }

    return body as TaskModel;
}

export async function togglePosition(taskId: number, newPosition: number): Promise<TaskModel[]> {
    try {
        const request = await fetch(`${baseUrl}/tasks/change_position`, {
            method: 'PUT',
            body: JSON.stringify({
                task_id: taskId,
                new_position: newPosition
            }),
            headers: defaultHeader
        });

        const body = await request.json();

        if (request.status != 200) {
            throw new Error(body.message);
        }

        return body as TaskModel[];
    } catch {
        throw new Error("Infelizmente ocorreu um erro durante a alteração, tente novamente mais tarde.");
    }
}

export async function remove(taskId: number): Promise<void> {
    try {
        const request = await fetch(`${baseUrl}/tasks/${taskId}`, {
            method: 'DELETE'
        });

        if (request.status != 200) {
            throw new Error("Não foi possível deletar essa tarefa.");
        }
    } catch {
        throw new Error("Infelizmente ocorreu um erro durante a exclusão, tente novamente mais tarde.");
    }
}
