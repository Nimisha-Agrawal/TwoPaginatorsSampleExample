import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { Model } from './interfaces/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public displayedColumns = ['id', 'name', 'email', 'role'];
  public dataSource = new MatTableDataSource<Model>();

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 
  constructor(private http: HttpClient) { }
 
  ngOnInit() {
    this.getAllOwners();
  }
 
  public getAllOwners = () => {
    this.http.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .subscribe(res => {
      this.dataSource.data = res as Model[];
    })
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  public customSort = (event:any) => {
    console.log(event);
  }
 
  //A method to sync the first paginator, if the second is used:
  syncTopPaginator(event:PageEvent){
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }
}
