import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ApiService, Job } from '../services/api/api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {

  public jobs: Array<Job> = []

  constructor(
    private api: ApiService,
    private element: ElementRef
  ) { }

  ngOnInit(): void {
    this.api.getJobs((jobs) => {
      if (!jobs) {
        this.jobs = []
        return
      }
      this.jobs = jobs
      this.api.lastID = this.jobs[this.jobs.length - 1].id
    })
  }


  ngOnDestroy(): void {
    console.log("Jobs Page Destroy.")
    this.element.nativeElement.remove()
  }

}
