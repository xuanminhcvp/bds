from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.security import ALGORITHM
from ... import SECRET_KEY
from sqlalchemy.orm import session

oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str= Depends(oauth_2_scheme), session: SessionDep)
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithm=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    
    user = session.select(User).filter(User.email == email).first()
    if User is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )
    return user 

def check_admin(user: User = Depends(get_current_user))
    if not user.role.is_user:
        raise HTTPException(
            status_code=403,
            detail="Not enough permissions"
        )
    return user 


