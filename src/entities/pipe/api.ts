import { apiInstance } from '@/src/shared/api/index';

import type { PipeType } from './model/Pipe';

export const createNewPipe = async (
    diameter: number,
    sourceId: number,
    targetId: number
): Promise<{ pipe: PipeType }> => {
    try {
        const response = await apiInstance.post('/pipes', { diameter, sourceId, targetId });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const updatePipeById = async (id: number, diameter: number): Promise<{ pipe: PipeType }> => {
    try {
        const response = await apiInstance.put(`/pipes/${id}`, { diameter });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const deletePipeById = async (id: number) => {
    try {
        await apiInstance.delete(`/pipes/${id}`);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};
