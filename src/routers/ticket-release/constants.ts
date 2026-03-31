/**
 * TicketRelease Module Constants
 *
 * Centralized constants for the ticketRelease module to avoid magic strings
 * and make refactoring easier.
 */

export const TICKET_RELEASE_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'ticketRelease',
  ENTITY_NAME: 'TicketRelease',
  ENTITY_NAME_PLURAL: 'TicketReleases',
  LABEL_FIELD: 'ticketReleaseLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'ticketReleaseTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'ticketReleaseId',

  // Field names
  FIELDS: {
    TICKETRELEASEID: 'ticketReleaseId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt',
    TICKETID: 'ticketId',
    RELEASEID: 'releaseId'
  },

  // Routes
  ROUTES: {
    LIST: '/ticket-releases',    CREATE: '/ticket-releases/create',
    EDIT: '/ticket-releases/edit',
    VIEW: '/ticket-releases/view'
  },

  // React Query keys
  QUERY_KEY: 'ticketRelease',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'ticketRelease',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default TICKET_RELEASE_CONSTANTS;