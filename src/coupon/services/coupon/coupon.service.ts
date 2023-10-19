import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/Coupon';
import { PlayerCoupon } from 'src/entities/PlayerCoupon';
import { PlayerService } from 'src/player/services/player/player.service';
import { RewardService } from 'src/reward/services/reward/reward.service';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,

    @InjectRepository(PlayerCoupon)
    private playerCouponRepository: Repository<PlayerCoupon>,

    private readonly playerService: PlayerService,
    private readonly rewardService: RewardService,
  ) {}

  generateCouponValue() {
    // Generate a unique random number as part of the coupon value
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number

    // Combine it with the "COUPON-" prefix
    const couponValue = `COUPON-${randomNumber}`;

    return couponValue;
  }
  async redeemCoupon(redeemCouponDto) {
    const { playerId, rewardId } = redeemCouponDto;
    const player = await this.playerService.getPlayerById(playerId);
    const reward = await this.rewardService.getRewardById(rewardId);

    // Check if the reward exists
    if (!reward) {
      throw new Error('Reward not found');
    }

    // Check if the reward is valid within its start and end dates
    const currentDate = new Date();
    if (currentDate < reward.startDate || currentDate > reward.endDate) {
      throw new Error('Reward is not available at this time');
    }

    // Check if the player has exceeded the per-day limit for this reward
    const playerDailyCoupons = await this.playerCouponRepository.count({
      where: {
        player,
        coupon: rewardId,
        redeemedAt: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    if (playerDailyCoupons >= reward.perDayLimit) {
      throw new Error('Player has exceeded the per-day limit for this reward');
    }

    // Check if the player has exceeded the total limit for this reward
    const playerTotalCoupons = await this.playerCouponRepository.count({
      where: {
        player,
        coupon: rewardId,
      },
    });

    if (playerTotalCoupons >= reward.totalLimit) {
      throw new Error('Player has exceeded the total limit for this reward');
    }

    // Check if the player has already redeemed a coupon for this reward
    const existingCoupon = await this.playerCouponRepository.findOne({
      where: {
        player,
        coupon: rewardId,
      },
    });

    if (existingCoupon) {
      throw new Error('Player has already redeemed a coupon for this reward');
    }

    const coupon = new Coupon();
    coupon.value = this.generateCouponValue();
    coupon.Reward = reward;
    const savedCoupon = await this.couponRepository.save(coupon);

    const playerCoupon = new PlayerCoupon();
    playerCoupon.player = player;
    playerCoupon.coupon = savedCoupon;
    playerCoupon.redeemedAt = new Date();

    const redeemedCoupon = await this.playerCouponRepository.save(playerCoupon);

    return redeemedCoupon;
  }
}
