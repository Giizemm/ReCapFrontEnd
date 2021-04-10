import { ToastrService } from 'ngx-toastr';
import { CreditCard } from './../../models/creditCard';
import { ActivatedRoute } from '@angular/router';
import { Rental } from './../../models/rental';
import { HttpClient } from '@angular/common/http';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css'],
})
export class RentACarComponent implements OnInit {
  rental: Rental;
  creditCard: CreditCard;
  rentalAddForm: FormGroup;
  dailyPrice: number;
  creditCardForm: FormGroup;
  currentCarId: number;
  canRental: boolean = false;
  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    public modal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.createCreditCardForm();
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      cardHolderName: ['', [Validators.required, Validators.maxLength(50)]],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      expirationMonth: [
        '',
        [Validators.required, Validators.max(12), Validators.min(1)],
      ],
      expirationYear: [
        '',
        [Validators.required, Validators.max(99), Validators.min(0)],
      ],
      cvv: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  calculationDate(rentDate: string, returnDate: string) {
    let newRentDate = new Date(rentDate);
    let newReturnDate = new Date(returnDate);
    let result = Math.floor(
      (Date.UTC(
        newReturnDate.getFullYear(),
        newReturnDate.getMonth(),
        newReturnDate.getDate()
      ) -
        Date.UTC(
          newRentDate.getFullYear(),
          newRentDate.getMonth(),
          newRentDate.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    return result;
  }

  calculateTotalPrice(totalDays: number, dailyPrice: number) {
    return totalDays * dailyPrice;
  }

  checkCanRental() {
    let rentDate = this.creditCardForm.controls['rentDate'].value;
    let returnDate = this.creditCardForm.controls['returnDate'].value;

    if (rentDate && returnDate) {
      this.toastrService.info(
        'Seçilen tarihlerin uygunluğu kontrol ediliyor. Lütfen bekleyiniz...'
      );
      setTimeout(() => {
        this.rentalService
          .checkCanRental(this.currentCarId, rentDate, returnDate)
          .subscribe((response) => {
            if (!response.success)
              this.toastrService.error(
                'Araç başkası tarafından kiralanmıştır.'
              );
            this.canRental = response.success;
          });
      }, 3000);
    }
  }

  onSubmit() {
    let cardModel = Object.assign({}, this.creditCardForm.value);
    this.rental = new Rental();
    this.rental.carId = this.currentCarId;
    this.rental.customerId = 1;
    this.rental.rentDate = this.creditCardForm.controls['rentDate'].value;
    this.rental.returnDate = this.creditCardForm.controls['returnDate'].value;
    this.rentalService
      .addRental(this.rental, cardModel)
      .subscribe((response) => {
        if (response.success) {
          this.toastrService.info('Araç kiralama işlemi başarılı.');
          this.modal.close();
        } else {
          this.toastrService.warning('Araç kiralanamadı.');
        }
      });
  }
}
