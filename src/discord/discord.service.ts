import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordService {

  private readonly discordWebhookUrl = 'https://discord.com/api/webhooks/1167547072875089940/0EVA_tNJf0KNAgs5-OhUSqYX8or_e9PxbIRAg82tOvXsnsefL6kGmL_LLFXJv0kZ4M36';

  constructor() { }


  async notify( message: string ) {

    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: { url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZycHVhaG5jcXNqcG43ZWtpMW9vNGYwZnU0OGhuem91Zmh6ZWNnaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/du3J3cXyzhj75IOgvA/giphy.gif' }
      //   }
      // ]
    };

    const resp = await fetch( this.discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( body ),
    } );

    if ( !resp.ok ) {
      console.log( 'Error sending message to discord' );
      return false;
    }

    return true;
  }



}
