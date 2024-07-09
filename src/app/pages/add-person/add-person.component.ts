import { PersonService } from './../../services/person.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css'
})
export class AddPersonComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private personService = inject(PersonService);

  form = this.fb.group({
    identification : ['' , [Validators.required, Validators.min(10)]],
    name : ['', [Validators.required]],
    lastname:['', [Validators.required]],
    email:['', [Validators.required, , Validators.email]],
    phone:['', [Validators.required]],
    dateBirth:['', [Validators.required]]
  });

  create(){
    if(this.form?.invalid){
      return;
    }else if (this.form.valid) {
      this.personService.create(this.form.value).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear usuario', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  
}
  

