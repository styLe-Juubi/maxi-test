import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  getTheme() {
    this.setTheme( 
      localStorage.getItem('theme') ?? 
      'default'
    );
  }

  setTheme( theme: string ): void {
    switch (theme) {
      case 'default':
        this.defaultTheme();
        break;

      case 'dark':
          this.darkTheme();
          break;

      case 'sennin':
        this.senninTheme();
        break;

      case 'uchiha':
        this.uchihaTheme();
        break;

      case 'pink':
        this.pinkTheme();
        break;

      case 'xcentic':
        this.xcenticTheme();
        break;
    
      default:
        this.defaultTheme();
        break;
    }

    localStorage.setItem('theme', theme);
  }

  protected defaultTheme(): void {
    localStorage.setItem('theme', 'default');

    // Body
    document.documentElement.style.setProperty('--body-color', '#F0F0F0');

    // Backgrounds
    document.documentElement.style.setProperty('--white', '#fff');
    document.documentElement.style.setProperty('--dark', '#2B2B2B');
    document.documentElement.style.setProperty('--bg-skeleton', '#dddddd');
    document.documentElement.style.setProperty('--bg-skeleton-item', '#CFCFCF');

    // Main color
    document.documentElement.style.setProperty('--purple', '#1C2653');
    document.documentElement.style.setProperty('--purple-light', '#35427C');
    document.documentElement.style.setProperty('--purple-dark', '#141C3E');
    
    // Fonts
    document.documentElement.style.setProperty('--font-white', '#fff');
    document.documentElement.style.setProperty('--font-dark', '#202020');
    document.documentElement.style.setProperty('--font-gray', '#6E6E6E');
    document.documentElement.style.setProperty('--font-white-light', '#F0F0F0');

    // Borders
    document.documentElement.style.setProperty('--border-light', '#e1e1e1');
    document.documentElement.style.setProperty('--border-dark', '#101010');
        
    // Shadows
    document.documentElement.style.setProperty(
      '--box-shadow', 
      'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    );
  }

  protected darkTheme(): void {
    localStorage.setItem('theme', 'dark');

    // Body
    document.documentElement.style.setProperty('--body-color', '#303030');

    // Backgrounds
    document.documentElement.style.setProperty('--white', '#404040');
    document.documentElement.style.setProperty('--dark', '#101010');
    document.documentElement.style.setProperty('--bg-skeleton', '#505050');
    document.documentElement.style.setProperty('--bg-skeleton-item', '#404040');

    // Main color
    document.documentElement.style.setProperty('--purple', '#000');
    document.documentElement.style.setProperty('--purple-light', '#252525');
    document.documentElement.style.setProperty('--purple-dark', '#000');
    
    // Fonts
    document.documentElement.style.setProperty('--font-white', '#fff');
    document.documentElement.style.setProperty('--font-dark', '#fff');
    document.documentElement.style.setProperty('--font-gray', '#C8C8C8');
    document.documentElement.style.setProperty('--font-white-light', '#F3F3F3');

    // Borders
    document.documentElement.style.setProperty('--border-light', '#202020');
    document.documentElement.style.setProperty('--border-dark', '#e1e1e1');
    
    // Shadows
    document.documentElement.style.setProperty(
      '--box-shadow', 
      'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    );
  }

  protected senninTheme(): void {
    localStorage.setItem('theme', 'sennin');

    // Body
    document.documentElement.style.setProperty('--body-color', '#F0F0F0');

    // Backgrounds
    document.documentElement.style.setProperty('--white', '#fff');
    document.documentElement.style.setProperty('--dark', '#2B2B2B');
    document.documentElement.style.setProperty('--bg-skeleton', '#dddddd');
    document.documentElement.style.setProperty('--bg-skeleton-item', '#CFCFCF');

    // Main color
    document.documentElement.style.setProperty('--purple', '#F77D40');
    document.documentElement.style.setProperty('--purple-light', '#FF935D');
    document.documentElement.style.setProperty('--purple-dark', '#EA7B44');
    
    // Fonts
    document.documentElement.style.setProperty('--font-white', '#fff');
    document.documentElement.style.setProperty('--font-dark', '#202020');
    document.documentElement.style.setProperty('--font-gray', '#6E6E6E');
    document.documentElement.style.setProperty('--font-white-light', '#F0F0F0');

    // Borders
    document.documentElement.style.setProperty('--border-light', '#e1e1e1');
    document.documentElement.style.setProperty('--border-dark', '#101010');

    // Shadows
    document.documentElement.style.setProperty(
      '--box-shadow', 
      'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    );
  }

  protected uchihaTheme(): void {
    localStorage.setItem('theme', 'uchiha');

    // Body
    document.documentElement.style.setProperty('--body-color', '#030711');

    // Backgrounds
    document.documentElement.style.setProperty('--white', '#131829');
    document.documentElement.style.setProperty('--dark', '#131829');
    document.documentElement.style.setProperty('--bg-skeleton', '#0B142A');
    document.documentElement.style.setProperty('--bg-skeleton-item', '#0F1B37');

    // Main color
    document.documentElement.style.setProperty('--purple', '#8C1414');
    document.documentElement.style.setProperty('--purple-light', '#902F2F');
    document.documentElement.style.setProperty('--purple-dark', '#741313');
    
    // Fonts
    document.documentElement.style.setProperty('--font-white', '#fff');
    document.documentElement.style.setProperty('--font-dark', '#fff');
    document.documentElement.style.setProperty('--font-gray', '#C8C8C8');
    document.documentElement.style.setProperty('--font-white-light', '#F3F3F3');

    // Borders
    document.documentElement.style.setProperty('--border-light', '#202020');
    document.documentElement.style.setProperty('--border-dark', '#e1e1e1');

    // Shadows
    document.documentElement.style.setProperty(
      '--box-shadow', 
      'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    );
  }

  protected pinkTheme(): void {
    localStorage.setItem('theme', 'pink');

    // Body
    document.documentElement.style.setProperty('--body-color', '#F0F0F0');

    // Backgrounds
    document.documentElement.style.setProperty('--white', '#fff');
    document.documentElement.style.setProperty('--dark', '#2B2B2B');
    document.documentElement.style.setProperty('--bg-skeleton', '#dddddd');
    document.documentElement.style.setProperty('--bg-skeleton-item', '#CFCFCF');

    // Main color
    document.documentElement.style.setProperty('--purple', '#F49EEA');
    document.documentElement.style.setProperty('--purple-light', '#FAB0F2');
    document.documentElement.style.setProperty('--purple-dark', '#E57EDA');
    
    // Fonts
    document.documentElement.style.setProperty('--font-white', '#fff');
    document.documentElement.style.setProperty('--font-dark', '#202020');
    document.documentElement.style.setProperty('--font-gray', '#6E6E6E');
    document.documentElement.style.setProperty('--font-white-light', '#F0F0F0');

    // Borders
    document.documentElement.style.setProperty('--border-light', '#e1e1e1');
    document.documentElement.style.setProperty('--border-dark', '#101010');

    // Shadows
    document.documentElement.style.setProperty(
      '--box-shadow', 
      'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
    );
  }

  protected xcenticTheme(): void {
    localStorage.setItem('theme', 'xcentic');

    // Body
    document.documentElement.style.setProperty('--body-color', '#000');

    // Backgrounds
    document.documentElement.style.setProperty('--white', '#000');
    document.documentElement.style.setProperty('--dark', '#000');
    document.documentElement.style.setProperty('--bg-skeleton', '#dddddd');
    document.documentElement.style.setProperty('--bg-skeleton-item', '#CFCFCF');

    // Main color
    document.documentElement.style.setProperty('--purple', '#000');
    document.documentElement.style.setProperty('--purple-light', '#252525');
    document.documentElement.style.setProperty('--purple-dark', '#000');
    
    // Fonts
    document.documentElement.style.setProperty('--font-white', '#fff');
    document.documentElement.style.setProperty('--font-dark', '#fff');
    document.documentElement.style.setProperty('--font-gray', '#F3F3F3');
    document.documentElement.style.setProperty('--font-white-light', '#F3F3F3');

    // Borders
    document.documentElement.style.setProperty('--border-light', '#acebe2');
    document.documentElement.style.setProperty('--border-dark', '#e1e1e1');

    // Shadows
    document.documentElement.style.setProperty(
      '--box-shadow', 
      '#acebe2 0px 1px 3px, #acebe2 0px 1px 2px'
    );
  }
}
