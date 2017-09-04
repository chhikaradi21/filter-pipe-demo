# AngularJS 4 Pipe For Filtering Table Data
This Pipe can be used with *ngFor directive of AngularJS 4. This has the functionality to filter data rows of a table.
You can use it just by including in your component and applying on *ngFor directive.

### Features
1. Can be used on tables created via *ngFor.
2. Can filter data rows for single value type fields like city name(eg. aditya).
3. Can filter data rows for range value type fields like age (eg. 20 to 30).
4. Can be used for multiple data types like string, number, date etc.

### How it works?
Just apply it like other default pipes/filters with *ngFor and pass selectedFieldObj variable on which you want to filter in array of object. eg. 
Note:- This is case sinsitive you can modify its code for your requirements.
customFilterObj = {
    normal: {
      city: 'Mumbai'
    },
    range: {
      age: {start: 20, end: 50}
    }
  };
  
It will sort data with city mumbai and age range 20 to 50.
Usage:
```
*ngFor="let item of dataArr | filter : customFilterObj" // customFilterObj defined above 

```

Html Code
```
 <div class="container">
  <div class="row">

    <div class="col-md-12 text-center">
      <h1><span class="badge badge-secondary" style="font-size : 30px; margin-bottom : 30px">Table Filter Demo</span></h1>
    </div>

    <div class="col-md-12">

        <div class="row">
            <div class="col-md-2">
                <input type="text" class="form-control" placeholder="enter person name" [(ngModel)]="customFilterObj.normal.name">
            </div>

            <div class="col-md-2">
                <input type="text" class="form-control" placeholder="enter city name" [(ngModel)]="customFilterObj.normal.city">
            </div>

          <div class="col-md-2">
            <input type="text" class="form-control" placeholder="enter mobile" [(ngModel)]="customFilterObj.normal.mobile">
          </div>

        </div>

        <div class="row" style="margin-top : 20px">
          <div class="col-md-2">
            <input type="number" class="form-control" placeholder="enter start age" [(ngModel)]="customFilterObj.range.age.start">
          </div>

          <div class="col-md-2">
            <input type="number" class="form-control" placeholder="enter end age" [(ngModel)]="customFilterObj.range.age.end">
          </div>

        </div>

        <div class="row" style="margin-top : 20px">

          <div class="col-md-2">
            <button type="button" class="btn btn-warning" (click)="resetFilters()">Reset Filters</button>
          </div>

        </div>



    </div>

    <div class="col-md-12" >
      <table class="table">
        <thead>
        <tr>
          <th (click)="setFieldName('name')">Name</th>
          <th (click)="setFieldName('city')">City</th>
          <th (click)="setFieldName('mobile')">Mobile</th>
          <th (click)="setFieldName('age')">Age</th>
          <th (click)="setFieldName('dob')">DOB</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of dataArr | filter : customFilterObj">
          <td>{{item.name}}</td>
          <td>{{item.city}}</td>
          <td>{{item.mobile}}</td>
          <td>{{item.age}}</td>
          <td>{{item.dob | date:'dd-MMM-y'}}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</div>
```

Component JS Code
```
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedField = 'name';
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

  setFieldName(name) {
    if (this.selectedField === name) {
      this.selectedField = '-' + this.selectedField;
    } else {
      this.selectedField = name;
    }
  }

}

```

Filter Code:
```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], filterObj: any): any {

    let filteredArr = [];
    let key;
    let i;
    if (filterObj && filterObj.normal) {
      for (key in filterObj.normal) {
        if (filterObj.normal.hasOwnProperty(key)) {
          if (filterObj.normal[key]) {
            filteredArr = [];
            let value: any = filterObj.normal[key];
            value = value;
            for (i = 0; i < arr.length; i++) {
              if (!value || value === 'all' ||
                  (new Date(value)) instanceof Date && new Date(value) === new Date(arr[i][key]) ||
                  arr[i][key] && arr[i][key].constructor === Array && arr[i][key].indexOf(value) !== -1 ||
                  value === arr[i][key]) {
                filteredArr.push(arr[i]);
              }
            }
            arr = filteredArr.slice();
          }
        }
      }
    }

    if (filterObj && filterObj.range) {
      filteredArr = [];
      for (key in filterObj.range) {
        if (filterObj.range.hasOwnProperty(key)) {
          const start = filterObj.range[key].start;
          const end = filterObj.range[key].end;

          for (i = 0; i < arr.length; i++) {
            if (!start || !end ||
                new Date(start) instanceof Date && new Date(end) && new Date(start) <= new Date(arr[i][key]) && new Date(arr[i][key]) <= new Date(end) ||
                start <= arr[i][key] && arr[i][key] <= end) {
              filteredArr.push(arr[i]);
            }
          }
          arr = filteredArr.slice();
        }
      }
    }

    if (filterObj && filterObj.search) {
      filteredArr = [];
      if (filterObj.search.hasOwnProperty('name')) {
        const name = filterObj.search['name'].toLowerCase();
        for (i = 0; i < arr.length; i++) {
          if (arr[i].name.toLowerCase().indexOf(name) !== -1 || name === '') {
            filteredArr.push(arr[i]);
          }
        }
        filteredArr.slice();
      }
    }

    return filteredArr;
  }

}
```

### How to run on local
Follow these steps
1. git clone git@github.com:chhikaradi21/filter-pipe-demo.git
3. npm install(using node version 6)
4. ng serve
5. Access in browser at port 4200 (localhost:4200)


## Further help
1. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.
2. Node version 6
