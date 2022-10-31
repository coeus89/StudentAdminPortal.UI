import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/Services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined = '';
  student: Student = {
    dateOfBirth: "",
    email: "",
    firstName: "",
    gender: {
      description: "",
      id: ""
    },
    genderId: "",
    id: "",
    lastName: "",
    mobile: 0,
    profileImageUrl: "",
    address: {
      id: "",
      physicalAddress: "",
      postalAddress: ""
    }
  }

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id')
        if(this.studentId) {
          this.studentService.getStudent(this.studentId)
          .subscribe({
            // next: (v) => console.log(v),
            next: (v) => {
              this.student = v;
            },
            error: (e) => console.error(e),
            complete: () => console.info('complete')
          });

          this.genderService.getGenderList().subscribe({
            next: (v) => {
              console.log(v);
            },
            error: (e) => console.error(e),
            complete: () => console.info('complete')
        });
        }
      }
    );
  }
}
