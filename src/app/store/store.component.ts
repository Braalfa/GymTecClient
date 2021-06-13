import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {LabelType, NgxSliderModule, Options} from '@angular-slider/ngx-slider';
import {ActivityDialogComponent} from '../activity-dialog/activity-dialog.component';
import {SuccessDialogComponent} from '../success-dialog/success-dialog.component';
import {FailDialogComponent} from '../fail-dialog/fail-dialog.component';
import {CookieService} from 'ngx-cookie-service';
import {ApiInterfaceService} from '../services/api-interface.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Usuario} from '../Models/Models';
import {Router} from '@angular/router';
import {Clase} from "../Models/Clase";
import {PopupTypeEnum} from "../Enums/popup-type.enum";
import {Sucursal} from "../Models/Sucursal";
import {Tipo} from "../Models/Tipo";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
/**
 * Componenete tienda que muestra los productos y permite iniciar su compra
 */
export class StoreComponent implements OnInit{
  popUpTypeEnum = PopupTypeEnum;
  tipos: string[];
  sucursales: string[];
  filteredTipos: string[];
  selectedTipos: boolean[];
  filteredSucursales: string[];
  selectedSucursales: boolean[];
  minDate:any;
  maxDate:any;
  clases: Clase[];
  classToOrder: Clase;
  @ViewChild(ActivityDialogComponent) confirmDialogComponent: ActivityDialogComponent;
  @ViewChild(SuccessDialogComponent) successDialogComponent: SuccessDialogComponent;
  @ViewChild(FailDialogComponent) failDialogComponent: FailDialogComponent;
  @ViewChild(NgxSliderModule) slide: NgxSliderModule;

  window = window;
  user: Usuario;
  errorMsg: string;
  errorMsgHeader: string;

  /**
   * Constructor de la calse
   * @param cookieService CookieService
   * @param apiInterfaceService Interfaz de comunicacion con el api
   * @param router Router de navegacion
   * @param elementRef Instrumento para usar elementos dom
   */
  constructor(private cookieService: CookieService, private apiInterfaceService: ApiInterfaceService,
              private router: Router, private elementRef: ElementRef) {}

  /**
   * Método para cargar los elementos a la tienda al iniciar
   */
  ngOnInit(): void {
/*
    this.clases = [{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
                    horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},
      {fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},
      {fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'},{fecha:new Date(),modalidad: 'sa',sucursal: '1', instructor: 'juan', horafinalizacion:3,
        horainicio: 0, tipo: 'Yoga', imagen:'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/yoga.jpg'}]
*/
/*
    this.sucursales = ['1','todas']
    this.tipos = ['Yoga', 'todas']
*/
    this.minDate= {year: 2010, month: 2, day:20};
    this.maxDate= {year: 2023, month: 2, day:20};

    this.cookieService.get('email')
    this.cookieService.get('password')
    // this.apiInterfaceService.getUserData().subscribe(
    //   data => {this.user = data;},
    //   error => this.handleError(error)
    // );
    this.apiInterfaceService.getTipos().subscribe(
      data => {
        this.tipos = data.map(d=>d.tipo);
        this.selectedTipos = this.tipos.map(u=>true);
        this.filteredTipos = this.tipos;
        this.apiInterfaceService.getSucursales().subscribe(
          data => {this.sucursales = data.map(d=>d.Nombre);
            this.selectedSucursales = this.sucursales.map(u=>true);
            this.filteredSucursales = this.sucursales;
            this.updateClases()},
          error => {this.handleError(error);console.log(error);}
        );},
      error => {this.handleError(error);console.log(error);}
    );
  }
  /**
   * Metodo para recargar los dispositivos del api
   */
  updateClases(): void{
    this.apiInterfaceService.getClasesFiltered(this.filteredSucursales, this.filteredTipos, this.minDate, this.maxDate).subscribe(
      data => {this.clases = data;
                    this.clases.forEach(c=>{c.DatetimeFinal = new Date(c.DatetimeFinal);
                     c.DatetimeInicio = new Date(c.DatetimeInicio)})
                     console.log(this.clases)},
      error => {this.handleError(error);console.log(error)}
    );
  }



  /**
   * Método para filtrar los tipos seleccionados
   * @param i Tipo en el que se hizo click
   */
  tipoSelected(i): void{
    this.selectedTipos[i] = !this.selectedTipos[i];
    this.filteredTipos = this.tipos.filter((d, ind) => this.selectedTipos[ind]);
    this.updateClases()
  }

  /**
   * Método para filtrar las sucursales seleccionadas
   * @param i Tipo en el que se hizo click
   */
  sucursalSelected(i): void{
    this.selectedSucursales[i] = !this.selectedSucursales[i];
    this.filteredSucursales = this.sucursales.filter((d, ind) => this.selectedSucursales[ind]);
    this.updateClases()
  }

  /**
   * Método para iniciar la compra del i-esimo producto
   * @param i Numero del producto en pantalla
   */
  order(i): void {
    console.log(this.minDate)
    this.classToOrder = this.clases[i];
    this.confirmDialogComponent.openModal(this.classToOrder);
  }

  /**
   * Método que llama al api al confirmar la compra
   * @param confirm Booleano que indica si se confirma la compra
   */
  confirmOrder(confirm): void{
    if (confirm) {
      console.log("ordering")
      console.log(this.classToOrder.Identificador)
      this.apiInterfaceService.postRegistro(this.classToOrder.Identificador).subscribe(
        success => {
              this.successDialogComponent.openModal();
              console.log(success);
              this.updateClases(); },
            fail => {
              this.errorMsgHeader = 'Error - El registro no se procesó';
              this.errorMsg = 'Verifique su conexión e intente realizar el registro nuevamente. Si el problema persiste, contacte al administrador.';
              this.failDialogComponent.openModal();
              console.log(fail);
              this.updateClases();
            }
      )

    }else{
      this.classToOrder = undefined;
    }
  }

  /**
   * Método para comunicar los errores http al usuario
   * @param errorResponse Error http
   */
  handleError(errorResponse: HttpErrorResponse): void {
    console.log(errorResponse.status);
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
