import { Controller, Headers, Body, Post } from '@nestjs/common';
import { WhGithubService } from './wh-github.service';
import { GitHubEvent, GitHubPayload } from 'src/interfaces/github.interface';

@Controller( 'github' )
export class WhGithubController {
  constructor( private readonly whGithubService: WhGithubService ) { }



  @Post( '/' )
  webhookHandler(
    @Headers( 'x-github-event' ) githubEvent: GitHubEvent,
    @Body() body: GitHubPayload,
  ): string {
    
    // console.log(body);
    console.log({githubEvent});
    const json = JSON.stringify( body );
    console.log(json);

    // console.log( { githubEvent, body } );
    this.whGithubService.handlePayload( githubEvent, body );
    

    return 'done';
  }

}

