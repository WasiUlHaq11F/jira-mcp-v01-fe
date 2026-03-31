/**
 * Sprint Module Constants
 *
 * Centralized constants for the sprint module to avoid magic strings
 * and make refactoring easier.
 */

export const SPRINT_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'sprint',
  ENTITY_NAME: 'Sprint',
  ENTITY_NAME_PLURAL: 'Sprints',
  LABEL_FIELD: 'sprintLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'sprintTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'sprintId',

  // Field names
  FIELDS: {
    SPRINTID: 'sprintId',
    NAME: 'name',
    STARTDATE: 'startDate',
    ENDDATE: 'endDate',
    STATUS: 'status',
    JIRASPRINTID: 'jiraSprintId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/sprints',    CREATE: '/sprints/create',
    EDIT: '/sprints/edit',
    VIEW: '/sprints/view'
  },

  // React Query keys
  QUERY_KEY: 'sprint',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'sprint',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default SPRINT_CONSTANTS;