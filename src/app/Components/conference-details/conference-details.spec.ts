import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceDetails } from './conference-details';

describe('ConferenceDetails', () => {
  let fixture: ComponentFixture<ConferenceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ConferenceDetails] }).compileComponents();
    fixture = TestBed.createComponent(ConferenceDetails);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display a message when no conference is selected', () => {
    expect((fixture.nativeElement as HTMLElement).querySelector('.empty')).toBeTruthy();
  });

  it('should display the conference and emit on register', async () => {
    fixture.componentRef.setInput('conference', {
      id: 7, title: 'Test', description: 'Desc', date: new Date(2027, 0, 5),
      place: 'Tunis', maxParticipants: 10, nbParticipants: 4,
    });
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Places disponibles : 6');
    let emitted: number | undefined;
    fixture.componentInstance.registered.subscribe((id) => (emitted = id));
    el.querySelector('button')!.click();
    expect(emitted).toBe(7);
  });
});
