/**
 * TicketSprint Module Constants
 *
 * Centralized constants for the ticketSprint module to avoid magic strings
 * and make refactoring easier.
 */

export const TICKET_SPRINT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'ticketSprint',
  ENTITY_NAME: 'TicketSprint',
  ENTITY_NAME_PLURAL: 'TicketSprints',
  LABEL_FIELD: 'ticketSprintLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'ticketSprintTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'ticketSprintId',

  // Field names
  FIELDS: {
    TICKETSPRINTID: 'ticketSprintId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    TICKETID: 'ticketId',
    SPRINTID: 'sprintId'
  },

  // Routes
  ROUTES: {
    LIST: '/ticket-sprints',    CREATE: '/ticket-sprints/create',
    EDIT: '/ticket-sprints/edit',
    VIEW: '/ticket-sprints/view'
  },

  // React Query keys
  QUERY_KEY: 'ticketSprint',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'ticketSprint',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default TICKET_SPRINT_CONSTANTS;