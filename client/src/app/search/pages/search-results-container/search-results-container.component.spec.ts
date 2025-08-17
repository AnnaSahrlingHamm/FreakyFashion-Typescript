import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsContainerComponent } from './search-results-container.component';

describe('SearchResultsContainerComponent', () => {
  let component: SearchResultsContainerComponent;
  let fixture: ComponentFixture<SearchResultsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultsContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
