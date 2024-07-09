import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    iden : ['' , [Validators.required]],
    name : ['', [Validators.required]],
    lastname:['', [Validators.required]],
    email:['', [Validators.required]],
    phone:['', [Validators.required]],
    dateB:['', [Validators.required]]
  });

  create(){
    console.log(this.form.value)
  }
  
}
