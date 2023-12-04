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
      - MYSQL_PASSWORD=REPLACE_WITH_SECURE_PASSWORD
    volumes:
      - dvwa:/var/lib/mysql
    networks:
      - dvwa
    restart: unless-stopped

The sensitive MySQL password "p@ssw0rd" should be replaced with a secure password. Update the entry "- MYSQL_PASSWORD=p@ssw0rd" with "- MYSQL_PASSWORD=REPLACE_WITH_SECURE_PASSWORD". Remember to replace "REPLACE_WITH_SECURE_PASSWORD" with an actual secure password.
