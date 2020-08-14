import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Users[] = [];

  constructor(public crudService: CrudService) { }

  ngOnInit(): void {
    
    this.crudService.getAll().subscribe((data: Users[]))
  }


}
