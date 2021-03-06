import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { EditalService } from './edital.service';
import { Edital } from './edital';
import { Campus } from '../campus/campus';
import { Funcionario } from '../funcionario/funcionario';

@Component({
	selector: 'app-edital',
	templateUrl: './edital.component.html',
	styleUrls: ['./edital.component.css']
})
export class EditalComponent implements OnInit {

	private _name: string = null;
	private _editais: Edital[];

	displayedColumns: string[] = ['id', 'name', 'campi', 'edit'];
  	dataSource: MatTableDataSource<Edital>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private _service: EditalService, private dialog: MatDialog) { }

	rowClicked(row: any): void { console.log(row); }

	ngOnInit() { }

	search() {
		this.dataSource = new MatTableDataSource(this._editais);
		this._service.getEditalByName(this._name.trim().toLowerCase()).subscribe(result => this.dataSource.data = result);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	openDialog(): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			width: '500px',
			height: '450px',
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

	clear(): void {
		this._name = '';
		this.dataSource.data = [];
	}
}

@Component({
	selector: 'app-dialog',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
	providers: [
		// The locale would typically be provided on the root module of your application. We do it at
		// the component level here, due to limitations of our example generation script.
		{provide: MAT_DATE_LOCALE, useValue: 'fr'},
	
		// `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
		// `MatMomentDateModule` in your applications root module. We provide it at the component level
		// here, due to limitations of our example generation script.
		{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
	  ],
})

export class ModalComponent {

	// /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
	private _expression: string = `[A-Za-z 'çÂãÕõáéíóúâêîôû]*`;
	private _error: any;
	private _edital: Edital;
	private _campus: Campus[];
	private _funcionarios: Funcionario[];

	private _options: string[] = ['Aula de reposição', 'Refeições'];

	constructor(private _service: EditalService, 
				public dialogRef: MatDialogRef<ModalComponent>, 
				@Inject(MAT_DIALOG_DATA) public data: Edital,
				public snackBar: MatSnackBar, private adapter: DateAdapter<any>) {
		this._service.getCampus().subscribe(result => this._campus = result);
		this._service.getFuncionarios().subscribe(result => this._funcionarios = result);
	}

	onSubmit(form): void {
		if (form.form.status == "VALID") {
			this._service.add(form.form.value.edital)
				.subscribe(result => this._edital = result, error => this._error = error);
			this.snackBar.open('Salvo com sucesso!', 'Fechar', { duration: 200000, panelClass: 'red' });
		} else {
			this.snackBar.open('Erro ao salvar', 'Fechar', { duration: 2000, panelClass: '' });
		}
	}

	close(): void { this.dialogRef.close(); }
}