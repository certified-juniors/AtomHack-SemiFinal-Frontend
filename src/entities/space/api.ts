import { apiInstance } from '@/src/shared/api/index';

import type { PipeType } from '../pipe';
import type { ReservoirType } from '../reservoir';

import type { SpaceType } from './model';

export const getAllSpaces = async (
    name?: string,
    page?: number
): Promise<{ content: SpaceType[]; totalElements: number; totalPages: number; size: number }> => {
    try {
        const response = await apiInstance.get(
            `/spaces?page=${page}&size=10&pattern=${name || ''}`
        );

        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const getSpaceById = async (
    id: number
): Promise<{ space: SpaceType; reservoirs: ReservoirType[]; pipes: PipeType[] }> => {
    try {
        const response = await apiInstance.get(`/spaces/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const createNewSpace = async (name: string): Promise<SpaceType> => {
    try {
        const response = await apiInstance.post('/spaces', { name });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};

export const updateSpaceById = async (id: number, name: string): Promise<SpaceType> => {
    try {
        const response = await apiInstance.put(`/spaces/${id}`, { name });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Неизвестная ошибка');
    }
};
