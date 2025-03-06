const ERROR_VARIANT = {
    404: {
        title: 'Ошибка 404',
        subtitle:
            'Поздравляем! Вы нашли несуществующую страницу, а теперь настоятельно рекомендуем вернуться обратно)',
        onClick: () => {
            window.location.href = '/';
        },
        buttonText: 'Вернуться на главную',
    },
    500: {
        title: 'Внутренняя ошибка сервера',
        subtitle: (
            <>
                {'Что-то пошло не так на нашей стороне.'}
                <br />
                {'Попробуйте перезагрузить страницу позже.'}
            </>
        ),
        onClick: () => {
            window.location.reload();
        },
        buttonText: 'Перезагрузить страницу',
    },
};

export default ERROR_VARIANT;
