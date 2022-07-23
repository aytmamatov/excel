export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = [];
  }

  select($el) {
    this.clear();
    $el.addClass(TableSelection.className);
    this.group.push($el);
  }

  clear() {
    this.group.forEach((el) => el.removeClass(TableSelection.className));
    this.group = [];
  }

  selectGroup() {

  }
}
