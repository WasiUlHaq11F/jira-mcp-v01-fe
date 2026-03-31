/**
 * Ticket Module Constants
 *
 * Centralized constants for the ticket module to avoid magic strings
 * and make refactoring easier.
 */

export const TICKET_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'ticket',
  ENTITY_NAME: 'Ticket',
  ENTITY_NAME_PLURAL: 'Tickets',
  LABEL_FIELD: 'ticketLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'ticketTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'ticketId',

  // Field names
  FIELDS: {
    TICKETID: 'ticketId',
    TITLE: 'title',
    DESCRIPTION: 'description',
    ASSIGNEDTOID: 'assignedToId',
    ISSUETYPE: 'issueType',
    STATUS: 'status',
    DUEDATE: 'dueDate',
    TIMELOGHOUR: 'timeLogHour',
    ISBLOCKED: 'isBlocked',
    BLOCKERDESCRIPTION: 'blockerDescription',
    JIRATICKETID: 'jiraTicketId',
    JIRALINK: 'jiraLink',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    ASSIGNEDBYID: 'assignedById'
  },

  // Routes
  ROUTES: {
    LIST: '/tickets',    CREATE: '/tickets/create',
    EDIT: '/tickets/edit',
    VIEW: '/tickets/view'
  },

  // React Query keys
  QUERY_KEY: 'ticket',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'ticket',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default TICKET_CONSTANTS;