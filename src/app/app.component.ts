import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TimelineComponent]
})
export class AppComponent implements OnInit {
  title = 'angular-timeline';

  ngOnInit(): void {
      
  }

}
