import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { iCani, iPersona } from '../interfaces';
import { ServizioProvaService } from '../servizi/servizio-prova.service';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})

export class ProvaComponent implements OnInit, OnChanges {
  @Input() data!: iPersona[];
  @Output() mandaDatiEvento = new EventEmitter<object[]>();
  title: string = "";

  cani: iCani[] = [
    {
      nome: 'roger',
      razza: 'golden',
      descrizione: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'
    }
  ]

  isDisabled: boolean = false;
  isVisible = false;
  
  
  constructor(private servizioProva: ServizioProvaService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  mandaDati(){
    this.mandaDatiEvento.emit(this.cani);
  }
  
  ngOnInit(): void {
    console.log(this.data);
    //console.log("persone SERVICE",this.servizioProva.getPersone());
    
    setInterval(()=> {
      this.isVisible = !this.isVisible;
    }, 2000)    
  }

  onInput(event: Event){
    this.title = ((<HTMLInputElement>event.target).value);
  }

  onClick(event: Event){
    this.title = "Ho cliccato sul bottone"; 
  }

  

}
