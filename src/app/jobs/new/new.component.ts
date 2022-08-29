import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, Job } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public jobForm: FormGroup

  constructor(
    private formBuider: FormBuilder,
    private date: DatePipe,
    private api: ApiService,
    private router: Router
  ) {
    this.jobForm = this.formBuider.group({
      id: [this.api.lastID + 1],
      job_number: [null],
      job_title: [null],
      job_start_date: [null],
      job_close_date: [null],
      experience_required: [true],
      number_of_openings: [0],
      job_notes: [null]
    })
  }

  ngOnInit(): void {
  }

  createJob() {
    console.log("Create Job: ", this.jobForm.value)
    const job: Job = {
      id: this.jobForm.controls["id"].value,
      job_number: this.jobForm.controls["job_number"].value,
      job_title: this.jobForm.controls["job_title"].value,
      job_start_date: this.date.transform(this.jobForm.controls["job_start_date"].value, "yyyy-MM-dd") as string,
      job_close_date: this.date.transform(this.jobForm.controls["job_close_date"].value, "yyyy-MM-dd") as string,
      experience_required: this.jobForm.controls["experience_required"].value,
      number_of_openings: parseInt(this.jobForm.controls["number_of_openings"].value),
      job_notes: this.jobForm.controls["job_number"].value
    }
    this.api.createJob(job, (err) => {
      if (!err) {
        alert("Job Created!!")
        this.router.navigateByUrl("/jobs")
      }
    })
  }
}
