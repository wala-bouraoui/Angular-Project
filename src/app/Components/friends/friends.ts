import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends',
  imports: [FormsModule],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends {
  friendsList = [
    { name: 'Sami', email: 'sami@example.com' },
    { name: 'Sara', email: 'sara@example.com' },
    { name: 'Ahmed', email: 'ahmed@example.com' }
  ]

}
