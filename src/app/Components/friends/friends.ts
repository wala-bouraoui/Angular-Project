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
    { id: 1, name: 'Sami', email: 'sami@example.com' },
    { id: 2, name: 'Sarra', email: 'sarra@example.com' },
    { id: 3, name: 'Amine', email: 'amine@example.com' },
  ];
}
