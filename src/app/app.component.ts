import { Component } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { ControlComponent } from "./control/control.component";
import { CodeWindowComponent } from './code-window/code-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    ControlComponent,
    CodeWindowComponent
  ],
  template: `
  
    <header Navbar></header>
    <app-control />
    <main>
      <app-code-window />
    </main>

  `,
  // styleUrl: './app.component.scss'
  styles: `
  
    main {
      display: flex; flex-direction: column; justify-content: center; align-items: center; 
    }
  
  `
})
export class AppComponent {}