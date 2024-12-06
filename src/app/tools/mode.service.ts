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
    
    private palette: Palette = {
        bgWhite: 'rgba(255, 255, 255, 0.4)',
        bgBlack: 'rgba(0, 0, 0, 0.4)',
        fontWhite: 'rgb(220, 220, 220)',
        fontBlack: 'rgb(20, 20, 20)'
    };

    //* true = Light // false = Dark.
    mode = signal<boolean>(true);

    changeMode(): void {
        this.mode.set(!this.mode());
    }

    background = computed<string>(() => (
          this.mode()
        ? this.palette.bgWhite
        : this.palette.bgBlack
    ));

    font = computed<string>(() => (
          this.mode()
        ? this.palette.fontBlack
        : this.palette.fontWhite
    ));

}