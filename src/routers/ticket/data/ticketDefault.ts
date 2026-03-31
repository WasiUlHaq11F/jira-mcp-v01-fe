import { TicketCreate } from "../interface";
	export const defaultObject: TicketCreate = {
  title: "",
  description: "",
  assignedById: "",
  assignedToId: "",
  issueType: "Task",
  status: "Open",
  dueDate: new Date(),
  timeLogHour: undefined,
  isBlocked: false,
  blockerDescription: undefined,
  jiraTicketId: undefined,
  jiraLink: undefined,
};
export default defaultObject;