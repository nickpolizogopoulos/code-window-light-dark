import {
  Component,
  inject,
  signal
} from '@angular/core';
  
import { ModeService } from '../tools/mode.service';
import {
  navLinks,
  type NavLink
} from './nav-links';

@Component({
  selector: 'header[Navbar]',
  standalone: true,
  template: `
  
    <section>
      <div>
        <input [hidden]="true" class="check-icon" id="check-icon" name="check-icon" type="checkbox">
        <label (click)="onMenuToggle()" class="icon-menu" for="check-icon">
          <div class="bar bar--1" style="background-color: {{ modeService.font() }};"></div>
          <div class="bar bar--2" style="background-color: {{ modeService.font() }};"></div>
          <div class="bar bar--3" style="background-color: {{ modeService.font() }};"></div>
        </label>
      </div>
      <label for="check-icon" (click)="onMenuToggle()" [style.color]="modeService.mode() ? modeService.font() : modeService.font()">Menu</label>
    </section>
    @if (!linksHidden()) {
      @for (item of navLinks; track $index) {
        <a 
          style="color: {{ modeService.font() }};"
          href="{{ item.url }}"
          target="_blank"
        >
          <svg
            [attr.viewBox]="item.name === 'More projects!' ? '0 0 24 24' : '0 0 16 16'"
            width="17"
            height="17"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path [attr.d]="item.svgPath" />
          </svg>
          <span>{{ item.name }}</span>
        </a>
      }
    }

  
  `,
  host: {
    '[style.background-color]': 'modeService.background()',
    '(window: resize)': 'onWindowResize()'
  },
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor() {
    this.updateDrawerState();
  }

  modeService = inject(ModeService);

  linksHidden = signal<boolean>(false);
  windowWidth = signal<number>(window.innerWidth);

  onMenuToggle(): void {
    this.linksHidden.set(!this.linksHidden());
  }

  get navLinks(): NavLink[] {
    return [ ...navLinks ];
  }

  private updateDrawerState(): void {
    const isMobile = this.windowWidth() < 970;
    this.linksHidden.set(isMobile);
  }
  
  private onWindowResize(): void {
    this.windowWidth.set(window.innerWidth);
    this.updateDrawerState();
  }
  
}