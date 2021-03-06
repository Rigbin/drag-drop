import { Component, OnInit } from '@angular/core';
import { db } from 'src/helper/db/db';
import { IBinaryFile } from 'src/helper/file/file';
import { DropService } from './drop-area/drop.service';

@Component({
  selector: 'app-file-dragger',
  templateUrl: './file-dragger.component.html',
  styleUrls: ['./file-dragger.component.scss']
})
export class FileDraggerComponent implements OnInit {
  public storedFiles: IBinaryFile[] = [];

  constructor(private dropService: DropService) { }

  ngOnInit(): void {
    this.dropService.current$.subscribe(file => (this.storedFiles = [file, ...this.storedFiles]));
    db.getFiles()
      .then(async files => {
        return Promise.all(files.map(async file => {
          await file.loadContent();
          return file;
        }));
      })
      .then(files => this.storedFiles = files)
      .then(_ => console.log(this.storedFiles));
  }


  public delete(file: IBinaryFile): void {
    db.deleteFile(file)
      .then(isDeleted => { if (isDeleted) { this.storedFiles = this.storedFiles.filter(f => f.name !== file.name); } })
      .catch(console.error);
  }
}
