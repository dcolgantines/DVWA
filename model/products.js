volumes:
  dvwa:


networks:
  dvwa:


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
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
      - MYSQL_DATABASE=${MYSQL_DATABASE}
      - MYSQL_USER=${MYSQL_USER}
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
    volumes:
      - dvwa:/var/lib/mysql
    networks:
      - dvwa
    restart: unless-stopped

In the code snippet, the MySQL database password 'p@ssw0rd' is hardcoded. To remediate this security vulnerability, the password should be removed from the code and replaced with environment variables.

The updated code snippet uses `${MYSQL_PASSWORD}` to reference the environment variable for the MySQL password. This ensures that the actual password is stored separately and not visible in the code. The same approach is applied to the other MySQL environment variables as well for consistency.
