from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from dependencies import get_session
from schemas.user import UserCreate, UserRead
from auth.auth import Register, Login
from typing import List
from models.user import User
from schemas.user import UserLogin
from auth.jwt_handler import JWTHandler
from auth.dependencies import require_role
from fastapi.security import OAuth2PasswordBearer
from models.employee import Employee
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter(prefix="/auth", tags=["Auth"])

# Dependency Injection for Register
async def get_register(session: AsyncSession = Depends(get_session)):
    return Register(session)

# Dependency Injection for Login
async def get_login(session: AsyncSession = Depends(get_session), jwt_handler: JWTHandler = Depends(JWTHandler)):
    return Login(session, jwt_handler)

@router.post("/register", response_model=Employee, status_code=201)
async def register(user: UserCreate, register: Register = Depends(get_register)) -> Employee:
    return await register.create(user)

@router.post("/login", response_model=str, status_code=200)
async def login(user:UserLogin, login: Login = Depends(get_login)) -> str:
    return await login.authenticate(user_login = user)
