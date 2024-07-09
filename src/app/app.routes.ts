import { Routes } from '@angular/router';

import {PersonComponent} from './pages/list-Person/list-person.component'
import {AddPersonComponent} from './pages/add-person/add-person.component'

export const routes: Routes = [
    {
        path: '',
        component: PersonComponent
    },
    {
        path:'add',
        component: AddPersonComponent
    }
    
];
