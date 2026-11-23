import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conference } from '../../Models/conference';
import { ConferenceDetails } from '../conference-details/conference-details';

@Component({
  selector: 'app-conference-list',
  imports: [FormsModule, NgClass, UpperCasePipe, DatePipe, ConferenceDetails],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  /** Liste des conférences (source de données du composant). */
  conferences = signal<Conference[]>([
    {
      id: 1,
      title: 'Angular 21 Conference',
      description: 'Découvrez les nouveautés d’Angular 21 : signals, contrôle de flux natif et zoneless.',
      date: new Date(2027, 10, 15),
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 75,
    },
    {
      id: 2,
      title: 'Signals Workshop',
      description: 'Atelier pratique sur les Signals Angular.',
      date: new Date(2027, 10, 30),
      place: 'Ariana',
      maxParticipants: 50,
      nbParticipants: 44,
    },
    {
      id: 3,
      title: 'Web Conference',
      description: 'Conférence sur les tendances du développement web moderne.',
      date: new Date(2027, 10, 20),
      place: 'Sousse',
      maxParticipants: 80,
      nbParticipants: 80,
    },
  ]);

  /** Texte saisi dans la zone de recherche (two-way binding avec ngModel). */
  search = signal('');

  /** Id de la conférence sélectionnée dans la liste. */
  selectedId = signal<number | null>(null);

  /** Conférence sélectionnée, transmise à ConferenceDetails via [conference]. */
  selected = computed(() => this.conferences().find((c) => c.id === this.selectedId()) ?? null);

  /** Conférences à venir uniquement. */
  upcoming = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.conferences().filter((c) => c.date >= today);
  });

  /** Conférences à venir filtrées par le titre saisi. */
  filtered = computed(() => {
    const term = this.search().trim().toLowerCase();
    return this.upcoming().filter((c) => c.title.toLowerCase().includes(term));
  });

  remaining(c: Conference): number {
    return c.maxParticipants - c.nbParticipants;
  }

  /** Classe CSS du bouton : vert (disponible), orangé (< 10 places), rouge (complet). */
  buttonClass(c: Conference): string {
    const left = this.remaining(c);
    if (left <= 0) return 'btn-red';
    if (left < 10) return 'btn-orange';
    return 'btn-green';
  }

  select(id: number): void {
    this.selectedId.set(id);
  }

  /** +1 participant par clic (impossible si la conférence est complète). */
  register(c: Conference): void {
    this.registerById(c.id);
  }

  /** Appelée aussi par l'événement (registered) émis par ConferenceDetails. */
  registerById(id: number): void {
    this.conferences.update((list) =>
      list.map((x) =>
        x.id === id && x.nbParticipants < x.maxParticipants
          ? { ...x, nbParticipants: x.nbParticipants + 1 }
          : x,
      ),
    );
  }
}
