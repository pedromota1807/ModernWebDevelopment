import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public listaLetras!: string[];
  public keyword!: string;

  constructor() { 
    let letra = "A";
    this.listaLetras = [];
    for(let i=0; i<26; i++){
      letra = String.fromCharCode(65+i);
      this.listaLetras.push(letra);
    }
  }

  ngOnInit(): void {
  }

}
