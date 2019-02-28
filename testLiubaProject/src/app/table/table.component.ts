import {Component, OnInit} from "@angular/core";

import {TableServiceService} from "../table-service.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  public filterMap = {
    ageFrom: 1,
    ageTo: 100,
    company: '',
    sex: 'all',
    query: '',
    sort: '',
    
  };

  public newFilteredList: TUser[] = [];
  public companiesListSingle: string[] = [];
  public sortingClicked: boolean = false;
  private predicates: object;
  private companiesList: string[] = [];
  private myFilteredList: TUser[] = [];


  public constructor(private _tableServiceService: TableServiceService) {}

  ngOnInit() {
    this._tableServiceService.getUsers().subscribe((users: TSuperUser[]) => {
      let myUsers = users;
      this.myFilteredList = myUsers.map((item: TSuperUser) => {
        return {
          first: item.name.first,
          last: item.name.last,
          sex: item.sex,
          age: item.age,
          email: item.email,
          phone: item.phone,
          company: item.company
        };
      });

      this._getSingleComapnies();
      this.newFilteredList = this.myFilteredList.slice();
    });
  }

  public generalFiltering(actionName: string, value: string | number): void {
    this.filterMap[actionName] = value;
    this.newFilteredList = this.myFilteredList
      .filter(item => item.age >= (this.filterMap.ageFrom || 1) && item.age <= (this.filterMap.ageTo || 100 ))
      .filter(item => item.company === this.filterMap.company || this.filterMap.company === "")
      .filter(item => item.sex === this.filterMap.sex || this.filterMap.sex === "all")
      .filter(
          element =>
            element.email.indexOf(this.filterMap.query) !== -1 ||
            element.first.indexOf(this.filterMap.query) !== -1 ||
            element.last.indexOf(this.filterMap.query) !== -1
        )
    this.sortData(value);
    }

    public sortData(value: string | number): void {
     
    this.predicates = {
      
      'asc' : function(a, b){ if (a[value] < b[value]) {
        console.log(value)
        return -1;
      } else if (a[value] > b[value]) {
        return 1;
      } else {
        return 0;
      }},
      'desc': function(a, b){ if (a[value] > b[value]) {
        return -1;
      } else if (a[value] < b[value]) {
        return 1;
      } else {
        return 0;
      }
      }}
      this.sortingClicked = !this.sortingClicked;
      this.newFilteredList.sort(this.predicates[this.sortingClicked? 'asc' : 'desc'])
      }

  private _getSingleComapnies() {
    this.companiesListSingle = this.myFilteredList.map(item => item.company);
    this.companiesList.forEach(item => {
      if (this.companiesListSingle.indexOf(item) === -1) {
        this.companiesListSingle.push(item);
      }
    });
    return this.companiesListSingle;
  }

}
