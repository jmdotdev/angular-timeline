import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'

interface TimelineEvent {
  index: number;
  date: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
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
  completePercentage = 0;

  timelineEvents: TimelineEvent[] = [
    { index:1,date: 'Jan 20', title: 'Start', description: 'Preparation', icon: 'fas fa-rocket', completed: false },
    { index:2,date: 'Feb 14', title: 'Axos', description: 'Data checking', icon: 'fas fa-check-circle', completed: false },
    { index:3,date: 'Mar 8', title: 'Client', description: 'Completed proof of concept', icon: 'fas fa-clipboard-check', completed: false },
    { index:4,date: 'Apr 30', title: 'Advisor', description: 'Signed Contract', icon: 'fas fa-file-signature', completed: false },
    { index:5,date: 'Jun 7', title: 'HCM', description: 'All information is migrated', icon: 'fas fa-database', completed: false },
    { index:6,date: 'Sep 16', title: 'Docupace', description: 'In Asia, Australia, Latin America', icon: 'fas fa-globe', completed: false },
    { index:7,date: 'Oct 20', title: 'Trillo', description: 'Signed Contract', icon: 'fas fa-file-signature', completed: false },
    { index:8,date: 'Nov 30', title: 'Complete', description: 'Process Done', icon: 'fas fa-check-circle', completed: false },
  ];
  activeEvent = this.timelineEvents[0];
  constructor() { }

  ngOnInit() {
    this.activeEvent = this.timelineEvents[this.activeIndex];
    // this.setActiveEvent(this.activeIndex)
  }

  setActiveEvent(index: number): void {
    this.activeIndex = index;
    this.activeEvent = this.timelineEvents[index];
    this.startProgress();
  }
  startProgress(): void {
    const stageDuration = 0.1 * 60 * 1000; // 1 seconds in milliseconds
    this.interval = setInterval(() => {
      const percentageProgress = Math.ceil(((this.activeIndex + 1) / (this.timelineEvents.length -1))*100)
      if ((this.progressStage < this.totalStages) && percentageProgress <= 100) {
        this.progressStage++;
        this.updateProgress();
      } else {
        clearInterval(this.interval);
      }
    }, stageDuration);
  }

  updateProgress(): void {
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
            color = `linear-gradient(to right, #35B288 ${startPercentage}%, #35B288 ${endPercentage}%, #35B288 ${endPercentage}%)`;
            break;
        case 2:
            color = `linear-gradient(to right, #35B288 ${startPercentage}%, #35B288 ${endPercentage}%, #FF9900 ${endPercentage}%)`;
            break;
        case 3:
            color = `linear-gradient(to right, #35B288 ${startPercentage}%, #FF9900 ${endPercentage}%,#FF3C3C ${endPercentage}%)`;
            break;
    }
    document.documentElement.style.setProperty('--progress-color', color);
}


  markAsComplete(index: number): void {
    this.completePercentage = ((index + 1) / (this.timelineEvents.length -1) ) * 100;
    this.completePercentage = Math.ceil(this.completePercentage)
    if (!(index + 1 == this.timelineEvents.length)){
       // this.startProgress();
    // this.setActiveEvent(index);
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
    document.documentElement.style.setProperty('--progress-color', '#35B288');
    this.progressStage = 0;

    }
    else{
     this.progress = 100; 
    }
  }
  
  
}
