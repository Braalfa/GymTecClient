import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Usuario} from '../Models/Models';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase que maneja un usuario
 */
export class UserService {

  private userSource = new BehaviorSubject(new Usuario());
  currentUser = this.userSource.asObservable();

  constructor() {}

  /**
   * Actualizar el usuario guardado
   * @param user nuevo usuario
   */
  setUser(user: Usuario): void{
    this.userSource.next(user);
  }
}
