export * from "./pagination";
export * from "./sort";
export * from "./query";
export * from "./aggregation";

export type BaseEntity = { [key: string]: any; id: string; version?: number };
