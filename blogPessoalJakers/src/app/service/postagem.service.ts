import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  buscarPorPostagem(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>('https://blogpessoaljakers.herokuapp.com/postagem',this.token)
  }
  criarPostagem(postagem: Postagem):Observable<Postagem>{
    return this.http.post<Postagem>('https://blogpessoaljakers.herokuapp.com/postagem/criar',postagem,this.token)
  }

}
