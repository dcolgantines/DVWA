volumes:
  dvwa:


networks:
  dvwa:


To remediate the security vulnerability of having the MySQL database password in the code, you can make use of environment variables.

Replace the `MYSQL_PASSWORD` value with an environment variable placeholder. Then, you can pass the actual password as an environment variable when running the code.

Here's the updated code snippet:

```yaml
services:
  dvwa:
    build: .
    image: ghcr.io/digininja/dvwa:latest
    # Change `always` to `build` to build from local source
    pull_policy: always
    environment:
      - DB_SERVER=db
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
    depends_on:
      - db
    networks:
      - dvwa
    ports:
      - 4280:80
    restart: unless-stopped

  db:
    image: docker.io/library/mariadb:10
    environment:
      - MYSQL_ROOT_PASSWORD=dvwa
      - MYSQL_DATABASE=dvwa
      - MYSQL_USER=dvwa
    volumes:
      - dvwa:/var/lib/mysql
    networks:
      - dvwa
    restart: unless-stopped
```

Remember to replace `${MYSQL_PASSWORD}` with the actual password when running the code.
