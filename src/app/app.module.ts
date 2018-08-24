import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; // usar nos modulos que forem fazer request.
// HttpClientModule está em uso global

import { AppComponent } from './app.component';
import { Home } from './controllers/HomeControll';

import { LoginModule } from './login/login.module';
import { PanelModule } from './modules/Panel.module';
import { EditalModule } from './edital/edital.module';
import { CampusModule } from './campus/campus.module';
import { CursoModule } from './curso/curso.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { RefeicaoModule } from './refeicao/refeicao.module';

import { AppRouting } from './routes/app-routing.module';
import { MaterialAppModule } from './material.app.module';

@NgModule({
    declarations: [
        AppComponent,
        Home,
    ],
    imports: [
        BrowserModule,
        HttpClientModule, // usar nos modulos que forem fazer request
        LoginModule,
        PanelModule,
        EditalModule,
        CampusModule,
        CursoModule,
        FuncionarioModule,
        RefeicaoModule,
        AppRouting,
        BrowserAnimationsModule,
        MaterialAppModule
    ],
    providers: [  ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
