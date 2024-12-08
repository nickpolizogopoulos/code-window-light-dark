import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import { ModeService } from '../tools/mode.service';
import { BoolMember } from './member-type';

@Component({
  selector: 'app-code-window',
  standalone: true,
  templateUrl: './code-window.component.html',
  styleUrl: './code-window.component.scss',
  host: {
    '[style.background-color]': "windowOpen() ? modeService.background() : ''",
    '[class.window-styling]': 'windowOpen()',
    '[style.min-width]': "codeWindowFullWidth() ? '100%' : ''"
  }
})
export class CodeWindowComponent {

  modeService = inject(ModeService);
  
  switch = signal<boolean>(false);
  windowOpen = signal<boolean>(true);
  codeWindowFullWidth = signal<boolean>(false);
  copied = signal<boolean>(false);

  reverseBoolMember( member: BoolMember ): void {
    this[member].update( m => !m );
  }

  onCodeWindowFullWidth(): void {
    this.codeWindowFullWidth.set(true);
  }
  
  onCodeWindowMinimise(): void {
    this.codeWindowFullWidth.set(false);
  }

  onToggle(): void {
    this.switch.update( state => !state );
  }

  onCopy(): void {
    this.copied.set(true);
    navigator.clipboard.writeText( this.code );
    setTimeout(
      () => this.copied.set(false),
      1000
    );
  } 

  private colourTheme = {
    default: computed(() =>
      this.modeService.mode() ? 'rgb(56, 56, 56)' : 'rgb(230, 230, 230)'
    ),
    const: computed(() =>
      this.modeService.mode() ? 'rgb(76, 39, 105)' : 'rgb(70, 206, 255)'
    ),
    symbol: computed(() =>
      this.modeService.mode() ? 'rgb(34, 45, 102)' : 'rgb(255, 135, 169)'
    ),
    string: computed(() =>
      this.modeService.mode() ? 'rgb(27, 64, 122)' : 'rgb(255, 236, 112)'
    ),
    method: computed(() =>
      this.modeService.mode() ? 'rgb(76, 39, 105)' : 'rgb(103, 185, 135)'
    ),
    numBool: computed(() =>
      this.modeService.mode() ? 'rgb(79, 0, 0)' : 'rgb(192, 144, 249)'
    ),
    brace: computed(() =>
      this.modeService.mode() ? 'black' : 'rgb(255, 236, 112)'
    ),
    braceTwo: computed(() =>
      this.modeService.mode() ? 'black' : 'rgb(216, 94, 216)'
    ),
    braceThree: computed(() =>
      this.modeService.mode() ? 'black' : 'rgb(73, 128, 255)'
    ),
  };

  get theme() {
    return { ...this.colourTheme };
  }

  private code: string = `
    const me: Developer = {
      name: 'Nick Polizogopoulos',
      age: () => new Date().getFullYear() - 1992,
      hardSkills: ['TypeScript', 'Angular', 'React', 'Bootstrap', 'Git'],
      softSkills: ['Problem Solver', 'Team Player'],
      organisedPerson: true,
      portfolio: 'https://nick-polizogopoulos.web.app',
      gitHub: 'https://github.com/nickpolizogopoulos',
      interests: {
        big: ['Vinyl Records', 'Space Industry'],
        bigger: ['Nice People', 'Deep Conversations']
      }
    };
  `;
  
}