import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CrudService } from '../crud.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup;
  users: User[] = [];

  constructor(
    public fb: FormBuilder,
    public crudService: CrudService
    ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email : [''],
      first_name: [''],
      last_name: [''],
      avatar: [''],
    })
    
    this.crudService.getAll().subscribe((data: User[])=>{
      console.log("data: ", data['data']);
      this.users = data['data'];
    })
  }

  submitForm(){
    // console.log(JSON.stringify(this.userForm.value))
    this.crudService.create(this.userForm.value).subscribe(res => {
      console.log('User created!')
      }
    )
  }

}
