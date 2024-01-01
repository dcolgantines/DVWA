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
      - MYSQL_PASSWORD=CHANGEME
    volumes:
      - dvwa:/var/lib/mysql
    networks:
      - dvwa
    restart: unless-stopped
```

The security vulnerability in this code is that the MySQL password is hardcoded as `p@ssw0rd`. To remediate this issue, we replace `MYSQL_PASSWORD=p@ssw0rd` with `MYSQL_PASSWORD=CHANGEME` to serve as a placeholder. After making this change, the user should manually update the placeholder password (`CHANGEME`) to a strong and secure password before deploying the code.
