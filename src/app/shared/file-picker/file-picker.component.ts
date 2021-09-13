import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/core/notification.service';

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss'],
})
export class FilePickerComponent {
  @Input() file: File | null = null;

  @Output() fileChange = new EventEmitter<File | null>();
  @Output() uploadClick = new EventEmitter<void>();

  constructor(private readonly notificationService: NotificationService) {}

  selectFile(files: FileList | null): void {
    if (!files?.length) {
      this.removeFile();
      return;
    }

    const file = files.item(0) as File;

    if (!['text/csv', 'application/vnd.ms-excel'].includes(file.type)) {
      this.notificationService.showError(`File should be CSV format.`, 2000);
      this.removeFile();
      return;
    }

    this.fileChange.emit(file);
    this.file = file;
  }

  removeFile(): void {
    this.file = null;
    this.fileChange.emit(null);
  }
}
