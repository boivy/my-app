import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  sayHello() {
    alert('hello from contact component');
  }
sayHello2(mydiv:HTMLElement)
{
  mydiv.innerHTML="Nguyen Thi Long Lanh";
}
}

