import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Navbar } from './Components/navbar/navbar';
import { Profil } from './Components/profil/profil';
import { ConferenceList } from './Components/conference-list/conference-list';
import { Friends } from './Components/friends/friends';
import { Notifications } from './Components/notifications/notifications';
import { Footer } from './Components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Profil, ConferenceList, Friends, Notifications, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
