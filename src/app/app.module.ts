import { ConfirmationPageComponent } from './core/confirmation-page/confirmation-page.component';
import { TransactionService } from './services/transactions.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forRoot()
  ],
  providers: [
    TransactionService
  ],
  entryComponents: [
    TransactionFormComponent,
    ConfirmationPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
