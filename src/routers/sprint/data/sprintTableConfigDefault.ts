import { TableConfig } from "@/types/table";
	
	export const sprintTableConfigDefault: TableConfig = {
  columns: {
      sprintId: { visible: false, title: 'Sprint Id', dataIndex: 'sprintId' },
      name: { visible: true, title: 'Name', dataIndex: 'name' },
      startDate: { visible: true, title: 'Start Date', dataIndex: 'startDate' },
      endDate: { visible: true, title: 'End Date', dataIndex: 'endDate' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      jiraSprintId: { visible: true, title: 'Jira Sprint Id', dataIndex: 'jiraSprintId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default sprintTableConfigDefault;