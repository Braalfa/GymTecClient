import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, ElementRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {Clase} from "../../Models/Clase";
import {ActivityDialogComponent} from "../../activity-dialog/activity-dialog.component";
import {PopupTypeEnum} from "../../Enums/popup-type.enum";
import {ApiInterfaceService} from "../../services/api-interface.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FailDialogComponent} from "../../fail-dialog/fail-dialog.component";
import {Router} from "@angular/router";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent  {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild(ActivityDialogComponent) confirmDialogComponent: ActivityDialogComponent;
  @ViewChild(FailDialogComponent) failDialogComponent: FailDialogComponent;

  popUpTypeEnum = PopupTypeEnum;
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  clases: Clase[];
  errorMsg: string;
  errorMsgHeader: string;

  constructor(private modal: NgbModal, private apiInterfaceService: ApiInterfaceService,
              private router: Router, private elementRef: ElementRef) {
    this.apiInterfaceService.getClasesCliente().subscribe(
      data => {
        this.clases = data;
        console.log(this.clases);
        this.clases.forEach(c=>{c.DatetimeFinal = new Date(c.DatetimeFinal);
                                c.DatetimeInicio = new Date(c.DatetimeInicio)})
        this.clases.forEach((c,i) => this.addClase(c,i));
        this.refresh.next();
      },
      error => {this.handleError(error);console.log(error);}
    );
    // this.clases = [{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
    //   horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg', id:"1", cupodisponible:0}]
    console.log(this.clases)
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
   // this.modalData = { event, action };
   // this.modal.open(this.modalContent, { size: 'lg' });
    this.confirmDialogComponent.openModal(this.clases[event.id]);
  }

  addClase(clase: Clase, pos: number): void {
    this.events = [
      ...this.events,
      {
        title: 'Clase de ' + clase.Tipo,
        id: pos,
        start: clase.DatetimeInicio,
        end: clase.DatetimeFinal,
        color: colors.red
      },
    ];
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  /**
   * Método para comunicar los errores http al usuario
   * @param errorResponse Error http
   */
  handleError(errorResponse: HttpErrorResponse): void {
    console.log(errorResponse);
    this.errorMsgHeader = 'Error';
    switch (errorResponse.status) {
      case 0:
        this.errorMsg = 'No se pudo conectar con el Servidor';
        break;
      default:
        this.errorMsg = 'Error desconocido';
        break;
    }
    const element = this.elementRef.nativeElement;

    /**
     * Método para evitar enviar mensajes si el componente no es visible
     */
    if (element.offsetParent !== null) {
      // element is  visible
      this.failDialogComponent.openModal();
    }
  }

}
