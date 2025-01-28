# Initializing the Project

To initialize the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/ZaurInvictus/nooro-back-end.git
    ```

2. Navigate to the project directory:

```bash
    cd nooro-back-end
```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Initialize Prisma with MySQL as the datasource provider:

```bash
   npx prisma init --datasource-provider mysql
   ```

5. Initialize Prisma with MySQL as the datasource provider:

```bash
   npx prisma migrate dev --name init
   ```

6. Start the server:

```bash
   npx start
   ```

7. Create a `.env` file and configure your environment variables as needed.
   
Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB. See the documentation for all the connection string options: [Prisma Connection Strings](https://pris.ly/d/connection-strings)

### Database Environment Variable

```plaintext
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"
```

- Replace `<username>` with your MySQL username.
- Replace `<password>` with your MySQL password.
- Replace `<host>` with your MySQL server host (e.g., localhost).
- Replace `<port>` with the port number (default is 3306).
- Replace `<database>` with the name of your MySQL database.

**Example:**

```plaintext
DATABASE_URL="mysql://rootname:password@localhost:3306/yourdatabase"
```


8. Run tests

```bash
   npm test
   ```
