import { Component, Input } from "@angular/core";
import { HelpersService } from "../../../_services/helpers.service";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"],
})
export class FileUploaderComponent {
  @Input() icon = "";
  @Input() label = "";
  @Input() control = {
    errors: {} as any,
  } as any;
  @Input() field;
  @Input() error = "" as string;

  constructor(public helpers: HelpersService) { }

  async setFile(event: any): Promise<void> {
    this.control.setValue(event.target.files[0]);
  }

  async toBase64(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  async downloadFile(): Promise<void> {
    if (this.control.value.url) {
      const link = document.createElement("a");
      link.setAttribute("target", "_blank");
      link.setAttribute("href", this.control.value.url);
      link.click();
      return;
    }

    const file: any = await this.toBase64(this.control.value);

    if (file && file.startsWith("data:image")) {
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.width = "100%";
      container.style.height = "100%";
      container.style.background = "transparent";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      container.style.display = "flex";

      const transparentContainer = document.createElement("div");
      transparentContainer.style.width = "100%";
      transparentContainer.style.height = "100%";
      transparentContainer.style.alignItems = "center";
      transparentContainer.style.justifyContent = "center";
      transparentContainer.style.display = "flex";
      transparentContainer.style.background = "#000";
      transparentContainer.style.opacity = ".7";

      const link = document.createElement("div");
      link.setAttribute("target", "_blank");

      link.style.maxWidth = "80%";
      link.style.maxHeight = "600px";
      link.style.backgroundColor = "#fff";
      link.style.padding = "5px";
      link.style.position = "absolute";
      link.style.zIndex = "12";

      const image = document.createElement("img");
      image.setAttribute("src", file);
      image.style.maxWidth = "100%";
      image.style.maxHeight = "100%";

      const icon = document.createElement("span");
      icon.innerHTML = "x";
      icon.style.position = "absolute";
      icon.style.top = "-12px";
      icon.style.right = "-12px";
      icon.style.zIndex = "35";
      icon.style.cursor = "pointer";
      icon.style.padding = "5px";
      icon.style.background = "#fff";
      icon.style.border = "1px solid #797979";
      icon.style.borderRadius = "50%";
      icon.style.width = "30px";
      icon.style.height = "30px";
      icon.style.alignItems = "center";
      icon.style.justifyContent = "center";
      icon.style.display = "flex";


      icon.addEventListener("click", () => {
        container.remove();
      });

      link.appendChild(icon);

      link.append(image);
      container.appendChild(link);
      container.appendChild(transparentContainer);
      document.body.append(container);
      return;
    }
  }

  selectFile(): void {
    document.getElementById("fileInput")?.click();
  }

  get value(): string {
    return this.control.value?.originalname || this.control.value?.name || "";
  }

  showErrors(): boolean {
    return (
      !!this.helpers.getErrors(this.error, this.control) &&
      this.control.touched &&
      this.control.invalid
    );
  }
}
