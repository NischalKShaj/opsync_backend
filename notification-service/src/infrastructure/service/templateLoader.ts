// file to load the template for the otp purpose of sending the otp via mail

// importing the required modules
import fs from "fs";
import path from "path";

export function loadTemplate(type: string, otp: string) {
  const filePath = path.join(__dirname, "../templates", `otp-${type}.html`);

  let html = fs.readFileSync(filePath, "utf8");
  html = html.replace("{{OTP}}", otp);

  return html;
}
