import { Modal, Table } from '@mantine/core';

import type { ReservoirInfoModalProps } from './types';

export const ReservoirInfoModal = ({ opened, close, reservoir }: ReservoirInfoModalProps) => {
    return (
        <Modal opened={opened} onClose={close} title="Информация о резервуаре">
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w={160}>Площадь (м²)</Table.Th>
                        <Table.Td>{reservoir?.area.toFixed(2)}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Уровень воды (м)</Table.Th>
                        <Table.Td>{reservoir?.level.toFixed(2)}</Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Th>Давление (КПа)</Table.Th>
                        <Table.Td>{reservoir?.pressure.toFixed(2)}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Modal>
    );
};
