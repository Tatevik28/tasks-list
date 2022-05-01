import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
    @Input() name: string = '';
    @Output() modalClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    constructor() {
    }

    ngOnInit(): void {
    }

    closeModal(): void {
        this.modalClosed.emit(true);
    }

    confirm(): void {
        this.confirmed.emit(true);
        this.modalClosed.emit(true);
    }

}
