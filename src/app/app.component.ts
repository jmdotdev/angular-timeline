import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxTimelineComponent } from "./ngx-timeline/ngx-timeline.component";
import { Event, Point, Line, TimelineProperties, TimelineSegment } from 'ngx-timeline-vertical';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NgxTimelineComponent]
})
export class AppComponent implements OnInit {
  title = 'ngx-timeline-vertical';

  ngOnInit(): void {
      
  }

}
