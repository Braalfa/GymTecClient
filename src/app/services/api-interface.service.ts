import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Dispositivo,
  Dispositivo_Tipo,
  NuevoPedido,
  Region,
  TipoDispositivo,
  UsoDiario,
  UsoDispositivo,
  UsoTipo,
  Usuario
} from '../Models/Models';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Cliente} from "../Models/Cliente";
import {Clase} from "../Models/Clase";
import {Sucursal} from "../Models/Sucursal";
import {Tipo} from "../Models/Tipo";

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio de comunicación con el api
 */
export class ApiInterfaceService {

  apiMongo = 'https://webapitecmongo.azurewebsites.net/';
  apiSQL = 'https://webapigymtecsql.azurewebsites.net/';
  /**
   * Constructor del servicio
   * @param httpClient Servicio http
   * @param cookieService Servicio de cookies
   */
  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  /**
   * Método para iniciar sesion
   */
  getUser(): Observable<Cliente>{
    const email = this.cookieService.get('email');
    return this.httpClient.get<Cliente>(this.apiMongo + 'api/clientes/'+email);
  }

  /**
   * Método para iniciar sesion
   */
  login(): Observable<any>{
    return this.httpClient.post<Usuario>(this.apiMongo + 'api/clientes/login',
      {correo: this.cookieService.get('email'), password: this.cookieService.get('password')}
      );
  }

  /**
   * Metodo para registrar un usuario
   * @param user usuario a registrar
   */
  register(user: any): Observable<any>{
    let userCopy = JSON.parse(JSON.stringify(user))
    userCopy.fechanacimiento = new Date(user.fechanacimiento.year, user.fechanacimiento.month, user.fechanacimiento.day)
    console.log(userCopy)
    return this.httpClient.post<Usuario>(this.apiMongo + 'api/clientes', userCopy);
  }

  /**
   * Metodo para obtener los dispositivos disponibles
   */
  getClasesFiltered(sucursales:string[], tipos: string[], minDate: any, maxDate: any): Observable<Clase[]>{
    const cedula = this.cookieService.get("cedula");
    console.log(JSON.stringify(
      { cedula: cedula,
        sucursales:sucursales,
        tipos: tipos,
        minDate: new Date(minDate.year,minDate.month, minDate.day),
        maxDate: new Date(maxDate.year,maxDate.month, maxDate.day)
      }))
    return this.httpClient.post<Clase[]>(this.apiSQL + 'api/clasefiltro',
      { cedula: cedula,
              sucursales:sucursales,
              tipos: tipos,
              minDate: new Date(minDate.year,minDate.month, minDate.day),
              maxDate: new Date(maxDate.year,maxDate.month, maxDate.day)
      });
  }

  /**
   * Metodo para obtener los dispositivos disponibles
   */
  getClases(): Observable<Clase[]>{
    const email = this.cookieService.get('email');
    return this.httpClient.get<Clase[]>(this.apiSQL + 'api/clases');
  }

  /**
   * Metodo para obtener los dispositivos disponibles
   */
  getClasesCliente(): Observable<Clase[]>{
    const cedula = this.cookieService.get('cedula');
    return this.httpClient.get<Clase[]>(this.apiSQL + 'api/clientes/'+cedula+'/clases');
  }

  /**
   * Metodo para obtener los tipos de clases
   */
  getTipos(): Observable<Tipo[]>{
    return this.httpClient.get<Tipo[]>(this.apiSQL + 'api/TIPOS_CLASE');
  }
  /**
   * Metodo para obtener las sucursales
   */
  getSucursales(): Observable<Sucursal[]>{
    return this.httpClient.get<Sucursal[]>(this.apiSQL + 'api/sucursal');
  }

  postRegistro(claseIdentificador: number): Observable<any>{
    const cedula = this.cookieService.get('cedula');
    return this.httpClient.post<any>(this.apiSQL + 'api/clientes/'+cedula+'/clase/'+claseIdentificador,null);
  }
}

