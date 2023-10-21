import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../../../entities/Player';
import { CreatePlayerDto } from '../../dtos/CreatePlayer.dto';
import { UpdatePlayerDto } from '../../dtos/UpdatePlayer.dto';

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

  async updatePlayerById(id: number, updatePlayerDto: UpdatePlayerDto) {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new Error('Player not found');
    }
    const updatedPlayer = await this.playerRepository.save({
      ...player,
      ...updatePlayerDto,
    });
    return updatedPlayer;
  }

  async getPlayerById(id: number) {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new Error('Player not found');
    }
    return player;
  }
}
