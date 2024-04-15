import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productForm!: FormGroup;
  productList: any[] = [];
  index: any;

  constructor(private _product: ProductService) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''),
      productQuantity: new FormControl(''),
      productRate: new FormControl('')
    });
  }

  submit() {
    this._product.addNewProduct(this.productForm.value).subscribe({
      next: (resp) => {
        console.log(resp);
        this.productList.push(this.productForm.value);
        this.closeModal('addProductModal');
        this.productForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openModal(modalId: any, index: any) {
    if (modalId == 'updateProductModal') {
      this.productForm.patchValue(this.productList[index]);
    }
    this.index = index;
    const modalElement: any = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  closeModal(modalId: any) {
    const modalElement: any = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  }

  delete() {
    this.productList.splice(this.index, 1);
    this.closeModal('deleteModal');
  }

  update() {
    console.log(this.productForm.value);
    this.productList[this.index] = this.productForm.value;
  }
}
