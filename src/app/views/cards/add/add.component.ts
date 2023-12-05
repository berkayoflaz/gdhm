import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray  } from '@angular/forms';
import { CardService } from '../../../services/card.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  data:any[] = []
  newsResponse:any = {}
  getNewsF:any[] = []
  getNews:any[] = []
  getAuthor:any[] = []
  cardForm = new FormGroup({
    authorId: new FormArray([]),
    dateRangeStart: new FormControl(''),
    dateRangeEnd: new FormControl('')
  })
  constructor(private cardService:CardService,private router:Router){

  }
  ngOnInit(): void {
    this.load();  
  }
  onSubmit(){
    this.getAuthor = []
    this.cardForm.value.authorId?.forEach((author:any) => {
      this.data.forEach(d => {
        if(d.id == author){
          d.articles = []
          this.getAuthor.push(d)
        }
      })
    })
    this.cardService.getNewsByAuthor(this.cardForm.value).subscribe({
      next: data =>{
        this.newsResponse = data
        this.getNewsF = this.newsResponse.results
        console.log(this.getAuthor,2);
        this.getNewsF.forEach(item => {
          console.log(item)
          if(item.title !== ""){
            console.log(item,'item')
            this.getAuthor.forEach(gA => {
              if(item.author == gA.id){
                if(gA.articles.indexOf())
                gA.articles.push(item)
              }
            })
          }
        })
        //this.router.navigate(['/card/list'])
      },
      error: err =>{
        this.router.navigate(['#/login'])
      }
    })
    console.log(this.cardForm.value,'form value')
  }
  load(){
    this.cardService.get().subscribe((response:any) => {
      this.data = response
    })
  }
  exportCsv(): void {
    /*let csv = '';
    for (let column = 0; column < this.columns.length; column++) {
      csv += this.columns[column] + ';';
      csv = csv.replace(/\n/g, '');
    }
    csv = csv.substring(0, csv.length - 1) + '\n';
    const rows = this.filterdRows;
  
    for (let row = 0; row < rows.length; row++) {
     for (let rowElement = 0; rowElement < rows[row].length; rowElement++) {
        csv += rows[row][rowElement] + ';';
     }
      csv = csv.substring(0, csv.length - 1) + '\n';
    }
    csv = csv.substring(0, csv.length - 1) + '\n';
    const docElement = document.createElement('a');
    const universalBOM = '\uFEFF';
  
    //You can edit the code for the file name according to your requirements
    let filename = this.filename + '_';
    filename = filename.concat(this.currentDateString.toString());
    const fileNameWithType = filename.concat('.csv');
    docElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(universalBOM + csv);
    docElement.target = '_blank';
    docElement.download = fileNameWithType;
    docElement.click();*/
  }
  onCheckChange(event:any) {
    const formArray: FormArray = this.cardForm.get('authorId') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      });
    }
  }
}

