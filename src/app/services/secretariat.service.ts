import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecretariatService {

  alert = {
    type: '',
    message: ''
  };
  alertToBeShown = false;

  constructor() { }

  showAlert(alert) {
    this.alert = alert;
    this.alertToBeShown = true;
  }

  clearAlert() {
    this.alert = {
      type: '',
      message: ''
    };
    this.alertToBeShown = false;
  }
}
