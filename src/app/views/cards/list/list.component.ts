import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy {
  cardFormz = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  })
  selectedCar!: number;
  data:any[] = []
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
];
  constructor(private cardService:CardService){

  }
  ngOnInit(): void {
    this.load();  
  }

  load(){
    this.cardService.get().subscribe((response:any) => {
      this.data = response
    })
  }
  isDelete(){
    console.log('test');
  }
  ngOnDestroy(): void {
    
  }
  onSubmit(){
    console.log('onSubmit')
  }
}
