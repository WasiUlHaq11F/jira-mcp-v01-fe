/**
 * Notification Module Constants
 *
 * Centralized constants for the notification module to avoid magic strings
 * and make refactoring easier.
 */

export const NOTIFICATION_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'notification',
  ENTITY_NAME: 'Notification',
  ENTITY_NAME_PLURAL: 'Notifications',
  LABEL_FIELD: 'notificationLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'notificationTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'notificationId',

  // Field names
  FIELDS: {
    NOTIFICATIONID: 'notificationId',
    TYPENAME: 'typeName',
    MESSAGE: 'message',
    STATUS: 'status',
    NOTIFICATIONCHANNEL: 'notificationChannel',
    JIRALINK: 'jiraLink',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    TICKETID: 'ticketId',
    RECIPIENTID: 'recipientId'
  },

  // Routes
  ROUTES: {
    LIST: '/notifications',    CREATE: '/notifications/create',
    EDIT: '/notifications/edit',
    VIEW: '/notifications/view'
  },

  // React Query keys
  QUERY_KEY: 'notification',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'notification',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default NOTIFICATION_CONSTANTS;