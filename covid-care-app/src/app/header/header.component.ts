import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem("userInfo"));
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');   
  }
}
