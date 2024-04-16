import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[ngLoading]'
})
export class LoaderDirective implements OnChanges {
    @Input('ngLoading') drloader: boolean = false;
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        if (this.drloader) {
            const div = this.renderer.createElement('div');
            this.renderer.addClass(div, 'se-pre-parent');
            const ispan: Element = this.renderer.createElement('div');
            this.renderer.addClass(ispan, 'se-pre-con');

            this.el.nativeElement.parentElement.classList.add('positionReletive');
            this.renderer.appendChild(this.el.nativeElement, div);

        } else {
            Array.from(this.el.nativeElement.children).forEach((child: any) => {
                if (child['className'] === 'se-pre-parent') {
                    this.renderer.removeChild(this.el.nativeElement, child);
                }
            });
        }
    }
}  