import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface FormFields {
  type:string; 
  name: string; 
  label: string; 
  placeholder?: string; 
  options?: string[] | null; 
  validation: {
    required: boolean; 
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fields = [
    { type: 'text', label: 'Add Text' },
    { type: 'textarea', label: 'Add Textarea' },
    { type: 'dropdown', label: 'Add Dropdown' },
    { type: 'checkbox', label: 'Add Checkbox' },
    { type: 'radio', label: 'Add Radio' },
  ];
  formFields: FormFields[] = [];
  dynamicForm = new FormGroup({});

  addField(type: string) {
    const fieldName = type;
    const field = {
      type,
      name: fieldName,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: `Enter your ${type}`,
      options:type === 'dropdown' ? ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] : type === 'radio'? ['Male', 'Female'] : null,
      validation:{ required: true }
    };
    this.formFields.push(field);
    this.dynamicForm.addControl(fieldName,new FormControl('', field.validation.required ? [Validators.required] : null));
  }

  removeField(index: number) {
    const field = this.formFields[index];
    this.dynamicForm.removeControl(field.name);
    this.formFields.splice(index, 1);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form submitted:', this.dynamicForm.value);
      this.openPopup('success', 'Your form has been submitted successfully!');
      this.dynamicForm.reset();
      this.formFields = [];
    } else {
      Object.keys(this.dynamicForm.controls).forEach((controlName) => {
        this.dynamicForm.get(controlName)?.markAsTouched();
      });
    }
  }

  openPopup(type: SweetAlertIcon, message: string) {
    Swal.fire({
      icon: type,
      title: message,
      showConfirmButton: true,
    });
  }
}
