import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupon.controller';

describe('CouponController', () => {
  let controller: CouponController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponController],
    }).compile();

    controller = module.get<CouponController>(CouponController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('redeemCoupons', () => {
    it('should return an array of coupons', async () => {
      const result = await controller.redeemCoupon({
        playerId: 1,
        rewardId: 1,
      });
      expect(result).toBeInstanceOf(Object);
    });
  });
});
