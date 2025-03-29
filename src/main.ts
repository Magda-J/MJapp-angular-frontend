

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ Import provideAnimations

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // ✅ Enable animations globally
    ...appConfig.providers, // Preserve your custom configuration
  ],
}).catch((err) => console.error(err));
  
