import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { BsButtonDirective } from './directives/bs-button.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { MailtoPipe } from './pipes/mailto.pipe';

const components = [HeaderComponent, FooterComponent, ValidationMessageComponent];
const directives = [BsButtonDirective, HighlightDirective];
const pipes = [MailtoPipe]

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ...components,
    ...directives,
    ...pipes
  ]
})

export class SharedModule { }
