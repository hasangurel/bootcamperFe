import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechCareerComponent } from './tech-career.component';

describe('TechCareerComponent', () => {
  let component: TechCareerComponent;
  let fixture: ComponentFixture<TechCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechCareerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
