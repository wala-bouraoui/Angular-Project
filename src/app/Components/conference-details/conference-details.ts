import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Conference } from '../../Models/conference';

@Component({
  selector: 'app-conference-details',
  imports: [DatePipe],
  templateUrl: './conference-details.html',
  styleUrl: './conference-details.css',
})
export class ConferenceDetails {
  /** Parent -> enfant : conférence sélectionnée dans la liste (@Input). */
  conference = input<Conference | null>(null);

  /** Enfant -> parent : demande d'inscription, avec l'id de la conférence (@Output). */
  registered = output<number>();

  remaining(c: Conference): number {
    return c.maxParticipants - c.nbParticipants;
  }

  register(c: Conference): void {
    this.registered.emit(c.id);
  }
}
