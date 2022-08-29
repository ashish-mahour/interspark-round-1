import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Job {
  id: number,
  job_number: string,
  job_title: string,
  job_start_date: string,
  job_close_date: string,
  experience_required: true,
  number_of_openings: number,
  job_notes: string
}

const serverURL: string = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public lastID: number = 0

  constructor(
    private http: HttpClient
  ) {
  }

  getJobs(result: (jobs?: Array<Job>) => void) {
    this.http.get(`${serverURL}/jobs`).subscribe({
      next(data) {
        result(data as Array<Job>)
      }, error(err) {
        console.log("Get Jobs Error: ", err)
        result()
      }
    })
  }

  createJob(data: Job, result: (error?: string) => void) {
    this.http.post(`${serverURL}/jobs`, data).subscribe({
      next() {
        result()
      }, error(err) {
        console.log("Create Error: ", err)
        result(err)
      }
    })
  }

  updateJob(data: Job, result: (error?: string) => void) {
    this.http.put(`${serverURL}/jobs/${data.id}`, data).subscribe({
      next() {
        result()
      }, error(err) {
        console.log("Create Error: ", err)
        result(err)
      }
    })
  }

  getJob(id: number, result: (job?: Job) => void) {
    this.http.get(`${serverURL}/jobs/${id}`).subscribe({
      next(data) {
        result(data as Job)
      }, error(err) {
        console.log("Get Job Error: ", err)
        result()
      }
    })
  }
}
