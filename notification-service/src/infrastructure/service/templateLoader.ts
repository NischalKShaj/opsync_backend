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

export function loadWelcomeMailTemplate(
  email: string,
  password: string,
  username: string,
  organizationName: string,
) {
  const filePath = path.join(__dirname, "../templates", `welcome-mail.html`);

  let html = fs.readFileSync(filePath, "utf8");
  const replacements = {
    ORGANIZATION_NAME: organizationName,
    EMAIL: email,
    PASSWORD: password,
    USERNAME: username,
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return html;
}

export function loadAckMailTemplate(
  email: string,
  username: string,
  organizationName: string,
) {
  const filePath = path.join(
    __dirname,
    "../templates",
    `acknowledgement-mail.html`,
  );

  let html = fs.readFileSync(filePath, "utf8");
  const replacements = {
    ORGANIZATION_NAME: organizationName,
    EMAIL: email,
    USERNAME: username,
  };

  for (const [key, value] of Object.entries(replacements)) {
    html = html.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return html;
}
