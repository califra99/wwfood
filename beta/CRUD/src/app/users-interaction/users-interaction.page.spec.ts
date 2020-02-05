import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersInteractionPage } from './users-interaction.page';

describe('UsersInteractionPage', () => {
  let component: UsersInteractionPage;
  let fixture: ComponentFixture<UsersInteractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersInteractionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersInteractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
