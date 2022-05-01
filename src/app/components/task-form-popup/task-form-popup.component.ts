import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-form-popup',
  templateUrl: './task-form-popup.component.html',
  styleUrls: ['./task-form-popup.component.scss']
})
export class TaskFormPopupComponent implements OnInit {
    form: FormGroup = this.formBuilder.group({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    });

    @Output() popupClosed: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @Output() formValue: EventEmitter<{ name: string, description: string }> = new EventEmitter<{ name: string, description: string }>(undefined);
    @Input() name: string = '';

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
      this.form.get('name')?.patchValue(this.name);
  }

    closeModal(): void {
        this.popupClosed.emit(true);
    }

    save() {
      if (this.form.valid) {
          this.formValue.emit(this.form.value);
          this.closeModal();
      }
    }
}
