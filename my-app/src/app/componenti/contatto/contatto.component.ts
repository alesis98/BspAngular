import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/interfaces';
import { FirebaseService } from 'src/app/servizi/firebase.service';

@Component({
  selector: 'app-contatto',
  templateUrl: './contatto.component.html',
  styleUrls: ['./contatto.component.css'],
})
export class ContattoComponent implements OnInit {
  persona: Persona | undefined;
  // Definisce una proprietà persona di tipo Persona che può essere anche undefined inizialmente. Questo è importante per gestire il caso in cui i dati non siano ancora disponibili.
  subscribe?: any;
  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);

      const id = params.get('id');
      if (id) {
        this.getPersona(id);
      }
    });
  }

  getPersona(id: string) {
    this.subscribe = this.firebase.getPersona(id).subscribe({
      next: (data: any) => {
        if (data) {
          console.log('Dati recuperati:', data);

          this.persona = { ...data, id }; // Assegna solo se data è valido
          console.log(this.persona);
        } else {
          console.error('Persona non trovata');
        }
      },
      error: (error) => {
        console.error('Errore durante il recupero dei dati:', error);
        // Aggiungi eventuale gestione dell'errore, come un redirect o un messaggio utente
      },
    });
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
