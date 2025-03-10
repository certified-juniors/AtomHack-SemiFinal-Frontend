import { Flex, Text, Title } from '@mantine/core';
import './index.css';

export const Main = () => {
    return (
        <Flex className="main-page__container">
            <div className="main-page__info__container">
                <Title order={3} mb={20}>
                    Система управления веществами
                </Title>
                <Text>
                    Это приложение позволяет в реальном времени отслеживать уровни веществ в
                    резервуарах, рассчитывая их на основе данных о давлении. Задайте количество
                    резервуаров, настройте их соединения и наблюдайте, как система моделирует
                    потоки, помогая контролировать динамику веществ.
                </Text>
            </div>
        </Flex>
    );
};
