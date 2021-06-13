import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../Models/LoginUser';
import {Usuario} from '../Models/Models';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ApiInterfaceService} from '../services/api-interface.service';
import {Cliente} from "../Models/Cliente";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Componente para iniciar sesion
 */
export class LoginComponent implements OnInit {

  loginData = new Cliente();
  loginError = false;

  /**
   * Constructor
   * @param router servicio
   * @param apiInterfaceService servicio
   * @param activatedRoute servicio
   * @param cookieService servicio
   */
  constructor(private router: Router, private apiInterfaceService: ApiInterfaceService,
              public activatedRoute: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  /**
   * Metodo para intentar iniciar sesion
   */
  onSubmit(): void{
    this.cookieService.set('email', this.loginData.correo);
    this.cookieService.set('password', this.loginData.password);
    this.apiInterfaceService.login().subscribe(
       sucess => {
             this.apiInterfaceService.getUser().subscribe(data=>{
               this.cookieService.set('cedula', data.cedula)
               this.router.navigate(['/calendar'])
             }, e=>console.log(e));},

         error => {this.loginError = true; console.log(error)}
    );
  }
  /**
   * Metodo para cerrar el mensaje de error
   */
  closeError(): void {
    this.loginError = false;
  }
}
