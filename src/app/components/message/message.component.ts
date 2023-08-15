import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'src/app/services/message.service';

@UntilDestroy()
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
      .pipe(untilDestroyed(this))
      .subscribe((message) => {
        this.isHidden = false;
        this.message = message;
        console.log(this.message);
        
      });
  }
}
