import { apiInstance } from '@/src/shared/api/index';
import type { ReservoirType } from '@/src/types';

export const postNewReservoir = async (area: number): Promise<{ reservoir: ReservoirType }> => {
    try {
        const response = await apiInstance.post('/reservoirs', { area });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const updateReservoirById = async (
    id: number,
    area: number
): Promise<{ reservoir: ReservoirType }> => {
    try {
        const response = await apiInstance.put(`/reservoirs/${id}`, { area });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const deleteReservoirById = async (id: number) => {
    try {
        await apiInstance.delete(`/reservoirs/${id}`);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};
