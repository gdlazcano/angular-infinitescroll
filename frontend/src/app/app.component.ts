import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as AOS from "aos";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  allReviews;

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.loadInitReviews();
    AOS.init({
      once: true,
    });
  }

  loadInitReviews() {
    this.http.get("http://localhost:8080/reviews").subscribe((data) => {
      this.allReviews = data;
    });
  }

  onScroll() {
    console.log("scrolled");
    this.loadNextPost();
  }

  loadNextPost() {
    const offset = this.allReviews.length;

    this.http
      .get(`http://localhost:8080/reviews?offset=${offset}`)
      .subscribe((data: any[]) => {
        // filter if its already in the list
        console.log(data);

        this.allReviews = this.allReviews.concat(data);
      });
  }
}
