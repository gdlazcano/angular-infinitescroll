import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-add-entry",
  templateUrl: "./add-entry.component.html",
  styleUrls: ["./add-entry.component.css"],
})
export class AddEntryComponent implements OnInit {
  constructor(private http: HttpClient) {}

  active = false;

  entryForm = new FormGroup({
    title: new FormControl("", Validators.required),
    review: new FormControl("", Validators.required),
    image: new FormControl("", Validators.required),
    score: new FormControl("", [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
  });

  ngOnInit() {}

  toggleActive() {
    this.active = !this.active;
  }

  onSubmit() {
    this.http
      .post("http://localhost:8080/review", this.entryForm.value)
      .subscribe((res) => {
        this.entryForm.reset();
        window.location.reload();
      });
  }
}
