export type Action = 'view' | 'edit' | 'add' | 'delete' | 'upload' | 'detail';

		 type ObjectAccessRights = {
			 [object: string]: Action[];
		 };
		 
		 type AccessRights = {
			 [scope: string]: ObjectAccessRights;
		 };
		 
		 export const accessRights : AccessRights = {
  '_user:admin': {
    notification: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    release: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    sprint: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    ticketRelease: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    ticketSprint: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    ticket: ['add', 'delete', 'detail', 'edit', 'upload', 'view'],
    user: ['add', 'delete', 'detail', 'edit', 'upload', 'view']
  },
  '_user:projectManager': {
    notification: ['detail', 'view'],
    release: ['add', 'detail', 'edit', 'upload', 'view'],
    sprint: ['add', 'detail', 'edit', 'upload', 'view'],
    ticketRelease: ['add', 'detail', 'edit', 'upload', 'view'],
    ticketSprint: ['add', 'detail', 'edit', 'upload', 'view'],
    ticket: ['add', 'detail', 'edit', 'upload', 'view']
  },
  '_user:developer': {
    notification: ['detail', 'view'],
    release: ['detail', 'view'],
    sprint: ['detail', 'view'],
    ticketRelease: ['detail', 'view'],
    ticketSprint: ['detail', 'view'],
    ticket: ['detail', 'edit', 'upload', 'view']
  },
  '_user:qaTeam': {
    notification: ['detail', 'view'],
    release: ['detail', 'view'],
    sprint: ['detail', 'view'],
    ticketRelease: ['detail', 'view'],
    ticketSprint: ['detail', 'view'],
    ticket: ['detail', 'edit', 'upload', 'view']
  },
  '_user:leadership': {
    notification: ['detail', 'view'],
    release: ['detail', 'view'],
    sprint: ['detail', 'view'],
    ticket: ['detail', 'view']
  }
};