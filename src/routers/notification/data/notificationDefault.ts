import { NotificationCreate } from "../interface";
	export const defaultObject: NotificationCreate = {
  ticketId: "",
  recipientId: "",
  typeName: "Ticket Created",
  message: "",
  status: "Unread",
  notificationChannel: undefined,
  jiraLink: undefined,
};
export default defaultObject;