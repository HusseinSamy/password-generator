import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'password-generator';
  password: string = "";
  passwordPlaceholder: string = "P4$5W0rD!"
  copied: boolean = false;
  upperCase: boolean = false;
  lowerCase: boolean = false;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  passwordLength: number = 0;
  strengthMeter: number = 0; // 1-4
  strength: string = "";
  oldStrengthClass: string = "";


  constructor() { }

  ngOnInit() {}

  styleRangeInput(e: any) {
    const target = e.target
    if (target.type == 'range') {
      const min = target.min
      const max = target.max
      const val = target.value
      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }
  }

  copyPasswordToClipboard(password: string | null | undefined) {
    navigator.clipboard.writeText(password ? password : '');
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }
      , 3000);
  }

  private generate(length: number, useSymbols: boolean, useUppercase: boolean, useLowercase: boolean, useNumbers: boolean) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()-=_+[]{}|;:.<>?';

    let allChars = '';
    let password = '';

    if (useUppercase) allChars += uppercaseChars;
    if (useLowercase) allChars += lowercaseChars;
    if (useNumbers) allChars += numberChars;
    if (useSymbols) allChars += symbolChars;

    if (!allChars || !length) {
      alert('Please select at least one character type.');
      return
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }

    this.password = password;
  }


  generatePassword() {
    this.generate(
      this.passwordLength,
      this.includeSymbols,
      this.upperCase,
      this.lowerCase,
      this.includeNumbers
    );
    this.calculatePasswordStrength();
  }


  calculatePasswordStrength() {
    if ((this.lowerCase || this.upperCase || this.includeNumbers || this.includeSymbols) && this.passwordLength > 0) {
      this.removePreviousColor();
    }
    let strength = 0;
    if (this.passwordLength > 0) {
      if ((this.lowerCase || this.upperCase || this.includeNumbers || this.includeSymbols) && this.passwordLength > 8) strength++;
      if (this.includeSymbols) strength++;
      if (this.includeNumbers) strength++;
      if (this.upperCase) strength++;
    }
    if (strength == 0) {
      if ((this.lowerCase || this.upperCase || this.includeNumbers || this.includeSymbols) && this.passwordLength > 0) strength++;
    }
    if (strength > 0) {
      this.strengthMeter = strength;
      this.removePreviousEmptyBar();
      this.paintStrength();
    }

  }



  removePreviousColor() {
    const strengthBar = document.getElementsByClassName('strength-bar');
    if (strengthBar) {
      for (let i = 0; i < this.strengthMeter; i++) {
        strengthBar[i].classList.remove(this.oldStrengthClass)
      }
    }
  }

  removePreviousEmptyBar() {
    const strengthBar = document.getElementsByClassName('strength-bar');
    if (strengthBar) {
      for (let i = 0; i < this.strengthMeter; i++) {
        strengthBar[i].classList.remove('strength-bar-empty')
      }
    }
  }

  paintStrength() {
    const strengthBar = document.getElementsByClassName('strength-bar');

    if (strengthBar && this.strengthMeter >= 1 && this.strengthMeter <= 4) {
      const colors = ['--red-bg', '--orange-bg', '--yellow-bg', '--green-bg'];
      const strengthText = ['TOO WEAK!', 'WEAK', 'MEDIUM', 'STRONG'];

      this.strength = this.strengthMeter === 1 ? strengthText[0] : strengthText[this.strengthMeter - 1];

      for (let i = 0; i < this.strengthMeter; i++) {
        strengthBar[i].classList.add(colors[this.strengthMeter - 1]);
      }

      for (let j = this.strengthMeter; j < 4; j++) {
        strengthBar[j].classList.add('strength-bar-empty');
      }

      this.oldStrengthClass = colors[this.strengthMeter - 1];
    }

  }
}

