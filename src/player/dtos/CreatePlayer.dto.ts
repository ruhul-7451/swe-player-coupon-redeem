export class CreatePlayerDto {
  name: string;
  dailyCouponLimit: number;
  totalCouponLimit: number;
  redeemedCoupons: number[];
}
