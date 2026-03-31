import { TableConfig } from "@/types/table";
	
	export const ticketReleaseTableConfigDefault: TableConfig = {
  columns: {
      ticketReleaseId: { visible: false, title: 'Ticket Release Id', dataIndex: 'ticketReleaseId' },
      ticketId: { visible: true, title: 'Ticket Id', dataIndex: 'ticketId' },
      releaseId: { visible: true, title: 'Release Id', dataIndex: 'releaseId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default ticketReleaseTableConfigDefault;