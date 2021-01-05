import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers = () => {
    return this.http.get('https://island-nettle-hockey.glitch.me/users');
  }

  addUser = (name: string) => {
    let data = { 'name': name };
    return this.http.post('https://island-nettle-hockey.glitch.me/users', data);
  }

  deleteUser = (name: string) => {
    // Delete parameters meegeven onder 'options' > 'params'
    let options = {
      'params': { 'name': name }
    };
    return this.http.delete(
      'https://island-nettle-hockey.glitch.me/users', options
    );
  }
}
