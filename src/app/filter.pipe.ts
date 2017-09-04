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

