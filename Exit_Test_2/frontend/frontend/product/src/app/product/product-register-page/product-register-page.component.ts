import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscriber } from 'rxjs';
import { Product } from 'src/app/models/product';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-register-page',
  templateUrl: './product-register-page.component.html',
  styleUrls: ['./product-register-page.component.css']
})
export class ProductRegisterPageComponent implements OnInit {

  productForm: FormGroup;
  productObj: Product = new Product();
  file = [];
  image:string='';

  constructor(private _snackBar: MatSnackBar,
    private productService: ProductService,private fb: FormBuilder) {
    this.productForm = new FormGroup({
      brand: new FormControl("", [Validators.required]),
      productName: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      // pinCode: new FormControl("", [Validators.required]),
      image: new FormControl([], Validators.required),
      pinCode: this.fb.array([])
    });
  }

  ngOnInit() {

  }

  handleFileInput(files) {
    this.prepareFilesList(files);
  }
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.file.push(item);
    }
    this.uploadFilesSimulator(0);
  }
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.file.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.file[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.file[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  onClickSubmitForm() {

    if (!this.productForm.invalid) {
      console.log(this.productForm.value);

      this.productObj.brand = this.productForm.value.brand;
      this.productObj.productName = this.productForm.value.productName;
      this.productObj.description = this.productForm.value.description;
      // this.productObj.pinCode = this.productForm.value.pinCode;
      this.productObj.price = this.productForm.value.price;
      this.productObj.image = this.base64code;
      this.productObj.pinCode = this.productForm.value.pinCode;

      // this.productService.addProduct(this.productObj, this.file[0]).subscribe(data =>
      this.productService.addProduct1(this.productObj).subscribe(data =>

        console.log(data)
      )
      // To reset the form
     this.productForm.reset();
     this.popup('Product Added', 'Done');
    } else {
      this.popup('Input error', 'Retry');
    }
  }

  popup(var1, var2) {
    this._snackBar.open(var1, var2, {
      duration: 3000,
      //  panelClass: 'my-snackbar',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }


  myImage!: Observable<any>;
  base64code!: any;
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    //console.log(file)
    this.convertToBase64(file)
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      // console.log(d)
      this.myImage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
  }


   // for chips

   visible = true;
   selectable = true;
   removable = true;
   addOnBlur = true;
  //  fruitControls :string[]=[]
   
   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 
 
   get fruitControls(): FormArray {
     return this.productForm.controls.pinCode as FormArray;
   }
 
   add(event: MatChipInputEvent): void {
     const input = event.input;
     const value = event.value;
 
     // Add our product
     if ((value || "").trim()) {
       this.fruitControls.push(this.fb.control(value));
     }
 
     // Reset the input value
     if (input) {
       input.value = "";
     }
   }
 
   remove(fruit: string): void {
     const index = this.fruitControls.value.indexOf(fruit);
     if (index >= 0) {
       this.fruitControls.removeAt(index);
     }
   }
 
   // end for chips
}

function value(value: any) {
  throw new Error('Function not implemented.');
}
function index(index: any, arg1: number) {
  throw new Error('Function not implemented.');
}
