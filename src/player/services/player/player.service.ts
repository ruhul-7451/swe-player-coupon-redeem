import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from 'src/entities/Player';
import { CreatePlayerDto } from 'src/player/dtos/CreatePlayer.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    const player = this.playerRepository.create({
      ...createPlayerDto,
      name: createPlayerDto.name,
    });
    await this.playerRepository.save(player);
    return player;
  }

  async getPlayers() {
    const players = await this.playerRepository.find();
    return players;
  }
}
