import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnChanges, OnInit {
  @Input() review: any;
  stars: number[];
  editMode = false;

  editForm = new FormGroup({
    title: new FormControl("", Validators.required),
    content: new FormControl("", Validators.required),
    score: new FormControl("", [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.editForm.patchValue({
      title: this.review.title,
      content: this.review.content,
      score: this.review.score,
    });
  }

  ngOnChanges() {
    this.stars = Array(Math.floor(this.review.score))
      .fill(0)
      .map((x, i) => i);
  }

  handleDelete() {
    console.log(this.review.id);
    this.http
      .delete(`http://localhost:8080/review?id=${this.review.id}`)
      .subscribe((data) => {
        console.log(data);
        window.location.reload();
      });
  }

  handleEdit() {
    this.editMode = !this.editMode;
  }

  onSubmit() {
    console.log("submit");
    this.http
      .patch(`http://localhost:8080/review`, {
        id: this.review.id,
        review: this.editForm.value.content,
        score: this.editForm.value.score,
        title: this.editForm.value.title,
        image: this.review.image,
      })
      .subscribe((data) => {
        console.log(data);
        window.location.reload();
      });
  }
}
