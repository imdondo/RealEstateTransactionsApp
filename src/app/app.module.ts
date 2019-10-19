import { ConfirmationPageComponent } from './core/confirmation-page/confirmation-page.component';
import { TransactionService } from './services/transactions.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { TransactionsListComponent } from './transactions-list.component';
import { TransactionsFormComponent } from './transaction-form/transaction-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    TransactionsFormComponent
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
    TransactionsFormComponent,
    ConfirmationPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
