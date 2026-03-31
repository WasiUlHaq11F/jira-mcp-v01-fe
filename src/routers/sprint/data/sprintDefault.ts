import { SprintCreate } from "../interface";
	export const defaultObject: SprintCreate = {
  name: "",
  startDate: new Date(),
  endDate: new Date(),
  status: "Planned",
  jiraSprintId: undefined,
};
export default defaultObject;