import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateCity, validateCityWithParams } from '../../shared/validation/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html'
})
export class FlightEditComponent implements OnInit {
  id: string;
  showDetails: string;
  showWarning = false;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.showDetails = p['showDetails'];
    });

    this.editForm = this.fb.group({
      id: [
        0
      ],
      from: [
        'Hamburg',
        [
          Validators.required,
          Validators.minLength(3),
          validateCity
        ]
      ],
      to: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3),
          validateCityWithParams([
            'Wien',
            'Berlin'
          ])
        ]
      ],
      date: [
        (new Date()).toISOString()
      ]
    });

    this.editForm.valueChanges
      .subscribe(console.log);
  }

  save(): void {
    console.log('value', this.editForm.value);
    console.log('valid', this.editForm.valid);
    console.log('dirty', this.editForm.dirty);
    console.log('touched', this.editForm.touched);
  }
}
