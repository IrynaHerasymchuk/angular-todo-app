import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message = '';
  isHidden = true;

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.messageService.message$
      .subscribe((message) => {
        this.isHidden = false;
        this.message = message;
        console.log(this.message);
        
      });
  }
}
