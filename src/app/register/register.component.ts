import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {ApiInterfaceService} from '../services/api-interface.service';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';
import {FailDialogComponent} from '../fail-dialog/fail-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';
import {Cliente} from "../Models/Cliente";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * Componente de registro
 */
export class RegisterComponent implements OnInit {

  form = new Cliente();
  @Input() public editable: boolean;
  @ViewChild('profileForm') profileForm: ElementRef;
  sendAttempt = false;
  errorMsg: string;
  @ViewChild(SuccessDialogComponent) successDialogComponent: SuccessDialogComponent;
  @ViewChild(FailDialogComponent) failDialogComponent: FailDialogComponent;

  /**
   * Constructor del componente
   * @param apiInterfaceService Servicio de comunicacion con el api
   */
  constructor(private apiInterfaceService: ApiInterfaceService) {}

  /**
   * Metodo de inicio, inicializa los datos en null
   */
  ngOnInit(): void {
    this.sendAttempt = false;
  }

  /**
   * Metodo para enviar los datos de registro
   */
  register(): void{
    this.sendAttempt = true;
    console.log(this.form)
    if (this.profileForm.nativeElement.checkValidity()){
      this.apiInterfaceService.register(this.form).subscribe(
        data => this.successDialogComponent.openModal(),
        error => this.handleError(error)
      );
    }
  }

  /**
   * Metodo para mostrar mensajes de error
   * @param errorResponse tipo de error http
   */
  handleError(errorResponse: HttpErrorResponse): void {
    console.log(errorResponse);
    switch (errorResponse.status) {
      case 409:
        this.errorMsg = 'El correo o cedula indicados ya se encuentran registrados';
        break;
      case 400:
        this.errorMsg = 'Error desconocido';
        break;
      case 500:
        this.errorMsg = 'Error desconocido';
        break;
      case 0:
        this.errorMsg = 'No se pudo conectar con el Servidor';
        break;
      default:
        this.errorMsg = errorResponse.error;
        break;
    }
    this.failDialogComponent.openModal();
  }
}
