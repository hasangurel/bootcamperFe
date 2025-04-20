import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoderSpaceComponent } from './coder-space.component';

describe('CoderSpaceComponent', () => {
  let component: CoderSpaceComponent;
  let fixture: ComponentFixture<CoderSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoderSpaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoderSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
