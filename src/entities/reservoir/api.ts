import { apiInstance } from '@/src/shared/api/index';

import type { ReservoirType } from './model/Reservoir';

export const postNewReservoir = async (spaceId: number, area: number): Promise<ReservoirType> => {
    try {
        const response = await apiInstance.post('/reservoirs', { area, spaceId });
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

export const deleteReservoirById = async (id: number): Promise<string> => {
    try {
        const response = await apiInstance.delete(`/reservoirs/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};
