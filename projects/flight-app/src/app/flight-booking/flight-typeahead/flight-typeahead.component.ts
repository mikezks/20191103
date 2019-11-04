import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject } from 'rxjs';
import { tap, share, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
   
  timer$: Observable<number>;
  timberSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.rxjsDemo();
  }

  ngOnDestroy(): void {
    //this.timberSubscription.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  rxjsDemo(): void {
    this.timer$ = timer(0, 1000)
      .pipe(
        takeUntil(this.destroy$),
        tap(value => console.log('implementation logic pipe', value)),
        //share()
      );

    this.timberSubscription = this.timer$
      .subscribe(console.log);
  }



}
