from fastapi import HTTPException
from models.user import User
from sqlmodel import select
from dependencies import save
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.user import UserCreate, UserLogin
from auth.jwt_handler import JWTHandler
from schemas.user import UserPayload
from auth.hash import Hash
from models.employee import Employee
from schemas.employee import EmployeeCreate



class Register:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, user: UserCreate) -> User:
        try:
            user_data = user.dict()
            user_data['hashed_password'] = Hash().bcrypt(user.password)
            # map user_data into employee create
            employee_data = EmployeeCreate(**user_data)

            employee_model = Employee.model_validate(employee_data)
            await save(self.session, employee_model)
            user_data['employee_id'] = employee_model.employee_id
            user_model = User(
                username=user_data['username'],
                hashed_password=user_data['hashed_password'],
                employee_id=user_data['employee_id'],
                role=user_data['role'],
                pharmacy_id=user_data.get('pharmacy_id'),
                name=user_data.get('name'),
                salary=user_data.get('salary'),
                address=user_data.get('address')
            )
                
            await save(self.session, user_model)

            return user_model
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

class Login:
    def __init__(self, session: AsyncSession, jwt_handler: JWTHandler):
        self.session = session
        self.jwt_handler = jwt_handler

    async def authenticate(self, user_login: UserLogin) -> str:
        user = await self.session.execute(select(User).where(User.username == user_login.username))
        user = user.scalars().first()
        if not user:
            return HTTPException(status_code=400, detail="Incorrect username or password")
        if not Hash().verify(user_login.password, user.hashed_password):
            return HTTPException(status_code=400, detail="Incorrect username or password")
        user_payload = UserPayload(
            username=user.username,
            user_id=user.id,
            employee_id=user.employee_id,
            role=user.role
        )
        return self.jwt_handler.create_access_token(user_payload.dict())