import { Module } from '@nestjs/common';
import { RewardController } from './controllers/reward/reward.controller';
import { RewardService } from './services/reward/reward.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from 'src/entities/Reward';

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardController],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
