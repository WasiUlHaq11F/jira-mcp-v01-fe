/**
 * Release Module Constants
 *
 * Centralized constants for the release module to avoid magic strings
 * and make refactoring easier.
 */

export const RELEASE_CONSTANTS = {
  // Entity identifiers
  ENTITY_KEY: 'release',
  ENTITY_NAME: 'Release',
  ENTITY_NAME_PLURAL: 'Releases',
  LABEL_FIELD: 'releaseLabel',

  // Table configuration
  TABLE_CONFIG_KEY: 'releaseTableConfiguration',

  // Primary key field
  PRIMARY_KEY: 'releaseId',

  // Field names
  FIELDS: {
    RELEASEID: 'releaseId',
    NAME: 'name',
    VERSIONNUMBER: 'versionNumber',
    RELEASEDATE: 'releaseDate',
    STATUS: 'status',
    JIRARELEASEID: 'jiraReleaseId',
    CREATEDAT: 'createdAt',
    UPDATEDAT: 'updatedAt'
  },

  // Routes
  ROUTES: {
    LIST: '/releases',    CREATE: '/releases/create',
    EDIT: '/releases/edit',
    VIEW: '/releases/view'
  },

  // React Query keys
  QUERY_KEY: 'release',

  // Permission configuration
  PERMISSIONS: {
    MODULE: '',
    RESOURCE: 'release',
    ACTIONS: {
      VIEW: 'view' as const,
      EDIT: 'edit' as const,
      DELETE: 'delete' as const
    },
  },
} as const;

export default RELEASE_CONSTANTS;