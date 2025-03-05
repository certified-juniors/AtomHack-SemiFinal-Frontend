import { notifications } from '@mantine/notifications'
import { IoAlertOutline, IoCheckmark } from 'react-icons/io5'
import { NOTIFICATION_VARIANT } from '../constants/variant.ts'
import { INotificationParam, IShowNotificationProps } from '../types/notification.ts'

const NOTIFICATION_PARAMS: Record<NOTIFICATION_VARIANT, INotificationParam> = {
  [NOTIFICATION_VARIANT.SUCCESS]: {
    color: 'green',
    icon: <IoCheckmark />,
    title: 'Успешно',
  },
  [NOTIFICATION_VARIANT.ERROR]: {
    color: 'red',
    icon: <IoAlertOutline />,
    title: 'Ошибка',
  },
  [NOTIFICATION_VARIANT.WARNING]: {
    color: 'yellow',
    icon: <IoAlertOutline />,
    title: 'Предупреждение',
  },
  [NOTIFICATION_VARIANT.LOADING]: {
    color: 'gray',
    title: 'Загрузка',
  },
  [NOTIFICATION_VARIANT.DEFAULT]: {
    title: 'Уведомление',
    color: 'indigo',
  },
}

function showNotification({
                            variant = NOTIFICATION_VARIANT.DEFAULT,
                            message,
                            isLoading = false,
                          }: IShowNotificationProps): void {
  const params = NOTIFICATION_PARAMS[variant] || NOTIFICATION_PARAMS[NOTIFICATION_VARIANT.DEFAULT]

  notifications.show({
    title: params.title ?? '',
    message: isLoading ? 'Загрузка данных...' : message,
    color: isLoading ? 'gray' : params.color,
    icon: params.icon ?? '',
    withCloseButton: !isLoading,
    autoClose: isLoading ? false : 3000,
    loading: isLoading,
  })
}

export default showNotification