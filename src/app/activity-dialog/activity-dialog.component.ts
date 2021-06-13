import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Device} from '../Models/Device';
import {Dispositivo_Tipo} from '../Models/Models';
import {Clase} from "../Models/Clase";
import {PopupTypeEnum} from "../Enums/popup-type.enum";

@Component({
  selector: 'app-activity-dialog',
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.css']
})
/**
 * Componente para confirmar una compra
 */
export class ActivityDialogComponent implements OnInit{

  clase: Clase;
  modalRef: BsModalRef;
  popUpTypeEnum = PopupTypeEnum;
  @Output() eventEmitter = new EventEmitter<boolean>();
  @Input() type: PopupTypeEnum;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;

  /**
   * Metodo constructor
   * @param modalService Servicio
   */
  constructor(private modalService: BsModalService) {}
  ngOnInit(): void{
  }

  /**
   * Metodo para abrir el dialogo de compra
   * @param clase
   */
  openModal(clase: Clase): void {
    this.modalRef = this.modalService.show(this.confirmDialog, {class: 'modal-md'});
    this.clase = clase;
  }

  /**
   * Metodo al confirmar la compra
   * @param invalid booleano que indica si no son validos los datos
   */
  confirm(): void {
    this.eventEmitter.emit(true);
    this.hide();
  }

  /**
   * Metodo para cancelar
   */
  decline(): void {
    this.eventEmitter.emit(false);
    this.hide();
  }

  /**
   * Metodo para ocultar el dialogo
   */
  hide(): void{
    this.modalRef.hide();
  }

}
