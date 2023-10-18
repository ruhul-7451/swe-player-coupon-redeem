import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlayerDto } from 'src/player/dtos/CreatePlayer.dto';
import { UpdatePlayerDto } from 'src/player/dtos/UpdatePlayer.dto';
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

  @Put(':id')
  updatePlayerById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayerById(id, updatePlayerDto);
  }

  @Get(':id')
  getPlayerById(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.getPlayerById(id);
  }
}
