import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reward } from 'src/entities/Reward';
import { CreateRewardDto } from 'src/reward/dtos/CreateReward.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward) private rewardRepository: Repository<Reward>,
  ) {}

  async createReward(createRewardDto: CreateRewardDto) {
    const reward = this.rewardRepository.create({
      ...createRewardDto,
      name: createRewardDto.name,
    });
    await this.rewardRepository.save(reward);
    return reward;
  }

  async getRewardById(id: number) {
    return await this.rewardRepository.findOne({ where: { id } });
  }
}
