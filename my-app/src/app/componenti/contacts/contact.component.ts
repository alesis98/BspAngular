import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/servizi/firebase.service';
import { ServizioProvaService } from 'src/app/servizi/servizio-prova.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  persone: Persona[] = [];
  //isProfile: boolean = false;
  constructor(
    private firebase: FirebaseService,
    private servizioProva: ServizioProvaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* console.log("persone", this.servizioProva.persone);
    
    if(this.route.snapshot.paramMap.get('id')){
      console.log("ciao");
      
      this.isProfile = true;
      this.persona = this.servizioProva.getPersona(parseInt(this.route.snapshot.paramMap.get('id')!)); 
    }else{
      console.log("bello");
      
      this.isProfile = false;
      this.persone = this.servizioProva.getPersone();
      console.log(this.persone);
      
    }
    console.log(this.route.snapshot.paramMap.get('id'));
    console.log(this.isProfile);  */
    //this.persone = this.servizioProva.getPersone();
    this.loadPersone();
  }

  loadPersone() {
    this.firebase.getPersone().subscribe({
      next: (data: any) => {
        this.persone = Object.keys(data).map((key) => {
          data[key]['id'] = key;
          return data[key];
        });
        console.log(this.persone);
      },
      error: (error) => console.log(error),
      complete: () => console.log('Completed'),
    });
  }

  onDeletePersona(id: string) {
    this.firebase
      .deletePersona(id)
      .subscribe((response) => console.log(response));
    this.persone = this.persone.filter((persona) => persona.id !== id);
  }
}
