import { PersonService } from './../../services/person.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { Person } from '../../model/person';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-person.component.html',
  styleUrl: './add-person.component.css',
})
export class AddPersonComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private personService = inject(PersonService);

  form = this.fb.group({
    identification: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(10)],
    ],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, , Validators.email]],
    phone: ['', [Validators.required]],
    dateBirth: ['', [Validators.required]],
  });

  create() {
    if (this.form.invalid) {
      return;
    }

    const identification = this.form.get('identification')!.value;

    if (identification) {
      this.personService.get(identification).subscribe({
        next: (existingPerson: Person | null) => {
          if (existingPerson) {
            Swal.fire('La persona ya está registrada!', '', 'error');
            this.router.navigate(['/']);
          } else {
            this.personService.create(this.form.value).subscribe({
              next: (response) => {
                Swal.fire('Registrado!', '', 'success');
                this.router.navigate(['/']);
              },
              error: (error) => {
                console.error('Error al crear usuario', error);
              },
            });
          }
        },
        error: (error) => {
          console.error('Error al verificar la existencia del usuario', error);
        },
      });
    } else {
      console.error('La identificación es nula');
    }
  }
}
