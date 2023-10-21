import { Module } from '@nestjs/common';
import { CouponController } from './controllers/coupon/coupon.controller';
import { CouponService } from './services/coupon/coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/Coupon';
import { PlayerCoupon } from 'src/entities/PlayerCoupon';
import { PlayerModule } from 'src/player/player.module';
import { RewardModule } from 'src/reward/reward.module';
import { Reward } from 'src/entities/Reward';

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
