import { ChangeDetectorRef, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Fashion } from './classes/Fashion';

@Component({
  selector: 'app-fashion-workspace', standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fashion-workspace.html', styleUrl: './fashion-workspace.css'
})
export class FashionWorkspace {
  @ViewChild('editor') editor?: ElementRef<HTMLDivElement>;
  items = signal<Fashion[]>([]); error = signal(''); loading = signal(false); saving = signal(false);
  selected = signal<Fashion | null>(null); mode = signal('list');
  filter = ''; model = new Fashion(); admin = false;
  get styles() { return [...new Set(['Street Style', 'Trends', 'Classic', ...this.items().map(x => x.style)])]; }
  get groups() { return [...new Set(this.items().map(x => x.style))]; }
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.route.url.subscribe(() => {
      this.admin = this.route.snapshot.data['admin'] === true;
      const id = this.route.snapshot.paramMap.get('id');
      this.error.set(''); this.selected.set(null);
      if (id) {
        this.mode.set(this.route.snapshot.data['edit'] ? 'edit' : 'detail');
        this.http.get<Fashion>('/fashions/' + id).subscribe({ next: item => {
          this.model = Object.assign(new Fashion(), item); this.selected.set(this.model); this.cdr.markForCheck();
          setTimeout(() => { if (this.editor) this.editor.nativeElement.innerHTML = this.model.fashion_detail; });
        }, error: e => this.fail(e) });
      } else if (this.route.snapshot.data['new']) { this.model = new Fashion(); this.mode.set('edit'); }
      else { this.mode.set('list'); this.load(); }
    });
  }
  load() {
    this.loading.set(true); this.error.set('');
    this.http.get<Fashion[]>('/fashions', { params: this.filter.trim() ? { style: this.filter.trim() } : {} }).subscribe({
      next: data => { this.items.set(data.map(x => Object.assign(new Fashion(), x))); this.loading.set(false); },
      error: e => { this.fail(e); this.loading.set(false); }
    });
  }
  group(style: string) { return this.items().filter(x => x.style === style); }
  fail(e: any) {
    const connectionError = [0, 502, 504].includes(e.status);
    this.error.set(connectionError
      ? 'Không kết nối được API Fashion cổng 4000. Hãy khởi động lại bằng npm.cmd run start:client trong thư mục my-app và giữ terminal mở.'
      : e.error?.message || e.message || 'Có lỗi xảy ra.');
  }
  remove(item: Fashion) {
    if (!confirm('Bạn có chắc muốn xóa "' + item.fashion_subject + '"?')) return;
    this.http.delete('/fashions/' + item._id).subscribe({ next: () => this.load(), error: e => this.fail(e) });
  }
  command(name: string, value?: string) { this.editor?.nativeElement.focus(); document.execCommand(name, false, value); }
  insertImage() {
    const url = prompt('Nhập URL ảnh (https://...)');
    if (url && /^https?:\/\//i.test(url)) this.command('insertImage', url);
  }
  save() {
    this.model.fashion_detail = this.editor?.nativeElement.innerHTML || '';
    if (!this.model.fashion_subject.trim() || !this.model.style.trim() || !this.model.fashion_image.trim() || !this.editor?.nativeElement.textContent?.trim()) {
      this.error.set('Vui lòng nhập đủ tiêu đề, Style, ảnh và nội dung.'); return;
    }
    this.saving.set(true); this.error.set('');
    const request = this.model._id ? this.http.put('/fashions/' + this.model._id, this.model) : this.http.post('/fashions', this.model);
    request.subscribe({ next: () => { this.saving.set(false); this.router.navigateByUrl('/admin-fashion'); }, error: e => { this.fail(e); this.saving.set(false); } });
  }
}



