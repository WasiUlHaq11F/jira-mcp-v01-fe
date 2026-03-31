import { TableConfig } from "@/types/table";
	
	export const userTableConfigDefault: TableConfig = {
  columns: {
      userId: { visible: false, title: 'User Id', dataIndex: 'userId' },
      email: { visible: true, title: 'Email', dataIndex: 'email' },
      username: { visible: true, title: 'Username', dataIndex: 'username' },
      role: { visible: true, title: 'Role', dataIndex: 'role' },
      createdAt: { visible: true, title: 'Created At', dataIndex: 'createdAt' },
      updatedAt: { visible: true, title: 'Updated At', dataIndex: 'updatedAt' }
		},
};
export default userTableConfigDefault;