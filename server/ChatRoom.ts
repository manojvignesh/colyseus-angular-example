import {Client, FossilDeltaSerializer, Room, serialize} from 'colyseus';

@serialize(FossilDeltaSerializer)
export class ChatRoom extends Room {
  private channel: any;

  onInit(options: any) {
    this.channel = options.channel;
    this.setPatchRate(1000 / 20);
    this.setState({messages: [`Welcome to ${options.channel} ChatRoom instance.`]});
  }

  requestJoin(options: any) {
    return options.channel === this.channel;
  }

  onJoin(client: Client) {
    console.log(client.id, 'joined ChatRoom!');
    this.state.messages.push(`${client.id} joined. Say hello!`);
  }

  onMessage(client: Client, data: any) {
    console.log(client.id, 'sent message on ChatRoom');
    this.state.messages.push(`${client.id}: ${data}`);
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.id, 'left ChatRoom');
    this.state.messages.push(`${client.id} left.`);
  }

  onDispose() {
    console.log('Disposing the room');
  }
}
