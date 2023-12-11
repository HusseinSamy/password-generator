import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'password-generator';
  handleInputChange(e: any) {
    let target = e.target
    if (target.type == 'range') {
      const min = target.min
      const max = target.max
      const val = target.value
      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }
    }
}
