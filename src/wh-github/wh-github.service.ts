import { Injectable, Headers } from '@nestjs/common';
import { DiscordService } from 'src/discord/discord.service';
import type { GitHubEvent, GitHubPayload, GithubIssue } from 'src/interfaces/github.interface';

@Injectable()
export class WhGithubService {

  constructor(
    private readonly discordService: DiscordService,
  ) { }



  handlePayload( event: GitHubEvent, payload: GitHubPayload ) {

    let message = '';

    switch ( event ) {
      case 'star':
        message = this.handleStar( payload );
        break;

      case 'issues':
        message = this.handleIssue( payload as GithubIssue );
        break;

      case 'ping':
        message = this.handlePing();
        break;
      default:
        console.log( `Unhandled event: ${ event }` );
      return;
    }

    this.discordService.notify( message );

  }

  private handleStar( payload: GitHubPayload ) {

    const { action, sender, repository } = payload;
    return `User ${ sender.login } ${ action } star on ${ repository.full_name }`;

  }

  private handleIssue( payload: GithubIssue ): string {

    const { action, issue, sender } = payload;

    if ( action === 'opened' ) {
      return `An issue was opened with this title ${ issue.title } by ${ sender.login }`;
    }

    if ( action === 'closed' ) {
      return `An issue was closed by ${ issue.user.login }`;
    }

    if ( action === 'reopened' ) {
      return `An issue was reopened by ${ issue.user.login }`;
    }


    return `Unhandled action for the issue event ${ action }`;


  }


  private handlePing() {
    return 'GitHub sent the ping event';
  }


}
