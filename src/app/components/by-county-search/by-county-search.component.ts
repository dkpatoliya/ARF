import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as moment from 'moment';
import { countries } from './data';
/**
 * Validate date
 * @param formate 
 * @returns 
 */
export function dateformatValidator(formate: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    console.log(value);

    if (!value) {
      return null;
    }

    const date = moment(value, formate);

    if (date.isValid()) {
      console.log({ valid: true, date });
      return null;
    }
    return { inValidDateformat: { formate, value } };
  };
}
@Component({
  templateUrl: './by-county-search.component.html',
  styleUrls: ['./by-county-search.component.css'],
})
export class ByCountySearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }
  countryList = countries;
  states: string[] = countries[0].states;

  //  ValidatorFn start and end dates
  dateRangeValidator: ValidatorFn = (): {
    [key: string]: any;
  } | null => {
    let invalid = false;
    const issueFrom =
      this.byCountyLookupForm && this.byCountyLookupForm.get('issueFrom').value;
    const issueTo =
      this.byCountyLookupForm && this.byCountyLookupForm.get('issueTo').value;
    if (issueFrom && issueTo) {
      invalid = new Date(issueFrom).valueOf() > new Date(issueTo).valueOf();
    }
    return invalid ? { invalidRange: { issueFrom, issueTo } } : null;
  };

  /**
   * Form Group
   */
  byCountyLookupForm = this.formBuilder.group({
    selectCounty: ['', ([Validators.required])],
    selectState: ['', [Validators.required]],
    issueFrom: ['', [Validators.required, dateformatValidator('DD/MM/YYYY"')]],
    issueTo: ['', [
      Validators.required,
      dateformatValidator('DD/MM/YYYY"'),
      this.dateRangeValidator,
    ],
    ],
    paymentStatus: ['AL'],
    additionalFilter: [' None '],
    taxld: [''],
    taxType: ['S'],
    samUET: [''],
    duns: [''],
    progranAlpha: [],
    programArea: ['AGP'],
  });

  ngOnInit(): void {
    // from on update states select input update
    this.byCountyLookupForm.controls.selectCounty.valueChanges.subscribe(
      (value: string) => {
        this.states =
          this.countryList.find((i) => i.country === value).states || [];
      }
    );
  }

  // form

  onSubmit() {
    this.byCountyLookupForm.markAllAsTouched();

    if (this.byCountyLookupForm.valid) {
      // type submit action
      console.log(this.byCountyLookupForm.value);
    }
  }
}
