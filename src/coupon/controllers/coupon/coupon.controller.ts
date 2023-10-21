import { Body, Controller, Post } from '@nestjs/common';
import { RedeemCouponDto } from '../../dtos/RedeemCoupon.dto';
import { CouponService } from '../../services/coupon/coupon.service';
@Controller('coupon-redeem')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  async redeemCoupon(@Body() redeemCouponDto: RedeemCouponDto) {
    return this.couponService.redeemCoupon(redeemCouponDto);
  }
}
