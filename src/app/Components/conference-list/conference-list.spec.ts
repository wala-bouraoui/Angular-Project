import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConferenceList } from './conference-list';

describe('ConferenceList', () => {
  let component: ConferenceList;
  let fixture: ComponentFixture<ConferenceList>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ConferenceList] }).compileComponents();
    fixture = TestBed.createComponent(ConferenceList);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display titles in uppercase', () => {
    expect(el.querySelector('h3')?.textContent).toBe('ANGULAR 21 CONFERENCE');
  });

  it('should format the date as dd/MM/yyyy', () => {
    expect(el.textContent).toContain('15/11/2027');
  });

  it('should colour buttons by remaining places', () => {
    const [a, b, c] = Array.from(el.querySelectorAll('button'));
    expect(a.classList).toContain('btn-green');
    expect(b.classList).toContain('btn-orange');
    expect(c.classList).toContain('btn-red');
  });

  it('should filter by title', async () => {
    component.search.set('signals');
    await fixture.whenStable();
    expect(el.querySelectorAll('article').length).toBe(1);
  });

  it('should show a message when nothing matches', async () => {
    component.search.set('zzz');
    await fixture.whenStable();
    expect(el.querySelector('.message')).toBeTruthy();
  });

  it('should add one participant per click', async () => {
    const before = component.conferences()[0].nbParticipants;
    (el.querySelector('button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(component.conferences()[0].nbParticipants).toBe(before + 1);
  });

  it('should show an empty state in details before any selection', () => {
    expect(el.querySelector('app-conference-details .empty')).toBeTruthy();
  });

  it('should pass the selected conference to ConferenceDetails', async () => {
    (el.querySelectorAll('article')[1] as HTMLElement).click();
    await fixture.whenStable();
    const details = el.querySelector('app-conference-details') as HTMLElement;
    expect(details.textContent).toContain('Signals Workshop');
    expect(details.textContent).toContain('2027-11-30');
  });

  it('should register from the details component via (registered)', async () => {
    (el.querySelectorAll('article')[1] as HTMLElement).click();
    await fixture.whenStable();
    const before = component.conferences()[1].nbParticipants;
    (el.querySelector('app-conference-details button') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(component.conferences()[1].nbParticipants).toBe(before + 1);
    expect(el.querySelector('app-conference-details')!.textContent).toContain('Places disponibles : 5');
  });
});
