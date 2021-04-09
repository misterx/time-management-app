FROM postgres:latest
COPY ./build/extensions/ /extensions/
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
        make \
        postgresql-server-dev-11 \
    && cd /extensions/pgjwt/ \
    && make install
COPY ./src/ /docker-entrypoint-initdb.d/