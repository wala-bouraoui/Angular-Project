import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  list = [
    { label: 'Accueil', target: 'top' },
    { label: 'Profil', target: 'profil' },
    { label: 'Conférences', target: 'conferences' },
    { label: 'Amis', target: 'amis' },
    { label: 'Notifications', target: 'notifications' },
    { label: 'Admin', target: 'footer' },
  ];

  active = signal('Accueil');

  select(item: { label: string; target: string }, event: Event): void {
    event.preventDefault();
    this.active.set(item.label);
    const el = item.target === 'top' ? document.body : document.getElementById(item.target);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
