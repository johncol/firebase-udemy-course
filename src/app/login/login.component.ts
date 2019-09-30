import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;

  constructor(
    private aungularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.ui = new firebaseui.auth.AuthUI(this.aungularFireAuth.auth);
    this.ui.start('#firebase-ui-auth-container', this.uiConfig())
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  public onLoginSuccessfull = (authResult: any & { user: firebase.User | null }): boolean => {
    this.ngZone.run(() => this.router.navigate(['courses']));
    return true;
  }

  private uiConfig = (): firebaseui.auth.Config => {
    return {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessfull
      }
    };
  }
}
