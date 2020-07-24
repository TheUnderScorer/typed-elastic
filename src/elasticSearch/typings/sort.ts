export type OrderDirection = "asc" | "desc";

export type OrderMode = "min" | "max" | "sum" | "avg";

export type OrderSettings = {
  order: OrderDirection;
  mode?: OrderMode;
};

export type OrderParam = Record<string, OrderSettings> | string | Record<string, OrderDirection>;

export type OrderParams = OrderParam | OrderParam[];
