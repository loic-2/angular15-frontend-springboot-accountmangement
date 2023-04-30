import { Component, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { ViewaccountComponent } from '../viewaccount/viewaccount.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  id:number;
  nom: string;
  position: number;
  prenom: string;
  cni: string;
  numero: string;
  agence: string;
  solde: string
}

var ELEMENT_DATA: PeriodicElement[]=[]

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  accounts!:Account[];
  ngOnInit(): void {
    this.fetchData()
  }
  

  constructor(public dialog: MatDialog,private accountService: AccountService,
              private matSnackBar:MatSnackBar) {}
  displayedColumns: string[] = ['checked','position', 'nom', 'prenom', 'cni','numero','agence','solde','actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([...ELEMENT_DATA]);

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  addData() {
    const dialogRef= this.dialog.open(DialogComponent,{
      width:"700px",
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.fetchData()
    })
  }

  removeData() {
  }

  editData(element :any) {
    const dialogRef= this.dialog.open(DialogComponent,{
      width:"700px",
    })
    dialogRef.componentInstance.account=element
    dialogRef.componentInstance.title="Modifier le compte"
    dialogRef.componentInstance.buttonText="Modifier"
    dialogRef.componentInstance.type="Modifier"
    dialogRef.afterClosed().subscribe(result=>{
      this.fetchData()
    })
  }

  viewData(element:any){
    const dialogRef=this.dialog.open(ViewaccountComponent,{
      width:"500px",
    })
    dialogRef.componentInstance.account=element
  }

  deleteData(element :any) {
    this.accountService.deleteAccount(element.id).subscribe(result=>{
      this.matSnackBar.open("Suppression Reussi","Fermer",{
        panelClass:"custom-snackbar",
        duration:3000,
        horizontalPosition:"end",
        verticalPosition:"top"})
      this.fetchData();
    })
  }

  fetchData():void{
    let compteur=0;
    this.accountService.getAllAccount().subscribe((result) => {
      this.accounts = result;
      ELEMENT_DATA.splice(0,ELEMENT_DATA.length)
      this.accounts.forEach((account, index) => {
        const element: PeriodicElement = {
          id: account.id,
          nom: account.nom,
          position: compteur + 1,
          prenom: account.prenom,
          cni: account.cni,
          numero: account.numero,
          agence: account.agence,
          solde: account.solde
        };
  
        ELEMENT_DATA.push(element);
        compteur++
      });
      this.dataSource=new MatTableDataSource<PeriodicElement>([...ELEMENT_DATA])
      this.table.renderRows();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
