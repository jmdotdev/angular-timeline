import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxTimelineComponent } from "./ngx-timeline/ngx-timeline.component";
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
