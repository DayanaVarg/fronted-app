
import { Router, RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import Swal from 'sweetalert2'

import { Component, inject, OnInit } from '@angular/core';
import { Person } from '../../model/person';



@Component({
  selector: 'app-person',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.css',
 
})
export class PersonComponent implements OnInit {
  private personService = inject(PersonService);

  people : Person[] = [];
  
  ngOnInit(): void {
     this.loadList();
  }

  loadList(){
    this.personService.list()
        .subscribe(people  =>{
          this.people = people;
        });
  }

  deletePerson(person: Person) {
    Swal.fire({
      html: '¿Está seguro que desea eliminar a la persona?',
      icon: 'info',
      iconColor: '#544A0D',
      showDenyButton: true,
      confirmButtonText: "Aceptar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.personService.delete(person.identification).subscribe(() => {
          this.loadList();
        });
      }else if (result.isDenied) {
        this.loadList();
      }
    });
  }
 
}
