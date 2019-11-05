import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, Subscription, Subject, interval, pipe, combineLatest, iif, of } from 'rxjs';
import { tap, share, takeUntil, switchMap, debounceTime, filter, distinctUntilChanged, delay, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-api';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css']
})
export class FlightTypeaheadComponent implements OnInit, OnDestroy {
   
  timer$: Observable<number>;
  timberSubscription: Subscription;
  destroy$ = new Subject<boolean>();

  control = new FormControl();
  flights$: Observable<Flight[]>;
  loading: boolean;
  online$: Observable<boolean>;
  online: boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //this.rxjsDemo();
    this.initTypeahead();
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

  initTypeahead(): void {
    this.online$ = 
      interval(2000)
        .pipe(
          startWith(0),
          map(() => Math.random() < 0.5),
          distinctUntilChanged(),
          tap(online => this.online = online)
        );

    this.flights$ =
      this.control.valueChanges
        .pipe(
          from$ => combineLatest(from$, this.online$),
          filter(([from, online]) => online),
          map(([from, online]) => from),
          //filter(from => from.length > 2),
          debounceTime(300),
          distinctUntilChanged(),
          switchMap(from => 
            iif(
              () => from.length > 2,
              of(from)
                .pipe(
                  tap(() => this.loading = true),
                  //delay(1000),
                  switchMap(from => this.load(from)),
                  tap(() => this.loading = false)
                ),
              of([])
            )
          )  
        );
  }

  load(from: string): Observable<Flight[]>  {
    let url = "http://www.angular.at/api/flight";

    let params = new HttpParams()
                        .set('from', from);

    let headers = new HttpHeaders()
                        .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, {params, headers});
  }


}
