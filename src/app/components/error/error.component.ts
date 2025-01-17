import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent {
  message = 'An unknown error occurred';
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }

}
