import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataArr = [
    {
      name : 'Aditya',
      city : 'Mumbai',
      mobile : '1234567899',
      age : 10,
      dob : new Date('21 July 1991')
    },
    {
      name : 'Vinnu',
      city : 'Mumbai',
      mobile : '1234569999',
      age : 10,
      dob : new Date('21 July 1995')
    },
    {
      name : 'Vikas',
      city : 'Hisar',
      mobile : '2123456789',
      age : 50,
      dob : new Date('26 June 1990')
    },
    {
      name : 'Rishi',
      city : 'Banglore',
      mobile : '3123456789',
      age : 30,
      dob : new Date('14 Jan 1994')
    },
    {
      name : 'Ram',
      city : 'Banglore',
      mobile : '4234234528',
      age : 25,
      dob : new Date('14 Jan 1992')
    },
    {
      name : 'Amit',
      city : 'Hisar',
      mobile : '4884234528',
      age : 25,
      dob : new Date('14 Jan 1993')
    }
  ];

  // filter code starts here

  customFilterObj = {
    normal: {
      name: '',
      city: '',
      mobile : ''
    },
    range: {
      age: {start: 0, end: 0}
    }
  };

  resetFilters() {
    this.customFilterObj.normal.name = '';
    this.customFilterObj.normal.city = '';
    this.customFilterObj.normal.mobile = '';

    this.customFilterObj.range.age.start = 0;
    this.customFilterObj.range.age.end = 0;
  }

  // filter code ends here

}
