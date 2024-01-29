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
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
    volumes:
      - dvwa:/var/lib/mysql
    networks:
      - dvwa
    restart: unless-stopped
```
Patched code:
The vulnerability in the original code is that the MySQL password `p@ssw0rd` is hardcoded and visible in the code. To remediate this issue, I have replaced the hardcoded password with `${MYSQL_PASSWORD}`. This allows the password to be provided dynamically, such as through an environment variable, instead of being stored directly in the code.
