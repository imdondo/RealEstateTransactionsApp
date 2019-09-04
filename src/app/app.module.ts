import { ConfirmationPageComponent } from './core/confirmation-page/confirmation-page.component';
import { BeneficiariesService } from './services/beneficiaries.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { BeneficiariesListComponent } from './beneficiaries-list/beneficiaries-list.component';
import { BeneficiaryFormComponent } from './beneficiary-form/beneficiary-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BeneficiariesListComponent,
    BeneficiaryFormComponent
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
    BeneficiariesService
  ],
  entryComponents: [
    BeneficiaryFormComponent,
    ConfirmationPageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
