import { TableConfig } from "@/types/table";
	
	export const releaseTableConfigDefault: TableConfig = {
  columns: {
      releaseId: { visible: false, title: 'Release Id', dataIndex: 'releaseId' },
      name: { visible: true, title: 'Name', dataIndex: 'name' },
      versionNumber: { visible: true, title: 'Version Number', dataIndex: 'versionNumber' },
      releaseDate: { visible: true, title: 'Release Date', dataIndex: 'releaseDate' },
      status: { visible: true, title: 'Status', dataIndex: 'status' },
      jiraReleaseId: { visible: true, title: 'Jira Release Id', dataIndex: 'jiraReleaseId' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default releaseTableConfigDefault;