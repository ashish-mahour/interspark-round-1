import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Job } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public jobForm: FormGroup

  constructor(
    private formBuider: FormBuilder,
    private date: DatePipe,
    private api: ApiService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.jobForm = this.formBuider.group({
      id: [null],
      job_number: [null],
      job_title: [null],
      job_start_date: [null],
      job_close_date: [null],
      experience_required: [true],
      number_of_openings: [0],
      job_notes: [null]
    })
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params)
      const id = parseInt(params.id)
      this.api.getJob(id, (job) => {
        if (job) {
          console.log("Get Job: ", job)
          this.jobForm.controls["id"].setValue(job.id)
          this.jobForm.controls["job_number"].setValue(job.job_number)
          this.jobForm.controls["job_title"].setValue(job.job_title)
          this.jobForm.controls["job_start_date"].setValue(new Date(job.job_start_date))
          this.jobForm.controls["job_close_date"].setValue(new Date(job.job_close_date))
          this.jobForm.controls["experience_required"].setValue(job.experience_required)
          this.jobForm.controls["number_of_openings"].setValue(job.number_of_openings)
          this.jobForm.controls["job_notes"].setValue(job.job_notes)
        }
      })
    })
  }

  ngOnInit(): void {
  }

  updateJob() {
    console.log("Update Job: ", this.jobForm.value)
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
    this.api.updateJob(job, (err) => {
      if (!err) {
        alert("Job Updated!!")
        this.router.navigateByUrl("/jobs")
      }
    })
  }
}
