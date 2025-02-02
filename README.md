# Security Vulnerabilities and Mitigations

This repository demonstrates common security vulnerabilities, including **XSS (Stored)**, **CSRF**, **SQL Injection**, **CSP**, **DDoS**, and **MITM** attacks, along with their solutions. Each vulnerability is implemented in a separate branch, and the main branch contains the secure version of the application.

## Installation and Usage

1. Clone the repository

   ```bash
   git clone https://github.com/Shaban-Eissa/Web-Application-Security-101.git
   cd Web-Application-Security-101
   ```

2. Install the dependencies and run the application

   ```bash
   cd server
   npm install
   ```

   ```bash
   cd client
   npm install
   ```

3. Switch to the branch you want to explore

   ```bash
   git checkout branch-name
   ```

4. Run the server and client applications

   ```bash
   cd server
   node server.js
   ```

   ```bash
   cd client
   npm run dev
   ```

5. Open the client application in your browser

   ```bash
   http://localhost:5173
   ```

6. Explore the application and test the vulnerabilities on the selected branch.
7. Every attack has two branches one with the attack such as `csrf-monster` and one with the solution such as `csrf-hero`.

## Branches and Vulnerabilities

### 1. **Stored XSS**

- **Branch**: xss-stored-monster
- **Description**: Demonstrates a stored XSS vulnerability where malicious scripts are stored in the database and executed when rendered.
- **Solution**:

  - Sanitize user inputs.

### 2. **CSRF**

- **Branch**: csrf-monster
- **Description**: Demonstrates a CSRF attack where an attacker forces a user to perform unwanted actions.
- **Solution**:

  - Use CSRF tokens for all state-changing requests.

### 3. **SQL Injection**

- **Branch**: sql-monster
- **Description**: Demonstrates an SQL injection vulnerability where malicious SQL queries are executed.
- **Solution**:

  - Use parameterized queries or prepared statements.
  - Validate and sanitize all user inputs.

### 5. **DDoS**

- **Branch**: ddos-monster
- **Description**: Demonstrates a basic DDoS attack simulation.
- **Solution**:

  - Implement rate limiting using libraries like express-rate-limit.

### 6. **MITM**

- **Branch**: mitm-monster
- **Description**: Demonstrates a Man-in-the-Middle attack on unencrypted HTTP traffic.
- **Solution**:

  - Use HTTPS with strong encryption (TLS 1.2 or higher).
  - Implement HTTP Strict Transport Security (HSTS).
  - Educate users to avoid public Wi-Fi for sensitive transactions.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or fix.
3.  Submit a pull request with a detailed description of your changes.

## References

- [Github DDOS Attack](https://github.blog/news-insights/company-news/ddos-incident-report)
- [Microsoft SQL Injection Attack](https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2021-1636)
- [Mozilla Developer Network (MDN) - CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Google Web Fundamentals - Security](https://web.dev/security)
- [Auth0 Cross Site Scripting](https://auth0.com/blog/cross-site-scripting-xss)
- [Auth0 CSRF](https://auth0.com/blog/cross-site-request-forgery-csrf)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com)
