import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiInterfaceService} from '../services/api-interface.service';
import {Usuario} from '../Models/Models';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
/**
 * Componente principal dentro de la sesion de usuario
 */
export class MainComponent implements OnInit {

  @ViewChild('dropdown') dropdown: ElementRef;
  dropdownClicked = false;
  oldDropdownClicked = false;
  mainMenuClicked = false;
  user: Usuario;

  /**
   * Constructor del metodo
   * @param router servicio
   * @param cookieService servicio
   * @param apiInterfaceService
   */
  constructor(public router: Router, private cookieService: CookieService,
              private apiInterfaceService: ApiInterfaceService) {
  }

  /**
   * Metodo para cargar el email y verificar si cerrar sesion
   */
  ngOnInit(): void {
    const email = this.cookieService.get('email');
    console.log(email);
    if (email === 'undefined' || email === ''){
      this.router.navigate(['/login']);
    }
    this.apiInterfaceService.login().subscribe(
      sucess => this.router.navigate(['/calendar']),
      error => {console.log(error); this.handleError(error)}
    );
  }

  /**
   * Metodo para checkear si hubo click en el componenete
   */
  mainClick(): void{
    if (this.oldDropdownClicked){
      this.dropdownClicked = false;
    }else{
      this.oldDropdownClicked = true;
    }
  }

  /**
   * Metodo para actualizar el estado del click
   */
  onDropDownClick(): void{
    this.oldDropdownClicked = this.dropdownClicked;
    this.dropdownClicked = !this.dropdownClicked;
  }

  /**
   * Metodo para salir de la sesion
   */
  exit(): void{
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

  handleError(errorResponse: HttpErrorResponse): void {
    console.log(errorResponse.status);
    switch (errorResponse.status) {
      case 404:
       this.exit();
       break;
    }
  }
}

