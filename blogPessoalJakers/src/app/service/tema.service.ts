import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  buscarPorTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://blogpessoaljakers.herokuapp.com/tema', this.token)
  }
  buscarPorIdTema(id: number):Observable<Tema>{
    return this.http.get<Tema>(`https://blogpessoaljakers.herokuapp.com/tema/${id}`, this.token)
  }
  criarTema(tema:Tema): Observable<Tema>{
    return this.http.post<Tema>('https://blogpessoaljakers.herokuapp.com/tema/criar',tema,this.token)
  }
  salvarTema(tema:Tema):Observable<Tema>{
    return this.http.put<Tema>('https://blogpessoaljakers.herokuapp.com/tema/salvar',tema,this.token)
  }
  deletarTema(id:number){
    return this.http.delete(`https://blogpessoaljakers.herokuapp.com/tema/${id}`,this.token)
  }
}
