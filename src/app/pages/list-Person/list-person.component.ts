
import { Router, RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';

import { Component, inject, OnInit } from '@angular/core';



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

  people : any[] = [];
  ngOnInit(): void {
      this.personService.list()
        .subscribe((people: any) =>{
          this.people = people;
        });
      
  }
 
}
