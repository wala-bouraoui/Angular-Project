import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  notifList = [
    { id: 1, message: 'Vous avez reçu un nouveau message' },
    { id: 2, message: 'Votre profil a été mis à jour' },
  ];

  show = false;

  toggleNotifications(): void {
    this.show = !this.show;
  }
}
