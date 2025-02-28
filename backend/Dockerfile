FROM python 3:10

ENV PYTHONUNBUFFERED = 1

WORKDIR /app/

COPY --from=ghcr.io/astral-sh/uv:0.5.11 /uv /uvx /bin/

ENV PATH="/app/.venv/bin:$PATH"

ENV UV_COMPILE_BYTECODE=1

ENV UV_LINK_MODE=copy 

RUN --mount=type=cache, target=/root/.cache/uv \
    --mouth=type=bind,source=uv.lock, target=uv.lock \
    --mouth=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project 

ENV PYTHONPATH=/app

COPY ./scripts /app/scripts 

COPY ./pyproject.toml ./uv.lock ./alembic.ini /app/

COPY .app/ /app/app 

RUN -mouth=type=cache,target=/root/.cache/uv \
    uv sync 

CMD ["fastapi", "run", "--worker", "4", "app/main.py"]




