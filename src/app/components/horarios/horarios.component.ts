import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
    
    var btns = document.getElementsByClassName("btnA");
    
for (var i = 0; i < btns.length; i++) {
  
  btns[i].addEventListener("click", function() {
 // var current = document.getElementsByClassName("active");
  //current[0].className = current[0].className.replace(" active", "");
    this.classList.toggle("active");
   // this.className += " active";

  });
}
  }

}
