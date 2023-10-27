import { Module } from '@nestjs/common';
import { WhGithubService } from './wh-github.service';
import { WhGithubController } from './wh-github.controller';
import { DiscordService } from 'src/discord/discord.service';

@Module({
  controllers: [WhGithubController],
  providers: [WhGithubService, DiscordService],
})
export class WhGithubModule {}
