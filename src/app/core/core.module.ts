import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Third party library
import { MaterialModule } from './material/material.module';

// Components
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { DigitOnlyDirective } from './directives/digit-only.directive';

@NgModule({
  declarations: [
    ConfirmationPageComponent, 
    DigitOnlyDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DigitOnlyDirective
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only')
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    }
  }
}
