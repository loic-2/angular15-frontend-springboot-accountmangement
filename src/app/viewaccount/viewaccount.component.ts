import { Component, Input } from '@angular/core';
import { Account } from '../models/account';

@Component({
  selector: 'app-viewaccount',
  templateUrl: './viewaccount.component.html',
  styleUrls: ['./viewaccount.component.css']
})
export class ViewaccountComponent {
  @Input() account!: Account
}
