import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTailwindStyledTable]',
})
export class TailwindStyledTableDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.addClasses();
  }

  private addClasses(): void {
    const table: HTMLElement = this.el.nativeElement;

    // Táblázat fő osztályai
    const tableClasses: string[] = [
      'min-w-full',
      'divide-y',
      'divide-gray-200',
      'dark:divide-gray-700'
    ];
    tableClasses.forEach(cls => this.renderer.addClass(table, cls));

    // THEAD stílusok
    const thead: HTMLTableSectionElement | null = table.querySelector('thead');
    if (thead) {
      this.renderer.addClass(thead, 'bg-gray-50');
      this.renderer.addClass(thead, 'dark:bg-gray-700');
    }

    // TH cellák stílusai
    const ths: NodeListOf<HTMLElement> = table.querySelectorAll('th');
    ths.forEach((th: HTMLElement) => {
      const classes: string[] = [
        'px-6',
        'py-3',
        'text-left',
        'text-sm',
        'font-semibold',
        'text-gray-600',
        'dark:text-gray-300'
      ];
      classes.forEach(cls => this.renderer.addClass(th, cls));
    });

    // TBODY stílusok
    const tbody: HTMLTableSectionElement | null = table.querySelector('tbody');
    if (tbody) {
      const bodyClasses: string[] = [
        'bg-white',
        'dark:bg-gray-800',
        'divide-y',
        'divide-gray-100',
        'dark:divide-gray-700'
      ];
      bodyClasses.forEach(cls => this.renderer.addClass(tbody, cls));
    }

    // TD cellák stílusai
    const tds: NodeListOf<HTMLElement> = table.querySelectorAll('td');
    tds.forEach((td: HTMLElement) => {
      const classes: string[] = [
        'px-6',
        'py-3',
        'text-sm'
      ];
      classes.forEach(cls => this.renderer.addClass(td, cls));
    });
  }
}
