import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEmpCustomComponent } from './grid-emp-custom.component';

describe('GridEmpCustomComponent', () => {
  let component: GridEmpCustomComponent;
  let fixture: ComponentFixture<GridEmpCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridEmpCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEmpCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
