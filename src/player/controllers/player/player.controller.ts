import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from 'src/player/dtos/CreatePlayer.dto';
import { PlayerService } from 'src/player/services/player/player.service';

@Controller('player')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Get()
  getPlayers() {
    return this.playerService.getPlayers();
  }

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }
}
