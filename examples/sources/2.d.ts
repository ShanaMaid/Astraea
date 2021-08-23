/** @@ POST /api/v1/goods/detail/:id @@ */

export type RequestObject = {
  id: number;
};

export type ResponseObject = {
  name: string;
  type: GoodsType;
};

export enum GoodsType {
  NORMAL = 1,
  VIP = 2,
}