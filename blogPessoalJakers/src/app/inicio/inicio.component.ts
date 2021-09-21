import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  idTema: number
  listaTemas: Tema[]

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }
    this.buscarPorTema()
    this.buscarPorPostagens()
  }
  buscarPorTema() {
    this.temaService.buscarPorTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    }
    )
  }
  buscarPorIdTema() {
    this.temaService.buscarPorIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    }
    )

  }
  buscarPorPostagens() {

    this.postagemService.buscarPorPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }
  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.criarPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso!!')
      this.postagem = new Postagem
      this.buscarPorPostagens()
    }
    )
  }
}
