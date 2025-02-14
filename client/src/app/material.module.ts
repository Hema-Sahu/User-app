import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCardModule,
    MatDialogModule, 
    MatInputModule,
    MatListModule,
    MatMenuModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NgxMatFileInputModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule, 
    MatCardModule,
    MatDialogModule, 
    MatInputModule,
    MatListModule, 
    MatIconModule, 
    MatMenuModule,
    MatSidenavModule, 
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NgxMatFileInputModule,
    MatTableModule
  ]
})
export class MaterialModule { }