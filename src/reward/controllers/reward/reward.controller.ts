import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRewardDto } from '../../dtos/CreateReward.dto';
import { RewardService } from '../../services/reward/reward.service';

@Controller('reward')
export class RewardController {
  constructor(private rewardService: RewardService) {}

  @Post()
  createReward(@Body() createRewardDto: CreateRewardDto) {
    return this.rewardService.createReward(createRewardDto);
  }

  @Get(':id')
  getRewardById(@Body() rewardId: number) {
    return this.rewardService.getRewardById(rewardId);
  }
}
