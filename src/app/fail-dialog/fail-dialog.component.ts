import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-fail-dialog',
  templateUrl: './fail-dialog.component.html',
  styleUrls: ['./fail-dialog.component.css']
})
/**
 * Componente para mostrar mensaje de error
 */
export class FailDialogComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('failDialog') failDialog: TemplateRef<any>;
  @Input() header: string;
  @Input() message: string;

  /**
   * Constructor
   * @param modalService Servicio
   */
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void{
  }

  /**
   * Metodo para abir
   */
  openModal(): void {
    this.modalRef = this.modalService.show(this.failDialog, {class: 'modal-sm'});
  }

  /**
   * Metodo para cerrar
   */
  closeModal(): void{
    this.modalRef.hide();
  }
}
