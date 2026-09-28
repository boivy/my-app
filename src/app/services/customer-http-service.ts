import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerGroup } from '../classes/ICustomer';

@Injectable({ providedIn: 'root' })
export class CustomerHttpService {
  private readonly url = '/assets/data/customers.json';

  constructor(private readonly http: HttpClient) {}

  getCustomerGroups(): Observable<CustomerGroup[]> {
    return this.http.get<CustomerGroup[]>(this.url);
  }
}