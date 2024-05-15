import { Component, Input, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import {Point} from 'ngx-timeline-vertical';

interface TimelineEvent {
  index: number;
  date: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean; // Track if the event is completed
}
@Component({
  selector: 'app-ngx-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-timeline.component.html',
  styleUrl: './ngx-timeline.component.scss'
})
export class NgxTimelineComponent implements OnInit {
  activeIndex = 0;
  progress = 0;
  progressStage = 0; // To keep track of the progress stages
  interval: any;

  timelineEvents: TimelineEvent[] = [
    { index:1,date: 'Jan 20', title: 'Onboarding', description: 'Preparation', icon: 'fas fa-rocket', completed: false },
    { index:2,date: 'Feb 14', title: 'Created', description: 'Data checking', icon: 'fas fa-check-circle', completed: false },
    { index:3,date: 'Mar 8', title: 'Client', description: 'Completed proof of concept', icon: 'fas fa-clipboard-check', completed: false },
    { index:4,date: 'Apr 30', title: 'Advisor', description: 'Signed Contract', icon: 'fas fa-file-signature', completed: false },
    { index:5,date: 'Jun 7', title: 'HCM', description: 'All information is migrated', icon: 'fas fa-database', completed: false },
    { index:6,date: 'Sep 16', title: 'Docupace', description: 'In Asia, Australia, Latin America', icon: 'fas fa-globe', completed: false },
    { index:7,date: 'Oct 20', title: 'Trillo', description: 'Signed Contract', icon: 'fas fa-file-signature', completed: false },
    { index:8,date: 'Nov 30', title: 'Complete', description: 'Data checking', icon: 'fas fa-check-circle', completed: false },
  ];
  activeEvent = this.timelineEvents[0];
  constructor() { }

  ngOnInit(): void {
    this.activeEvent = this.timelineEvents[this.activeIndex];
  }

  setActiveEvent(index: number): void {
    this.activeIndex = index;
    this.activeEvent = this.timelineEvents[index];
    // this.resetProgress();
    this.startProgress();
  }

  resetProgress(): void {
    clearInterval(this.interval);
    this.progress = 0;
    this.progressStage = 0;
  }

  startProgress(): void {
    const totalStages = 3;
    const stageDuration = 0.5 * 60 * 1000; // 30 seconds in milliseconds

    this.interval = setInterval(() => {
      if (this.progressStage < totalStages) {
        this.progressStage++;
        this.updateProgress();
      } else {
        clearInterval(this.interval);
      }
    }, stageDuration);
  }

  updateProgress(): void {
    const percentagePerStage = 100 / (this.timelineEvents.length - 1) / 3;
    console.log("percentagePerStage",percentagePerStage);
    this.progress += percentagePerStage;
    console.log(this.progress)

    // Update the color gradient based on the stage.component.ts
    let color:any;
    switch (this.progressStage) {
      case 1:
        color = 'green';
        break;
      case 2:
        color = 'linear-gradient(to right, green, orange)';
        break;
      case 3:
        color = 'linear-gradient(to right, green, orange, red)';
        break;
    }
    document.documentElement.style.setProperty('--progress-color', color);
  }

  markAsComplete(index: number): void {
    // Mark the event as complete
    this.timelineEvents[index].completed = true;
    console.log("index",this,this.timelineEvents[index + 1])

    // Recalculate progress based on completed events
    const completedEvents = this.timelineEvents.filter(event => event.completed);
    const completedCount = completedEvents.length;

    if (completedCount > 0) {
      // Calculate progress percentage based on completed events
      this.progress = this.activeIndex / (this.timelineEvents.length - 1) * 100;
      console.log(this.progress,"progress")
    } else {
      this.progress = 0;
    }

    // Set the progress color to green
    document.documentElement.style.setProperty('--progress-color', 'green');
  }
  
  
}
