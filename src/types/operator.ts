import { OperatorEnum } from "@/eums/operator";

/** Union type of enum values */
export type Operator = typeof OperatorEnum[keyof typeof OperatorEnum];