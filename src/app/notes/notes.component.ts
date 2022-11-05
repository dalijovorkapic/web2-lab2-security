import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  xssRanjivost:boolean = false;
  note:string = "";
  imageUrls: string[] = [
    "https://images.freeimages.com/images/large-previews/b88/chicken-1640535.jpg",
    "https://images.freeimages.com/images/large-previews/3c0/cat-yoga-2-1640068.jpg",
  ];
  safeImageUrls: SafeUrl[] = [];

  constructor(public router:Router, private authService: AuthService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.note = "";
    this.xssRanjivost = this.authService.xssRanjivost;
    this.imageUrls.forEach(url => {
      this.safeImageUrls.push(this.setSafeUrl(url));
    })
    
  }

  setSafeUrl(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  submitNote() {
    console.log(this.note)
    this.safeImageUrls.push(this.setSafeUrl(this.note));
    this.imageUrls.push(this.note);

    this.note = "";
  }

}
