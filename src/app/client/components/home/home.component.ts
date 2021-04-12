import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts:any[];
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((data:any[])=>{
      console.log("get all post",data);
      this.posts=data;
    },
    error=>{
      console.log("Error 1"+error);
    });
  }

}
