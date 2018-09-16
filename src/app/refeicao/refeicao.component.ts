import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Refeicao } from './Refeicao';
import { RefeicaoService } from './refeicao.service';
import { Campus } from '../campus/campus'

@Component({
	selector: 'app-refeicao',
	templateUrl: './refeicao.component.html',
	styleUrls: ['./refeicao.component.css']
})
export class RefeicaoComponent implements OnInit {

	private _name: string = null;
	private _refeicao: Refeicao[];

	displayedColumns: string[] = ['id', 'name', 'ativo', 'edit'];
	dataSource: MatTableDataSource<Refeicao>;

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private _service: RefeicaoService, private dialog: MatDialog) { }

	rowClicked(row: any): void { console.log(row); }

	ngOnInit() { }

	search() {
		this.dataSource = new MatTableDataSource(this._refeicao);
		this._service.getRefeicaoByName(this._name.trim().toLowerCase()).subscribe(result => this.dataSource.data = result);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	cadastrarFuncionarioDialog(): void {
		let dialogRef = this.dialog.open(ModalComponent, {
			width: '450px',
			height: '500px',
			data: {}
		});
	}

	limpar(): void {
		this._name = '';
		this.dataSource.data = [];
	}
}

@Component({
	selector: 'app-dialog1',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
})
export class ModalComponent {}