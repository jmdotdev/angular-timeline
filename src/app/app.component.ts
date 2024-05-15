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
  timelineThickness!: string;
  startpoint!: Point;
  endpoint!: Point;
  //Ensure timelineSegments is initialized to an empty array. You will later push a TimelineSegment 
  //to this array. If the variable isn't initialized, Angular will throw an error.
  timelineSegments: TimelineSegment[] = [];
  timelineEvents = [
    { date: 'Jan 20', title: 'Start of Evaluation', description: 'Preparation' },
    { date: 'Feb 14', title: 'Initial Scoping', description: 'Data checking' },
    { date: 'Mar 8', title: 'Validation', description: 'Completed proof of concept' },
    { date: 'Apr 30', title: 'Contracting', description: 'Signed Contract' },
    { date: 'Jun 7', title: 'Migration', description: 'All information is migrated' },
    { date: 'Sep 16', title: 'Global Launch', description: 'In Asia, Australia, Latin America' }
  ];

  ngOnInit(): void {
    this.ngxPointInit();
    this.ngxTimelineThicknessInit();
    this.ngxTimelineSegmentsInit();
  }

  ngxPointInit(): void {
    //The Point constructor takes _size: string, _color: string, _borderRadius: string
    this.startpoint = new Point('40px', '#B10CC8', '30px');
    this.endpoint = new Point('40px', '#B10CC8', '30px');
}

ngxTimelineThicknessInit(): void {
  this.timelineThickness = '20px';
}
ngxTimelineSegmentsInit(): void {
  let timelineSegment: TimelineSegment = new TimelineSegment();
  this.timelineSegments.push(timelineSegment);
}



}
