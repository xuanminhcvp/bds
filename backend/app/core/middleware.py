from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time 
import logging  

logger = logging.getLogger("app")

def setup_middleware(app: FastAPI):
    @app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_header=["*"],
    )
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"Request {request.method} {request.url} complete in {process_time:.4f}s")
        response.headers[X-Process-Time] = str(process_time)
        
    
    
