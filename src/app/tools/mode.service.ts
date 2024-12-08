import {
    Injectable,
    computed,
    signal
} from "@angular/core";

import { Palette } from "./palette";

@Injectable({
    providedIn: 'root'
})
export class ModeService {
    
    //* true = Light // false = Dark.
    mode = signal<boolean>(false);

    private palette: Palette = {
        bgLight: 'rgba(255, 255, 255, 0.5)',
        bgBlack: 'rgba(0, 0, 0, 0.4)',
        fontWhite: 'rgb(220, 220, 220)',
        fontBlack: 'rgb(20, 20, 20)',
        commentedWhite: 'rgb(56, 56, 56)',
        commentedBlack: 'rgb(149, 149, 149)'
    };

    changeMode(): void {
        this.mode.set(!this.mode());
    }

    background = computed<string>(() => (
          this.mode()
        ? this.palette.bgLight
        : this.palette.bgBlack
    ));

    font = computed<string>(() => (
          this.mode()
        ? this.palette.fontBlack
        : this.palette.fontWhite
    ));

    commented = computed<string>(() => (
          this.mode()
        ? this.palette.commentedWhite
        : this.palette.commentedBlack
    ));

}