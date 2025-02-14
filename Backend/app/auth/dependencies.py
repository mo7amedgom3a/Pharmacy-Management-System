from fastapi import Depends, HTTPException, Security, status
from fastapi.security import OAuth2PasswordBearer

from auth.jwt_handler import JWTHandler

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
roles = {
    "admin": "admin",
    "pharmacist": "pharmacist",
    "cashier": "cashier",
    "صيدلي": "صيدلي",
}

def get_current_user(token: str = Security(oauth2_scheme), jwt_handler: JWTHandler = Depends(JWTHandler)):
    if not jwt_handler.verify_token(token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")
    return jwt_handler.decode_access_token(token)

def require_role(required_role: str):
    def role_dependency(payload: dict = Depends(get_current_user)):
        if payload.get("role") != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied! Required role: {required_role}",
            )
        return payload
    return role_dependency