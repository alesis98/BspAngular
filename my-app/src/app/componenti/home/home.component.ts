import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/servizi/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeForm: FormGroup;
  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.homeForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      colore: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.homeForm);
    this.firebase
      .insertPersona({
        nome: this.homeForm.value.nome,
        email: this.homeForm.value.email,
        colore: this.homeForm.value.colore,
      })
      .subscribe((response) => console.log(response));
    // Resetta il form dopo il submit
    this.homeForm.reset();

    // Imposta tutti i controlli come "pristine" e "untouched"
    Object.keys(this.homeForm.controls).forEach((key) => {
      this.homeForm.get(key)?.setErrors(null);
      this.homeForm.get(key)?.markAsPristine();
      this.homeForm.get(key)?.markAsUntouched();
    });
  }

  onDeletePersona() {
    this.firebase
      .deletePersona('-O3qOkU8ji4Cnz2wnfpY')
      .subscribe((response) => console.log(response));
  }
}
