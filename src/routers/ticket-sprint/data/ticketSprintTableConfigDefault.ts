import { TableConfig } from "@/types/table";
	
	export const ticketSprintTableConfigDefault: TableConfig = {
  columns: {
      ticketSprintId: { visible: false, title: 'Ticket Sprint Id', dataIndex: 'ticketSprintId' },
      ticketId: { visible: true, title: 'Ticket Id', dataIndex: 'ticketId' },
      sprintId: { visible: true, title: 'Sprint Id', dataIndex: 'sprintId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default ticketSprintTableConfigDefault;