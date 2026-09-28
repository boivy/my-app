import { Component, OnInit, signal } from '@angular/core';
import { CustomerGroup } from '../classes/ICustomer';
import { CustomerHttpService } from '../services/customer-http-service';

@Component({
  selector: 'app-customer-group-component',
  standalone: false,
  templateUrl: './customer-group-component.html',
  styleUrl: './customer-group-component.css',
})
export class CustomerGroupComponent implements OnInit {
  readonly customerGroups = signal<CustomerGroup[]>([]);
  readonly errorMessage = signal('');

  constructor(private readonly customerService: CustomerHttpService) {}

  ngOnInit(): void {
    this.customerService.getCustomerGroups().subscribe({
      next: (groups) => this.customerGroups.set(groups),
      error: () => this.errorMessage.set('Could not load the customer list.'),
    });
  }
}