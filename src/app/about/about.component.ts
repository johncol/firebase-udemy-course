import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
  }
}
