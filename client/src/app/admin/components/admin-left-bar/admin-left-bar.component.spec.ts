import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftBarComponent } from './admin-left-bar.component';

describe('AdminLeftBarComponent', () => {
  let component: AdminLeftBarComponent;
  let fixture: ComponentFixture<AdminLeftBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLeftBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLeftBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
