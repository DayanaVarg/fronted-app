import { PersonService } from './../../services/person.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-person',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './update-person.component.html',
  styleUrl: './update-person.component.css'
})
export class UpdatePersonComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private personService = inject(PersonService);


  form? : FormGroup;

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id){
        this.personService.get(id)
        .subscribe(person => {
          console.log('p',person);
          this.form = this.fb.group({
            identification : [person.identification , [Validators.required]],
            name : [person.name, [Validators.required]],
            lastname:[person.lastname, [Validators.required]],
            email:[person.email, [Validators.required , Validators.email]],
            phone:[person.phone, [Validators.required]],
            dateBirth:[person.dateBirth, [Validators.required]]
          });
        })
      }
  }



  update(){
    const person = this.form!.value;
    if(this.form?.invalid){
      return;
    }else {{
      this.personService.update(person.identification, person)
      .subscribe(() =>{
      this.router.navigate(['/']);
      });
    }}
  }
  
}
