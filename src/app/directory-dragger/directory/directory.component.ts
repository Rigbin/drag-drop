import { Component, Input, OnInit } from '@angular/core';
import { IDirectory } from 'src/helper/directory/directory';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  @Input() dir!: IDirectory;

  constructor() { }

  ngOnInit(): void { }
}
