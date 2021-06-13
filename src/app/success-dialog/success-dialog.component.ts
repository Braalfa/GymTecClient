import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Device} from '../Models/Device';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
/**
 * Componente para mostrar un mensaje de exito
 */
export class SuccessDialogComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() header: string;
  @Input() subheader: string;
  @Input() message: string;
  @ViewChild('succesDialog') succesDialog: TemplateRef<any>;

  /**
   * Constructor
   * @param modalService servicio
   */
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void{
  }

  /**
   * Metodo para abrir el componente
   */
  openModal(): void {
    this.modalRef = this.modalService.show(this.succesDialog, {class: 'modal-sm'});
  }

  /**
   * Metodo para cerrar el componente
   */
  closeModal(): void{
    this.modalRef.hide();
  }

}
