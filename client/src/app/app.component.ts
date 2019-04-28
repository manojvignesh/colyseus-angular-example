import {Component, OnInit} from '@angular/core';
import {Client, Room} from 'colyseus.js';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  messages: string[] = [];
  text = new FormControl('');
  private chatRoom: Room;
  private client: Client;

  ngOnInit(): void {
    const host = window.document.location.host.replace(/:.*/, '');
    this.client = new Client(
      location.protocol.replace('http', 'ws') +
        host +
        (location.port ? ':' + location.port : '') +
        '/ws'
    );
    this.chatRoom = this.client.join('chat', {channel: 'Default'});
    this.chatRoom.onStateChange.add(({messages}) => (this.messages = messages));
  }

  onSubmit() {
    this.chatRoom.send(this.text.value);
    this.text.setValue('');
  }
}
