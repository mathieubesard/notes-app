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

  getNotes = (name: string) => {
    return this.http.get(`https://island-nettle-hockey.glitch.me/notes?name=${name}`);
  }

  addUser = (name: string) => {
    let data = { 'name': name };
    return this.http.post('https://island-nettle-hockey.glitch.me/users', data);
  }

  addNote = (name: string, content: string, category: string) => {
    let data = { 'name': name, 'content': content, 'category': category };
    return this.http.post('https://island-nettle-hockey.glitch.me/notes', data);
  }

  deleteUserWithoutNotes = (name: string) => {
    let options = {
      'params': { 'name': name }
    };
    return this.http.delete(
      'https://island-nettle-hockey.glitch.me/users', options
    );
  }

  deleteUser = (name: string) => {
    return this.http.get(
      `https://island-nettle-hockey.glitch.me/remove?name=${name}`
    );
  }

  deleteNote = (id: string) => {
    let options = {
      'params': { 'id': id }
    };
    return this.http.delete(
      'https://island-nettle-hockey.glitch.me/notes', options
    );
  }

  updateNote = (id: string, content: string, category: string) => {
    let data = { 'id': id,  'content': content, 'category': category};
    return this.http.put('https://island-nettle-hockey.glitch.me/notes', data);
  }
}
