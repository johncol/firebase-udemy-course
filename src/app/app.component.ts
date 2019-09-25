import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userIsLogged$: Observable<boolean>;
  userIsNotLogged$: Observable<boolean>;
  pictureUrl$: Observable<string | null>;

  constructor(private authService: AngularFireAuth) { }

  ngOnInit() {
    this.authService.authState.subscribe((user: firebase.User | null) => {
      console.log('User: ', user);
    });
    this.userIsLogged$ = this.authService.authState.pipe(
      map(user => !!user)
    );
    this.userIsNotLogged$ = this.userIsLogged$.pipe(
      map(isLogged => !isLogged)
    );
    this.pictureUrl$ = this.authService.authState.pipe(
      map((user: firebase.User) => user ? user.photoURL as string : null)
    );
  }

  logout() {
    this.authService.auth.signOut();
  }
}
