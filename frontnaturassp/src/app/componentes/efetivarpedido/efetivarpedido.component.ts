import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { EnderecoCep } from 'src/app/model/EnderecoCep';
import { Pedido } from 'src/app/model/Pedido';
import { BuscarcepService } from 'src/app/servicos/buscarcep.service';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-efetivarpedido',
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {
  public cliente: Cliente;
  public achou: boolean;
  public visivel: boolean;
  public pedido: Pedido;
  public mensagemErro: string;
  public msgEndereco: string;
  public exibirPerguntaEndereco: boolean;
  public exibirFormEndereco: boolean;

constructor(private cliService: ClienteService, 
            private pedService: PedidoService,
            private cepService: BuscarcepService,
            private carService: CarrinhoService,
            private router: Router) { 
    this.cliente = new Cliente();
    this.pedido = new Pedido();
    this.achou = false;
    this.visivel = false;
    this.msgEndereco = "";
    this.exibirFormEndereco = false;
    this.exibirPerguntaEndereco = true;
  }

  ngOnInit(): void {
  }

  public exibirForm(){
    this.exibirPerguntaEndereco = false;
    this.exibirFormEndereco = true;
    this.cliente.cep = "";
    this.cliente.logradouro = "";
    this.cliente.numero = "";
    this.cliente.complemento = "";
    this.cliente.cidade = "";
    this.cliente.bairro = "";
    this.cliente.estado = "";
  }

  public ocultarForm(){
    this.exibirPerguntaEndereco = false;
    this.exibirFormEndereco = false;
  }


  public isCpfValid(): boolean{
    if(!this.cliente.cpf || this.cliente.cpf.length == 0){
      
      return false;
    }

    let cpf = this.cliente.cpf.trim().replace(".","").replace(".","").replace("-","");
    console.log(cpf);

    //Atribuir o cpf desformatado para o cpf do cliente
    this.cliente.cpf = cpf;
    let digitos: number[] = cpf.split("").map(i=> +i);
    
    console.log(digitos);
    if( cpf=="11111111111" || cpf=="22222222222" || cpf=="33333333333" || cpf=="44444444444" || cpf=="55555555555" || 
       cpf=="66666666666" || cpf=="77777777777" || cpf=="88888888888" || cpf=="99999999999"){
        return false;
    }

    let digito1 = digitos[0]*10 + digitos[1]*9 + digitos[2]*8 + digitos[3]*7 + digitos[4]*6 + digitos[5]*5 +
                  digitos[6]*4 + digitos[7]*3 + digitos[8]*2;
    
    let d1: number = 11 - digito1 % 11;
    
    if(d1 >= 10){ //regra se o número for >= 0
      d1 = 0;
    }

    if(d1 != digitos[9]){ //primeiro digito não confere
      return false;
    }
  
    let digito2 = digitos[0]*11 + digitos[1]*10 + digitos[2]*9 + digitos[3]*8 + digitos[4]*7 + digitos[5]*6 +
    digitos[6]*5 + digitos[7]*4 + digitos[8]*3 + digitos[9]*2;
    
    let d2: number = 11 - digito2 % 11;

    if(d2 >= 10){ //regra para se o digito 2 for maior ou igual a 10
      d2 = 0;
    }
    if(d2 != digitos[10]){
      return false;
    }
    else{
      return true;
    }
  }

 public buscarCpf(){
    if(!this.isCpfValid()){
      this.mensagemErro = "CPF informado é invalido."
      document.getElementById("btnModal").click();
      return;
    }
    this.cliService.buscarClientePeloCpf(this.cliente.cpf)
      .subscribe((cli: Cliente) =>{
        this.cliente = cli;
        this.achou = true;
        this.msgEndereco = cli.logradouro.substring(0, 12)+"*********";
        console.log(this.cliente);
        this.visivel=true;
      },
      (err) => {
        if(err.status == 404){
          //deu certo, mas a pesquisa não encontrou o cliente com esse telefone - é novo cliente
          this.achou = false;
          this.visivel = true;
          this.cliente.nome = "";
          this.cliente.bairro = "";
          this.cliente.cep = "";
          this.cliente.cidade = "";
          this.cliente.email = "";
          this.cliente.telefone = "";
          this.cliente.estado = "";
          this.cliente.numero = "";
          this.cliente.logradouro = "";
          this.cliente.complemento = "";
        }
        else{
          alert("Erro desconhecido: "+err);
        }
      })
  }

  public ocultaAlert(){
    this.achou = true;
  }

  public buscarCep(){
    this.cepService.buscarCep(this.cliente.cep).subscribe
      ((res: EnderecoCep) => {
        this.cliente.logradouro = res.logradouro;
        this.cliente.cidade = res.localidade;
        this.cliente.bairro = res.bairro;
        this.cliente.estado = res.uf
      },
      (err) => {
        console.log()
        this.mensagemErro = "Informe um CEP existente, sem pontos nem traços."
      document.getElementById("btnModal").click();
      }
      );

  }

  public finalizarPedido(){
    let pedidoTmp: Pedido;
    pedidoTmp = JSON.parse(localStorage.getItem("LeetirCarrinho"));
    this.pedido.itensPedido = pedidoTmp.itensPedido;
    this.pedido.valorTotal = pedidoTmp.valorTotal;
    this.pedido.cliente = this.cliente;
    this.pedido.status = 0; //pedido inicial

    console.log(this.pedido);

    this.pedService.inserirNovoPedido(this.pedido).subscribe(
      (res: Pedido) => {
        //alert("Pedido efetivado - número: "+res.idPedido);
        localStorage.removeItem("LeetirCarrinho");
        this.carService.getNumberOfItens().next(0);
        this.router.navigate(["/recibo/", res.idPedido]);
      },
      (err) => {
        alert("Não consegui efetivar seu pedido. Desculpe!");
      }
    );
  }

}
