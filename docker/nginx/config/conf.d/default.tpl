include ${HTTP_TO_HTTPS_REDIRECT};

upstream postgrest {
    server postgrest:3000;
    keepalive 64;
}

server {
    listen ${NGINX_LISTEN_PORT};

    include ${SSL_CONFIG};

    root /srv;

    client_max_body_size 20M;

    gzip             on;
    gzip_comp_level  2;
    gzip_min_length  1000;
    gzip_proxied     expired no-cache no-store private auth;
    gzip_types       text/plain application/x-javascript application/javascript text/xml text/css application/xml;

    location /api/ {
        default_type  application/json;
        proxy_hide_header Content-Location;
        add_header Content-Location  /api/$upstream_http_content_location;
        proxy_set_header  Connection "";
        proxy_http_version 1.1;
        proxy_pass http://postgrest/;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
