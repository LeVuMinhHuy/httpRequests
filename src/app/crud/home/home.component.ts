import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    public crudService: CrudService,
    public dialog: MatDialog
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
    this.crudService.create(this.userForm.value).subscribe(res => {
      console.log('User created!');
      }
    );

    this.users.push(this.userForm.value);
  }

  openDialog(user) {
    const dialogRef = this.dialog.open(UserUpdate, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      const index = this.users.indexOf(user, 0);
      if (index > -1) {
        this.users.splice(index, 1, result);
      };
      console.log("User updated!");
    });
  }

  delete(user){
    this.crudService.delete(user.id).subscribe(res => {
      console.log('User delelted!');
    });


    const index = this.users.indexOf(user, 0);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }

}


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./home.component.css']
})
export class UserUpdate {
  updateForm: FormGroup;
  // users: User[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public fb: FormBuilder,
    public crudService: CrudService
  ) {}


  ngOnInit(): void {
    this.updateForm = this.fb.group({
      email : this.data.email,
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      avatar: this.data.avatar
    })
  }

  submitForm(){
    this.crudService.update(this.data.id, this.updateForm.value);
  }
}


