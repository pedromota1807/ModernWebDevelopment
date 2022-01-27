import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { EditorcategoriaComponent } from './componentes/editorcategoria/editorcategoria.component';
import { ProdutosComponent } from './componentes/produtos/produtos.component';
import { EditorprodutosComponent } from './componentes/editorprodutos/editorprodutos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { RelatoriosComponent } from './componentes/relatorios/relatorios.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    CategoriasComponent,
    EditorcategoriaComponent,
    ProdutosComponent,
    EditorprodutosComponent,
    PedidosComponent,
    ClientesComponent,
    RelatoriosComponent,
    UsuariosComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
