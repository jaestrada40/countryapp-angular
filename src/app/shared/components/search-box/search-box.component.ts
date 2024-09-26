import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private dbouncer: Subject<string> = new Subject<string>();
  private debounceSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter();

  @Output()
  public onDebounce = new EventEmitter();

  ngOnInit(): void {
    this.debounceSuscription = this.dbouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value =>{
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe();
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ){
    this.dbouncer.next( searchTerm );
  }
}
