import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/entities/Coupon';
import { PlayerCoupon } from 'src/entities/PlayerCoupon';
import { Reward } from 'src/entities/Reward';
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

    @InjectRepository(Reward)
    private rewardRepository: Repository<Reward>,

    private readonly playerService: PlayerService,
    private readonly rewardService: RewardService,
  ) {}

  generateCouponValue() {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const couponValue = `COUPON-${randomNumber}`;
    return couponValue;
  }
  async redeemCoupon(redeemCouponDto) {
    const { playerId, rewardId } = redeemCouponDto;

    const player = await this.playerService.getPlayerById(playerId);
    const reward = await this.rewardService.getRewardById(rewardId);

    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    const currentDate = new Date();
    if (currentDate < reward.startDate || currentDate > reward.endDate) {
      throw new BadRequestException('Reward is not available at this time');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validate per-day limit
    const playerDailyCoupons = await this.playerCouponRepository.count({
      where: {
        player,
        coupon: rewardId,
        redeemedAt: today,
      },
    });

    if (playerDailyCoupons >= reward.perDayLimit) {
      throw new BadRequestException(
        'Player has exceeded the per-day limit for this reward',
      );
    }

    // Validate total limit
    const playerTotalCoupons = await this.playerCouponRepository.count({
      where: {
        player,
        coupon: rewardId,
      },
    });

    if (playerTotalCoupons >= reward.totalLimit) {
      throw new BadRequestException(
        'Player has exceeded the total limit for this reward',
      );
    }

    // Check if the player has already redeemed a coupon for this reward
    const existingCoupon = await this.playerCouponRepository.findOne({
      where: {
        player,
        coupon: rewardId,
      },
    });

    if (existingCoupon) {
      throw new BadRequestException(
        'Player has already redeemed a coupon for this reward',
      );
    }

    // Create and save the coupon
    const coupon = new Coupon();
    coupon.value = this.generateCouponValue();
    coupon.Reward = reward;
    await this.couponRepository.save(coupon);

    // Create and save the PlayerCoupon
    const playerCoupon = new PlayerCoupon();
    playerCoupon.player = player;
    playerCoupon.coupon = coupon;
    playerCoupon.redeemedAt = new Date();
    await this.playerCouponRepository.save(playerCoupon);

    // return playerCoupon;
    return { id: coupon.id, value: coupon.value };
  }
}
