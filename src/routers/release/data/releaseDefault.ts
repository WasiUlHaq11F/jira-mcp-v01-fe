import { ReleaseCreate } from "../interface";
	export const defaultObject: ReleaseCreate = {
  name: "",
  versionNumber: "",
  releaseDate: new Date(),
  status: "Planned",
  jiraReleaseId: undefined,
};
export default defaultObject;