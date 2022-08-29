import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { JobsComponent } from './jobs.component';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewComponent } from './new/new.component';
import { ApiService } from '../services/api/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: "",
    component: JobsComponent
  },
  {
    path: "new",
    component: NewComponent
  },
  {
    path: ":id",
    component: EditComponent
  }
]

@NgModule({
  declarations: [JobsComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [ApiService, DatePipe]
})
export class JobsModule { }
