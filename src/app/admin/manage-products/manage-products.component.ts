import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../products/product.interface';
import { ProductsService } from '../../products/products.service';
import { ManageProductsService } from './manage-products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  readonly columns = ['from', 'description', 'price', 'count', 'action'];

  selectedFile: File | null = null;

  isLoading = false;

  products$!: Observable<Product[]>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly manageProductsService: ManageProductsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.products$ = this.productsService.getProducts();
  }

  fileChange(file: File | null): void {
    if (file === null) {
      this.isLoading = false;
    }
  }

  onUploadCSV(): void {
    this.isLoading = true;

    if (!this.selectedFile) {
      this.isLoading = false;
      return;
    }

    this.manageProductsService
      .uploadProductsCSV(this.selectedFile)
      .subscribe(() => {
        this.selectedFile = null;
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }
}
