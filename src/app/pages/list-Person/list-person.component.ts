import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Person } from '../../model/person';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-person.component.html',
  styleUrl: './list-person.component.css',
})
export class PersonComponent implements OnInit {
  private personService = inject(PersonService);

  people: Person[] = [];
  filteredPeople: Person[] = [];
  yearsFormated: number[] = [];

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.personService.list().subscribe((people) => {
      this.people = people;
      this.filteredPeople = people;
      this.yearsFormated = [
        ...new Set(
          people.map((person) => new Date(person.dateBirth).getFullYear())
        ),
      ];
      console.log(this.yearsFormated);
    });
  }

  deletePerson(person: Person) {
    Swal.fire({
      html: '¿Está seguro que desea eliminar a la persona?',
      icon: 'info',
      iconColor: '#544A0D',
      showDenyButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personService.delete(person.identification).subscribe(() => {
          this.loadList();
        });
      } else if (result.isDenied) {
        this.loadList();
      }
    });
  }

  applyFilters() {
    const yearSelect = document.querySelector(
      'select:first-of-type'
    ) as HTMLSelectElement;
    const sortOrderSelect = document.getElementById(
      'sortOrder'
    ) as HTMLSelectElement;

    const year = yearSelect.value;
    const sortOrder = sortOrderSelect.value;

    let filteredPeople = [...this.people];

    if (year !== '') {
      const yearNumber: number = +year;
      filteredPeople = filteredPeople.filter(
        (person) => new Date(person.dateBirth).getFullYear() === yearNumber
      );
    }

    if (sortOrder === 'asc') {
      filteredPeople.sort((a, b) => a.name.localeCompare(b.name.toString()));
    } else if (sortOrder === 'desc') {
      filteredPeople.sort((a, b) => b.name.localeCompare(a.name.toString()));
    }

    this.filteredPeople = filteredPeople;
  }
}
