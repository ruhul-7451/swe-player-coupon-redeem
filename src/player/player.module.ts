import { Module } from '@nestjs/common';
import { PlayerController } from './controllers/player/player.controller';
import { PlayerService } from './services/player/player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/entities/Player';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
