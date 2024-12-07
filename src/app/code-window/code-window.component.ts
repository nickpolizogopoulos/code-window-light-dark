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
    '[style.min-width]': "fullWidth() ? '100%' : ''"
  }
})
export class CodeWindowComponent {

  modeService = inject(ModeService);

//   theme = {
//     string: this.modeService.mode() ? 'black' : 'white',
//     // method: this.mode() ? '' : '',
//     // default: this.mode() ? '' : '',
//     // this: this.mode() ? '' : '',
//     // that: this.mode() ? '' : '',
// };

  switch = signal<boolean>(false);
  windowOpen = signal<boolean>(true);
  fullWidth = signal<boolean>(false);

  reverseBoolMember( member: BoolMember ): void {
    this[member].update( m => !m );
  }

  onFullWidth(): void {
    this.fullWidth.set(true);
  }
  
  onMinimise(): void {
    this.fullWidth.set(false);
  }

  onToggle(): void {
    this.switch.update( state => !state );
  }

  copied = signal<boolean>(false);
  onCopy(): void {
    this.copied.set(true);
    navigator.clipboard.writeText( this.code );
    setTimeout(
      () => this.copied.set(false),
      1000
    );
  } 

  private hardSkills: string[] = [
    'TypeScript',
    'Angular',
    'React',
    'Bootstrap',
    'SQL',
    'Git'
  ];

  get allHardSkills(): string[] {
    return [...this.hardSkills];
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

  theme = {
    const: computed(() => this.modeService.mode() ? 'orangered' : 'rgb(70, 206, 255)' )
  };
}