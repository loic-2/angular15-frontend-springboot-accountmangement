import { Component, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() account!: Account
  message="Vous devez entrer une valeur"
  @Input() title:string="Ajouter un compte"
  @Input() buttonText:string="Enregistrer"
  @Input() type:string="creer"
  nom = new FormControl<string>("",[Validators.required,Validators.maxLength(30)])
  prenom = new FormControl<string>("",[Validators.required,Validators.maxLength(30)])
  numero_compte= new FormControl<string>("",[Validators.required])
  cin= new FormControl<string>("",[Validators.required])
  agence= new FormControl<string>("",[Validators.required,Validators.maxLength(20)])
  solde= new FormControl<string>("",[Validators.required])

  constructor(private accountService:AccountService,
              private matSnackBar:MatSnackBar){

  }

  ngOnInit(): void{
    this.nom.setValue(this.account?.nom)
    this.prenom.setValue(this.account?.prenom)
    this.agence.setValue(this.account?.agence)
    this.numero_compte.setValue(this.account?.numero)
    this.solde.setValue(this.account?.solde)
    this.cin.setValue(this.account?.cni)
  }

  getErrorMessagePrenom() {
    if (this.prenom.hasError('required')) {
      return this.message;
    }

    return this.prenom.hasError('prenom') ? 'La taille ne doit pas depasser 20 caracteres.' : '';
  }

  getErrorMessageForNom(){
    if (this.nom.hasError('required')) {
      return this.message;
    }
    return this.nom.hasError('nom')? "La taille ne doit pas depasser 30 carcteres.":"";
  }

  getErrorMessageForSolde(){
    if (this.solde.hasError('required')) {
      return this.message;
    }
    return ''
  }

  getErrorMessageForCin(){
    if (this.cin.hasError('required')) {
      return this.message;
    }
    return ''
  }

  getErrorMessageForAgence(){
    if (this.agence.hasError('required')) {
      return this.message;
    }
    return ''
  }

  getErrorMessageForCompte(){
    if (this.numero_compte.hasError('required')) {
      return "Vous devez entrez une valeur";
    }
    return ''
  }
  save(){
    const newAccount= new Account()
    newAccount.agence=this.agence?.value!
    newAccount.nom=this.nom.value!
    newAccount.cni=this.cin.value!
    newAccount.prenom=this.prenom.value!
    newAccount.numero=this.numero_compte.value!
    newAccount.solde=this.solde.value!
    newAccount.id=this.account?.id
    console.log(newAccount)
    if (this.type==="creer") {
      this.accountService.createAccount(newAccount).subscribe(result=>{
        this.matSnackBar.open("Enregistrement reussi","Fermer",{
          panelClass:"custom-snackbar",
          duration:3000,
          horizontalPosition:"end",
          verticalPosition:"top"})
      })
    } else {
      this.accountService.updateAccount(newAccount).subscribe(result=>{
        this.matSnackBar.open("Modification Reussi","Fermer",{
          panelClass:"custom-snackbar",
          duration:3000,
          horizontalPosition:"end",
          verticalPosition:"top"})
      })
    }
  }
}
