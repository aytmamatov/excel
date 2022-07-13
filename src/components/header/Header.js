import { ExcelComponent } from '@/core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  toHTML() {
    return `
      <input class="input" type="text" value="New table">

      <div>
        <button class="btn">
          <i class="material-icons">
            delete
          </i>
        </button>
        <button class="btn">
          <i class="material-icons">
            exit_to_app
          </i>
        </button>
      </div>
    `;
  }
}
