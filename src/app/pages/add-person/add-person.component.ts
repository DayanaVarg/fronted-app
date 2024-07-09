import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {

  form = signal<FormGroup>(
    new FormGroup(
    {
      ide : new FormControl<String>('', Validators.required),
      name : new FormControl<String>('', Validators.required),
      lastname:new FormControl<String>('', Validators.required),
      email:new FormControl<String>('', Validators.required),
      phone:new FormControl<String>('', Validators.required),
      dateB:new FormControl<String>('', Validators.required)
    })
  );

  create(){
    console.log(this.form().value);
  }
  
}
