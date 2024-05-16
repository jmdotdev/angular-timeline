import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'

interface TimelineEvent {
  index: number;
  date: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  percentage?:number | null; // Track if the event is completed
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
  progressStage = 0;
  totalStages = 3;
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

  ngOnInit() {
    this.activeEvent = this.timelineEvents[this.activeIndex];
  }

  setActiveEvent(index: number): void {
    this.activeIndex = index;
    this.activeEvent = this.timelineEvents[index];
    this.startProgress();
  }
  startProgress(): void {
    const stageDuration = 0.1 * 60 * 1000; // 1 seconds in milliseconds
    this.interval = setInterval(() => {
      if (this.progressStage < this.totalStages) {
        this.progressStage++;
        this.updateProgress();
      } else {
        clearInterval(this.interval);
      }
    }, stageDuration);
  }

  updateProgress(): void {
    console.log("activeindex",this.activeIndex + 1)
    const percentagePerStage = 100 / (this.timelineEvents.length - 1) / 3;
    this.progress += percentagePerStage;
    // Calculate the starting point for the gradient
    const currentEventWidth = 100 / (this.timelineEvents.length);
    const startPercentage = (this.activeIndex + 2) * currentEventWidth;
    const endPercentage = startPercentage + currentEventWidth;

    // Update the color gradient based on the stage
    let color: any;
    switch (this.progressStage) {
        case 1:
            color = `linear-gradient(to right, green ${startPercentage}%, green ${endPercentage}%, green ${endPercentage}%)`;
            break;
        case 2:
            color = `linear-gradient(to right, green ${startPercentage}%, green ${endPercentage}%, orange ${endPercentage}%)`;
            break;
        case 3:
            color = `linear-gradient(to right, green ${startPercentage}%, orange ${endPercentage}%,red ${endPercentage}%)`;
            break;
    }
    document.documentElement.style.setProperty('--progress-color', color);
}


  markAsComplete(index: number): void {
    if (!(index + 1 == this.timelineEvents.length)){
       // this.startProgress();
    this.setActiveEvent(index);
    // Mark the event as complete
    this.timelineEvents[index].completed = true;

    // Recalculate progress based on completed events
    const completedEvents = this.timelineEvents.filter(event => event.completed);
    const completedCount = completedEvents.length;

    if (completedCount < this.timelineEvents.length) {
      // Calculate progress percentage based on completed events
      this.progress = (this.activeIndex +1 ) / (this.timelineEvents.length - 1) * 100;
      this.activeIndex = this.activeIndex + 1;
      this.setActiveEvent(this.activeIndex)
    } else {
      this.progress = 0;
    }

    // Set the progress color to green
    document.documentElement.style.setProperty('--progress-color', 'green');
    this.progressStage = 0;

    }
    else{
     alert("done");
     this.progress = 100; 
    }
  }
  
  
}
