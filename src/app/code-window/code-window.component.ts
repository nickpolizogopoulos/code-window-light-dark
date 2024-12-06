import {
  Component,
  inject,
  signal
} from '@angular/core';

import { ModeService } from '../tools/mode.service';

@Component({
  selector: 'app-code-window',
  standalone: true,
  templateUrl: './code-window.component.html',
  styleUrl: './code-window.component.scss',
  host: {
    '[style.background-color]': 'modeService.background()'
  }
})
export class CodeWindowComponent {

  modeService = inject(ModeService);

  switch = signal<boolean>(false);

  onToggle(): void {
    this.switch.update( state => !state );
  }

  isLight = signal<boolean>(true);
  isDisabled = signal<boolean>(false);

}