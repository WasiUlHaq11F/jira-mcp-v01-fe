import { TableConfig } from "@/types/table";
	
	export const ticketTableConfigDefault: TableConfig = {
  columns: {
      ticketId: { visible: false, title: 'Ticket Id', dataIndex: 'ticketId' },
      title: { visible: true, title: 'Title', dataIndex: 'title' },
      description: { visible: true, title: 'Description', dataIndex: 'description' },
      assignedById: { visible: true, title: 'Assigned By Id', dataIndex: 'assignedById' },
      assignedToId: { visible: true, title: 'Assigned To Id', dataIndex: 'assignedToId' },
      issueType: { visible: true, title: 'Issue Type', dataIndex: 'issueType' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      dueDate: { visible: true, title: 'Due Date', dataIndex: 'dueDate' },
      timeLogHour: { visible: true, title: 'Time Log Hours', dataIndex: 'timeLogHour' },
      isBlocked: { visible: true, title: 'Is Blocked', dataIndex: 'isBlocked' },
      blockerDescription: { visible: true, title: 'Blocker Description', dataIndex: 'blockerDescription' },
      jiraTicketId: { visible: true, title: 'Jira Ticket Id', dataIndex: 'jiraTicketId' },
      jiraLink: { visible: true, title: 'Jira Link', dataIndex: 'jiraLink' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default ticketTableConfigDefault;