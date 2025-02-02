from datetime import datetime, timedelta
from typing import Any, Dict
from jose import JWTError, jwt
import os
from schemas.user import UserPayload
from dotenv import load_dotenv
class JWTHandler:
    load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../../.env'))
    
    def __init__(self):
        self.secret_key = os.getenv("SECRET_KEY")
        self.algorithm = os.getenv("ALGORITHM")
        self.access_token_expire_weeks = int(os.getenv("ACCESS_TOKEN_EXPIRE_WEEKS", 4))
    
    def create_access_token(self, data: Dict[UserPayload, Any]) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(weeks=self.access_token_expire_weeks)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.secret_key, algorithm=self.algorithm)
        return encoded_jwt
    
    def decode_access_token(self, token: str) -> Dict[str, Any]:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except JWTError:
            return None
        
    def verify_token(self, token: str) -> bool:
        payload = self.decode_access_token(token)
        if payload is None:
            return False
        return True
    
    def refresh_access_token(self, token: str) -> str:
        payload = self.decode_access_token(token)
        if payload is None:
            return False
        return self.create_access_token(payload)