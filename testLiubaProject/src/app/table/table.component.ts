import {Component, OnDestroy, OnInit} from "@angular/core";

import {
  catchError,
  filter,
  map,
  takeUntil,
  tap,
  switchMap
} from "rxjs/operators";

import {TableServiceService} from "../table-service.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit, OnDestroy {
  public ageFrom: number = 1;
  public ageTo: number = 100;
  public sex: string = "all";
  public company: string = "";
  public search: string = "";
  public newFilteredList: TUser[] = [];
  public companiesListSingle: string[] = [];


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
      this.newFilteredList = this.myFilteredList;
    });
  }

  public generalFiltering(list: TUser[], value: string): TUser[] {
    list = this.myFilteredList
      .filter(item => item.age >= this.ageFrom && item.age <= this.ageTo)
      .filter(item => item.company === this.company || this.company === "")
      .filter(item => item.sex === this.sex || this.sex === "all")
      .filter(
        element =>
          element.email.indexOf(this.search) !== -1 ||
          element.first.indexOf(this.search) !== -1 ||
          element.last.indexOf(this.search) !== -1
      )
      .sort((a, b) => {
        if (a[value] < b[value]) {
          return -1;
        } else if (a[value] > b[value]) {
          return 1;
        } else {
          return 0;
        }
      });

    return (this.newFilteredList = list);
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

  ngOnDestroy() {}
}
