import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs';

interface TimelineEvent {
  date: string;
  label: string;
  details: string;
}
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  steps:TimelineEvent[] = [
    { label: 'Start', details: 'Onboarding', date: 'Jan 20'},
    { label: 'Axos', details: 'Axos details', date: 'Feb 14' },
    { label: 'Client', details: 'Client details', date: 'Mar 8'},
    { label: 'Advisor', details: 'Advisor details', date: 'Apr 30'},
    { label: 'HCM', details: 'HCM details', date: 'Jun 7'},
    { label: 'Docupace', details: 'Docupace details', date: 'Sep 16'},
    { label: 'Trillo', details: 'Trillo details', date: 'Oct 20'},
    { label: 'Done', details: 'Process Done', date: 'Nov 30'}
  ];
  

  currentStep = 0;
  completionPercentage = 0;
  timerSubscription!: Subscription;
  progressBarBackgrounds: string[] = Array(this.steps.length - 1).fill('#D6E6FB');

  ngOnInit() {
    this.startTimer();
  }
  startTimer() {
    let elapsedTime = 0;
    this.timerSubscription = interval(1000).subscribe(() => {
      elapsedTime++;
      if (elapsedTime === 1) {
        this.updateProgress(elapsedTime, '#35B288', 1);
      } else if (elapsedTime === 2) {
        this.updateProgress(elapsedTime, '#FF9900', 2);
      } else if (elapsedTime === 3) {
        this.updateProgress(elapsedTime, '#FF3C3C', 3);
        this.timerSubscription.unsubscribe(); // Stop the timer after 3 seconds
      }
    });
  }

  updateProgress(elapsedTime: number, color: string, threshold: number) {
    const stepIndex = this.currentStep;
    if (elapsedTime <= threshold) {
      if (elapsedTime === 1) {
        this.progressBarBackgrounds[stepIndex] = `linear-gradient(to right, #35B288 33%, #D6E6FB 33%)`;
      } else if (elapsedTime === 2) {
        this.progressBarBackgrounds[stepIndex] = `linear-gradient(to right, #35B288 33%, #FF9900 66%, #D6E6FB 66%)`;
      } else if (elapsedTime === 3) {
        this.progressBarBackgrounds[stepIndex] = `linear-gradient(to right, #35B288 33%, #FF9900 66%, #FF3C3C 100%)`;
      }
    }
  }

  markAsComplete() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.progressBarBackgrounds[this.currentStep] = '#35B288';
    this.currentStep++;
    this.completionPercentage = (this.currentStep / (this.steps.length - 1)) * 100;
    this.completionPercentage = Math.ceil(this.completionPercentage);
    if (this.currentStep < this.steps.length - 1) {
      this.startTimer();
    } else {
      this.completionPercentage = 100;
    }
  }
}