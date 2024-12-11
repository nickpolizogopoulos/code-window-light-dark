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

    private localStorageKey = 'code-window-mode';

    //* true = Light // false = Dark.
    mode = signal<boolean>(this.loadSavedMode());

    changeMode(): void {
        const newMode = !this.mode();
        this.mode.set(newMode);
        this.saveMode(newMode);
    }

    private loadSavedMode(): boolean {
        const savedMode = window.localStorage.getItem(this.localStorageKey);
        return (
              savedMode
            ? JSON.parse(savedMode)
            : false
        );
    }
    
    private saveMode(mode: boolean): void {
        window.localStorage.setItem(this.localStorageKey, JSON.stringify(mode));
    }

    private palette: Palette = {
        bgLight: 'rgba(255, 255, 255, 0.5)',
        bgBlack: 'rgba(0, 0, 0, 0.4)',
        fontWhite: 'rgb(220, 220, 220)',
        fontBlack: 'rgb(20, 20, 20)',
        commentedWhite: 'rgb(56, 56, 56)',
        commentedBlack: 'rgb(149, 149, 149)'
    };

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