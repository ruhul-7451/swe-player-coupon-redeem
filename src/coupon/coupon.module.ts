import { Module } from '@nestjs/common';
import { CouponController } from './controllers/coupon/coupon.controller';
import { CouponService } from './services/coupon/coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from '../entities/Coupon';
import { PlayerCoupon } from '../entities/PlayerCoupon';
import { PlayerModule } from '../player/player.module';
import { RewardModule } from '../reward/reward.module';
import { Reward } from '../entities/Reward';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, PlayerCoupon, Reward]),
    PlayerModule,
    RewardModule,
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
