import { TableConfig } from "@/types/table";
	
	export const notificationTableConfigDefault: TableConfig = {
  columns: {
      notificationId: { visible: false, title: 'Notification Id', dataIndex: 'notificationId' },
      ticketId: { visible: true, title: 'Ticket Id', dataIndex: 'ticketId' },
      recipientId: { visible: true, title: 'Recipient Id', dataIndex: 'recipientId' },
      typeName: { visible: true, title: 'Type Name', dataIndex: 'typeName' },
      message: { visible: true, title: 'Message', dataIndex: 'message' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      notificationChannel: { visible: true, title: 'Notification Channel', dataIndex: 'notificationChannel' },
      jiraLink: { visible: true, title: 'Jira Link', dataIndex: 'jiraLink' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default notificationTableConfigDefault;