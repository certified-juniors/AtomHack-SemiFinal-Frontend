import { ReactNode } from 'react'
import { NOTIFICATION_VARIANT } from '../constants/variant.ts'

export interface INotificationParam {
  color?: string
  icon?: ReactNode
  title: string
}

export interface IShowNotificationProps {
  variant?: NOTIFICATION_VARIANT
  message?: string
  isLoading?: boolean
}