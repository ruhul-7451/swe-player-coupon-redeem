import { Body, Controller, Post } from '@nestjs/common';
import { RedeemCouponDto } from 'src/coupon/dtos/RedeemCoupon.dto';
import { CouponService } from 'src/coupon/services/coupon/coupon.service';
@Controller('coupon-redeem')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async redeemCoupon(@Body() redeemCouponDto: RedeemCouponDto) {
    return this.couponService.redeemCoupon(redeemCouponDto);
  }
}
