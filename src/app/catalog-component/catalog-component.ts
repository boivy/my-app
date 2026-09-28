import { Component, OnInit } from '@angular/core';
import { CatalogCategory, CatalogService } from '../services/catalog-service';

@Component({
  selector: 'app-catalog-component',
  standalone: false,
  templateUrl: './catalog-component.html',
  styleUrl: './catalog-component.css',
})
export class CatalogComponent implements OnInit {
  categories: CatalogCategory[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.categories = this.catalogService.getCategories();
  }
}