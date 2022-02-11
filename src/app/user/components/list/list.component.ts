import { Component, Input, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { User } from '../../modules/user.module';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  loading: boolean = false;
  pageTitle: string = 'User List';
  users: User[] = [];
  subscriber: Observer<any>;

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
    this.userService.listUpdated()
    .subscribe((updated: boolean) => {
      if (updated) {
        this.getAll();
      }
    })
  }

  getAll(): void {
    this.subscriber = {
      next: (users: User[]) => {
        this.users = users;
      },
      error: console.error,
      complete: () => { this.loading = false },
    };

    this.loading = true;
    this.userService.getAll()
    .subscribe(this.subscriber);
  }

  onDelete(id: string): void {
    this.subscriber = {
      next: (users: User[]) => {
        this.users = users;
      },
      error: console.error,
      complete: () => { this.loading = false },
    };

    this.loading = true;
    this.userService.delete(id)
    .subscribe(this.subscriber);
  }

  onSelect(id: string): void {
    this.subscriber = {
      next: (users: User[]) => {
        this.users = users;
      },
      error: console.error,
      complete: () => { this.loading = false },
    };

    this.loading = true;
    this.userService.getById(id)
    .subscribe(this.subscriber);
  }

  
}
