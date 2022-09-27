import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students : Student[] = [];
  displayedColumns: string[] = ['firstName','lastName','dateOfBirth','email','mobile','gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString='';

  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    // Fetch students
    this.studentService.getStudents()
    .subscribe({
      next: (v) =>
      {
        this.students = v;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if(this.matPaginator) {
          this.dataSource.paginator = this.matPaginator
        }

        if(this.matSort) {
          this.dataSource.sort = this.matSort
        }
        // console.log(v[0].firstName),
        // console.log(v[0].lastName)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
  });
  // .subscribe(  // This is getting depricated
  //   (successResponse) => {
  //     console.log(successResponse)
  //   },
  //   (errorResponse) => {
  //     console.log(errorResponse)
  //   }
  // )
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase()
  }

}
